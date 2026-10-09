/**
 * Gold-labelled retrieval evaluation (shared by the CLI and the unit test).
 *
 * Runs each scenario in tests/unit/retrievalGoldSet.js through the same
 * candidate scorer and retrieval call analyze.js uses, then scores the cases
 * returned against the labels. Offline: no model call and no CanLII call (a
 * guard counts any fetch). It measures the corpus and heuristics half of
 * production; model-suggested citations are not covered yet.
 */
import fs from "node:fs";
import { normalizeFilters } from "../api/_filters.js";
import { RETRIEVAL_GOLD_SET } from "../tests/unit/retrievalGoldSet.js";
import { RETRIEVAL_FAILURE_SET } from "../tests/unit/retrievalFailureSet.js";

// What analyze.js passes (api/analyze.js, runCaseLawRetrieval call).
const PRODUCTION_MAX_RESULTS = 10;
// analyze.js then keeps the top 3 through selectTopRetrievedCases.
const PRODUCTION_SHOWN_MAX = 3;
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

export const FIXTURES_PATH = new URL(
  "../tests/fixtures/retrieval-ai-fixtures.json",
  import.meta.url,
);

/**
 * Recorded model suggestions and CanLII responses (scripts/record-retrieval-
 * fixtures.js), or null when none have been recorded.
 */
export function loadFixtures() {
  try {
    return JSON.parse(fs.readFileSync(FIXTURES_PATH, "utf8"));
  } catch {
    return null;
  }
}

// Offline guard. Recorded CanLII responses are served from the fixtures; any
// other fetch is refused and counted in state.unserved.
function installFetchStub(fixtures, state) {
  const original = globalThis.fetch;
  globalThis.fetch = async (input) => {
    const url = String(input?.url || input);
    let pathname = "";
    try {
      pathname = new URL(url).pathname;
    } catch {
      /* not a URL */
    }
    const recorded = fixtures?.canlii?.[pathname];
    if (recorded) {
      return new Response(
        JSON.stringify(
          recorded.status === 200 ? { title: recorded.title } : {},
        ),
        {
          status: recorded.status,
          headers: { "content-type": "application/json" },
        },
      );
    }
    state.unserved += 1;
    throw new Error("gold eval is offline");
  };
  return () => {
    globalThis.fetch = original;
  };
}

// One scenario through the production steps: candidate scorer, retrieval with
// the (recorded) model suggestions, then analyze.js's top-3 filter.
async function retrieveShown(text, fixtures) {
  const { retrieveVerifiedCaseLaw } = await import("../api/_caseLawRetrieval.js");
  const { __testables } = await import("../api/analyze.js");
  const recorded = fixtures?.scenarios?.[text] || null;
  const { cases, meta } = await retrieveVerifiedCaseLaw({
    scenario: text.trim(),
    filters: normalizeFilters({}),
    aiSuggestions: recorded?.ai.suggestions || [],
    aiCaseLaw: recorded?.ai.case_law || [],
    landmarkMatches: __testables.matchLandmarkCases(text),
    criminalCode: recorded?.ai.criminal_code || [],
    civilLaw: recorded?.ai.civil_law || [],
    apiKey: "gold-eval-offline",
    maxResults: PRODUCTION_MAX_RESULTS,
  });
  const shown = __testables.selectTopRetrievedCases(
    text,
    cases,
    PRODUCTION_SHOWN_MAX,
  );
  return { shown, meta, recorded };
}

/**
 * Score scenarios against their labels. With `fixtures`, the model's recorded
 * citations and CanLII's recorded answers are replayed through retrieval (the
 * full production path); without, only the corpus half runs.
 */
export async function runGoldEval({
  scenarios = RETRIEVAL_GOLD_SET,
  ids,
  fixtures = null,
} = {}) {
  const selected = ids?.length
    ? scenarios.filter((s) => ids.includes(s.id))
    : scenarios;

  const state = { unserved: 0 };
  const restore = installFetchStub(fixtures, state);
  const results = [];
  try {
    for (const scenario of selected) {
      const { shown, meta, recorded } = await retrieveShown(
        scenario.scenario,
        fixtures,
      );
      const result = classifyScenario(
        scenario,
        shown.map((c) => ({
          citation: c.citation,
          title: c.title || c.citation,
        })),
      );
      result.issuePrimary = meta.issuePrimary;
      result.retrievalPass = meta.retrievalPass;
      result.hadRecording = Boolean(recorded);
      result.modelCitations = (recorded?.ai.case_law || []).map(
        (c) => c.citation,
      );
      results.push(result);
    }
  } finally {
    restore();
  }

  return { results, summary: summarizeGold(results), fetchCalls: state.unserved };
}

/**
 * The failure set's "expect no case law" scenarios, replayed through the
 * production candidate scorer (and, with fixtures, the recorded model output).
 * scripts/evaluate-retrieval-failures.js injects its own landmark matches, so
 * it never exercises the scorer; this does. A leak is any case shown.
 */
export async function runFailureNegatives({
  scenarios = RETRIEVAL_FAILURE_SET,
  fixtures = null,
} = {}) {
  const negatives = scenarios.filter((s) => (s.maxResults ?? 0) === 0);
  const state = { unserved: 0 };
  const restore = installFetchStub(fixtures, state);
  const leaks = [];
  try {
    for (const scenario of negatives) {
      const { shown } = await retrieveShown(scenario.scenario, fixtures);
      if (shown.length > 0) {
        leaks.push({
          id: scenario.id,
          shown: shown.map((c) => c.title || c.citation),
        });
      }
    }
  } finally {
    restore();
  }
  return { total: negatives.length, leaks, leakCount: leaks.length };
}

/**
 * Replay every recorded scenario and compare with what the live run showed at
 * recording time. Zero differences means the replay is faithful; after a
 * deliberate retrieval change the differences are the change's effect.
 */
export async function checkReplayFidelity(fixtures) {
  const state = { unserved: 0 };
  const restore = installFetchStub(fixtures, state);
  const differences = [];
  let total = 0;
  try {
    for (const [text, recorded] of Object.entries(fixtures?.scenarios || {})) {
      total += 1;
      const { shown } = await retrieveShown(text, fixtures);
      const replay = shown.map((c) => citationKey(c.citation));
      const live = (recorded.live || []).map((c) => citationKey(c.citation));
      if (JSON.stringify(replay) !== JSON.stringify(live)) {
        differences.push({ id: recorded.id, live: recorded.live, replay: shown.map((c) => c.title || c.citation) });
      }
    }
  } finally {
    restore();
  }
  return { total, differences, unserved: state.unserved };
}

/** Run fn with RETRIEVAL_FULLTEXT forced on or off, restoring it afterwards. */
export async function withFullText(on, fn) {
  const previous = process.env.RETRIEVAL_FULLTEXT;
  process.env.RETRIEVAL_FULLTEXT = on ? "on" : "off";
  try {
    return await fn();
  } finally {
    if (previous === undefined) delete process.env.RETRIEVAL_FULLTEXT;
    else process.env.RETRIEVAL_FULLTEXT = previous;
  }
}
