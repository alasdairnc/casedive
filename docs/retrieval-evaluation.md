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

## Not covered yet

- Model-suggested citations verified through CanLII, which is most of production. Needs recorded `aiCaseLaw` fixtures so replay is deterministic.
- Whether non-criminal law (copyright, administrative) is in scope. `noncriminal_*` scenarios are unlabelled until that is decided.
