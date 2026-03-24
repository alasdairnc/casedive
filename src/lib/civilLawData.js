// src/lib/civilLawData.js
// Federal and Provincial statutes relevant to Canadian criminal law scenarios.
// Sources: justice.gc.ca, laws-lois.justice.gc.ca, ontario.ca/laws, bclaws.gov.bc.ca
// Used by api/verify.js to validate AI-suggested civil_law citations.

// ── Base URLs ─────────────────────────────────────────────────────────────────
const CDSA_BASE    = "https://laws-lois.justice.gc.ca/eng/acts/c-38.8";
const YCJA_BASE    = "https://laws-lois.justice.gc.ca/eng/acts/y-1.5";
const CHRA_BASE    = "https://laws-lois.justice.gc.ca/eng/acts/h-6";
const CC_BASE      = "https://laws-lois.justice.gc.ca/eng/acts/c-46";
const CCRA_BASE    = "https://laws-lois.justice.gc.ca/eng/acts/c-44.6";
const EVIDENCE_BASE = "https://laws-lois.justice.gc.ca/eng/acts/c-5";
const ON_HTA_BASE   = "https://www.ontario.ca/laws/statute/90h08";
const BC_MVA_BASE   = "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96318_00";

// ── Federal: CDSA ─────────────────────────────────────────────────────────────
const CDSA_SECTIONS = new Map([
  ["2", {
    jurisdiction: "Federal",
    statute: "Controlled Drugs and Substances Act",
    shortName: "CDSA",
    title: "Definitions",
    summary: "Definitions for the purposes of this Act, including 'substance', 'traffic', 'produce', and the Schedule classifications.",
    relevance: "drug charges, substance classification, Schedule I-V, trafficking definition",
    url: `${CDSA_BASE}/section-2.html`,
  }],
  ["4", {
    jurisdiction: "Federal",
    statute: "Controlled Drugs and Substances Act",
    shortName: "CDSA",
    title: "Possession of substance",
    summary: "Except as authorized under the regulations, no person shall possess a substance included in Schedule I, II or III.",
    relevance: "drug possession, constructive possession, knowledge, Schedule I-III substances, cannabis, cocaine, heroin, fentanyl",
    url: `${CDSA_BASE}/section-4.html`,
  }],
  ["5", {
    jurisdiction: "Federal",
    statute: "Controlled Drugs and Substances Act",
    shortName: "CDSA",
    title: "Trafficking in substance",
    summary: "No person shall traffic in a substance included in Schedule I, II, III, IV or V or in any substance represented or held out by that person to be such a substance.",
    relevance: "drug trafficking, selling drugs, distributing controlled substances, Schedule I penalties",
    url: `${CDSA_BASE}/section-5.html`,
  }],
  ["6", {
    jurisdiction: "Federal",
    statute: "Controlled Drugs and Substances Act",
    shortName: "CDSA",
    title: "Importing and exporting",
    summary: "Except as authorized under the regulations, no person shall import into Canada or export from Canada a substance included in Schedule I, II, III, IV, V or VI.",
    relevance: "drug importation, drug exportation, border smuggling, Schedule I-VI",
    url: `${CDSA_BASE}/section-6.html`,
  }],
  ["7", {
    jurisdiction: "Federal",
    statute: "Controlled Drugs and Substances Act",
    shortName: "CDSA",
    title: "Production of substance",
    summary: "Except as authorized under the regulations, no person shall produce a substance included in Schedule I, II, III, IV or V.",
    relevance: "drug production, grow op, manufacturing narcotics, lab, methamphetamine production",
    url: `${CDSA_BASE}/section-7.html`,
  }],
  ["10", {
    jurisdiction: "Federal",
    statute: "Controlled Drugs and Substances Act",
    shortName: "CDSA",
    title: "Purpose of sentencing",
    summary: "Without restricting the generality of the Criminal Code, the fundamental purpose of any sentence for an offence under this Part is to contribute to the respect for the law and the maintenance of a just, peaceful and safe society while encouraging rehabilitation, and treatment in appropriate circumstances, of offenders and acknowledging the harm done to victims and to the community.",
    relevance: "CDSA sentencing principles, aggravating factors, rehabilitation, drug treatment court",
    url: `${CDSA_BASE}/section-10.html`,
  }],
]);

// ── Federal: YCJA ─────────────────────────────────────────────────────────────
const YCJA_SECTIONS = new Map([
  ["2", {
    jurisdiction: "Federal",
    statute: "Youth Criminal Justice Act",
    shortName: "YCJA",
    title: "Definitions — young person",
    summary: "Definitions including 'young person' (a person aged 12 or over and under 18 years at the time of the alleged offence), 'youth justice court', 'adult sentence', and 'youth sentence'.",
    relevance: "youth criminal liability, age of criminal responsibility, 12-17 years old, young person definition",
    url: `${YCJA_BASE}/section-2.html`,
  }],
  ["3", {
    jurisdiction: "Federal",
    statute: "Youth Criminal Justice Act",
    shortName: "YCJA",
    title: "Declaration of principle",
    summary: "The principles of the youth criminal justice system, including protecting the public, holding young persons accountable proportionately, and promoting rehabilitation and reintegration.",
    relevance: "youth sentencing principles, rehabilitation, accountability, proportionality, Indigenous youth",
    url: `${YCJA_BASE}/section-3.html`,
  }],
  ["38", {
    jurisdiction: "Federal",
    statute: "Youth Criminal Justice Act",
    shortName: "YCJA",
    title: "Purpose of sentencing",
    summary: "The purpose of the youth sentencing provisions is to hold a young person accountable for an offence through the imposition of just sanctions that have meaningful consequences.",
    relevance: "youth sentence purpose, rehabilitation, reintegration, just sanctions, meaningful consequences",
    url: `${YCJA_BASE}/section-38.html`,
  }],
  ["39", {
    jurisdiction: "Federal",
    statute: "Youth Criminal Justice Act",
    shortName: "YCJA",
    title: "Committal to custody",
    summary: "A youth justice court shall not commit a young person to custody unless specific criteria are met, such as committing a violent offence or failing to comply with non-custodial sentences.",
    relevance: "youth custody, youth incarceration, last resort principle, youth violent offence",
    url: `${YCJA_BASE}/section-39.html`,
  }],
  ["40", {
    jurisdiction: "Federal",
    statute: "Youth Criminal Justice Act",
    shortName: "YCJA",
    title: "Pre-sentence report",
    summary: "A youth justice court shall, before imposing a youth sentence, consider a pre-sentence report.",
    relevance: "youth pre-sentence report, youth worker, mitigating factors, youth background",
    url: `${YCJA_BASE}/section-40.html`,
  }],
  ["110", {
    jurisdiction: "Federal",
    statute: "Youth Criminal Justice Act",
    shortName: "YCJA",
    title: "Identity of offender not to be published",
    summary: "Subject to this section, no person shall publish the name of a young person, or any other information related to a young person.",
    relevance: "youth publication ban, identity protection, media reporting, young offender privacy",
    url: `${YCJA_BASE}/section-110.html`,
  }],
]);

// ── Federal: Canadian Human Rights Act ────────────────────────────────────────
const CHRA_SECTIONS = new Map([
  ["2", {
    jurisdiction: "Federal",
    statute: "Canadian Human Rights Act",
    shortName: "CHRA",
    title: "Purpose",
    summary: "The purpose of this Act is to extend the laws in Canada to give effect to the principle that all individuals should have an opportunity equal with other individuals to make for themselves the lives that they are able and wish to have.",
    relevance: "human rights purpose, equal opportunity, accommodation, federal jurisdiction",
    url: `${CHRA_BASE}/section-2.html`,
  }],
  ["3", {
    jurisdiction: "Federal",
    statute: "Canadian Human Rights Act",
    shortName: "CHRA",
    title: "Prohibited grounds of discrimination",
    summary: "The prohibited grounds of discrimination are race, national or ethnic origin, colour, religion, age, sex, sexual orientation, gender identity or expression, marital status, family status, genetic characteristics, disability and conviction for an offence.",
    relevance: "discrimination grounds, race, sex, religion, disability, sexual orientation, gender identity, hate crimes",
    url: `${CHRA_BASE}/section-3.html`,
  }],
]);

// ── Federal: Criminal Code — Sentencing Principles (Part XXIII) ───────────────
const CC_SENTENCING = new Map([
  ["718", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Purpose of sentencing",
    summary: "The fundamental purpose of sentencing is to protect society and to contribute to respect for the law and the maintenance of a just, peaceful and safe society.",
    relevance: "sentencing purpose, denunciation, deterrence, rehabilitation, reparation, sentencing principles",
    url: `${CC_BASE}/section-718.html`,
  }],
  ["718.1", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Fundamental principle of sentencing",
    summary: "A sentence must be proportionate to the gravity of the offence and the degree of responsibility of the offender.",
    relevance: "proportionality in sentencing, gravity of offence, moral blameworthiness",
    url: `${CC_BASE}/section-718.1.html`,
  }],
  ["718.2", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Other sentencing principles",
    summary: "A court that imposes a sentence shall also take into consideration aggravating or mitigating circumstances, and pay particular attention to the circumstances of Aboriginal offenders.",
    relevance: "aggravating factors, mitigating factors, hate crime sentencing, Gladue principles, Aboriginal offenders",
    url: `${CC_BASE}/section-718.2.html`,
  }],
  ["719", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Commencement of sentence",
    summary: "A sentence commences when it is imposed, except where a relevant enactment otherwise provides.",
    relevance: "sentence start date, pre-sentence custody credit, remand credit, 1.5x credit",
    url: `${CC_BASE}/section-719.html`,
  }],
  ["720", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Sentencing proceedings",
    summary: "A court shall, as soon as practicable after an offender has been found guilty, conduct proceedings to determine the appropriate sentence.",
    relevance: "sentencing hearing, timing of sentencing proceedings",
    url: `${CC_BASE}/section-720.html`,
  }],
  ["722", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Victim impact statement",
    summary: "When determining the sentence, the court shall consider any statement of a victim describing the physical or emotional harm.",
    relevance: "victim impact statement, victim's rights, harm, loss, sentencing",
    url: `${CC_BASE}/section-722.html`,
  }],
  ["724", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Information accepted",
    summary: "In determining a sentence, a court may accept as proved any information disclosed at the trial or at the sentencing proceedings and any facts agreed on.",
    relevance: "sentencing evidence, admissibility at sentencing, agreed statement of facts",
    url: `${CC_BASE}/section-724.html`,
  }],
  ["726", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Submissions regarding sentence",
    summary: "Before determining the sentence to be imposed, the court shall ask whether the offender, if present, has anything to say.",
    relevance: "allocution, right to speak at sentencing, offender submissions",
    url: `${CC_BASE}/section-726.html`,
  }],
  ["730", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Absolute and conditional discharges",
    summary: "Where an accused pleads guilty to or is found guilty of an offence, the court may direct that the accused be discharged absolutely or conditionally.",
    relevance: "discharge, conditional discharge, absolute discharge, no conviction, first offence",
    url: `${CC_BASE}/section-730.html`,
  }],
  ["731", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Probation",
    summary: "Where a person is convicted of an offence, a court may suspend the passing of sentence and direct that the offender be released on the conditions prescribed in a probation order.",
    relevance: "probation order, suspended sentence, community supervision, conditions",
    url: `${CC_BASE}/section-731.html`,
  }],
  ["732.1", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Probation order — conditions",
    summary: "The court shall prescribe, as conditions of a probation order, that the offender keep the peace, appear before the court when required, and notify of any changes of address.",
    relevance: "probation conditions, no-contact order, reporting to probation, good behaviour",
    url: `${CC_BASE}/section-732.1.html`,
  }],
  ["742.1", {
    jurisdiction: "Federal",
    statute: "Criminal Code",
    shortName: "CC",
    title: "Conditional sentence of imprisonment",
    summary: "If a person is convicted of an offence and the court imposes a sentence of imprisonment of less than two years, the court may order that the offender serve the sentence in the community.",
    relevance: "conditional sentence, house arrest, sentence served in community, two year less a day",
    url: `${CC_BASE}/section-742.1.html`,
  }],
]);

// ── Federal: Canada Evidence Act ──────────────────────────────────────────────
const EVIDENCE_SECTIONS = new Map([
  ["16", {
    jurisdiction: "Federal",
    statute: "Canada Evidence Act",
    shortName: "CEA",
    title: "Witness whose capacity is in question",
    summary: "If a proposed witness is a person of fourteen years of age or older whose mental capacity is challenged, the court shall conduct an inquiry.",
    relevance: "competency of witness, mental disability, understanding oath, ability to communicate",
    url: `${EVIDENCE_BASE}/section-16.html`,
  }],
  ["16.1", {
    jurisdiction: "Federal",
    statute: "Canada Evidence Act",
    shortName: "CEA",
    title: "Person under fourteen years of age",
    summary: "A person under fourteen years of age is presumed to have the capacity to testify.",
    relevance: "child witness, testimony of minors, promise to tell the truth, child evidence",
    url: `${EVIDENCE_BASE}/section-16.1.html`,
  }],
]);

// ── Federal: Corrections and Conditional Release Act ──────────────────────────
const CCRA_SECTIONS = new Map([
  ["100", {
    jurisdiction: "Federal",
    statute: "Corrections and Conditional Release Act",
    shortName: "CCRA",
    title: "Purpose of conditional release",
    summary: "The purpose of conditional release is to contribute to the maintenance of a just, peaceful and safe society.",
    relevance: "parole, statutory release, conditional release purpose, rehabilitation, reintegration",
    url: `${CCRA_BASE}/section-100.html`,
  }],
  ["101", {
    jurisdiction: "Federal",
    statute: "Corrections and Conditional Release Act",
    shortName: "CCRA",
    title: "Principles guiding the Board",
    summary: "The principles that shall guide the Board and the provincial parole boards in achieving the purpose of conditional release.",
    relevance: "parole board principles, public protection, parole decision, risk assessment",
    url: `${CCRA_BASE}/section-101.html`,
  }],
]);

// ── Ontario: Highway Traffic Act (HTA) ────────────────────────────────────────
const ON_HTA_SECTIONS = new Map([
  ["53", {
    jurisdiction: "Ontario",
    statute: "Highway Traffic Act (Ontario)",
    shortName: "HTA (ON)",
    title: "Driving while privilege suspended",
    summary: "Every person who drives a motor vehicle or street car on a highway while his or her driver’s licence is suspended is guilty of an offence.",
    relevance: "driving while suspended, DUS, provincial driving prohibition, suspended licence",
    url: `${ON_HTA_BASE}#BK107`,
  }],
  ["130", {
    jurisdiction: "Ontario",
    statute: "Highway Traffic Act (Ontario)",
    shortName: "HTA (ON)",
    title: "Careless driving",
    summary: "Every person is guilty of the offence of driving carelessly who drives a vehicle or street car on a highway without due care and attention or without reasonable consideration for other persons using the highway.",
    relevance: "careless driving, provincial driving offence, distracted driving, at-fault accident",
    url: `${ON_HTA_BASE}#BK220`,
  }],
  ["172", {
    jurisdiction: "Ontario",
    statute: "Highway Traffic Act (Ontario)",
    shortName: "HTA (ON)",
    title: "Racing, stunts, etc., prohibited",
    summary: "No person shall drive a motor vehicle on a highway in a race or contest, while performing a stunt or on a bet or wager.",
    relevance: "stunt driving, racing, excessive speeding, 50 over, impoundment, provincial street racing",
    url: `${ON_HTA_BASE}#BK275`,
  }],
]);

// ── BC: Motor Vehicle Act (MVA) ───────────────────────────────────────────────
const BC_MVA_SECTIONS = new Map([
  ["144", {
    jurisdiction: "British Columbia",
    statute: "Motor Vehicle Act (BC)",
    shortName: "MVA (BC)",
    title: "Careless driving prohibited",
    summary: "A person must not drive a motor vehicle on a highway without due care and attention, without reasonable consideration for other persons using the highway, or at a speed that is excessive relative to the road, traffic, visibility or weather conditions.",
    relevance: "careless driving, BC MVA, driving without due care",
    url: `${BC_MVA_BASE}#section144`,
  }],
  ["214.2", {
    jurisdiction: "British Columbia",
    statute: "Motor Vehicle Act (BC)",
    shortName: "MVA (BC)",
    title: "Use of electronic devices while driving",
    summary: "A person must not use an electronic device while driving or operating a motor vehicle on a highway.",
    relevance: "distracted driving, texting and driving, cell phone driving, electronic device BC",
    url: `${BC_MVA_BASE}#section214.2`,
  }],
]);

// ── Master index ──────────────────────────────────────────────────────────────
// All sections combined with statute prefix for lookup.
export const CIVIL_LAW_INDEX = new Map([
  ...Array.from(CDSA_SECTIONS.entries()).map(([k, v]) => [`CDSA s. ${k}`, v]),
  ...Array.from(YCJA_SECTIONS.entries()).map(([k, v]) => [`YCJA s. ${k}`, v]),
  ...Array.from(CHRA_SECTIONS.entries()).map(([k, v]) => [`CHRA s. ${k}`, v]),
  ...Array.from(CC_SENTENCING.entries()).map(([k, v]) => [`CC s. ${k}`, v]),
  ...Array.from(EVIDENCE_SECTIONS.entries()).map(([k, v]) => [`CEA s. ${k}`, v]),
  ...Array.from(CCRA_SECTIONS.entries()).map(([k, v]) => [`CCRA s. ${k}`, v]),
  ...Array.from(ON_HTA_SECTIONS.entries()).map(([k, v]) => [`HTA (ON) s. ${k}`, v]),
  ...Array.from(BC_MVA_SECTIONS.entries()).map(([k, v]) => [`MVA (BC) s. ${k}`, v]),
]);

export { CDSA_SECTIONS, YCJA_SECTIONS, CHRA_SECTIONS, CC_SENTENCING, EVIDENCE_SECTIONS, CCRA_SECTIONS, ON_HTA_SECTIONS, BC_MVA_SECTIONS };

// ── Lookup helpers ────────────────────────────────────────────────────────────

const STATUTE_ALIASES = [
  { pattern: /controlled drugs and substances act/i, prefix: "CDSA", map: CDSA_SECTIONS },
  { pattern: /\bCDSA\b/i,                            prefix: "CDSA", map: CDSA_SECTIONS },
  { pattern: /youth criminal justice act/i,           prefix: "YCJA", map: YCJA_SECTIONS },
  { pattern: /\bYCJA\b/i,                            prefix: "YCJA", map: YCJA_SECTIONS },
  { pattern: /canadian human rights act/i,            prefix: "CHRA", map: CHRA_SECTIONS },
  { pattern: /\bCHRA\b/i,                            prefix: "CHRA", map: CHRA_SECTIONS },
  { pattern: /canada evidence act/i,                  prefix: "CEA",  map: EVIDENCE_SECTIONS },
  { pattern: /\bCEA\b/i,                             prefix: "CEA",  map: EVIDENCE_SECTIONS },
  { pattern: /corrections and conditional release act/i, prefix: "CCRA", map: CCRA_SECTIONS },
  { pattern: /\bCCRA\b/i,                            prefix: "CCRA", map: CCRA_SECTIONS },
  { pattern: /highway traffic act/i,                  prefix: "HTA (ON)", map: ON_HTA_SECTIONS },
  { pattern: /\bHTA\b/i,                             prefix: "HTA (ON)", map: ON_HTA_SECTIONS },
  { pattern: /motor vehicle act/i,                    prefix: "MVA (BC)", map: BC_MVA_SECTIONS },
  { pattern: /\bMVA\b/i,                             prefix: "MVA (BC)", map: BC_MVA_SECTIONS },
  { pattern: /criminal code/i,                        prefix: "CC",   map: CC_SENTENCING },
];

function extractSectionNumber(citation) {
  const m = citation.match(/s\.\s*([\d.]+(?:\(\w+\))?)/i)
    || citation.match(/section\s+([\d.]+)/i)
    || citation.match(/,\s*([\d.]+(?:\(\w+\))?)\s*$/);
  return m ? m[1].trim() : null;
}

export function lookupCivilLawSection(citation) {
  if (!citation || typeof citation !== "string") return null;
  const trimmed = citation.trim();

  for (const { pattern, prefix, map } of STATUTE_ALIASES) {
    if (pattern.test(trimmed)) {
      const sectionNum = extractSectionNumber(trimmed);
      if (!sectionNum) continue;
      const entry = map.get(sectionNum);
      if (entry) return { entry, prefix };
    }
  }
  return null;
}
