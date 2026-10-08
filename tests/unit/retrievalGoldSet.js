/**
 * Gold-labelled retrieval scenarios.
 *
 * Unlike filterScenarios.js (keyword expectations) and retrievalFailureSet.js
 * (false-positive guards), every scenario here says WHICH corpus cases a lawyer
 * would accept as an answer. The harness (scripts/_retrievalGoldEval.js) scores
 * what retrieval returns against those labels.
 *
 * Labels are citations from src/lib/caselaw (MASTER_CASE_LAW_DB):
 *   relevant   - a good answer for these facts.
 *   acceptable - on point enough to show, but not the best fit.
 *   wrong      - must never be shown for these facts.
 * Anything returned that is in none of the three is "unlabelled": it is not
 * counted as wrong, but the CLI lists it so someone can label it. Label from
 * the law, never from what retrieval happens to return today.
 *
 * A scenario with no relevant and no acceptable case is "expect empty": the
 * corpus has no fitting authority, so showing nothing is the right answer.
 * `gap` notes what is missing from the corpus (the to-do list for step 2).
 */

export const C = {
  jordan: "2016 SCC 27",
  grant: "2009 SCC 32",
  mann: "2004 SCC 52",
  suberu: "2009 SCC 33",
  marakah: "2017 SCC 59",
  vu: "2013 SCC 60",
  ewanchuk: "[1999] 1 SCR 330",
  ja: "2011 SCC 28",
  barton: "2019 SCC 33",
  jobidon: "[1991] 2 SCR 714",
  khill: "2021 SCC 37",
  gladue: "[1999] 1 SCR 688",
  ipeelee: "2012 SCC 13",
  woods: "2005 SCC 42",
  stOngeLamoureux: "2012 SCC 57",
  smith: "2015 SCC 34",
  stinchcombe: "[1991] 3 SCR 326",
  oakes: "[1986] 1 SCR 103",
  mclaughlin: "[1980] 2 SCR 331",
  stewart: "[1988] 1 SCR 963",
  lavallee: "[1990] 1 SCR 852",
  saultSte: "[1978] 2 SCR 1299",
  hunter: "[1984] 2 SCR 145",
  stillman: "[1997] 1 SCR 607",
  bissonnette: "2022 SCC 19",
  spencer: "2014 SCC 43",
  fearon: "2014 SCC 77",
  le: "2019 SCC 34",
  mccraw: "[1991] 3 SCR 72",
  wd: "[1991] 1 SCR 742",
  nur: "2015 SCC 15",
  martineau: "[1990] 2 SCR 633",
  creighton: "[1993] 3 SCR 3",
  oickle: "2000 SCC 38",
  briscoe: "2010 SCC 13",
  antic: "2017 SCC 27",
  roy: "2012 SCC 26",
  golden: "2001 SCC 83",
  sinclair: "2010 SCC 35",
  mack: "[1988] 2 SCR 903",
  hart: "2014 SCC 52",
  socan: "2022 SCC 30",
  calder: "[1973] SCR 313",
  gordon: "[1996] 2 SCR 27",
  moge: "[1992] 3 SCR 813",
  bracklow: "[1999] 1 SCR 420",
  barendregt: "2022 SCC 22",
};

export const RETRIEVAL_GOLD_SET = [
  // ── Impaired driving ──────────────────────────────────────────────────────
  {
    id: "impaired_ride_checkpoint",
    scenario:
      "I was pulled over at a RIDE checkpoint and asked to provide a breath sample. What are my rights?",
    relevant: [C.woods],
    acceptable: [C.grant, C.stOngeLamoureux, C.suberu, C.mann],
    wrong: [C.calder],
  },
  {
    id: "impaired_refused_breath",
    scenario:
      "Drunk driving conviction. I refused the breathalyzer. What defences exist?",
    relevant: [C.woods],
    acceptable: [C.stOngeLamoureux, C.suberu],
  },
  {
    id: "impaired_checkpoint_held",
    scenario:
      "Roadside stop at a checkpoint, officer demanded a breath test and held me there. What Charter issues apply?",
    relevant: [C.woods],
    acceptable: [C.grant, C.mann, C.stOngeLamoureux, C.suberu],
  },

  // ── Assault, weapons, self-defence ────────────────────────────────────────
  {
    id: "assault_punch_minor_injuries",
    scenario:
      "I punched someone in the face during an argument. They had minor injuries. Am I facing criminal charges?",
    acceptable: [C.jobidon],
    gap: "No simple/bodily-harm assault authority in the corpus.",
  },
  {
    id: "assault_bar_fight_arm",
    scenario:
      "I was in a fight at a bar and broke someone's arm. Self-defence is my claim.",
    relevant: [C.khill, C.jobidon],
    acceptable: [C.lavallee],
  },
  {
    id: "assault_knife_confrontation",
    scenario:
      "I stabbed someone with a knife during a confrontation. What's the crime?",
    acceptable: [C.khill],
    gap: "No assault-with-a-weapon / aggravated assault authority.",
  },
  {
    id: "selfdefence_home_intruder",
    scenario:
      "A man broke into my home at night and I hit him with a bat. Am I guilty of assault?",
    relevant: [C.khill],
    acceptable: [C.lavallee],
  },
  {
    id: "selfdefence_abused_partner",
    scenario:
      "My partner abused me for years and I finally hurt him during an attack. Can I claim self-defence?",
    relevant: [C.lavallee],
    acceptable: [C.khill],
  },
  {
    id: "domestic_argument_harassment",
    scenario:
      "I got into a heated argument with my spouse, there was physical contact, and they're saying I'm harassing them. What charges could I face?",
    gap: "No domestic assault / criminal harassment authority for the accused.",
  },

  // ── Sexual assault ────────────────────────────────────────────────────────
  {
    id: "sexual_assault_consent_denied",
    scenario:
      "I'm accused of sexual assault. The complainant says consent wasn't given. What's the defence?",
    relevant: [C.ewanchuk, C.ja],
    acceptable: [C.barton],
  },

  // ── Drugs ─────────────────────────────────────────────────────────────────
  {
    id: "drug_cocaine_trafficking",
    scenario:
      "Police found 50 grams of cocaine in my car. They're charging me with trafficking. What happens next?",
    relevant: [C.smith],
    gap: "Smith is a marijuana/s. 7 case; no cocaine trafficking or possession-for-purpose authority.",
  },
  {
    id: "drug_fentanyl_trafficking",
    scenario:
      "Found with fentanyl pills. Police say it's for trafficking. What's the legal status?",
    relevant: [C.smith],
    acceptable: [C.nur],
  },
  {
    id: "drug_street_search_exclusion",
    scenario:
      "Police stopped me on the street, searched my backpack and found drugs. Can the evidence be excluded?",
    relevant: [C.grant],
    acceptable: [C.mann, C.stillman],
  },

  // ── Detention, arrest, counsel ────────────────────────────────────────────
  {
    id: "charter_arrest_no_reasons",
    scenario:
      "Police arrested me without a warrant and without explaining why. Is this a Charter violation?",
    relevant: [C.grant, C.mann, C.le],
  },
  {
    id: "charter_street_detention",
    scenario:
      "I was detained on the street with no clear grounds and not told why. Is that arbitrary detention?",
    relevant: [C.mann, C.le, C.grant],
  },
  {
    id: "charter_no_lawyer_hours",
    scenario:
      "I was arrested and detained, but police didn't let me call a lawyer for hours. What are my rights?",
    relevant: [C.suberu, C.sinclair],
    acceptable: [C.woods, C.grant],
  },
  {
    id: "charter_counsel_delay_questioning",
    scenario:
      "After arrest, officers questioned me and delayed my chance to contact counsel. Does that matter?",
    relevant: [C.suberu, C.sinclair],
    acceptable: [C.woods, C.oickle],
  },
  {
    id: "exclusion_statement_after_rights_breach",
    scenario:
      "Police got my statement after violating my rights. Can the court exclude it?",
    relevant: [C.grant, C.stillman],
    acceptable: [C.oickle, C.sinclair],
  },

  // ── Search and seizure ────────────────────────────────────────────────────
  {
    id: "search_phone_after_arrest",
    scenario:
      "Police searched my phone without a warrant after they arrested me.",
    relevant: [C.fearon],
    acceptable: [C.marakah, C.vu, C.grant],
  },
  {
    id: "search_texts_from_friend",
    scenario:
      "Police got my text messages from my friend's phone without a warrant. Can I challenge it?",
    relevant: [C.marakah],
    acceptable: [C.fearon, C.vu, C.grant],
  },
  {
    id: "search_isp_subscriber_info",
    scenario:
      "Police asked my internet provider for my subscriber information without a warrant.",
    relevant: [C.spencer],
    acceptable: [C.marakah, C.grant],
  },
  {
    id: "search_warrant_missing_computer",
    scenario:
      "Police searched my house with a warrant that didn't list my computer, and they took it anyway.",
    relevant: [C.vu],
    acceptable: [C.hunter, C.grant],
  },
  {
    id: "search_strip_search_station",
    scenario:
      "I was strip searched at the police station after a minor arrest. Was that legal?",
    relevant: [C.golden],
    acceptable: [C.fearon],
  },

  // ── Trial process and evidence ────────────────────────────────────────────
  {
    id: "trial_delay_two_years",
    scenario:
      "My trial for a theft charge is taking over two years to get to court. Can the charge be stayed?",
    relevant: [C.jordan],
    wrong: [C.stewart, C.mclaughlin],
  },
  {
    id: "disclosure_missing_notes",
    scenario:
      "The Crown hasn't given my lawyer the police notes and witness statements. What can we do?",
    relevant: [C.stinchcombe],
  },
  {
    id: "confession_pressure_promises",
    scenario:
      "Police interrogated me for hours, kept saying they'd go easy if I talked, and I confessed. Can that be used against me?",
    relevant: [C.oickle],
    acceptable: [C.sinclair, C.hart],
  },
  {
    id: "confession_mr_big",
    scenario:
      "An undercover officer posed as a crime boss and got me to confess to a crime so I could join his gang.",
    relevant: [C.hart],
    acceptable: [C.mack, C.oickle],
  },
  {
    id: "entrapment_drug_sale",
    scenario:
      "An undercover officer kept pressing me to sell him drugs even though I had never sold before.",
    relevant: [C.mack],
  },
  {
    id: "credibility_word_vs_word",
    scenario:
      "It's my word against the complainant's. How does the judge decide who to believe?",
    relevant: [C.wd],
  },
  {
    id: "bail_denied_months",
    scenario: "I was denied bail and held for months. What are my rights?",
    relevant: [C.antic],
  },
  {
    id: "charter_limit_justified",
    scenario:
      "I think this criminal law violates my Charter rights. How do courts decide whether a limit is justified?",
    relevant: [C.oakes],
  },

  // ── Offences and sentencing ───────────────────────────────────────────────
  {
    id: "robbery_store_present_no_weapon",
    scenario:
      "I was involved in a store robbery. I didn't use a weapon, but I was there and the store owner was scared.",
    relevant: [C.briscoe],
    acceptable: [C.mccraw],
    wrong: [C.khill, C.fearon],
  },
  {
    id: "robbery_getaway_driver",
    scenario:
      "I drove the getaway car for a robbery but never went inside the store.",
    relevant: [C.briscoe],
    wrong: [C.fearon],
  },
  {
    id: "theft_shoplifting_150",
    scenario:
      "I took merchandise from a store without paying. The value was $150. Am I facing jail time?",
    wrong: [C.mclaughlin, C.stewart],
    gap: "No shoplifting / theft-under-$5000 authority. McLaughlin (computer theft) is the wrong answer.",
  },
  {
    id: "theft_victim_stolen_chair",
    scenario: "My chair was stolen from outside my apartment.",
    wrong: [C.socan, C.stewart, C.mclaughlin],
  },
  {
    id: "break_and_enter_victim",
    scenario:
      "Someone broke into my apartment through the back window and stole my laptop.",
    wrong: [C.stewart, C.mclaughlin],
    gap: "No break-and-enter authority (ROADMAP item 5).",
  },
  {
    id: "threats_text_message",
    scenario:
      "I texted my coworker that I would hurt them. Am I guilty of uttering threats?",
    relevant: [C.mccraw],
  },
  {
    id: "dangerous_driving_race_crash",
    scenario:
      "I was racing a friend and crashed, and someone was hurt. Am I charged with dangerous driving?",
    relevant: [C.roy],
  },
  {
    id: "murder_no_intent_to_kill",
    scenario:
      "I'm charged with second-degree murder but I didn't intend to kill anyone.",
    relevant: [C.martineau],
    acceptable: [C.creighton],
  },
  {
    id: "manslaughter_after_fight",
    scenario:
      "Someone died after a fight I started. Could this be manslaughter and not murder?",
    relevant: [C.creighton],
    acceptable: [C.martineau, C.jobidon],
  },
  {
    id: "mandatory_minimum_firearm",
    scenario:
      "I'm charged with a firearm offence with a mandatory minimum sentence. Can I challenge it as cruel and unusual?",
    relevant: [C.nur],
    acceptable: [C.bissonnette],
  },
  {
    id: "sentencing_indigenous_offender",
    scenario:
      "I'm Indigenous and facing sentencing. Does my background matter to the judge?",
    relevant: [C.gladue, C.ipeelee],
  },
  {
    id: "regulatory_due_diligence",
    scenario:
      "My company was charged under an environmental regulation. Do I have a due diligence defence?",
    relevant: [C.saultSte],
  },

  // ── Family law ────────────────────────────────────────────────────────────
  {
    id: "family_relocation_child",
    scenario:
      "My ex wants to move to another province with our child. Can she?",
    relevant: [C.gordon, C.barendregt],
  },
  {
    id: "family_spousal_support",
    scenario:
      "After a long marriage I'm asking for spousal support. How is it decided?",
    relevant: [C.moge, C.bracklow],
  },

  // ── Nothing to show ───────────────────────────────────────────────────────
  {
    id: "minimal_detail",
    scenario: "Very brief scenario with minimal detail.",
  },
  // Scope question for the owner: the corpus holds SOCAN (copyright) and
  // Baker/Vavilov (administrative law), which fit these two scenarios. The
  // older tests expect nothing because CaseDive is positioned as a criminal
  // tool. Left unlabelled (any result is listed for review) until that is
  // decided; if non-criminal law is in scope, label SOCAN and Baker/Vavilov
  // relevant here.
  {
    id: "noncriminal_copyright",
    scenario:
      "I need advice on copyright royalties and digital music licensing terms.",
  },
  {
    id: "noncriminal_admin_tribunal",
    scenario:
      "I am appealing an administrative tribunal decision on professional licensing fairness.",
  },
];
