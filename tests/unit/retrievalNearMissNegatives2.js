/**
 * Second near-miss negative batch: non-criminal questions that borrow criminal
 * vocabulary (a search, an arrest, a fine, a doctor, a guard). No case law
 * should be shown.
 *
 * Written 2026-10-08 after the first batch had been traced and used to design
 * a state-actor gate, so it is the blind check for that gate. Report the leak
 * count only; do not trace these while developing. Once you have, write a
 * third batch.
 */
export const RETRIEVAL_NEAR_MISS_NEGATIVES_2 = [
  {
    id: "nearmiss2_concert_pat_down",
    scenario:
      "A private security company's guard patted me down at the concert entrance. Are they allowed to do that?",
  },
  {
    id: "nearmiss2_boss_read_emails",
    scenario:
      "My boss read my work emails and says I stole company information. Is that legal?",
  },
  {
    id: "nearmiss2_roommate_went_through_room",
    scenario:
      "My roommate went through my bedroom and my phone while I was away. Can I do anything about it?",
  },
  {
    id: "nearmiss2_airline_carry_on",
    scenario:
      "Airline staff took my carry-on and went through it at the gate before boarding. Can they do that?",
  },
  {
    id: "nearmiss2_school_counsellor_questioned",
    scenario:
      "My daughter's school counsellor questioned her about drug use without calling us first.",
  },
  {
    id: "nearmiss2_contractor_damaged_fence",
    scenario:
      "My neighbour's contractor damaged my fence and refuses to pay for the repairs.",
  },
  {
    id: "nearmiss2_bank_froze_account",
    scenario:
      "A bank froze my account after a fraud alert and I cannot get at my money.",
  },
  {
    id: "nearmiss2_fired_refused_breathalyzer_party",
    scenario:
      "My employer fired me after I refused to take a breathalyzer at the company party.",
  },
  {
    id: "nearmiss2_landlord_door_camera",
    scenario:
      "My landlord installed a camera pointed at my apartment door. Is that legal?",
  },
  {
    id: "nearmiss2_tow_company_private_lot",
    scenario:
      "A tow company took my car from a private lot and wants four hundred dollars to release it.",
  },
  {
    id: "nearmiss2_doctor_shared_records",
    scenario:
      "My doctor shared my medical records with my employer without asking me.",
  },
  {
    id: "nearmiss2_job_denied_old_conviction",
    scenario:
      "I was denied a job because of a conviction from twenty years ago. Can I sue the company?",
  },
  {
    id: "nearmiss2_city_towed_parade",
    scenario:
      "The city towed my car during a parade without any warning and charged me a fee.",
  },
  {
    id: "nearmiss2_party_host_injury",
    scenario:
      "My teenager's friend's parents let the kids drink at their party and someone got hurt. Can we sue them?",
  },
].map((s) => ({ ...s, maxResults: 0 }));
