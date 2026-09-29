// scripts/_criminalCodeDataWriter.mjs
// Shared load/serialize/verify/write pipeline for every script that
// regenerates src/lib/criminalCodeData.js (mergeCriminalCode, mergeCuratedFix,
// mergeEnrichmentBatch, mergePenaltyFix, mergeSummaryFix).
//
// The data file is always regenerated whole from the loaded module plus a
// script's changes, never regex-spliced (a regex-based version once silently
// matched zero entries against this file's real formatting). The output
// template, entry field order and safety check live here and nowhere else.
//
// Safety check: the rendered file is re-imported (so it must parse) and
// compared with what was loaded. Each script declares `allowedFields`; every
// other field of every pre-existing section must come out unchanged, no
// section may disappear, and the summary/definition/section counts must equal
// their before-counts plus the script's declared `expect` deltas (default 0).

import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const ROOT = resolve(__dirname, "..");
export const DATA_PATH = resolve(ROOT, "src/lib/criminalCodeData.js");
export const PARTS_PATH = resolve(ROOT, "src/lib/criminalCodeParts.js");
const META_PATH = resolve(__dirname, "criminal-code-meta.json");

const ORPHAN_HEADER = "  // ── ORPHANED (not in current XML — needs review) ──";

/** Load the current data file as a real module (cache-busted for repeat runs). */
export async function loadCriminalCodeData() {
  const mod = await import(`${pathToFileURL(DATA_PATH).href}?t=${process.hrtime.bigint()}`);
  return { sections: mod.CRIMINAL_CODE_SECTIONS, parts: mod.CRIMINAL_CODE_PARTS };
}

/** Parse the JSON file named by the first CLI argument, or exit with usage. */
export function readJsonArg(usage) {
  const file = process.argv[2];
  if (!file) {
    console.error(`Usage: ${usage}`);
    process.exit(1);
  }
  return JSON.parse(readFileSync(file, "utf-8"));
}

export function assertSectionsExist(keys, sections) {
  for (const key of keys) {
    if (!sections.has(key)) {
      console.error(`SECTION NOT FOUND: "${key}" is not a key in CRIMINAL_CODE_SECTIONS. Aborting.`);
      process.exit(1);
    }
  }
}

/** Numeric section order; "320.1" < "320.14" < "321", ties broken lexically. */
export function compareSectionNums(a, b) {
  const na = parseFloat(a);
  const nb = parseFloat(b);
  if (na !== nb) return na - nb;
  return a.localeCompare(b);
}

/**
 * Every existing section in order, with `patchFn(num, existing)`'s returned
 * fields laid over it. Undefined patch values are dropped (so they can't blank
 * a field), and a patch key outside `allowedFields` throws.
 */
export function patchRows(sections, allowedFields, patchFn) {
  const allowed = new Set(allowedFields);
  return [...sections.keys()].sort(compareSectionNums).map((num) => {
    const existing = sections.get(num);
    const patch = {};
    for (const [field, value] of Object.entries(patchFn(num, existing) || {})) {
      if (!allowed.has(field)) {
        throw new Error(`s.${num}: patch sets "${field}", which this script may not change`);
      }
      if (value !== undefined) patch[field] = value;
    }
    return [num, { ...existing, ...patch }];
  });
}

function escapeStr(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function strArray(arr) {
  return `[${arr.map((s) => `"${escapeStr(s)}"`).join(", ")}]`;
}

function serializeEntry(num, entry) {
  const lines = [
    `title: "${escapeStr(entry.title)}"`,
    `severity: "${escapeStr(entry.severity || "")}"`,
    `maxPenalty: "${escapeStr(entry.maxPenalty || "")}"`,
    `url: \`\${JUSTICE_LAWS_BASE}/section-${num}.html\``,
  ];
  // `definition` (hand-curated) wins over `summary` (verified bulk output).
  if (entry.definition) {
    lines.push(`definition:\n        "${escapeStr(entry.definition)}"`);
  } else if (entry.summary) {
    lines.push(`summary:\n        "${escapeStr(entry.summary)}"`);
  }
  if (entry.relatedSections?.length) {
    lines.push(`relatedSections: ${strArray(entry.relatedSections)}`);
  }
  if (entry.defences) {
    lines.push(`defences: ${strArray(entry.defences)}`);
  }
  if (entry.topicsTagged?.length) {
    lines.push(`topicsTagged: ${strArray(entry.topicsTagged)}`);
  }
  if (entry.partOf) lines.push(`partOf: "${escapeStr(entry.partOf)}"`);
  if (entry.heading) lines.push(`heading: "${escapeStr(entry.heading)}"`);
  if (entry.subheading) lines.push(`subheading: "${escapeStr(entry.subheading)}"`);

  return `[\n    "${num}",\n    {\n      ${lines.join(",\n      ")},\n    },\n  ]`;
}

function renderPartsExport(parts) {
  const partLines = parts.map(
    ({ id, label }) => `  { id: "${escapeStr(id)}", label: "${escapeStr(label)}" },`,
  );
  return `export const CRIMINAL_CODE_PARTS = [\n${partLines.join("\n")}\n];`;
}

export function renderDataFile({ rows, orphanRows = [], parts, curatedCount }) {
  const { sourceCurrentDate } = JSON.parse(readFileSync(META_PATH, "utf-8"));

  let currentPart = "";
  const lines = [];
  for (const [num, entry] of rows) {
    if (entry.partOf && entry.partOf !== currentPart) {
      currentPart = entry.partOf;
      lines.push("");
      lines.push(`  // ── ${currentPart} ──`);
    }
    lines.push(`  ${serializeEntry(num, entry)},`);
  }
  for (const [num, entry] of orphanRows) {
    lines.push("");
    lines.push(ORPHAN_HEADER);
    lines.push(`  ${serializeEntry(num, entry)},`);
  }

  return `// src/lib/criminalCodeData.js
// Complete Criminal Code (RSC 1985, c C-46) section lookup.
// Auto-generated from Justice Laws XML (laws-lois.justice.gc.ca/eng/XML/C-46.xml)
// Source current as of: ${sourceCurrentDate || "unknown"} (Justice Laws lims:current-date) | Sections: ${rows.length + orphanRows.length}
// Includes all numbered sections from the Criminal Code.
// ${curatedCount} high-priority sections are enriched with hand-curated definitions,
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

${renderPartsExport(parts)}

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
}

function countFields(sections) {
  const values = [...sections.values()];
  return {
    sections: sections.size,
    summary: values.filter((v) => v.summary).length,
    definition: values.filter((v) => v.definition).length,
  };
}

// The serializer omits "" / [] for some fields, so treat those as absent.
function normalizeValue(v) {
  if (v === undefined || v === null || v === "" || (Array.isArray(v) && !v.length)) return null;
  return JSON.stringify(v);
}

function findViolations(before, after, allowedFields, lockCurated) {
  const allowed = new Set(allowedFields);
  const violations = [];
  for (const [num, prev] of before) {
    const next = after.get(num);
    if (!next) {
      violations.push(`s.${num}: section missing from output`);
      continue;
    }
    const locked = lockCurated && prev.definition;
    for (const field of new Set([...Object.keys(prev), ...Object.keys(next)])) {
      if (allowed.has(field) && !locked) continue;
      if (normalizeValue(prev[field]) !== normalizeValue(next[field])) {
        violations.push(
          `s.${num}: "${field}" changed${locked ? " on a curated entry" : ""}, but this script may only change ${allowedFields.join(", ") || "nothing"}${locked ? " on non-curated entries" : ""}`,
        );
      }
    }
  }
  return violations;
}

/**
 * Re-import rendered file text and compare it with `before`. Returns the list
 * of safety-check problems (empty = safe to write) plus both sets of counts.
 */
export async function verifyRendered(output, { before, allowedFields, lockCurated = false, expect = {} }) {
  const rendered = await import(
    `data:text/javascript;charset=utf-8,${encodeURIComponent(output)}`
  );
  const after = rendered.CRIMINAL_CODE_SECTIONS;

  const countsBefore = countFields(before);
  const countsAfter = countFields(after);
  const problems = [];
  for (const field of Object.keys(countsBefore)) {
    const wanted = countsBefore[field] + (expect[field] ?? 0);
    if (countsAfter[field] !== wanted) {
      problems.push(
        `${field} count ${countsBefore[field]} -> ${countsAfter[field]}, expected ${wanted}`,
      );
    }
  }
  const violations = findViolations(before, after, allowedFields, lockCurated);
  problems.push(...violations.slice(0, 20));
  if (violations.length > 20) problems.push(`...and ${violations.length - 20} more`);
  return { problems, countsBefore, countsAfter };
}

/**
 * Render criminalCodeData.js from `rows` (and trailing `orphanRows`), verify
 * it against `before` (the Map it was built from) and write it.
 *
 * - allowedFields: fields this script may change on a pre-existing section.
 * - lockCurated: if true, sections with a `definition` must come out unchanged.
 * - expect: { sections?, summary?, definition? } count deltas; default 0 each.
 * - parts: CRIMINAL_CODE_PARTS to write ({ id, label }[]).
 *
 * Exits the process (without writing) if the safety check fails.
 */
export async function writeCriminalCodeData({
  before,
  rows,
  orphanRows = [],
  parts,
  allowedFields,
  lockCurated = false,
  expect = {},
}) {
  const curatedCount = [...before.values()].filter((v) => v.definition).length;
  const output = renderDataFile({ rows, orphanRows, parts, curatedCount });
  const { problems, countsBefore, countsAfter } = await verifyRendered(output, {
    before,
    allowedFields,
    lockCurated,
    expect,
  });

  if (problems.length) {
    console.error(
      `SAFETY CHECK FAILED — refusing to write ${DATA_PATH}. A merge must never lose or ` +
        `alter content it wasn't asked to change:\n  ${problems.join("\n  ")}`,
    );
    process.exit(1);
  }

  writeFileSync(DATA_PATH, output);
  console.log(
    `Counts (before -> after): sections ${countsBefore.sections} -> ${countsAfter.sections}, ` +
      `summary ${countsBefore.summary} -> ${countsAfter.summary}, ` +
      `definition ${countsBefore.definition} -> ${countsAfter.definition}`,
  );
  console.log(`Written to ${DATA_PATH}`);
  console.log(`File size: ${(output.length / 1024).toFixed(1)} KB`);
  return { countsBefore, countsAfter };
}

/** Rewrite criminalCodeParts.js, the lightweight copy of CRIMINAL_CODE_PARTS. */
export function writePartsFile(parts) {
  const output = `// src/lib/criminalCodeParts.js
// Extracted from criminalCodeData.js to avoid pulling the full dataset
// into components that only need the parts list.
// Kept in sync with criminalCodeData.js's CRIMINAL_CODE_PARTS by
// scripts/mergeCriminalCode.mjs — do not hand-edit one without the other.
${renderPartsExport(parts)}
`;
  writeFileSync(PARTS_PATH, output);
  console.log(`Written to ${PARTS_PATH}`);
}
