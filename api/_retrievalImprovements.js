// api/_retrievalImprovements.js
// Build lightweight, deterministic tuning suggestions from recent retrieval failures.

import { getScenarioClassLabels } from "./_scenarioClassification.js";

function normalizeClassId(value) {
  const cleaned = String(value || "").trim();
  return cleaned || "unknown";
}

export function buildRetrievalImprovements(recentFailures = []) {
  if (!Array.isArray(recentFailures) || recentFailures.length === 0) {
    return [];
  }

  const grouped = new Map();
  for (const failure of recentFailures) {
    const classId = normalizeClassId(
      failure?.classId || failure?.issuePrimary || "unknown",
    );

    if (!grouped.has(classId)) {
      grouped.set(classId, {
        classId,
        count: 0,
        reasons: new Set(),
        issuePrimaries: new Set(),
        suggestedTerms: new Set(getScenarioClassLabels(classId)),
      });
    }

    const entry = grouped.get(classId);
    entry.count += 1;
    if (failure?.reason) entry.reasons.add(String(failure.reason));
    if (failure?.issuePrimary) {
      entry.issuePrimaries.add(String(failure.issuePrimary));
    }
  }

  return Array.from(grouped.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
    .map((entry, idx) => ({
      id: `improve-${idx + 1}`,
      classId: entry.classId,
      issuePrimary: Array.from(entry.issuePrimaries)[0] || entry.classId,
      failureCount: entry.count,
      reasons: Array.from(entry.reasons),
      suggestedTerms: Array.from(entry.suggestedTerms).slice(0, 6),
      action: "tune_query_terms",
      confidence: entry.count >= 2 ? "high" : "medium",
    }));
}
