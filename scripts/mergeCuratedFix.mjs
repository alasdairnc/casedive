#!/usr/bin/env node
// scripts/mergeCuratedFix.mjs
// Applies verified curated-entry rewrites (from enrichmentWorkflow.mjs's
// "curated-rewrite" mode) into criminalCodeData.js by regenerating the whole
// file from the loaded module plus overrides — same safe pattern as
// mergeCriminalCode.mjs / mergeEnrichmentBatch.mjs, never regex-splicing.
//
// Only applies a result when approved=true. A rejected result (approved=false)
// leaves the existing curated entry untouched and is written to
// reports/curated-rewrite-rejected.json for human review.
//
// Usage: node scripts/mergeCuratedFix.mjs <verified-results.json>

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
let rejected = 0;
let untouched = 0;
const rejectedReport = [];

function buildEntry(sectionNum, existing) {
  const url = `\`\${JUSTICE_LAWS_BASE}/section-${sectionNum}.html\``;
  const override = overrides.get(sectionNum);
  const lines = [`title: "${escapeStr(existing.title)}"`];

  let definition = existing.definition;
  let maxPenalty = existing.maxPenalty || "";
  let relatedSections = existing.relatedSections;

  if (override) {
    if (override.approved) {
      definition = override.finalDefinition || definition;
      if (override.finalMaxPenalty) maxPenalty = override.finalMaxPenalty;
      if (override.finalRelatedSections?.length) relatedSections = override.finalRelatedSections;
      applied++;
    } else {
      rejected++;
      rejectedReport.push({ section: sectionNum, title: existing.title, notes: override.notes });
    }
  } else {
    untouched++;
  }

  lines.push(`severity: "${escapeStr(existing.severity || "")}"`);
  lines.push(`maxPenalty: "${escapeStr(maxPenalty)}"`);
  lines.push(`url: ${url}`);
  if (definition) {
    lines.push(`definition:\n        "${escapeStr(definition)}"`);
  } else if (existing.summary) {
    lines.push(`summary:\n        "${escapeStr(existing.summary)}"`);
  }
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
    /(?:(?:criminal\\s+code|\\bCC|s\\.|section)\\s*|^)(\\d+(?:\\.\\d+)?)/i,
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
if (summaryCountAfter !== summaryCountBefore) {
  console.error(
    `SAFETY CHECK FAILED: had ${summaryCountBefore} summary fields before, would have ` +
      `${summaryCountAfter} after. This script only touches curated entries and must never ` +
      `affect summary fields. Refusing to write ${DATA_PATH}.`,
  );
  process.exit(1);
}

writeFileSync(DATA_PATH, output);

console.log(`Summary fields: ${summaryCountBefore} before -> ${summaryCountAfter} after (must match)`);
console.log(`Applied (approved rewrites): ${applied}`);
console.log(`Rejected (left untouched, needs human review): ${rejected}`);
console.log(`Untouched (not in this results file): ${untouched}`);
console.log(`\nWritten to ${DATA_PATH}`);
console.log(`File size: ${(output.length / 1024).toFixed(1)} KB`);

if (rejectedReport.length) {
  const reportPath = resolve(ROOT, "reports/curated-rewrite-rejected.json");
  writeFileSync(reportPath, JSON.stringify(rejectedReport, null, 2));
  console.log(`\nRejected rewrites written to ${reportPath}`);
  for (const r of rejectedReport) {
    console.log(`  s.${r.section} (${r.title}): ${r.notes}`);
  }
}
