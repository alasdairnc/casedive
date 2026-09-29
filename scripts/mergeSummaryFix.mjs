#!/usr/bin/env node
// scripts/mergeSummaryFix.mjs
// Applies hand-verified `summary` corrections from summary-audit mode,
// using the same safe full-module-load/regenerate pattern as the other
// merge scripts. Only touches `summary`; never touches definition/
// maxPenalty/severity/relatedSections/defences/topicsTagged.
//
// Input: the audit's flagged array — [{section, issue, finalSummary}, ...].
// Only entries with a non-empty finalSummary are applied; entries where the
// auditor couldn't confidently write a replacement are skipped (left as-is)
// and written to reports/summary-audit-unresolved.json for human review.
//
// Usage: node scripts/mergeSummaryFix.mjs <flagged.json>

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA_PATH = resolve(ROOT, "src/lib/criminalCodeData.js");

const [, , flaggedFile] = process.argv;
const flagged = JSON.parse(readFileSync(flaggedFile, "utf-8"));
const fixes = new Map(flagged.filter((f) => f.finalSummary).map((f) => [f.section, f]));
const unresolved = flagged.filter((f) => !f.finalSummary);

const { CRIMINAL_CODE_SECTIONS: existingMap, CRIMINAL_CODE_PARTS } = await import(
  `${pathToFileURL(DATA_PATH).href}?t=${process.hrtime.bigint()}`
);

for (const key of fixes.keys()) {
  if (!existingMap.has(key)) {
    console.error(`SECTION NOT FOUND: "${key}" is not a key in CRIMINAL_CODE_SECTIONS. Aborting.`);
    process.exit(1);
  }
  if (existingMap.get(key).definition) {
    console.error(`REFUSING: "${key}" is a curated entry (has definition) — this script must never touch curated content. Aborting.`);
    process.exit(1);
  }
}

function escapeStr(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}
function strArray(arr) {
  return `[${arr.map((s) => `"${escapeStr(s)}"`).join(", ")}]`;
}

let applied = 0;

function buildEntry(sectionNum, existing) {
  const url = `\`\${JUSTICE_LAWS_BASE}/section-${sectionNum}.html\``;
  const fix = fixes.get(sectionNum);
  const summary = fix ? fix.finalSummary : existing.summary;
  if (fix) applied++;

  const lines = [`title: "${escapeStr(existing.title)}"`];
  lines.push(`severity: "${escapeStr(existing.severity || "")}"`);
  lines.push(`maxPenalty: "${escapeStr(existing.maxPenalty || "")}"`);
  lines.push(`url: ${url}`);
  if (existing.definition) {
    lines.push(`definition:\n        "${escapeStr(existing.definition)}"`);
  } else if (summary) {
    lines.push(`summary:\n        "${escapeStr(summary)}"`);
  }
  if (existing.relatedSections?.length) {
    lines.push(`relatedSections: ${strArray(existing.relatedSections)}`);
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
const definitionCountBefore = [...existingMap.values()].filter((v) => v.definition).length;

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

const partsExportLines = CRIMINAL_CODE_PARTS.map(
  (p) => `  { id: "${escapeStr(p.id)}", label: "${escapeStr(p.label)}" },`,
);
const PARTS_EXPORT = `export const CRIMINAL_CODE_PARTS = [\n${partsExportLines.join("\n")}\n];`;

const output = `// src/lib/criminalCodeData.js
// Complete Criminal Code (RSC 1985, c C-46) section lookup.
// Auto-generated from Justice Laws XML (laws-lois.justice.gc.ca/eng/XML/C-46.xml)
// Source current as of: 2026-07-21 (Justice Laws lims:current-date) | Sections: ${sortedNums.length}
// Includes all numbered sections from the Criminal Code.
// ${definitionCountBefore} high-priority sections are enriched with hand-curated definitions,
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
const definitionCountAfter = (output.match(/\n {6}definition:\n/g) || []).length;
if (summaryCountAfter !== summaryCountBefore || definitionCountAfter !== definitionCountBefore) {
  console.error(
    `SAFETY CHECK FAILED: summary ${summaryCountBefore}->${summaryCountAfter}, definition ${definitionCountBefore}->${definitionCountAfter}. ` +
      `This script only replaces existing summary text and must never change these counts. Refusing to write ${DATA_PATH}.`,
  );
  process.exit(1);
}

writeFileSync(DATA_PATH, output);
console.log(`Summary fields: ${summaryCountBefore} (unchanged) | Definition: ${definitionCountBefore} (unchanged)`);
console.log(`Applied ${applied} summary corrections.`);
console.log(`Written to ${DATA_PATH}`);

if (unresolved.length) {
  const reportPath = resolve(ROOT, "reports/summary-audit-unresolved.json");
  writeFileSync(reportPath, JSON.stringify(unresolved, null, 2));
  console.log(`\n${unresolved.length} flagged sections had no confident replacement (left as-is, needs human review):`);
  console.log(`Written to ${reportPath}`);
  for (const u of unresolved) {
    console.log(`  s.${u.section}: ${u.issue}`);
  }
}
