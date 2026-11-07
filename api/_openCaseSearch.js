// api/_openCaseSearch.js
// Prototype: full-text case-law search over A2AJ's open Canadian legal data
// (https://api.a2aj.ca). CanLII's API has no text search, so this is the only
// way to find a case the model did not name and the corpus does not hold.
// Gated by OPEN_CASE_SEARCH=on (see isOpenCaseSearchEnabled); fails open.
//
// Coverage is partial: SCC and the Courts of Appeal for ON, BC, NS, NL and YT
// only. No QC, AB, SK, MB or NB appeal courts, and no trial courts but NS.
// A2AJ carries no treatment data, so a hit may have been overturned.
import { parseCitation } from "../src/lib/canlii.js";
import { SIMPLE_STOP_WORDS } from "./_textUtils.js";

const A2AJ_SEARCH_URL = "https://api.a2aj.ca/search";
const OPEN_SEARCH_TIMEOUT_MS = 4000;
const MAX_QUERY_WORDS = 12;
const MAX_RESULTS = 8;
const MIN_HIGHLIGHTED_TERMS = 2;

const DEFAULT_DATASETS = ["SCC", "ONCA", "BCCA", "NSCA", "NLCA", "YKCA"];
const JURISDICTION_DATASETS = {
  Ontario: ["ONCA"],
  "British Columbia": ["BCCA"],
  "Nova Scotia": ["NSCA"],
  "Newfoundland and Labrador": ["NLCA"],
};

export function isOpenCaseSearchEnabled() {
  return process.env.OPEN_CASE_SEARCH === "on";
}

function datasetsFor(filters = {}) {
  const { jurisdiction = "all", courtLevel = "all" } = filters || {};
  if (courtLevel === "scc") return ["SCC"];
  const provincial = JURISDICTION_DATASETS[jurisdiction];
  // A jurisdiction we hold no appeal court for still gets the SCC.
  if (jurisdiction !== "all") return ["SCC", ...(provincial || [])];
  return DEFAULT_DATASETS;
}

// The model's own search terms come first: "therapist-patient privilege" finds
// O'Connor, the scenario's "my therapist told my crimes to the police" does not.
export function buildOpenSearchQuery({
  scenario = "",
  aiSuggestions = [],
} = {}) {
  const words = [];
  const seen = new Set();
  const add = (text) => {
    for (const w of String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)) {
      if (w.length < 4 || SIMPLE_STOP_WORDS.has(w) || seen.has(w)) continue;
      seen.add(w);
      words.push(w);
    }
  };
  if (Array.isArray(aiSuggestions)) {
    for (const s of aiSuggestions.slice(0, 3)) add(s?.term || s?.label);
  }
  add(scenario);
  return words.slice(0, MAX_QUERY_WORDS).join(" ");
}

function stripMarkup(text) {
  return String(text || "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Candidates in the shape retrieval already uses. Only hits whose citation we
 * can parse are kept; `existenceProven` marks that a court source returned the
 * decision, which matters for pre-2000 cases CanLII's lookup cannot confirm.
 * A failed search still returns [] (fails open); `onError` is called so the
 * caller knows the empty list is an outage, not an answer.
 */
export async function searchOpenCaseLaw({
  scenario,
  aiSuggestions = [],
  filters = {},
  timeoutMs = OPEN_SEARCH_TIMEOUT_MS,
  onError,
} = {}) {
  // No model terms means the pre-model retrieval pass. Scenario words alone
  // return noise (live check, 2026-11-02), so don't search on them.
  const hasModelTerms =
    Array.isArray(aiSuggestions) &&
    aiSuggestions.some((s) => String(s?.term || s?.label || "").trim());
  if (!hasModelTerms) return [];
  const query = buildOpenSearchQuery({ scenario, aiSuggestions });
  if (!query) return [];

  const params = new URLSearchParams({
    query,
    search_type: "full_text",
    doc_type: "cases",
    size: String(MAX_RESULTS),
    dataset: datasetsFor(filters).join(","),
  });
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${A2AJ_SEARCH_URL}?${params}`, {
      signal: controller.signal,
    });
    if (!res?.ok) {
      onError?.();
      return [];
    }
    const body = await res.json();
    const out = [];
    for (const hit of Array.isArray(body?.results) ? body.results : []) {
      const citation = String(hit?.citation_en || "").trim();
      const parsed = parseCitation(citation);
      if (!parsed) continue; // docket-number style ids (e.g. "C38577")
      // The index wraps each query word it matched in <em>. A passage that
      // matched only one word is noise (any case mentions "police").
      const hits = new Set(
        [...String(hit.snippet || "").matchAll(/<em>([^<]+)<\/em>/gi)].map(
          (m) => m[1].toLowerCase(),
        ),
      ).size;
      if (hits < MIN_HIGHLIGHTED_TERMS) continue;
      out.push({
        citation,
        title: stripMarkup(hit.name_en) || null,
        summary: stripMarkup(hit.snippet),
        url: "",
        matchedTerm: "Open case-law search",
        court: parsed.courtCode,
        year: parsed.year,
        existenceProven: true,
        openSearchHits: hits,
      });
    }
    return out;
  } catch {
    // Timeout, network or parse failure: fall back to other sources.
    onError?.();
    return [];
  } finally {
    clearTimeout(timer);
  }
}
