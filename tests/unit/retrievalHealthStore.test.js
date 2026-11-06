import { describe, expect, it, vi } from "vitest";

vi.mock("../../api/_rateLimit.js", () => ({ redis: null }));

async function loadStore() {
  vi.resetModules();
  return import("../../api/_retrievalHealthStore.js");
}

const base = {
  endpoint: "analyze",
  source: "retrieval",
  caseLawFilterEnabled: true,
};

function miss(overrides = {}) {
  return {
    ...base,
    reason: "no_verified",
    finalCaseLawCount: 0,
    verifiedCount: 0,
    classId: "theft",
    issuePrimary: "theft",
    scenario: "My chair was stolen from outside my apartment.",
    ...overrides,
  };
}

describe("window and all-time stats", () => {
  it("aggregates by-issue rates and concept rescues in window snapshots", async () => {
    const { recordRetrievalMetricsEvent, getRetrievalHealthSnapshot } =
      await loadStore();

    await recordRetrievalMetricsEvent({
      ...base,
      reason: "verified_results",
      finalCaseLawCount: 2,
      verifiedCount: 2,
      issuePrimary: "robbery",
      prefilterConceptRescueCount: 2,
      semanticFilterDropCount: 1,
    });
    await recordRetrievalMetricsEvent({
      ...base,
      reason: "no_verified",
      finalCaseLawCount: 0,
      issuePrimary: "robbery",
      fallbackPathUsed: true,
      semanticFilterDropCount: 3,
    });
    await recordRetrievalMetricsEvent({
      ...base,
      reason: "retrieval_error",
      retrievalError: true,
      finalCaseLawCount: 0,
      issuePrimary: "charter_counsel",
      fallbackPathUsed: true,
      prefilterConceptRescueCount: 1,
      semanticFilterDropCount: 2,
    });

    const snapshot = await getRetrievalHealthSnapshot({
      nowMs: Date.now() + 60_000,
    });
    const oneHour = snapshot.windows["1h"];

    expect(oneHour.rates.avgConceptRescues).toBeCloseTo(1);
    expect(oneHour.breakdowns.byIssue[0]).toMatchObject({
      issuePrimary: "robbery",
      requests: 2,
      fallbackPathRate: 0.5,
      noVerifiedRate: 0.5,
      errorRate: 0,
      avgVerifiedPerRequest: 1,
    });
    expect(oneHour.breakdowns.byIssue[1]).toMatchObject({
      issuePrimary: "charter_counsel",
      requests: 1,
      fallbackPathRate: 1,
      noVerifiedRate: 1,
      errorRate: 1,
      avgVerifiedPerRequest: 0,
    });
  });

  it("window and all-time stats agree on the same events", async () => {
    const { recordRetrievalMetricsEvent, getRetrievalHealthSnapshot } =
      await loadStore();
    await recordRetrievalMetricsEvent({
      ...base,
      reason: "verified_results",
      finalCaseLawCount: 3,
      relevanceScoreAvg: 6,
      retrievalLatencyMs: 100,
    });
    await recordRetrievalMetricsEvent(miss({ retrievalLatencyMs: 300 }));

    const snapshot = await getRetrievalHealthSnapshot({
      nowMs: Date.now() + 60_000,
    });
    const { rates, samples, counts } = snapshot.windows["1h"];
    expect(snapshot.alltime.rates).toEqual(rates);
    expect(snapshot.alltime.samples).toEqual(samples);
    expect(snapshot.alltime.counts).toEqual(counts);
    expect(rates.noVerifiedRate).toBe(0.5);
    expect(rates.avgRelevanceScore).toBe(6);
    expect(snapshot.windows["1h"].latencyMs).toEqual({ avg: 200, p95: 300 });
    expect(snapshot.totalStoredEvents).toBe(2);
  });

  it("keeps a non_criminal_scope empty out of every rate, but lists it for review", async () => {
    const { recordRetrievalMetricsEvent, getRetrievalHealthSnapshot, getFailureQueue } =
      await loadStore();
    await recordRetrievalMetricsEvent({
      ...base,
      reason: "non_criminal_scope",
      finalCaseLawCount: 0,
      scenario: "my landlord kept my deposit",
    });
    await recordRetrievalMetricsEvent({
      ...base,
      reason: "verified_results",
      finalCaseLawCount: 2,
      issuePrimary: "robbery",
    });

    const snapshot = await getRetrievalHealthSnapshot({
      nowMs: Date.now() + 60_000,
    });
    // Not a miss: the gate answering correctly must not move any rate.
    expect(snapshot.windows["1h"].rates.noVerifiedRate).toBe(0);
    expect(snapshot.windows["1h"].samples.operational).toBe(1);
    // But it is worth a look: what users ask that the tool doesn't cover, and
    // whether the gate misjudged a criminal scenario.
    const queue = await getFailureQueue({ status: "all" });
    expect(queue.total).toBe(1);
    expect(queue.items[0]).toMatchObject({
      reason: "non_criminal_scope",
      snippet: "my landlord kept my deposit",
      status: "new",
    });
  });

  it("excludes filter_disabled and cache events from operational rates", async () => {
    const { recordRetrievalMetricsEvent, getRetrievalHealthSnapshot } =
      await loadStore();
    await recordRetrievalMetricsEvent({ ...base, reason: "filter_disabled" });
    await recordRetrievalMetricsEvent(miss({ source: "cache" }));

    const { windows } = await getRetrievalHealthSnapshot({
      nowMs: Date.now() + 60_000,
    });
    expect(windows["1h"].samples).toMatchObject({
      total: 2,
      cache: 1,
      operational: 0,
    });
    expect(windows["1h"].counts.filterDisabled).toBe(1);
  });

  it("builds a trendline from recent events", async () => {
    const { recordRetrievalMetricsEvent, getTrendlineSnapshots } =
      await loadStore();
    await recordRetrievalMetricsEvent(miss());
    const line = await getTrendlineSnapshots({
      nowMs: Date.now() + 1000,
      buckets: 3,
      bucketMs: 60_000,
    });
    expect(line).toHaveLength(3);
    expect(line[line.length - 1]).toMatchObject({ noVerifiedRate: 1 });
  });
});

describe("failure queue", () => {
  it("captures a redacted snippet for a failed retrieval", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await recordRetrievalMetricsEvent(
      miss({ scenario: "Stolen bike, call me at 416-555-0199 or a@b.com" }),
    );

    const queue = await getFailureQueue({ status: "all" });
    expect(queue.total).toBe(1);
    expect(queue.items[0]).toMatchObject({
      reason: "no_verified",
      classId: "theft",
      count: 1,
      status: "new",
    });
    expect(queue.items[0].snippet).toContain("[phone]");
    expect(queue.items[0].snippet).toContain("[email]");
    expect(queue.items[0].snippet).not.toMatch(/555|a@b\.com/);
    expect(queue.items[0].id).toMatch(/^f[a-f0-9]{15}$/);
  });

  it("keeps no snippet for a successful retrieval", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await recordRetrievalMetricsEvent({
      ...base,
      reason: "verified_results",
      finalCaseLawCount: 2,
      scenario: "A successful scenario that should not be stored",
    });
    expect((await getFailureQueue({ status: "all" })).total).toBe(0);
  });

  it("records cache-served misses and counts a repeat once per scenario", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await recordRetrievalMetricsEvent(miss());
    await recordRetrievalMetricsEvent(miss({ source: "cache" }));
    await recordRetrievalMetricsEvent(
      miss({ scenario: "  my CHAIR was stolen from outside my apartment " }),
    );

    const queue = await getFailureQueue({ status: "all" });
    expect(queue.total).toBe(1);
    expect(queue.items[0].count).toBe(3);
  });

  it("still counts a no_terms_or_databases empty as a failure", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await recordRetrievalMetricsEvent(miss({ reason: "no_terms_or_databases" }));
    const queue = await getFailureQueue({ status: "all" });
    expect(queue.items[0].reason).toBe("no_terms_or_databases");
  });

  it("skips failures that have no scenario text to fingerprint", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await recordRetrievalMetricsEvent(miss({ scenario: undefined }));
    expect((await getFailureQueue({ status: "all" })).total).toBe(0);
  });

  it("filters by status, reports whole-queue counts, and pages", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue, setFailureStatus } =
      await loadStore();
    const texts = ["first scenario", "second scenario", "third scenario"];
    for (const scenario of texts) {
      await recordRetrievalMetricsEvent(miss({ scenario }));
    }
    const all = await getFailureQueue({ status: "all" });
    await setFailureStatus(all.items[0].id, { status: "ignored" });

    const open = await getFailureQueue({ status: "new", limit: 1 });
    expect(open.counts).toMatchObject({ all: 3, new: 2, ignored: 1 });
    expect(open.items).toHaveLength(1);
    expect(open.hasMore).toBe(true);
    expect(open.nextOffset).toBe(1);

    const page2 = await getFailureQueue({ status: "new", limit: 1, offset: 1 });
    expect(page2.items).toHaveLength(1);
    expect(page2.hasMore).toBe(false);
    expect(page2.items[0].id).not.toBe(open.items[0].id);
  });

  it("orders the queue by most recently seen", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    let queue;
    vi.useFakeTimers();
    try {
      vi.setSystemTime(1_700_000_000_000);
      await recordRetrievalMetricsEvent(miss({ scenario: "older scenario" }));
      vi.setSystemTime(1_700_000_060_000);
      await recordRetrievalMetricsEvent(miss({ scenario: "newer scenario" }));
      queue = await getFailureQueue({ status: "all" });
    } finally {
      vi.useRealTimers();
    }
    expect(queue.items.map((i) => i.snippet)).toEqual([
      "newer scenario",
      "older scenario",
    ]);
  });

  describe("triage", () => {
    it("sets status and note, and a repeat does not reopen it", async () => {
      const { recordRetrievalMetricsEvent, getFailureQueue, setFailureStatus } =
        await loadStore();
      await recordRetrievalMetricsEvent(miss());
      const { items } = await getFailureQueue({ status: "all" });

      const updated = await setFailureStatus(items[0].id, {
        status: "promoted",
        note: "  add   to corpus  ",
      });
      expect(updated).toMatchObject({
        status: "promoted",
        note: "add to corpus",
      });
      expect(updated.reviewedAt).toBeTruthy();

      await recordRetrievalMetricsEvent(miss());
      const after = await getFailureQueue({ status: "all" });
      expect(after.items[0]).toMatchObject({ status: "promoted", count: 2 });
      expect((await getFailureQueue({ status: "new" })).total).toBe(0);
    });

    it("clears a note when given an empty one", async () => {
      const { recordRetrievalMetricsEvent, getFailureQueue, setFailureStatus } =
        await loadStore();
      await recordRetrievalMetricsEvent(miss());
      const id = (await getFailureQueue({ status: "all" })).items[0].id;
      await setFailureStatus(id, { status: "reviewed", note: "look at this" });
      const cleared = await setFailureStatus(id, { status: "reviewed", note: "" });
      expect(cleared.note).toBeNull();
    });

    it("rejects unknown ids, malformed ids and unknown statuses", async () => {
      const { recordRetrievalMetricsEvent, getFailureQueue, setFailureStatus } =
        await loadStore();
      await recordRetrievalMetricsEvent(miss());
      const id = (await getFailureQueue({ status: "all" })).items[0].id;

      expect(await setFailureStatus("f00000000000000", { status: "reviewed" })).toBeNull();
      expect(await setFailureStatus("not-a-fingerprint", { status: "reviewed" })).toBeNull();
      expect(await setFailureStatus(id, { status: "deleted" })).toBeNull();
      expect((await getFailureQueue({ status: "all" })).items[0].status).toBe("new");
    });
  });
});

describe("structured features", () => {
  it("keeps legal concepts, a length bucket and retrieval diagnostics", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await recordRetrievalMetricsEvent(
      miss({
        scenario: "The police searched my phone without a warrant after they arrested me",
        termsTried: 3,
        databasesTried: 2,
        candidateCount: 5,
        verificationCalls: 4,
        semanticFilterDropCount: 2,
        retrievalPass: "fallback",
        fallbackPathUsed: true,
      }),
    );
    const [item] = (await getFailureQueue({ status: "all" })).items;
    expect(item.concepts).toEqual(expect.arrayContaining(["search", "detention"]));
    expect(item.lengthBucket).toBe("medium");
    expect(item.diagnostics).toEqual({
      termsTried: 3,
      databasesTried: 2,
      candidateCount: 5,
      verificationCalls: 4,
      semanticFilterDropCount: 2,
    });
    expect(item.retrievalPass).toBe("fallback");
    expect(item.fallbackPathUsed).toBe(true);
  });

  it("only stores concepts from the controlled vocabulary, never free words", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await recordRetrievalMetricsEvent(miss({ scenario: "Zorblax Qwerty had my fidget spinner stolen" }));
    const [item] = (await getFailureQueue({ status: "all" })).items;
    expect(item.concepts).toEqual(["theft"]);
  });

  it("ignores negated events when extracting concepts", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await recordRetrievalMetricsEvent(
      miss({ scenario: "there was no search or arrest, they just took my bike" }),
    );
    const [item] = (await getFailureQueue({ status: "all" })).items;
    expect(item.concepts).not.toContain("search");
    expect(item.concepts).not.toContain("detention");
  });

  it("buckets scenario length without storing the length", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await recordRetrievalMetricsEvent(miss({ scenario: "short one" }));
    await recordRetrievalMetricsEvent(miss({ scenario: `${"word ".repeat(80)}long` }));
    const items = (await getFailureQueue({ status: "all" })).items;
    expect(items.map((i) => i.lengthBucket).sort()).toEqual(["long", "short"]);
  });

  it("stores a fixed error label, never the raw message", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue, getRecentEvents } =
      await loadStore();
    await recordRetrievalMetricsEvent(
      miss({
        reason: "retrieval_error",
        retrievalError: true,
        errorMessage: "fetch failed for https://a2aj.ca/search?q=Jane Doe stole my bike",
      }),
    );
    const [item] = (await getFailureQueue({ status: "all" })).items;
    expect(item.errorMessage).toBe("network_error");
    const events = await getRecentEvents();
    expect(JSON.stringify([item, events])).not.toMatch(/Jane Doe|a2aj/);
  });
});

describe("text retention", () => {
  const DAY = 24 * 60 * 60 * 1000;

  async function withClock(fn) {
    vi.useFakeTimers();
    try {
      vi.setSystemTime(1_800_000_000_000);
      return await fn((ms) => vi.setSystemTime(1_800_000_000_000 + ms));
    } finally {
      vi.useRealTimers();
    }
  }

  it("masks names in the stored snippet", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await recordRetrievalMetricsEvent(miss({ scenario: "My neighbour Jane Doe stole my bike" }));
    const [item] = (await getFailureQueue({ status: "all" })).items;
    expect(item.snippet).toBe("My neighbour [name] stole my bike");
  });

  it("expires the text 14 days after FIRST capture; repeats do not extend it", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await withClock(async (at) => {
      await recordRetrievalMetricsEvent(miss());
      at(10 * DAY);
      await recordRetrievalMetricsEvent(miss()); // a repeat 10 days in
      at(13 * DAY);
      let [item] = (await getFailureQueue({ status: "all" })).items;
      expect(item.textState).toBe("present");
      expect(item.snippet).toBeTruthy();

      at(15 * DAY);
      await recordRetrievalMetricsEvent(miss()); // another repeat after expiry
      [item] = (await getFailureQueue({ status: "all" })).items;
      // The structured record lives on and keeps counting...
      expect(item.count).toBe(3);
      // ...and the repeat after expiry captured a fresh text with a new clock.
      expect(item.textState).toBe("present");
    });
  });

  it("shows the text as expired once its clock runs out and no repeat arrives", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue } = await loadStore();
    await withClock(async (at) => {
      await recordRetrievalMetricsEvent(miss());
      at(15 * DAY);
      const [item] = (await getFailureQueue({ status: "all" })).items;
      expect(item.snippet).toBeNull();
      expect(item.textState).toBe("expired");
      expect(item.concepts).toEqual(["theft"]);
    });
  });

  it.each(["reviewed", "ignored"])(
    "erases the text when a failure is marked %s",
    async (status) => {
      const { recordRetrievalMetricsEvent, getFailureQueue, setFailureStatus } =
        await loadStore();
      await recordRetrievalMetricsEvent(miss());
      const id = (await getFailureQueue({ status: "all" })).items[0].id;

      const updated = await setFailureStatus(id, { status });
      expect(updated.snippet).toBeNull();
      expect(updated.textState).toBe("erased");
      // The structured record stays.
      expect(updated.concepts).toEqual(["theft"]);
      expect(updated.count).toBe(1);
    },
  );

  it("keeps the text for a promoted failure so the promote script can show it", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue, setFailureStatus } =
      await loadStore();
    await recordRetrievalMetricsEvent(miss());
    const id = (await getFailureQueue({ status: "all" })).items[0].id;
    const updated = await setFailureStatus(id, { status: "promoted" });
    expect(updated.textState).toBe("present");
    expect(updated.snippet).toBeTruthy();
  });

  it.each(["reviewed", "ignored"])(
    "does not store text again when a %s scenario repeats",
    async (status) => {
      const { recordRetrievalMetricsEvent, getFailureQueue, setFailureStatus } =
        await loadStore();
      await recordRetrievalMetricsEvent(miss());
      const id = (await getFailureQueue({ status: "all" })).items[0].id;
      await setFailureStatus(id, { status });

      await recordRetrievalMetricsEvent(miss());
      const [item] = (await getFailureQueue({ status: "all" })).items;
      expect(item.count).toBe(2);
      expect(item.snippet).toBeNull();
      expect(item.textState).toBe("erased");
    },
  );

  it("reopening a reviewed scenario does not bring its text back", async () => {
    const { recordRetrievalMetricsEvent, getFailureQueue, setFailureStatus } =
      await loadStore();
    await recordRetrievalMetricsEvent(miss());
    const id = (await getFailureQueue({ status: "all" })).items[0].id;
    await setFailureStatus(id, { status: "reviewed" });
    const reopened = await setFailureStatus(id, { status: "new" });
    expect(reopened.snippet).toBeNull();
  });
});

describe("privacy", () => {
  it("never puts scenario text on the stored event itself", async () => {
    const { recordRetrievalMetricsEvent, getRecentEvents } = await loadStore();
    await recordRetrievalMetricsEvent(miss());
    const events = await getRecentEvents();
    expect(events).toHaveLength(1);
    expect(JSON.stringify(events)).not.toContain("chair");
  });
});
