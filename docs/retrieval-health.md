# Retrieval health

The internal dashboard at `/internal/retrieval-health` (token-gated, `RETRIEVAL_HEALTH_TOKEN`) answers two questions: is retrieval healthy right now, and which real scenarios did it fail on.

## Storage

Three shapes, because the data has three jobs. Every request writes them in one pipelined Redis round trip (`api/_retrievalHealthStore.js`).

| Key                                  | Type             | Expiry   | Holds                                                                                                       |
| ------------------------------------ | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `metrics:retrieval:totals:v3`        | hash (`HINCRBY`) | none     | Lifetime counters. Atomic, so concurrent writers can't lose counts (the old JSON blob could).               |
| `metrics:retrieval:recent:v3`        | capped list      | 7 days   | Last 1500 events, for the 5m/1h windows and the trendline. **No scenario text.**                            |
| `metrics:retrieval:failure:v3:<id>`  | hash per scenario| 30 days  | Redacted snippet, repeat count, first/last seen, review status and note. Refreshed on every repeat.         |
| `metrics:retrieval:failure-index:v3` | sorted set       | none     | Failure ids by last-seen time, capped at 300. Ids whose record expired are dropped on read.                 |

Redis falls back to in-memory state in dev and when Redis is unreachable.

`api/_retrievalEvents.js` is the one place that decides what an event means (operational, error, quality, failure) and how it adds up. Window stats, lifetime counters, the trendline and failure capture all use it, so a new reason code is classified once.

Reason codes that are not retrieval attempts (`filter_disabled`, `non_criminal_scope`) never count toward rates or failures. `no_terms_or_databases` does count as a miss.

## Failed scenarios

A failure is an operational event with an error, a timeout, or zero verified case law. The server stores a **redacted** copy of the scenario for it, and only for failures:

- `api/_scenarioRedaction.js` strips emails, URLs, phone numbers, SINs, postal codes, street addresses and any run of 6+ digits, then caps the text at 280 characters.
- **It cannot reliably remove names or places.** Don't describe it as full anonymisation anywhere (including the privacy policy).
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

Stubs are `knownFailure` entries with empty labels, so they never fail the suite. `tests/unit/retrievalFailureSet.js` loads them. To finish one: set `expectedPrimary`, add `shouldInclude` / `shouldExclude` citations and `landmarkMatches`, then delete `knownFailure`. The script is idempotent (`sourceFailureId`) and only ever serialises user text through `JSON.stringify`.

## Alerts

`evaluateRetrievalAlerts` still reads the 1h window. To keep the analyze path cheap, alerts are only evaluated for a failing or slow retrieval, and they run without the response waiting on them. `analyze.js` does wait for the event write itself (`flushMetricWrites`), because a serverless function can be frozen once the response is sent.

If a window has more than 1500 events, only the latest 1500 are read; `historyMaxEvents` in the response says so.

## Endpoint

`GET /api/retrieval-health?status=new|reviewed|promoted|ignored|all&failureLimit=20&failuresOffset=0` returns windows, lifetime stats, trendline, alerts, the failure queue (`failures`, with per-status `counts`) and `improvements`. It is never cached. The rate limit is 600/hour per IP: auto-refresh alone is 120/hour.

## One-off cleanup after deploying

The old stores are no longer read or written. The v1 event list kept an unredacted `scenarioSnippet` with no expiry, so check for it:

```bash
node --env-file=.env scripts/purge-legacy-retrieval-keys.js            # list only
node --env-file=.env scripts/purge-legacy-retrieval-keys.js --delete   # remove
```

Old lifetime numbers are not migrated (the store held 57 events).

## Privacy policy

`public/privacy.html` must describe the failed-scenario copies before this ships. Proposed wording:

> **Searches that return no results.** When a search returns no verified case law or fails, we keep a short copy of your scenario so we can fix the gap. Before it is stored, our server removes email addresses, phone numbers, web links, postal codes, street addresses and long ID numbers, and cuts it to about 280 characters. This automatic clean-up can't reliably remove names, so please leave names out. We keep one copy of each distinct scenario, with a count of how many times it was searched. It isn't linked to your account or IP address, and we delete it 30 days after it was last seen.

Plus a row in "How long we keep it" (_Redacted copies of searches that returned no results — 30 days after last seen_), "failed-search copies" in the Upstash line, and a new effective date.
