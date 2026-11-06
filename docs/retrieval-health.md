# Retrieval health

The internal dashboard at `/internal/retrieval-health` (token-gated, `RETRIEVAL_HEALTH_TOKEN`) answers two questions: is retrieval healthy right now, and which real scenarios did it fail on.

## Storage

Three shapes, because the data has three jobs. Every request writes them in one pipelined Redis round trip (`api/_retrievalHealthStore.js`).

| Key                                  | Type             | Expiry   | Holds                                                                                                       |
| ------------------------------------ | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `metrics:retrieval:totals:v3`        | hash (`HINCRBY`) | none     | Lifetime counters. Atomic, so concurrent writers can't lose counts (the old JSON blob could).               |
| `metrics:retrieval:recent:v3`        | capped list      | 7 days   | Last 1500 events, for the 5m/1h windows and the trendline. **No scenario text.**                            |
| `metrics:retrieval:failure:v3:<id>`  | hash per scenario| 30 days  | **Structured features only**: matched legal concepts, length bucket, retrieval figures, repeat count, first/last seen, review status and note. No scenario text. Refreshed on every repeat. |
| `metrics:retrieval:failure-text:v3:<id>` | string       | 14 days  | The redacted, name-masked snippet. Written once with `SET NX EX`, so **repeats never extend the 14 days**. Deleted when the failure is reviewed or ignored, and never re-stored for a scenario already reviewed or ignored. |
| `metrics:retrieval:failure-index:v3` | sorted set       | none     | Failure ids by last-seen time, capped at 300. Ids whose record expired are dropped on read.                 |

Redis falls back to in-memory state in dev and when Redis is unreachable.

`api/_retrievalEvents.js` is the one place that decides what an event means (operational, error, quality, failure) and how it adds up. Window stats, lifetime counters, the trendline and failure capture all use it, so a new reason code is classified once.

Reason codes that are not retrieval attempts (`filter_disabled`, `non_criminal_scope`) never count toward rates or failures. `no_terms_or_databases` does count as a miss.

## Failed scenarios

A failure is an operational event with an error, a timeout, or zero verified case law. For it the server keeps two separate things, only for failures:

- **Structured features** (30 days, refreshed on repeats): the legal concepts the scenario matched (the controlled vocabulary in `_legalConcepts.js`, with the same negation handling as retrieval, so "there was no search" is not a search), a coarse length bucket, and retrieval figures (terms tried, databases, candidates, verification calls, semantic drops, pass, fallback). None of it is the user's wording. These are what the tuning suggestions are built from, so they keep working after the text is gone.
- **A redacted snippet** (14 days from first capture, deleted on review):

- `api/_scenarioRedaction.js` strips emails, URLs, phone numbers, SINs, postal codes, street addresses and any run of 6+ digits, **masks likely names** (Capitalised words that aren't legal vocabulary, jurisdictions, days/months or acronyms, and the name after a title such as "Officer"; a public case name after "R v" is kept), then caps the text at 280 characters.
- **It still cannot catch every name.** Lowercase names and a single name that opens a sentence get through, and Capitalised place names are masked too (over-masking is the safe direction). Don't describe it as full anonymisation anywhere, including the privacy policy.
- Reviewing or ignoring a failure **deletes its text key**. The dashboard says so on each card. Promoted failures keep their text until it expires, so `npm run retrieval:promote` can show it to you.
- If the status read that gates text storage fails, no text is written (fail closed).
- `errorMessage` is reduced to a fixed label (`timeout`, `network_error`, `rate_limited`, `http_4xx`, `http_5xx`, `upstream_error`): raw upstream errors can echo the query.
- Redaction runs inside the store, before the write, so no caller can store raw text. The metrics log line never carries scenario text either.
- The id is `f` + 15 hex characters of a hash of the redacted text. The leading letter matters: `@upstash/redis` JSON-parses what it reads, so an all-digit id would come back as a number.
- The same scenario seen again bumps `count` and `lastSeen`; it never resets the review status.

### Review workflow

Each failure has a status: `new`, `reviewed`, `promoted`, `ignored`. The dashboard changes it through `POST /api/retrieval-health` with `{ id, status, note? }` (same bearer token; the id must be a fingerprint the server minted, the note is capped at 280 characters, and a POST can only update an existing record).

Promoting is a two-step handoff, because a Vercel function can't write to the repo:

```bash
npm run retrieval:promote -- --dry-run   # list what would be added
npm run retrieval:promote                # append stubs to tests/fixtures/promoted-failures.json
```

**This repo is public, so user text is never committed.** The script prints each redacted snippet to your terminal only and writes a placeholder `scenario` (`REWRITE: synthetic <class> scenario`). The same rule covers the other repo-visible outputs: `scripts/performance-monitor.js` (public Actions logs) and `scripts/collect-production-no-caselaw.js` (workflow artifacts) print ids, classes and counts, never text.

Stubs are `knownFailure` entries with empty labels, so they never fail the suite. `tests/unit/retrievalFailureSet.js` loads them. To finish one: rewrite `scenario` as a synthetic one (same legal facts, invented details), set `expectedPrimary`, add `shouldInclude` / `shouldExclude` citations and `landmarkMatches`, then delete `knownFailure`. The script is idempotent (`sourceFailureId`). The dashboard's "Copy test stub" button does include the redacted text, for pasting locally while you rewrite it.

## Handing a failure to Claude

Each card has a **Hand off to Claude** button. It copies `/fix-retrieval-failure <id>`; paste that into a Claude Code session in this repo. The project skill (`.claude/skills/fix-retrieval-failure/SKILL.md`, local and gitignored like the other project skills) fetches the record with `npm run retrieval:failure -- <id>` (needs `RETRIEVAL_HEALTH_TOKEN` in `.env`), reproduces the miss offline, makes the smallest fix, adds a synthetic regression case to `tests/unit/retrievalFailureSet.js`, runs the retrieval and guardrail suites, commits on a branch, and **stops for your OK**. It never pushes, opens a PR or changes the failure's status (reviewing deletes the stored text). It also never writes the real scenario text anywhere in the repo.

## Alerts

`evaluateRetrievalAlerts` still reads the 1h window. To keep the analyze path cheap, alerts are only evaluated for a failing or slow retrieval, and they run without the response waiting on them. `analyze.js` does wait for the event write itself (`flushMetricWrites`), because a serverless function can be frozen once the response is sent.

If a window has more than 1500 events, only the latest 1500 are read; `historyMaxEvents` in the response says so.

## Endpoint

`GET /api/retrieval-health?status=new|reviewed|promoted|ignored|all&failureLimit=20&failuresOffset=0` returns windows, lifetime stats, trendline, alerts, the failure queue (`failures`, with per-status `counts`) and `improvements`. It is never cached. The rate limit is 600/hour per IP: auto-refresh alone is 120/hour.

## One-off cleanup after deploying

The old stores are no longer read or written. The v1 event list kept an unredacted `scenarioSnippet` with no expiry. This was run on 2026-11-06 and the keys are gone; it is kept here for reference.

```bash
node --env-file=.env scripts/purge-legacy-retrieval-keys.js            # list only
node --env-file=.env scripts/purge-legacy-retrieval-keys.js --delete   # remove
```

The first v3 release stored the snippet inline in each failure hash with a 30-day expiry. The new reader ignores that field, but it is still in Redis until you remove it:

```bash
node --env-file=.env scripts/purge-legacy-retrieval-keys.js --strip-v3-snippets            # list only
node --env-file=.env scripts/purge-legacy-retrieval-keys.js --strip-v3-snippets --delete   # remove
```

Name masking changes the text a fingerprint is computed from, so scenarios recorded before it will not merge with new repeats of the same scenario. That is harmless: the old records age out.

## Privacy policy

`public/privacy.html` must match this page. Wording:

> **Searches that don't find any cases.** Sometimes a search can't find any real cases to show you. When that happens, we save a little information so we can fix the gap. (1) A short note about the topic, for example "theft" or "police search", plus some technical details about how the search went. It doesn't contain your words, and it isn't tied to your name, email, account or IP address. We keep it for 30 days. (2) A shortened copy of what you typed. We take out email addresses, phone numbers, web links, addresses and ID numbers, hide words that look like names, and keep only the first part (about 280 characters). We delete it after 14 days, or sooner once we've looked at it. The 14 days counts from the first time we saved it, even if the same search happens again. Our name-hiding isn't perfect, so please don't type real names into a search.

Retention table rows: _Topic notes about searches that found no cases: 30 days after the last similar search_; _Shortened copy of a search that found no cases: up to 14 days (sooner once we've looked at it)_. Reviewer-written test cases are synthetic rewrites, so the policy needs no line about the repo.
