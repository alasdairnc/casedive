#!/usr/bin/env node
// scripts/mergeSummaryFix.mjs
// Applies hand-verified `summary` corrections from summary-audit mode via the
// shared regenerate-and-verify writer (_criminalCodeDataWriter.mjs). May only
// change `summary`, and never on a curated entry.
//
// Input: the audit's flagged array — [{section, issue, finalSummary}, ...].
// Only entries with a non-empty finalSummary are applied; entries where the
// auditor couldn't confidently write a replacement are skipped (left as-is)
// and written to reports/summary-audit-unresolved.json for human review.
//
// Usage: node scripts/mergeSummaryFix.mjs <flagged.json>

import { writeFileSync } from "fs";
import { resolve } from "path";
import {
  ROOT,
  assertSectionsExist,
  loadCriminalCodeData,
  patchRows,
  readJsonArg,
  writeCriminalCodeData,
} from "./_criminalCodeDataWriter.mjs";

const ALLOWED_FIELDS = ["summary"];

const flagged = readJsonArg("node scripts/mergeSummaryFix.mjs <flagged.json>");
const fixes = new Map(flagged.filter((f) => f.finalSummary).map((f) => [f.section, f]));
const unresolved = flagged.filter((f) => !f.finalSummary);

const { sections: existingMap, parts } = await loadCriminalCodeData();
assertSectionsExist(fixes.keys(), existingMap);
for (const key of fixes.keys()) {
  if (existingMap.get(key).definition) {
    console.error(`REFUSING: "${key}" is a curated entry (has definition) — this script must never touch curated content. Aborting.`);
    process.exit(1);
  }
}

let applied = 0;

const rows = patchRows(existingMap, ALLOWED_FIELDS, (num) => {
  const fix = fixes.get(num);
  if (!fix) return {};
  applied++;
  return { summary: fix.finalSummary };
});

await writeCriminalCodeData({
  before: existingMap,
  rows,
  parts,
  allowedFields: ALLOWED_FIELDS,
  lockCurated: true,
});
console.log(`Applied ${applied} summary corrections.`);

if (unresolved.length) {
  const reportPath = resolve(ROOT, "reports/summary-audit-unresolved.json");
  writeFileSync(reportPath, JSON.stringify(unresolved, null, 2));
  console.log(`\n${unresolved.length} flagged sections had no confident replacement (left as-is, needs human review):`);
  console.log(`Written to ${reportPath}`);
  for (const u of unresolved) {
    console.log(`  s.${u.section}: ${u.issue}`);
  }
}
