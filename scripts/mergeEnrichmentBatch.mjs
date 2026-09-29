#!/usr/bin/env node
// scripts/mergeEnrichmentBatch.mjs
// Applies verified writer/verifier results (from the enrichment pipeline)
// into criminalCodeData.js via the shared regenerate-and-verify writer
// (_criminalCodeDataWriter.mjs). May only change summary/severity/maxPenalty/
// relatedSections, and only on non-curated entries.
//
// Curated entries (definition present) are never modified; a curatedMismatch
// is written to a report for human review instead of being auto-applied.
//
// Usage: node scripts/mergeEnrichmentBatch.mjs <verified-results.json>

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import {
  ROOT,
  loadCriminalCodeData,
  patchRows,
  readJsonArg,
  writeCriminalCodeData,
} from "./_criminalCodeDataWriter.mjs";

const ALLOWED_FIELDS = ["summary", "severity", "maxPenalty", "relatedSections"];

const results = readJsonArg("node scripts/mergeEnrichmentBatch.mjs <verified-results.json>");
const overrides = new Map(results.map((r) => [r.section, r]));

const { sections: existingMap, parts } = await loadCriminalCodeData();

let applied = 0;
let skippedCurated = 0;
let skippedNoContent = 0;
const mismatchReport = [];
const penaltyIssueReport = [];

const rows = patchRows(existingMap, ALLOWED_FIELDS, (num, existing) => {
  const override = overrides.get(num);

  if (existing.definition) {
    // Curated — never modified here. Just collect the mismatch for review.
    if (override?.curatedMismatch) {
      mismatchReport.push({
        section: num,
        title: existing.title,
        curatedMismatch: override.curatedMismatch,
      });
    }
    skippedCurated++;
    return {};
  }

  if (override?.existingPenaltyIssue) {
    penaltyIssueReport.push({
      section: num,
      title: existing.title,
      existingMaxPenalty: existing.maxPenalty || "",
      existingPenaltyIssue: override.existingPenaltyIssue,
    });
  }

  // relatedSections is taken whether or not the summary itself was accepted.
  const patch = {
    relatedSections: override?.finalRelatedSections?.length ? override.finalRelatedSections : undefined,
  };
  if (override?.summaryAccepted && override?.finalSummary) {
    patch.summary = override.finalSummary;
    patch.severity = override.finalSeverity || undefined;
    patch.maxPenalty = override.finalMaxPenalty || undefined;
    if (!existing.summary) applied++;
  } else {
    skippedNoContent++;
  }
  return patch;
});

await writeCriminalCodeData({
  before: existingMap,
  rows,
  parts,
  allowedFields: ALLOWED_FIELDS,
  lockCurated: true,
  expect: { summary: applied },
});

console.log(`Applied: ${applied}`);
console.log(`Skipped (curated, untouched): ${skippedCurated}`);
console.log(`Skipped (no accepted summary): ${skippedNoContent}`);

if (mismatchReport.length) {
  const reportPath = resolve(ROOT, "reports/curated-entry-mismatches.json");
  writeFileSync(reportPath, JSON.stringify(mismatchReport, null, 2));
  console.log(`\nCurated-entry mismatches found (NOT auto-fixed): ${mismatchReport.length}`);
  console.log(`Written to ${reportPath}`);
  for (const m of mismatchReport) {
    console.log(`  s.${m.section} (${m.title}): ${m.curatedMismatch}`);
  }
}

if (penaltyIssueReport.length) {
  const reportPath = resolve(ROOT, "reports/non-curated-penalty-issues.json");
  // Append across runs rather than overwrite, since this script runs once per chunk.
  let existingReport = [];
  try {
    existingReport = JSON.parse(readFileSync(reportPath, "utf-8"));
  } catch {
    // no prior report
  }
  const combined = [...existingReport, ...penaltyIssueReport];
  writeFileSync(reportPath, JSON.stringify(combined, null, 2));
  console.log(`\nPre-existing (unverified) maxPenalty issues found on non-curated sections: ${penaltyIssueReport.length} (report now has ${combined.length} total)`);
  console.log(`Written to ${reportPath}`);
  for (const p of penaltyIssueReport) {
    console.log(`  s.${p.section} (${p.title}): "${p.existingMaxPenalty}" — ${p.existingPenaltyIssue}`);
  }
}
