import { beforeEach, describe, expect, it, vi } from "vitest";

let mockRedis = null;

vi.mock("../../api/_rateLimit.js", () => ({
  get redis() {
    return mockRedis;
  },
}));

const { recordRetrievalMetricsEvent, getRetrievalEvents } = await import(
  "../../api/_retrievalHealthStore.js"
);

// Minimal Redis double with real type rules: string and list commands fail
// with WRONGTYPE on the other kind of key, as Upstash does.
function makeRedis() {
  const strings = new Map();
  const lists = new Map();
  const wrongType = () => {
    throw new Error("WRONGTYPE Operation against a key holding the wrong kind of value");
  };
  const listFor = (key) => {
    if (strings.has(key)) wrongType();
    return lists.get(key) ?? [];
  };
  return {
    lists,
    get: vi.fn(async (key) => {
      if (lists.has(key)) wrongType();
      return strings.get(key) ?? null;
    }),
    set: vi.fn(async (key, value) => {
      lists.delete(key);
      strings.set(key, value);
      return "OK";
    }),
    incr: vi.fn(async (key) => {
      const next = Number(strings.get(key) ?? 0) + 1;
      strings.set(key, String(next));
      return next;
    }),
    rpush: vi.fn(async (key, value) => {
      const list = listFor(key);
      list.push(value);
      lists.set(key, list);
      return list.length;
    }),
    ltrim: vi.fn(async (key, start, stop) => {
      const list = listFor(key);
      const n = list.length;
      const from = start < 0 ? Math.max(n + start, 0) : start;
      const to = stop < 0 ? n + stop : stop;
      lists.set(key, list.slice(from, to + 1));
      return "OK";
    }),
    lrange: vi.fn(async (key, start, stop) => {
      const list = listFor(key);
      const to = stop < 0 ? list.length + stop : stop;
      return list.slice(start, to + 1).map((row) => JSON.parse(row));
    }),
    expire: vi.fn(async () => 1),
  };
}

function metrics(reason) {
  return {
    endpoint: "analyze",
    source: "retrieval",
    reason,
    finalCaseLawCount: reason === "verified_results" ? 2 : 0,
    verifiedCount: reason === "verified_results" ? 2 : 0,
    issuePrimary: "theft",
    classId: "theft",
  };
}

describe("retrieval health store with Redis", () => {
  beforeEach(() => {
    mockRedis = makeRedis();
  });

  it("keeps every event, not just the first", async () => {
    await recordRetrievalMetricsEvent(metrics("verified_results"));
    await recordRetrievalMetricsEvent(metrics("no_verified"));
    await recordRetrievalMetricsEvent(metrics("verified_results"));

    const events = await getRetrievalEvents();
    expect(events.map((e) => e.reason)).toEqual([
      "verified_results",
      "no_verified",
      "verified_results",
    ]);
  });

  it("bounds the event list with a trim and an expiry", async () => {
    await recordRetrievalMetricsEvent(metrics("no_verified"));

    expect(mockRedis.ltrim).toHaveBeenCalledWith(
      "metrics:retrieval:events:v2",
      -10_000,
      -1,
    );
    expect(mockRedis.expire).toHaveBeenCalledWith(
      "metrics:retrieval:events:v2",
      60 * 60 * 24 * 30,
    );
  });

  it("stores no scenario text", async () => {
    await recordRetrievalMetricsEvent({
      ...metrics("no_verified"),
      scenarioSnippet: "My neighbour Jane Doe took my bike",
    });

    const stored = mockRedis.lists.get("metrics:retrieval:events:v2");
    expect(stored).toHaveLength(1);
    expect(stored[0]).not.toContain("Jane Doe");
  });
});
