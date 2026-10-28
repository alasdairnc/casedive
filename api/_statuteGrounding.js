// api/_statuteGrounding.js
// Grounds /api/analyze in the full CDSA and YCJA data (src/lib/cdsaData.js,
// ycjaData.js). Everything here is deterministic. Gated by STATUTE_GROUNDING=on
// (default off) until the eval in tests/unit/statuteGroundingScenarios.js has
// been run against the live model; see docs/statute-grounding.md.
//
// - Youth is an OVERLAY, not an issue class. "A 15-year-old shoplifted" is a
//   theft scenario that also engages the YCJA. Making youth a primary issue in
//   the retrieval or ranking code would take the primary away from theft and
//   drop its case law, so this module never touches issue detection.
// - Cannabis is governed by the Cannabis Act, not the CDSA (CDSA Schedule II
//   lists only synthetic cannabinoids), so a cannabis-only scenario gets no
//   CDSA candidates.
import { CDSA_SECTIONS } from "../src/lib/cdsaData.js";
import { YCJA_SECTIONS } from "../src/lib/ycjaData.js";
import { lookupStatuteSection } from "../src/lib/statuteLookup.js";

export function isStatuteGroundingEnabled() {
  return process.env.STATUTE_GROUNDING === "on";
}

const MAX_PER_ACT = 8; // when only one Act is engaged
const MAX_CANDIDATES = 10; // when both are
const CDSA_RESERVE = 4;
const SUMMARY_CHARS = 300;

// ── Youth overlay ────────────────────────────────────────────────────────────

const YOUTH_WORDS =
  /\b(?:youths?|young\s+(?:person|persons|people|offenders?)|teen(?:ager|agers|aged)?s?|adolescents?|juveniles?|high[-\s]school\s+students?|grade\s+(?:[7-9]|1[0-2]))\b/i;

// Objects that take an age without being a person ("my 15-year-old car").
const NOT_A_PERSON =
  "car|truck|vehicle|suv|van|house|home|building|bike|motorcycle|phone|laptop|computer|dog|cat|furnace|tree|roof|boat|trailer";
// Units/words that follow a number that is not an age ("he was 15 minutes late").
const NOT_AN_AGE =
  "[:.,]?\\d|%|°|degrees?|km|kilometres?|miles?|years?\\s+ago|months?|weeks?|days?|hours?|minutes?|mins?|seconds?|dollars?|\\$|st\\b|nd\\b|rd\\b|th\\b|people|persons?|times|kids|items?|grams?|g\\b|mg\\b|pills?|bags?|ounces?|oz\\b|over\\b|under\\b|of\\b|mph\\b|kph\\b|km/h|feet\\b|ft\\b|metres?\\b|lbs?\\b|pounds?\\b|kg\\b";
// Who can be "was 16": a pronoun or a person noun. "There were 15 of us" and
// "the speed limit was 50" name no person.
const AGE_SUBJECT =
  "(?:i|he|she|they|we|who|but|and|then|though)\\s+(?:was|were|am|is|are)|i'?m|he'?s|she'?s|they'?re|(?:boy|girl|kid|child|teen\\w*|student|accused|suspect|defendant|son|daughter|youth)\\s+(?:was|is)";

function ageMatchers() {
  return [
    new RegExp(
      `\\b(\\d{1,2})[-\\s]?(?:years?|yrs?)[-\\s]?old\\b(?!\\s+(?:${NOT_A_PERSON})\\b)`,
      "gi",
    ),
    /\bage[ds]?\s+(?:of\s+)?(\d{1,2})\b/gi,
    /\b(\d{1,2})\s+years?\s+of\s+age\b/gi,
    new RegExp(
      `\\b(?:${AGE_SUBJECT})\\s+(\\d{1,2})\\b(?!\\s*(?:${NOT_AN_AGE}))`,
      "gi",
    ),
  ];
}

function extractAges(text) {
  const ages = [];
  for (const re of ageMatchers()) {
    for (const m of text.matchAll(re)) ages.push(Number(m[1]));
  }
  return ages;
}

// YCJA applies to a person who was 12-17 at the time of the offence. A scenario
// that also names an adult age (a 35-year-old charged for an offence against a
// 15-year-old, or "now 19, offence at 16") is ambiguous; the prompt hint is
// worded conditionally, so we return the signal with `ambiguous: true`.
export function detectYouth(scenario) {
  const text = String(scenario || "");
  const ages = extractAges(text);
  const youthAges = ages.filter((a) => a >= 12 && a <= 17);
  const adultAges = ages.filter((a) => a >= 18 && a < 100);
  const childAges = ages.filter((a) => a >= 1 && a < 12);
  const hasWord =
    YOUTH_WORDS.test(text) ||
    /\bunder\s+(?:the\s+age\s+of\s+)?18\b/i.test(text);
  const detected = youthAges.length > 0 || hasWord;
  return {
    detected,
    ambiguous: detected && adultAges.length > 0,
    // Under 12 cannot be convicted (Criminal Code s. 13); YCJA does not apply.
    underTwelve: !detected && adultAges.length === 0 && childAges.length > 0,
    text: text.toLowerCase(),
  };
}

// ── Drug context ─────────────────────────────────────────────────────────────

const CANNABIS =
  /\b(?:cannabis|marijuana|marihuana|weed|pot|hash(?:ish)?|edibles?|vape\s+cartridges?)\b/i;
const OTHER_DRUGS =
  /\b(?:cocaine|crack\s+(?:cocaine|pipe|rock)|fentanyl|heroin|opioids?|oxy(?:codone|contin)?|methamphetamine|meth|crystal\s+meth|mdma|ecstasy|lsd|psilocybin|magic\s+mushrooms?|ketamine|ghb|amphetamines?|benzos?|xanax|narcotics?|controlled\s+substances?|hard\s+drugs?|cdsa)\b/i;
const GENERIC_DRUG = /\bdrugs?\b|\bpills?\b/i;

// "found no drugs", "never sold drugs", "no cocaine": the drug is denied, so
// it must not read as a drug scenario.
const DRUG_WORDS = [CANNABIS, OTHER_DRUGS, GENERIC_DRUG]
  .map((re) => re.source.replace(/^\\b(?:\(\?:)?/, "").replace(/\)?\\b$/, ""))
  .join("|");
const NEGATED_DRUGS = new RegExp(
  `\\b(?:no|never|nothing|without|not|didn'?t|did\\s+not|wasn'?t|weren'?t)\\s+(?:(?:any|a|the|illegal|illicit|hard|more|found|find|have|had|has|sold|sell|selling|carry\\w*|possess\\w*)\\s+)*(?:${DRUG_WORDS})\\b`,
  "gi",
);

const POSSESSION =
  /\b(?:possess(?:ion|ed|ing)?|had\s+\w+\s+on\s+(?:me|him|her|them)|found\s+with|in\s+(?:my|his|her|their)\s+(?:pocket|backpack|bag|car))\b/i;
const TRAFFICKING =
  /\b(?:traffick\w*|sell(?:ing)?|sold|deal(?:er|ing|s)?|distribut\w*|supplie[sd]|supplying|for\s+the\s+purpose\s+of|intent\s+to\s+sell|(?:digital|drug)\s+scale|baggies|customers?|gave\s+(?:it|them|some)\s+to)\b/i;
const PRODUCTION =
  /\b(?:grow(?:ing)?\s+(?:op|operation)|(?:meth|drug|clandestine)\s+lab|manufactur\w*|synthesi[sz]\w*|cook(?:ing|ed)?\s+(?:meth|drugs)|produc\w*\s+(?:of\s+)?(?:\w+\s+){0,2}(?:drugs?|meth\w*|fentanyl|cocaine|heroin|substances?))\b/i;
const IMPORT_EXPORT =
  /\b(?:import(?:ed|ing)?|export(?:ed|ing)?|smuggl\w*|(?:across|at)\s+the\s+border|customs|border\s+(?:officer|agent|crossing)|courier)\b/i;
const PRECURSOR_EQUIPMENT =
  /\b(?:precursors?|pill\s+press(?:es)?|encapsulat\w*|chemicals?\s+to\s+(?:make|produce))\b/i;

export function detectDrugContext(scenario) {
  const text = String(scenario || "").replace(NEGATED_DRUGS, " ");
  const cannabis = CANNABIS.test(text);
  const hardDrug = OTHER_DRUGS.test(text);
  const generic = GENERIC_DRUG.test(text);
  const detected = hardDrug || (generic && !cannabis);
  return {
    detected,
    // Cannabis with no other drug named: Cannabis Act, not the CDSA.
    cannabisOnly: cannabis && !hardDrug,
    possession: POSSESSION.test(text),
    trafficking: TRAFFICKING.test(text),
    production: PRODUCTION.test(text),
    importExport: IMPORT_EXPORT.test(text),
    precursor: PRECURSOR_EQUIPMENT.test(text),
  };
}

// ── Candidate rules ──────────────────────────────────────────────────────────
// Each rule lists sections that a legal reviewer checked against the Act's text
// (via the verified summaries). A unit test requires every listed section to
// exist, be `summarySource: "verified"`, and not be repealed. Order is priority.

const SERIOUS_VIOLENT =
  /\b(?:murder|manslaughter|attempted\s+murder|aggravated\s+sexual\s+assault|aggravated\s+assault|serious\s+violent|adult\s+sentence)\b/i;

export const CDSA_RULES = [
  {
    id: "cdsa_trafficking",
    when: (d) => d.trafficking,
    sections: ["5", "4", "10"],
  },
  {
    id: "cdsa_possession",
    when: (d) => d.possession && !d.trafficking,
    sections: ["4", "10.2", "10.3", "10.1"],
  },
  { id: "cdsa_production", when: (d) => d.production, sections: ["7", "7.1"] },
  { id: "cdsa_import_export", when: (d) => d.importExport, sections: ["6"] },
  { id: "cdsa_precursor", when: (d) => d.precursor, sections: ["7.1"] },
  // Drug named, no offence type clear from the facts.
  {
    id: "cdsa_generic",
    when: (d) =>
      !d.trafficking &&
      !d.possession &&
      !d.production &&
      !d.importExport &&
      !d.precursor,
    sections: ["4", "5"],
  },
];

export const YCJA_RULES = [
  { id: "ycja_policy", when: () => true, sections: ["3"] },
  {
    id: "ycja_extrajudicial",
    when: (y) => !SERIOUS_VIOLENT.test(y.text),
    sections: ["4", "6", "10"],
  },
  {
    id: "ycja_police",
    when: (y) =>
      /\b(?:arrest\w*|detain\w*|police|officer|interrogat\w*|interview\w*|questioned|statement|confess\w*|custody)\b/.test(
        y.text,
      ),
    sections: ["25", "26", "146"],
  },
  {
    id: "ycja_release",
    when: (y) =>
      /\b(?:bail|release|remand|pre-?trial|detention\s+(?:hearing|centre)|held\s+in\s+custody)\b/.test(
        y.text,
      ),
    sections: ["29", "28"],
  },
  {
    id: "ycja_sentencing",
    when: (y) =>
      /\b(?:sentenc\w*|convicted|found\s+guilty|pleaded\s+guilty|pled\s+guilty|probation|custody\s+order|open\s+custody|secure\s+custody)\b/.test(
        y.text,
      ),
    sections: ["38", "39", "42"],
  },
  {
    id: "ycja_adult_sentence",
    when: (y) => SERIOUS_VIOLENT.test(y.text),
    sections: ["64", "72"],
  },
  {
    id: "ycja_publication",
    when: (y) =>
      /\b(?:publish\w*|media|news|social\s+media|posted|named|identif\w*|name\s+released)\b/.test(
        y.text,
      ),
    sections: ["110"],
  },
  {
    id: "ycja_records",
    when: (y) =>
      /\b(?:criminal\s+record|record\s+check|background\s+check|employer|pardon|records?\s+(?:sealed|access))\b/.test(
        y.text,
      ),
    sections: ["119"],
  },
  {
    id: "ycja_breach",
    when: (y) =>
      /\b(?:breach\w*|fail\w*\s+to\s+comply|violat\w*\s+(?:his|her|their)\s+(?:probation|conditions|sentence))\b/.test(
        y.text,
      ),
    sections: ["137"],
  },
];

const ACTS = {
  CDSA: { map: CDSA_SECTIONS, name: "Controlled Drugs and Substances Act" },
  YCJA: { map: YCJA_SECTIONS, name: "Youth Criminal Justice Act" },
};

// Cuts at a sentence end when that keeps at least half of `max`; otherwise at a
// word boundary with an ellipsis. A section whose first sentence is a short
// generality and whose conditions follow in one long sentence (YCJA s. 146) must
// keep the conditions, not collapse to the generality.
function leadSentences(text, max) {
  const clean = String(text || "")
    .replace(/\s+/g, " ")
    .trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("; "));
  if (end >= max / 2) return cut.slice(0, end + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).trimEnd()}…`;
}

function toCandidate(act, num) {
  const entry = ACTS[act].map.get(num);
  if (!entry || entry.kind === "schedule") return null;
  return {
    citation: `${act} s. ${num}`,
    title: entry.title,
    summary: leadSentences(entry.summary, SUMMARY_CHARS),
    url: entry.url,
  };
}

// Round-robin across the matched rules (every rule's lead section, then every
// rule's second, ...) so a cap never cuts a whole issue out of the list.
function collect(act, rules, signal) {
  const hits = rules.filter((rule) => rule.when(signal));
  const nums = [];
  const depth = Math.max(0, ...hits.map((r) => r.sections.length));
  for (let i = 0; i < depth; i++) {
    for (const rule of hits) {
      const n = rule.sections[i];
      if (n && !nums.includes(n)) nums.push(n);
    }
  }
  return {
    cands: nums.map((n) => toCandidate(act, n)).filter(Boolean),
    matched: hits.map((r) => r.id),
  };
}

// The charge comes first. With both Acts engaged the CDSA keeps CDSA_RESERVE
// slots, so a long youth-procedure list can never push s. 5 off a trafficking
// charge.
function allocate(cdsa, ycja) {
  if (cdsa.length === 0 || ycja.length === 0) {
    return [...cdsa, ...ycja].slice(0, MAX_PER_ACT);
  }
  const head = cdsa.slice(0, CDSA_RESERVE);
  return [...head, ...ycja.slice(0, MAX_CANDIDATES - head.length)];
}

// ── Public entry points ──────────────────────────────────────────────────────

/**
 * Deterministic grounding for a scenario. Returns null when grounding is off,
 * civil_law is filtered out, or nothing in the scenario engages CDSA/YCJA.
 */
export function buildStatuteGrounding(scenario, filters = {}) {
  if (!isStatuteGroundingEnabled()) return null;
  if (filters?.lawTypes?.civil_law === false) return null;

  const youth = detectYouth(scenario);
  const drug = detectDrugContext(scenario);
  const useCdsa = drug.detected && !drug.cannabisOnly;

  const hints = [];
  let cdsaCands = [];
  let ycjaCands = [];
  const rulesMatched = [];

  if (youth.detected) {
    const { cands, matched } = collect("YCJA", YCJA_RULES, youth);
    ycjaCands = cands;
    rulesMatched.push(...matched);
    hints.push(
      youth.ambiguous
        ? "The scenario mentions both a young person and an adult. The YCJA applies only if the ACCUSED was 12-17 at the time of the offence; if the young person is only a victim or witness, do not cite the YCJA."
        : "The scenario suggests the accused may have been 12-17 at the time of the offence. The YCJA applies only in that case; if the young person is only a victim or witness, do not cite the YCJA. Where it applies, cite the YCJA alongside the Criminal Code offence.",
    );
  } else if (youth.underTwelve) {
    hints.push(
      "The only age mentioned is under 12. A child under 12 cannot be convicted of an offence (Criminal Code s. 13) and the YCJA does not apply; do not cite YCJA sections.",
    );
  }

  if (useCdsa) {
    const { cands, matched } = collect("CDSA", CDSA_RULES, drug);
    cdsaCands = cands;
    rulesMatched.push(...matched);
  } else if (drug.cannabisOnly) {
    hints.push(
      "Cannabis (marijuana, hash, edibles) is governed by the Cannabis Act, not the Controlled Drugs and Substances Act. Do not cite CDSA sections for cannabis alone.",
    );
  }

  const candidates = allocate(cdsaCands, ycjaCands);
  if (candidates.length === 0 && hints.length === 0) return null;

  if (candidates.length > 0) {
    hints.unshift(
      'Cite CDSA and YCJA provisions in civil_law (they are federal statutes), written as "CDSA s. 5" or "YCJA s. 38". The statute_db reference block is a menu, not a checklist: cite only the sections that apply to these facts, at most 4 in civil_law, and write only the citation (no section title in brackets). In analysis, say only what the text of these sections says and how it applies to these facts. Do not predict remedies, admissibility or any consequence of non-compliance unless the section itself says so (for example CDSA s. 10.2 and YCJA s. 6 state that failing to consider the options does not invalidate a charge). Never guess a section number.',
    );
  }

  return {
    candidates,
    hints,
    meta: {
      youth: youth.detected,
      youthAmbiguous: youth.ambiguous,
      cdsa: useCdsa,
      cannabisOnly: drug.cannabisOnly,
      rules: rulesMatched,
      candidates: candidates.map((c) => c.citation),
    },
  };
}

const STATUTE_CITATION =
  /\b(?:CDSA|YCJA)\b|controlled drugs and substances act|youth criminal justice act/i;
const HAS_SECTION = /\bs{1,2}\.\s*\d|\bsections?\s+\d|\bschedule\b/i;

/**
 * Server-side citation check. Removes CDSA/YCJA civil_law items whose section
 * number does not exist in the Act (hallucinated), and returns what was
 * dropped. Items we cannot parse a section from are kept, not guessed at.
 */
export function checkStatuteCitations(result) {
  const out = { checked: 0, verified: 0, dropped: [] };
  if (!result || !Array.isArray(result.civil_law)) return out;
  result.civil_law = result.civil_law.filter((item) => {
    const citation = typeof item?.citation === "string" ? item.citation : "";
    if (!STATUTE_CITATION.test(citation) || !HAS_SECTION.test(citation)) {
      return true;
    }
    out.checked += 1;
    // "CDSA s. 5." is a real section; civilLawRegistry reads the number as "5.".
    // Trimmed here, not there, because verify.js shares the registry.
    if (lookupStatuteSection(citation.trim().replace(/[.,;\s]+$/, ""))) {
      out.verified += 1;
      return true;
    }
    out.dropped.push(citation.slice(0, 120));
    return false;
  });
  return out;
}

const SECTION_REF = /\b(?:s{1,2}\.|sections?)\s*(\d+(?:\.\d+)?)/i;
const ANCHOR_CHARS = 500;

/**
 * Replaces the model's wording for CDSA/YCJA items with the independently
 * verified section text. A live read of the model's `summary` and
 * `matched_section` found invented consequences ("failure may affect the
 * confession's admissibility", "the right applies before arrest") that no
 * citation check can catch, and a prompt rule only reduced them. So for a
 * section we hold verified text for, `summary` becomes the lead of that text and
 * the model's `matched_section` is dropped. The application to the facts is
 * left to `analysis`. Items we cannot anchor are left as the model wrote them.
 * Returns how many items were anchored.
 */
export function anchorStatuteItems(result) {
  if (!result || !Array.isArray(result.civil_law)) return 0;
  let anchored = 0;
  for (const item of result.civil_law) {
    const citation = typeof item?.citation === "string" ? item.citation : "";
    if (!STATUTE_CITATION.test(citation)) continue;
    const num = citation.match(SECTION_REF)?.[1];
    if (!num) continue;
    const act = /ycja|youth criminal/i.test(citation) ? "YCJA" : "CDSA";
    const entry = ACTS[act].map.get(num);
    if (
      !entry ||
      entry.kind === "schedule" ||
      entry.summarySource !== "verified" ||
      !entry.summary
    ) {
      continue;
    }
    item.summary = leadSentences(entry.summary, ANCHOR_CHARS);
    delete item.matched_section;
    anchored += 1;
  }
  return anchored;
}
