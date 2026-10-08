/**
 * Gold-labelled retrieval evaluation (shared by the CLI and the unit test).
 *
 * Runs each scenario in tests/unit/retrievalGoldSet.js through the same
 * candidate scorer and retrieval call analyze.js uses, then scores the cases
 * returned against the labels. Offline: no model call and no CanLII call (a
 * guard counts any fetch). It measures the corpus and heuristics half of
 * production; model-suggested citations are not covered yet.
 */
import { RETRIEVAL_GOLD_SET } from "../tests/unit/retrievalGoldSet.js";

// What analyze.js passes (api/analyze.js, runCaseLawRetrieval call).
const PRODUCTION_MAX_RESULTS = 10;
const RECALL_K = 3;

// Retrieval returns "R v Grant, 2009 SCC 32" for some cases and the bare
// "2009 SCC 32" for others; labels use the bare form. Compare on that.
const REPORTER_CITATION =
  /\[\d{4}\]\s+\d+\s+SCR\s+\d+|\d{4}\s+(?:SCC|UKPC|[A-Z]{2,6})\s+\d+/;

export function citationKey(citation) {
  const text = String(citation || "").trim();
  const match = text.match(REPORTER_CITATION);
  return (match ? match[0] : text).replace(/\s+/g, " ").toLowerCase();
}

function inList(list, citation) {
  const key = citationKey(citation);
  return (list || []).some((c) => citationKey(c) === key);
}

function labelOf(scenario, citation) {
  if (inList(scenario.wrong, citation)) return "wrong";
  if (inList(scenario.relevant, citation)) return "relevant";
  if (inList(scenario.acceptable, citation)) return "acceptable";
  return "unlabelled";
}

/**
 * Pure scoring of one scenario given the citations retrieval returned.
 * positive      = the corpus has an answer (relevant or acceptable labelled).
 * expect_empty  = it does not, so showing nothing is the right answer.
 */
export function classifyScenario(scenario, returned) {
  const relevant = scenario.relevant || [];
  const acceptable = scenario.acceptable || [];
  const kind = relevant.length + acceptable.length > 0 ? "positive" : "expect_empty";

  const labelled = returned.map((item) => ({
    ...item,
    label: labelOf(scenario, item.citation),
  }));
  const has = (label) => labelled.some((item) => item.label === label);

  let verdict;
  if (has("wrong")) verdict = "WRONG";
  else if (kind === "positive") {
    if (has("relevant")) verdict = "HIT";
    else if (has("acceptable")) verdict = "HIT_WEAK";
    else verdict = "MISS";
  } else {
    verdict = labelled.length === 0 ? "OK_EMPTY" : "REVIEW";
  }

  const top = labelled.slice(0, RECALL_K).map((item) => item.citation);
  const relevantFoundInTop = relevant.filter((c) => inList(top, c)).length;
  const firstGoodRank =
    labelled.findIndex(
      (item) => item.label === "relevant" || item.label === "acceptable",
    ) + 1;

  // The same case shown twice (e.g. a corpus row and a landmark seed whose
  // citations are written differently) wastes a result slot.
  const keys = labelled.map((item) => citationKey(item.citation));
  const duplicates = keys.length - new Set(keys).size;

  return {
    id: scenario.id,
    kind,
    verdict,
    duplicates,
    returned: labelled,
    missingRelevant: relevant.filter(
      (c) => !labelled.some((item) => citationKey(item.citation) === citationKey(c)),
    ),
    recallAtK:
      relevant.length > 0
        ? relevantFoundInTop / Math.min(relevant.length, RECALL_K)
        : null,
    firstGoodRank: firstGoodRank || null,
    gap: scenario.gap || null,
  };
}

const ratio = (num, den) => (den > 0 ? num / den : null);

export function summarizeGold(results) {
  const positives = results.filter((r) => r.kind === "positive");
  const strongTargets = positives.filter((r) => r.recallAtK !== null);
  const expectEmpty = results.filter((r) => r.kind === "expect_empty");
  const allReturned = results.flatMap((r) => r.returned);
  const good = allReturned.filter(
    (item) => item.label === "relevant" || item.label === "acceptable",
  );

  const verdicts = {};
  for (const r of results) verdicts[r.verdict] = (verdicts[r.verdict] || 0) + 1;

  return {
    scenarios: results.length,
    positives: positives.length,
    expectEmpty: expectEmpty.length,
    // Share of scenarios with a labelled answer where a relevant or
    // acceptable case came back.
    hitRate: ratio(
      positives.filter((r) => r.verdict === "HIT" || r.verdict === "HIT_WEAK")
        .length,
      positives.length,
    ),
    // Same, counting only the best-fit ("relevant") labels.
    strongHitRate: ratio(
      strongTargets.filter((r) => r.verdict === "HIT").length,
      strongTargets.length,
    ),
    recallAtK: ratio(
      strongTargets.reduce((sum, r) => sum + r.recallAtK, 0),
      strongTargets.length,
    ),
    // Of everything shown, how much is labelled relevant/acceptable.
    precision: ratio(good.length, allReturned.length),
    returnedTotal: allReturned.length,
    wrongCount: allReturned.filter((item) => item.label === "wrong").length,
    duplicateCount: results.reduce((sum, r) => sum + r.duplicates, 0),
    unlabelledCount: allReturned.filter((item) => item.label === "unlabelled")
      .length,
    // Of scenarios with no answer in the corpus, how often nothing was shown.
    emptyOkRate: ratio(
      expectEmpty.filter((r) => r.verdict === "OK_EMPTY").length,
      expectEmpty.length,
    ),
    verdicts,
  };
}

export async function runGoldEval({ scenarios = RETRIEVAL_GOLD_SET, ids } = {}) {
  const { retrieveVerifiedCaseLaw } = await import(
    "../api/_caseLawRetrieval.js"
  );
  const { __testables } = await import("../api/analyze.js");

  const selected = ids?.length
    ? scenarios.filter((s) => ids.includes(s.id))
    : scenarios;

  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = () => {
    fetchCalls += 1;
    return Promise.reject(new Error("gold eval is offline"));
  };

  const results = [];
  try {
    for (const scenario of selected) {
      const landmarkMatches = __testables.matchLandmarkCases(
        scenario.scenario,
      );
      const { cases, meta } = await retrieveVerifiedCaseLaw({
        scenario: scenario.scenario,
        apiKey: "gold-eval-offline",
        aiSuggestions: [],
        aiCaseLaw: [],
        landmarkMatches,
        criminalCode: [],
        maxResults: PRODUCTION_MAX_RESULTS,
      });
      const result = classifyScenario(
        scenario,
        cases.map((c) => ({
          citation: c.citation,
          title: c.title || c.citation,
        })),
      );
      result.issuePrimary = meta.issuePrimary;
      result.retrievalPass = meta.retrievalPass;
      results.push(result);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }

  return { results, summary: summarizeGold(results), fetchCalls };
}
