import { describe, expect, it } from "vitest";

import {
  buildAgentFixPrompt,
  buildFixtureStub,
  clip,
  fmtDate,
  num,
  pct,
  severityForMetric,
  statusFromData,
} from "../../src/components/retrievalHealthUtils.js";

describe("retrievalHealthUtils", () => {
  it("formats percent and number with fallback", () => {
    expect(pct(0.125)).toBe("12.5%");
    expect(pct(null)).toBe("—");
    expect(num(42)).toBe("42");
    expect(num(undefined)).toBe("—");
  });

  it("clips long text and handles empty values", () => {
    expect(clip("  short  ", 10)).toBe("short");
    expect(clip("abcdefghijklmnopqrstuvwxyz", 5)).toBe("abcde...");
    expect(clip("   ")).toBe("—");
  });

  it("formats dates with fallback for invalid inputs", () => {
    expect(fmtDate("not-a-date")).toBe("—");
    expect(fmtDate(null)).toBe("—");
    expect(fmtDate("2026-01-01T00:00:00.000Z")).not.toBe("—");
  });

  it("builds agent fix prompt with class metadata and optional error", () => {
    const prompt = buildAgentFixPrompt({
      ts: "2026-04-02T00:00:00.000Z",
      endpoint: "analyze",
      reason: "retrieval_error",
      classId: "trial_delay",
      issuePrimary: "trial_delay",
      errorMessage: "network failure",
    });

    expect(prompt).toContain("Investigate and fix retrieval failure");
    expect(prompt).toContain("Issue class: trial_delay");
    expect(prompt).toContain("Primary issue: trial_delay");
    expect(prompt).toContain("Error message: network failure");
  });

  it("includes the redacted scenario and repeat count when available", () => {
    const prompt = buildAgentFixPrompt({
      snippet: "My chair was stolen",
      count: 4,
      reason: "no_verified",
    });
    expect(prompt).toContain("My chair was stolen");
    expect(prompt).toContain("Seen 4 time(s)");
  });

  it("keeps user text out of CLI stubs because the repo is public", () => {
    const stub = buildFixtureStub(
      { id: "f0123456789abcde", snippet: "SECRET scenario text", classId: "theft", count: 2 },
      { includeText: false },
    );
    expect(JSON.stringify(stub)).not.toContain("SECRET");
    expect(stub.scenario).toContain("REWRITE");
    expect(stub.scenario).toContain("theft");
  });

  it("builds a labelled-later test stub that cannot pass by accident", () => {
    const stub = buildFixtureStub({
      id: "f0123456789abcde",
      snippet: "My chair was stolen",
      classId: "theft",
      reason: "no_verified",
      count: 2,
    });
    expect(stub).toMatchObject({
      id: "prod_f0123456789abcde",
      sourceFailureId: "f0123456789abcde",
      scenario: "My chair was stolen",
      expectedPrimary: "theft",
      shouldInclude: [],
    });
    expect(stub.knownFailure).toBeTruthy();
  });

  it("computes severity and status from thresholded values", () => {
    expect(severityForMetric(0.9, 1.0).label).toBe("Warning");
    expect(severityForMetric(1.1, 1.0).label).toBe("Critical");
    expect(severityForMetric(6, 5, "below_is_bad").label).toBe("OK");

    const status = statusFromData({
      alerts: [],
      totalStoredEvents: 10,
      thresholds: {
        errorRate1h: 0.1,
        noVerifiedRate1h: 0.3,
        p95LatencyMs1h: 3000,
      },
      windows: {
        "1h": {
          samples: { operational: 10, quality: 10, latency: 10 },
          rates: { errorRate: 0.02, noVerifiedRate: 0.1 },
          latencyMs: { p95: 900 },
        },
      },
    });

    expect(status.label).toBe("Healthy");
  });

  describe("low sample sizes", () => {
    it("does not rate a metric that has too few requests behind it", () => {
      const badge = severityForMetric(1, 0.7, "above_is_bad", { count: 1, min: 3 });
      expect(badge).toMatchObject({ label: "Low sample", level: "neutral", lowSample: true });
    });

    it("rates it normally once the minimum is reached", () => {
      expect(
        severityForMetric(1, 0.7, "above_is_bad", { count: 3, min: 3 }).level,
      ).toBe("critical");
      // No sample info keeps the old behaviour.
      expect(severityForMetric(1, 0.7).level).toBe("critical");
    });

    it("defaults the minimum to 3 when the server does not send one", () => {
      expect(
        severityForMetric(1, 0.7, "above_is_bad", { count: 2 }).lowSample,
      ).toBe(true);
    });

    it("reports Low traffic instead of Warning for a single bad request", () => {
      const status = statusFromData({
        alerts: [],
        totalStoredEvents: 1,
        thresholds: { errorRate1h: 0.05, noVerifiedRate1h: 0.7, minSampleSize1h: 3 },
        windows: {
          "1h": {
            samples: { operational: 1, quality: 1, latency: 1 },
            rates: { errorRate: 0, noVerifiedRate: 1 },
            latencyMs: { p95: 19 },
          },
        },
      });
      expect(status.label).toBe("Low traffic");
    });

    it("still warns when enough requests are bad", () => {
      const status = statusFromData({
        alerts: [],
        totalStoredEvents: 5,
        thresholds: { errorRate1h: 0.05, noVerifiedRate1h: 0.7, minSampleSize1h: 3 },
        windows: {
          "1h": {
            samples: { operational: 5, quality: 5, latency: 5 },
            rates: { errorRate: 0, noVerifiedRate: 0.8 },
            latencyMs: { p95: 19 },
          },
        },
      });
      expect(status.label).toBe("Warning");
    });

    it("an active alert always wins", () => {
      const status = statusFromData({
        alerts: [{ id: "x" }],
        totalStoredEvents: 1,
        thresholds: { minSampleSize1h: 3 },
        windows: { "1h": { samples: { operational: 1, quality: 1, latency: 1 }, rates: {}, latencyMs: {} } },
      });
      expect(status.label).toBe("Alerting");
    });
  });
});
