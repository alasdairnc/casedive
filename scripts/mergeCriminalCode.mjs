#!/usr/bin/env node
// scripts/mergeCriminalCode.mjs
// Merges freshly-extracted XML sections (criminal-code-sections.json,
// criminal-code-parts.json — from buildCriminalCodeData.mjs) with the
// hand-curated enrichment (definition/defences/relatedSections/topicsTagged)
// that already lives in criminalCodeData.js. Outputs the final file.
//
// title/partOf are always taken fresh from the XML extract, since those
// should track the current statute; severity/maxPenalty and the enrichment
// fields are carried over verbatim from whatever already exists. Loading,
// rendering and the safety check live in _criminalCodeDataWriter.mjs.
//
// Usage: node scripts/mergeCriminalCode.mjs

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import {
  compareSectionNums,
  loadCriminalCodeData,
  writeCriminalCodeData,
  writePartsFile,
} from "./_criminalCodeDataWriter.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const xmlSections = JSON.parse(
  readFileSync(resolve(__dirname, "criminal-code-sections.json"), "utf-8"),
);
const orderedParts = JSON.parse(
  readFileSync(resolve(__dirname, "criminal-code-parts.json"), "utf-8"),
);

const { sections: existingMap } = await loadCriminalCodeData();

console.log(`Existing entries: ${existingMap.size}`);
const enrichedKeys = new Set(
  [...existingMap.entries()].filter(([, v]) => v.definition).map(([k]) => k),
);
console.log(`Enriched entries: ${enrichedKeys.size}`);
const summaryKeys = new Set(
  [...existingMap.entries()].filter(([, v]) => v.summary).map(([k]) => k),
);
console.log(`Summary entries: ${summaryKeys.size}`);

const sortedSections = [...xmlSections].sort((a, b) => compareSectionNums(a.section, b.section));
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

let newCount = 0;
let preservedCount = 0;
let enrichedPreserved = 0;

const rows = sortedSections.map((section) => {
  const existing = existingMap.get(section.section);
  if (existing) {
    preservedCount++;
    if (enrichedKeys.has(section.section)) enrichedPreserved++;
  } else {
    newCount++;
  }
  return [section.section, {
    ...existing,
    title: section.title,
    partOf: section.partOf,
    heading: section.heading,
    subheading: section.subheading,
  }];
});

const allOrphans = [...new Set([...enrichedOrphans, ...summaryOrphans, ...plainOrphans])];
const orphanRows = allOrphans.map((key) => [key, existingMap.get(key)]);

console.log(`\nMerge result: ${rows.length + orphanRows.length} total entries`);
console.log(`  Preserved from existing: ${preservedCount} (of which enriched: ${enrichedPreserved})`);
console.log(`  New from XML: ${newCount}`);
console.log(`  Orphans kept for review: ${allOrphans.length} (${enrichedOrphans.length} enriched, ${summaryOrphans.length} summarized, ${plainOrphans.length} plain)\n`);

await writeCriminalCodeData({
  before: existingMap,
  rows,
  orphanRows,
  parts: orderedParts,
  allowedFields: ["title", "partOf", "heading", "subheading"],
  expect: { sections: newCount },
});

// criminalCodeParts.js carries its own copy of this list so components can
// avoid importing the full dataset (see its file header) — keep it in sync
// with what we just wrote into criminalCodeData.js.
writePartsFile(orderedParts);
