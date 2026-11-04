// api/_scenarioRedaction.js
// Redact and fingerprint scenario text before it is stored for failure review.
//
// Scenarios are people describing their own legal trouble. The health store
// keeps a short redacted snippet of FAILED retrievals only, so a human can turn
// real misses into regression cases. Redaction is best-effort pattern matching:
// it removes contact details and identifiers, but it cannot reliably remove
// names or places. The privacy policy wording must not promise otherwise.

import { createHash } from "crypto";

export const SCENARIO_SNIPPET_MAX_CHARS = 280;

// Order matters: strip URLs and emails before the digit-based patterns so their
// digits are not half-matched.
const REDACTIONS = [
  [/\bhttps?:\/\/\S+|\bwww\.\S+/gi, "[url]"],
  [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi, "[email]"],
  // Canadian SIN (123-456-789 / 123 456 789).
  [/\b\d{3}[\s-]\d{3}[\s-]\d{3}\b/g, "[id]"],
  // North American phone numbers, with optional +1 and bracketed area code.
  [/(?:\+?1[\s.-]?)?\(?\b\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/g, "[phone]"],
  // Canadian postal codes (M5V 2T6).
  [/\b[a-z]\d[a-z][\s-]?\d[a-z]\d\b/gi, "[postal]"],
  // Street addresses: "123 King Street West", "45 Main St".
  [
    /\b\d{1,5}\s+(?:[a-z0-9'.-]+\s+){1,3}(?:street|st|avenue|ave|road|rd|drive|dr|boulevard|blvd|lane|ln|court|ct|crescent|cres|way|place|pl)\b\.?(?:\s+(?:north|south|east|west|n|s|e|w)\b)?/gi,
    "[address]",
  ],
  // Any remaining run of 6+ digits (licence, file, card, case numbers), also
  // when attached to letters (D12345678901).
  [/\d{6,}/g, "[id]"],
];

function collapse(text) {
  return String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

export function redactScenario(
  scenario,
  maxChars = SCENARIO_SNIPPET_MAX_CHARS,
) {
  if (typeof scenario !== "string") return "";
  let text = collapse(scenario);
  if (!text) return "";

  for (const [pattern, replacement] of REDACTIONS) {
    text = text.replace(pattern, replacement);
  }

  if (text.length <= maxChars) return text;
  // Cut on a word boundary so the snippet doesn't end mid-token.
  const cut = text.slice(0, maxChars);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > maxChars * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

// Stable id for "the same scenario": lowercased, punctuation-insensitive, and
// computed from the REDACTED text so the hash never depends on removed data.
export function scenarioFingerprint(redacted) {
  const normalized = collapse(redacted)
    .toLowerCase()
    .replace(/[^a-z0-9\[\] ]+/g, "");
  if (!normalized) return null;
  // A leading "f" keeps the id out of JSON number syntax: @upstash/redis
  // JSON-parses what it reads, and an all-digit id would come back as a number.
  return `f${createHash("sha256").update(normalized).digest("hex").slice(0, 15)}`;
}

export const FINGERPRINT_PATTERN = /^f[a-f0-9]{15}$/;
