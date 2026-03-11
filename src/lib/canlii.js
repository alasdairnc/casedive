// src/lib/canlii.js — CanLII citation utilities
// Citation parsing, URL building, and API lookup

const CANLII_BASE = "https://api.canlii.org/v1";
const CANLII_WEB = "https://www.canlii.org";

// Maps Canadian court abbreviations to CanLII database IDs
// Format: jurisdiction/court (e.g., ca/scc, on/ca, bc/sc)
export const COURT_DB_MAP = {
  SCC: "ca/scc",
  CSC: "ca/scc",
  FCA: "ca/fca",
  FCC: "ca/fc",
  ONCA: "on/ca",
  ONSC: "on/sc",
  ONCJ: "on/cj",
  ONDC: "on/dc",
  BCCA: "bc/ca",
  BCSC: "bc/sc",
  BCPC: "bc/pc",
  ABCA: "ab/ca",
  ABQB: "ab/qb",
  ABPC: "ab/pc",
  MBCA: "mb/ca",
  MBQB: "mb/qb",
  MBPC: "mb/pc",
  SKCA: "sk/ca",
  SKQB: "sk/qb",
  SKPC: "sk/pc",
  NSCA: "ns/ca",
  NSSC: "ns/sc",
  NSPC: "ns/pc",
  NBCA: "nb/ca",
  NBQB: "nb/qb",
  NBPC: "nb/pc",
  PECA: "pe/ca",
  PEICA: "pe/ca",
  NLCA: "nl/ca",
  NLSC: "nl/sc",
  NWTCA: "nt/ca",
  NWTSC: "nt/sc",
  NUCJ: "nu/cj",
  NUCI: "nu/cj",
  YKCA: "yk/ca",
  YKSC: "yk/sc",
  YKPC: "yk/pc",
};

/**
 * Parse a Canadian case citation.
 * Handles: "R v Smith, 2020 ONCA 123" and "R v Smith, [2020] 2 SCR 123"
 * Returns { parties, year, courtCode, number, dbId } or null if unparseable.
 */
export function parseCitation(citation) {
  if (!citation || typeof citation !== "string") return null;

  // Standard neutral citation: "Parties, YYYY COURT NUM"
  const neutral = citation.match(/^(.+?),\s*(\d{4})\s+([A-Z]{2,8})\s+(\d+)$/);
  if (neutral) {
    const [, parties, year, courtCode, number] = neutral;
    const upper = courtCode.toUpperCase();
    return {
      parties: parties.trim(),
      year,
      courtCode: upper,
      number,
      dbId: COURT_DB_MAP[upper] || null,
    };
  }

  return null;
}

/**
 * Build the CanLII internal case ID.
 * e.g. year=2021, courtCode=scc, number=37 → "2021scc37"
 */
export function buildCaseId({ year, courtCode, number }) {
  if (!year || !courtCode || !number) return null;
  return `${year}${courtCode.toLowerCase()}${number}`;
}

/**
 * Build a CanLII API URL for a specific case (requires API key).
 */
export function buildApiUrl(dbId, caseId, apiKey) {
  return `${CANLII_BASE}/caseBrowse/en/${dbId}/${caseId}/?api_key=${encodeURIComponent(apiKey)}`;
}

/**
 * Build a CanLII web URL for a case (no API key, public).
 * dbId: "ca/scc", caseId: "2021scc37" → https://www.canlii.org/en/ca/scc/doc/2021/2021scc37/index.html
 */
export function buildCaseUrl(dbId, year, caseId) {
  return `${CANLII_WEB}/en/${dbId}/doc/${year}/${caseId}/index.html`;
}

/**
 * Build a CanLII full-text search URL for a citation string.
 */
export function buildSearchUrl(citation) {
  return `${CANLII_WEB}/en/#search/text=${encodeURIComponent(citation)}`;
}

/**
 * Look up a single citation against the CanLII API.
 * Returns a verification result object:
 *   { status: "verified" | "not_found" | "unverified" | "unparseable" | "unknown_court" | "error", url?, searchUrl, title? }
 *
 * Degrades gracefully when apiKey is absent (returns "unverified" with a direct URL).
 */
export async function lookupCase(citation, apiKey) {
  const parsed = parseCitation(citation);

  if (!parsed) {
    return { status: "unparseable", searchUrl: buildSearchUrl(citation) };
  }

  if (!parsed.dbId) {
    return { status: "unknown_court", searchUrl: buildSearchUrl(citation) };
  }

  const caseId = buildCaseId({ year: parsed.year, courtCode: parsed.courtCode, number: parsed.number });
  if (!caseId) {
    return { status: "unparseable", searchUrl: buildSearchUrl(citation) };
  }

  const caseUrl = buildCaseUrl(parsed.dbId, parsed.year, caseId);
  const searchUrl = buildSearchUrl(citation);

  // No API key — return unverified with a best-guess URL
  if (!apiKey) {
    return { status: "unverified", url: caseUrl, searchUrl };
  }

  try {
    const res = await fetch(buildApiUrl(parsed.dbId, caseId, apiKey));

    if (res.status === 404) {
      return { status: "not_found", searchUrl };
    }
    if (!res.ok) {
      return { status: "error", searchUrl };
    }

    const data = await res.json();
    return {
      status: "verified",
      url: caseUrl,
      searchUrl,
      title: data.title || citation,
    };
  } catch {
    return { status: "error", searchUrl };
  }
}
