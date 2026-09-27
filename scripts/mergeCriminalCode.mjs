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

// Enriched entries whose section number no longer appears in the live XML
// (e.g. fully repealed and dropped) — never silently discard hand-curated
// legal content; surface it instead so a human decides.
const enrichedOrphans = [...enrichedKeys].filter((k) => !xmlSectionNums.has(k));
if (enrichedOrphans.length) {
  console.warn(
    `\nWARNING: ${enrichedOrphans.length} enriched section(s) no longer in the XML — kept, needs review: ${enrichedOrphans.join(", ")}`,
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

for (const key of enrichedOrphans) {
  const existing = existingMap.get(key);
  lines.push("");
  lines.push(`  // ── ORPHANED (not in current XML — needs review) ──`);
  lines.push(`  ${buildEntry(key, existing.title, existing.partOf || "", existing)},`);
}

console.log(`\nMerge result: ${sortedSections.length + enrichedOrphans.length} total entries`);
console.log(`  Preserved from existing: ${preservedCount} (of which enriched: ${enrichedPreserved})`);
console.log(`  New from XML: ${newCount}`);
console.log(`  Enriched orphans kept for review: ${enrichedOrphans.length}`);

const partsExportLines = orderedParts.map((label) => {
  const m = label.match(/^Part ([^\s—]+) — (.+)$/);
  const id = m ? m[1] : label;
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

writeFileSync(DATA_PATH, output);
console.log(`\nWritten to ${DATA_PATH}`);
console.log(`File size: ${(output.length / 1024).toFixed(1)} KB`);

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
