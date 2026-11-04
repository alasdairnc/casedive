// api/_retrievalImprovements.js
// Build lightweight, deterministic tuning suggestions from the open failure
// queue. Each failure record already carries a redacted snippet and a repeat
// count, so suggestions are ranked by how many real users hit them.

import { getScenarioClassLabels } from "./_scenarioClassification.js";

const EXAMPLES_PER_CLASS = 2;

function normalizeClassId(value) {
  const cleaned = String(value || "").trim();
  return cleaned || "unknown";
}

export function buildRetrievalImprovements(failures = []) {
  if (!Array.isArray(failures) || failures.length === 0) return [];

  const grouped = new Map();
  for (const failure of failures) {
    const classId = normalizeClassId(failure?.classId || failure?.issuePrimary);
    if (!grouped.has(classId)) {
      grouped.set(classId, {
        classId,
        count: 0,
        scenarios: 0,
        reasons: new Set(),
        issuePrimaries: new Set(),
        examples: [],
        suggestedTerms: new Set(getScenarioClassLabels(classId)),
      });
    }

    const entry = grouped.get(classId);
    entry.count += Number(failure?.count) || 1;
    entry.scenarios += 1;
    if (failure?.reason) entry.reasons.add(String(failure.reason));
    if (failure?.issuePrimary) {
      entry.issuePrimaries.add(String(failure.issuePrimary));
    }
    if (failure?.snippet && entry.examples.length < EXAMPLES_PER_CLASS) {
      entry.examples.push({ id: failure.id || null, snippet: failure.snippet });
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
      scenarioCount: entry.scenarios,
      reasons: Array.from(entry.reasons),
      suggestedTerms: Array.from(entry.suggestedTerms).slice(0, 6),
      examples: entry.examples,
      action: "tune_query_terms",
      confidence: entry.count >= 2 ? "high" : "medium",
    }));
}
