# Model upgrade plan

How to move `/api/analyze` to a better model without losing case-law hit rate. Written 2026-10-30 after a
trial of Haiku 5.5 that was reverted.

## Where we are

Production uses `claude-haiku-4-5-20251001` with `max_tokens` 1800 (`ANTHROPIC_MODEL_ID`,
`ANALYZE_MAX_TOKENS` in `api/_constants.js`). The model matters for retrieval twice: it writes the analysis, and
its suggested citations feed the corroborated lane (`resolveCorpusCase`, the vouched lane in
`_caseLawRetrieval.js`). A model that suggests different citations changes which corpus cases are shown, so a
model swap is a retrieval change, not only a quality or cost change.

## What the Haiku 5.5 trial showed

Same code, same tags, 130 recorded scenarios (`tests/fixtures/retrieval-ai-fixtures.json`):

| | Haiku 4.5 | Haiku 5.5 |
|---|---|---|
| Replies cut off at `max_tokens` 1800 | 1 of 131 | 86 of 104 |
| Output tokens, median / max | 894 / 1800 | 2448 / 4031 |
| Cap needed | 1800 | about 5000 |
| Dev strong hit (replay) | 86.0% | 79.1% |
| Negatives showing a case | 2 of 39 | 4 of 39 |
| Near-miss batch 2 leaks | 1 | 2 |

Two separate costs: about 2.7x the output tokens (cost and latency, inside a 40 s per-call budget), and fewer
corpus cases corroborated. The second was not diagnosed. The likely suspects are different citation formats or
fewer citations per answer; check the recorded `ai.case_law` before assuming.

Dropping a new model into `ANTHROPIC_MODEL_ID` fails quietly: at the old cap, nearly every call truncates, the
retry doubles the latency, and some requests fail outright.

## Gate for any model change

Run in order; stop at the first failure.

1. **Cap probe.** Record 10 scenarios (`scripts/record-retrieval-fixtures.js --ids a,b,c --out <scratch file>`).
   Never use `--force` without `--ids` on the real fixtures file, and copy it aside first. Count
   `stopReason: "max_tokens"` in `usage`. Set `ANALYZE_MAX_TOKENS` from the data: the full-run max plus about 20%.
2. **Latency.** The slowest recording must fit the 40 s call budget with the 8 s post-model reserve
   (`ANALYZE_*` in `api/_constants.js`).
3. **Full re-record** on the new model (all 130 scenarios, concurrency 2). Opt-in, spends tokens.
4. **Replay.** `npm run eval:retrieval-gold -- --with-model`, then `npm test`.
5. **Ship criteria**, written down before the run: dev hit and strong hit no lower than the incumbent;
   negatives no worse than 2 of 39; near-miss batch 2 no worse than 1 leak; held-out judged on aggregate only.
6. **Other callers.** `api/case-summary.js` shares `ANTHROPIC_MODEL_ID` and has `max_tokens` 800. Test it on the
   new model before changing the constant.
7. **Production check.** Look at `stopReason` and `outputTokens` in the logs for the first day. Vercel keeps about
   an hour of logs, so use Sentry for older data. Check the `ANTHROPIC_MODEL_ID` env var in Vercel, which
   overrides the default.

## Ways to get a better model without a bare swap

In rough order of payoff against cost:

1. **Make retrieval depend less on the model's citations.** The corpus half is model-free
   (`npm run eval:retrieval-gold` without `--with-model`). Every point gained there survives any model change.
   Open work: the `general_criminal` lane (Martineau dropped by the score threshold, Mack and Grant/Stillman never
   matched by `matchLandmarkCases`), and the two issue detectors that should be merged.
2. **Control length by prompt.** Ask the newer model for shorter fields (a capped `analysis`, fewer items per
   section) and re-measure. If it fits near 1800 tokens, the cost penalty goes away.
3. **Split the work.** Use a cheap model for the structured JSON and a stronger one only for the citation
   suggestions, or the reverse. The suggestions need to be verifiable, and retrieval already checks them against
   CanLII, so a wrong one is dropped, not shown.
4. **Try a stronger tier, not only a newer Haiku.** Sonnet-class models may suggest citations that corroborate
   more corpus cases. It is the same gate; budget the cost per search first (public traffic is low, so it is
   affordable to test).
5. **Re-test 5.5 later** with a length-controlled prompt (option 2). The trial result was for the current prompt
   only.

## What not to do

- Do not lower the ratchet floors in `tests/unit/retrievalGold.test.js` to fit a worse model. Raise them as
  retrieval improves.
- Do not judge a model on the held-out sets by tracing them. Dev scenarios may be traced; held-out may not.
- Do not mix models in one fixtures file. Replay is only valid for the model that recorded it.
