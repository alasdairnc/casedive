import { describe, expect, it } from "vitest";

import { buildRetrievalMetrics } from "../../api/_retrievalMetrics.js";
import { classifyEvent, normalizeEvent } from "../../api/_retrievalEvents.js";

// analyze.js reports a fast CanLII failure with nothing left to show as an
// error; check it lands in the error rate, not the no-verified rate.
describe("an upstream failure with no case law, as analyze.js logs it", () => {
  it("counts as an error, not a no-verified relevance miss", () => {
    const payload = buildRetrievalMetrics({
      source: "retrieval",
      reason: "retrieval_error",
      retrievalError: true,
      errorMessage: "upstream_error",
      finalCaseLawCount: 0,
      retrievalMeta: { verificationCalls: 3, upstreamErrors: 3 },
      filters: { lawTypes: { case_law: true } },
    });
    const flags = classifyEvent(normalizeEvent({ ts: 1, ...payload }));

    expect(payload.errorMessage).toBe("upstream_error");
    expect(flags).toMatchObject({
      operational: true,
      isError: true,
      noVerified: false,
      isFailure: true,
    });
  });
});

describe("buildRetrievalMetrics", () => {
  it("normalizes phase-4 telemetry fields from retrieval meta", () => {
    const payload = buildRetrievalMetrics({
      requestId: "req-1",
      endpoint: "retrieve-caselaw",
      source: "retrieval",
      retrievalMeta: {
        termsTried: 4,
        candidateCount: 12,
        verificationCalls: 8,
        verifiedCount: 3,
        relevanceScoreAvg: 6.2378,
        fallbackPathUsed: true,
        fallbackReason: "semantic_filter_fallback",
        semanticFilterDropCount: 5,
        candidateSourceMix: {
          ai: 6,
          landmark: 4,
          localFallback: 2,
        },
      },
      retrievalLatencyMs: 742,
      finalCaseLawCount: 3,
      filters: {
        jurisdiction: "Ontario",
        courtLevel: "appeal",
        dateRange: "10",
      },
      scenario:
        "I was stopped at a RIDE checkpoint and refused the breath test after arrest.",
    });

    expect(payload.relevanceScoreAvg).toBe(6.238);
    expect(payload.fallbackPathUsed).toBe(true);
    expect(payload.fallbackReason).toBe("semantic_filter_fallback");
    expect(payload.semanticFilterDropCount).toBe(5);
    expect(payload.candidateSourceMix).toEqual({
      ai: 6,
      landmark: 4,
      localFallback: 2,
    });
    expect(payload.classId).toBe("charter_detention");
    expect(payload.issuePrimary).toBe("charter_detention");
  });

  it("applies safe defaults for missing or invalid phase-4 fields", () => {
    const payload = buildRetrievalMetrics({
      retrievalMeta: {
        verifiedCount: 0,
        relevanceScoreAvg: "n/a",
        fallbackPathUsed: false,
        semanticFilterDropCount: -8,
        candidateSourceMix: {
          ai: -1,
          landmark: undefined,
          localFallback: null,
        },
      },
    });

    expect(payload.relevanceScoreAvg).toBeNull();
    expect(payload.fallbackPathUsed).toBe(false);
    expect(payload.fallbackReason).toBeNull();
    expect(payload.semanticFilterDropCount).toBe(0);
    expect(payload.candidateSourceMix).toEqual({
      ai: 0,
      landmark: 0,
      localFallback: 0,
    });
    expect(payload.classId).toBe("general_criminal");
    expect(payload.issuePrimary).toBe("general_criminal");
  });

  it("classifies scenarios from scenario text when retrieval meta omits a class", () => {
    const payload = buildRetrievalMetrics({
      scenario: "my trial was delayed for over two years",
    });

    expect(payload.classId).toBe("trial_delay");
    expect(payload.issuePrimary).toBe("trial_delay");
  });
});
