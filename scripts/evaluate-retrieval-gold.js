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
import { RETRIEVAL_HELD_OUT_SET } from "../tests/unit/retrievalHeldOutSet.js";
import {
  checkReplayFidelity,
  loadFixtures,
  runFailureNegatives,
  runGoldEval,
  withFullText,
} from "./_retrievalGoldEval.js";

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

if (args.includes("--compare")) {
  const measure = (on) =>
    withFullText(on, async () => ({
      dev: (await runGoldEval()).summary,
      held: (await runGoldEval({ scenarios: RETRIEVAL_HELD_OUT_SET })).summary,
      neg: await runFailureNegatives(),
    }));
  const off = await measure(false);
  const on = await measure(true);
  const row = (label, a, b, fmt = pct) =>
    console.log(`${label.padEnd(34)} ${String(fmt(a)).padStart(8)} ${String(fmt(b)).padStart(8)}`);
  console.log("RETRIEVAL_FULLTEXT comparison (offline)\n");
  console.log(`${"".padEnd(34)} ${"off".padStart(8)} ${"on".padStart(8)}`);
  for (const [name, key] of [["dev", "dev"], ["held-out", "held"]]) {
    row(`${name} hit rate`, off[key].hitRate, on[key].hitRate);
    row(`${name} strong hit rate`, off[key].strongHitRate, on[key].strongHitRate);
    row(`${name} recall@3`, off[key].recallAtK, on[key].recallAtK);
    row(`${name} precision`, off[key].precision, on[key].precision);
    row(`${name} wrong shown`, off[key].wrongCount, on[key].wrongCount, (n) => n);
    row(`${name} empty when right`, off[key].emptyOkRate, on[key].emptyOkRate);
  }
  row("negative replay leaks (of " + off.neg.total + ")", off.neg.leakCount, on.neg.leakCount, (n) => n);
  for (const leak of on.neg.leaks) console.log(`   leak (on): ${leak.id} => ${leak.shown.join("; ")}`);
  process.exit(0);
}

if (args.includes("--fulltext")) process.env.RETRIEVAL_FULLTEXT = "on";

const fixtures = args.includes("--with-model") ? loadFixtures() : null;
if (args.includes("--with-model") && !fixtures) {
  console.error("No fixtures: run scripts/record-retrieval-fixtures.js first (spends Claude tokens).");
  process.exit(1);
}
if (fixtures) {
  console.log(`Mode: model replay (recorded ${fixtures.recordedAt}, ${fixtures.model}); CanLII answers replayed`);
  const fidelity = await checkReplayFidelity(fixtures);
  console.log(`Replay vs live at recording: ${fidelity.differences.length} of ${fidelity.total} differ${fidelity.unserved ? `, ${fidelity.unserved} unrecorded fetches` : ""}\n`);
}

const { results, summary, fetchCalls } = await runGoldEval({ ids, fixtures });

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

const heldOut = await runGoldEval({ scenarios: RETRIEVAL_HELD_OUT_SET, fixtures });
const h = heldOut.summary;
console.log(
  `\nHeld-out (${h.scenarios} frozen scenarios): hit ${pct(h.hitRate)}, strong ${pct(h.strongHitRate)}, recall@3 ${pct(h.recallAtK)}, precision ${pct(h.precision)}, wrong ${h.wrongCount}`,
);
for (const r of heldOut.results.filter((x) => x.verdict !== "HIT")) {
  console.log(`   [${r.verdict}] ${r.id}: ${names(r.returned)}`);
}

const negatives = await runFailureNegatives({ fixtures });
console.log(
  `\nNegative replay: ${negatives.leakCount} of ${negatives.total} "expect no case law" scenarios showed a case (production scorer, real corpus).`,
);
for (const leak of negatives.leaks) {
  console.log(`   leak: ${leak.id} => ${leak.shown.join("; ")}`);
}

if (jsonOut) {
  fs.writeFileSync(jsonOut, JSON.stringify({ summary, results, heldOut: heldOut.summary, heldOutResults: heldOut.results, negatives }, null, 2));
  console.log(`\nWrote ${jsonOut}`);
}

process.exit(args.includes("--strict") && summary.wrongCount > 0 ? 1 : 0);
