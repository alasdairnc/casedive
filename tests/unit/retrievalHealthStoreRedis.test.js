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
  const strings = new Map();
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
    exists: (key) =>
      hashes.has(key) || lists.has(key) || strings.has(key) ? 1 : 0,
    get: (key) => (strings.has(key) ? strings.get(key) : null),
    // SET with NX / EX, like Upstash: NX leaves an existing key and its TTL alone.
    set: (key, value, opts = {}) => {
      if (opts.nx && strings.has(key)) return null;
      strings.set(key, value);
      if (opts.ex) ttls.set(key, opts.ex);
      return "OK";
    },
    del: (...keys) => {
      let n = 0;
      for (const key of keys) {
        for (const store of [strings, hashes, lists]) {
          if (store.delete(key)) n += 1;
        }
      }
      return n;
    },
    hget: (key, field) => {
      const h = hashes.get(key);
      return h && field in h ? h[field] : null;
    },
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
    strings,
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

  it("writes each event in one pipelined round trip; a failure adds one status read", async () => {
    await recordRetrievalMetricsEvent(metrics("verified_results"));
    expect(mockRedis.calls).toEqual({ exec: 1, direct: 0 });

    await recordRetrievalMetricsEvent(
      metrics("no_verified", { scenario: "my chair was stolen" }),
    );
    // One pipeline, plus a single HGET to see whether text may be stored.
    expect(mockRedis.calls).toEqual({ exec: 2, direct: 1 });
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

  const TEXT = "metrics:retrieval:failure-text:v3:";
  const RECORD = "metrics:retrieval:failure:v3:";
  const recordKey = () =>
    [...mockRedis.hashes.keys()].find((k) => k.startsWith(RECORD));
  const textKey = () =>
    [...mockRedis.strings.keys()].find((k) => k.startsWith(TEXT));

  it("keeps the redacted snippet in its own key and out of every hash and list", async () => {
    await recordRetrievalMetricsEvent(
      metrics("no_verified", {
        scenario: "My bike was stolen, email me at jane@example.com. Please ask Jane Doe.",
      }),
    );

    expect(mockRedis.strings.get(textKey())).toBe(
      "My bike was stolen, email me at [email]. Please ask [name].",
    );
    // No raw contact detail or name anywhere in Redis.
    const everything = JSON.stringify([
      ...mockRedis.lists.values(),
      ...mockRedis.hashes.values(),
      ...mockRedis.strings.values(),
    ]);
    expect(everything).not.toMatch(/jane@example|Jane Doe/);
    // The structured hash has no snippet field at all.
    expect(mockRedis.hashes.get(recordKey())).not.toHaveProperty("snippet");
    expect(mockRedis.hashes.get(recordKey()).concepts).toBe("theft");
  });

  it("gives the structured record 30 days and the text 14, and repeats never extend the text", async () => {
    const meta = metrics("no_verified", { scenario: "my chair was stolen" });
    await recordRetrievalMetricsEvent(meta);
    expect(mockRedis.ttls.get(recordKey())).toBe(60 * 60 * 24 * 30);
    expect(mockRedis.ttls.get(textKey())).toBe(60 * 60 * 24 * 14);

    // Simulate time passing on the text key, then a repeat arrives.
    mockRedis.ttls.set(textKey(), 5 * 24 * 60 * 60);
    await recordRetrievalMetricsEvent(meta);
    expect(mockRedis.ttls.get(textKey())).toBe(5 * 24 * 60 * 60); // untouched (SET NX)
    expect(mockRedis.ttls.get(recordKey())).toBe(60 * 60 * 24 * 30); // refreshed
  });

  it("round-trips the failure queue and triage through Redis", async () => {
    const meta = metrics("no_verified", { scenario: "my chair was stolen" });
    await recordRetrievalMetricsEvent(meta);
    await recordRetrievalMetricsEvent(meta);

    const queue = await getFailureQueue({ status: "new" });
    expect(queue.total).toBe(1);
    expect(queue.items[0]).toMatchObject({
      snippet: "my chair was stolen",
      textState: "present",
      concepts: ["theft"],
      count: 2,
      status: "new",
    });
    expect(queue.textRetentionDays).toBe(14);

    const updated = await setFailureStatus(queue.items[0].id, {
      status: "promoted",
      note: "check corpus",
    });
    expect(updated).toMatchObject({ status: "promoted", note: "check corpus", snippet: "my chair was stolen" });

    await recordRetrievalMetricsEvent(meta);
    const after = await getFailureQueue({ status: "promoted" });
    expect(after.items[0]).toMatchObject({ count: 3, status: "promoted" });
  });

  it.each(["reviewed", "ignored"])("deletes the text key when marked %s and never re-stores it", async (status) => {
    const meta = metrics("no_verified", { scenario: "my chair was stolen" });
    await recordRetrievalMetricsEvent(meta);
    const id = (await getFailureQueue({ status: "all" })).items[0].id;
    expect(textKey()).toBeTruthy();

    const updated = await setFailureStatus(id, { status });
    expect(textKey()).toBeUndefined();
    expect(updated).toMatchObject({ status, snippet: null, textState: "erased", count: 1 });

    await recordRetrievalMetricsEvent(meta); // the same scenario again
    expect(textKey()).toBeUndefined();
    const [item] = (await getFailureQueue({ status: "all" })).items;
    expect(item).toMatchObject({ count: 2, snippet: null, textState: "erased" });
  });

  it("fails closed: if the status can't be read, the record updates but no text is written", async () => {
    mockRedis.hget = vi.fn(async () => {
      throw new Error("boom");
    });
    await recordRetrievalMetricsEvent(
      metrics("no_verified", { scenario: "my chair was stolen" }),
    );
    expect(recordKey()).toBeTruthy();
    expect(textKey()).toBeUndefined();
  });

  it("reads digits-only and JSON-looking snippets back as text", async () => {
    // Upstash JSON-parses reads; a scenario that is just numbers must still show.
    await recordRetrievalMetricsEvent(metrics("no_verified", { scenario: "12" }));
    mockRedis.strings.set(textKey(), 12); // what the real client would return
    const [item] = (await getFailureQueue({ status: "all" })).items;
    expect(item.snippet).toBe("12");
  });

  it("ignores a legacy snippet field that old records still carry", async () => {
    await recordRetrievalMetricsEvent(
      metrics("no_verified", { scenario: "my chair was stolen" }),
    );
    mockRedis.hashes.get(recordKey()).snippet = "LEGACY RAW TEXT";
    mockRedis.strings.delete(textKey());
    const [item] = (await getFailureQueue({ status: "all" })).items;
    expect(item.snippet).toBeNull();
    expect(JSON.stringify(item)).not.toContain("LEGACY");
  });

  it("returns null when triaging an id that has expired", async () => {
    expect(
      await setFailureStatus("f123456789abcdef", { status: "reviewed" }),
    ).toBeNull();
  });

  it("drops index entries whose record has expired", async () => {
    await recordRetrievalMetricsEvent(
      metrics("no_verified", { scenario: "my chair was stolen" }),
    );
    mockRedis.hashes.delete(recordKey());

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
        ["rpush", "ltrim", "expire", "hincrby", "hsetnx", "hset", "zadd", "zremrangebyrank", "set"].map(
          (n) => [n, function () { return this; }],
        ),
      ),
    });
    await expect(
      recordRetrievalMetricsEvent(metrics("no_verified")),
    ).resolves.toBe(true);
  });
});
