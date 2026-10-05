// Eval set for api/_statuteGrounding.js. Shared by the offline unit test (what
// the deterministic grounding offers) and scripts/evaluate-statute-grounding.mjs
// (opt-in live run against the model). A scenario that should engage neither Act
// has `expectNull: true`.
//
// `include` / `exclude` are citations the grounding must / must not offer.
// `youth` / `youthAmbiguous` / `cdsa` / `cannabisOnly` pin the detection flags.
// `hint` is a phrase the system-prompt hints must contain.

export const STATUTE_SCENARIOS = [
  // ── CDSA ──
  {
    id: "possession_simple",
    scenario:
      "I was arrested with a gram of cocaine in my pocket. It was for my own use.",
    cdsa: true,
    include: ["CDSA s. 4", "CDSA s. 10.2", "CDSA s. 10.3"],
    exclude: ["CDSA s. 5", "YCJA s. 3"],
  },
  {
    id: "trafficking_street",
    scenario:
      "Police found 30 baggies of fentanyl and a digital scale in his car. He told them he was selling to friends.",
    cdsa: true,
    include: ["CDSA s. 5", "CDSA s. 4", "CDSA s. 10"],
    exclude: ["CDSA s. 10.2", "YCJA s. 3"],
  },
  {
    id: "production_meth_lab",
    scenario:
      "Officers raided a basement and found a meth lab with glassware and chemicals.",
    cdsa: true,
    include: ["CDSA s. 7", "CDSA s. 7.1"],
  },
  {
    id: "import_border",
    scenario:
      "A border officer found fentanyl hidden in her luggage when she arrived on a flight from overseas.",
    cdsa: true,
    include: ["CDSA s. 6"],
  },
  {
    id: "precursor_pill_press",
    scenario:
      "Police seized a pill press and several kilos of precursor chemicals used to make fentanyl.",
    cdsa: true,
    include: ["CDSA s. 7.1"],
  },
  {
    id: "generic_drugs",
    scenario:
      "I was arrested for drugs last night and I don't know the charge.",
    cdsa: true,
    include: ["CDSA s. 4", "CDSA s. 5"],
  },
  {
    id: "cannabis_only",
    scenario: "My friend got caught selling weed outside the arena.",
    cdsa: false,
    cannabisOnly: true,
    exclude: ["CDSA s. 4", "CDSA s. 5"],
    hint: "Cannabis Act",
  },
  {
    id: "cannabis_and_cocaine",
    scenario: "He was selling weed and cocaine out of his apartment.",
    cdsa: true,
    include: ["CDSA s. 5"],
  },

  // ── YCJA ──
  {
    id: "youth_shoplifting_first",
    scenario:
      "A 15-year-old was caught shoplifting $800 of electronics. It is their first offence.",
    youth: true,
    include: ["YCJA s. 3", "YCJA s. 4", "YCJA s. 6", "YCJA s. 10"],
    exclude: ["YCJA s. 64", "CDSA s. 4"],
  },
  {
    id: "youth_police_questioning",
    scenario:
      "Police arrested a 16-year-old and questioned him at the station without a parent or lawyer. He confessed.",
    youth: true,
    include: ["YCJA s. 25", "YCJA s. 26", "YCJA s. 146"],
  },
  {
    id: "youth_serious_adult_sentence",
    scenario:
      "A 16-year-old is charged with murder and the Crown says it will ask for an adult sentence.",
    youth: true,
    include: ["YCJA s. 64", "YCJA s. 72"],
    exclude: ["YCJA s. 4", "YCJA s. 6", "YCJA s. 10"],
  },
  {
    id: "youth_sentencing",
    scenario:
      "A 14-year-old pleaded guilty to assault and is waiting to be sentenced.",
    youth: true,
    include: ["YCJA s. 38", "YCJA s. 39", "YCJA s. 42"],
  },
  {
    id: "youth_publication",
    scenario:
      "A 17-year-old charged with assault was named on social media and in the local news.",
    youth: true,
    include: ["YCJA s. 110"],
  },
  {
    id: "youth_release",
    scenario:
      "A 16-year-old was denied bail on a robbery charge and is being held in custody before trial.",
    youth: true,
    include: ["YCJA s. 29"],
  },
  {
    id: "youth_breach",
    scenario:
      "A 15-year-old on a probation order failed to comply with his curfew condition.",
    youth: true,
    include: ["YCJA s. 137"],
  },
  {
    id: "youth_drug",
    scenario: "A 17-year-old was found with cocaine and arrested.",
    youth: true,
    cdsa: true,
    include: ["YCJA s. 3", "CDSA s. 4"],
  },
  {
    id: "teenager_word_only",
    scenario: "A teenager at my school was selling pills in the hallway.",
    youth: true,
    cdsa: true,
    include: ["YCJA s. 3", "CDSA s. 5"],
  },
  {
    id: "offence_at_16_now_19",
    scenario:
      "He is 19 now, but the break-in happened when he was 16. He was charged last month.",
    youth: true,
    youthAmbiguous: true,
    include: ["YCJA s. 3"],
    hint: "ACCUSED",
  },
  {
    id: "adult_accused_youth_victim",
    scenario: "A 35-year-old man assaulted a 15-year-old at a bus stop.",
    youth: true,
    youthAmbiguous: true,
    hint: "victim or witness",
  },
  {
    id: "under_twelve",
    scenario:
      "An 8-year-old pushed another child at recess and broke their arm.",
    youth: false,
    exclude: ["YCJA s. 3"],
    hint: "under 12",
  },

  // ── Must engage neither Act ──
  {
    id: "adult_theft",
    scenario: "A 25-year-old man stole a bike from outside a store.",
    expectNull: true,
  },
  {
    id: "old_car",
    scenario: "My 15-year-old car was stolen from the driveway last night.",
    expectNull: true,
  },
  {
    id: "speeding",
    scenario:
      "I was pulled over doing 15 over. The speed limit was 50 and the officer gave me a ticket.",
    expectNull: true,
  },
  {
    id: "minor_injuries",
    scenario:
      "I punched someone during an argument. They had minor injuries. Am I facing charges?",
    expectNull: true,
  },
  {
    id: "adult_assault",
    scenario: "He was 34 when he hit his neighbour with a bat.",
    expectNull: true,
  },
];
