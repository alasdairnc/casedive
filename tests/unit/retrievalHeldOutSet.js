/**
 * Frozen held-out scenarios for judging retrieval changes.
 *
 * Written on 2026-10-08, before the full-text ranker (api/_corpusRanker.js)
 * was built, in everyday wording and without reading any corpus entry's
 * facts. Same label format as retrievalGoldSet.js. Do not edit these to make
 * a change look better, and do not tune ranking against them: they are the
 * check that a change generalises beyond the 50 scenarios it was developed on.
 * New held-out scenarios may be added; existing ones stay as they are.
 */
import { C } from "./retrievalGoldSet.js";

export const RETRIEVAL_HELD_OUT_SET = [
  {
    id: "heldout_car_trunk_search",
    scenario:
      "A police officer pulled me over, searched my car trunk without a warrant and found a bag of pills. Was that search lawful and can the evidence be thrown out?",
    relevant: [C.grant],
    acceptable: [C.mann, C.stillman, C.hunter],
  },
  {
    id: "heldout_eighteen_month_wait",
    scenario:
      "I have been waiting eighteen months for my trial on an assault charge. Can I get the charge thrown out because it is taking too long?",
    relevant: [C.jordan],
    wrong: [C.stewart, C.mclaughlin],
  },
  {
    id: "heldout_signed_after_twelve_hours",
    scenario:
      "The detective said I could go home if I just admitted it, and I signed a statement after twelve hours of questioning. Can the Crown use it?",
    relevant: [C.oickle],
    acceptable: [C.hart, C.sinclair],
  },
  {
    id: "heldout_drunk_murder_no_intent",
    scenario:
      "I am charged with murder but I was very drunk and never meant to kill him. Can a murder charge stand without intent?",
    relevant: [C.martineau],
    acceptable: [C.creighton],
  },
  {
    id: "heldout_lent_car_robbery",
    scenario:
      "I lent my car to a friend who used it to rob a convenience store. Can I be charged as a party to the robbery?",
    relevant: [C.briscoe],
  },
  {
    id: "heldout_indigenous_foster_care_sentence",
    scenario:
      "The Crown wants a long sentence for my first offence, but I am Indigenous and grew up in foster care. Does that count at sentencing?",
    relevant: [C.gladue, C.ipeelee],
  },
  {
    id: "heldout_law_saved_under_s1",
    scenario:
      "My lawyer says the law I am charged under violates the Charter. How does a court decide whether the law is still justified?",
    relevant: [C.oakes],
  },
  {
    id: "heldout_informant_kept_calling",
    scenario:
      "A customer who turned out to be a police informant kept calling me until I finally agreed to sell him drugs. Is that allowed?",
    relevant: [C.mack],
  },
  {
    id: "heldout_hours_before_phone_call",
    scenario:
      "I was held at the station for hours before anyone told me I could phone a lawyer.",
    relevant: [C.suberu, C.sinclair],
    acceptable: [C.woods, C.grant],
  },
  {
    id: "heldout_kick_then_death",
    scenario:
      "I kicked a man during a street fight and he collapsed and died a few days later. Can I be convicted of manslaughter?",
    relevant: [C.creighton],
    acceptable: [C.jobidon, C.martineau],
  },
  {
    id: "heldout_roadside_phone_read",
    scenario:
      "Police took my phone at the roadside and read my messages with no warrant.",
    relevant: [C.fearon],
    acceptable: [C.marakah, C.vu, C.grant],
  },
  {
    id: "heldout_speeding_hit_someone",
    scenario:
      "I drove 150 in an 80 zone, passed a line of cars and hit someone. Is that dangerous driving or criminal negligence?",
    relevant: [C.roy],
    acceptable: [C.creighton],
  },
  {
    id: "heldout_threat_burn_shop",
    scenario:
      "A shop owner says I threatened him by telling him I would burn his shop down. Is that uttering threats?",
    relevant: [C.mccraw],
  },
];
