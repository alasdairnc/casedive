/**
 * Second frozen held-out batch.
 *
 * Written on 2026-10-08 after the first held-out set had been traced in detail
 * (so it no longer counts as unseen), in everyday wording and without reading
 * any retrieval output for these scenarios. Judge scoring and filtering changes
 * on the aggregate numbers for this batch, and do not trace its individual
 * scenarios while developing: once you have, write a third batch. Same label
 * format as retrievalGoldSet.js.
 */
import { C } from "./retrievalGoldSet.js";

export const RETRIEVAL_HELD_OUT_SET_2 = [
  {
    id: "heldout2_trial_postponed_no_judge",
    scenario:
      "My trial has been postponed again and again for two years because the court has no judge available. Is there a limit?",
    relevant: [C.jordan],
  },
  {
    id: "heldout2_held_a_day_before_lawyer",
    scenario:
      "Police arrested me and kept me for a whole day before I could speak to a lawyer, and they questioned me in the meantime.",
    relevant: [C.suberu, C.sinclair],
    acceptable: [C.woods, C.oickle],
  },
  {
    id: "heldout2_wet_road_pedestrian_death",
    scenario:
      "I was driving fast on a wet road, lost control and killed a pedestrian. I am charged with dangerous driving causing death.",
    relevant: [C.roy],
    acceptable: [C.creighton],
  },
  {
    id: "heldout2_witness_statement_hidden",
    scenario:
      "The prosecutor did not tell my lawyer about a witness who gave a statement favourable to me until the trial had already started.",
    relevant: [C.stinchcombe],
  },
  {
    id: "heldout2_cruel_mandatory_jail",
    scenario:
      "I think the mandatory jail term for my gun possession charge is cruel. Can a judge refuse to apply it?",
    relevant: [C.nur],
    acceptable: [C.bissonnette],
  },
  {
    id: "heldout2_meant_to_scare_death",
    scenario:
      "I was drinking and a friend died in the fight afterwards. The police want to charge me with murder but I only meant to scare him.",
    relevant: [C.martineau],
    acceptable: [C.creighton],
  },
  {
    id: "heldout2_texts_read_after_arrest",
    scenario:
      "Officers read through the text messages on my phone after they arrested me for a robbery, without asking a judge first.",
    relevant: [C.fearon],
    acceptable: [C.marakah, C.vu, C.grant],
  },
  {
    id: "heldout2_provider_tracked_activity",
    scenario:
      "The police got my internet provider to hand over who was behind my account without asking a court.",
    relevant: [C.spencer],
    acceptable: [C.marakah],
  },
  {
    id: "heldout2_undercover_pushed_deal",
    scenario:
      "An undercover cop befriended me for months and pushed me into a deal I would never have made on my own.",
    relevant: [C.mack],
    acceptable: [C.hart],
  },
  {
    id: "heldout2_lookout_bank_robbery",
    scenario:
      "I was the lookout while two friends robbed a bank. I never touched the money or the gun.",
    relevant: [C.briscoe],
  },
  {
    id: "heldout2_judge_ignored_doubt",
    scenario:
      "The judge said she believed the complainant and not me, but I think she ignored reasonable doubt. How should she have reasoned?",
    relevant: [C.wd],
  },
  {
    id: "heldout2_threat_over_parking_spot",
    scenario:
      "I told my neighbour I would hurt him and his dog if he kept parking in my spot. Is that uttering threats?",
    relevant: [C.mccraw],
  },
  {
    id: "heldout2_roadside_twenty_minutes",
    scenario:
      "A police officer held me at the roadside for twenty minutes for no clear reason and kept asking me about drugs.",
    relevant: [C.grant, C.mann],
    acceptable: [C.le],
  },
  {
    id: "heldout2_first_offender_reserve",
    scenario:
      "I am a first-time offender from a remote reserve and the judge says there are no special rules for people like me at sentencing.",
    relevant: [C.gladue, C.ipeelee],
  },
  {
    id: "heldout2_strip_searched_in_cells",
    scenario:
      "The police strip searched me in the cells after I was arrested for a minor offence.",
    relevant: [C.golden],
  },
];
