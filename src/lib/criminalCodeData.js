// src/lib/criminalCodeData.js
// Complete Criminal Code (RSC 1985, c C-46) section lookup.
// Auto-generated from Justice Laws XML (laws-lois.justice.gc.ca/eng/XML/C-46.xml)
// Source current as of: 2026-07-21 (Justice Laws lims:current-date) | Sections: 1568
// Includes all numbered sections from the Criminal Code.
// 46 high-priority sections are enriched with hand-curated definitions,
// defences, and related sections. Other sections may carry a `summary` field:
// an independently-verified, plain-language summary generated from statute
// text only (see scripts/prepareEnrichmentBatch.mjs) — distinct from `definition`,
// which is only ever hand-curated.
//
// This file is used by api/verify.js to confirm AI-suggested Criminal Code
// sections are real and by CriminalCodeExplorer for browsing/searching.

const JUSTICE_LAWS_BASE = "https://laws-lois.justice.gc.ca/eng/acts/c-46";

export const CRIMINAL_CODE_SECTIONS = new Map([
  [
    "1",
    {
      title: "Short title",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-1.html`,
    },
  ],

  // ── Part I — General ──
  [
    "2",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-2.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "2.1",
    {
      title: "Further definitions — firearms",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-2.1.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "2.2",
    {
      title: "Acting on victim’s behalf",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-2.2.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "2.3",
    {
      title: "Concurrent jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-2.3.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "3",
    {
      title: "Descriptive cross-references",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-3.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "3.01",
    {
      title: "Violence in commission of offence, including against intimate partner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-3.01.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "3.1",
    {
      title: "Effect of judicial acts",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-3.1.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "4",
    {
      title: "Postcard a chattel, value",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-4.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "5",
    {
      title: "Canadian Forces not affected",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-5.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "6",
    {
      title: "Presumption of innocence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-6.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "7",
    {
      title: "Offences committed on aircraft",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-7.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "8",
    {
      title: "Application to territories",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-8.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "9",
    {
      title: "Criminal offences to be under law of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-9.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "10",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-10.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "11",
    {
      title: "Civil remedy not suspended",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-11.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "11.1",
    {
      title: "Non-disclosure agreement — no effect",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-11.1.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "12",
    {
      title: "Offence punishable under more than one Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-12.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "13",
    {
      title: "Child under twelve",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-13.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "14",
    {
      title: "Consent to death",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-14.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "15",
    {
      title: "Obedience to de facto law",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-15.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "16",
    {
      title: "Defence of mental disorder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-16.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "17",
    {
      title: "Compulsion by threats",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-17.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "18",
    {
      title: "Compulsion of spouse",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-18.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "19",
    {
      title: "Ignorance of the law",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-19.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "20",
    {
      title: "Certain acts on holidays valid",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-20.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "21",
    {
      title: "Parties to offence",
      severity: "",
      maxPenalty: "Same as principal offence",
      url: `${JUSTICE_LAWS_BASE}/section-21.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "22",
    {
      title: "Person counselling offence",
      severity: "",
      maxPenalty: "Same as principal offence",
      url: `${JUSTICE_LAWS_BASE}/section-22.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "22.1",
    {
      title: "Offences of negligence — organizations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-22.1.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "22.2",
    {
      title: "Other offences — organizations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-22.2.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "23",
    {
      title: "Accessory after the fact",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-23.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "23.1",
    {
      title: "Where one party cannot be convicted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-23.1.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "24",
    {
      title: "Attempts",
      severity: "",
      maxPenalty: "See s. 463",
      url: `${JUSTICE_LAWS_BASE}/section-24.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "25",
    {
      title: "Protection of persons acting under authority",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-25.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "25.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-25.1.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "25.2",
    {
      title: "Public officer to file report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-25.2.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "25.3",
    {
      title: "Annual report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-25.3.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "25.4",
    {
      title: "Written notification to be given",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-25.4.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "26",
    {
      title: "Excessive force",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-26.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "27",
    {
      title: "Use of force to prevent commission of offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-27.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "27.1",
    {
      title: "Use of force on board an aircraft",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-27.1.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "28",
    {
      title: "Arrest of wrong person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-28.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "29",
    {
      title: "Duty of person arresting",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-29.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "30",
    {
      title: "Preventing breach of peace",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-30.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "31",
    {
      title: "Arrest for breach of peace",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-31.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "32",
    {
      title: "Use of force to suppress riot",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-32.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "33",
    {
      title: "Duty of officers if rioters do not disperse",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-33.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "33.1",
    {
      title: "Offences of violence by negligence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-33.1.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "34",
    {
      title: "Defence — use or threat of force",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-34.html`,
      definition:
        "A person is not guilty of an offence if (a) they believe on reasonable grounds that force is being used against them or another person or that a threat of force is being made against them or another person; (b) the act that constitutes the offence is committed for the purpose of defending or protecting themselves or the other person from that use or threat of force; and (c) the act committed is reasonable in the circumstances.",
      relatedSections: ["35", "265"],
      defences: [],
      topicsTagged: ["self-defence", "force", "reasonable"],
      partOf: "Part I — General",
    },
  ],
  [
    "35",
    {
      title: "Defence — property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-35.html`,
      definition:
        "A person is not guilty of an offence if (a) they believe on reasonable grounds that they are in peaceable possession of property or are acting under the authority of, or lawfully assisting, a person whom they believe on reasonable grounds is in peaceable possession of property; (b) they believe on reasonable grounds that another person is about to enter, is entering or has entered the property without being entitled by law to do so, is about to take the property, is doing so or has just done so, or is about to damage or destroy the property, or is doing so; (c) the act that constitutes the offence is committed for the purpose of preventing the other person from entering the property, or removing that person from the property, or preventing the other person from taking, damaging or destroying the property or from making it inoperative, or retaking the property from that person; and (d) the act committed is reasonable in the circumstances.",
      relatedSections: ["34", "494"],
      defences: [],
      topicsTagged: ["property", "defence", "trespass"],
      partOf: "Part I — General",
    },
  ],
  [
    "43",
    {
      title: "Correction of child by force",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-43.html`,
      partOf: "Part I — General",
    },
  ],
  [
    "45",
    {
      title: "Surgical operations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-45.html`,
      partOf: "Part I — General",
    },
  ],

  // ── Part II — Offences Against Public Order ──
  [
    "46",
    {
      title: "High treason",
      severity: "Indictable",
      maxPenalty: "Life imprisonment (high treason)",
      url: `${JUSTICE_LAWS_BASE}/section-46.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "47",
    {
      title: "Punishment for high treason",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-47.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "48",
    {
      title: "Limitation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-48.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "50",
    {
      title: "Assisting alien enemy to leave Canada, or omitting to prevent treason",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-50.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "51",
    {
      title: "Intimidating Parliament or legislature",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-51.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "52",
    {
      title: "Sabotage",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-52.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "52.1",
    {
      title: "Sabotage — essential infrastructure",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-52.1.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "52.2",
    {
      title: "Sabotage — device",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-52.2.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "52.3",
    {
      title: "Attorney General’s consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-52.3.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "53",
    {
      title: "Inciting to mutiny",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-53.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "54",
    {
      title: "Assisting deserter",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-54.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "55",
    {
      title: "Evidence of overt acts",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-55.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "56",
    {
      title: "Offences in relation to members of R.C.M.P.",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-56.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "56.1",
    {
      title: "Identity documents",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-56.1.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "57",
    {
      title: "Forgery of or uttering forged passport",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-57.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "58",
    {
      title: "Fraudulent use of certificate of citizenship",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-58.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "59",
    {
      title: "Seditious words",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-59.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "60",
    {
      title: "Exception",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-60.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "61",
    {
      title: "Punishment of seditious offences",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-61.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "62",
    {
      title: "Offences in relation to military forces",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-62.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "63",
    {
      title: "Unlawful assembly",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-63.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "64",
    {
      title: "Riot",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-64.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "65",
    {
      title: "Punishment of rioter",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-65.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "66",
    {
      title: "Punishment for unlawful assembly",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-66.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "67",
    {
      title: "Reading proclamation",
      severity: "",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-67.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "68",
    {
      title: "Offences related to proclamation",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-68.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "69",
    {
      title: "Neglect by peace officer",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-69.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "70",
    {
      title: "Orders by Governor in Council",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-70.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "72",
    {
      title: "Forcible entry",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-72.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "73",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-73.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "74",
    {
      title: "Piracy by law of nations",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-74.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "75",
    {
      title: "Piratical acts",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-75.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "76",
    {
      title: "Hijacking",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-76.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "77",
    {
      title: "Endangering safety of aircraft or airport",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-77.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "78",
    {
      title: "Offensive weapons and explosive substances",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-78.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "78.1",
    {
      title: "Seizing control of ship or fixed platform",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-78.1.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "79",
    {
      title: "Duty of care re explosive",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-79.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "80",
    {
      title: "Breach of duty",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-80.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "81",
    {
      title: "Using explosives",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-81.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82",
    {
      title: "Possession of explosive",
      severity: "Hybrid",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-82.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.1",
    {
      title: "Sentences to be served consecutively",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-82.1.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.2",
    {
      title: "Definition of device",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-82.2.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.3",
    {
      title: "Possession, etc., of nuclear material, radioactive material or device",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-82.3.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.4",
    {
      title: "Use or alteration of nuclear material, radioactive material or device",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-82.4.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.5",
    {
      title: "Commission of indictable offence to obtain nuclear material, etc.",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-82.5.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.6",
    {
      title: "Threats",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-82.6.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "82.7",
    {
      title: "Armed forces",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-82.7.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],
  [
    "83",
    {
      title: "Engaging in prize fight",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.html`,
      partOf: "Part II — Offences Against Public Order",
    },
  ],

  // ── Part II.1 — Terrorism ──
  [
    "83.01",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.01.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.02",
    {
      title: "Providing or collecting property for certain activities",
      severity: "Indictable",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.02.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.03",
    {
      title: "Providing, making available, etc., property or services for terrorist purposes",
      severity: "Indictable",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.03.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.031",
    {
      title: "Definition of Public Safety Minister",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.031.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.032",
    {
      title: "Authorization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.032.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.033",
    {
      title: "Notice of refusal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.033.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.034",
    {
      title: "Additional security reviews",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.034.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.035",
    {
      title: "Renewal of authorization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.035.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.036",
    {
      title: "Amendment to authorization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.036.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.037",
    {
      title: "Authorization — suspension and revocation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.037.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.038",
    {
      title: "Assistance to Public Safety Minister",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.038.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.039",
    {
      title: "Judicial review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.039.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.0391",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.0391.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.0392",
    {
      title: "Annual report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.0392.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.04",
    {
      title: "Using or possessing property for terrorist purposes",
      severity: "Indictable",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.04.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.05",
    {
      title: "Establishment of list",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.05.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.06",
    {
      title: "Return of information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.06.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.07",
    {
      title: "Mistaken identity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.07.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.08",
    {
      title: "Freezing of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.08.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.09",
    {
      title: "Exemptions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.09.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.1",
    {
      title: "Disclosure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.1.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.11",
    {
      title: "Audit",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.11.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.12",
    {
      title: "Offences — freezing of property, disclosure or audit",
      severity: "Summary",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.12.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.13",
    {
      title: "Seizure and restraint of assets",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.13.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.14",
    {
      title: "Application for order of forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.14.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.15",
    {
      title: "Disposition of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.15.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.16",
    {
      title: "Interim preservation rights",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.16.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.17",
    {
      title: "Other forfeiture provisions unaffected",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.17.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.18",
    {
      title: "Participation in activity of terrorist group",
      severity: "Indictable",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.18.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.181",
    {
      title: "Leaving Canada to participate in activity of terrorist group",
      severity: "Indictable",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.181.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.19",
    {
      title: "Facilitating terrorist activity",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.19.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.191",
    {
      title: "Leaving Canada to facilitate terrorist activity",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.191.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.2",
    {
      title: "Commission of offence for terrorist group",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.2.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.201",
    {
      title: "Leaving Canada to commit offence for terrorist group",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.201.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.202",
    {
      title: "Leaving Canada to commit offence that is terrorist activity",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-83.202.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.21",
    {
      title: "Instructing to carry out activity for terrorist group",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.21.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.22",
    {
      title: "Instructing to carry out terrorist activity",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.22.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.221",
    {
      title: "Counselling commission of terrorism offence",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.221.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.222",
    {
      title: "Warrant of seizure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.222.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.223",
    {
      title: "Order to computer system’s custodian",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.223.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.23",
    {
      title: "Concealing person who carried out terrorist activity",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.23.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.231",
    {
      title: "Hoax — terrorist activity",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.231.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.24",
    {
      title: "Attorney General’s consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.24.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.25",
    {
      title: "Jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.25.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.26",
    {
      title: "Sentences to be served consecutively",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.26.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.27",
    {
      title: "Punishment for terrorist activity",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-83.27.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.3",
    {
      title: "Attorney General’s consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.3.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.31",
    {
      title: "Annual report (section 83.3)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.31.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.32",
    {
      title: "Sunset provision",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.32.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],
  [
    "83.33",
    {
      title: "Transitional provision — section 83.3",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-83.33.html`,
      partOf: "Part II.1 — Terrorism",
    },
  ],

  // ── Part III — Firearms and Other Weapons ──
  [
    "84",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-84.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "85",
    {
      title: "Using firearm in commission of offence",
      severity: "Indictable",
      maxPenalty: "14 years indictable; no mandatory minimum; served consecutively to sentences for an offence arising from the same event or series of events and to any sentence the person is already subject to.",
      url: `${JUSTICE_LAWS_BASE}/section-85.html`,
      definition:
        "Every person commits an offence who uses a firearm, whether or not the person causes or means to cause bodily harm to any person as a result, while committing an indictable offence (other than an offence under section 220 (criminal negligence causing death), 236 (manslaughter), 239 (attempted murder), 244 (discharging firearm with intent), 244.2 (discharging firearm — recklessness), 272 (sexual assault with a weapon), 273 (aggravated sexual assault), subsection 279(1) (kidnapping), section 279.1 (hostage taking), 344 (robbery) or 346 (extortion)), while attempting to commit an indictable offence, or during flight after committing or attempting to commit an indictable offence. It is also an offence to use an imitation firearm while committing or attempting to commit any indictable offence, or during flight after doing so, whether or not the person causes or means to cause bodily harm to any person as a result. A sentence imposed for an offence under this section must be served consecutively to any other sentence arising from the same event or series of events and to any sentence the person is already subject to.",
      relatedSections: ["86", "87", "88", "91", "92", "95"],
      defences: ["no knowledge item was a firearm"],
      topicsTagged: ["firearm", "weapon", "indictable offence"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "86",
    {
      title: "Careless use of firearm, etc.",
      severity: "Hybrid",
      maxPenalty: "Indictable: 2 years (first offence) or 5 years (second or subsequent offence), with no minimum stated; summary conviction also available.",
      url: `${JUSTICE_LAWS_BASE}/section-86.html`,
      definition:
        "Every person commits an offence who, without lawful excuse, uses, carries, handles, ships, transports or stores a firearm, a prohibited weapon, a restricted weapon, a prohibited device or any ammunition or prohibited ammunition in a careless manner or without reasonable precautions for the safety of other persons. It is also an offence to contravene a regulation made under paragraph 117(h) of the Firearms Act respecting the storage, handling, transportation, shipping, display, advertising and mail-order sales of firearms and restricted weapons.",
      relatedSections: ["85", "87", "88"],
      defences: ["lawful excuse", "reasonable precautions taken"],
      topicsTagged: ["firearm", "careless use", "safety"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "87",
    {
      title: "Pointing a firearm",
      severity: "Hybrid",
      maxPenalty: "5 years indictable / 2 years less a day summary",
      url: `${JUSTICE_LAWS_BASE}/section-87.html`,
      definition:
        "Every person commits an offence who, without lawful excuse, points a firearm at another person, whether the firearm is loaded or unloaded.",
      relatedSections: ["85", "86", "88", "265"],
      defences: ["lawful excuse"],
      topicsTagged: ["firearm", "threatening", "pointing"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "88",
    {
      title: "Possession of weapon for dangerous purpose",
      severity: "Hybrid",
      maxPenalty: "10 years indictable / 2 years less a day summary",
      url: `${JUSTICE_LAWS_BASE}/section-88.html`,
      definition:
        "Every person commits an offence who carries or possesses a weapon, an imitation of a weapon, a prohibited device or any ammunition or prohibited ammunition for a purpose dangerous to the public peace or for the purpose of committing an offence.",
      relatedSections: ["85", "86", "87", "91", "92"],
      defences: ["no intent for dangerous purpose", "lawful possession"],
      topicsTagged: ["weapon", "dangerous purpose", "possession"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "89",
    {
      title: "Carrying weapon while attending public meeting",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-89.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "90",
    {
      title: "Carrying concealed weapon",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-90.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "91",
    {
      title: "Unauthorized possession of firearm",
      severity: "Hybrid",
      maxPenalty: "5 years indictable / 2 years less a day summary",
      url: `${JUSTICE_LAWS_BASE}/section-91.html`,
      definition:
        "Subject to subsection (4), every person commits an offence who possesses a prohibited firearm, a restricted firearm or a non-restricted firearm without being the holder of a licence under which the person may possess it and, in the case of a prohibited firearm or a restricted firearm, a registration certificate for it.",
      relatedSections: ["92", "95", "86"],
      defences: ["valid licence and registration", "inherited firearm (grace period)"],
      topicsTagged: ["firearm", "unauthorized possession", "licence"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "92",
    {
      title: "Possession of firearm knowing its possession is unauthorized",
      severity: "Indictable",
      maxPenalty: "10 years indictable; no mandatory minimum.",
      url: `${JUSTICE_LAWS_BASE}/section-92.html`,
      definition:
        "Subject to the exceptions in subsection (4), every person commits an offence who possesses a prohibited firearm, a restricted firearm or a non-restricted firearm knowing that they are not the holder of a licence under which they may possess it and, in the case of a prohibited firearm or a restricted firearm, a registration certificate for it. It is also an offence, subject to the same exceptions, to possess a prohibited weapon, a restricted weapon, a prohibited device (other than a replica firearm) or any prohibited ammunition knowing that the person is not the holder of a licence under which they may possess it.",
      relatedSections: ["91", "95", "86"],
      defences: ["honest belief in lawful possession"],
      topicsTagged: ["firearm", "knowing possession", "unauthorized"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "93",
    {
      title: "Possession at unauthorized place",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-93.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "94",
    {
      title: "Unauthorized possession in motor vehicle",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-94.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "95",
    {
      title: "Possession of prohibited or restricted firearm with ammunition",
      severity: "Hybrid",
      maxPenalty: "14 years indictable; summary conviction also available; no mandatory minimum.",
      url: `${JUSTICE_LAWS_BASE}/section-95.html`,
      definition:
        "Subject to subsection (3), every person commits an offence who, in any place, possesses a loaded prohibited firearm or restricted firearm, or an unloaded prohibited firearm or restricted firearm together with readily accessible ammunition that is capable of being discharged in the firearm, without being the holder of an authorization or a licence under which the person may possess the firearm in that place and the registration certificate for the firearm.",
      relatedSections: ["91", "92", "86", "85"],
      defences: ["valid authorization and registration"],
      topicsTagged: ["firearm", "prohibited", "restricted", "loaded"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "96",
    {
      title: "Possession of weapon obtained by commission of offence",
      severity: "Hybrid",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-96.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "98",
    {
      title: "Breaking and entering to steal firearm",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-98.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "98.1",
    {
      title: "Robbery to steal firearm",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-98.1.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "99",
    {
      title: "Weapons trafficking",
      severity: "Indictable",
      maxPenalty: "14 years (minimum 14 years)",
      url: `${JUSTICE_LAWS_BASE}/section-99.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "100",
    {
      title: "Possession for purpose of weapons trafficking",
      severity: "Indictable",
      maxPenalty: "14 years indictable (3-year minimum for a first offence / 5-year minimum for a subsequent offence when the object is a prohibited firearm, restricted firearm, non-restricted firearm, prohibited device, firearm part, ammunition or prohibited ammunition; no minimum in any other case).",
      url: `${JUSTICE_LAWS_BASE}/section-100.html`,
      definition:
        "Every person commits an offence who possesses a prohibited firearm, a restricted firearm, a non-restricted firearm, a prohibited weapon, a restricted weapon, a prohibited device, a firearm part, any ammunition or any prohibited ammunition for the purpose of transferring it, whether or not for consideration, or offering to transfer it, knowing that the person is not authorized to transfer it under the Firearms Act or any other Act of Parliament or any regulations made under any Act of Parliament.",
      relatedSections: ["91", "92", "95", "101"],
      defences: ["authorized transfer under Firearms Act"],
      topicsTagged: ["weapons trafficking", "firearm", "transfer"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "101",
    {
      title: "Transfer without authority",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction also available.",
      url: `${JUSTICE_LAWS_BASE}/section-101.html`,
      definition:
        "Every person commits an offence who transfers a prohibited firearm, a restricted firearm, a non-restricted firearm, a prohibited weapon, a restricted weapon, a prohibited device, a firearm part, any ammunition or any prohibited ammunition to any person otherwise than under the authority of the Firearms Act or any other Act of Parliament or any regulations made under an Act of Parliament.",
      relatedSections: ["100", "91", "92"],
      defences: ["authorized transfer under Firearms Act"],
      topicsTagged: ["weapons", "transfer", "unauthorized"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "102",
    {
      title: "Making automatic firearm",
      severity: "Hybrid",
      maxPenalty: "10 years indictable with a 1-year mandatory minimum; summary conviction also available.",
      url: `${JUSTICE_LAWS_BASE}/section-102.html`,
      definition:
        "Every person commits an offence who, without lawful excuse, alters a firearm so that it is capable of, or manufactures or assembles any firearm that is capable of, discharging projectiles in rapid succession during one pressure of the trigger.",
      relatedSections: ["84", "91", "95"],
      defences: ["lawful excuse (e.g., licensed manufacturer)"],
      topicsTagged: ["automatic firearm", "prohibited", "manufacturing"],
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "102.1",
    {
      title: "Possession of computer data",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-102.1.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "103",
    {
      title: "Importing or exporting knowing it is unauthorized",
      severity: "Indictable",
      maxPenalty: "14 years (minimum 14 years)",
      url: `${JUSTICE_LAWS_BASE}/section-103.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "104",
    {
      title: "Unauthorized importing or exporting",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-104.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "104.1",
    {
      title: "Altering cartridge magazine",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-104.1.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "105",
    {
      title: "Losing or finding",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-105.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "106",
    {
      title: "Destroying",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-106.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "107",
    {
      title: "False statements",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-107.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "108",
    {
      title: "Tampering with serial number",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-108.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "109",
    {
      title: "Mandatory prohibition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-109.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "110",
    {
      title: "Discretionary prohibition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-110.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "110.1",
    {
      title: "Application for emergency prohibition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-110.1.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "110.2",
    {
      title: "Order denying access to information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-110.2.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "110.3",
    {
      title: "Order to delete identifying information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-110.3.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "110.4",
    {
      title: "Order under subsection 111(5)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-110.4.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "111",
    {
      title: "Application for prohibition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-111.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "112",
    {
      title: "Revocation of prohibition order under subsection 110.1(3) or 111(5)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-112.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "113",
    {
      title: "Lifting of prohibition order for sustenance or employment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-113.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "114",
    {
      title: "Requirement to surrender",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-114.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "115",
    {
      title: "Forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-115.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "116",
    {
      title: "Authorizations revoked or amended",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-116.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117",
    {
      title: "Return to owner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.01",
    {
      title: "Possession contrary to order",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.01.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.0101",
    {
      title: "Application for emergency limitations on access order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.0101.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.0102",
    {
      title: "Order denying access to information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.0102.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.0103",
    {
      title: "Order to delete identifying information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.0103.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.0104",
    {
      title: "Order under subsection 117.011(5)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.0104.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.011",
    {
      title: "Application for order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.011.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.012",
    {
      title: "Revocation of order under subsection 117.0101(3) or 117.011(5)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.012.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.02",
    {
      title: "Search and seizure without warrant where offence committed",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.02.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.03",
    {
      title: "Seizure on failure to produce authorization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.03.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.04",
    {
      title: "Application for warrant to search and seize",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.04.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.05",
    {
      title: "Application for disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.05.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.06",
    {
      title: "Where no finding or application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.06.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.07",
    {
      title: "Public officers",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.07.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.071",
    {
      title: "Preclearance officers",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.071.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.08",
    {
      title: "Individuals acting for police force, Canadian Forces and visiting forces",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.08.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.09",
    {
      title: "Employees of business with licence",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.09.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.1",
    {
      title: "Restriction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.1.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.11",
    {
      title: "Onus on the accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.11.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.12",
    {
      title: "Authorizations, etc., as evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.12.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.13",
    {
      title: "Certificate of analyst",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.13.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.14",
    {
      title: "Amnesty period",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.14.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],
  [
    "117.15",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-117.15.html`,
      partOf: "Part III — Firearms and Other Weapons",
    },
  ],

  // ── Part IV — Offences Against the Administration of Law and Justice ──
  [
    "118",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-118.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "119",
    {
      title: "Bribery of judicial officers, etc.",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-119.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "120",
    {
      title: "Bribery of officers",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-120.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "121",
    {
      title: "Frauds on the government",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-121.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "121.1",
    {
      title: "Selling, etc., of tobacco products and raw leaf tobacco",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-121.1.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "122",
    {
      title: "Breach of trust by public officer",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-122.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "123",
    {
      title: "Municipal corruption",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-123.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "124",
    {
      title: "Selling or purchasing office",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-124.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "125",
    {
      title: "Influencing or negotiating appointments or dealing in offices",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-125.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "126",
    {
      title: "Disobeying a statute",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-126.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "127",
    {
      title: "Disobeying order of court",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-127.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "128",
    {
      title: "Misconduct of officers executing process",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-128.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "129",
    {
      title: "Offences relating to public or peace officer",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-129.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "130",
    {
      title: "Personating peace officer",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-130.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "130.1",
    {
      title: "Aggravating circumstance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-130.1.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "131",
    {
      title: "Perjury",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-131.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "132",
    {
      title: "Punishment",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-132.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "133",
    {
      title: "Corroboration",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-133.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "134",
    {
      title: "Idem",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-134.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "136",
    {
      title: "Witness giving contradictory evidence",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-136.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "137",
    {
      title: "Fabricating evidence",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-137.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "138",
    {
      title: "Offences relating to affidavits",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-138.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "139",
    {
      title: "Obstructing justice",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-139.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "140",
    {
      title: "Public mischief",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-140.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "141",
    {
      title: "Compounding indictable offence",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-141.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "142",
    {
      title: "Corruptly taking reward for recovery of goods",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-142.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "144",
    {
      title: "Prison breach",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-144.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "145",
    {
      title: "Escape and being at large without excuse",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-145.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "146",
    {
      title: "Permitting or assisting escape",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-146.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "147",
    {
      title: "Rescue or permitting escape",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-147.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "148",
    {
      title: "Assisting prisoner of war to escape",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-148.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],
  [
    "149",
    {
      title: "Service of term for escape",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-149.html`,
      partOf: "Part IV — Offences Against the Administration of Law and Justice",
    },
  ],

  // ── Part V — Sexual Offences, Public Morals and Disorderly Conduct ──
  [
    "150",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-150.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "150.1",
    {
      title: "Consent no defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-150.1.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "151",
    {
      title: "Sexual interference",
      severity: "Hybrid",
      maxPenalty: "14 years indictable; mandatory minimum 1 year (indictable) / 90 days (summary)",
      url: `${JUSTICE_LAWS_BASE}/section-151.html`,
      definition:
        "Every person who, for a sexual purpose, touches, directly or indirectly, with a part of the body or with an object, any part of the body of a person under the age of 16 years is guilty of an offence.",
      relatedSections: ["152", "153", "271"],
      defences: ["mistaken belief in age (s. 150.1)"],
      topicsTagged: ["sexual offence", "child", "minor"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "152",
    {
      title: "Invitation to sexual touching or exposure",
      severity: "Hybrid",
      maxPenalty: "14 years indictable, minimum 1 year; 2 years less a day summary, minimum 90 days.",
      url: `${JUSTICE_LAWS_BASE}/section-152.html`,
      definition:
        "Every person commits an offence who, for a sexual purpose, invites, counsels or incites a person under the age of 16 years to touch, directly or indirectly, with a part of the body or with an object, their own body, the body of the person who so invites, counsels or incites, or the body of any other person, or to expose their own sexual organs.",
      relatedSections: ["151", "153", "271"],
      defences: ["mistaken belief in age (s. 150.1)"],
      topicsTagged: ["sexual offence", "child", "minor"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "153",
    {
      title: "Sexual exploitation",
      severity: "Hybrid",
      maxPenalty: "14 years indictable, minimum 1 year; 2 years less a day summary, minimum 90 days.",
      url: `${JUSTICE_LAWS_BASE}/section-153.html`,
      definition:
        "Every person commits an offence who is in a position of trust or authority towards a young person, who is a person with whom the young person is in a relationship of dependency, or who is in a relationship with the young person that is exploitative of the young person, and who, for a sexual purpose, touches, directly or indirectly, with a part of the body or with an object, any part of the body of the young person; invites, counsels or incites the young person to touch, directly or indirectly, with a part of the body or with an object, their own body, the body of the person who so invites, counsels or incites, or the body of any other person; or invites, counsels or incites the young person to expose their own sexual organs. A judge may infer that a relationship is exploitative from factors including the young person's age, the age difference between the parties, how the relationship developed, and the degree of control or influence the person has over the young person. For the purposes of this section, a young person is a person 16 years of age or more but under the age of eighteen years.",
      relatedSections: ["151", "152", "153.1"],
      defences: [],
      topicsTagged: ["sexual offence", "exploitation", "trust", "young person"],
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "153.1",
    {
      title: "Sexual exploitation of person with disability",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-153.1.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "155",
    {
      title: "Incest",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-155.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "156",
    {
      title: "Historical offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-156.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "160",
    {
      title: "Bestiality",
      severity: "Hybrid",
      maxPenalty: "10 years (general, s. 160(1)-(2)); 14 years, minimum 1 year indictable / minimum 6 months summary (if committed in presence of or by a person under 16, s. 160(3)); 5 years (representation of bestiality, s. 160(3.4))",
      url: `${JUSTICE_LAWS_BASE}/section-160.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "161",
    {
      title: "Order of prohibition",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-161.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "162",
    {
      title: "Voyeurism",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-162.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "162.1",
    {
      title: "Publication, etc., of an intimate image without consent",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-162.1.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "162.2",
    {
      title: "Prohibition order",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-162.2.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "163",
    {
      title: "Obscene materials",
      severity: "Hybrid",
      maxPenalty: "2 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-163.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "163.1",
    {
      title: "Definition of child sexual abuse and exploitation material",
      severity: "Hybrid",
      maxPenalty: "14 years, minimum 1 year (making/distributing, s. 163.1(2)-(3)); 10 years indictable minimum 1 year / 2 years less a day summary minimum 6 months (possession/accessing, s. 163.1(4)-(4.1))",
      url: `${JUSTICE_LAWS_BASE}/section-163.1.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "164",
    {
      title: "Warrant of seizure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-164.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "164.1",
    {
      title: "Warrant of seizure — material on computer system",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-164.1.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "164.2",
    {
      title: "Forfeiture after conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-164.2.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "164.3",
    {
      title: "Relief from forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-164.3.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "167",
    {
      title: "Immoral theatrical performance",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-167.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "168",
    {
      title: "Mailing obscene matter",
      severity: "Hybrid",
      maxPenalty: "2 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-168.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "169",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-169.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "169.1",
    {
      title: "Recruitment — young person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-169.1.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "170",
    {
      title: "Parent or guardian procuring sexual activity",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-170.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "171",
    {
      title: "Householder permitting prohibited sexual activity",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-171.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "171.1",
    {
      title: "Making sexually explicit material available to child",
      severity: "Hybrid",
      maxPenalty: "14 years, minimum 6 months indictable / 2 years less a day, minimum 90 days summary",
      url: `${JUSTICE_LAWS_BASE}/section-171.1.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "172",
    {
      title: "Corrupting children",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-172.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "172.1",
    {
      title: "Luring a child",
      severity: "Hybrid",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-172.1.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "172.2",
    {
      title: "Agreement or arrangement — sexual offence against child",
      severity: "Hybrid",
      maxPenalty: "14 years (minimum 14 years)",
      url: `${JUSTICE_LAWS_BASE}/section-172.2.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "173",
    {
      title: "Indecent acts",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-173.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "174",
    {
      title: "Nudity",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-174.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "175",
    {
      title: "Causing disturbance, indecent exhibition, loitering, etc.",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-175.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "176",
    {
      title: "Obstructing or violence to or arrest of officiating clergyman",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-176.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "177",
    {
      title: "Trespassing at night",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-177.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "180",
    {
      title: "Common nuisance",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-180.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],
  [
    "182",
    {
      title: "Dead body",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-182.html`,
      partOf: "Part V — Sexual Offences, Public Morals and Disorderly Conduct",
    },
  ],

  // ── Part VI — Invasion of Privacy ──
  [
    "183",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-183.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "183.1",
    {
      title: "Consent to interception",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-183.1.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184",
    {
      title: "Interception",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.1",
    {
      title: "Interception to prevent bodily harm",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.1.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.2",
    {
      title: "Interception with consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.2.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.3",
    {
      title: "Application — telecommunication producing writing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.3.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.4",
    {
      title: "Immediate interception — imminent harm",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.4.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.5",
    {
      title: "Interception of radio-based telephone communications",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.5.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "184.6",
    {
      title: "One application for authorization sufficient",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-184.6.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "185",
    {
      title: "Application for authorization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-185.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "186",
    {
      title: "Judge to be satisfied",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-186.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "186.1",
    {
      title: "Time limitation in relation to criminal organizations and terrorism offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-186.1.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "187",
    {
      title: "Manner in which application to be kept secret",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-187.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "188",
    {
      title: "Applications to specially appointed judges",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-188.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "188.1",
    {
      title: "Execution in Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-188.1.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "188.2",
    {
      title: "No civil or criminal liability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-188.2.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "189",
    {
      title: "Notice of intention to produce evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-189.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "190",
    {
      title: "Further particulars",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-190.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "191",
    {
      title: "Possession, etc.",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-191.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "192",
    {
      title: "Forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-192.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "193",
    {
      title: "Disclosure of information",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-193.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "193.1",
    {
      title: "Disclosure of information received from interception of radio-based telephone communications",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-193.1.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "194",
    {
      title: "Damages",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-194.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "195",
    {
      title: "Annual report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-195.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "196",
    {
      title: "Written notification to be given",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-196.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],
  [
    "196.1",
    {
      title: "Written notice — interception in accordance with section 184.4",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-196.1.html`,
      partOf: "Part VI — Invasion of Privacy",
    },
  ],

  // ── Part VII — Disorderly Houses, Gaming and Betting ──
  [
    "197",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-197.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "199",
    {
      title: "Warrant to search",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-199.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "201",
    {
      title: "Keeping gaming or betting house",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-201.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "202",
    {
      title: "Betting, pool-selling, book-making, etc.",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-202.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "203",
    {
      title: "Placing bets on behalf of others",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-203.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "204",
    {
      title: "Exemption",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-204.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "206",
    {
      title: "Offence in relation to lotteries and games of chance",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-206.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "207",
    {
      title: "Permitted lotteries",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-207.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "207.1",
    {
      title: "Exemption — lottery scheme on an international cruise ship",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-207.1.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "209",
    {
      title: "Cheating at play",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-209.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],
  [
    "213",
    {
      title: "Stopping or impeding traffic",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-213.html`,
      partOf: "Part VII — Disorderly Houses, Gaming and Betting",
    },
  ],

  // ── Part VIII — Offences Against the Person and Reputation ──
  [
    "214",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-214.html`,
      summary:
        "Defines terms used in this Part, including 'abandon or expose', 'form of marriage', and 'guardian'; several other defined terms in this section have been repealed.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "215",
    {
      title: "Duty of persons to provide necessaries",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-215.html`,
      summary:
        "Imposes a legal duty on parents, guardians, and others to provide necessaries of life to children under 16, to a spouse or common-law partner, and to a dependant who cannot care for themselves. Makes it an offence to fail without lawful excuse to perform that duty where it leaves the person in destitute or necessitous circumstances, endangers their life, or permanently endangers or injures their health, and sets out evidentiary presumptions, including about parentage and failure to provide maintenance.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "216",
    {
      title: "Duty of persons undertaking acts dangerous to life",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-216.html`,
      summary:
        "Imposes a legal duty on anyone who undertakes surgical or medical treatment, or any other lawful act that may endanger life, to use reasonable knowledge, skill, and care in doing it, except in cases of necessity.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "217",
    {
      title: "Duty of persons undertaking acts",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-217.html`,
      summary:
        "Imposes a legal duty on anyone who undertakes to do an act to actually do it, where failing to do so is or may be dangerous to life.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "217.1",
    {
      title: "Duty of persons directing work",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-217.1.html`,
      summary:
        "Imposes a legal duty on anyone who undertakes, or has authority, to direct how another person does work or performs a task, to take reasonable steps to prevent bodily harm to that person or others arising from it.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "218",
    {
      title: "Abandoning child",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-218.html`,
      summary:
        "Makes it an offence to unlawfully abandon or expose a child under 10 years old in a way that endangers, or is likely to endanger, the child's life, or is likely to permanently injure the child's health.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "219",
    {
      title: "Criminal negligence",
      severity: "",
      maxPenalty: "See s. 220-221",
      url: `${JUSTICE_LAWS_BASE}/section-219.html`,
      summary:
        "Defines a person as criminally negligent when, in doing something or in omitting to do something they have a legal duty to do, they show wanton or reckless disregard for the lives or safety of others, and defines 'duty' for this purpose as one imposed by law.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "220",
    {
      title: "Causing death by criminal negligence",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-220.html`,
      summary:
        "Makes it an offence to cause the death of another person by criminal negligence.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "221",
    {
      title: "Causing bodily harm by criminal negligence",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-221.html`,
      summary:
        "Makes it an offence to cause bodily harm to another person by criminal negligence.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "222",
    {
      title: "Homicide",
      severity: "",
      maxPenalty: "See s. 229-240",
      url: `${JUSTICE_LAWS_BASE}/section-222.html`,
      definition:
        "A person commits homicide when, directly or indirectly, by any means, they cause the death of a human being. Homicide is culpable or not culpable; non-culpable homicide is not an offence. Culpable homicide is murder, manslaughter, or infanticide. A person commits culpable homicide when they cause a human being's death by means of an unlawful act, by criminal negligence, by causing that person, through threats or fear of violence or deception, to do anything that causes their death, or by wilfully frightening a child or sick person. As an exception, a person does not commit homicide by reason only of procuring, through false evidence, the conviction and death by sentence of the law of another human being.",
      relatedSections: ["229", "231", "234", "235", "236"],
      defences: ["self-defence (s. 34)", "provocation (s. 232)", "not criminally responsible (s. 16)"],
      topicsTagged: ["homicide", "death", "culpable"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "223",
    {
      title: "When child becomes human being",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-223.html`,
      summary:
        "Defines when a child becomes a human being for purposes of this Act: when it has completely proceeded, in a living state, from its mother's body, whether or not it has breathed, has independent circulation, or the umbilical cord is severed. States that a person commits homicide if they cause injury to a child before or during birth that results in the child's death after it becomes a human being.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "224",
    {
      title: "Death that might have been prevented",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-224.html`,
      summary:
        "Provides that causing a person's death by an act or omission constitutes causing that death, even if the death might have been prevented by resorting to proper means.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "225",
    {
      title: "Death from treatment of injury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-225.html`,
      summary:
        "Provides that causing a human being a bodily injury that is dangerous in itself and results in death constitutes causing that person's death, even if the immediate cause of death was proper or improper treatment applied in good faith.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "226",
    {
      title: "Acceleration of death",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-226.html`,
      summary:
        "Provides that causing a bodily injury to a human being that results in death is causing that person's death, even if the injury's effect was only to accelerate death from a disease or disorder that arose from some other cause.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "227",
    {
      title: "Exemption for medical assistance in dying",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-227.html`,
      summary:
        "Provides that a medical or nurse practitioner does not commit culpable homicide by providing medical assistance in dying in accordance with section 241.2, and that a person assisting such a practitioner is likewise not a party to culpable homicide. The exemption applies even where there is a reasonable but mistaken belief about a fact underlying it, is not barred by section 14, and its key terms take the same meaning as in section 241.1.",
      relatedSections: ["241.2", "14", "241.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "228",
    {
      title: "Killing by influence on the mind",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-228.html`,
      summary:
        "Provides that no one commits culpable homicide by causing a person's death solely through influence on the mind, or through a disorder or disease resulting from such influence, except where the death of a child or sick person is caused by wilfully frightening them.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "229",
    {
      title: "Murder",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-229.html`,
      definition:
        "Culpable homicide is murder (a) where the person who causes the death of a human being means to cause death, or means to cause bodily harm that they know is likely to cause death, and is reckless whether death ensues or not; (b) where a person, meaning to cause death or bodily harm they know is likely to cause death, and being reckless whether death ensues, by accident or mistake causes the death of another human being, notwithstanding that they did not mean to cause death or bodily harm to that human being; or (c) where a person, for an unlawful object, does anything that they know is likely to cause death, and by doing so causes the death of a human being, even if they desire to effect their object without causing death or bodily harm to any human being.",
      relatedSections: ["222", "231", "232", "235"],
      defences: ["provocation (s. 232)", "self-defence (s. 34)", "intoxication", "not criminally responsible (s. 16)"],
      topicsTagged: ["murder", "intent", "death"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "231",
    {
      title: "Classification of murder",
      severity: "Indictable",
      maxPenalty: "Life imprisonment (minimum 25 years parole ineligibility for 1st degree)",
      url: `${JUSTICE_LAWS_BASE}/section-231.html`,
      definition:
        "Murder is first degree murder or second degree murder. It is first degree murder when planned and deliberate, including when committed pursuant to a contract for payment. Irrespective of planning, murder is also first degree when the victim is a peace officer or prison employee acting in the course of duty; when death is caused while committing or attempting hijacking, sexual assault, kidnapping, forcible confinement, or hostage taking; when death is caused while engaging in, or after having engaged in, a pattern of coercive or controlling conduct against an intimate partner with intent to cause the victim to believe their safety is threatened; while exercising control, direction, or influence over the victim's movements with intent to exploit them; while committing or attempting an offence of a sexual nature; or when motivated by hate based on colour, race, religion, national or ethnic origin, age, sex, sexual orientation, gender identity or expression, or disability; when caused during criminal harassment intended to make the victim fear for their safety; when the underlying offence also constitutes terrorist activity; when committed for the benefit of, at the direction of, or in association with a criminal organization; or when caused during an intimidation offence under section 423.1. All other murder is second degree murder.",
      relatedSections: ["229", "232", "235", "279.04", "423.1", "745"],
      defences: ["provocation reduces to manslaughter (s. 232)", "intoxication (negating planning/deliberation)"],
      topicsTagged: ["murder", "first degree", "second degree", "planned", "femicide", "criminal organization"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "232",
    {
      title: "Murder reduced to manslaughter",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-232.html`,
      definition:
        "Culpable homicide that otherwise would be murder may be reduced to manslaughter if the person who committed it did so in the heat of passion caused by sudden provocation. Provocation means conduct of the victim that would itself constitute an indictable offence under this Act punishable by five or more years of imprisonment and that is of such a nature as to be sufficient to deprive an ordinary person of the power of self-control, if the accused acted on it on the sudden and before there was time for their passion to cool. Whether the victim's conduct amounted to provocation, and whether the accused was actually deprived of self-control by it, are questions of fact; no one is deemed to have provoked another by doing something they had a legal right to do, or something the accused incited in order to provide an excuse for causing death or bodily harm. Culpable homicide that would otherwise be murder is not necessarily manslaughter merely because it was committed during an illegal arrest, though the accused's knowledge that the arrest was illegal may itself be evidence of provocation.",
      relatedSections: ["229", "231", "234", "236"],
      defences: [],
      topicsTagged: ["provocation", "manslaughter", "heat of passion"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "233",
    {
      title: "Infanticide",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-233.html`,
      summary:
        "A female person commits infanticide when, by a wilful act or omission, she causes the death of her newly-born child, at a time when she has not fully recovered from giving birth and her mind is disturbed as a result of that or of lactation following the birth.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "234",
    {
      title: "Manslaughter",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-234.html`,
      definition:
        "Culpable homicide that is not murder or infanticide is manslaughter.",
      relatedSections: ["222", "229", "232", "236"],
      defences: ["self-defence (s. 34)", "not criminally responsible (s. 16)"],
      topicsTagged: ["manslaughter", "homicide"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "235",
    {
      title: "Punishment for murder",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-235.html`,
      definition:
        "Every one who commits first degree murder or second degree murder is guilty of an indictable offence and shall be sentenced to imprisonment for life.",
      relatedSections: ["229", "231", "745", "745.4"],
      defences: [],
      topicsTagged: ["murder", "sentencing", "life imprisonment"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "236",
    {
      title: "Manslaughter",
      severity: "Indictable",
      maxPenalty: "Life imprisonment; minimum 4 years if firearm used",
      url: `${JUSTICE_LAWS_BASE}/section-236.html`,
      definition:
        "Every person who commits manslaughter is guilty of an indictable offence and liable to imprisonment for life, with a minimum punishment of imprisonment for a term of four years if a firearm was used in the commission of the offence. In sentencing, the court shall consider imposing life imprisonment if the manslaughter was committed while engaging in, or after having engaged in, a pattern of coercive or controlling conduct against an intimate partner with intent to cause the victim to believe their safety was threatened; while exercising control, direction, or influence over the victim's movements with intent to exploit them; while committing or attempting an offence of a sexual nature; or if motivated by hate based on colour, race, religion, national or ethnic origin, age, sex, sexual orientation, gender identity or expression, or disability.",
      relatedSections: ["234", "232", "222", "279.04"],
      defences: [],
      topicsTagged: ["manslaughter", "sentencing", "firearm", "femicide"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "237",
    {
      title: "Punishment for infanticide",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-237.html`,
      summary:
        "Provides that infanticide may be prosecuted either as an indictable offence or as an offence punishable on summary conviction.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "238",
    {
      title: "Killing unborn child in act of birth",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-238.html`,
      summary:
        "Makes it an offence to cause the death of a child during the act of birth, before the child has become a human being, in a manner that would constitute murder if the child were already a human being. Does not apply to a person who causes such a death using means they consider, in good faith, necessary to preserve the life of the child's mother.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "239",
    {
      title: "Attempt to commit murder",
      severity: "Indictable",
      maxPenalty: "Life imprisonment (minimum 10 years)",
      url: `${JUSTICE_LAWS_BASE}/section-239.html`,
      summary:
        "Makes it an offence to attempt, by any means, to commit murder. Provides that for determining whether a person has committed a repeat offence under this section, certain firearms-related, robbery, or violence offences involving a firearm count as an earlier offence based only on the sequence of convictions — not the sequence in which the offences were actually committed — and that sufficiently old prior convictions are not counted.",
      relatedSections: ["85", "244", "244.2", "220", "236", "272"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "240",
    {
      title: "Accessory after fact to murder",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-240.html`,
      summary:
        "Makes it an offence to be an accessory after the fact to murder.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "240.1",
    {
      title: "Removal without informed consent",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-240.1.html`,
      summary:
        "Makes it an offence to obtain, or to carry out, participate in, or facilitate the removal of, a human organ for transplant knowing — or being reckless as to whether — the person it came from (or someone lawfully authorized to consent on their behalf) did not give informed consent to its removal, including doing so on behalf of or in association with the person removing the organ. Also makes it an offence to obtain, participate in, or facilitate obtaining an organ for transplant knowing, or being reckless as to whether, it was obtained in exchange for payment or other consideration.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241",
    {
      title: "Counselling or aiding suicide",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-241.html`,
      summary:
        "Makes it an offence to counsel, abet, or aid a person to die by suicide, whether or not suicide occurs. Exempts medical and nurse practitioners, people who help them, pharmacists dispensing a prescribed substance, and people aiding a patient at that patient's explicit request, when acting in accordance with the medical assistance in dying provisions in section 241.2 — an exemption that applies even with a reasonable but mistaken belief about a fact underlying it — and clarifies that health care professionals who merely provide information about lawful medical assistance in dying commit no offence.",
      relatedSections: ["241.2", "241.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-241.1.html`,
      summary:
        "Defines terms used in this section and in sections 241.2 to 241.4, including 'medical assistance in dying,' 'medical practitioner,' 'nurse practitioner,' and 'pharmacist.'",
      relatedSections: ["241.2", "241.3", "241.4"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241.2",
    {
      title: "Eligibility for medical assistance in dying",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-241.2.html`,
      summary:
        "Sets out the eligibility criteria a person must meet to receive medical assistance in dying — including age, decision-making capacity, having a grievous and irremediable medical condition, and giving informed, voluntary consent — and the safeguards a medical or nurse practitioner must follow before providing it, which differ depending on whether the person's natural death is reasonably foreseeable. Also addresses who may sign a request on a person's behalf, who may act as an independent witness, and how advance consent and waiver of final consent operate in specified circumstances.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241.3",
    {
      title: "Failure to comply with safeguards",
      severity: "Hybrid",
      maxPenalty: "5 years imprisonment (indictable); or summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-241.3.html`,
      summary:
        "Makes it an offence for a medical practitioner or nurse practitioner providing medical assistance in dying to knowingly fail to comply with the safeguards in section 241.2 or the requirement to inform the pharmacist.",
      relatedSections: ["241.2"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241.31",
    {
      title: "Filing information — practitioners",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-241.31.html`,
      summary:
        "Requires medical practitioners, nurse practitioners, persons responsible for preliminary assessments, and pharmacists or pharmacy technicians to report specified information about medical assistance in dying requests to a recipient designated by regulations, and directs the Minister of Health to make those regulations governing what information is collected, used, and disclosed. Knowingly failing to file the required information, or knowingly contravening the regulations, is an offence.",
      relatedSections: ["241.2"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "241.4",
    {
      title: "Forgery",
      severity: "Hybrid",
      maxPenalty: "5 years imprisonment (indictable); or summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-241.4.html`,
      summary:
        "Makes it an offence to commit forgery in relation to a request for medical assistance in dying, or to destroy a document relating to such a request with intent to interfere with another person's access to medical assistance in dying, the assessment of the request, a related exemption, or the filing of information under section 241.31.",
      relatedSections: ["227", "241", "245", "241.31", "321"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "242",
    {
      title: "Neglect to obtain assistance in childbirth",
      severity: "Hybrid",
      maxPenalty: "5 years imprisonment (indictable); or summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-242.html`,
      summary:
        "Makes it an offence for a pregnant person who intends that the child not live, or intends to conceal the birth, to fail to arrange reasonable assistance for her delivery, where that failure results in the child being permanently injured, or dying immediately before, during, or shortly after birth.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "243",
    {
      title: "Concealing body of child",
      severity: "Hybrid",
      maxPenalty: "2 years imprisonment (indictable); or summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-243.html`,
      summary:
        "Makes it an offence to dispose of a dead child's body in any manner with intent to conceal that its mother gave birth to it, regardless of whether the child died before, during, or after birth.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "244",
    {
      title: "Discharging firearm with intent",
      severity: "Indictable",
      maxPenalty: "14 years (minimum 14 years)",
      url: `${JUSTICE_LAWS_BASE}/section-244.html`,
      summary:
        "Makes it an offence to discharge a firearm at a person with intent to wound, maim, disfigure, endanger life, or prevent arrest or detention, whether or not that person is the one actually shot at. Also sets out how earlier convictions under this or related firearm offences are counted toward treating a conviction as a repeat offence, based on the order in which convictions occurred.",
      relatedSections: ["85", "244.2", "220", "236", "239", "272"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "244.1",
    {
      title: "Causing bodily harm with intent — air gun or pistol",
      severity: "Indictable",
      maxPenalty: "14 years imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-244.1.html`,
      summary:
        "Makes it an offence to discharge an air or compressed-gas gun or pistol at a person with intent to wound, maim, disfigure, endanger life, or prevent arrest or detention, whether or not that person is the one actually shot at.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "244.2",
    {
      title: "Discharging firearm — recklessness",
      severity: "Indictable",
      maxPenalty: "14 years (minimum 14 years)",
      url: `${JUSTICE_LAWS_BASE}/section-244.2.html`,
      summary:
        "Makes it an offence to intentionally discharge a firearm into or at a place while knowing or being reckless as to whether another person is present there, or to intentionally discharge a firearm while reckless as to another person's life or safety. The section also defines \"place\" for this purpose and sets out how an earlier related conviction is counted when determining whether a later offence is a second or subsequent one.",
      relatedSections: ["85", "244", "220", "236", "239", "272"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "245",
    {
      title: "Administering noxious thing",
      severity: "Hybrid",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-245.html`,
      summary:
        "Makes it an offence to administer, or cause to be administered or taken, poison or another destructive or noxious thing to another person, either with intent to endanger life or cause bodily harm, or with intent to aggrieve or annoy that person. It exempts a medical practitioner or nurse practitioner providing medical assistance in dying under section 241.2, and anyone who helps them do so.",
      relatedSections: ["241.2", "241.1"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "246",
    {
      title: "Overcoming resistance to commission of offence",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-246.html`,
      summary:
        "Makes it an offence, when done with intent to help oneself or another person commit an indictable offence, to attempt to choke, suffocate, or strangle a person, or by any means try to render a person insensible, unconscious, or unable to resist. It is likewise an offence, for that same purpose, to administer or attempt to administer, or cause or attempt to cause a person to take, a stupefying or overpowering drug, matter, or thing.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "247",
    {
      title: "Traps likely to cause bodily harm",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-247.html`,
      summary:
        "Makes it an offence, with intent to cause death or bodily harm to a person, to set or place a trap, device, or other thing likely to cause death or bodily harm, or to knowingly allow such a trap to remain in a place one occupies or possesses. It also addresses the same conduct where it actually causes bodily harm or death, or takes place in a location kept or used for committing another indictable offence.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "248",
    {
      title: "Interfering with transportation facilities",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-248.html`,
      summary:
        "Makes it an offence to place anything on, or do anything to, property used for transporting people or goods by land, water, or air, when done with intent to endanger a person's safety and the act is likely to cause death or bodily harm to people.",
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "262",
    {
      title: "Impeding attempt to save life",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-262.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "263",
    {
      title: "Duty to safeguard opening in ice",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-263.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "263.1",
    {
      title: "Violence against intimate partner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-263.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "264",
    {
      title: "Criminal harassment",
      severity: "Hybrid",
      maxPenalty: "10 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-264.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "264.1",
    {
      title: "Uttering threats",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-264.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "265",
    {
      title: "Assault",
      severity: "Hybrid",
      maxPenalty: "See s. 266-268",
      url: `${JUSTICE_LAWS_BASE}/section-265.html`,
      definition:
        "A person commits an assault when, without the other person's consent, they intentionally apply force to that person directly or indirectly; attempt or threaten, by an act or gesture, to apply force to another person while having, or causing that person to reasonably believe they have, the present ability to do so; or, while openly carrying a weapon or an imitation of one, accost or impede another person or beg. This section applies to all forms of assault, including sexual assault and its aggravated forms. No consent is obtained where the complainant submits or fails to resist because of force or threats of force against them or another person, fraud, or the exercise of authority. Where an accused claims an honest belief that the complainant consented, a judge satisfied there is sufficient evidence to support that defence must instruct the jury to consider whether there were reasonable grounds for that belief.",
      relatedSections: ["266", "267", "268", "269"],
      defences: ["consent (s. 265(3))", "self-defence (s. 34)"],
      topicsTagged: ["violence", "person", "force", "consent"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "266",
    {
      title: "Assault",
      severity: "Hybrid",
      maxPenalty: "5 years indictable / 2 years less a day summary",
      url: `${JUSTICE_LAWS_BASE}/section-266.html`,
      definition:
        "Every one who commits an assault is guilty of (a) an indictable offence and is liable to imprisonment for a term not exceeding five years; or (b) an offence punishable on summary conviction.",
      relatedSections: ["265", "267", "268"],
      defences: ["consent", "self-defence (s. 34)", "defence of property (s. 35)"],
      topicsTagged: ["violence", "person"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "267",
    {
      title: "Assault with a weapon or causing bodily harm",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction also available.",
      url: `${JUSTICE_LAWS_BASE}/section-267.html`,
      definition:
        "Every person is guilty of an indictable offence and liable to imprisonment for a term of not more than 10 years, or is guilty of an offence punishable on summary conviction, who, in committing an assault, carries, uses or threatens to use a weapon or an imitation of a weapon, causes bodily harm to the complainant, or chokes, suffocates or strangles the complainant.",
      relatedSections: ["265", "266", "268"],
      defences: ["consent", "self-defence (s. 34)"],
      topicsTagged: ["violence", "weapon", "bodily harm"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "268",
    {
      title: "Aggravated assault",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-268.html`,
      definition:
        "Every one commits an aggravated assault who wounds, maims, disfigures or endangers the life of the complainant. For this section and section 265, 'wounds' or 'maims' includes excising, infibulating or mutilating, in whole or in part, a person's labia majora, labia minora or clitoris, except where a person duly qualified to practise medicine performs a surgical procedure for the person's physical health or normal reproductive or sexual function, or where the person is at least 18 years old and no bodily harm results. No consent to such excision, infibulation or mutilation is valid outside those two exceptions.",
      relatedSections: ["265", "267", "269"],
      defences: ["self-defence (s. 34)"],
      topicsTagged: ["violence", "serious injury", "wounding", "female genital mutilation"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "268.1",
    {
      title: "Sterilization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-268.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "269",
    {
      title: "Unlawfully causing bodily harm",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-269.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "269.01",
    {
      title: "Aggravating circumstance — assault against a public transit employee",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-269.01.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "269.1",
    {
      title: "Torture",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-269.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "270",
    {
      title: "Assaulting a peace officer",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-270.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "270.01",
    {
      title: "Assaulting peace officer with weapon or causing bodily harm",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-270.01.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "270.02",
    {
      title: "Aggravated assault of peace officer",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-270.02.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "270.03",
    {
      title: "Sentences to be served consecutively",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-270.03.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "270.1",
    {
      title: "Disarming a peace officer",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-270.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "271",
    {
      title: "Sexual assault",
      severity: "Hybrid",
      maxPenalty: "10 years indictable / 2 years less a day summary (general); if complainant under 16: 14 years indictable minimum 1 year / 2 years less a day summary minimum 6 months",
      url: `${JUSTICE_LAWS_BASE}/section-271.html`,
      definition:
        "Every person who commits a sexual assault is guilty of an indictable offence and liable to imprisonment for a term of not more than 10 years, or, if the complainant is under the age of 16 years, to imprisonment for a term of not more than 14 years and to a minimum punishment of imprisonment for a term of one year; or is guilty of an offence punishable on summary conviction and liable to imprisonment for a term of not more than two years less a day, or, if the complainant is under the age of 16 years, to imprisonment for a term of not more than two years less a day and to a minimum punishment of imprisonment for a term of six months.",
      relatedSections: ["265", "272", "273", "273.1"],
      defences: ["consent (s. 273.1)", "mistaken belief in consent (s. 273.2)"],
      topicsTagged: ["sexual offence", "assault", "consent"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "272",
    {
      title: "Sexual assault with a weapon, threats to a third party or causing bodily harm",
      severity: "Indictable",
      maxPenalty: "14 years indictable generally (no minimum), rising to a 4-year minimum if any firearm is used, a 5-year minimum (7 years for a subsequent offence) if a restricted or prohibited firearm is used, or if any firearm is used for the benefit of, at the direction of, or in association with a criminal organization, and to life imprisonment with a 5-year minimum if the complainant is under 16.",
      url: `${JUSTICE_LAWS_BASE}/section-272.html`,
      definition:
        "Every person commits an offence who, in committing a sexual assault, carries, uses or threatens to use a weapon or an imitation of a weapon; threatens to cause bodily harm to a person other than the complainant; causes bodily harm to the complainant; chokes, suffocates or strangles the complainant; or is a party to the offence with any other person.",
      relatedSections: ["271", "273", "265"],
      defences: ["consent (s. 273.1)", "mistaken belief in consent (s. 273.2)"],
      topicsTagged: ["sexual offence", "weapon", "bodily harm"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "273",
    {
      title: "Aggravated sexual assault",
      severity: "Indictable",
      maxPenalty: "Life imprisonment; no minimum in the general case, rising to a 4-year minimum if any firearm is used, a 5-year minimum (7 years for a subsequent offence) if a restricted or prohibited firearm is used, or if any firearm is used for the benefit of, at the direction of, or in association with a criminal organization, and a 5-year minimum if the complainant is under 16.",
      url: `${JUSTICE_LAWS_BASE}/section-273.html`,
      definition:
        "Every person commits an aggravated sexual assault who, in committing a sexual assault, wounds, maims, disfigures or endangers the life of the complainant.",
      relatedSections: ["271", "272", "268"],
      defences: [],
      topicsTagged: ["sexual offence", "aggravated", "serious injury"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "273.1",
    {
      title: "Meaning of consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-273.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "273.2",
    {
      title: "Where belief in consent not a defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-273.2.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "273.3",
    {
      title: "Removal of child from Canada",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-273.3.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "274",
    {
      title: "Corroboration not required",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-274.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "275",
    {
      title: "Rules respecting recent complaint abrogated",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-275.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276",
    {
      title: "Evidence of complainant’s sexual activity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.01",
    {
      title: "Application for hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.01.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.02",
    {
      title: "Hearing — jury and public excluded",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.02.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.03",
    {
      title: "Publication prohibited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.03.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.04",
    {
      title: "Instruction to jury — use of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.04.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.05",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.05.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.06",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.06.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.07",
    {
      title: "Publication prohibited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.07.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.08",
    {
      title: "Instruction to jury — use of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.08.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.09",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.09.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.1",
    {
      title: "Admissibility of sexual activity evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.11",
    {
      title: "Publication prohibited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.11.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.12",
    {
      title: "Instruction to jury — use of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.12.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "276.13",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-276.13.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "277",
    {
      title: "Reputation evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-277.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278",
    {
      title: "Spouse may be charged",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.11",
    {
      title: "Records and therapeutic records possessed by third party",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.11.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.12",
    {
      title: "Application for production",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.12.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.13",
    {
      title: "Hearing in camera",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.13.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.14",
    {
      title: "Order — production to judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.14.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.15",
    {
      title: "Review of record by judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.15.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.16",
    {
      title: "Order — Production of record to accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.16.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.17",
    {
      title: "Reasons for decision",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.17.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.18",
    {
      title: "Publication prohibited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.18.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.19",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.19.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.2",
    {
      title: "Records and therapeutic records possessed by prosecutor",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.2.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.21",
    {
      title: "Application for production",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.21.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.22",
    {
      title: "Hearing in camera",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.22.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.23",
    {
      title: "Order — production to judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.23.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.24",
    {
      title: "Review by judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.24.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.25",
    {
      title: "Order — production of record to accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.25.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.26",
    {
      title: "Reasons for decision",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.26.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.27",
    {
      title: "Publication prohibited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.27.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.28",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.28.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.29",
    {
      title: "Admissibility — possession by accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.29.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.3",
    {
      title: "Application for hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.3.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.31",
    {
      title: "Hearing — jury and public excluded",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.31.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.32",
    {
      title: "Publication prohibited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.32.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.33",
    {
      title: "Instruction to jury — use of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.33.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.34",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.34.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.35",
    {
      title: "Admissibility of record",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.35.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.36",
    {
      title: "Publication prohibited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.36.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.37",
    {
      title: "Instruction to jury — use of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.37.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.38",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.38.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "278.98",
    {
      title: "Reasons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-278.98.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279",
    {
      title: "Kidnapping",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment for kidnapping. Mandatory minimum of 5 years (7 years for a second or subsequent offence) if a restricted or prohibited firearm is used, or any firearm is used for the benefit of, at the direction of, or in association with a criminal organization; 4 years if any other firearm is used; 5 years if the victim is under 16, unless the offender is the victim's parent, guardian, or a person having lawful care or charge of the victim (in which case this 5-year minimum does not apply); otherwise life imprisonment with no minimum. Forcible confinement under subsection (2) is separately punishable by up to 10 years' imprisonment on indictment, or by summary conviction.",
      url: `${JUSTICE_LAWS_BASE}/section-279.html`,
      definition:
        "Every person commits an offence who kidnaps a person with intent to cause the person to be confined or imprisoned against the person's will, to cause the person to be unlawfully sent or transported out of Canada against the person's will, or to hold the person for ransom or to service against the person's will; the offence is indictable and liable to imprisonment for life, subject to mandatory minimum sentences that vary depending on firearm use and the age of the victim. Every person who, without lawful authority, confines, imprisons or forcibly seizes another person is separately guilty of an indictable offence and liable to imprisonment for a term not exceeding ten years, or of an offence punishable on summary conviction.",
      relatedSections: ["279.01", "279.011", "280", "281"],
      defences: ["consent"],
      topicsTagged: ["kidnapping", "confinement", "liberty"],
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.01",
    {
      title: "Trafficking in persons",
      severity: "Indictable",
      maxPenalty: "Life imprisonment (minimum 14 years)",
      url: `${JUSTICE_LAWS_BASE}/section-279.01.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.011",
    {
      title: "Trafficking of a person under the age of eighteen years",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-279.011.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.02",
    {
      title: "Material benefit — trafficking",
      severity: "Hybrid",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-279.02.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.03",
    {
      title: "Withholding or destroying documents — trafficking",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-279.03.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.04",
    {
      title: "Exploitation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-279.04.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "279.1",
    {
      title: "Hostage taking",
      severity: "Indictable",
      maxPenalty: "Life imprisonment (minimum 10 years)",
      url: `${JUSTICE_LAWS_BASE}/section-279.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "280",
    {
      title: "Abduction of person under age of 16",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-280.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "281",
    {
      title: "Abduction of person under age of 14",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-281.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "282",
    {
      title: "Abduction in contravention of custody or parenting order",
      severity: "Hybrid",
      maxPenalty: "10 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-282.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "283",
    {
      title: "Abduction",
      severity: "Hybrid",
      maxPenalty: "10 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-283.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "284",
    {
      title: "Defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-284.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "285",
    {
      title: "Defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-285.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286",
    {
      title: "No defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-286.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286.1",
    {
      title: "Obtaining sexual services for consideration",
      severity: "Hybrid",
      maxPenalty: "5 years indictable + minimum fine / summary fine or 2 years less a day (general, s. 286.1(1)); 14 years, minimum 6 months (first offence) / 1 year (subsequent), if the person is under 18 (s. 286.1(2))",
      url: `${JUSTICE_LAWS_BASE}/section-286.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286.2",
    {
      title: "Material benefit from sexual services",
      severity: "Hybrid",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-286.2.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286.3",
    {
      title: "Procuring",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-286.3.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286.4",
    {
      title: "Advertising sexual services",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-286.4.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "286.5",
    {
      title: "Immunity — material benefit and advertising",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-286.5.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "290",
    {
      title: "Bigamy",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-290.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "291",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-291.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "292",
    {
      title: "Procuring feigned marriage",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-292.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "293",
    {
      title: "Polygamy",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-293.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "293.1",
    {
      title: "Forced marriage",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-293.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "293.2",
    {
      title: "Marriage under age of 16 years",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-293.2.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "294",
    {
      title: "Pretending to solemnize marriage",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-294.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "295",
    {
      title: "Marriage contrary to law",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-295.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "297",
    {
      title: "Definition of newspaper",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-297.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "298",
    {
      title: "Definition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-298.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "299",
    {
      title: "Publishing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-299.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "300",
    {
      title: "Punishment of libel known to be false",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-300.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "301",
    {
      title: "Punishment for defamatory libel",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-301.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "302",
    {
      title: "Extortion by libel",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-302.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "303",
    {
      title: "Proprietor of newspaper presumed responsible",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-303.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "304",
    {
      title: "Selling book containing defamatory libel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-304.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "305",
    {
      title: "Publishing proceedings of courts of justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-305.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "306",
    {
      title: "Parliamentary papers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-306.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "307",
    {
      title: "Fair reports of parliamentary or judicial proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-307.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "308",
    {
      title: "Fair report of public meeting",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-308.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "309",
    {
      title: "Public benefit",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-309.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "310",
    {
      title: "Fair comment on public person or work of art",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-310.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "311",
    {
      title: "When truth a defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-311.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "312",
    {
      title: "Publication invited or necessary",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-312.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "313",
    {
      title: "Answer to inquiries",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-313.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "314",
    {
      title: "Giving information to person interested",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-314.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "315",
    {
      title: "Publication in good faith for redress of wrong",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-315.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "316",
    {
      title: "Proving publication by order of legislature",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-316.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "317",
    {
      title: "Verdicts in cases of defamatory libel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-317.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "318",
    {
      title: "Advocating genocide",
      severity: "Indictable",
      maxPenalty: "5 years",
      url: `${JUSTICE_LAWS_BASE}/section-318.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "319",
    {
      title: "Public incitement of hatred",
      severity: "Hybrid",
      maxPenalty: "2 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-319.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320",
    {
      title: "Warrant of seizure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.1",
    {
      title: "Warrant of seizure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.1.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.1001",
    {
      title: "Offence motivated by hatred",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.1001.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.101",
    {
      title: "Definition of conversion therapy",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.101.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.102",
    {
      title: "Conversion therapy",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.102.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.103",
    {
      title: "Promoting or advertising",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.103.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],
  [
    "320.104",
    {
      title: "Material benefit",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.104.html`,
      partOf: "Part VIII — Offences Against the Person and Reputation",
    },
  ],

  // ── Part VIII.1 — Offences Relating to Conveyances ──
  [
    "320.11",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.11.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.12",
    {
      title: "Recognition and declaration",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.12.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.13",
    {
      title: "Dangerous operation",
      severity: "Hybrid",
      maxPenalty: "10 years / life if death",
      url: `${JUSTICE_LAWS_BASE}/section-320.13.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.14",
    {
      title: "Operation while impaired",
      severity: "Hybrid",
      maxPenalty: "10 years indictable or summary conviction (up to $5,000 fine or 2 years less a day, or both), with a minimum fine of $1,000 for a first offence, imprisonment for 30 days for a second, and 120 days for each subsequent (higher first-offence minimum fines of $1,500-$2,000 apply at high blood alcohol concentrations); 14 years indictable/summary with the same minimums if bodily harm results; life imprisonment with the same minimums if death results; the standalone low-blood-drug-concentration offence is summary conviction only, maximum $1,000 fine (s. 320.19, 320.2, 320.21).",
      url: `${JUSTICE_LAWS_BASE}/section-320.14.html`,
      definition:
        "Everyone commits an offence who operates a conveyance while their ability to operate it is impaired to any degree by alcohol, a drug, or a combination of the two; who has, within two hours after ceasing to operate, a blood alcohol concentration at or above 80 mg of alcohol per 100 mL of blood; who has, within that period, a blood drug concentration at or above the level prescribed by regulation for that drug; or who has, within that period, a blood alcohol concentration and a blood drug concentration that each meet or exceed the levels prescribed by regulation for that combination of alcohol and drug. A person who commits any of these offences and, while operating the conveyance, causes bodily harm to, or the death of, another person commits a separate offence. It is also an offence to have, within two hours after ceasing to operate a conveyance, a blood drug concentration that meets or exceeds the regulated level but is below the level required for the paragraph (1)(c) offence. No offence is committed under the blood-alcohol, blood-drug, or combined-concentration provisions where the alcohol or drug was consumed after the person stopped operating the conveyance, the person had no reasonable expectation at that time of being required to provide a bodily sample, and, for the alcohol-based provisions, their consumption is consistent with having had a blood alcohol concentration below the relevant threshold while actually operating the conveyance.",
      relatedSections: ["320.15", "320.16", "320.17", "320.19"],
      defences: ["bolus drinking defence (limited)", "consumption after driving"],
      topicsTagged: ["impaired driving", "alcohol", "drug", "BAC"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.15",
    {
      title: "Failure or refusal to comply with demand",
      severity: "Hybrid",
      maxPenalty:
        "10 years indictable or summary conviction (up to $5,000 fine or 2 years less a day, or both), with a minimum fine of $2,000 for a first offence, imprisonment for 30 days for a second, and 120 days for each subsequent; 14 years indictable/summary with the same minimums if bodily harm results; life imprisonment with the same minimums if death results (s. 320.19(1), (4), 320.2, 320.21).",
      url: `${JUSTICE_LAWS_BASE}/section-320.15.html`,
      definition:
        "Everyone commits an offence who, knowing that a demand has been made, fails or refuses to comply, without reasonable excuse, with a demand made under section 320.27 or 320.28. A person who commits this offence and, at the time, knows or is reckless as to whether they were involved in an accident causing bodily harm to another person commits a separate, more serious offence, as does a person who knows or is reckless as to whether the accident caused death or caused bodily harm from which death results. A person cannot be convicted of more than one offence under this section arising from the same transaction.",
      relatedSections: ["320.14", "320.16", "320.19", "320.27", "320.28"],
      defences: ["reasonable excuse (e.g., medical condition)", "incapability of providing sample"],
      topicsTagged: ["breathalyzer", "refusal", "demand"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.16",
    {
      title: "Failure to stop after accident",
      severity: "Hybrid",
      maxPenalty: "10 years indictable or summary conviction for the base offence; 14 years indictable/summary with escalating minimums ($1,000 fine first offence, 30 days second, 120 days subsequent) if the accident caused bodily harm; life imprisonment with the same escalating minimums if the accident caused death (s. 320.19(5), 320.2, 320.21).",
      url: `${JUSTICE_LAWS_BASE}/section-320.16.html`,
      definition:
        "Everyone commits an offence who operates a conveyance and, at the time of operating it, knows that, or is reckless as to whether, the conveyance has been involved in an accident with a person or another conveyance, and who fails, without reasonable excuse, to stop the conveyance, give their name and address, and, if any person has been injured or appears to require assistance, offer assistance. A person who commits this offence while knowing, or being reckless as to whether, the accident resulted in bodily harm to another person commits a separate offence, as does a person who commits it while knowing, or being reckless as to whether, the accident resulted in the death of another person or in bodily harm to another person whose death ensues.",
      relatedSections: ["320.14", "320.17", "320.19"],
      defences: ["did not know accident occurred", "fear for personal safety"],
      topicsTagged: ["hit and run", "accident", "failure to stop"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.17",
    {
      title: "Flight from peace officer",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction (s. 320.19(5)).",
      url: `${JUSTICE_LAWS_BASE}/section-320.17.html`,
      definition:
        "Everyone commits an offence who operates a motor vehicle or vessel while being pursued by a peace officer and fails, without reasonable excuse, to stop the motor vehicle or vessel as soon as is reasonable in the circumstances.",
      relatedSections: ["320.14", "320.16", "320.19"],
      defences: ["reasonable excuse for not stopping (e.g., unsafe location)"],
      topicsTagged: ["flight", "police pursuit", "conveyance"],
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.18",
    {
      title: "Operation while prohibited",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-320.18.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.19",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "10 years (minimum 10 years)",
      url: `${JUSTICE_LAWS_BASE}/section-320.19.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.2",
    {
      title: "Punishment in case of bodily harm",
      severity: "Hybrid",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-320.2.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.21",
    {
      title: "Punishment in case of death",
      severity: "",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-320.21.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.22",
    {
      title: "Aggravating circumstances for sentencing purposes",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.22.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.23",
    {
      title: "Delay of sentencing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.23.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.24",
    {
      title: "Mandatory prohibition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.24.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.25",
    {
      title: "Stay of order pending appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.25.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.26",
    {
      title: "Earlier and subsequent offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.26.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.27",
    {
      title: "Testing for presence of alcohol or drug",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.27.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.28",
    {
      title: "Samples of breath or blood — alcohol",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.28.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.29",
    {
      title: "Warrants to obtain blood samples",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.29.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.3",
    {
      title: "Testing blood — drug or alcohol",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.3.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.31",
    {
      title: "Breath samples",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.31.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.32",
    {
      title: "Certificates",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.32.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.33",
    {
      title: "Printout from approved instrument",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.33.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.34",
    {
      title: "Disclosure of information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.34.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.35",
    {
      title: "Presumption of operation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.35.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.36",
    {
      title: "Unauthorized use of bodily substance",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.36.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.37",
    {
      title: "Refusal to take sample",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.37.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.38",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.38.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.39",
    {
      title: "Approval — Attorney General of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.39.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],
  [
    "320.4",
    {
      title: "Designation — Attorney General",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-320.4.html`,
      partOf: "Part VIII.1 — Offences Relating to Conveyances",
    },
  ],

  // ── Part IX — Offences Against Rights of Property ──
  [
    "321",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-321.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "322",
    {
      title: "Theft",
      severity: "",
      maxPenalty: "See s. 334",
      url: `${JUSTICE_LAWS_BASE}/section-322.html`,
      definition:
        "Every one commits theft who, fraudulently and without colour of right, takes or converts to their own or another's use anything, whether animate or inanimate, intending to deprive the owner or a person with a special property or interest in it of the thing (temporarily or absolutely), to pledge or deposit it as security, to part with it under a condition they may be unable to perform, or to deal with it so that it cannot be restored in its original condition. Theft is complete once, with intent to steal, the thing is moved or begins to be made movable, and a taking or conversion may be fraudulent even without secrecy or concealment.",
      relatedSections: ["334", "343", "354", "380"],
      defences: ["colour of right", "claim of right"],
      topicsTagged: ["theft", "property", "fraud"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "323",
    {
      title: "Oysters",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-323.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "324",
    {
      title: "Theft by bailee of things under seizure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-324.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "325",
    {
      title: "Agent pledging goods, when not theft",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-325.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "326",
    {
      title: "Theft of telecommunication service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-326.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "327",
    {
      title: "Possession of device to obtain use of telecommunication facility or service",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-327.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "328",
    {
      title: "Theft by or from person having special property or interest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-328.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "330",
    {
      title: "Theft by person required to account",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-330.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "331",
    {
      title: "Theft by person holding power of attorney",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-331.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "332",
    {
      title: "Misappropriation of money held under direction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-332.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "333",
    {
      title: "Taking ore for scientific purpose",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-333.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "333.1",
    {
      title: "Motor vehicle theft",
      severity: "Hybrid",
      maxPenalty: "10 years (minimum 14 years)",
      url: `${JUSTICE_LAWS_BASE}/section-333.1.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "333.11",
    {
      title: "Sentences to be served consecutively — breaking and entering",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-333.11.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "333.2",
    {
      title: "Possession of device for purpose of committing theft",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-333.2.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "334",
    {
      title: "Punishment for theft",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available, if the stolen property is a testamentary instrument or worth more than $5,000; 2 years indictable, or summary conviction available, if $5,000 or less.",
      url: `${JUSTICE_LAWS_BASE}/section-334.html`,
      definition:
        "Except where otherwise provided by law, every one who commits theft is guilty, where the property stolen is a testamentary instrument or the value of what is stolen is more than $5,000, of an indictable offence liable to imprisonment for a term not exceeding ten years, or of an offence punishable on summary conviction; and, where the value of what is stolen is not more than $5,000, is guilty of an indictable offence liable to imprisonment for a term not exceeding two years, or of an offence punishable on summary conviction.",
      relatedSections: ["322", "343", "354"],
      defences: ["colour of right", "claim of right"],
      topicsTagged: ["theft", "sentencing", "property value"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "334.1",
    {
      title: "Aggravating circumstance — stolen property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-334.1.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "335",
    {
      title: "Taking motor vehicle or vessel or found therein without consent",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-335.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "336",
    {
      title: "Criminal breach of trust",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-336.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "338",
    {
      title: "Fraudulently taking cattle or defacing brand",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-338.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "339",
    {
      title: "Taking possession, etc., of drift timber",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-339.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "340",
    {
      title: "Destroying documents of title",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-340.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "341",
    {
      title: "Fraudulent concealment",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-341.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "342",
    {
      title: "Theft, forgery, etc., of credit card",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-342.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "342.01",
    {
      title: "Instruments for copying credit card data or forging or falsifying credit cards",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-342.01.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "342.1",
    {
      title: "Unauthorized use of computer",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-342.1.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "342.2",
    {
      title: "Possession of device to obtain unauthorized use of computer system or to commit mischief",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-342.2.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "343",
    {
      title: "Robbery",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-343.html`,
      definition:
        "Every one commits robbery who steals, and for the purpose of extorting whatever is stolen or to prevent or overcome resistance to the stealing, uses violence or threats of violence to a person or property; who steals from any person and, at the time he steals or immediately before or immediately thereafter, wounds, beats, strikes or uses any personal violence to that person; who assaults any person with intent to steal from him; or who steals any thing from any person while armed with an offensive weapon or imitation thereof.",
      relatedSections: ["344", "322", "265", "85"],
      defences: ["self-defence (s. 34)", "colour of right"],
      topicsTagged: ["robbery", "theft", "violence", "weapon"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "344",
    {
      title: "Robbery",
      severity: "Indictable",
      maxPenalty: "Life imprisonment. Mandatory minimum of 5 years for a first offence or 7 years for a second or subsequent offence if a restricted or prohibited firearm is used, or any firearm is used for the benefit of, at the direction of, or in association with a criminal organization; no minimum in any other case.",
      url: `${JUSTICE_LAWS_BASE}/section-344.html`,
      definition:
        "Every person who commits robbery is guilty of an indictable offence and liable to imprisonment for life. Where a restricted or prohibited firearm is used in the commission of the offence, or where any firearm is used for the benefit of, at the direction of, or in association with a criminal organization, the person is liable to a minimum punishment of five years' imprisonment for a first offence or seven years' imprisonment for a second or subsequent offence; in any other case, no minimum punishment applies.",
      relatedSections: ["343", "85", "95"],
      defences: [],
      topicsTagged: ["robbery", "sentencing", "firearm"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "345",
    {
      title: "Stopping mail with intent",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-345.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "346",
    {
      title: "Extortion",
      severity: "Indictable",
      maxPenalty: "Life imprisonment; if a firearm is used, minimum 5 years (first offence) / 7 years (subsequent offence)",
      url: `${JUSTICE_LAWS_BASE}/section-346.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "346.1",
    {
      title: "Sentences to be served consecutively",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-346.1.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "347",
    {
      title: "Criminal interest rate",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-347.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "347.01",
    {
      title: "Non-application — agreements or arrangements",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-347.01.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "347.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-347.1.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "348",
    {
      title: "Breaking and entering with intent, committing offence or breaking out",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment where the offence is committed in relation to a dwelling-house; 10 years indictable, or summary conviction, where it is committed in relation to any other place.",
      url: `${JUSTICE_LAWS_BASE}/section-348.html`,
      definition:
        "Every one who breaks and enters a place with intent to commit an indictable offence in it, breaks and enters a place and commits an indictable offence in it, or breaks out of a place after committing an indictable offence in it or after entering it with intent to commit an indictable offence in it, is guilty of an indictable offence and liable to imprisonment for life where the offence is committed in relation to a dwelling-house, or, where it is committed in relation to any other place, is guilty of an indictable offence liable to imprisonment for a term not exceeding ten years or of an offence punishable on summary conviction. Evidence that an accused broke and entered, or attempted to break and enter, a place is, absent evidence to the contrary, proof that the person did so with intent to commit an indictable offence in it, and evidence that an accused broke out of a place is, absent evidence to the contrary, proof that the person did so after committing an indictable offence in it or after entering it with intent to commit one. For these purposes, a place means a dwelling-house, any other building or structure or part of one, a railway vehicle, vessel, aircraft or trailer, or a pen or enclosure in which fur-bearing animals are kept in captivity for breeding or commercial purposes.",
      relatedSections: ["349", "350", "351", "322"],
      defences: ["colour of right", "consent of owner"],
      topicsTagged: ["break and enter", "dwelling", "property offence"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "348.1",
    {
      title: "Aggravating circumstance — home invasion",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-348.1.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "349",
    {
      title: "Being unlawfully in dwelling-house",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available.",
      url: `${JUSTICE_LAWS_BASE}/section-349.html`,
      definition:
        "Every person who, without lawful excuse, enters or is in a dwelling-house with intent to commit an indictable offence in it is guilty of an indictable offence and liable to imprisonment for a term of not more than 10 years, or of an offence punishable on summary conviction. Evidence that an accused, without lawful excuse, entered or was in a dwelling-house is, in the absence of evidence to the contrary, proof that the person did so with intent to commit an indictable offence in it.",
      relatedSections: ["348", "350", "177"],
      defences: ["lawful excuse", "consent"],
      topicsTagged: ["trespass", "dwelling-house", "night"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "350",
    {
      title: "Entrance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-350.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "351",
    {
      title: "Possession of break-in instrument",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-351.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "352",
    {
      title: "Possession of instruments for breaking into coin-operated or currency exchange devices",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-352.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "353",
    {
      title: "Selling, etc., automobile master key",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-353.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "353.1",
    {
      title: "Tampering with vehicle identification number",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-353.1.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "354",
    {
      title: "Possession of property obtained by crime",
      severity: "Hybrid",
      maxPenalty:
        "10 years indictable, or summary conviction available, if the property is a testamentary instrument or worth more than $5,000; 2 years indictable, or summary conviction available, if $5,000 or less (s. 355).",
      url: `${JUSTICE_LAWS_BASE}/section-354.html`,
      definition:
        "Every one commits an offence who has in his possession any property or thing or any proceeds of any property or thing knowing that all or part of the property or thing or of the proceeds was obtained by or derived directly or indirectly from the commission in Canada of an offence punishable by indictment or an act or omission anywhere that, if it had occurred in Canada, would have constituted an offence punishable by indictment.",
      relatedSections: ["322", "355", "380"],
      defences: ["no knowledge of origin", "colour of right"],
      topicsTagged: ["possession", "proceeds of crime", "property"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-355.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355.1",
    {
      title: "Definition of traffic",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-355.1.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355.2",
    {
      title: "Trafficking in property obtained by crime",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-355.2.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355.3",
    {
      title: "In rem prohibition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-355.3.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355.4",
    {
      title: "Possession of property obtained by crime — trafficking",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-355.4.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "355.5",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-355.5.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "356",
    {
      title: "Theft from mail",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-356.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "357",
    {
      title: "Bringing into Canada property obtained by crime",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-357.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "358",
    {
      title: "Having in possession when complete",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-358.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "361",
    {
      title: "False pretence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-361.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "362",
    {
      title: "False pretence or false statement",
      severity: "Hybrid",
      maxPenalty: "For an offence of obtaining property by false pretence (paragraph (1)(a)): 10 years indictable, or summary conviction available, if the property is a testamentary instrument or worth more than $5,000; 2 years indictable, or summary conviction available, if $5,000 or less. For obtaining credit by false pretence or fraud, or making or acting on a false financial statement (paragraphs (1)(b), (c) or (d)): 10 years indictable, or summary conviction available.",
      url: `${JUSTICE_LAWS_BASE}/section-362.html`,
      definition:
        "Every one commits an offence who, by a false pretence, whether directly or through the medium of a contract obtained by a false pretence, obtains anything in respect of which the offence of theft may be committed, or causes it to be delivered to another person, or who obtains credit by a false pretence or by fraud. It is also an offence to knowingly make or cause to be made, directly or indirectly, a false statement in writing, intending it to be relied on, about the financial condition, means or ability to pay of oneself or of a person or organization one is interested in or acts for, for the purpose of procuring the delivery of personal property, the payment of money, the making of a loan, the grant or extension of credit, the discount of an account receivable, or the making, accepting, discounting or endorsing of a bill of exchange, cheque, draft or promissory note. It is a further offence, knowing that such a false statement has been made, to procure any of those things on the faith of it. Where anything is obtained under the false-pretence branch of this offence by means of a cheque that is dishonoured on presentment for insufficient or no funds, it is presumed to have been obtained by false pretence unless the accused is shown to have believed on reasonable grounds that the cheque would be honoured if presented within a reasonable time.",
      relatedSections: ["380", "366", "368"],
      defences: ["honest belief in truth of statement"],
      topicsTagged: ["fraud", "false pretence", "misrepresentation"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "363",
    {
      title: "Obtaining execution of valuable security by fraud",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-363.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "364",
    {
      title: "Fraudulently obtaining food, beverage or accommodation",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-364.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "366",
    {
      title: "Forgery",
      severity: "Hybrid",
      maxPenalty: "10 years indictable; summary conviction also available (s. 367).",
      url: `${JUSTICE_LAWS_BASE}/section-366.html`,
      definition:
        "Every one commits forgery who makes a false document, knowing it to be false, with intent that it should in any way be used or acted on as genuine, to the prejudice of any one whether within Canada or not, or that a person should be induced by the belief that it is genuine to do or to refrain from doing anything, whether within Canada or not.",
      relatedSections: ["367", "368", "380"],
      defences: ["no intent to defraud", "honest mistake"],
      topicsTagged: ["forgery", "document", "fraud"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "367",
    {
      title: "Punishment for forgery",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-367.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "368",
    {
      title: "Use, trafficking or possession of forged document",
      severity: "Hybrid",
      maxPenalty: "10 years indictable, or summary conviction available.",
      url: `${JUSTICE_LAWS_BASE}/section-368.html`,
      definition:
        "Everyone commits an offence who, knowing or believing that a document is forged, uses, deals with or acts on it as if it were genuine; causes or attempts to cause any person to use, deal with or act on it as if it were genuine; transfers, sells, offers to sell, or makes it available to any person, knowing that or being reckless as to whether an offence of using, dealing with, acting on, or causing another to act on the document as genuine will be committed; or possesses the document with intent to commit any of those offences.",
      relatedSections: ["366", "367", "380"],
      defences: ["no knowledge document was forged"],
      topicsTagged: ["forgery", "fraud", "document"],
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "368.1",
    {
      title: "Forgery instruments",
      severity: "Hybrid",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-368.1.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "368.2",
    {
      title: "Public officers acting in the course of their duties or employment",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-368.2.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "369",
    {
      title: "Exchequer bill paper, public seals, etc.",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-369.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "372",
    {
      title: "False information",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-372.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "374",
    {
      title: "Drawing document without authority, etc.",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-374.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "375",
    {
      title: "Obtaining, etc., by instrument based on forged document",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-375.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "376",
    {
      title: "Counterfeiting stamp, etc.",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-376.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "377",
    {
      title: "Damaging documents",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-377.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],
  [
    "378",
    {
      title: "Offences in relation to registers",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-378.html`,
      partOf: "Part IX — Offences Against Rights of Property",
    },
  ],

  // ── Part X — Fraudulent Transactions Relating to Contracts and Trade ──
  [
    "379",
    {
      title: "Definition of goods",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-379.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "380",
    {
      title: "Fraud",
      severity: "Hybrid",
      maxPenalty: "14 years indictable if the subject-matter is a testamentary instrument or worth more than $5,000; 2 years indictable, or summary conviction available, if the subject-matter is worth $5,000 or less; a mandatory minimum of 2 years' imprisonment applies on indictment where the total value of the subject-matter of the offence or offences exceeds $1,000,000; up to 14 years indictable for affecting the public market price under subsection (2).",
      url: `${JUSTICE_LAWS_BASE}/section-380.html`,
      definition:
        "Every one who, by deceit, falsehood or other fraudulent means, whether or not it is a false pretence within the meaning of this Act, defrauds the public or any person, whether ascertained or not, of any property, money, valuable security or service is guilty, where the subject-matter is a testamentary instrument or is worth more than $5,000, of an indictable offence liable to imprisonment for up to fourteen years; and, where the value is $5,000 or less, of an indictable offence liable to imprisonment for up to two years, or of an offence punishable on summary conviction. A minimum punishment of two years' imprisonment applies on indictment where the total value of the subject-matter of the offence or offences exceeds one million dollars. It is a separate offence, punishable on indictment by up to fourteen years' imprisonment, to affect the public market price of stocks, shares, merchandise, or anything offered for sale to the public, by deceit, falsehood or other fraudulent means, with intent to defraud.",
      relatedSections: ["362", "366", "368", "382"],
      defences: ["honest belief in entitlement", "no intent to defraud"],
      topicsTagged: ["fraud", "deceit", "property"],
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "380.1",
    {
      title: "Sentencing — aggravating circumstances",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-380.1.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "380.2",
    {
      title: "Prohibition order",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-380.2.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "381",
    {
      title: "Using mails to defraud",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-381.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "382",
    {
      title: "Fraudulent manipulation of stock exchange transactions",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-382.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "382.1",
    {
      title: "Prohibited insider trading",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-382.1.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "383",
    {
      title: "Gaming in stocks or merchandise",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-383.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "384",
    {
      title: "Broker reducing stock by selling for their own account",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-384.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "385",
    {
      title: "Fraudulent concealment of title documents",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-385.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "386",
    {
      title: "Fraudulent registration of title",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-386.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "387",
    {
      title: "Fraudulent sale of real property",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-387.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "388",
    {
      title: "Misleading receipt",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-388.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "389",
    {
      title: "Fraudulent disposal of goods on which money advanced",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-389.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "390",
    {
      title: "Fraudulent receipts under Bank Act",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-390.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "391",
    {
      title: "Trade secret",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-391.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "392",
    {
      title: "Disposal of property to defraud creditors",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-392.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "393",
    {
      title: "Fraud in relation to fares, etc.",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-393.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "394",
    {
      title: "Fraud in relation to valuable minerals",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-394.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "394.1",
    {
      title: "Possession of stolen or fraudulently obtained valuable minerals",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-394.1.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "395",
    {
      title: "Search for valuable minerals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-395.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "396",
    {
      title: "Offences in relation to mines",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-396.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "397",
    {
      title: "Books and documents",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-397.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "398",
    {
      title: "Falsifying employment record",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-398.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "399",
    {
      title: "False return by public officer",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-399.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "400",
    {
      title: "False prospectus, etc.",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-400.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "401",
    {
      title: "Obtaining carriage by false billing",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-401.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "402.1",
    {
      title: "Definition of identity information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-402.1.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "402.2",
    {
      title: "Identity theft",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-402.2.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "403",
    {
      title: "Identity fraud",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-403.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "405",
    {
      title: "Acknowledging instrument in false name",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-405.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "406",
    {
      title: "Forging trademark",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-406.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "407",
    {
      title: "Offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-407.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "408",
    {
      title: "Passing off",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-408.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "409",
    {
      title: "Instruments for forging trademark",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-409.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "410",
    {
      title: "Other offences in relation to trademarks",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-410.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "411",
    {
      title: "Used goods sold without disclosure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-411.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "412",
    {
      title: "Punishment",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-412.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "414",
    {
      title: "Presumption from port of shipment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-414.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "415",
    {
      title: "Offences in relation to wreck",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-415.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "416",
    {
      title: "Distinguishing mark on public stores",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-416.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "417",
    {
      title: "Applying or removing marks without authority",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-417.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "418",
    {
      title: "Selling defective stores to Her Majesty",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-418.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "419",
    {
      title: "Unlawful use of military uniforms or certificates",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-419.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "420",
    {
      title: "Military stores",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-420.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "421",
    {
      title: "Evidence of enlistment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-421.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "422",
    {
      title: "Criminal breach of contract",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-422.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "423",
    {
      title: "Intimidation",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-423.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "423.1",
    {
      title: "Intimidation of a justice system participant or a journalist",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-423.1.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "423.2",
    {
      title: "Intimidation — health services",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-423.2.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "423.3",
    {
      title: "Intimidation — building used for religious worship, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-423.3.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "424",
    {
      title: "Threat against internationally protected person",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-424.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "424.1",
    {
      title: "Threat against United Nations or associated personnel",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-424.1.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "425",
    {
      title: "Offences by employers",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-425.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "425.1",
    {
      title: "Threats and retaliation against employees",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-425.1.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],
  [
    "426",
    {
      title: "Secret commissions",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-426.html`,
      partOf: "Part X — Fraudulent Transactions Relating to Contracts and Trade",
    },
  ],

  // ── Part XI — Wilful and Forbidden Acts in Respect of Certain Property ──
  [
    "428",
    {
      title: "Definition of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-428.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "429",
    {
      title: "Wilfully causing event to occur",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-429.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "430",
    {
      title: "Mischief",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment for mischief causing danger to life; 10 years indictable (mischief involving a testamentary instrument, or property over $5,000; computer data; hate-motivated mischief against religious, educational or community property; or cultural property), with summary conviction also available; for war memorials, cenotaphs and cemeteries, 10 years indictable or up to 2 years less a day summary, plus mandatory minimums escalating from a $1,000 fine (1st offence) to 14 days (2nd) to 30 days (subsequent offences); 2 years indictable for other property, with summary conviction available; 5 years indictable for an act or omission likely to constitute mischief, with summary conviction available.",
      url: `${JUSTICE_LAWS_BASE}/section-430.html`,
      definition:
        "Every person commits mischief who wilfully destroys or damages property, renders it dangerous, useless, inoperative or ineffective, or obstructs, interrupts or interferes with the lawful use, enjoyment or operation of property or with any person's lawful use, enjoyment or operation of it; the same conduct toward computer data — destroying or altering it, rendering it meaningless, useless or ineffective, obstructing or interfering with its lawful use, or denying access to a person entitled to it — is a separate mischief offence. Mischief that causes actual danger to life is punishable by imprisonment for life, while mischief in relation to a testamentary instrument or property over $5,000, mischief in relation to computer data, mischief motivated by bias, prejudice or hate based on colour, race, religion, national or ethnic origin, age, sex, sexual orientation, gender identity or expression, or mental or physical disability and directed at religious property, educational institutions, or buildings used by an identifiable group for administrative, social, cultural, sports or seniors-residence purposes, and mischief in relation to cultural property protected under the Hague Convention are each punishable by up to ten years' imprisonment on indictment or as summary conviction offences. Mischief in relation to a war memorial, cenotaph or related object, or a cemetery, carries mandatory minimum penalties escalating from a $1,000 fine for a first offence to 14 days' imprisonment for a second offence and 30 days for each subsequent offence, on top of a maximum of ten years on indictment or two years less a day on summary conviction. Mischief in relation to property other than a testamentary instrument or property over $5,000 is punishable by up to two years' imprisonment on indictment or as a summary conviction offence, and wilfully doing an act, or wilfully omitting to do an act that it is a person's duty to do, where the act or omission is likely to constitute any of these forms of mischief, is itself punishable by up to five years on indictment or as a summary conviction offence. No one commits mischief within the meaning of this section merely by stopping work as a result of the failure of the person and their employer to agree on any matter relating to their employment, whether acting alone or through a bargaining agent acting on their behalf, or as a result of taking part in a combination of workers for their own reasonable protection as workers, or merely by attending at, near, or approaching a dwelling-house or place for the purpose only of obtaining or communicating information.",
      relatedSections: ["318", "342.1"],
      defences: ["colour of right", "consent of owner"],
      topicsTagged: ["mischief", "property damage", "destruction"],
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "431",
    {
      title: "Attack on premises, residence or transport of internationally protected person",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-431.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "431.1",
    {
      title: "Attack on premises, accommodation or transport of United Nations or associated personnel",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-431.1.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "431.2",
    {
      title: "Definitions",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-431.2.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "432",
    {
      title: "Unauthorized recording of a movie",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-432.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "433",
    {
      title: "Arson — disregard for human life",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-433.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "434",
    {
      title: "Arson — damage to property",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-434.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "434.1",
    {
      title: "Arson — own property",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-434.1.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "435",
    {
      title: "Arson for fraudulent purpose",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-435.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "436",
    {
      title: "Arson by negligence",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-436.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "436.1",
    {
      title: "Possession of incendiary material",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-436.1.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "437",
    {
      title: "False alarm of fire",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-437.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "438",
    {
      title: "Interfering with saving of wrecked vessel",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-438.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "439",
    {
      title: "Interfering with marine signal, etc.",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-439.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "440",
    {
      title: "Removing natural bar without permission",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-440.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "441",
    {
      title: "Occupant injuring building",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-441.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "442",
    {
      title: "Interfering with boundary lines",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-442.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "443",
    {
      title: "Interfering with international boundary marks, etc.",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-443.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "445",
    {
      title: "Injuring or endangering other animals",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-445.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "445.01",
    {
      title: "Killing or injuring certain animals",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-445.01.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "445.1",
    {
      title: "Causing unnecessary suffering",
      severity: "Hybrid",
      maxPenalty: "5 years indictable / 18 months summary",
      url: `${JUSTICE_LAWS_BASE}/section-445.1.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "445.2",
    {
      title: "Definition of cetacean",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-445.2.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "446",
    {
      title: "Causing damage or injury",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-446.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "447",
    {
      title: "Arena for animal fighting",
      severity: "Hybrid",
      maxPenalty: "5 years indictable",
      url: `${JUSTICE_LAWS_BASE}/section-447.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],
  [
    "447.1",
    {
      title: "Order of prohibition or restitution",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-447.1.html`,
      partOf: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property",
    },
  ],

  // ── Part XII — Offences Relating to Currency ──
  [
    "448",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-448.html`,
      summary:
        "Defines terms used in this Part, including what qualifies as counterfeit money, what counts as a counterfeit token of value, what makes money 'current', and what 'utter' includes.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "449",
    {
      title: "Making",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-449.html`,
      summary:
        "Makes it an offence to make or begin to make counterfeit money.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "450",
    {
      title: "Possession, etc., of counterfeit money",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-450.html`,
      summary:
        "Makes it an offence, without lawful justification or excuse, to buy, receive, or offer to buy or receive counterfeit money, to have counterfeit money in one's custody or possession, or to bring counterfeit money into Canada.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "451",
    {
      title: "Having clippings, etc.",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-451.html`,
      summary:
        "Makes it an offence to possess, without lawful justification or excuse, gold or silver filings, clippings, bullion, or dust produced by impairing or diminishing a current gold or silver coin, knowing it was produced that way.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "452",
    {
      title: "Uttering, etc., counterfeit money",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-452.html`,
      summary:
        "Makes it an offence, without lawful justification or excuse, to utter or offer to utter counterfeit money or use it as if genuine, or to export, send, or take counterfeit money out of Canada.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "453",
    {
      title: "Uttering coin",
      severity: "Hybrid",
      maxPenalty: "2 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-453.html`,
      summary:
        "Makes it an offence to knowingly utter, with intent to defraud, a coin that is not current or a piece of metal that resembles a current coin in size, shape, or colour.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "454",
    {
      title: "Slugs and tokens",
      severity: "Summary",
      maxPenalty: "Summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-454.html`,
      summary:
        "Makes it an offence, without lawful excuse, to manufacture, produce, sell, or possess anything intended to be fraudulently substituted for a coin or token that a coin- or token-operated device is designed to accept.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "455",
    {
      title: "Clipping and uttering clipped coin",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-455.html`,
      summary:
        "Makes it an offence to impair, diminish, or lighten a current gold or silver coin with intent that it still pass as a current coin, or to utter a coin knowing it has been altered in that way.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "456",
    {
      title: "Defacing current coins",
      severity: "Summary",
      maxPenalty: "Summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-456.html`,
      summary:
        "Makes it an offence to deface a current coin, or to utter a current coin that has been defaced.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "457",
    {
      title: "Likeness of bank-notes",
      severity: "Summary",
      maxPenalty: "Summary conviction",
      url: `${JUSTICE_LAWS_BASE}/section-457.html`,
      summary:
        "Prohibits making, publishing, printing, or distributing, including electronically, anything in the likeness of a current bank-note or of an obligation or security of a government or bank, subject to exceptions for the Bank of Canada, the RCMP, and their authorized contractors or licensees. Provides a defence where a printed likeness of a Canadian bank-note is smaller or larger than a specified size range and is either black-and-white or shows the bank-note on only one side.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "458",
    {
      title: "Making, having or dealing in instruments for counterfeiting",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-458.html`,
      summary:
        "Makes it an offence, without lawful justification or excuse, to make, repair, buy, sell, or possess any machine, tool, or instrument known to have been used or adapted for making counterfeit money or counterfeit tokens of value.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "459",
    {
      title: "Conveying instruments for coining out of mint",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-459.html`,
      summary:
        "Makes it an offence, without lawful justification or excuse, to knowingly convey out of a Canadian mint a machine, tool, or instrument used in manufacturing coins, a useful part of such an item, or coin, bullion, or metal.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "460",
    {
      title: "Advertising and dealing in counterfeit money, etc.",
      severity: "Hybrid",
      maxPenalty: "5 years indictable; summary conviction available",
      url: `${JUSTICE_LAWS_BASE}/section-460.html`,
      summary:
        "Makes it an offence to advertise the sale, procurement, or disposal of counterfeit money or counterfeit tokens of value, or information on how to do so, or to purchase, obtain, negotiate, or otherwise deal with counterfeit tokens of value. States that a person cannot be convicted under this section for dealing in genuine but valueless money unless they knew it had no value and acted with fraudulent intent.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "461",
    {
      title: "When counterfeit complete",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-461.html`,
      summary:
        "States that an offence involving counterfeit money or counterfeit tokens of value is complete even if the item is unfinished or does not exactly copy what it is meant to resemble. Sets out rules for using a certificate from a designated examiner of counterfeit as evidence, including advance notice requirements and the ability, with leave of the court, to require the certificate-signer's attendance for cross-examination.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],
  [
    "462",
    {
      title: "Ownership",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.html`,
      summary:
        "States that counterfeit money, counterfeit tokens of value, and items used or intended to make them belong to Her Majesty, and allows a peace officer to seize and detain them. Requires seized items to be sent to the Minister of Finance, except that anything still required as evidence is withheld until it is no longer needed in those proceedings.",
      partOf: "Part XII — Offences Relating to Currency",
    },
  ],

  // ── Part XII.2 — Proceeds of Crime ──
  [
    "462.3",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.3.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.31",
    {
      title: "Laundering proceeds of crime",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-462.31.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.32",
    {
      title: "Special search warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.32.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.321",
    {
      title: "Special warrant — digital assets",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.321.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.33",
    {
      title: "Application for restraint order",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.33.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.331",
    {
      title: "Management order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.331.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.34",
    {
      title: "Application for review of special warrants and restraint orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.34.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.341",
    {
      title: "Application of property restitution provisions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.341.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.35",
    {
      title: "Expiration of special warrants and restraint orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.35.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.36",
    {
      title: "Forwarding to clerk where accused to stand trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.36.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.37",
    {
      title: "Order of forfeiture of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.37.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.371",
    {
      title: "Definition of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.371.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.38",
    {
      title: "Application for forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.38.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.39",
    {
      title: "Inference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.39.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.4",
    {
      title: "Voidable transfers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.4.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.41",
    {
      title: "Notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.41.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.42",
    {
      title: "Application by person claiming interest for relief from forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.42.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.43",
    {
      title: "Residual disposal of property seized or dealt with under special warrants or restraint orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.43.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.44",
    {
      title: "Appeals from certain orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.44.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.45",
    {
      title: "Suspension of forfeiture pending appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.45.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.46",
    {
      title: "Copies of documents returned or forfeited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.46.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.47",
    {
      title: "No civil or criminal liability incurred by informants",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.47.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.48",
    {
      title: "Definition of designated substance offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.48.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.49",
    {
      title: "Specific forfeiture provisions unaffected by this Part",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.49.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],
  [
    "462.5",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-462.5.html`,
      partOf: "Part XII.2 — Proceeds of Crime",
    },
  ],

  // ── Part XIII — Attempts — Conspiracies — Accessories ──
  [
    "463",
    {
      title: "Attempts, accessories",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-463.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "464",
    {
      title: "Counselling offence that is not committed",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-464.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "465",
    {
      title: "Conspiracy",
      severity: "Hybrid",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-465.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "466",
    {
      title: "Conspiracy in restraint of trade",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-466.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467",
    {
      title: "Saving",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-467.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-467.1.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.11",
    {
      title: "Participation in activities of criminal organization",
      severity: "Hybrid",
      maxPenalty: "5 years",
      url: `${JUSTICE_LAWS_BASE}/section-467.11.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.111",
    {
      title: "Recruitment of members by a criminal organization",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-467.111.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.12",
    {
      title: "Commission of offence for criminal organization",
      severity: "Indictable",
      maxPenalty: "14 years",
      url: `${JUSTICE_LAWS_BASE}/section-467.12.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.13",
    {
      title: "Instructing commission of offence for criminal organization",
      severity: "Indictable",
      maxPenalty: "Life imprisonment",
      url: `${JUSTICE_LAWS_BASE}/section-467.13.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],
  [
    "467.14",
    {
      title: "Sentences to be served consecutively",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-467.14.html`,
      partOf: "Part XIII — Attempts — Conspiracies — Accessories",
    },
  ],

  // ── Part XIV — Jurisdiction ──
  [
    "468",
    {
      title: "Superior court of criminal jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-468.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "469",
    {
      title: "Court of criminal jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-469.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "470",
    {
      title: "Jurisdiction over person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-470.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "471",
    {
      title: "Trial by jury compulsory",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-471.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "473",
    {
      title: "Trial without jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-473.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "474",
    {
      title: "Adjournment when no jury summoned",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-474.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "475",
    {
      title: "Accused absconding during trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-475.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "476",
    {
      title: "Special jurisdictions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-476.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "477",
    {
      title: "Definition of ship",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-477.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "477.1",
    {
      title: "Offences outside of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-477.1.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "477.2",
    {
      title: "Consent of Attorney General of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-477.2.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "477.3",
    {
      title: "Exercising powers of arrest, entry, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-477.3.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "477.4",
    {
      title: "Evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-477.4.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "478",
    {
      title: "Offence committed entirely in one province",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-478.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "479",
    {
      title: "Offence outstanding in same province",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-479.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "480",
    {
      title: "Offence in unorganized territory",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-480.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "481",
    {
      title: "Offence not in a province",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-481.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "481.1",
    {
      title: "Offence in Canadian waters",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-481.1.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "481.2",
    {
      title: "Offence outside Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-481.2.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "481.3",
    {
      title: "Appearance of accused at trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-481.3.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "482",
    {
      title: "Power to make rules",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-482.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],
  [
    "482.1",
    {
      title: "Power to make rules respecting case management",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-482.1.html`,
      partOf: "Part XIV — Jurisdiction",
    },
  ],

  // ── Part XV — Special Procedure and Powers ──
  [
    "483",
    {
      title: "Officials with powers of two justices",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-483.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "484",
    {
      title: "Preserving order in court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-484.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "485",
    {
      title: "Procedural irregularities",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-485.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "485.1",
    {
      title: "Recommencement where dismissal for want of prosecution",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-485.1.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "485.2",
    {
      title: "Summons — Identification of Criminals Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-485.2.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486",
    {
      title: "Exclusion of public",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.1",
    {
      title: "Support person or animal — witnesses under 18 or who have a disability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.1.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.2",
    {
      title: "Testimony outside court room — witnesses under 18 or who have a disability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.2.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.3",
    {
      title: "Accused not to cross-examine witness under 18",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.3.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.31",
    {
      title: "Non-disclosure of witness’ identity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.31.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.4",
    {
      title: "Order restricting publication  — sexual offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.4.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.5",
    {
      title: "Order restricting publication — victims and witnesses",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.5.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.51",
    {
      title: "Application — vary or revoke",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.51.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.6",
    {
      title: "Offence",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.6.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.7",
    {
      title: "Security of witnesses",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.7.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "486.71",
    {
      title: "For greater certainty",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-486.71.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487",
    {
      title: "Information for search warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.01",
    {
      title: "Information for general warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.01.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.011",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.011.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.012",
    {
      title: "Preservation demand",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.012.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.013",
    {
      title: "Preservation order — computer data",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.013.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0131",
    {
      title: "Keep account open or active order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0131.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.014",
    {
      title: "General production order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.014.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0141",
    {
      title: "Production order — specified dates",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0141.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.015",
    {
      title: "Production order to trace specified communication",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.015.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.016",
    {
      title: "Production order — transmission data",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.016.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.017",
    {
      title: "Production order —  tracking data",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.017.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.018",
    {
      title: "Production order — financial data",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.018.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.019",
    {
      title: "Conditions in preservation and production orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.019.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0191",
    {
      title: "Order prohibiting disclosure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0191.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0192",
    {
      title: "Particulars — production orders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0192.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.01921",
    {
      title: "Application for review of keep account open or active order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.01921.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0193",
    {
      title: "Application for review of production order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0193.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0194",
    {
      title: "Destruction of preserved computer data and documents — preservation demand",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0194.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0195",
    {
      title: "For greater certainty",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0195.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0196",
    {
      title: "Self-incrimination",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0196.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0197",
    {
      title: "Offence — preservation demand",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0197.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0198",
    {
      title: "Offence — preservation or production order",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0198.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0199",
    {
      title: "Offence — destruction of preserved data",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0199.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.02",
    {
      title: "Assistance order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.02.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.021",
    {
      title: "Review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.021.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.04",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.04.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.05",
    {
      title: "Information for warrant to take bodily substances for forensic DNA analysis",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.05.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.051",
    {
      title: "Order — primary designated offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.051.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.053",
    {
      title: "Timing of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.053.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.054",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.054.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.055",
    {
      title: "Offenders serving sentences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.055.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0551",
    {
      title: "Failure to appear",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0551.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0552",
    {
      title: "Failure to comply with order or summons",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0552.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.056",
    {
      title: "When collection to take place",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.056.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.057",
    {
      title: "Report of peace officer",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.057.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.058",
    {
      title: "No criminal or civil liability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.058.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.06",
    {
      title: "Investigative procedures",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.06.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.07",
    {
      title: "Duty to inform",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.07.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.071",
    {
      title: "Verification",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.071.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.08",
    {
      title: "Use of bodily substances — warrant",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.08.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.09",
    {
      title: "Destruction of bodily substances, etc. — warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.09.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.091",
    {
      title: "Collection of additional bodily substances",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.091.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.0911",
    {
      title: "Review by Attorney General",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.0911.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.092",
    {
      title: "Information for impression warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.092.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.093",
    {
      title: "Duty of person executing certain warrants",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.093.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.1",
    {
      title: "Warrants, etc., by telecommunication",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.1.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.11",
    {
      title: "Where warrant not necessary",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.11.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.2",
    {
      title: "Restriction on publication",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.2.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "487.3",
    {
      title: "Order denying access to information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-487.3.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "488",
    {
      title: "Execution of search warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-488.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "488.01",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-488.01.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "488.02",
    {
      title: "Documents",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-488.02.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "488.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-488.1.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "489",
    {
      title: "Seizure of things not specified",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-489.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "489.1",
    {
      title: "Restitution of thing or report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-489.1.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490",
    {
      title: "Detention of things seized",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.01",
    {
      title: "Perishable things",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.01.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.011",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.011.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.012",
    {
      title: "Order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.012.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.013",
    {
      title: "Date order begins",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.013.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.0131",
    {
      title: "Reasons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.0131.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.0132",
    {
      title: "Failure to make order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.0132.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.014",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.014.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.015",
    {
      title: "Application for termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.015.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.016",
    {
      title: "Termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.016.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.017",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.017.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.018",
    {
      title: "Requirements relating to notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.018.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.019",
    {
      title: "Obligation to comply",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.019.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02",
    {
      title: "Persons who may be served",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.021",
    {
      title: "Period for and method of service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.021.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.022",
    {
      title: "Date obligation begins",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.022.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.023",
    {
      title: "Application for exemption order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.023.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.024",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.024.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.025",
    {
      title: "Requirements relating to notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.025.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.026",
    {
      title: "Application for termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.026.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.027",
    {
      title: "Termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.027.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.028",
    {
      title: "Deemed application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.028.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02901",
    {
      title: "Obligation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02901.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02902",
    {
      title: "Persons who may be served",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02902.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02903",
    {
      title: "Period for and method of service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02903.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02904",
    {
      title: "When obligation begins",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02904.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02905",
    {
      title: "Application for exemption order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02905.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029051",
    {
      title: "Application for variation order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029051.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02906",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02906.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02907",
    {
      title: "Requirements relating to notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02907.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02908",
    {
      title: "Application for termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02908.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02909",
    {
      title: "Termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02909.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.0291",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.0291.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02911",
    {
      title: "Obligation to advise police service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02911.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029111",
    {
      title: "Application for exemption order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029111.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029112",
    {
      title: "Application for variation order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029112.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029113",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029113.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.029114",
    {
      title: "Requirements relating to notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.029114.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02912",
    {
      title: "Application for termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02912.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02913",
    {
      title: "Termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02913.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02914",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02914.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.02915",
    {
      title: "Notice before release",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.02915.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.03",
    {
      title: "Disclosure",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.03.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.031",
    {
      title: "Offence",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.031.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.0311",
    {
      title: "Offence",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.0311.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.0312",
    {
      title: "Offence",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.0312.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.03121",
    {
      title: "Warrant to arrest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.03121.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.032",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.032.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.04",
    {
      title: "Application for exemption order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.04.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.05",
    {
      title: "Application for variation order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.05.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.06",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.06.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.07",
    {
      title: "Requirements relating to notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.07.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.1",
    {
      title: "Order of forfeiture of property on conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.1.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.2",
    {
      title: "Application for in rem forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.2.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.3",
    {
      title: "Voidable transfers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.3.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.4",
    {
      title: "Notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.4.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.41",
    {
      title: "Notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.41.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.5",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.5.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.6",
    {
      title: "Appeals from orders under subsection 490.2(2)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.6.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.7",
    {
      title: "Suspension of order pending appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.7.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.8",
    {
      title: "Application for restraint order",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.8.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.81",
    {
      title: "Management order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.81.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "490.9",
    {
      title: "Sections 489.1 and 490 applicable",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-490.9.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "491",
    {
      title: "Forfeiture of weapons and ammunition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-491.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "491.1",
    {
      title: "Order for restitution or forfeiture of property obtained by crime",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-491.1.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "491.2",
    {
      title: "Photographic evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-491.2.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "492",
    {
      title: "Seizure of explosives",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "492.1",
    {
      title: "Warrant for tracking device — transactions and things",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.1.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],
  [
    "492.2",
    {
      title: "Warrant for transmission data recorder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.2.html`,
      partOf: "Part XV — Special Procedure and Powers",
    },
  ],

  // ── Part XV.1 — Unreasonable Delay ──
  [
    "492.21",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.21.html`,
      summary:
        "Defines terms used in this Part: 'court' means a court seized of an application for a determination of unreasonable delay, and 'unreasonable delay' means a delay exceeding the reasonable time to be tried under paragraph 11(b) of the Charter.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.22",
    {
      title: "Jurisdiction not lost",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.22.html`,
      summary:
        "States that a finding of unreasonable delay does not deprive the court seized of the proceedings of jurisdiction over the offence, the accused, or the offender.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.23",
    {
      title: "Stay of proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.23.html`,
      summary:
        "Provides that a court cannot order a stay of proceedings based on a finding of unreasonable delay except in accordance with this Part.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.24",
    {
      title: "Common law rules and principles",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.24.html`,
      summary:
        "States that common law rules and principles for determining unreasonable delay continue to apply except where they are altered by or inconsistent with this Part.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.25",
    {
      title: "Reasonable steps to inform",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.25.html`,
      summary:
        "Requires the prosecutor to take reasonable steps to inform any victim of the offence that an unreasonable delay application has been filed and, later, of the court's decision on it, and requires the court to ask whether the victims were informed of the filing. States that a prosecutor's failure to inform the victims does not prevent the court from deciding the application.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.26",
    {
      title: "Case complexity — factors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.26.html`,
      summary:
        "Directs the court, in determining whether there has been or will be unreasonable delay, to consider factors that make the case complex, including, where applications or motions are involved, their number, scheduling, required adjournments, judicial decisions needed, cumulative court time, and resulting need for trial continuation dates.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.27",
    {
      title: "Exclusions — sexual offence proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.27.html`,
      summary:
        "Sets out periods that a court must exclude from its delay calculation when an application under section 276.01, 278.12, 278.21, or 278.3 was filed or served less than 60 days before its scheduled hearing, covering the time taken to hear the application and any other period attributable to the late filing or service.",
      relatedSections: ["492.3", "276.01", "276.02", "278.12", "278.21", "278.13"],
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.28",
    {
      title: "Exclusions — Canada Evidence Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.28.html`,
      summary:
        "Sets out periods relating to objections and applications under sections 37 and 38.01 to 38.04 of the Canada Evidence Act that a court must exclude when calculating delay, running from when the objection or application was made until it was finally determined.",
      relatedSections: ["492.3"],
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.29",
    {
      title: "Exclusion — Canadian Security Intelligence Service Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.29.html`,
      summary:
        "States that a court must exclude, from its delay calculation, the period beginning when an application under subsection 18.1(4) of the Canadian Security Intelligence Service Act was made and ending when it was finally determined.",
      relatedSections: ["492.3"],
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.3",
    {
      title: "Actions not made in good faith",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.3.html`,
      summary:
        "States that, in determining which days are excluded under sections 492.27 to 492.29, the court must take into account any frivolous or dilatory action, or action not made in good faith, taken by the prosecutor or those acting for the prosecutor or the Attorney General of Canada.",
      relatedSections: ["492.27", "492.28", "492.29"],
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],
  [
    "492.31",
    {
      title: "Alternative remedies to be considered",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-492.31.html`,
      summary:
        "Provides that a court cannot order a stay of proceedings for unreasonable delay unless satisfied that no other remedy would be appropriate and just, and sets out the factors the court must weigh in choosing an alternative remedy, including the stage of proceedings, impact on victims, prejudice to the accused or offender, public confidence in the administration of justice, and society's interest in a final decision on the merits.",
      partOf: "Part XV.1 — Unreasonable Delay",
    },
  ],

  // ── Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release ──
  [
    "493",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-493.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "493.01",
    {
      title: "Clarification — indictable offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-493.01.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "493.1",
    {
      title: "Principle of restraint",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-493.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "493.11",
    {
      title: "Clarification",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-493.11.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "493.2",
    {
      title: "Aboriginal accused or vulnerable populations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-493.2.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "494",
    {
      title: "Arrest without warrant by any person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-494.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "495",
    {
      title: "Arrest without warrant by peace officer",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-495.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "495.1",
    {
      title: "Arrest without warrant — application of section 524",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-495.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "496",
    {
      title: "Appearance notice for judicial referral hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-496.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "497",
    {
      title: "Issue of appearance notice by peace officer",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-497.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "498",
    {
      title: "Release from custody — arrest without warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-498.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "499",
    {
      title: "Release from custody — arrest with warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-499.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "500",
    {
      title: "Contents of appearance notice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-500.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "501",
    {
      title: "Contents of undertaking",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-501.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "502",
    {
      title: "Variation of undertaking on consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-502.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "502.1",
    {
      title: "Appearance of the accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-502.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "503",
    {
      title: "Taking before justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-503.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "504",
    {
      title: "In what cases justice may receive information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-504.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "505",
    {
      title: "Time within which information to be laid in certain cases",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-505.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "506",
    {
      title: "Form",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-506.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "507",
    {
      title: "Justice to hear informant and witnesses — public prosecutions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-507.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "507.1",
    {
      title: "Referral when private prosecution",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-507.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "508",
    {
      title: "Justice to hear informant and witnesses",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-508.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "508.1",
    {
      title: "Information laid otherwise than in person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-508.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "509",
    {
      title: "Summons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-509.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "511",
    {
      title: "Contents of warrant to arrest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-511.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "512",
    {
      title: "Certain actions not to preclude issue of warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-512.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "512.1",
    {
      title: "Arrest warrant — failure to appear under summons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-512.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "512.2",
    {
      title: "Arrest warrant — failure to appear under appearance notice or undertaking",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-512.2.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "512.3",
    {
      title: "Warrant to appear under section 524",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-512.3.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "513",
    {
      title: "Formalities of warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-513.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "514",
    {
      title: "Execution of warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-514.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "515",
    {
      title: "Release order without conditions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-515.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "515.01",
    {
      title: "Attendance — Identification of Criminals Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-515.01.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "515.1",
    {
      title: "Declaration of surety",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-515.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "516",
    {
      title: "Adjournment of proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-516.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "516.1",
    {
      title: "Remand in custody — non-communication order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-516.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "517",
    {
      title: "Order directing matters not to be published for specified period",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-517.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "518",
    {
      title: "Inquiries to be made by justice and evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-518.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "519",
    {
      title: "Release of accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-519.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "519.1",
    {
      title: "Variation of release order with consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-519.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "520",
    {
      title: "Review of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-520.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "521",
    {
      title: "Review of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-521.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "522",
    {
      title: "Interim release by judge only",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-522.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "523",
    {
      title: "Period for which appearance notice, etc., continues in force",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-523.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "523.1",
    {
      title: "Judicial referral hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-523.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "524",
    {
      title: "Hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-524.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "525",
    {
      title: "Time for application to judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-525.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "526",
    {
      title: "Directions for expediting proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-526.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "527",
    {
      title: "Procuring attendance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-527.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "528",
    {
      title: "Endorsing warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-528.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529",
    {
      title: "Including authorization to enter in warrant of arrest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529.1",
    {
      title: "Warrant to enter dwelling-house",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.1.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529.2",
    {
      title: "Reasonable terms and conditions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.2.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529.3",
    {
      title: "Authority to enter dwelling without warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.3.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529.4",
    {
      title: "Omitting announcement before entry",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.4.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],
  [
    "529.5",
    {
      title: "Means of telecommunication",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-529.5.html`,
      partOf: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release",
    },
  ],

  // ── Part XVII — Language of Accused ──
  [
    "530",
    {
      title: "Language of accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-530.html`,
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "530.01",
    {
      title: "Translation of documents",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-530.01.html`,
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "530.1",
    {
      title: "If order granted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-530.1.html`,
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "530.2",
    {
      title: "Language used in proceeding",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-530.2.html`,
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "531",
    {
      title: "Change of venue",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-531.html`,
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "532",
    {
      title: "Saving",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-532.html`,
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "533",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-533.html`,
      partOf: "Part XVII — Language of Accused",
    },
  ],
  [
    "533.1",
    {
      title: "Review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-533.1.html`,
      partOf: "Part XVII — Language of Accused",
    },
  ],

  // ── Part XVIII — Procedure on Preliminary Inquiry ──
  [
    "535",
    {
      title: "Inquiry by justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-535.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536",
    {
      title: "Remand by justice to provincial court judge in certain cases",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536.1",
    {
      title: "Remand by justice — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.1.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536.2",
    {
      title: "Elections and re-elections in writing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.2.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536.3",
    {
      title: "Statement of issues and witnesses",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.3.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536.4",
    {
      title: "Order for hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.4.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "536.5",
    {
      title: "Agreement to limit scope of preliminary inquiry",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-536.5.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "537",
    {
      title: "Powers of justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-537.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "538",
    {
      title: "Organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-538.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "539",
    {
      title: "Order restricting publication of evidence taken at preliminary inquiry",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-539.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "540",
    {
      title: "Taking evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-540.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "541",
    {
      title: "Hearing of witnesses",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-541.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "542",
    {
      title: "Confession or admission of accused",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-542.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "543",
    {
      title: "Order that accused appear or be taken before justice where offence alleged to have been committed",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-543.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "544",
    {
      title: "Accused absconding during inquiry",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-544.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "545",
    {
      title: "Witness refusing to be examined",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-545.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "546",
    {
      title: "Irregularity or variance not to affect validity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-546.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "547",
    {
      title: "Adjournment if accused misled",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-547.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "547.1",
    {
      title: "Inability of justice to continue",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-547.1.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "548",
    {
      title: "Order to stand trial or discharge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-548.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "549",
    {
      title: "Order to stand trial at any stage of inquiry with consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-549.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "550",
    {
      title: "Recognizance of witness",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-550.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],
  [
    "551",
    {
      title: "Transmission of record by justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.html`,
      partOf: "Part XVIII — Procedure on Preliminary Inquiry",
    },
  ],

  // ── Part XVIII.1 — Case Management Judge ──
  [
    "551.1",
    {
      title: "Appointment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.1.html`,
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.2",
    {
      title: "Role",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.2.html`,
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.3",
    {
      title: "Powers before evidence on merits presented",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.3.html`,
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.4",
    {
      title: "Information relevant to presentation of evidence on merits to be part of court record",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.4.html`,
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.5",
    {
      title: "Trial continuous",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.5.html`,
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.6",
    {
      title: "Issues referred to case management judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.6.html`,
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],
  [
    "551.7",
    {
      title: "Decision whether to hold joint hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-551.7.html`,
      partOf: "Part XVIII.1 — Case Management Judge",
    },
  ],

  // ── Part XIX — Indictable Offences — Trial Without Jury ──
  [
    "552",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-552.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "553",
    {
      title: "Absolute jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-553.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "554",
    {
      title: "Trial by provincial court judge with consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-554.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "555",
    {
      title: "If charge should be prosecuted by indictment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-555.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "555.1",
    {
      title: "If charge should be prosecuted by indictment — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-555.1.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "556",
    {
      title: "Organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-556.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "557",
    {
      title: "Taking evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-557.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "558",
    {
      title: "Trial by judge without a jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-558.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "559",
    {
      title: "Court of record",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-559.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "560",
    {
      title: "Duty of judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-560.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "561",
    {
      title: "Right to re-elect",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-561.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "561.1",
    {
      title: "Right to re-elect with consent — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-561.1.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "562",
    {
      title: "Proceedings following re-election",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-562.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "562.1",
    {
      title: "Proceedings following re-election — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-562.1.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "563",
    {
      title: "Proceedings on re-election to be tried by provincial court judge without jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-563.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "563.1",
    {
      title: "Proceedings on re-election to be tried by judge without jury — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-563.1.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "565",
    {
      title: "Election deemed to have been made",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-565.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "566",
    {
      title: "Indictment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-566.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "566.1",
    {
      title: "Indictment — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-566.1.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "567",
    {
      title: "Mode of trial when two or more accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-567.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "567.1",
    {
      title: "Mode of trial if two or more accused — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-567.1.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "568",
    {
      title: "Attorney General may require trial by jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-568.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "569",
    {
      title: "Attorney General may require trial by jury — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-569.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "570",
    {
      title: "Record of conviction or order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-570.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "571",
    {
      title: "Adjournment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-571.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],
  [
    "572",
    {
      title: "Application of Parts XVI, XVIII, XX and XXIII",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-572.html`,
      partOf: "Part XIX — Indictable Offences — Trial Without Jury",
    },
  ],

  // ── Part XIX.1 — Nunavut Court of Justice ──
  [
    "573",
    {
      title: "Nunavut Court of Justice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-573.html`,
      partOf: "Part XIX.1 — Nunavut Court of Justice",
    },
  ],
  [
    "573.1",
    {
      title: "Application for review — Nunavut",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-573.1.html`,
      partOf: "Part XIX.1 — Nunavut Court of Justice",
    },
  ],
  [
    "573.2",
    {
      title: "Habeas corpus",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-573.2.html`,
      partOf: "Part XIX.1 — Nunavut Court of Justice",
    },
  ],

  // ── Part XX — Procedure in Jury Trials and General Provisions ──
  [
    "574",
    {
      title: "Prosecutor may prefer indictment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-574.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "576",
    {
      title: "Indictment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-576.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "577",
    {
      title: "Direct indictments",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-577.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "578",
    {
      title: "Summons or warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-578.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "579",
    {
      title: "Attorney General may direct stay",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-579.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "579.001",
    {
      title: "Instruction to stay",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-579.001.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "579.01",
    {
      title: "When Attorney General does not stay proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-579.01.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "579.1",
    {
      title: "Intervention by Attorney General of Canada or Director of Public Prosecutions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-579.1.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "580",
    {
      title: "Form of indictment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-580.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "581",
    {
      title: "Substance of offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-581.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "582",
    {
      title: "High treason and first degree murder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-582.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "583",
    {
      title: "Certain omissions not grounds for objection",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-583.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "584",
    {
      title: "Sufficiency of count charging libel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-584.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "585",
    {
      title: "Sufficiency of count charging perjury, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-585.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "586",
    {
      title: "Sufficiency of count relating to fraud",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-586.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "587",
    {
      title: "What may be ordered",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-587.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "588",
    {
      title: "Ownership",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-588.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "589",
    {
      title: "Count for murder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-589.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "590",
    {
      title: "Offences may be charged in the alternative",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-590.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "591",
    {
      title: "Joinder of counts",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-591.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "592",
    {
      title: "Accessories after the fact",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-592.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "593",
    {
      title: "Trial of persons jointly",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-593.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "597",
    {
      title: "Bench warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-597.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "598",
    {
      title: "Election deemed to be waived",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-598.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "599",
    {
      title: "Reasons for change of venue",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-599.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "600",
    {
      title: "Order is authority to remove prisoner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-600.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "601",
    {
      title: "Amending defective indictment or count",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-601.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "603",
    {
      title: "Right of accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-603.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "605",
    {
      title: "Release of exhibits for testing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-605.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "606",
    {
      title: "Pleas permitted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-606.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "607",
    {
      title: "Special pleas",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-607.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "608",
    {
      title: "Evidence of identity of charges",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-608.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "609",
    {
      title: "What determines identity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-609.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "610",
    {
      title: "Circumstances of aggravation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-610.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "611",
    {
      title: "Libel, plea of justification",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-611.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "612",
    {
      title: "Plea of justification necessary",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-612.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "613",
    {
      title: "Plea of not guilty",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-613.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "620",
    {
      title: "Appearance by attorney",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-620.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "621",
    {
      title: "Notice to organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-621.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "622",
    {
      title: "Procedure on default of appearance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-622.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "623",
    {
      title: "Trial of organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-623.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "624",
    {
      title: "How recorded",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-624.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "625",
    {
      title: "Form of record in case of amendment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-625.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "625.1",
    {
      title: "Pre-hearing conference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-625.1.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "626",
    {
      title: "Qualification of jurors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-626.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "626.1",
    {
      title: "Presiding judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-626.1.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "627",
    {
      title: "Support for juror with physical disability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-627.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "629",
    {
      title: "Challenging the jury panel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-629.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "630",
    {
      title: "Trying ground of challenge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-630.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "631",
    {
      title: "Names of jurors on cards",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-631.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "631.1",
    {
      title: "Electronic or automated means",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-631.1.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "632",
    {
      title: "Excusing jurors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-632.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "633",
    {
      title: "Stand by",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-633.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "635",
    {
      title: "Order of challenges",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-635.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "638",
    {
      title: "Challenge for cause",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-638.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "639",
    {
      title: "Challenge in writing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-639.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "640",
    {
      title: "Determination of challenge for cause",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-640.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "641",
    {
      title: "Calling persons who have stood by",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-641.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "642",
    {
      title: "Summoning other jurors when panel exhausted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-642.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "642.1",
    {
      title: "Substitution of alternate jurors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-642.1.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "643",
    {
      title: "Who shall be the jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-643.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "644",
    {
      title: "Discharge of juror",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-644.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "645",
    {
      title: "Trial continuous",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-645.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "646",
    {
      title: "Taking evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-646.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "647",
    {
      title: "Separation of jurors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-647.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "648",
    {
      title: "Restriction on publication",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-648.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "649",
    {
      title: "Disclosure of jury proceedings",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-649.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "650",
    {
      title: "Accused to be present",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-650.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "650.01",
    {
      title: "Designation of counsel of record",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-650.01.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "650.02",
    {
      title: "Remote appearance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-650.02.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "650.1",
    {
      title: "Pre-charge conference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-650.1.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "651",
    {
      title: "Summing up by prosecutor",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-651.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "652",
    {
      title: "View",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-652.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "652.1",
    {
      title: "Trying of issues of indictment by jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-652.1.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "653",
    {
      title: "Disagreement of jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-653.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "653.1",
    {
      title: "Mistrial — rulings binding at new trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-653.1.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "654",
    {
      title: "Proceeding on Sunday, etc., not invalid",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-654.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "655",
    {
      title: "Admissions at trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-655.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "656",
    {
      title: "Presumption — valuable minerals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-656.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "657",
    {
      title: "Use in evidence of statement by accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-657.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "657.1",
    {
      title: "Proof of ownership and value of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-657.1.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "657.2",
    {
      title: "Theft and possession",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-657.2.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "657.3",
    {
      title: "Expert testimony",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-657.3.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "657.4",
    {
      title: "Proof of absence of consent — identity information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-657.4.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "658",
    {
      title: "Testimony as to date of birth",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-658.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "659",
    {
      title: "Children’s evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-659.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "660",
    {
      title: "Full offence charged, attempt proved",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-660.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "661",
    {
      title: "Attempt charged, full offence proved",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-661.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "662",
    {
      title: "Offence charged, part only proved",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-662.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "663",
    {
      title: "No acquittal unless act or omission not wilful",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-663.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "664",
    {
      title: "No reference to previous conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-664.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "666",
    {
      title: "Evidence of character",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-666.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "667",
    {
      title: "Proof of previous conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-667.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "669.1",
    {
      title: "Jurisdiction",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-669.1.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "669.2",
    {
      title: "Continuation of proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-669.2.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "669.3",
    {
      title: "Jurisdiction when appointment to another court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-669.3.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "670",
    {
      title: "Judgment not to be stayed on certain grounds",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-670.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "671",
    {
      title: "Directions respecting jury or jurors directory",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-671.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],
  [
    "672",
    {
      title: "Saving powers of court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.html`,
      partOf: "Part XX — Procedure in Jury Trials and General Provisions",
    },
  ],

  // ── Part XX.1 — Mental Disorder ──
  [
    "672.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.1.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.11",
    {
      title: "Assessment order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.11.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.12",
    {
      title: "Where court may order assessment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.12.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.121",
    {
      title: "Review Board may order assessment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.121.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.13",
    {
      title: "Contents of assessment order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.13.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.14",
    {
      title: "General rule for period",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.14.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.15",
    {
      title: "Extension",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.15.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.16",
    {
      title: "Presumption against custody",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.16.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.17",
    {
      title: "Assessment order takes precedence over bail hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.17.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.18",
    {
      title: "Application to vary assessment order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.18.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.19",
    {
      title: "No treatment order on assessment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.19.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.191",
    {
      title: "When assessment completed",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.191.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.2",
    {
      title: "Assessment report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.2.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.21",
    {
      title: "Definition of protected statement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.21.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.22",
    {
      title: "Presumption of fitness",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.22.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.23",
    {
      title: "Court may direct issue to be tried",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.23.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.24",
    {
      title: "Counsel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.24.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.25",
    {
      title: "Postponing trial of issue",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.25.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.26",
    {
      title: "Trial of issue by judge and jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.26.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.27",
    {
      title: "Trial of issue by court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.27.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.28",
    {
      title: "Proceeding continues where accused is fit",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.28.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.29",
    {
      title: "Where continued detention in custody",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.29.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.3",
    {
      title: "Acquittal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.3.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.31",
    {
      title: "Verdict of unfit to stand trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.31.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.32",
    {
      title: "Subsequent proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.32.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.33",
    {
      title: "Prima facie case to be made every two years",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.33.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.34",
    {
      title: "Verdict of not criminally responsible on account of mental disorder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.34.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.35",
    {
      title: "Effect of verdict of not criminally responsible on account of mental disorder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.35.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.36",
    {
      title: "Verdict not a previous conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.36.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.37",
    {
      title: "Definition of application for federal employment",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.37.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.38",
    {
      title: "Review Boards to be established",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.38.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.39",
    {
      title: "Members of Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.39.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.4",
    {
      title: "Chairperson of a Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.4.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.41",
    {
      title: "Quorum of Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.41.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.42",
    {
      title: "Majority vote",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.42.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.43",
    {
      title: "Powers of Review Boards",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.43.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.44",
    {
      title: "Rules of Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.44.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.45",
    {
      title: "Hearing to be held by a court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.45.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.46",
    {
      title: "Status quo pending Review Board hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.46.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.47",
    {
      title: "Review Board to make disposition where court does not",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.47.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.48",
    {
      title: "Review Board to determine fitness",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.48.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.49",
    {
      title: "Continued detention in hospital",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.49.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.5",
    {
      title: "Procedure at disposition hearing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.5.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.501",
    {
      title: "Order restricting publication — sexual offences",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.501.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.5011",
    {
      title: "Variation or revocation of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.5011.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.51",
    {
      title: "Definition of disposition information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.51.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.52",
    {
      title: "Record of proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.52.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.53",
    {
      title: "Proceedings not invalid",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.53.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.54",
    {
      title: "Dispositions that may be made",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.54.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.5401",
    {
      title: "Significant threat to safety of public",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.5401.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.541",
    {
      title: "Victim impact statement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.541.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.542",
    {
      title: "Additional conditions — safety and security",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.542.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.55",
    {
      title: "Treatment not a condition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.55.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.56",
    {
      title: "Delegated authority to vary restrictions on liberty of accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.56.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.57",
    {
      title: "Warrant of committal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.57.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.58",
    {
      title: "Treatment disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.58.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.59",
    {
      title: "Criteria for disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.59.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.6",
    {
      title: "Notice required",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.6.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.61",
    {
      title: "Exception",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.61.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.62",
    {
      title: "Consent of hospital required for treatment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.62.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.63",
    {
      title: "Effective date of disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.63.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.64",
    {
      title: "Finding",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.64.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.67",
    {
      title: "Where court imposes a sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.67.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.68",
    {
      title: "Definition of Minister",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.68.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.69",
    {
      title: "Minister and Review Board entitled to access",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.69.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.7",
    {
      title: "Notice of discharge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.7.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.71",
    {
      title: "Detention to count as service of term",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.71.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.72",
    {
      title: "Grounds for appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.72.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.73",
    {
      title: "Appeal on the transcript",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.73.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.74",
    {
      title: "Notice of appeal to be given to court or Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.74.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.75",
    {
      title: "Automatic suspension of certain dispositions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.75.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.76",
    {
      title: "Application respecting dispositions under appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.76.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.77",
    {
      title: "Effect of suspension of disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.77.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.78",
    {
      title: "Powers of court of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.78.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.81",
    {
      title: "Mandatory review of dispositions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.81.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.82",
    {
      title: "Discretionary review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.82.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.83",
    {
      title: "Disposition by Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.83.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.84",
    {
      title: "Review of finding — high-risk accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.84.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.85",
    {
      title: "Bringing accused before Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.85.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.851",
    {
      title: "Recommendation by Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.851.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.852",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.852.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.86",
    {
      title: "Interprovincial transfers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.86.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.87",
    {
      title: "Delivery and detention of accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.87.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.88",
    {
      title: "Review Board of receiving province",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.88.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.89",
    {
      title: "Other interprovincial transfers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.89.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.9",
    {
      title: "Execution of warrant anywhere in Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.9.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.91",
    {
      title: "Arrest without warrant for contravention of disposition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.91.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.92",
    {
      title: "Release or delivery of accused subject to paragraph 672.54(b) disposition order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.92.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.93",
    {
      title: "Where justice to release accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.93.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.94",
    {
      title: "Powers of Review Board",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.94.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],
  [
    "672.95",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-672.95.html`,
      partOf: "Part XX.1 — Mental Disorder",
    },
  ],

  // ── Part XXI — Appeals — Indictable Offences ──
  [
    "673",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-673.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "674",
    {
      title: "Procedure abolished",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-674.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "675",
    {
      title: "Right of appeal of person convicted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-675.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "676",
    {
      title: "Right of Attorney General to appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-676.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "676.1",
    {
      title: "Appeal re costs",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-676.1.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "677",
    {
      title: "Specifying grounds of dissent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-677.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "678",
    {
      title: "Notice of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-678.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "678.1",
    {
      title: "Service where respondent cannot be found",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-678.1.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "679",
    {
      title: "Release pending determination of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-679.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "680",
    {
      title: "Review by court of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-680.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "682",
    {
      title: "Report by judge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-682.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "683",
    {
      title: "Powers of court of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-683.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "684",
    {
      title: "Legal assistance for appellant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-684.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "685",
    {
      title: "Summary determination of frivolous appeals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-685.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "686",
    {
      title: "Powers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-686.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "687",
    {
      title: "Powers of court on appeal against sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-687.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "688",
    {
      title: "Right of appellant to attend",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-688.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "689",
    {
      title: "Restitution or forfeiture of property",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-689.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "691",
    {
      title: "Appeal from conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-691.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "692",
    {
      title: "Appeal against affirmation of verdict of not criminally responsible on account of mental disorder",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-692.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "693",
    {
      title: "Appeal by Attorney General",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-693.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "694",
    {
      title: "Notice of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-694.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "694.1",
    {
      title: "Legal assistance for accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-694.1.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "694.2",
    {
      title: "Right of appellant to attend",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-694.2.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "695",
    {
      title: "Order of Supreme Court of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-695.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],
  [
    "696",
    {
      title: "Right of Attorney General of Canada to appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.html`,
      partOf: "Part XXI — Appeals — Indictable Offences",
    },
  ],

  // ── Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice ──
  [
    "696.1",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.1.html`,
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],
  [
    "696.2",
    {
      title: "Review of applications",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.2.html`,
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],
  [
    "696.3",
    {
      title: "Definition of court of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.3.html`,
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],
  [
    "696.4",
    {
      title: "Considerations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.4.html`,
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],
  [
    "696.5",
    {
      title: "Annual report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.5.html`,
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],
  [
    "696.6",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.6.html`,
      partOf: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice",
    },
  ],

  // ── Part XXI.2 — Miscarriage of Justice Review Commission ──
  [
    "696.7",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.7.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.71",
    {
      title: "Commission established",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.71.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.72",
    {
      title: "Mandate",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.72.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.73",
    {
      title: "Diversity",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.73.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.74",
    {
      title: "Full- or part-time commissioners",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.74.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.75",
    {
      title: "Knowledge and experience",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.75.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.76",
    {
      title: "Role of Chief Commissioner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.76.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.77",
    {
      title: "Term of office",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.77.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.78",
    {
      title: "Remuneration",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.78.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.79",
    {
      title: "Meetings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.79.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.8",
    {
      title: "Accessibility",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.8.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.81",
    {
      title: "Outreach",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.81.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.82",
    {
      title: "Transparency",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.82.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.83",
    {
      title: "Policies",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.83.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.84",
    {
      title: "Powers",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.84.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.85",
    {
      title: "Security requirements",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.85.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.86",
    {
      title: "Public Service Employment Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.86.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],
  [
    "696.87",
    {
      title: "Annual report",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-696.87.html`,
      partOf: "Part XXI.2 — Miscarriage of Justice Review Commission",
    },
  ],

  // ── Part XXII — Procuring Attendance ──
  [
    "697",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-697.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "698",
    {
      title: "Subpoena",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-698.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "699",
    {
      title: "Who may issue",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-699.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "700",
    {
      title: "Contents of subpoena",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-700.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "700.1",
    {
      title: "Video links",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-700.1.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "701",
    {
      title: "Service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-701.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "701.1",
    {
      title: "Service in accordance with provincial laws",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-701.1.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "702",
    {
      title: "Subpoena effective throughout Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-702.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "703",
    {
      title: "Warrant effective throughout Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-703.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "703.1",
    {
      title: "Summons effective throughout Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-703.1.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "703.2",
    {
      title: "Service of process on an organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-703.2.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "704",
    {
      title: "Warrant for absconding witness",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-704.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "705",
    {
      title: "Warrant if witness does not attend",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-705.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "705.1",
    {
      title: "Release — undertaking",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-705.1.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "706",
    {
      title: "If witness arrested under warrant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-706.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "707",
    {
      title: "Maximum period for detention of witness",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-707.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "708",
    {
      title: "Contempt",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-708.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "708.1",
    {
      title: "Electronically transmitted copies",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-708.1.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "709",
    {
      title: "Order appointing commissioner",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-709.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "710",
    {
      title: "Application where witness is ill",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-710.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "711",
    {
      title: "Admitting evidence of witness who is ill",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-711.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "712",
    {
      title: "Application for order when witness out of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-712.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "713",
    {
      title: "Providing for presence of accused counsel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-713.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "713.1",
    {
      title: "Evidence not excluded",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-713.1.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714",
    {
      title: "Rules and practice same as in civil cases",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.1",
    {
      title: "Audioconference and videoconference — witness in Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.1.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.2",
    {
      title: "Videoconference — witness outside Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.2.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.3",
    {
      title: "Audioconference — witness outside Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.3.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.4",
    {
      title: "Reasons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.4.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.41",
    {
      title: "Cessation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.41.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.5",
    {
      title: "Oath or affirmation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.5.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.6",
    {
      title: "Other laws about witnesses to apply",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.6.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.7",
    {
      title: "Costs of technology",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.7.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "714.8",
    {
      title: "Consent",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-714.8.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "715",
    {
      title: "Evidence at preliminary inquiry may be read at trial in certain cases",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "715.01",
    {
      title: "Transcript of evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.01.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "715.1",
    {
      title: "Evidence of victim or witness under 18",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.1.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],
  [
    "715.2",
    {
      title: "Evidence of victim or witness who has a disability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.2.html`,
      partOf: "Part XXII — Procuring Attendance",
    },
  ],

  // ── Part XXII.01 — Remote Attendance by Certain Persons ──
  [
    "715.21",
    {
      title: "Attendance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.21.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.22",
    {
      title: "Provisions providing for audioconference or videoconference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.22.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.221",
    {
      title: "Reasons",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.221.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.222",
    {
      title: "Cessation",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.222.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.23",
    {
      title: "Considerations — appearance by audioconference or videoconference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.23.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.231",
    {
      title: "Preliminary inquiry",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.231.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.232",
    {
      title: "Trial — summary conviction offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.232.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.233",
    {
      title: "Trial — indictable offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.233.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.234",
    {
      title: "Plea",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.234.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.235",
    {
      title: "Sentencing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.235.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.24",
    {
      title: "Proceedings not expressly provided for",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.24.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.241",
    {
      title: "Accused in custody — no evidence taken",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.241.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.242",
    {
      title: "Conditions — no access to legal advice",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.242.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.243",
    {
      title: "Communication with counsel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.243.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.25",
    {
      title: "Definition of participant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.25.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.26",
    {
      title: "Presiding by audioconference or videoconference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.26.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],
  [
    "715.27",
    {
      title: "Definition of prospective juror",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.27.html`,
      partOf: "Part XXII.01 — Remote Attendance by Certain Persons",
    },
  ],

  // ── Part XXII.1 — Remediation Agreements ──
  [
    "715.3",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.3.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.31",
    {
      title: "Purpose",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.31.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.32",
    {
      title: "Conditions for remediation agreement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.32.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.33",
    {
      title: "Notice to organization — invitation to negotiate",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.33.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.34",
    {
      title: "Mandatory contents of agreement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.34.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.35",
    {
      title: "Independent monitor — conflict of interest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.35.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.36",
    {
      title: "Duty to inform victims",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.36.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.37",
    {
      title: "Application for court approval",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.37.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.38",
    {
      title: "Variation order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.38.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.39",
    {
      title: "Termination order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.39.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.4",
    {
      title: "Order declaring successful completion",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.4.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.41",
    {
      title: "Deadline",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.41.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.42",
    {
      title: "Publication",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.42.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],
  [
    "715.43",
    {
      title: "Regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.43.html`,
      partOf: "Part XXII.1 — Remediation Agreements",
    },
  ],

  // ── Part XXII.2 — Alternative Measures and Restorative Justice Processes ──
  [
    "715.44",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.44.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.45",
    {
      title: "Purpose",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.45.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.46",
    {
      title: "Principles",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.46.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.47",
    {
      title: "Warnings and referrals — police",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.47.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.48",
    {
      title: "Warnings and referrals — prosecutor",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.48.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.49",
    {
      title: "Conditions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.49.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.5",
    {
      title: "Restrictions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.5.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.51",
    {
      title: "Admissions not admissible in evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.51.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.52",
    {
      title: "No bar to proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.52.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.53",
    {
      title: "Principles",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.53.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.54",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.54.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.55",
    {
      title: "Conference may be convened",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.55.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.56",
    {
      title: "Records — warnings or referrals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.56.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.57",
    {
      title: "Record keeping",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.57.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.58",
    {
      title: "Police records",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.58.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.59",
    {
      title: "Government records",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.59.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],
  [
    "715.6",
    {
      title: "Disclosure of records",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-715.6.html`,
      partOf: "Part XXII.2 — Alternative Measures and Restorative Justice Processes",
    },
  ],

  // ── Part XXIII — Sentencing ──
  [
    "716",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-716.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718",
    {
      title: "Purpose",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.01",
    {
      title: "Objectives — offences against children",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.01.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.02",
    {
      title: "Objectives — offence against peace officer or other justice system participant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.02.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.03",
    {
      title: "Objectives — offence against certain animals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.03.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.04",
    {
      title: "Objectives — offence against vulnerable person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.04.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.05",
    {
      title: "Objectives — offence of motor vehicle theft when violence used",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.05.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.06",
    {
      title: "Objectives — offence of breaking and entering",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.06.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.07",
    {
      title: "Objectives — offence for the benefit of a criminal organization",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.07.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.1",
    {
      title: "Fundamental principle",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.2",
    {
      title: "Other sentencing principles",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.201",
    {
      title: "Additional consideration — increased vulnerability",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.201.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.21",
    {
      title: "Additional factors",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.21.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.3",
    {
      title: "Degrees of punishment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.3.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "718.4",
    {
      title: "Shorter term of imprisonment than minimum punishment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-718.4.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "719",
    {
      title: "Commencement of sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-719.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "720",
    {
      title: "Sentencing proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-720.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "721",
    {
      title: "Report by probation officer",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-721.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "722",
    {
      title: "Victim impact statement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-722.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "722.1",
    {
      title: "Copy of statement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-722.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "722.2",
    {
      title: "Community impact statement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-722.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "723",
    {
      title: "Submissions on facts",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-723.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "724",
    {
      title: "Information accepted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-724.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "725",
    {
      title: "Other offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-725.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726",
    {
      title: "Offender may speak to sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.1",
    {
      title: "Relevant information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.11",
    {
      title: "Endorsement — offence under subsection 263.1(1)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.11.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.2",
    {
      title: "Reasons for sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.21",
    {
      title: "Endorsement — intimate partner violence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.21.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.22",
    {
      title: "Endorsement — offence under subsection 320.1001(1)",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.22.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "726.3",
    {
      title: "Inquiry by court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-726.3.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "727",
    {
      title: "Previous conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-727.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "728",
    {
      title: "Sentence justified by any count",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-728.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "729",
    {
      title: "Proof of certificate of analyst",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-729.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "729.1",
    {
      title: "Proof of certificate of analyst — bodily substance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-729.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "729.2",
    {
      title: "Order prohibiting contact",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-729.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "730",
    {
      title: "Conditional and absolute discharge",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-730.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "731",
    {
      title: "Making of probation order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-731.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "731.1",
    {
      title: "Firearm, etc., prohibitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-731.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "732",
    {
      title: "Intermittent sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-732.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "732.1",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-732.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "732.11",
    {
      title: "Prohibition on use of bodily substance",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-732.11.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "732.2",
    {
      title: "Coming into force of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-732.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "733",
    {
      title: "Transfer of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-733.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "733.1",
    {
      title: "Failure to comply with probation order",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-733.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734",
    {
      title: "Power of court to impose fine",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.1",
    {
      title: "Terms of order imposing fine",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.2",
    {
      title: "Obligations of court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.3",
    {
      title: "Change in terms of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.3.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.4",
    {
      title: "Proceeds to go to provincial treasurer",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.4.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.5",
    {
      title: "Licences, permits, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.5.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.51",
    {
      title: "Compensation agreements",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.51.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.6",
    {
      title: "Civil enforcement of fines, forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.6.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.7",
    {
      title: "Warrant of committal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.7.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "734.8",
    {
      title: "Definition of penalty",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-734.8.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "735",
    {
      title: "Fines on organizations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-735.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "736",
    {
      title: "Fine option program",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-736.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "737",
    {
      title: "Victim surcharge",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-737.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "737.1",
    {
      title: "Court to consider restitution order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-737.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "738",
    {
      title: "Restitution to victims of offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-738.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "739",
    {
      title: "Restitution to persons acting in good faith",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-739.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "739.1",
    {
      title: "Ability to pay",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-739.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "739.2",
    {
      title: "Payment under order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-739.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "739.3",
    {
      title: "More than one person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-739.3.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "739.4",
    {
      title: "Public authority",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-739.4.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "740",
    {
      title: "Priority to restitution",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-740.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "740.1",
    {
      title: "Deemed restitution order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-740.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "741",
    {
      title: "Enforcing restitution order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-741.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "741.1",
    {
      title: "Notice of orders of restitution",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-741.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "741.2",
    {
      title: "Civil remedy not affected",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-741.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.1",
    {
      title: "Imposing of conditional sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.2",
    {
      title: "Firearm, etc., prohibitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.3",
    {
      title: "Compulsory conditions of conditional sentence order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.3.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.31",
    {
      title: "Prohibition on use of bodily substance",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.31.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.4",
    {
      title: "Supervisor may propose changes to optional conditions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.4.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.5",
    {
      title: "Transfer of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.5.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.6",
    {
      title: "Procedure on breach of condition",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.6.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "742.7",
    {
      title: "If person imprisoned for new offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-742.7.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743",
    {
      title: "Imprisonment when no other provision",
      severity: "Indictable",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.1",
    {
      title: "Imprisonment for life or more than two years",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.2",
    {
      title: "Report by court to Correctional Service",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.21",
    {
      title: "Non-communication order",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.21.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.3",
    {
      title: "Sentence served according to regulations",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.3.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.5",
    {
      title: "Transfer of jurisdiction when person already sentenced under Youth Criminal Justice Act",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.5.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "743.6",
    {
      title: "Power of court to delay parole",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-743.6.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "744",
    {
      title: "Execution of warrant of committal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-744.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745",
    {
      title: "Sentence of life imprisonment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.01",
    {
      title: "Information in respect of parole",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.01.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.1",
    {
      title: "Persons under 18",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.2",
    {
      title: "Recommendation by jury",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.2.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.21",
    {
      title: "Recommendation by jury — multiple murders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.21.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.3",
    {
      title: "Persons under sixteen",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.3.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.4",
    {
      title: "Ineligibility for parole",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.4.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.5",
    {
      title: "Idem",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.5.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.51",
    {
      title: "Ineligibility for parole — multiple murders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.51.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.52",
    {
      title: "Manslaughter in certain circumstances",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.52.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.6",
    {
      title: "Application for judicial review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.6.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.61",
    {
      title: "Judicial screening",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.61.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.62",
    {
      title: "Appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.62.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.63",
    {
      title: "Hearing of application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.63.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "745.64",
    {
      title: "Rules",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-745.64.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "746",
    {
      title: "Time spent in custody",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-746.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "746.1",
    {
      title: "Parole prohibited",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-746.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "748",
    {
      title: "To whom pardon may be granted",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-748.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "748.1",
    {
      title: "Remission by Governor in Council",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-748.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "749",
    {
      title: "Royal prerogative",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-749.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "750",
    {
      title: "Public office vacated for conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-750.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "751",
    {
      title: "Costs to successful party in case of libel",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-751.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],
  [
    "751.1",
    {
      title: "How recovered",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-751.1.html`,
      partOf: "Part XXIII — Sentencing",
    },
  ],

  // ── Part XXIV — Dangerous Offenders and Long-term Offenders ──
  [
    "752",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-752.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "752.01",
    {
      title: "Prosecutor’s duty to advise court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-752.01.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "752.1",
    {
      title: "Application for remand for assessment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-752.1.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753",
    {
      title: "Application for finding that an offender is a dangerous offender",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.01",
    {
      title: "Application for remand for assessment — later conviction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.01.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.02",
    {
      title: "Victim evidence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.02.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.1",
    {
      title: "Application for finding that an offender is a long-term offender",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.1.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.2",
    {
      title: "Long-term supervision",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.2.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.3",
    {
      title: "Breach of long-term supervision",
      severity: "Hybrid",
      maxPenalty: "10 years",
      url: `${JUSTICE_LAWS_BASE}/section-753.3.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "753.4",
    {
      title: "New offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-753.4.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "754",
    {
      title: "Hearing of application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-754.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "755",
    {
      title: "Exception to long-term supervision — life sentence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-755.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "757",
    {
      title: "Evidence of character",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-757.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "758",
    {
      title: "Presence of accused at hearing of application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-758.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "759",
    {
      title: "Appeal — offender",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-759.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "760",
    {
      title: "Disclosure to Correctional Service of Canada",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-760.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],
  [
    "761",
    {
      title: "Review for parole",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-761.html`,
      partOf: "Part XXIV — Dangerous Offenders and Long-term Offenders",
    },
  ],

  // ── Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances ──
  [
    "762",
    {
      title: "Applications for forfeiture",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-762.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "763",
    {
      title: "Undertaking or release order binding on person",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-763.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "764",
    {
      title: "Undertaking or release order binding on accused",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-764.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "765",
    {
      title: "Effect of subsequent arrest",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-765.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "766",
    {
      title: "Render of accused by sureties",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-766.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "767",
    {
      title: "Render of accused in court by sureties",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-767.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "767.1",
    {
      title: "Substitution of surety",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-767.1.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "768",
    {
      title: "Rights of surety preserved",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-768.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "769",
    {
      title: "Application of judicial interim release provisions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-769.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "770",
    {
      title: "Default to be endorsed",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-770.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "771",
    {
      title: "Proceedings in case of default",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-771.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "772",
    {
      title: "Levy under writ",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-772.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],
  [
    "773",
    {
      title: "Committal when writ not satisfied",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-773.html`,
      partOf: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances",
    },
  ],

  // ── Part XXVI — Extraordinary Remedies ──
  [
    "774",
    {
      title: "Application of Part",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-774.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "774.1",
    {
      title: "Appearance in person — habeas corpus",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-774.1.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "775",
    {
      title: "Detention on inquiry to determine legality of imprisonment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-775.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "776",
    {
      title: "Where conviction or order not reviewable",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-776.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "777",
    {
      title: "Conviction or order remediable, when",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-777.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "778",
    {
      title: "Irregularities within section 777",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-778.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "779",
    {
      title: "General order for security by recognizance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-779.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "780",
    {
      title: "Effect of order dismissing application to quash",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-780.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "781",
    {
      title: "Want of proof of order in council",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-781.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "782",
    {
      title: "Defect in form",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-782.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "783",
    {
      title: "No action against official when conviction, etc., quashed",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-783.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],
  [
    "784",
    {
      title: "Appeal in mandamus, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-784.html`,
      partOf: "Part XXVI — Extraordinary Remedies",
    },
  ],

  // ── Part XXVII — Summary Convictions ──
  [
    "785",
    {
      title: "Definitions",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-785.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "786",
    {
      title: "Application of Part",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-786.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "787",
    {
      title: "General penalty",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-787.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "788",
    {
      title: "Commencement of proceedings",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-788.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "789",
    {
      title: "Formalities of information",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-789.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "790",
    {
      title: "Any justice may act before and after trial",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-790.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "794",
    {
      title: "No need to negative exception, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-794.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "795",
    {
      title: "Application of Parts XVI, XVIII, XVIII.1, XX, XX.1 and XXII.01",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-795.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "798",
    {
      title: "Jurisdiction",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-798.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "799",
    {
      title: "Non-appearance of prosecutor",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-799.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "800",
    {
      title: "When both parties appear",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-800.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "801",
    {
      title: "Arraignment",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-801.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "802",
    {
      title: "Right to make full answer and defence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-802.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "802.1",
    {
      title: "Limitation on the use of agents",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-802.1.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "803",
    {
      title: "Adjournment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-803.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "804",
    {
      title: "Finding of guilt, conviction, order or dismissal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-804.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "806",
    {
      title: "Memo of conviction or order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-806.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "807",
    {
      title: "Disposal of penalties when joint offenders",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-807.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "808",
    {
      title: "Order of dismissal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-808.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "809",
    {
      title: "Costs",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-809.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810",
    {
      title: "If injury or damage feared",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.01",
    {
      title: "Fear of certain offences",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.01.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.011",
    {
      title: "Fear of terrorism offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.011.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.02",
    {
      title: "Fear of forced marriage or marriage under age of 16 years",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.02.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.03",
    {
      title: "Fear of domestic violence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.03.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.1",
    {
      title: "Fear of sexual offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.1.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.2",
    {
      title: "Where fear of serious personal injury offence",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.2.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.21",
    {
      title: "Audioconference or videoconference",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.21.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.22",
    {
      title: "Transfer of order",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.22.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.3",
    {
      title: "Samples — designations and specifications",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.3.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.4",
    {
      title: "Prohibition on use of bodily substance",
      severity: "Summary",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.4.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "810.5",
    {
      title: "Orders under sections 486 to 486.5 and 486.7",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-810.5.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "811",
    {
      title: "Breach of recognizance",
      severity: "Hybrid",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-811.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "811.1",
    {
      title: "Proof of certificate of analyst — bodily substance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-811.1.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "812",
    {
      title: "Definition of appeal court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-812.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "813",
    {
      title: "Appeal by defendant, informant or Attorney General",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-813.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "814",
    {
      title: "Manitoba and Alberta",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-814.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "815",
    {
      title: "Notice of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-815.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "816",
    {
      title: "Release order — appellant",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-816.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "817",
    {
      title: "Recognizance of prosecutor",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-817.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "818",
    {
      title: "Application to appeal court for review",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-818.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "819",
    {
      title: "Application to fix date for hearing of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-819.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "820",
    {
      title: "Payment of fine not a waiver of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-820.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "821",
    {
      title: "Notification and transmission of conviction, etc.",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-821.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "822",
    {
      title: "Certain sections applicable to appeals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-822.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "824",
    {
      title: "Adjournment",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-824.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "825",
    {
      title: "Dismissal for failure to appear or want of prosecution",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-825.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "826",
    {
      title: "Costs",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-826.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "827",
    {
      title: "To whom costs payable, and when",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-827.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "828",
    {
      title: "Enforcement of conviction or order by court of appeal",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-828.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "829",
    {
      title: "Definition of appeal court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-829.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "830",
    {
      title: "Appeals",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-830.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "831",
    {
      title: "Application",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-831.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "832",
    {
      title: "Release order or recognizance",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-832.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "833",
    {
      title: "No writ required",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-833.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "834",
    {
      title: "Powers of appeal court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-834.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "835",
    {
      title: "Enforcement",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-835.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "836",
    {
      title: "Appeal under section 830",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-836.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "837",
    {
      title: "Appeal barred",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-837.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "838",
    {
      title: "Extension of time",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-838.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "839",
    {
      title: "Appeal on question of law",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-839.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],
  [
    "840",
    {
      title: "Fees and allowances",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-840.html`,
      partOf: "Part XXVII — Summary Convictions",
    },
  ],

  // ── Part XXVIII — Miscellaneous ──
  [
    "841",
    {
      title: "Definitions",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-841.html`,
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "842",
    {
      title: "Dealing with data in court",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-842.html`,
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "843",
    {
      title: "Transfer of data",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-843.html`,
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "844",
    {
      title: "Documents in writing",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-844.html`,
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "845",
    {
      title: "Signatures",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-845.html`,
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "846",
    {
      title: "Oaths",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-846.html`,
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "847",
    {
      title: "Copies",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-847.html`,
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
  [
    "849",
    {
      title: "Forms",
      severity: "",
      maxPenalty: "",
      url: `${JUSTICE_LAWS_BASE}/section-849.html`,
      partOf: "Part XXVIII — Miscellaneous",
    },
  ],
]);

export const CRIMINAL_CODE_PARTS = [
  { id: "I", label: "Part I — General" },
  { id: "II", label: "Part II — Offences Against Public Order" },
  { id: "II.1", label: "Part II.1 — Terrorism" },
  { id: "III", label: "Part III — Firearms and Other Weapons" },
  { id: "IV", label: "Part IV — Offences Against the Administration of Law and Justice" },
  { id: "V", label: "Part V — Sexual Offences, Public Morals and Disorderly Conduct" },
  { id: "VI", label: "Part VI — Invasion of Privacy" },
  { id: "VII", label: "Part VII — Disorderly Houses, Gaming and Betting" },
  { id: "VIII", label: "Part VIII — Offences Against the Person and Reputation" },
  { id: "VIII.1", label: "Part VIII.1 — Offences Relating to Conveyances" },
  { id: "IX", label: "Part IX — Offences Against Rights of Property" },
  { id: "X", label: "Part X — Fraudulent Transactions Relating to Contracts and Trade" },
  { id: "XI", label: "Part XI — Wilful and Forbidden Acts in Respect of Certain Property" },
  { id: "XII", label: "Part XII — Offences Relating to Currency" },
  { id: "XII.2", label: "Part XII.2 — Proceeds of Crime" },
  { id: "XIII", label: "Part XIII — Attempts — Conspiracies — Accessories" },
  { id: "XIV", label: "Part XIV — Jurisdiction" },
  { id: "XV", label: "Part XV — Special Procedure and Powers" },
  { id: "XV.1", label: "Part XV.1 — Unreasonable Delay" },
  { id: "XVI", label: "Part XVI — Compelling Appearance of Accused Before a Justice and Interim Release" },
  { id: "XVII", label: "Part XVII — Language of Accused" },
  { id: "XVIII", label: "Part XVIII — Procedure on Preliminary Inquiry" },
  { id: "XVIII.1", label: "Part XVIII.1 — Case Management Judge" },
  { id: "XIX", label: "Part XIX — Indictable Offences — Trial Without Jury" },
  { id: "XIX.1", label: "Part XIX.1 — Nunavut Court of Justice" },
  { id: "XX", label: "Part XX — Procedure in Jury Trials and General Provisions" },
  { id: "XX.1", label: "Part XX.1 — Mental Disorder" },
  { id: "XXI", label: "Part XXI — Appeals — Indictable Offences" },
  { id: "XXI.1", label: "Part XXI.1 — Applications for Ministerial Review — Miscarriages of Justice" },
  { id: "XXI.2", label: "Part XXI.2 — Miscarriage of Justice Review Commission" },
  { id: "XXII", label: "Part XXII — Procuring Attendance" },
  { id: "XXII.01", label: "Part XXII.01 — Remote Attendance by Certain Persons" },
  { id: "XXII.1", label: "Part XXII.1 — Remediation Agreements" },
  { id: "XXII.2", label: "Part XXII.2 — Alternative Measures and Restorative Justice Processes" },
  { id: "XXIII", label: "Part XXIII — Sentencing" },
  { id: "XXIV", label: "Part XXIV — Dangerous Offenders and Long-term Offenders" },
  { id: "XXV", label: "Part XXV — Effect and Enforcement of Undertakings, Release Orders and Recognizances" },
  { id: "XXVI", label: "Part XXVI — Extraordinary Remedies" },
  { id: "XXVII", label: "Part XXVII — Summary Convictions" },
  { id: "XXVIII", label: "Part XXVIII — Miscellaneous" },
];

/**
 * Normalize a citation string like "s. 348(1)(b)" or "Criminal Code s. 348"
 * to its base section number "348". Handles decimals like "320.14".
 * Returns null if no section number is found.
 */
export function normalizeSection(citation) {
  if (!citation || typeof citation !== "string") return null;

  // Clean up the string and look for the first number following s., section, or just a standalone number
  // Pattern: (statute prefix)? (s.|section)? (number)
  const match = citation.match(
    /(?:(?:criminal\s+code|CC|s\.|section)\s*|^)(\d+(?:\.\d+)?)/i,
  );
  return match ? match[1] : null;
}

/**
 * Look up a Criminal Code section. Returns the entry object or null.
 * Entry: { title, severity, maxPenalty, url, partOf, ... }
 */
export function lookupSection(citation) {
  const num = normalizeSection(citation);
  if (!num) return null;
  return CRIMINAL_CODE_SECTIONS.get(num) || null;
}
