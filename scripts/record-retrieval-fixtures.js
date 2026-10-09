/**
 * Record what the live model suggests, and what CanLII answers, for the
 * retrieval eval scenarios, so retrieval changes can be replayed offline.
 *
 *   node --env-file=.env scripts/record-retrieval-fixtures.js [--out FILE] [--ids a,b] [--force] [--concurrency N]
 *
 * SPENDS CLAUDE TOKENS (one analyze model call per scenario, about 90 calls on
 * the full set) and makes CanLII lookups. Opt-in only; never run in CI. Redis
 * is disabled for the run so cached lookups cannot hide a CanLII response.
 *
 * For each scenario it runs analyze.js's own steps: the pre-retrieval pass,
 * analyzeWithRetry (the real prompt and model), then the final retrieval with
 * the model's suggestions. It stores the model's case_law/suggestions/
 * criminal_code, every CanLII response seen, and the cases a user would have
 * seen (`live`). tests/unit/retrievalFixtures.js reads the file.
 */
import fs from "node:fs";
import path from "node:path";

// No Redis: a cache hit would skip the CanLII fetch we are trying to record.
for (const name of [
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "KV_REST_API_URL",
  "KV_REST_API_TOKEN",
  "SENTRY_DSN",
]) {
  delete process.env[name];
}

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const outPath = path.resolve(
  flag("--out") || "tests/fixtures/retrieval-ai-fixtures.json",
);
const onlyIds = flag("--ids")?.split(",").filter(Boolean);
const force = args.includes("--force");
const concurrency = Math.max(1, Number(flag("--concurrency")) || 3);

if (!process.env.ANTHROPIC_API_KEY || !process.env.CANLII_API_KEY) {
  console.error("ANTHROPIC_API_KEY and CANLII_API_KEY are required.");
  process.exit(1);
}

const { RETRIEVAL_GOLD_SET } = await import("../tests/unit/retrievalGoldSet.js");
const { RETRIEVAL_HELD_OUT_SET } = await import("../tests/unit/retrievalHeldOutSet.js");
const { RETRIEVAL_HELD_OUT_SET_2 } = await import("../tests/unit/retrievalHeldOutSet2.js");
const { RETRIEVAL_NEAR_MISS_NEGATIVES } = await import("../tests/unit/retrievalNearMissNegatives.js");
const { RETRIEVAL_NEAR_MISS_NEGATIVES_2 } = await import("../tests/unit/retrievalNearMissNegatives2.js");
const { RETRIEVAL_FAILURE_SET } = await import("../tests/unit/retrievalFailureSet.js");
const { normalizeFilters } = await import("../api/_filters.js");
const { __testables } = await import("../api/analyze.js");
const { runCaseLawRetrieval } = await import("../api/_retrievalOrchestrator.js");
const { retrieveVerifiedCaseLaw } = await import("../api/_caseLawRetrieval.js");

// Every distinct scenario text, tagged with the set it came from.
const byText = new Map();
const add = (set, items) => {
  for (const s of items) {
    if (!byText.has(s.scenario)) byText.set(s.scenario, { id: s.id, set });
  }
};
add("gold", RETRIEVAL_GOLD_SET);
add("heldout", RETRIEVAL_HELD_OUT_SET);
add("heldout2", RETRIEVAL_HELD_OUT_SET_2);
add("nearmiss", RETRIEVAL_NEAR_MISS_NEGATIVES);
add("nearmiss2", RETRIEVAL_NEAR_MISS_NEGATIVES_2);
add(
  "negative",
  RETRIEVAL_FAILURE_SET.filter((s) => (s.maxResults ?? 0) === 0),
);
let work = [...byText.entries()].map(([scenario, meta]) => ({ scenario, ...meta }));
if (onlyIds) work = work.filter((w) => onlyIds.includes(w.id));

const existing = fs.existsSync(outPath)
  ? JSON.parse(fs.readFileSync(outPath, "utf8"))
  : { model: null, recordedAt: null, canlii: {}, scenarios: {} };
if (force) existing.scenarios = {};
const todo = work.filter((w) => !existing.scenarios[w.scenario]);

// Record every CanLII API response (status and title) by path.
const realFetch = globalThis.fetch;
globalThis.fetch = async (input, init) => {
  const url = String(input?.url || input);
  const response = await realFetch(input, init);
  if (url.includes("api.canlii.org/v1/caseBrowse/")) {
    const pathname = new URL(url).pathname;
    // Only what lookupCase reads: the status and the title.
    let title = null;
    try {
      title = JSON.parse(await response.clone().text())?.title ?? null;
    } catch {
      /* not JSON */
    }
    existing.canlii[pathname] = { status: response.status, title };
  }
  return response;
};

const filters = normalizeFilters({});
const canliiKey = process.env.CANLII_API_KEY;
const totals = { output: 0, calls: 0, failed: 0 };

async function recordOne(item) {
  const started = Date.now();
  const pre = await runCaseLawRetrieval({
    scenario: item.scenario.trim(),
    filters,
    aiSuggestions: [],
    aiCaseLaw: [],
    landmarkMatches: [],
    criminalCode: [],
    apiKey: canliiKey,
    maxResults: 5,
    timeoutMs: 5_000,
  }).catch(() => ({ cases: [] }));

  const { result, matchedLandmarks, usage } =
    await __testables.analyzeWithRetry(
      item.scenario,
      filters,
      process.env.ANTHROPIC_API_KEY,
      pre.cases || [],
      Date.now() + 55_000,
    );
  if (!result) throw new Error("model returned no parseable result");

  const ai = {
    case_law: Array.isArray(result.case_law) ? result.case_law : [],
    suggestions: Array.isArray(result.suggestions) ? result.suggestions : [],
    criminal_code: Array.isArray(result.criminal_code) ? result.criminal_code : [],
    // Kept for scope analysis (does the model think this is criminal law?);
    // retrieval does not read them.
    charter: Array.isArray(result.charter) ? result.charter : [],
    civil_law: Array.isArray(result.civil_law) ? result.civil_law : [],
  };

  const final = await retrieveVerifiedCaseLaw({
    scenario: item.scenario.trim(),
    filters,
    aiSuggestions: ai.suggestions,
    aiCaseLaw: ai.case_law,
    landmarkMatches: matchedLandmarks,
    criminalCode: ai.criminal_code,
    civilLaw: ai.civil_law,
    apiKey: canliiKey,
    maxResults: 10,
  });
  const live = __testables
    .selectTopRetrievedCases(item.scenario, final.cases, 3)
    .map((c) => ({ citation: c.citation, title: c.title || c.citation }));

  existing.scenarios[item.scenario] = {
    id: item.id,
    set: item.set,
    ai,
    live,
    usage: usage || null,
    ms: Date.now() - started,
  };
  totals.calls += 1;
  totals.output += Number(usage?.outputTokens) || 0;
}

function save() {
  existing.model = process.env.ANTHROPIC_MODEL_ID || "claude-haiku-4-5-20251001";
  existing.recordedAt = new Date().toISOString();
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(existing, null, 2));
}

console.log(
  `Recording ${todo.length} of ${work.length} scenarios (concurrency ${concurrency}) -> ${outPath}`,
);
let next = 0;
async function worker() {
  while (next < todo.length) {
    const item = todo[next++];
    try {
      await recordOne(item);
      console.log(`ok   ${item.set}/${item.id}`);
    } catch (err) {
      totals.failed += 1;
      console.log(`FAIL ${item.set}/${item.id}: ${err.message}`);
    }
    save();
  }
}
await Promise.all(Array.from({ length: concurrency }, worker));
save();
console.log(
  `\nDone. ${totals.calls} recorded, ${totals.failed} failed. Output tokens: ${totals.output} (input is not reported by analyzeWithRetry).`,
);
process.exit(totals.failed > 0 ? 2 : 0);
