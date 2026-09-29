#!/usr/bin/env node
// scripts/mergePenaltyFix.mjs
// Applies hand-verified maxPenalty (and optionally severity) corrections
// to existing entries — curated or non-curated — via the shared
// regenerate-and-verify writer (_criminalCodeDataWriter.mjs). May only change
// maxPenalty/severity.
//
// A key present in a fix replaces the existing value, even with "" (only a
// missing or null key keeps it).
//
// Input: a JSON object { "<section>": { "maxPenalty": "...", "severity": "..." (optional) }, ... }
// Usage: node scripts/mergePenaltyFix.mjs <fixes.json>

import {
  assertSectionsExist,
  loadCriminalCodeData,
  patchRows,
  readJsonArg,
  writeCriminalCodeData,
} from "./_criminalCodeDataWriter.mjs";

const ALLOWED_FIELDS = ["severity", "maxPenalty"];

const fixes = readJsonArg("node scripts/mergePenaltyFix.mjs <fixes.json>");

const { sections: existingMap, parts } = await loadCriminalCodeData();
assertSectionsExist(Object.keys(fixes), existingMap);

let applied = 0;

const rows = patchRows(existingMap, ALLOWED_FIELDS, (num, existing) => {
  const fix = fixes[num];
  if (!fix) return {};
  applied++;
  return {
    severity: fix.severity ?? existing.severity,
    maxPenalty: fix.maxPenalty ?? existing.maxPenalty,
  };
});

await writeCriminalCodeData({ before: existingMap, rows, parts, allowedFields: ALLOWED_FIELDS });
console.log(`Applied ${applied} penalty fixes.`);
