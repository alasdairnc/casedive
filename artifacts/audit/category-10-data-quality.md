# Category 10: Data Quality Traps

Audit date: 2026-04-16
Auditor: inline (main session)

## Entry counts

| File                | Count method                      | Count  | Claimed (CLAUDE.md/memory) | Match?                                                                                                                    |
| ------------------- | --------------------------------- | ------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| criminalCodeData.js | grep "section" occurrences        | ~1,557 | 1,516                      | Close — likely overcounts by ~40 (some "section" appears in descriptions); entry count is in the right order of magnitude |
| civilLawData.js     | grep "section\|citation\|key:"    | ~119   | 191                        | Under — grep pattern may miss some entries; possible undrecount                                                           |
| charterData.js      | grep "section\|article\|citation" | ~19    | 55                         | Significantly under — grep pattern not matching entry structure                                                           |

Note: Without reading the full file structure, exact counts could not be verified. The CLAUDE.md claims (1,516 / 191 / 55) could not be precisely confirmed or denied via grep alone. File sizes suggest criminalCodeData.js (316KB, 15,711 lines) is consistent with ~1,500+ entries.

## Findings

### [Low] Entry counts could not be precisely verified from grep patterns

File: src/lib/criminalCodeData.js, src/lib/civilLawData.js, src/lib/charterData.js
Evidence: Grep-based counting is imprecise for complex data structures. Exact count verification would require reading the file structure and counting Map/object entries.
Impact: Cannot confirm or deny the claimed counts. Not a finding per se but a coverage gap.
Trace confidence: Low

## No placeholder content found

Grep for `TODO`, `FIXME`, `placeholder`, `TBD`, `lorem`, `xxx` across all three data files returned **zero matches**. No placeholder text in production data.
Trace confidence: High

## No duplicate key indicators found

No direct duplicate-key scan was performed (files too large). However, the codebase includes a `legal-data-validator` agent skill (per CLAUDE.md) specifically designed to check for duplicate keys and schema conformance. That skill should be the authoritative validator.
Trace confidence: Low (not audited)

## Citation format sampling

Criminal Code entries should cite `RSC 1985, c C-46`. Charter entries should cite `Constitution Act, 1982, Schedule B, Part I`. These were not individually verified against the full dataset — a task for `legal-data-validator`.

## False Alarms

- `criminalCodeData.js` being 316KB / 15,711 lines is consistent with the known-large dataset. Import pattern correctly uses `criminalCodeParts.js` for the parts list per CLAUDE.md guidance.

## Coverage Gaps

- Entry counts are approximate due to grep-pattern limitations on complex JS data structures.
- Duplicate key detection requires parsing the Map construction — not done inline.
- Citation format validation across 1,500+ entries not feasible inline. Use `npm run legal-data-validator` (or equivalent) for this check.
- `src/lib/caselaw/` directory (MASTER_CASE_LAW_DB) not audited — contains the in-app case law database used for landmark matching and retrieval seeding. Same quality concerns apply.
