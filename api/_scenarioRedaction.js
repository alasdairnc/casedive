// api/_scenarioRedaction.js
// Redact and fingerprint scenario text before it is stored for failure review.
//
// Scenarios are people describing their own legal trouble. The health store
// keeps a short redacted snippet of FAILED retrievals only, so a human can turn
// real misses into regression cases. Redaction is best-effort pattern matching:
// it removes contact details and identifiers and masks likely names, but it
// cannot catch every name (lowercase names, a single name opening a sentence).
// The privacy policy wording must not promise otherwise.

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

// ---- name masking ---------------------------------------------------------
// Heuristic: runs of Capitalised words that are not known legal/place terms.
// Over-masking is the safe direction, so a mid-sentence Capitalised word that
// isn't on the allow-list becomes [name]. Known gaps (documented, tested):
// lowercase names and a single name that opens a sentence.

const TITLE_WORDS =
  "Mr|Mrs|Ms|Miss|Mx|Dr|Prof|Officer|Constable|Const|Cst|Det|Detective|Sgt|Sergeant|Cpl|Corporal|Insp|Inspector|Judge|Justice|Mme|Mlle|Const";

// Capitalised words that are legal vocabulary, jurisdictions or calendar words.
const NAME_ALLOW = new Set(
  (
    "charter criminal code crown court courts supreme appeal federal provincial " +
    "ontario quebec alberta manitoba saskatchewan british columbia nova scotia " +
    "brunswick newfoundland labrador yukon nunavut northwest territories prince " +
    "edward island canada canadian canadians police officer officers constable " +
    "judge justice youth act section highway monday tuesday wednesday thursday " +
    "friday saturday sunday january february march april may june july august " +
    "september october november december mr mrs ms miss mx dr prof det sgt cpl " +
    "cst const insp mme mlle detective sergeant corporal inspector"
  ).split(" "),
);

const WORD = "[A-Z](?:[a-z]+|['’][A-Z][a-z]+)(?:[-'’][A-Za-z]+)*";
const TITLE_NAME = new RegExp(
  `\\b(${TITLE_WORDS})\\.?\\s+(?:${WORD})(?:\\s+(?:${WORD}))*`,
  "g",
);
const CAP_RUN = new RegExp(`(?<![\\w\\[])${WORD}(?:\\s+${WORD})*`, "g");

export function maskNames(text) {
  // "Officer Jones" / "Mr. Smith" -> "Officer [name]" (the title is kept).
  let out = text.replace(TITLE_NAME, (_m, title) => `${title} [name]`);

  out = out.replace(CAP_RUN, (run, offset) => {
    const before = out.slice(0, offset);
    // A case name after "R v" is a public citation, not a person to hide.
    if (/\bR\.?\s*v\.?\s*$/.test(before)) return run;
    const atSentenceStart = offset === 0 || /[.!?]\s+$/.test(before);

    const words = run.split(/\s+/);
    const pieces = [];
    let span = [];
    const flush = (isFirstOfRun) => {
      if (span.length === 0) return;
      // A single Capitalised word opening a sentence is indistinguishable from
      // an ordinary word, so it is left alone. Two or more in a row are a name.
      const keep = span.length === 1 && isFirstOfRun && atSentenceStart;
      pieces.push(keep ? span[0] : "[name]");
      span = [];
    };
    let first = true;
    for (const word of words) {
      const allowed = NAME_ALLOW.has(word.toLowerCase());
      if (allowed) {
        flush(first);
        pieces.push(word);
        first = false;
      } else {
        const wasEmpty = span.length === 0;
        span.push(word);
        // `first` tracks whether the pending span begins the whole run.
        if (wasEmpty && pieces.length > 0) first = false;
      }
    }
    flush(first && pieces.length === 0);
    return pieces.join(" ");
  });
  return out;
}

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
  text = maskNames(text);

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
    .replace(/[^a-z0-9[\] ]+/g, "");
  if (!normalized) return null;
  // A leading "f" keeps the id out of JSON number syntax: @upstash/redis
  // JSON-parses what it reads, and an all-digit id would come back as a number.
  return `f${createHash("sha256").update(normalized).digest("hex").slice(0, 15)}`;
}

export const FINGERPRINT_PATTERN = /^f[a-f0-9]{15}$/;
