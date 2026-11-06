// api/_retrievalImprovements.js
// Build lightweight, deterministic tuning suggestions from the open failure
// queue. Each record carries structured features (matched legal concepts,
// retrieval diagnostics) and a repeat count, so suggestions are ranked by how
// many real users hit them and work even after the snippet text has been
// deleted. Examples are shown only while a snippet still exists.

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
    // An out-of-scope answer is the scope check working, not a retrieval miss:
    // "tune the criminal query terms" is the wrong lesson from a tenancy question.
    if (failure?.reason === "non_criminal_scope") continue;
    const classId = normalizeClassId(failure?.classId || failure?.issuePrimary);
    if (!grouped.has(classId)) {
      grouped.set(classId, {
        classId,
        count: 0,
        scenarios: 0,
        reasons: new Set(),
        issuePrimaries: new Set(),
        examples: [],
        concepts: new Map(),
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
    const weight = Number(failure?.count) || 1;
    for (const concept of Array.isArray(failure?.concepts) ? failure.concepts : []) {
      entry.concepts.set(concept, (entry.concepts.get(concept) || 0) + weight);
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
      // Legal concepts these failures share, most common first.
      topConcepts: [...entry.concepts.entries()]
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .slice(0, 5)
        .map(([concept, count]) => ({ concept, count })),
      examples: entry.examples,
      action: "tune_query_terms",
      confidence: entry.count >= 2 ? "high" : "medium",
    }));
}
