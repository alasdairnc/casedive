import { beforeEach, describe, expect, it, vi } from "vitest";

let mockRedis = null;

vi.mock("../../api/_rateLimit.js", () => ({
  get redis() {
    return mockRedis;
  },
}));

const {
  recordRetrievalMetricsEvent,
  getRetrievalHealthSnapshot,
  getFailureQueue,
  setFailureStatus,
  getRecentEvents,
} = await import("../../api/_retrievalHealthStore.js");

// Redis double that models what the store relies on: a pipeline that runs its
// commands in order in one call, hashes with atomic HINCRBY, a capped list, and
// a sorted set. `calls` counts round trips so a test can assert "one per event".
function makeRedis() {
  const lists = new Map();
  const hashes = new Map();
  const zsets = new Map();
  const ttls = new Map();
  const calls = { exec: 0, direct: 0 };

  const hashFor = (key) => {
    if (!hashes.has(key)) hashes.set(key, {});
    return hashes.get(key);
  };
  const commands = {
    rpush: (key, value) => {
      const list = lists.get(key) ?? [];
      list.push(value);
      lists.set(key, list);
      return list.length;
    },
    ltrim: (key, start, stop) => {
      const list = lists.get(key) ?? [];
      const n = list.length;
      const from = start < 0 ? Math.max(n + start, 0) : start;
      const to = stop < 0 ? n + stop : stop;
      lists.set(key, list.slice(from, to + 1));
      return "OK";
    },
    lrange: (key, start, stop) => {
      const list = lists.get(key) ?? [];
      const n = list.length;
      const from = start < 0 ? Math.max(n + start, 0) : start;
      const to = stop < 0 ? n + stop : stop;
      return list.slice(from, to + 1).map((row) => JSON.parse(row));
    },
    expire: (key, seconds) => {
      ttls.set(key, seconds);
      return 1;
    },
    hincrby: (key, field, n) => {
      const h = hashFor(key);
      h[field] = Number(h[field] || 0) + n;
      return h[field];
    },
    hsetnx: (key, field, value) => {
      const h = hashFor(key);
      if (field in h) return 0;
      h[field] = value;
      return 1;
    },
    hset: (key, obj) => {
      Object.assign(hashFor(key), obj);
      return Object.keys(obj).length;
    },
    hgetall: (key) => {
      const h = hashes.get(key);
      return h && Object.keys(h).length ? { ...h } : null;
    },
    exists: (key) => (hashes.has(key) || lists.has(key) ? 1 : 0),
    zadd: (key, { score, member }) => {
      const z = zsets.get(key) ?? new Map();
      z.set(member, score);
      zsets.set(key, z);
      return 1;
    },
    zrange: (key, start, stop, opts) => {
      const z = zsets.get(key) ?? new Map();
      const sorted = [...z.entries()].sort((a, b) => a[1] - b[1]).map(([m]) => m);
      if (opts?.rev) sorted.reverse();
      return sorted.slice(start, stop === -1 ? undefined : stop + 1);
    },
    zrem: (key, ...members) => {
      const z = zsets.get(key) ?? new Map();
      members.forEach((m) => z.delete(m));
      return members.length;
    },
    zremrangebyrank: (key, start, stop) => {
      const z = zsets.get(key) ?? new Map();
      const sorted = [...z.entries()].sort((a, b) => a[1] - b[1]).map(([m]) => m);
      const n = sorted.length;
      const from = start < 0 ? Math.max(n + start, 0) : start;
      const to = stop < 0 ? n + stop : stop;
      sorted.slice(from, to + 1).forEach((m) => z.delete(m));
      return 0;
    },
  };

  const direct = Object.fromEntries(
    Object.entries(commands).map(([name, fn]) => [
      name,
      vi.fn(async (...args) => {
        calls.direct += 1;
        return fn(...args);
      }),
    ]),
  );

  return {
    ...direct,
    lists,
    hashes,
    zsets,
    ttls,
    calls,
    pipeline() {
      const queued = [];
      const pipe = {
        exec: async () => {
          calls.exec += 1;
          return queued.map(([name, args]) => commands[name](...args));
        },
      };
      for (const name of Object.keys(commands)) {
        pipe[name] = (...args) => {
          queued.push([name, args]);
          return pipe;
        };
      }
      return pipe;
    },
  };
}

function metrics(reason, extra = {}) {
  return {
    endpoint: "analyze",
    source: "retrieval",
    reason,
    finalCaseLawCount: reason === "verified_results" ? 2 : 0,
    verifiedCount: reason === "verified_results" ? 2 : 0,
    issuePrimary: "theft",
    classId: "theft",
    ...extra,
  };
}

describe("retrieval health store with Redis", () => {
  beforeEach(() => {
    mockRedis = makeRedis();
  });

  it("writes each event in one pipelined round trip", async () => {
    await recordRetrievalMetricsEvent(metrics("verified_results"));
    await recordRetrievalMetricsEvent(
      metrics("no_verified", { scenario: "my chair was stolen" }),
    );

    expect(mockRedis.calls.exec).toBe(2);
    expect(mockRedis.calls.direct).toBe(0);
  });

  it("keeps every event in order, not just the first", async () => {
    await recordRetrievalMetricsEvent(metrics("verified_results"));
    await recordRetrievalMetricsEvent(metrics("no_verified"));
    await recordRetrievalMetricsEvent(metrics("verified_results"));

    const events = await getRecentEvents();
    expect(events.map((e) => e.reason)).toEqual([
      "verified_results",
      "no_verified",
      "verified_results",
    ]);
  });

  it("bounds the recent list with a trim and a 7 day expiry", async () => {
    await recordRetrievalMetricsEvent(metrics("no_verified"));
    expect(mockRedis.ttls.get("metrics:retrieval:recent:v3")).toBe(
      60 * 60 * 24 * 7,
    );
    // Fill past the cap.
    for (let i = 0; i < 1510; i++) {
      await recordRetrievalMetricsEvent(metrics("verified_results"));
    }
    expect(mockRedis.lists.get("metrics:retrieval:recent:v3")).toHaveLength(1500);
  });

  it("counts with HINCRBY so the lifetime totals survive concurrent writers", async () => {
    await Promise.all(
      Array.from({ length: 20 }, () =>
        recordRetrievalMetricsEvent(metrics("no_verified")),
      ),
    );
    await recordRetrievalMetricsEvent(metrics("verified_results"));

    const snapshot = await getRetrievalHealthSnapshot();
    expect(snapshot.alltime.samples.total).toBe(21);
    expect(snapshot.alltime.counts.noVerified).toBe(20);
    expect(snapshot.alltime.rates.noVerifiedRate).toBeCloseTo(20 / 21, 3);
    // Totals never expire.
    expect(mockRedis.ttls.has("metrics:retrieval:totals:v3")).toBe(false);
  });

  it("stores a redacted snippet only on the failure record, with a 30 day expiry", async () => {
    await recordRetrievalMetricsEvent(
      metrics("no_verified", {
        scenario: "My bike was stolen, email me at jane@example.com",
      }),
    );

    const everything = JSON.stringify([
      ...mockRedis.lists.values(),
    ]);
    expect(everything).not.toContain("bike");

    const [key] = [...mockRedis.hashes.keys()].filter((k) =>
      k.startsWith("metrics:retrieval:failure:v3:"),
    );
    const record = mockRedis.hashes.get(key);
    expect(record.snippet).toContain("[email]");
    expect(JSON.stringify([...mockRedis.hashes.values()])).not.toContain(
      "jane@example.com",
    );
    expect(mockRedis.ttls.get(key)).toBe(60 * 60 * 24 * 30);
  });

  it("round-trips the failure queue and triage through Redis", async () => {
    await recordRetrievalMetricsEvent(
      metrics("no_verified", { scenario: "my chair was stolen" }),
    );
    await recordRetrievalMetricsEvent(
      metrics("no_verified", { scenario: "my chair was stolen" }),
    );

    const queue = await getFailureQueue({ status: "new" });
    expect(queue.total).toBe(1);
    expect(queue.items[0]).toMatchObject({
      snippet: "my chair was stolen",
      count: 2,
      status: "new",
    });

    const updated = await setFailureStatus(queue.items[0].id, {
      status: "reviewed",
      note: "check corpus",
    });
    expect(updated).toMatchObject({ status: "reviewed", note: "check corpus" });

    // A repeat after triage bumps the count but keeps the status.
    await recordRetrievalMetricsEvent(
      metrics("no_verified", { scenario: "my chair was stolen" }),
    );
    const after = await getFailureQueue({ status: "reviewed" });
    expect(after.items[0]).toMatchObject({ count: 3, status: "reviewed" });
  });

  it("returns null when triaging an id that has expired", async () => {
    expect(
      await setFailureStatus("0123456789abcdef", { status: "reviewed" }),
    ).toBeNull();
  });

  it("drops index entries whose record has expired", async () => {
    await recordRetrievalMetricsEvent(
      metrics("no_verified", { scenario: "my chair was stolen" }),
    );
    const [key] = [...mockRedis.hashes.keys()].filter((k) =>
      k.startsWith("metrics:retrieval:failure:v3:"),
    );
    mockRedis.hashes.delete(key);

    const queue = await getFailureQueue({ status: "all" });
    expect(queue.total).toBe(0);
    expect(mockRedis.zrem).toHaveBeenCalled();
  });

  it("falls back to memory when Redis errors", async () => {
    mockRedis.pipeline = () => ({
      exec: async () => {
        throw new Error("boom");
      },
      ...Object.fromEntries(
        ["rpush", "ltrim", "expire", "hincrby", "hsetnx", "hset", "zadd", "zremrangebyrank"].map(
          (n) => [n, function () { return this; }],
        ),
      ),
    });
    await expect(
      recordRetrievalMetricsEvent(metrics("no_verified")),
    ).resolves.toBe(true);
  });
});
