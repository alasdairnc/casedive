// src/lib/criminalCodeTopics.js
// Plain-language topics for browsing the Criminal Code. Assignment works from
// the Code's own structure (each section's `partOf` + `heading`/`subheading`,
// extracted by scripts/buildCriminalCodeData.mjs), not section-number ranges,
// so a section added under a known heading lands in the right topic by itself.
//
// Resolution order: SECTION_OVERRIDES -> HEADING_RULES -> SUBHEADING_RULES
// -> PART_DEFAULTS. topicForSection() returns null when nothing matches;
// tests/unit/criminalCodeTopics.test.js fails on any null, so a new Part or
// heading has to be mapped on purpose instead of silently falling into "Other".
//
// Kept free of any import from criminalCodeData.js so components can use it
// without pulling in the full dataset. UI only — retrieval does not read this.

export const TOPIC_GROUPS = [
  { id: "offences", label: "Offences" },
  { id: "procedure", label: "Procedure" },
  { id: "general", label: "General" },
];

export const TOPICS = [
  { id: "homicide", group: "offences", label: "Homicide, Suicide & Criminal Negligence", blurb: "Duties to preserve life, criminal negligence, murder, manslaughter, medical assistance in dying." },
  { id: "assault", group: "offences", label: "Assault & Violent Offences", blurb: "Assault, threats, criminal harassment, and acts causing bodily harm or danger to the person." },
  { id: "sexual", group: "offences", label: "Sexual Offences", blurb: "Sexual assault, child exploitation, obscenity, intimate images, sexual services, and the evidence rules for sexual offence trials." },
  { id: "kidnapping", group: "offences", label: "Kidnapping & Human Trafficking", blurb: "Kidnapping, trafficking in persons, hostage taking, abduction, trafficking in human organs." },
  { id: "weapons", group: "offences", label: "Weapons & Firearms", blurb: "Use, possession and trafficking offences, prohibition orders, licensing and seizure." },
  { id: "driving", group: "offences", label: "Impaired & Dangerous Driving", blurb: "Impaired driving, dangerous operation, flight from police, and the testing and evidence rules." },
  { id: "theft", group: "offences", label: "Theft, Robbery & Break and Enter", blurb: "Theft, robbery, extortion, break and enter, and possession of stolen property." },
  { id: "fraud", group: "offences", label: "Fraud, Forgery & Proceeds of Crime", blurb: "Fraud, forgery, false pretences, identity theft, counterfeit currency, and laundering proceeds of crime." },
  { id: "mischief", group: "offences", label: "Mischief, Arson & Animal Cruelty", blurb: "Mischief, arson and other fires, interference with property, and cruelty to animals." },
  { id: "public-order", group: "offences", label: "Public Order, Terrorism & Security", blurb: "Treason, sedition, riots, piracy, terrorism, disorderly conduct, nuisances, gaming and betting." },
  { id: "justice", group: "offences", label: "Offences Against Justice", blurb: "Corruption, obstruction, perjury, contempt, misleading justice, escapes and rescues." },
  { id: "privacy-speech", group: "offences", label: "Privacy, Hate & Defamation", blurb: "Interception of communications, defamatory libel, hate propaganda, hate crime, conversion therapy." },
  { id: "marriage", group: "offences", label: "Marriage Offences", blurb: "Offences against conjugal rights (bigamy, polygamy) and unlawful solemnization of marriage." },
  { id: "parties", group: "offences", label: "Parties, Attempts & Conspiracy", blurb: "Parties to an offence, attempts, conspiracy, accessories, and criminal organizations." },
  { id: "defences", group: "offences", label: "Defences & Justification", blurb: "Self-defence, defence of property, use of force by police, persons in authority, extreme intoxication." },
  { id: "general", group: "general", label: "General Provisions & Definitions", blurb: "Short title, definitions, capacity and other rules that apply across the Code." },
  { id: "arrest-bail", group: "procedure", label: "Arrest, Bail & Release", blurb: "Arrest with and without warrant, appearance, summons, judicial interim release, detention review." },
  { id: "investigation", group: "procedure", label: "Investigative Powers, Warrants & Forfeiture", blurb: "Search warrants, production orders, DNA warrants, and forfeiture of offence-related property." },
  { id: "trial", group: "procedure", label: "Trial Procedure & Evidence", blurb: "Jurisdiction, preliminary inquiries, election, indictments, juries, evidence, and securing attendance." },
  { id: "mental-disorder", group: "procedure", label: "Mental Disorder", blurb: "Fitness to stand trial, not criminally responsible, assessments, review boards and dispositions." },
  { id: "summary", group: "procedure", label: "Summary Conviction Procedure", blurb: "Procedure, trial, sureties to keep the peace, and appeals for summary conviction offences." },
  { id: "sentencing", group: "procedure", label: "Sentencing & Post-Conviction Orders", blurb: "Sentencing principles, discharges, probation, fines, imprisonment, dangerous offenders, sex offender registration." },
  { id: "appeals", group: "procedure", label: "Appeals & Review", blurb: "Appeals, ministerial review of wrongful convictions, and extraordinary remedies." },
];

const TOPIC_IDS = new Set(TOPICS.map((t) => t.id));

// Section-level exceptions where the Code's heading spans more than one topic.
// `label` replaces the heading shown in the browse view.
export const SECTION_OVERRIDES = {
  ...Object.fromEntries(
    ["271", "272", "273", "273.1", "273.2", "274", "275"].map((n) => [
      n,
      { topic: "sexual", label: "Sexual assault" },
    ]),
  ),
  "172.2": { topic: "sexual", label: "Offences Tending to Corrupt Morals" },
};

// `${partId}|${heading}` -> topic, where a Part's headings split across topics.
export const HEADING_RULES = {
  "I|Parties to Offences": "parties",
  "I|Protection of Persons Administering and Enforcing the Law": "defences",
  "I|Suppression of Riots": "public-order",
  "I|Self-induced Extreme Intoxication": "defences",
  "I|Defence of Person": "defences",
  "I|Defence of Property": "defences",
  "I|Protection of Persons in Authority": "defences",

  "V|Disorderly Conduct": "public-order",
  "V|Nuisances": "public-order",

  "VII|Offences in Relation to Offering, Providing or Obtaining Sexual Services for Consideration": "sexual",

  "VIII|Trafficking in Human Organs": "kidnapping",
  "VIII|Bodily Harm and Acts and Omissions Causing Danger to the Person": "assault",
  "VIII|Assaults": "assault",
  "VIII|Kidnapping, Trafficking in Persons, Hostage Taking and Abduction": "kidnapping",
  "VIII|Commodification of Sexual Activity": "sexual",
  "VIII|Offences Against Conjugal Rights": "marriage",
  "VIII|Unlawful Solemnization of Marriage": "marriage",
  "VIII|Defamatory Libel": "privacy-speech",
  "VIII|Verdicts": "privacy-speech",
  "VIII|Hate Propaganda": "privacy-speech",
  "VIII|Hate Crime": "privacy-speech",
  "VIII|Conversion Therapy": "privacy-speech",

  "IX|Criminal Interest Rate": "fraud",
  "IX|False Pretences": "fraud",
  "IX|Forgery and Offences Resembling Forgery": "fraud",

  "XV|Sex Offender Information": "sentencing",
};

// `${partId}|${heading}|${subheading}` for the level-3 blocks nested under a
// heading that belongs elsewhere (the sexual-activity and records regimes sit
// under "Assaults" in the statute).
export const SUBHEADING_RULES = {
  "VIII|Assaults|Admissibility of Sexual Activity Evidence": "sexual",
  "VIII|Assaults|Reputation Evidence": "sexual",
  "VIII|Assaults|Spouse May Be Charged": "sexual",
  "VIII|Assaults|Production and Admissibility of Records and Therapeutic Records": "sexual",
  "VIII|Assaults|Reasons — Certain Proceedings": "sexual",
};

export const PART_DEFAULTS = {
  I: "general",
  II: "public-order",
  "II.1": "public-order",
  III: "weapons",
  IV: "justice",
  V: "sexual",
  VI: "privacy-speech",
  VII: "public-order",
  VIII: "homicide",
  "VIII.1": "driving",
  IX: "theft",
  X: "fraud",
  XI: "mischief",
  XII: "fraud",
  "XII.2": "fraud",
  XIII: "parties",
  XIV: "trial",
  XV: "investigation",
  "XV.1": "trial",
  XVI: "arrest-bail",
  XVII: "trial",
  XVIII: "trial",
  "XVIII.1": "trial",
  XIX: "trial",
  "XIX.1": "trial",
  XX: "trial",
  "XX.1": "mental-disorder",
  XXI: "appeals",
  "XXI.1": "appeals",
  "XXI.2": "appeals",
  XXII: "trial",
  "XXII.01": "trial",
  "XXII.1": "trial",
  "XXII.2": "sentencing",
  XXIII: "sentencing",
  XXIV: "sentencing",
  XXV: "sentencing",
  XXVI: "appeals",
  XXVII: "summary",
  XXVIII: "trial",
};

/** "Part VIII.1 — Offences Relating to Conveyances" -> "VIII.1"; "" -> "". */
export function partIdOf(partOf) {
  const m = /^Part\s+([IVXL.\d]+)\b/.exec(partOf || "");
  return m ? m[1] : "";
}

/** Topic id for a section, or null if the Code structure isn't mapped. */
export function topicForSection(num, entry) {
  const override = SECTION_OVERRIDES[num];
  if (override) return override.topic;

  const partId = partIdOf(entry.partOf);
  // s. 1 (Short Title) has no Part; the general topic owns it.
  if (!partId) return num === "1" ? "general" : null;

  const heading = entry.heading || "";
  const bySub = entry.subheading
    ? SUBHEADING_RULES[`${partId}|${heading}|${entry.subheading}`]
    : undefined;
  return bySub || HEADING_RULES[`${partId}|${heading}`] || PART_DEFAULTS[partId] || null;
}

/**
 * Label for the Code-heading group a section sits under in the browse view:
 * "Heading — Subheading" when nested, the bare heading otherwise, and the
 * Part's own title for the Parts that have no sub-headings (e.g. Part XIII).
 */
export function groupLabelFor(num, entry) {
  const override = SECTION_OVERRIDES[num];
  if (override) return override.label;
  const heading = entry.heading || "";
  if (heading && entry.subheading) {
    // Under "Assaults" the level-3 blocks are the useful label on their own.
    return heading === "Assaults" ? entry.subheading : `${heading} — ${entry.subheading}`;
  }
  if (heading) return heading;
  return (entry.partOf || "").replace(/^Part\s+[IVXL.\d]+\s+—\s+/, "");
}

export function isKnownTopic(id) {
  return TOPIC_IDS.has(id);
}

/**
 * Browse structure for the explorer: topics in TOPICS order, each holding its
 * Code headings in document order. `sections` must already carry `topic` and
 * `groupLabel` (the search hook adds both) and be sorted by section number.
 * Takes the full list, never the capped search results.
 */
export function buildTopicBrowse(sections) {
  const byTopic = new Map(TOPICS.map((t) => [t.id, { topic: t, count: 0, groups: new Map() }]));
  for (const section of sections) {
    const bucket = byTopic.get(section.topic);
    if (!bucket) continue;
    bucket.count++;
    const label = section.groupLabel || "";
    if (!bucket.groups.has(label)) bucket.groups.set(label, []);
    bucket.groups.get(label).push(section);
  }
  return TOPICS.map((t) => {
    const b = byTopic.get(t.id);
    return {
      topic: t,
      count: b.count,
      groups: [...b.groups].map(([label, items]) => ({ label, sections: items })),
    };
  });
}
