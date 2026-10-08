/**
 * Score retrieval against the gold labels in tests/unit/retrievalGoldSet.js.
 *
 *   npm run eval:retrieval-gold                 # summary + everything that is not a clean hit
 *   npm run eval:retrieval-gold -- --verbose    # every scenario
 *   npm run eval:retrieval-gold -- --ids a,b    # only these scenarios
 *   npm run eval:retrieval-gold -- --json out.json
 *
 * Offline and free: no model call, no CanLII call. With --strict, exits 1 if
 * any case labelled "wrong" is shown. See scripts/_retrievalGoldEval.js.
 */
import fs from "node:fs";
import { runGoldEval } from "./_retrievalGoldEval.js";

const args = process.argv.slice(2);
const verbose = args.includes("--verbose");
const flagValue = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : null;
};
const ids = flagValue("--ids")?.split(",").filter(Boolean);
const jsonOut = flagValue("--json");

const pct = (n) => (n === null ? "n/a" : `${(n * 100).toFixed(1)}%`);
const names = (items) =>
  items.map((i) => `${i.title}${i.label === "unlabelled" ? " ?" : ""}`).join("; ") ||
  "(nothing)";

const { results, summary, fetchCalls } = await runGoldEval({ ids });

console.log("CaseDive retrieval gold eval (offline)\n");
console.log(`Scenarios:        ${summary.scenarios} (${summary.positives} with an answer in the corpus, ${summary.expectEmpty} expecting nothing)`);
console.log(`Hit rate:         ${pct(summary.hitRate)}   (a relevant or acceptable case came back)`);
console.log(`Strong hit rate:  ${pct(summary.strongHitRate)}   (a best-fit case came back)`);
console.log(`Recall@3:         ${pct(summary.recallAtK)}   (best-fit cases found in the top 3)`);
console.log(`Precision:        ${pct(summary.precision)}   (of ${summary.returnedTotal} cases shown, labelled relevant/acceptable)`);
console.log(`Wrong shown:      ${summary.wrongCount}`);
console.log(`Duplicates shown: ${summary.duplicateCount}   (same case twice in one answer)`);
console.log(`Unlabelled shown: ${summary.unlabelledCount}   (review these, then label them)`);
console.log(`Empty when right: ${pct(summary.emptyOkRate)}`);
console.log(`Verdicts:         ${JSON.stringify(summary.verdicts)}`);
if (fetchCalls > 0) console.log(`\n!! ${fetchCalls} fetch call(s) were attempted; the eval is meant to be offline.`);

const order = ["WRONG", "MISS", "REVIEW", "HIT_WEAK", "OK_EMPTY", "HIT"];
const rows = results
  .filter((r) => verbose || (r.verdict !== "HIT" && r.verdict !== "OK_EMPTY"))
  .sort((a, b) => order.indexOf(a.verdict) - order.indexOf(b.verdict));

if (rows.length > 0) console.log(`\n${verbose ? "All scenarios" : "Needs attention"}:`);
for (const r of rows) {
  console.log(`\n[${r.verdict}] ${r.id}  (issue: ${r.issuePrimary})`);
  console.log(`   returned: ${names(r.returned)}`);
  if (r.missingRelevant.length > 0) console.log(`   missing best-fit: ${r.missingRelevant.join(", ")}`);
  if (r.gap) console.log(`   corpus gap: ${r.gap}`);
}

if (jsonOut) {
  fs.writeFileSync(jsonOut, JSON.stringify({ summary, results }, null, 2));
  console.log(`\nWrote ${jsonOut}`);
}

process.exit(args.includes("--strict") && summary.wrongCount > 0 ? 1 : 0);
