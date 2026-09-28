#!/usr/bin/env node
// scripts/mergeEnrichmentBatch.mjs
// Applies verified writer/verifier results (from the enrichment pipeline)
// into criminalCodeData.js by regenerating the whole file from the loaded
// module plus overrides — same proven approach as mergeCriminalCode.mjs,
// not regex-splicing the source text (a regex-based version of that script
// once silently matched zero entries against this file's real formatting).
//
// Curated entries (definition present) are never modified beyond what's
// already there; a curatedMismatch is written to a report for human review
// instead of being auto-applied.
//
// Usage: node scripts/mergeEnrichmentBatch.mjs <verified-results.json>

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA_PATH = resolve(ROOT, "src/lib/criminalCodeData.js");

const [, , resultsFile] = process.argv;
const results = JSON.parse(readFileSync(resultsFile, "utf-8"));
const overrides = new Map(results.map((r) => [r.section, r]));

const { CRIMINAL_CODE_SECTIONS: existingMap, CRIMINAL_CODE_PARTS } = await import(
  `${pathToFileURL(DATA_PATH).href}?t=${process.hrtime.bigint()}`
);

function escapeStr(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function strArray(arr) {
  return `[${arr.map((s) => `"${escapeStr(s)}"`).join(", ")}]`;
}

let applied = 0;
let skippedCurated = 0;
let skippedNoContent = 0;
const mismatchReport = [];
const penaltyIssueReport = [];

function buildEntry(sectionNum, existing) {
  const url = `\`\${JUSTICE_LAWS_BASE}/section-${sectionNum}.html\``;
  const override = overrides.get(sectionNum);
  const lines = [`title: "${escapeStr(existing.title)}"`];

  let severity = existing.severity || "";
  let maxPenalty = existing.maxPenalty || "";

  if (existing.definition) {
    // Curated — never modified here. Just collect the mismatch for review.
    if (override?.curatedMismatch) {
      mismatchReport.push({
        section: sectionNum,
        title: existing.title,
        curatedMismatch: override.curatedMismatch,
      });
    }
    skippedCurated++;
  } else {
    if (override?.existingPenaltyIssue) {
      penaltyIssueReport.push({
        section: sectionNum,
        title: existing.title,
        existingMaxPenalty: existing.maxPenalty || "",
        existingPenaltyIssue: override.existingPenaltyIssue,
      });
    }
    if (override?.summaryAccepted && override?.finalSummary) {
      if (override.finalSeverity) severity = override.finalSeverity;
      if (override.finalMaxPenalty) maxPenalty = override.finalMaxPenalty;
      applied++;
    } else {
      skippedNoContent++;
    }
  }

  lines.push(`severity: "${escapeStr(severity)}"`);
  lines.push(`maxPenalty: "${escapeStr(maxPenalty)}"`);
  lines.push(`url: ${url}`);

  if (existing.definition) {
    lines.push(`definition:\n        "${escapeStr(existing.definition)}"`);
  } else if (override?.summaryAccepted && override?.finalSummary) {
    lines.push(`summary:\n        "${escapeStr(override.finalSummary)}"`);
  } else if (existing.summary) {
    lines.push(`summary:\n        "${escapeStr(existing.summary)}"`);
  }

  const relatedSections = existing.definition
    ? existing.relatedSections
    : override?.finalRelatedSections?.length
      ? override.finalRelatedSections
      : existing.relatedSections;
  if (relatedSections?.length) {
    lines.push(`relatedSections: ${strArray(relatedSections)}`);
  }
  if (existing.defences) {
    lines.push(`defences: ${strArray(existing.defences)}`);
  }
  if (existing.topicsTagged?.length) {
    lines.push(`topicsTagged: ${strArray(existing.topicsTagged)}`);
  }
  if (existing.partOf) lines.push(`partOf: "${escapeStr(existing.partOf)}"`);

  return `[\n    "${sectionNum}",\n    {\n      ${lines.join(",\n      ")},\n    },\n  ]`;
}

const summaryCountBefore = [...existingMap.values()].filter((v) => v.summary).length;

const sortedNums = [...existingMap.keys()].sort((a, b) => {
  const na = parseFloat(a);
  const nb = parseFloat(b);
  if (na !== nb) return na - nb;
  return a.localeCompare(b);
});

let currentPart = "";
const lines = [];
for (const num of sortedNums) {
  const existing = existingMap.get(num);
  const entry = buildEntry(num, existing);
  if (existing.partOf && existing.partOf !== currentPart) {
    currentPart = existing.partOf;
    lines.push("");
    lines.push(`  // ── ${currentPart} ──`);
  }
  lines.push(`  ${entry},`);
}

// Safety guard: this merge must never lose a previously-applied summary.
// summaryCountAfter is computed from `lines` text below, once `output` exists.

const enrichedCount = [...existingMap.values()].filter((v) => v.definition).length;
const partsExportLines = CRIMINAL_CODE_PARTS.map(
  (p) => `  { id: "${escapeStr(p.id)}", label: "${escapeStr(p.label)}" },`,
);
const PARTS_EXPORT = `export const CRIMINAL_CODE_PARTS = [\n${partsExportLines.join("\n")}\n];`;

const output = `// src/lib/criminalCodeData.js
// Complete Criminal Code (RSC 1985, c C-46) section lookup.
// Auto-generated from Justice Laws XML (laws-lois.justice.gc.ca/eng/XML/C-46.xml)
// Source current as of: 2026-07-21 (Justice Laws lims:current-date) | Sections: ${sortedNums.length}
// Includes all numbered sections from the Criminal Code.
// ${enrichedCount} high-priority sections are enriched with hand-curated definitions,
// defences, and related sections. Other sections may carry a \`summary\` field:
// an independently-verified, plain-language summary generated from statute
// text only (see scripts/prepareEnrichmentBatch.mjs) — distinct from \`definition\`,
// which is only ever hand-curated.
//
// This file is used by api/verify.js to confirm AI-suggested Criminal Code
// sections are real and by CriminalCodeExplorer for browsing/searching.

const JUSTICE_LAWS_BASE = "https://laws-lois.justice.gc.ca/eng/acts/c-46";

export const CRIMINAL_CODE_SECTIONS = new Map([
${lines.join("\n")}
]);

${PARTS_EXPORT}

/**
 * Normalize a citation string like "s. 348(1)(b)" or "Criminal Code s. 348"
 * to its base section number "348". Handles decimals like "320.14".
 * Returns null if no section number is found.
 */
export function normalizeSection(citation) {
  if (!citation || typeof citation !== "string") return null;

  // Clean up the string and look for the first number following s., section, or just a standalone number
  // Pattern: (statute prefix)? (s.|section)? (number)
  const match = citation.match(
    /(?:(?:criminal\\s+code|CC|s\\.|section)\\s*|^)(\\d+(?:\\.\\d+)?)/i,
  );
  return match ? match[1] : null;
}

/**
 * Look up a Criminal Code section. Returns the entry object or null.
 * Entry: { title, severity, maxPenalty, url, partOf, ... }
 */
export function lookupSection(citation) {
  const num = normalizeSection(citation);
  if (!num) return null;
  return CRIMINAL_CODE_SECTIONS.get(num) || null;
}
`;

const summaryCountAfter = (output.match(/\n {6}summary:\n/g) || []).length;
if (summaryCountAfter !== summaryCountBefore + applied) {
  console.error(
    `SAFETY CHECK FAILED: expected ${summaryCountBefore + applied} summary fields ` +
      `(${summaryCountBefore} pre-existing + ${applied} newly applied), got ${summaryCountAfter}. ` +
      `Refusing to write — this would silently drop existing enrichment work. Not writing ${DATA_PATH}.`,
  );
  process.exit(1);
}

writeFileSync(DATA_PATH, output);

console.log(`Summary fields: ${summaryCountBefore} before -> ${summaryCountAfter} after (+${applied} applied)`);
console.log(`Applied: ${applied}`);
console.log(`Skipped (curated, untouched): ${skippedCurated}`);
console.log(`Skipped (no accepted summary): ${skippedNoContent}`);
console.log(`\nWritten to ${DATA_PATH}`);
console.log(`File size: ${(output.length / 1024).toFixed(1)} KB`);

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
