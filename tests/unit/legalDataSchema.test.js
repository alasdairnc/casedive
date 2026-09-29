// Mechanical schema check for the legal-reference data files.
//
// Re-implements the exact schema in `.claude/agents/legal-data-validator.md`
// as a deterministic vitest test so CI (`npm run test:unit`) catches
// regressions automatically, instead of relying on someone remembering to
// run the on-demand subagent.
import { readFileSync } from "fs";
import { describe, expect, it } from "vitest";

import { CRIMINAL_CODE_SECTIONS } from "../../src/lib/criminalCodeData.js";
import { CHARTER_SECTIONS } from "../../src/lib/charterData.js";
import {
  CDSA_SECTIONS,
  YCJA_SECTIONS,
  CHRA_SECTIONS,
  CC_SENTENCING,
  EVIDENCE_SECTIONS,
  CCRA_SECTIONS,
  ON_HTA_SECTIONS,
  ON_RTA_SECTIONS,
  ON_HR_SECTIONS,
  BC_MVA_SECTIONS,
  BC_RTA_SECTIONS,
  BC_HR_SECTIONS,
  AB_TSA_SECTIONS,
  AB_RTA_SECTIONS,
  AB_HRA_SECTIONS,
} from "../../src/lib/civilLawData.js";

const CRIMINAL_CODE_SOURCE = readFileSync(
  "src/lib/criminalCodeData.js",
  "utf8",
);
const CHARTER_SOURCE = readFileSync("src/lib/charterData.js", "utf8");
const CIVIL_LAW_SOURCE = readFileSync("src/lib/civilLawData.js", "utf8");

const CANADIAN_JURISDICTIONS = new Set([
  "Federal",
  "Ontario",
  "Quebec",
  "Nova Scotia",
  "New Brunswick",
  "Manitoba",
  "British Columbia",
  "Prince Edward Island",
  "Saskatchewan",
  "Alberta",
  "Newfoundland and Labrador",
]);

/**
 * Extract the `[ ... ]` array-literal source slice passed to
 * `<mapName> = new Map([ ... ])`, by bracket-matching the square brackets
 * that start right after `new Map(`. Needed because the duplicate-key
 * check has to scan source text — a JS Map silently drops a literal
 * duplicate key, so importing the Map can never reveal one.
 */
function extractMapLiteral(source, mapName) {
  const declaration = source.match(
    new RegExp(`\\b${mapName}\\s*=\\s*new Map\\(\\s*\\[`),
  );
  if (!declaration) {
    throw new Error(`Could not find "${mapName} = new Map([" in source`);
  }
  const openIndex = declaration.index + declaration[0].length - 1;
  let depth = 0;
  for (let i = openIndex; i < source.length; i++) {
    if (source[i] === "[") depth++;
    else if (source[i] === "]") {
      depth--;
      if (depth === 0) {
        return source.slice(openIndex, i + 1);
      }
    }
  }
  throw new Error(`Unbalanced brackets while scanning "${mapName}"`);
}

/**
 * Find literal `["key", {` entry keys within a Map's array-literal source
 * and return any key that appears more than once.
 */
function findDuplicateKeysInSource(mapLiteralSource) {
  const keyPattern = /\[\s*["']((?:\\.|[^"'\\])*)["']\s*,\s*\{/gs;
  const counts = new Map();
  let match;
  while ((match = keyPattern.exec(mapLiteralSource)) !== null) {
    const key = match[1];
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([key, count]) => ({ key, count }));
}

function requireNonEmptyString(entry, key, field, violations) {
  if (!(field in entry)) {
    violations.push({ key, field, issue: "missing field" });
    return;
  }
  if (typeof entry[field] !== "string") {
    violations.push({
      key,
      field,
      issue: `expected string, got ${typeof entry[field]}`,
    });
    return;
  }
  if (entry[field].trim() === "") {
    violations.push({ key, field, issue: "must be non-empty" });
  }
}

function requireUrl(entry, key, violations) {
  requireNonEmptyString(entry, key, "url", violations);
  if (typeof entry.url === "string" && !entry.url.startsWith("https://")) {
    violations.push({ key, field: "url", issue: "does not start with https://" });
  }
}

function validateCriminalCodeEntry(key, entry, violations) {
  requireNonEmptyString(entry, key, "title", violations);

  // severity / maxPenalty may be empty strings, but the field must exist
  // and be a string.
  for (const field of ["severity", "maxPenalty"]) {
    if (!(field in entry)) {
      violations.push({ key, field, issue: "missing field" });
    } else if (typeof entry[field] !== "string") {
      violations.push({
        key,
        field,
        issue: `expected string, got ${typeof entry[field]}`,
      });
    }
  }

  requireUrl(entry, key, violations);

  if ("partOf" in entry) {
    if (typeof entry.partOf !== "string") {
      violations.push({
        key,
        field: "partOf",
        issue: `expected string, got ${typeof entry.partOf}`,
      });
    } else if (entry.partOf.trim() === "") {
      violations.push({
        key,
        field: "partOf",
        issue: "must be non-empty when present",
      });
    }
  }

  if ("enriched" in entry) {
    const enriched = entry.enriched;
    if (typeof enriched !== "object" || enriched === null || Array.isArray(enriched)) {
      violations.push({
        key,
        field: "enriched",
        issue: `expected object, got ${Array.isArray(enriched) ? "array" : typeof enriched}`,
      });
    } else if (
      !["elements", "defences", "relatedSections"].some((sub) => sub in enriched)
    ) {
      violations.push({
        key,
        field: "enriched",
        issue:
          "must include at least one of elements, defences, relatedSections",
      });
    }
  }
}

function validateCharterEntry(key, entry, violations) {
  for (const field of ["title", "part", "summary", "relevance"]) {
    requireNonEmptyString(entry, key, field, violations);
  }
  requireUrl(entry, key, violations);
}

function validateCivilLawEntry(key, entry, violations) {
  for (const field of [
    "jurisdiction",
    "statute",
    "shortName",
    "title",
    "summary",
    "relevance",
  ]) {
    requireNonEmptyString(entry, key, field, violations);
  }
  requireUrl(entry, key, violations);

  if (
    typeof entry.jurisdiction === "string" &&
    !CANADIAN_JURISDICTIONS.has(entry.jurisdiction)
  ) {
    violations.push({
      key,
      field: "jurisdiction",
      issue: `"${entry.jurisdiction}" is not "Federal" or a recognized Canadian province name`,
    });
  }
}

function formatViolations(violations) {
  if (violations.length === 0) return "no violations";
  return violations
    .map((v) => `  key "${v.key}": field \`${v.field}\` — ${v.issue}`)
    .join("\n");
}

function formatDuplicates(duplicates) {
  if (duplicates.length === 0) return "no duplicate keys";
  return duplicates
    .map((d) => `  key "${d.key}" appears ${d.count} times`)
    .join("\n");
}

describe("criminalCodeData.js — CRIMINAL_CODE_SECTIONS schema", () => {
  it("is a non-empty Map", () => {
    expect(CRIMINAL_CODE_SECTIONS).toBeInstanceOf(Map);
    expect(CRIMINAL_CODE_SECTIONS.size).toBeGreaterThan(0);
  });

  it("every entry has required fields, correct types, and an https:// url", () => {
    const violations = [];
    for (const [key, entry] of CRIMINAL_CODE_SECTIONS) {
      validateCriminalCodeEntry(key, entry, violations);
    }
    expect(violations, formatViolations(violations)).toEqual([]);
  });

  it("has no duplicate keys in source", () => {
    const mapSource = extractMapLiteral(
      CRIMINAL_CODE_SOURCE,
      "CRIMINAL_CODE_SECTIONS",
    );
    const duplicates = findDuplicateKeysInSource(mapSource);
    expect(duplicates, formatDuplicates(duplicates)).toEqual([]);
  });
});

describe("charterData.js — CHARTER_SECTIONS schema", () => {
  it("is a non-empty Map", () => {
    expect(CHARTER_SECTIONS).toBeInstanceOf(Map);
    expect(CHARTER_SECTIONS.size).toBeGreaterThan(0);
  });

  it("every entry has required fields, correct types, and an https:// url", () => {
    const violations = [];
    for (const [key, entry] of CHARTER_SECTIONS) {
      validateCharterEntry(key, entry, violations);
    }
    expect(violations, formatViolations(violations)).toEqual([]);
  });

  it("has no duplicate keys in source", () => {
    const mapSource = extractMapLiteral(CHARTER_SOURCE, "CHARTER_SECTIONS");
    const duplicates = findDuplicateKeysInSource(mapSource);
    expect(duplicates, formatDuplicates(duplicates)).toEqual([]);
  });
});

describe("civilLawData.js — schema across all 15 statute Maps", () => {
  const maps = {
    CDSA_SECTIONS,
    YCJA_SECTIONS,
    CHRA_SECTIONS,
    CC_SENTENCING,
    EVIDENCE_SECTIONS,
    CCRA_SECTIONS,
    ON_HTA_SECTIONS,
    ON_RTA_SECTIONS,
    ON_HR_SECTIONS,
    BC_MVA_SECTIONS,
    BC_RTA_SECTIONS,
    BC_HR_SECTIONS,
    AB_TSA_SECTIONS,
    AB_RTA_SECTIONS,
    AB_HRA_SECTIONS,
  };

  it("covers all 15 exported statute Maps", () => {
    expect(Object.keys(maps)).toHaveLength(15);
    for (const [mapName, map] of Object.entries(maps)) {
      expect(map, mapName).toBeInstanceOf(Map);
      expect(map.size, mapName).toBeGreaterThan(0);
    }
  });

  for (const [mapName, map] of Object.entries(maps)) {
    describe(mapName, () => {
      it("every entry has required fields, correct types, and an https:// url", () => {
        const violations = [];
        for (const [key, entry] of map) {
          validateCivilLawEntry(key, entry, violations);
        }
        expect(violations, formatViolations(violations)).toEqual([]);
      });

      it("has no duplicate keys in source", () => {
        const mapSource = extractMapLiteral(CIVIL_LAW_SOURCE, mapName);
        const duplicates = findDuplicateKeysInSource(mapSource);
        expect(duplicates, formatDuplicates(duplicates)).toEqual([]);
      });
    });
  }
});
