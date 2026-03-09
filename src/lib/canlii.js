// src/lib/canlii.js — CanLII citation utilities
// Citation parsing, URL building, and API lookup

const CANLII_BASE = "https://api.canlii.org/v1";
const CANLII_WEB = "https://www.canlii.org";

// Maps Canadian court abbreviations to CanLII database IDs
export const COURT_DB_MAP = {
  SCC: "csc-scc",
  CSC: "csc-scc",
  FCA: "fca-caf",
  FCC: "fct-cf",
  ONCA: "onca",
  ONSC: "onsc",
  ONCJ: "oncj",
  ONDC: "ondc",
  BCCA: "bcca",
  BCSC: "bcsc",
  BCPC: "bcpc",
  ABCA: "abca",
  ABQB: "abqb",
  ABPC: "abpc",
  MBCA: "mbca",
  MBQB: "mbqb",
  MBPC: "mbpc",
  SKCA: "skca",
  SKQB: "skqb",
  SKPC: "skpc",
  NSCA: "nsca",
  NSSC: "nssc",
  NSPC: "nspc",
  NBCA: "nbca",
  NBQB: "nbqb",
  NBPC: "nbpc",
  PECA: "peca",
  PEICA: "peca",
  NLCA: "nlca",
  NLSC: "nlsc",
  NWTCA: "nwtca",
  NWTSC: "nwtsc",
  NUCJ: "nucj",
  NUCI: "nucj",
  YKCA: "ykca",
  YKSC: "yksc",
  YKPC: "ykpc",
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
 * e.g. year=2020, dbId=onca, number=123 → "2020onca123"
 */
export function buildCaseId({ year, dbId, number }) {
  if (!year || !dbId || !number) return null;
  return `${year}${dbId}${number}`;
}

/**
 * Build a CanLII API URL for a specific case (requires API key).
 */
export function buildApiUrl(dbId, caseId, apiKey) {
  return `${CANLII_BASE}/caseBrowse/en/${dbId}/${caseId}/?api_key=${encodeURIComponent(apiKey)}`;
}

/**
 * Build a CanLII web URL for a case (no API key, public).
 */
export function buildCaseUrl(dbId, caseId) {
  return `${CANLII_WEB}/en/${dbId}/doc/${caseId}/index.html`;
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

  const caseId = buildCaseId({ year: parsed.year, dbId: parsed.dbId, number: parsed.number });
  if (!caseId) {
    return { status: "unparseable", searchUrl: buildSearchUrl(citation) };
  }

  const caseUrl = buildCaseUrl(parsed.dbId, caseId);
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
