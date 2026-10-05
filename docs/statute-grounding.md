# CDSA and YCJA in the analysis pipeline

The explorer (`src/lib/cdsaData.js`, `ycjaData.js`) and `api/verify.js` already
cover every section and schedule of both Acts, independently verified. This is
the analysis side: getting `/api/analyze` to cite them, correctly.

**Status: built, default off.** Nothing changes for users until
`STATUTE_GROUNDING=on` is set in Vercel. That is the owner's call after the live
eval below has been run and read.

## What it does when on (`api/_statuteGrounding.js`)

1. **Detect** (deterministic, no model).
   - Youth is an *overlay*, not an issue class. "A 15-year-old shoplifted" is
     still a theft scenario; the YCJA rides along. Youth is never a `primary`
     in retrieval or ranking, so theft case law is not displaced. Ages 12-17,
     "teenager", "young person", "under 18"; a car, house or phone that is
     "15 years old" is not a person. An age mixed with an adult age is marked
     ambiguous and the prompt says the YCJA applies only if the accused was
     12-17.
   - Drugs: possession / trafficking / production / import-export / precursor
     equipment. Cannabis alone goes to the Cannabis Act, not the CDSA (CDSA
     Schedule II lists only synthetic cannabinoids), so it gets no CDSA
     candidates.
2. **Offer candidates.** Up to 8 sections picked by hand-written rules
   (`CDSA_RULES`, `YCJA_RULES`), put in the user message as
   `<reference_context source="statute_db">` with each section's verified
   summary. A unit test requires every section a rule can offer to exist and be
   `summarySource: "verified"`.
3. **Steer the model** with a few `civil_law` rules in the system prompt only
   when something fired (CDSA/YCJA go in `civil_law`, written `CDSA s. 5`, never
   guess a number). With nothing fired the prompt is byte-identical to before.
4. **Check the answer.** Any `civil_law` item that names the CDSA or YCJA with a
   section that is not in the Act is removed. What was offered, checked and
   dropped is recorded in `meta.statutes`. Items we cannot parse a section from
   are kept, not guessed at.

The cache key is `cache:analyze:v4g:` when on, so grounded results never reach
flag-off users (and vice versa).

## What "verified" means here

| Layer | How | Where |
| --- | --- | --- |
| The Acts' text and summaries | independent claim-by-claim pass, 232/248 passed, 16 corrected | PR #77 |
| Rule sections are real, in force, verified | unit test over every rule | `tests/unit/statuteGrounding.test.js` |
| Detection and candidates | 25 scenarios incl. traps (adult, "15-year-old car", speed limit, cannabis, under 12, youth victim) | `tests/unit/statuteGroundingScenarios.js` |
| Prompt unchanged when off | byte-identical vs. before, several filter combos | same test file |
| Handler wiring (flag, post-check, cache key) | stubbed model | `tests/unit/analyzeStatuteGrounding.test.js` |
| **The live model actually behaves** | **opt-in script, not yet run** | `scripts/evaluate-statute-grounding.mjs` |

## Before flipping the flag

```bash
ANTHROPIC_API_KEY=... node scripts/evaluate-statute-grounding.mjs --live --mode both \
  --out artifacts/statute-grounding-eval.json
```

~50 model calls, so it is manual and never runs in CI. Read it for:

- **Hard failures (exit 1):** a cited section that does not exist, a CDSA/YCJA
  citation on a scenario that should engage neither Act, an excluded section,
  the CDSA cited for cannabis alone.
- **Coverage** of expected sections, grounding on vs off. Not gated.
- Read the `civil_law` text for a few youth scenarios yourself. The script
  checks section numbers, not whether the legal explanation is right.

## Not done (deliberately)

- **Youth case law.** The corpus has none. Adding any means verifying every
  cite on CanLII (the corpus had 24 fabricated pre-2000 cites once).
- **Possession routing in case law.** `detectScenarioIssueForRanking`
  (`analyze.js`) and `_caseLawRetrieval.js` map "possession" to
  `drug_trafficking`, so a simple-possession scenario is ranked as an s. 5
  case. Separate change: it edits the retrieval files that need the
  retrieval-regression pass.
- **Cannabis Act.** Not in the data, so `verify.js` cannot verify it.
