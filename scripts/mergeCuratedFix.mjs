#!/usr/bin/env node
// scripts/mergeCuratedFix.mjs
// Applies verified curated-entry rewrites (from enrichmentWorkflow.mjs's
// "curated-rewrite" mode) into criminalCodeData.js via the shared
// regenerate-and-verify writer (_criminalCodeDataWriter.mjs). May only change
// definition/maxPenalty/relatedSections.
//
// Only applies a result when approved=true. A rejected result (approved=false)
// leaves the existing curated entry untouched and is written to
// reports/curated-rewrite-rejected.json for human review.
//
// Usage: node scripts/mergeCuratedFix.mjs <verified-results.json>

import { writeFileSync } from "fs";
import { resolve } from "path";
import {
  ROOT,
  loadCriminalCodeData,
  patchRows,
  readJsonArg,
  writeCriminalCodeData,
} from "./_criminalCodeDataWriter.mjs";

const ALLOWED_FIELDS = ["definition", "maxPenalty", "relatedSections"];

const results = readJsonArg("node scripts/mergeCuratedFix.mjs <verified-results.json>");
const overrides = new Map(results.map((r) => [r.section, r]));

const { sections: existingMap, parts } = await loadCriminalCodeData();

let applied = 0;
let rejected = 0;
let untouched = 0;
const rejectedReport = [];

const rows = patchRows(existingMap, ALLOWED_FIELDS, (num, existing) => {
  const override = overrides.get(num);
  if (!override) {
    untouched++;
    return {};
  }
  if (!override.approved) {
    rejected++;
    rejectedReport.push({ section: num, title: existing.title, notes: override.notes });
    return {};
  }
  applied++;
  return {
    definition: override.finalDefinition || undefined,
    maxPenalty: override.finalMaxPenalty || undefined,
    relatedSections: override.finalRelatedSections?.length ? override.finalRelatedSections : undefined,
  };
});

await writeCriminalCodeData({ before: existingMap, rows, parts, allowedFields: ALLOWED_FIELDS });

console.log(`Applied (approved rewrites): ${applied}`);
console.log(`Rejected (left untouched, needs human review): ${rejected}`);
console.log(`Untouched (not in this results file): ${untouched}`);

if (rejectedReport.length) {
  const reportPath = resolve(ROOT, "reports/curated-rewrite-rejected.json");
  writeFileSync(reportPath, JSON.stringify(rejectedReport, null, 2));
  console.log(`\nRejected rewrites written to ${reportPath}`);
  for (const r of rejectedReport) {
    console.log(`  s.${r.section} (${r.title}): ${r.notes}`);
  }
}
