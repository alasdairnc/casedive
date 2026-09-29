#!/usr/bin/env node
// scripts/mergeCriminalCode.mjs
// Merges freshly-extracted XML sections (criminal-code-sections.json,
// criminal-code-parts.json — from buildCriminalCodeData.mjs) with the
// hand-curated enrichment (definition/defences/relatedSections/topicsTagged)
// that already lives in criminalCodeData.js. Outputs the final file.
//
// Loads the existing data as a real JS module (not regex over source text —
// a previous regex-based version silently matched zero entries against this
// file's actual multi-line formatting and would have discarded all curated
// content). title/partOf/url are always taken fresh from the XML extract,
// since those should track the current statute; severity/maxPenalty and the
// enrichment fields are carried over verbatim from whatever already exists.
//
// Usage: node scripts/mergeCriminalCode.mjs

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const DATA_PATH = resolve(ROOT, "src/lib/criminalCodeData.js");

const xmlSections = JSON.parse(
  readFileSync(resolve(__dirname, "criminal-code-sections.json"), "utf-8"),
);
const orderedParts = JSON.parse(
  readFileSync(resolve(__dirname, "criminal-code-parts.json"), "utf-8"),
);
const meta = JSON.parse(
  readFileSync(resolve(__dirname, "criminal-code-meta.json"), "utf-8"),
);

// Cache-bust so repeated runs in the same process (tests) see disk changes.
const { CRIMINAL_CODE_SECTIONS: existingMap } = await import(
  `${pathToFileURL(DATA_PATH).href}?t=${process.hrtime.bigint()}`
);

console.log(`Existing entries: ${existingMap.size}`);
const enrichedKeys = new Set(
  [...existingMap.entries()].filter(([, v]) => v.definition).map(([k]) => k),
);
console.log(`Enriched entries: ${enrichedKeys.size}`);
const summaryCountBefore = [...existingMap.values()].filter((v) => v.summary).length;
console.log(`Summary entries: ${summaryCountBefore}`);

function escapeStr(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function strArray(arr) {
  return `[${arr.map((s) => `"${escapeStr(s)}"`).join(", ")}]`;
}

function buildEntry(sectionNum, title, partOf, existing) {
  const url = `\`\${JUSTICE_LAWS_BASE}/section-${sectionNum}.html\``;
  const lines = [
    `title: "${escapeStr(title)}"`,
    `severity: "${escapeStr(existing?.severity || "")}"`,
    `maxPenalty: "${escapeStr(existing?.maxPenalty || "")}"`,
    `url: ${url}`,
  ];
  if (existing?.definition) {
    lines.push(`definition:\n        "${escapeStr(existing.definition)}"`);
  } else if (existing?.summary) {
    lines.push(`summary:\n        "${escapeStr(existing.summary)}"`);
  }
  if (existing?.relatedSections?.length) {
    lines.push(`relatedSections: ${strArray(existing.relatedSections)}`);
  }
  if (existing?.defences) {
    lines.push(`defences: ${strArray(existing.defences)}`);
  }
  if (existing?.topicsTagged?.length) {
    lines.push(`topicsTagged: ${strArray(existing.topicsTagged)}`);
  }
  if (partOf) lines.push(`partOf: "${escapeStr(partOf)}"`);

  return `[\n    "${sectionNum}",\n    {\n      ${lines.join(",\n      ")},\n    },\n  ]`;
}

const sortedSections = [...xmlSections].sort((a, b) => {
  const na = parseFloat(a.section);
  const nb = parseFloat(b.section);
  if (na !== nb) return na - nb;
  return a.section.localeCompare(b.section);
});

const xmlSectionNums = new Set(sortedSections.map((s) => s.section));
const summaryKeys = new Set(
  [...existingMap.entries()].filter(([, v]) => v.summary).map(([k]) => k),
);

// Enriched entries whose section number no longer appears in the live XML
// (e.g. fully repealed and dropped) — never silently discard hand-curated
// legal content; surface it instead so a human decides.
const enrichedOrphans = [...enrichedKeys].filter((k) => !xmlSectionNums.has(k));
if (enrichedOrphans.length) {
  console.warn(
    `\nWARNING: ${enrichedOrphans.length} enriched section(s) no longer in the XML — kept, needs review: ${enrichedOrphans.join(", ")}`,
  );
}
// Same protection for verified `summary` content (bulk-enrichment output) —
// it's just as expensive to regenerate as a curated definition.
const summaryOrphans = [...summaryKeys].filter((k) => !xmlSectionNums.has(k));
if (summaryOrphans.length) {
  console.warn(
    `WARNING: ${summaryOrphans.length} summarized section(s) no longer in the XML — kept, needs review: ${summaryOrphans.join(", ")}`,
  );
}
// Any other existing entry (not enriched or summarized) whose section number
// is missing from the fresh XML extract — preserve and warn just the same,
// rather than silently dropping it.
const plainOrphans = [...existingMap.keys()].filter(
  (k) => !xmlSectionNums.has(k) && !enrichedKeys.has(k) && !summaryKeys.has(k),
);
if (plainOrphans.length) {
  console.warn(
    `WARNING: ${plainOrphans.length} section(s) no longer in the XML — kept, needs review: ${plainOrphans.join(", ")}`,
  );
}

let currentPart = "";
const lines = [];
let newCount = 0;
let preservedCount = 0;
let enrichedPreserved = 0;

for (const section of sortedSections) {
  const existing = existingMap.get(section.section);
  const entry = buildEntry(section.section, section.title, section.partOf, existing);

  if (section.partOf && section.partOf !== currentPart) {
    currentPart = section.partOf;
    lines.push("");
    lines.push(`  // ── ${currentPart} ──`);
  }

  lines.push(`  ${entry},`);

  if (existing) {
    preservedCount++;
    if (enrichedKeys.has(section.section)) enrichedPreserved++;
  } else {
    newCount++;
  }
}

const allOrphans = [...new Set([...enrichedOrphans, ...summaryOrphans, ...plainOrphans])];
for (const key of allOrphans) {
  const existing = existingMap.get(key);
  lines.push("");
  lines.push(`  // ── ORPHANED (not in current XML — needs review) ──`);
  lines.push(`  ${buildEntry(key, existing.title, existing.partOf || "", existing)},`);
}

console.log(`\nMerge result: ${sortedSections.length + allOrphans.length} total entries`);
console.log(`  Preserved from existing: ${preservedCount} (of which enriched: ${enrichedPreserved})`);
console.log(`  New from XML: ${newCount}`);
console.log(`  Orphans kept for review: ${allOrphans.length} (${enrichedOrphans.length} enriched, ${summaryOrphans.length} summarized, ${plainOrphans.length} plain)`);

const partsExportLines = orderedParts.map(({ id, label }) => {
  return `  { id: "${escapeStr(id)}", label: "${escapeStr(label)}" },`;
});
const PARTS_EXPORT = `export const CRIMINAL_CODE_PARTS = [\n${partsExportLines.join("\n")}\n];`;

const output = `// src/lib/criminalCodeData.js
// Complete Criminal Code (RSC 1985, c C-46) section lookup.
// Auto-generated from Justice Laws XML (laws-lois.justice.gc.ca/eng/XML/C-46.xml)
// Source current as of: ${meta.sourceCurrentDate || "unknown"} (Justice Laws lims:current-date) | Sections: ${sortedSections.length + enrichedOrphans.length}
// Includes all numbered sections from the Criminal Code.
// ${enrichedKeys.size} high-priority sections are enriched with definitions, defences, and related sections.
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
    `SAFETY CHECK FAILED: had ${summaryCountBefore} summary fields before the merge, ` +
      `would have ${summaryCountAfter} after. A re-sync must never lose verified enrichment ` +
      `content. Refusing to write ${DATA_PATH}.`,
  );
  process.exit(1);
}

writeFileSync(DATA_PATH, output);
console.log(`\nWritten to ${DATA_PATH}`);
console.log(`File size: ${(output.length / 1024).toFixed(1)} KB`);
console.log(`Summary fields: ${summaryCountBefore} before -> ${summaryCountAfter} after (must match)`);

// criminalCodeParts.js carries its own copy of this list so components can
// avoid importing the full ~300KB dataset (see its file header) — keep it
// in sync with what we just wrote into criminalCodeData.js.
const PARTS_PATH = resolve(ROOT, "src/lib/criminalCodeParts.js");
const partsFileOutput = `// src/lib/criminalCodeParts.js
// Extracted from criminalCodeData.js to avoid pulling the full dataset
// into components that only need the parts list.
// Kept in sync with criminalCodeData.js's CRIMINAL_CODE_PARTS by
// scripts/mergeCriminalCode.mjs — do not hand-edit one without the other.
${PARTS_EXPORT}
`;
writeFileSync(PARTS_PATH, partsFileOutput);
console.log(`Written to ${PARTS_PATH}`);
