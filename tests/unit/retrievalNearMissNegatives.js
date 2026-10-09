/**
 * Near-miss negatives: questions that share vocabulary with corpus cases (a
 * search, an arrest, a fight, an officer) but are not criminal-law questions,
 * so no case law should be shown. They stress rules that trust the model's
 * suggestions, because the model may cite a criminal case for them.
 *
 * Written 2026-10-08, deliberately with that rule in mind. (Family law is not
 * here: the product serves it on purpose, so a family question is not a negative.) Same shape as the
 * failure set's "expect no case law" cases (maxResults 0), so the negative
 * replay (scripts/_retrievalGoldEval.js runFailureNegatives) takes them.
 */
export const RETRIEVAL_NEAR_MISS_NEGATIVES = [
  {
    id: "nearmiss_security_guard_bag_search",
    scenario:
      "A store security guard stopped me at the exit and searched my bag. Were my Charter rights violated?",
  },
  {
    id: "nearmiss_landlord_entered_apartment",
    scenario:
      "My landlord let himself into my apartment while I was out to check on a leak. Can he do that without telling me?",
  },
  {
    id: "nearmiss_sue_bar_punch",
    scenario:
      "I want to sue the man who punched me in a bar for my medical bills and lost wages.",
  },
  {
    id: "nearmiss_speeding_ticket_asked_drinking",
    scenario:
      "I got a speeding ticket and the officer asked if I had been drinking, but I blew zero. Can I fight the ticket?",
  },
  {
    id: "nearmiss_insurance_claim_denied_crash",
    scenario:
      "My insurance company denied my claim after a car crash and I want to dispute their decision.",
  },
  {
    id: "nearmiss_employer_locker_search_fired",
    scenario:
      "My employer searched my locker at work for stolen items and then fired me. Is that allowed?",
  },
  {
    id: "nearmiss_evicted_without_notice",
    scenario:
      "My landlord told me to leave within a week and changed the locks. Was I evicted properly?",
  },
  {
    id: "nearmiss_bouncer_thrown_out",
    scenario:
      "A bouncer at a club grabbed me and threw me out and I want to complain to the liquor board.",
  },
  {
    id: "nearmiss_fired_harassment_complaint",
    scenario:
      "I was fired after a sexual harassment complaint at work and want to file a human rights complaint.",
  },
  {
    id: "nearmiss_dog_bite_compensation",
    scenario:
      "My neighbour's dog bit me in the yard and I want compensation for the injury.",
  },
  {
    id: "nearmiss_condo_board_fine",
    scenario:
      "My condo board fined me for a noisy party and I want to appeal the decision.",
  },
  {
    id: "nearmiss_bylaw_officer_fence",
    scenario:
      "A bylaw officer gave me a fine for my fence height and was rude to me about it. Can I contest it?",
  },
  {
    id: "nearmiss_school_phone_taken",
    scenario:
      "A teacher took my son's phone at school and read his messages. Is the school allowed to do that?",
  },
].map((s) => ({ ...s, maxResults: 0 }));
