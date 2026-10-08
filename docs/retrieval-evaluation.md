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
```

The first import of `api/analyze.js` can take about 20 seconds on a cold machine (`_subscription.js`).

`tests/unit/retrievalGold.test.js` checks label integrity (every labelled citation exists in the corpus) and ratchets the numbers: a retrieval change that lowers hit rate, recall, precision or empty-when-right, or raises wrong or duplicate cases, fails. Raise the floors in that file when retrieval improves.

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
