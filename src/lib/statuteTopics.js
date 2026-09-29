// src/lib/statuteTopics.js
// Browse topics for the CDSA and YCJA in the explorer, resolved from each
// section's `partOf` + `heading` (extracted by scripts/buildStatuteData.mjs),
// same approach as criminalCodeTopics.js. Kept separate because section numbers
// collide across Acts, so the Criminal Code's SECTION_OVERRIDES must not apply.
// tests/unit/statuteTopics.test.js fails on any unmapped section.
// Free of any import from the data files. UI only; retrieval does not read this.

import { partIdOf } from "./criminalCodeTopics.js";

const CDSA_TOPICS = [
  { id: "offences", group: "substance", label: "Offences: Possession, Trafficking & Production", blurb: "Possession, trafficking, importing and exporting, production, and possession for the purpose of trafficking." },
  { id: "sentencing", group: "substance", label: "Sentencing & Diversion", blurb: "Sentencing principles, aggravating factors, and the evidence-based diversion measures (warnings and referrals)." },
  { id: "enforcement", group: "process", label: "Search, Seizure & Enforcement", blurb: "Peace officer powers to search, seize and arrest, and the rules for warrants." },
  { id: "disposition", group: "process", label: "Forfeiture & Disposal of Property", blurb: "Restraint, management and forfeiture of offence-related property, and disposal of seized substances." },
  { id: "administration", group: "process", label: "Administration & Compliance", blurb: "Inspectors, administrative orders for contraventions of regulations, and compliance." },
  { id: "provisions", group: "general", label: "General Provisions, Regulations & Evidence", blurb: "Analysis, ministerial orders, evidence and procedure, regulations, exemptions and transitional provisions." },
  { id: "general", group: "general", label: "Short Title & Interpretation", blurb: "Short title and definitions." },
];

const YCJA_TOPICS = [
  { id: "principles", group: "foundations", label: "Principles & Interpretation", blurb: "Short title, definitions, and the Declaration of Principle." },
  { id: "extrajudicial", group: "foundations", label: "Extrajudicial Measures", blurb: "Warnings, cautions, referrals and extrajudicial sanctions as alternatives to court." },
  { id: "system", group: "foundations", label: "Youth Justice System Organization", blurb: "Youth justice court, committees, conferences, provincial directors." },
  { id: "proceedings", group: "process", label: "Charges & Court Proceedings", blurb: "Consent to prosecute, right to counsel, notices to parents, adjudication and appeals." },
  { id: "detention", group: "process", label: "Detention & Release Before Trial", blurb: "Detention, release, and appearance before a youth justice court." },
  { id: "sentencing", group: "sentencing", label: "Youth Sentencing", blurb: "Purpose and principles, pre-sentence reports, youth sentences and their effect." },
  { id: "adult-sentence", group: "sentencing", label: "Adult Sentences", blurb: "Adult sentence applications, election and the effect of an adult sentence." },
  { id: "custody", group: "sentencing", label: "Custody & Supervision", blurb: "Custody and community supervision, reviews and reintegration." },
  { id: "records", group: "records", label: "Publication, Records & Privacy", blurb: "Publication bans, fingerprints, record-keeping, access to and destruction of records." },
  { id: "general", group: "general", label: "General & Transitional Provisions", blurb: "Judges, transfer of charges, application of the Criminal Code, evidence, regulations, agreements and transitional provisions." },
];

const NO_PART_TOPIC = { cdsa: "general", ycja: "principles" };

const CDSA_PART_DEFAULTS = {
  I: "offences",
  "I.1": "sentencing",
  II: "enforcement",
  III: "disposition",
  IV: "administration",
  V: "administration",
  VI: "provisions",
  VII: "provisions",
};
const CDSA_HEADING_RULES = { "I|Sentencing": "sentencing" };

const YCJA_PART_DEFAULTS = {
  1: "extrajudicial",
  2: "system",
  3: "proceedings",
  4: "sentencing",
  5: "custody",
  6: "records",
  7: "general",
  8: "general",
};
const YCJA_HEADING_RULES = {
  "3|Detention and Release": "detention",
  "3|Appearance": "detention",
  "3|Application for Release from or Detention in Custody": "detention",
  "4|Adult Sentence and Election": "adult-sentence",
};

const CONFIGS = {
  cdsa: {
    topics: CDSA_TOPICS,
    groups: [
      { id: "substance", label: "Offences & Penalties" },
      { id: "process", label: "Enforcement & Procedure" },
      { id: "general", label: "General" },
    ],
    partDefaults: CDSA_PART_DEFAULTS,
    headingRules: CDSA_HEADING_RULES,
  },
  ycja: {
    topics: YCJA_TOPICS,
    groups: [
      { id: "foundations", label: "Foundations" },
      { id: "process", label: "Process" },
      { id: "sentencing", label: "Sentencing & Custody" },
      { id: "records", label: "Records" },
      { id: "general", label: "General" },
    ],
    partDefaults: YCJA_PART_DEFAULTS,
    headingRules: YCJA_HEADING_RULES,
  },
};

export const STATUTE_TOPIC_CONFIGS = CONFIGS;

/** Topic id for a CDSA/YCJA section, or null if its Part isn't mapped. */
export function statuteTopicFor(statuteId, entry) {
  const cfg = CONFIGS[statuteId];
  const partId = partIdOf(entry.partOf);
  if (!partId) return NO_PART_TOPIC[statuteId];
  return (
    cfg.headingRules[`${partId}|${entry.heading || ""}`] ||
    cfg.partDefaults[partId] ||
    null
  );
}

/** Heading group label inside a topic: "Heading — Subheading", heading, or the Part title. */
export function statuteGroupLabel(entry) {
  const heading = entry.heading || "";
  if (heading && entry.subheading) return `${heading} — ${entry.subheading}`;
  if (heading) return heading;
  return (entry.partOf || "").replace(/^Part\s+[IVXL.\d]+\s+—\s+/, "");
}
