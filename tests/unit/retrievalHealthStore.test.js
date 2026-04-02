import { describe, expect, it, vi } from "vitest";

vi.mock("../../api/_rateLimit.js", () => ({ redis: null }));

const { recordRetrievalMetricsEvent, getRetrievalHealthSnapshot } = await import("../../api/_retrievalHealthStore.js");

describe("retrieval health store recent failures", () => {
  it("includes cache-backed zero-result events in recent failures", async () => {
    const futureNow = Date.now() + 60_000;

    await recordRetrievalMetricsEvent({
      endpoint: "analyze",
      source: "cache",
      reason: "no_verified",
      caseLawFilterEnabled: true,
      finalCaseLawCount: 0,
      verifiedCount: 0,
      scenarioSnippet: "neighbor built fence onto my property",
    });

    const snapshot = await getRetrievalHealthSnapshot({ nowMs: futureNow });

    expect(snapshot.recentFailures).toHaveLength(1);
    expect(snapshot.recentFailures[0]).toMatchObject({
      endpoint: "analyze",
      reason: "no_verified",
      scenarioSnippet: "neighbor built fence onto my property",
      finalCaseLawCount: 0,
    });
  });
});