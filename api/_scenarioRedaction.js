// api/_scenarioRedaction.js
// Redact and fingerprint scenario text before it is stored for failure review.
//
// Scenarios are people describing their own legal trouble. The health store
// keeps a short redacted snippet of FAILED retrievals only, so a human can turn
// real misses into regression cases. Redaction is best-effort pattern matching:
// it removes contact details and identifiers and masks likely names, but it
// cannot catch every name (lowercase names, a lone name with no cue). It keeps
// places, shops and legal vocabulary on purpose: that context is what helps
// improve retrieval.
// The privacy policy wording must not promise otherwise.

import { createHash } from "crypto";

// Long enough to keep the facts of a typical paragraph; the first 280 dropped
// the key details of longer scenarios.
export const SCENARIO_SNIPPET_MAX_CHARS = 500;

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
// Goal: hide PEOPLE while keeping the context that helps improve retrieval
// (where it happened, what shop or app, what kind of place). So masking needs a
// person signal; a Capitalised word alone is not enough:
//   - a title + name ("Officer Jones", "Mr. Patel");
//   - two or more Capitalised words in a row ("Jane Doe"), unless one of them is
//     a place word ("Eaton Centre", "King Street");
//   - a single Capitalised word right after a relationship/introduction word
//     ("my brother Mike", "named Sarah", "told Sarah") or right before a verb a
//     person does ("Sarah grabbed", "Mike's").
// Cities, provinces, well-known shops/apps and legal vocabulary are always kept.
// Known gaps (documented, tested): lowercase names, a lone name with no cue or
// verb ("I met Sarah yesterday"), and a lone name that opens a sentence.

const TITLE_WORDS =
  "Mr|Mrs|Ms|Miss|Mx|Dr|Prof|Officer|Constable|Const|Cst|Det|Detective|Sgt|Sergeant|Cpl|Corporal|Insp|Inspector|Judge|Justice|Mme|Mlle";

const words = (list) => new Set(list.split(/\s+/).filter(Boolean));

// Legal vocabulary, jurisdictions and calendar words.
const LEGAL_AND_CALENDAR = words(
  "charter criminal code crown court courts supreme appeal federal provincial " +
    "ontario quebec alberta manitoba saskatchewan british columbia nova scotia " +
    "brunswick newfoundland labrador yukon nunavut northwest territories prince " +
    "edward island canada canadian canadians police officer officers constable " +
    "judge justice youth act section highway monday tuesday wednesday thursday " +
    "friday saturday sunday january february march april may june july august " +
    "september october november december mr mrs ms miss mx dr prof det sgt cpl " +
    "cst const insp mme mlle detective sergeant corporal inspector",
);

// Where it happened: the jurisdiction matters for which cases apply, and a city
// does not identify anyone.
const PLACES = words(
  "toronto ottawa mississauga brampton hamilton markham vaughan kitchener " +
    "waterloo guelph burlington oakville oshawa barrie sudbury etobicoke " +
    "scarborough vancouver surrey burnaby kelowna abbotsford nanaimo calgary " +
    "edmonton lethbridge winnipeg saskatoon montreal laval gatineau sherbrooke " +
    "halifax dartmouth moncton fredericton charlottetown yellowknife whitehorse " +
    "iqaluit",
);

// Shops, apps and services: what kind of place or platform it was.
const BRANDS = words(
  "walmart costco amazon uber lyft doordash lcbo loblaws sobeys shoppers " +
    "sephora starbucks subway apple google facebook instagram snapchat tiktok " +
    "whatsapp netflix paypal interac visa mastercard ikea winners zellers rona " +
    "staples metro",
);

// Multi-word names are matched as a PHRASE, never word by word, so that "Tim"
// in "my brother Tim" is not kept just because "Tim Hortons" is.
const PHRASES = [
  "tim hortons",
  "canadian tire",
  "home depot",
  "best buy",
  "thunder bay",
  "niagara falls",
  "north york",
];

// Places that are also first names or surnames. Kept by default, but a cue
// before ("my friend Victoria") or a person verb after ("Victoria said")
// overrides it. Legal vocabulary is never overridden.
const AMBIGUOUS = words("victoria regina richmond london windsor cambridge kingston");
const AMBIGUOUS_KEEP = AMBIGUOUS;

// A span containing one of these is a place or venue, not a person
// ("Eaton Centre", "King Street", "Rec Room").
const PLACE_WORDS = words(
  "street avenue road drive boulevard lane court crescent way place square " +
    "centre center mall plaza park hospital school university college station " +
    "bridge room bar pub club restaurant store market airport arena stadium " +
    "library church temple mosque hotel motel inn gym theatre cinema tower " +
    "building terminal highway expressway parkway",
);

const KEEP = new Set([
  ...LEGAL_AND_CALENDAR,
  ...PLACES,
  ...BRANDS,
  ...AMBIGUOUS_KEEP,
]);

// "my brother Mike", "named Sarah", "told Sarah", "with Sarah".
const CUE_BEFORE = new RegExp(
  "(?:^|\\W)(?:friend|neighbour|neighbor|brother|sister|mother|father|mom|dad|mum|" +
    "wife|husband|partner|boyfriend|girlfriend|fiance|fiancee|ex|boss|manager|" +
    "supervisor|landlord|landlady|tenant|teacher|principal|coach|cousin|uncle|" +
    "aunt|grandma|grandmother|grandpa|grandfather|son|daughter|roommate|coworker|" +
    "colleague|employee|client|customer|lawyer|doctor|nurse|named|called|told|" +
    "asked|with|against)\\s+$",
  "i",
);
// "Sarah grabbed", "Mike took", "Sarah's".
const PERSON_AFTER = new RegExp(
  "^(?:\\s+(?:said|says|told|asked|saw|took|hit|grabbed|kicked|called|" +
    "texted|punched|pushed|threatened|stole|yelled|lied|admitted|confessed|" +
    "claimed|accused|gave|sold|and\\s+(?:i|me|my)\\b))",
  "i",
);

const WORD = "[A-Z](?:[a-z]+|['’][A-Z][a-z]+)(?:[-'’][A-Za-z]+)*";
const TITLE_NAME = new RegExp(
  "\\b(" + TITLE_WORDS + ")\\.?\\s+(?:" + WORD + ")(?:\\s+(?:" + WORD + "))*",
  "g",
);
const CAP_RUN = new RegExp("(?<![\\w\\[])" + WORD + "(?:\\s+" + WORD + ")*", "g");

const POSSESSIVE = /['’]s$/i;

// Words that open a sentence and would otherwise be swallowed into a name span
// ("Then Sarah grabbed my phone" must not mask "Then").
const STARTERS = words(
  "then and but so when after before while because if also later next finally " +
    "suddenly meanwhile however yesterday today tonight afterwards once now",
);

// A person signal around a word: a cue before it, a person verb after it.
const personSignal = (before, after) =>
  CUE_BEFORE.test(before) || PERSON_AFTER.test(after);

export function maskNames(text) {
  // "Officer Jones" / "Mr. Smith" -> "Officer [name]" (the title is kept).
  const out = text.replace(TITLE_NAME, (_m, title) => title + " [name]");
  const edits = [];

  for (const match of out.matchAll(CAP_RUN)) {
    const runStart = match.index;
    // A case name after "R v" is a public citation, not a person to hide.
    if (/\bR\.?\s*v\.?\s*$/.test(out.slice(0, runStart))) continue;

    // Word positions inside the run.
    const tokens = [];
    let cursor = 0;
    for (const w of match[0].split(/\s+/)) {
      const at = match[0].indexOf(w, cursor);
      tokens.push({ w, start: runStart + at, end: runStart + at + w.length });
      cursor = at + w.length;
    }

    // Mark whole phrases ("Tim Hortons") as kept.
    const lower = tokens.map((t) => t.w.toLowerCase());
    for (const phrase of PHRASES) {
      const parts = phrase.split(" ");
      for (let p = 0; p + parts.length <= lower.length; p += 1) {
        if (parts.every((part, k) => lower[p + k] === part)) {
          for (let k = 0; k < parts.length; k += 1) tokens[p + k].phrase = true;
        }
      }
    }

    const kept = (tok) => {
      if (tok.phrase) return true;
      const word = tok.w.toLowerCase();
      if (LEGAL_AND_CALENDAR.has(word)) return true; // never overridden
      if (!KEEP.has(word)) return false;
      // A place that is also a name: a person signal around it wins.
      if (AMBIGUOUS.has(word)) {
        return !personSignal(out.slice(0, tok.start), out.slice(tok.end));
      }
      return true;
    };

    // Consecutive words that are not kept form one span.
    let i = 0;
    while (i < tokens.length) {
      if (kept(tokens[i])) {
        i += 1;
        continue;
      }
      let j = i;
      while (j + 1 < tokens.length && !kept(tokens[j + 1])) j += 1;
      const span = tokens.slice(i, j + 1);
      while (span.length > 1 && STARTERS.has(span[0].w.toLowerCase())) span.shift();
      const start = span[0].start;
      const end = span[span.length - 1].end;
      const before = out.slice(0, start);
      const after = out.slice(end);

      let mask;
      if (span.length >= 2) {
        mask = !span.some((t) => PLACE_WORDS.has(t.w.toLowerCase()));
      } else {
        const word = span[0].w;
        const atSentenceStart = start === 0 || /[.!?]\s+$/.test(before);
        const possessive = POSSESSIVE.test(word);
        // "Sarah's" is one token (the word pattern takes the 's), so a
        // possessive is itself the person signal unless the owner is a known
        // place or shop ("Toronto's", "Costco's").
        const ownerKept = possessive && KEEP.has(word.slice(0, -2).toLowerCase());
        mask =
          !atSentenceStart &&
          !ownerKept &&
          !PLACE_WORDS.has(word.toLowerCase()) &&
          (possessive || personSignal(before, after));
      }
      if (mask) edits.push({ start, end });
      i = j + 1;
    }
  }

  let result = out;
  for (const { start, end } of edits.sort((x, y) => y.start - x.start)) {
    result = result.slice(0, start) + "[name]" + result.slice(end);
  }
  return result;
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
