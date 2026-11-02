# Open case-law search

Finds case law for scenarios the corpus and the model's own recall miss. Default
off: set `OPEN_CASE_SEARCH=on`. Code: `api/_openCaseSearch.js`, hooked into
`retrieveVerifiedCaseLaw` in `api/_caseLawRetrieval.js`.

## Why

CanLII's API has no text search; its only working endpoint looks a case up by
exact ID (see the note above `retrieveVerifiedCaseLaw`). Retrieval therefore
depended on the model naming a citation or the corpus holding the case. On
2026-11-02 "my therapist told my crimes to the police" returned no case law
because the corpus has no therapist-disclosure case and the model named none.

[A2AJ](https://a2aj.ca) publishes Canadian decisions with a free, keyless
full-text API (`https://api.a2aj.ca/search`). This module queries it.

## How it works

1. `retrieveVerifiedCaseLaw` pools the model's citations and the corpus matches.
2. If fewer than 3 candidates are pooled **and** the model supplied search terms,
   `searchOpenCaseLaw` queries A2AJ: the model's terms first, then scenario
   words, up to 12 words, scoped to courts (see Coverage).
3. Each hit becomes a normal candidate (`matchedTerm: "Open case-law search"`)
   and goes through the same semantic filter, scoring and CanLII verification as
   a model suggestion. `openSearchHits` (distinct query words A2AJ highlighted in
   the passage) adds up to 12 to the score, because a one-line snippet scores
   low on its own.
4. A hit CanLII can confirm shows as verified. A hit it cannot (pre-2000 and
   SCR-only citations such as Smith v Jones, `[1999] 1 SCR 455`) is kept with
   `verificationStatus: "unverified"` and a CanLII search link. A court source
   returned it, so it exists; the client re-checks and never hides "unverified".
5. Every open-search card says to check on CanLII that the case is still good law.

Guards: a passage must match at least 2 query words; citations that do not parse
(old ONCA docket ids such as `C38577`) are skipped; the call has a 4 s timeout
and fails open to an empty list; no model terms means no search, so the
pre-model retrieval pass in `analyze.js` never searches on scenario words alone.

`retrieval meta` reports `openSearchCandidates`. The health store has no slot for
it, so the candidates count under `ai` in `candidateSourceMix`.

The cache key gains an `o` (`cache:analyze:v4o:`), so flag-on results never reach
flag-off users. Flip the flag and old keys simply stop being read.

## Coverage and limits

- **Courts:** SCC and the appeal courts of ON, BC, NS, NL and YT. Not QCCA, ABCA,
  SKCA, MBCA or NBCA, and no trial courts. Chatillon v R., 2022 QCCA 1072 will
  not appear. A `jurisdiction` filter keeps the SCC and adds that province's
  appeal court when A2AJ has it.
- **No treatment data.** A hit may have been overturned or distinguished.
- **Lexical ranking.** It matches words, not meaning. Model terms find
  Smith v Jones and O'Connor; scenario words alone return noise.
- **Newer passages win.** For well-litigated issues it returns recent appeal
  cases, not the SCC landmark. The corpus covers landmarks; this fills gaps.
- **Licence.** A2AJ hits carry an `upstream_license`; we show only the citation,
  title and our own CanLII link, not A2AJ text.

## Live eval

```bash
npm run eval:open-search
npm run eval:open-search -- --only therapist_disclosure --out artifacts/open-search-eval.json
```

No Claude tokens and no CanLII calls. Node's `fetch` cannot resolve DNS inside
the Claude Code sandbox, so run it from a normal terminal. Baseline on
2026-11-02 (terms written the way the analyze model phrases them):

| Scenario | Expected | Found |
| --- | --- | --- |
| Therapist disclosure | Smith v Jones, O'Connor | both |
| Denied counsel | R v Grant | no (returned recent ONCA counsel cases) |
| Trial delay | R v Jordan | no (returned recent delay cases) |
| Crown disclosure | R v Stinchcombe | no (returned recent disclosure cases) |

The three misses are corpus landmarks, which the corpus already serves. Misses are
reported, not gated.

## Before turning it on in production

1. Run `npm run eval:open-search` and read the results.
2. Set `OPEN_CASE_SEARCH=on` on a Vercel preview, run a handful of scenarios the
   corpus lacks, and read the cards (relevance, the good-law note).
3. Run `npm run eval:retrieval-gold` flag off and on; the flag-off run must not
   change.
4. Watch `/api/analyze` latency: the search adds at most 4 s inside the 55 s
   budget.
