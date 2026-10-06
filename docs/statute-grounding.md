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
2. **Offer candidates.** Up to 8 sections (10 when both Acts apply, 4 of them reserved for the CDSA so a long youth-procedure list cannot push s. 5 off a trafficking charge) picked by hand-written rules
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
| Detection and candidates | 32 scenarios incl. traps (adult, "15-year-old car", "15 over the limit", "crack in my windshield", "found no drugs", cannabis, under 12, youth victim) | `tests/unit/statuteGroundingScenarios.js` |
| Prompt unchanged when off | byte-identical vs. before, several filter combos | same test file |
| Handler wiring (flag, post-check, cache key) | stubbed model | `tests/unit/analyzeStatuteGrounding.test.js` |
| **The live model actually behaves** | **opt-in script, not yet run** | `scripts/evaluate-statute-grounding.mjs` |

## Before flipping the flag

```bash
ANTHROPIC_API_KEY=... node scripts/evaluate-statute-grounding.mjs --live --mode both \
  --out artifacts/statute-grounding-eval.json
```

64 model calls in `--mode both`, so it is manual and never runs in CI. Read it for:

- **Hard failures (exit 1):** a cited section that does not exist, a CDSA/YCJA
  citation on a scenario that should engage neither Act, an excluded section,
  the CDSA cited for cannabis alone.
- **Coverage** of expected sections, grounding on vs off. Not gated.
- Read the `civil_law` text for a few youth scenarios yourself. The script
  checks section numbers, not whether the legal explanation is right.

## First live run (2026-10-05, 32 scenarios, grounding off vs on)

| | off | on |
| --- | --- | --- |
| Scenarios answered | 31/32 | 30/32 |
| Expected sections cited | 10/37 | 32/36 |
| Cited sections that do not exist | 1 (`CDSA s. 8`) | 0 |
| CDSA cited for cannabis alone | yes | no |
| CDSA/YCJA cited on the 10 "neither Act" scenarios | not scored | 0 |

- Off cites the right Act but often the wrong section (`YCJA s. 24(1)`, `s. 50-65`,
  `s. 19(1)` for a breach) or a string that is not one section ("S.C. 2002, c. 1, s. 50(1)").
- On skipped a lower-priority section in 3 runs (CDSA s. 10, YCJA s. 3, CDSA s. 4 as the lesser offence).
  Coverage is reported, not gated.
- **Open: 3 of 64 runs returned 500** (`youth_drug` off and on, `youth_breach` on). The handler aborts the model
  call at 25 s and answers 500 when it times out; a stubbed model never reproduces them. Not shown to be caused
  by grounding (`youth_drug` failed with it off too), but grounding adds prompt and output tokens, so re-run
  those scenarios and compare the new `medianMs` / `p95Ms` / `timeouts` figures before turning the flag on:
  `node --env-file=.env scripts/evaluate-statute-grounding.mjs --live --mode both --only youth_drug,youth_breach`.
- **Re-run of those two scenarios:** no errors in either mode, so the 500s look like transient timeouts. But on
  was slower (median 15.7 s vs 11.6 s, n=2; the cap is 25 s), and `youth_drug` returned 9 `civil_law` items against a
  1-3 instruction: the model treated the candidate list as a checklist. The hint now says it is a menu, at most 4
  sections, citation only.
- **Re-run after the hint change:** `youth_drug` on cited 4 sections (was 9), `youth_breach` on cited 3; 0 errors,
  0 invented sections in either mode. Latency this time ran the other way (on median 9.2 s, off 21.5 s, n=2), so
  the earlier gap was API variance, not grounding. Latency is noisy (off alone ranged 11.6-21.5 s), and an
  off-mode call at 21.5 s sits close to the handler's 25 s cap: that timeout risk exists with the flag off and is
  a separate issue.
- **Timeout handling (applies with the flag off too):** the model call was capped at 25 s while `analyze` may run
  60 s, a timeout came back as a generic 500 (and a Sentry exception), and a bad-JSON retry ran another full call
  with no check on time left. Now one call gets up to 40 s, a timeout answers **504** "took too long" (not a Sentry
  exception), and the retry only runs if 12 s remain after reserving 8 s for case-law retrieval
  (`ANALYZE_*` in `api/_constants.js`). `max_tokens` (1800) is **unchanged**: nothing yet shows it is binding. The
  handler now logs `stopReason`, `outputTokens` and `retried` per model call and the eval reports `truncated`,
  `retried` and output-token medians per mode. If `truncated` is non-zero in a full run, raise `max_tokens`; if
  `retried` is, the first reply was not valid JSON.
- The script checks section numbers only. The legal explanation in each `civil_law` item still needs a human read.

## Not done (deliberately)

- **Youth case law.** The corpus has none. Adding any means verifying every
  cite on CanLII (the corpus had 24 fabricated pre-2000 cites once).
- **Possession routing in case law.** `detectScenarioIssueForRanking`
  (`analyze.js`) and `_caseLawRetrieval.js` map "possession" to
  `drug_trafficking`, so a simple-possession scenario is ranked as an s. 5
  case. Separate change: it edits the retrieval files that need the
  retrieval-regression pass.
- **Cannabis Act.** Not in the data, so `verify.js` cannot verify it.
