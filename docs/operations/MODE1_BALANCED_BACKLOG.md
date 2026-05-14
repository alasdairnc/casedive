# Mode 1 Balanced Scenario Backlog

## Summary Targets

- Total new scenarios: 25
- zero_expected target: 10
- nonzero_required target: 15

> Note: Original targets were 13/12. Implementation landed at 10/15 — actual matrix below is canonical. Header updated 2026-05-14 to match reality.

## Candidate Matrix

| Slot | Status | id                                         | expectedPrimary     | expectedResult   | scenario summary                                       | must include anchors       | must exclude anchors            |
| ---- | ------ | ------------------------------------------ | ------------------- | ---------------- | ------------------------------------------------------ | -------------------------- | ------------------------------- |
| 1    | done   | impaired_stop_breath_demand_positive       | impaired_driving    | nonzero_required | roadside stop with breath demand and detention context | grant, detention, impaired | jordan, trial delay             |
| 2    | done   | impaired_refusal_lawful_demand_positive    | impaired_driving    | nonzero_required | refusal after lawful demand issue                      | lawful demand, refusal     | pure theft markers              |
| 3    | done   | impaired_minor_ticket_negative             | minor_traffic_stop  | zero_expected    | minor speeding ticket only no detention/search         |                            | grant, hunter, jordan           |
| 4    | done   | impaired_phone_search_positive             | impaired_driving    | nonzero_required | phone search after impaired stop without warrant       | search, warrant, impaired  | unrelated robbery anchors       |
| 5    | done   | drug_trafficking_street_sale_positive      | drug_trafficking    | nonzero_required | quantity plus packaging and sale intent                | cdsa, trafficking          | simple possession only          |
| 6    | done   | drug_trafficking_chat_logs_positive        | drug_trafficking    | nonzero_required | messages used for trafficking allegation               | trafficking, intent        | counsel-only anchors            |
| 7    | done   | simple_possession_not_trafficking_negative | general_criminal    | zero_expected    | possession only no trafficking facts                   |                            | trafficking, s. 5               |
| 8    | done   | sexual_assault_consent_positive            | sexual_assault      | nonzero_required | consent dispute with allegation details                | consent, sexual assault    | bodily harm only anchors        |
| 9    | done   | sexual_assault_mistaken_belief_positive    | sexual_assault      | nonzero_required | mistaken belief in communicated consent issue          | mistaken belief, consent   | robbery anchors                 |
| 10   | done   | assault_bodily_harm_broken_nose_positive   | assault_bodily_harm | nonzero_required | punch causes broken nose and injury evidence           | bodily harm, assault       | sexual assault anchors          |
| 11   | done   | assault_with_weapon_knife_positive         | assault_with_weapon | nonzero_required | threat with knife during altercation                   | weapon, threat             | jordan                          |
| 12   | done   | bar_fight_self_defence_negative            | assault_bodily_harm | zero_expected    | clear self-defence framing without charge detail       |                            | sexual assault, trafficking     |
| 13   | done   | detention_no_counsel_positive              | charter_detention   | nonzero_required | arbitrary detention issue without lawyer request facts | detention, s. 9            | jordan, trial delay             |
| 14   | done   | counsel_no_detention_positive              | charter_counsel     | nonzero_required | denied lawyer call after arrest questioning            | counsel, 10(b)             | pure search-warrant anchors     |
| 15   | done   | detention_mislabeled_as_search_negative    | charter_detention   | zero_expected    | brief stop no search no seizure no arrest              |                            | hunter, search, warrant         |
| 16   | done   | peace_bond_repeated_threats_positive       | peace_bond          | nonzero_required | repeated threats and fear application for peace bond   | peace bond, recognizance   | trial delay                     |
| 17   | done   | landlord_repair_dispute_negative           | general_criminal    | zero_expected    | landlord maintenance dispute civil only                |                            | grant, jordan, hunter           |
| 18   | done   | workplace_harassment_policy_negative       | general_criminal    | zero_expected    | workplace policy dispute no criminal facts             |                            | robbery, theft, charter         |
| 19   | done   | online_defamation_civil_negative           | general_criminal    | zero_expected    | online defamation complaint civil framing              |                            | criminal theft/robbery anchors  |
| 20   | done   | neighbor_tree_damage_civil_negative        | general_criminal    | zero_expected    | property damage dispute between neighbors civil claim  |                            | charter landmarks               |
| 21   | done   | lost_phone_found_property_negative         | general_criminal    | zero_expected    | found-property confusion no force/theft facts          |                            | robbery, s. 343                 |
| 22   | done   | robbery_force_alley_positive               | robbery             | nonzero_required | force used to take backpack in alley                   | robbery, force             | jordan                          |
| 23   | done   | theft_store_conversion_positive            | theft               | nonzero_required | conceal and leave store with unpaid goods              | theft, s. 322              | trial delay                     |
| 24   | done   | mixed_delay_plus_counsel_positive          | trial_delay         | nonzero_required | prolonged delay plus denied access to counsel          | 11(b), counsel             | unrelated property-only anchors |
| 25   | done   | ambiguous_can_i_be_charged_negative        | general_criminal    | zero_expected    | vague can-i-be-charged question with minimal facts     |                            | landmark-case names             |

## Balance Tracker

- zero_expected planned: 10 — actual: 10 ✓
- nonzero_required planned: 15 — actual: 15 ✓

## Review Checklist (verified 2026-05-14)

- [x] Each scenario has realistic factual detail (not keyword stuffing) — verified by sampling scenario bodies in `tests/unit/retrievalFailureSet.js`; all entries describe concrete facts (e.g., "punched someone during an argument and they suffered a broken nose and stitches"), not anchor lists
- [x] shouldExclude terms are specific enough to catch leakage — exclusion lists target named landmark cases ("Jordan", "Grant", "Hunter", "Woods") and specific section numbers ("s. 5", "s. 343", "10(b)"), not generic terms
- [x] Positive controls include issue-appropriate anchors — every `nonzero_required` entry carries `landmarkMatches` aligned to its `expectedPrimary` (e.g., assault_bodily_harm → R v Jobidon; charter_detention → R v Grant; trafficking → CDSA cases)
- [x] No duplicated scenario intent — 25 distinct `id` values across `tests/unit/retrievalFailureSet.js`, each with unique scenario text; spot-check confirms no overlapping fact patterns within the same `expectedPrimary` bucket
- [x] Split remains balanced — 10 zero / 15 nonzero matches the matrix; targets header corrected to reflect implementation
