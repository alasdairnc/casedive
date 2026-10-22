# Retrieval evaluation

How we measure whether CaseDive shows the right case law. Three harnesses exist; only the gold eval measures hits against known-good answers.

| Harness | Command | Measures | Gaps |
| --- | --- | --- | --- |
| Gold eval | `npm run eval:retrieval-gold` | Hit rate, recall@3, precision, wrong and duplicate cases, against labelled answers | Offline: no model-suggested citations yet |
| Failure set | `npm run test:retrieval-failures` | Known false positives stay empty | Only checks absence |
| Filter gate | `npm run test:filter` | Keyword overlap between scenario and returned case text | A proxy; `shouldInclude` is never checked; makes no CanLII call even with a key |

## Gold eval

`tests/unit/retrievalGoldSet.js` lists scenarios. Each labels corpus cases (by citation) as:

- `relevant`: a good answer for these facts.
- `acceptable`: on point enough to show.
- `wrong`: must never be shown.

The scope is criminal law, including the Charter as it applies to criminal proceedings.

Anything returned and not labelled is **unlabelled**: not counted as wrong, but listed so someone can label it. Label from the law, never from what retrieval returns today. A scenario with no relevant or acceptable case expects an empty answer; its `gap` field notes what the corpus is missing.

The runner (`scripts/_retrievalGoldEval.js`) uses the same candidate scorer (`matchLandmarkCases` in `api/analyze.js`) and the same `maxResults: 10` as production, with no model call and no CanLII call. Citations are compared on the reporter form (`2009 SCC 32`), because retrieval returns both `R v Grant, 2009 SCC 32` and the bare form.

```bash
npm run eval:retrieval-gold                      # summary + everything not a clean hit
npm run eval:retrieval-gold -- --verbose         # every scenario
npm run eval:retrieval-gold -- --ids a,b         # some scenarios
npm run eval:retrieval-gold -- --json out.json   # machine-readable
npm run eval:retrieval-gold -- --strict          # exit 1 if a wrong case is shown
npm run eval:retrieval-gold -- --compare         # RETRIEVAL_FULLTEXT off vs on, side by side
```

The first import of `api/analyze.js` can take about 20 seconds on a cold machine (`_subscription.js`).

`tests/unit/retrievalGold.test.js` checks label integrity (every labelled citation exists in the corpus) and ratchets the numbers: a retrieval change that lowers hit rate, recall, precision or empty-when-right, or raises wrong or duplicate cases, fails. Raise the floors in that file when retrieval improves.

## Model replay (the production path)

Most of production's case law comes from citations the model suggests and CanLII verifies, which the offline run cannot see. `scripts/record-retrieval-fixtures.js` records, for each scenario, what the live model suggests (`analyzeWithRetry`, the real prompt and model) and what CanLII answers (status and title only), into `tests/fixtures/retrieval-ai-fixtures.json`. `--with-model` then replays that through retrieval offline, with no tokens:

```bash
# SPENDS CLAUDE TOKENS (about 90 model calls for the full set; ~75k output tokens on 2026-10-08). Opt-in only.
node --env-file=.env scripts/record-retrieval-fixtures.js            # new scenarios only
node --env-file=.env scripts/record-retrieval-fixtures.js --ids a,b  # just these
npm run eval:retrieval-gold -- --with-model                          # free replay
```

The replay prints how many scenarios differ from what the live run showed at recording time. Zero means the replay is faithful (it was 0 of 88 on 2026-10-08). After a deliberate retrieval change the differences are that change's effect.

Replay is valid only for changes made **after** the model call (citation resolution, the semantic filter, scoring, selection). A corpus addition, a `matchLandmarkCases` change or the full-text flag changes the prompt, so judging it needs a fresh recording. The unit test requires a recording for every dev and held-out scenario; record new ones with `--ids`. The recorder disables Redis so a cached lookup cannot hide a CanLII response, and needs `dangerouslyDisableSandbox` for network access.

On 2026-10-08, of 58 scenarios with a known answer: the model suggested a good case and it was shown for 31; the model suggested it and the pipeline lost it for 5; the corpus supplied it when the model did not for 10; neither for 11. Many of the 11 are a correct case name with a wrong or non-neutral citation number (`R v Martineau, 1990 CanLII 631 (SCC)`), which CanLII verification rejects.

## What changed in retrieval (2026-10-08)

Measured by model replay; each step was judged against unseen scenarios, not the ones it was developed on.

1. **SCR identity key** (`src/lib/canlii.js`): bare SCR citations keyed on year alone merged different cases and split one case written two ways.
2. **Model citations resolved to the corpus** (`resolveCorpusCase`): parties, year and court on exactly one corpus row, before CanLII verification. A correct name with a wrong or pre-2000 number used to be dropped. The case must also share two distinct words with the scenario; without that the model's irrelevant citations (a disclosure case for an online-defamation question) leaked.
3. **Vouched lane** (`_caseLawRetrieval.js`): a corpus case the model suggested and the scenario corroborates skips the lexical heuristics that dropped it (the trial-delay regex, compatibility demotion, score thresholds). It still passes the non-criminal and family-lane gates, ranks by shared words (base score 12 plus one per word, below the 16 a minor traffic stop needs), and wins a merge against a lower-scored seed copy of the same case.

4. **Model scope gate** (`modelSaysNonCriminal`): when the model cites no Criminal Code section and every statute it cites is civil or provincial (a Residential Tenancies Act, a Highway Traffic Act, a Human Rights Code), retrieval returns nothing (`reason: non_criminal_scope`). Statutes enforced as crimes (CDSA, YCJA, Cannabis Act, Firearms Act, Fisheries Act, CEPA, Customs Act) count as criminal, and family law is exempt. A Charter citation does not rescue a scenario: the model attaches one to almost any question about a search. This was chosen from data: the model's `criminal_code` count alone does not separate scope (20 of 73 real questions have none), but "no Criminal Code section and civil statutes only" does. A state-actor rule for Charter-only cases was tried first and reverted: it removed one leaking scenario against a criterion of three.

Dev strong hit 76.2% to 81.0%; held-out batch 1 38.5% to 61.5%; batch 2 (unseen) 60.0% to 73.3% with no wrong case; leaking negative scenarios 9 to 8 of 40. Dev precision slipped 0.9 points while every hit measure rose.

After the scope gate the 13 near-miss negatives (`retrievalNearMissNegatives.js`) no longer leak (they leaked 7 of 14 before any of this work), and a blind second batch of 14 (`retrievalNearMissNegatives2.js`) went from 3 leaks to 1. The fixtures were re-recorded with the model's `charter` and `civil_law` output (131 scenarios); a re-recording moves the held-out numbers by about one scenario, so floors in the unit test sit one scenario below the measured values.

**Still open.** The gate depends on the model citing statutes; a scenario where it cites nothing at all is not gated. `heldout_speeding_hit_someone` is flagged "clearly non-criminal" by a false positive, which blocks Roy and Creighton. Corpus gaps (assault with a weapon, shoplifting, robbery) remain. Production needs the 7-day response cache to expire (or its key bumped) before users see any of this.

## Held-out set and negative replay

- `tests/unit/retrievalHeldOutSet.js` holds 13 frozen scenarios written in everyday wording before the full-text ranker existed, without reading any corpus entry's facts. Do not tune against them or edit them to flatter a change; add new ones instead. They are the generalisation check: on 2026-10-08 the development set scored 73.8% strong hit and the held-out set 38.5%.
- The negative replay runs the failure set's 26 "expect no case law" scenarios through the production candidate scorer and the real corpus. `scripts/evaluate-retrieval-failures.js` injects its own landmark matches, so it never exercised `matchLandmarkCases`; this does. Two leak today (a robbery question shows R v McCraw, a simple-possession question shows R v Marakah).
- The gold runner also applies `selectTopRetrievedCases`, the last stage before a user sees results, which keeps the top 3.

## Findings: why retrieval misses cases the corpus already holds (2026-10-08)

`matchLandmarkCases` (`api/analyze.js`) scores only a case's tags, topics and title; `facts` and `ratio` are never searched. `api/_corpusRanker.js` ranks the full text with BM25 and fuses it with the literal ranking by reciprocal rank fusion. It is behind `RETRIEVAL_FULLTEXT=on` (default off, with its own cache-key suffix) and **should stay off**:

| Offline | off | on |
| --- | --- | --- |
| Dev strong hit | 73.8% | 73.8% |
| Held-out hit | 61.5% | 53.8% |
| Negative leaks (of 26) | 2 | 3 |

The ranker does find the right case. In the traced misses, Jordan, Martineau, Roy, Creighton and Briscoe all reach the candidate list. Hand-written rules after it then throw them away:

1. **Semantic filter** (`filterBySemanticRelevance`) drops Jordan-type cases unless the scenario matches a regex ("delay", "waited"); "waiting eighteen months" does not. It also drops Roy, Creighton and Briscoe on domain-compatibility rules.
2. **Scoring** (`scoreCandidateForScenario`) is token overlap on a candidate's ratio, tags and topics, plus a match against hand-coded issue terms. Martineau scores 0 or -2 and loses to unrelated cases.
3. **Two issue detectors** (`detectCoreIssue`, `detectScenarioIssueForRanking`) disagree; "trial delay on a theft charge" is read as theft.

BM25 scores cannot replace those gates: the 26 negatives score 3.7 to 16.3, overlapping the positives (5 to 40), and many match two or three words. Telling "a parking ticket" from a real criminal question takes issue knowledge. The next step is not more lexical tuning. It is either (a) a model rerank of the corpus candidates, whose effect needs recorded `aiCaseLaw` fixtures (a live run spends Claude tokens and needs an explicit opt-in), or (b) replacing the brittle filter and scoring rules with one calibrated score, validated against the dev set, the held-out set and the negative replay together.

## Adding corpus cases

A new case goes in `src/lib/caselaw/criminal.js` only after three checks:

1. **Verified.** Confirm the citation through the CanLII API with the party name, so the title is checked (`node --env-file=.env scripts/expand-caselaw.js --input candidates.json --out-dir <scratch>`; every entry needs `"R v Name, 2020 ABCA 1"`, not a bare citation). CanLII can only confirm neutral citations; an SCR-only cite comes back unverified.
2. **Read.** Write `facts` and `ratio` from the judgment, not from a headnote or a blog. Secondary summaries are wrong often enough that this matters: a practitioner site described *R v Dragani*, 2018 BCCA 225 as upholding a 90-day sentence for a first-time break and enter, when it is a Crown appeal over a violent home-invasion robbery.
3. **Held-out gold scenario first.** Add one or two scenarios to `tests/unit/retrievalGoldSet.js` in fresh wording before writing the entry's `tags`, then take the tags from the judgment's own vocabulary. `matchLandmarkCases` adds 10 for each literal tag found in the scenario, so tags copied from a test scenario inflate the score. Relabel any gap scenario the case now answers, and label where it must not appear.

Cases from provincial courts of appeal are allowed where the SCC has nothing on an everyday offence (`court` is the neutral-citation code, e.g. `ABCA`). List them when you report the change.

First lane fills (2026-10-08): *R v Moquin*, 2010 MBCA 22 (assault causing bodily harm, domestic); *R v Auger*, 2009 ABCA 310 (break and enter, sentence appeal); *R v Sekhon*, 2014 SCC 15 (cocaine, knowledge, expert evidence); *R v Sheppard*, 2022 ABCA 89 (criminal harassment). Still empty: assault with a weapon, shoplifting/theft under $5,000, robbery.

## Not covered yet

- Model-suggested citations verified through CanLII, which is most of production. Needs recorded `aiCaseLaw` fixtures so replay is deterministic.
- Non-criminal law. The gold set is criminal law only (owner decision, 2026-10-08): the `noncriminal_*` scenarios must come back empty, and family scenarios are not scored. Retrieval itself still serves family-law cases.
