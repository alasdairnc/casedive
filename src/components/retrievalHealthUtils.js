export function pct(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(1)}%`;
}

export function num(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return String(value);
}

export function fmtDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

export function clip(text, maxLen = 180) {
  const raw = typeof text === "string" ? text.trim() : "";
  if (!raw) return "—";
  if (raw.length <= maxLen) return raw;
  return `${raw.slice(0, maxLen)}...`;
}

export function buildAgentFixPrompt(sample = {}) {
  const lines = [
    "Investigate and fix retrieval failure for this CaseDive scenario.",
    "",
    `Failure time: ${sample.lastSeen || sample.ts || "unknown"}`,
    `Endpoint: ${sample.endpoint || "unknown"}`,
    `Reason: ${sample.reason || "unknown"}`,
    `Retrieval error: ${sample.retrievalError ? "yes" : "no"}`,
    `Final case-law count: ${sample.finalCaseLawCount ?? 0}`,
    `Verified count: ${sample.verifiedCount ?? 0}`,
    `Fallback used: ${sample.fallbackPathUsed ? "yes" : "no"}`,
    `Latency (ms): ${sample.latencyMs ?? "n/a"}`,
    `Issue class: ${sample.classId || "unknown"}`,
    `Primary issue: ${sample.issuePrimary || sample.classId || "unknown"}`,
  ];

  const concepts = Array.isArray(sample.concepts) ? sample.concepts : [];
  if (concepts.length > 0 || sample.lengthBucket) {
    lines.push(
      `Matched legal concepts: ${concepts.join(", ") || "none"}`,
      `Scenario length: ${sample.lengthBucket || "unknown"}`,
    );
  }
  const d = sample.diagnostics;
  if (d) {
    lines.push(
      `Retrieval: ${d.termsTried} search term(s), ${d.candidateCount} candidate(s), ${d.verificationCalls} verification call(s), ${d.semanticFilterDropCount} dropped by the semantic filter`,
    );
  }
  lines.push("");

  if (sample.snippet) {
    lines.push(
      "Scenario (redacted; some names may remain):",
      sample.snippet,
      `Seen ${sample.count ?? 1} time(s)`,
      "",
    );
  } else if (sample.textState) {
    lines.push(
      `Scenario text is no longer stored (${sample.textState}). Work from the concepts and retrieval figures above.`,
      `Seen ${sample.count ?? 1} time(s)`,
      "",
    );
  }

  if (sample.fallbackTriggerReason) {
    lines.push(`Fallback trigger: ${sample.fallbackTriggerReason}`);
  }

  if (sample.errorMessage) {
    lines.push("", `Error message: ${sample.errorMessage}`);
  }

  lines.push(
    "",
    "Please:",
    "1) identify likely root cause in retrieval pipeline,",
    "2) propose minimal code fix,",
    "3) add or update tests to guard against recurrence,",
    "4) run relevant test commands and summarize results.",
  );

  return lines.join("\n");
}

export const DEFAULT_MIN_SAMPLES = 3;

// `sample` is { count, min }: with fewer than `min` requests behind a rate, one
// bad request reads as 100% and should not look like an emergency. The server
// applies the same minimum (minSampleSize1h) before it raises an alert.
export function severityForMetric(
  value,
  threshold,
  direction = "above_is_bad",
  sample = null,
) {
  if (sample && Number(sample.count || 0) < (sample.min ?? DEFAULT_MIN_SAMPLES)) {
    return {
      label: "Low sample",
      color: "#8c8c8c",
      border: "#b3b3b3",
      level: "neutral",
      lowSample: true,
    };
  }

  if (value == null || threshold == null) {
    return {
      label: "No data",
      color: "#8c8c8c",
      border: "#b3b3b3",
      level: "neutral",
    };
  }

  if (direction === "below_is_bad") {
    if (value < threshold)
      return {
        label: "Critical",
        color: "#E15B4C",
        border: "#E15B4C",
        level: "critical",
      };
    if (value < threshold * 1.2)
      return {
        label: "Warning",
        color: "#D8951F",
        border: "#D8951F",
        level: "warning",
      };
    return { label: "OK", color: "#3E9E63", border: "#3E9E63", level: "ok" };
  }

  if (value > threshold)
    return {
      label: "Critical",
      color: "#E15B4C",
      border: "#E15B4C",
      level: "critical",
    };
  if (value > threshold * 0.8)
    return {
      label: "Warning",
      color: "#D8951F",
      border: "#D8951F",
      level: "warning",
    };
  return { label: "OK", color: "#3E9E63", border: "#3E9E63", level: "ok" };
}

export function statusFromData(data) {
  const alerts = Array.isArray(data?.alerts) ? data.alerts.length : 0;
  const oneHour = data?.windows?.["1h"];
  if (!oneHour) return { label: "No data", color: "#8c8c8c" };

  const thresholds = data?.thresholds || {};
  const min = thresholds.minSampleSize1h ?? DEFAULT_MIN_SAMPLES;
  const enough = (count) => Number(count || 0) >= min;
  // Each rate is only judged once enough requests stand behind it.
  const errorRate = enough(oneHour?.samples?.operational)
    ? oneHour?.rates?.errorRate
    : null;
  const noVerifiedRate = enough(oneHour?.samples?.quality)
    ? oneHour?.rates?.noVerifiedRate
    : null;
  const p95 = enough(oneHour?.samples?.latency)
    ? oneHour?.latencyMs?.p95
    : null;

  if (alerts > 0) return { label: "Alerting", color: "#E15B4C" };
  if (
    (errorRate != null &&
      thresholds.errorRate1h != null &&
      errorRate > thresholds.errorRate1h * 0.8) ||
    (noVerifiedRate != null &&
      thresholds.noVerifiedRate1h != null &&
      noVerifiedRate > thresholds.noVerifiedRate1h * 0.8) ||
    (p95 != null &&
      thresholds.p95LatencyMs1h != null &&
      p95 > thresholds.p95LatencyMs1h * 0.8)
  ) {
    return { label: "Warning", color: "#D8951F" };
  }
  if ((data?.totalStoredEvents || 0) === 0)
    return { label: "No events", color: "#8c8c8c" };
  if (
    !enough(oneHour?.samples?.operational) &&
    !enough(oneHour?.samples?.quality)
  ) {
    return { label: "Low traffic", color: "#8c8c8c" };
  }
  return { label: "Healthy", color: "#3E9E63" };
}

// A regression-test stub for a failed scenario. Labels are left empty on
// purpose: a human decides what the right answer is before knownFailure goes.
//
// `includeText` is for the clipboard only. The repo is public, so the CLI writes
// a placeholder and the reviewer rewrites it as a synthetic scenario (same
// legal facts, invented details) before committing.
export function buildFixtureStub(item = {}, { includeText = true } = {}) {
  return {
    id: `prod_${item.id}`,
    sourceFailureId: item.id,
    // Placeholder when text is withheld (CLI, public repo) or already deleted.
    scenario:
      includeText && item.snippet
        ? item.snippet
        : `REWRITE: synthetic ${item.classId || "general_criminal"} scenario (seen ${item.count ?? 1}x)`,
    concepts: Array.isArray(item.concepts) ? item.concepts : [],
    expectedPrimary: item.classId || item.issuePrimary || "general_criminal",
    expectedResult: "nonzero_required",
    shouldInclude: [],
    shouldExclude: [],
    expectedKeywords: [],
    minResults: 1,
    maxResults: 3,
    landmarkMatches: [],
    knownFailure: "promoted from production; add labels, then remove this mark",
    observed: {
      reason: item.reason,
      count: item.count,
      firstSeen: item.firstSeen,
      lastSeen: item.lastSeen,
    },
    ...(item.note ? { reviewNote: item.note } : {}),
  };
}
