# Category 4: Redis / Cache Integrity

Scope: every Upstash/Redis usage under `api/`, including rate limiting, response caching, retrieval-health metrics, case-law report store, retrieval-threshold alert dedup, and in-flight request dedup.

## Cache key inventory

| Key pattern                                                             | Set in                                                                  | TTL                                                                | Namespaced by user?                                                       |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| `rl:<endpoint>:<ip>` / `rl:<ip>` (fallback when no endpoint)            | `api/_rateLimit.js:47-48,74`                                            | `WINDOW_MS / 1000` = 3600s (sliding) via `SETEX`                   | By IP (via `x-forwarded-for`), not by authenticated user (no auth exists) |
| `cache:analyze:v3:<sha256(scenario+JSON(filters))>`                     | `api/analyze.js:64-71, 1011`                                            | `ANALYZE_CACHE_TTL_SECONDS` = **7 days** (604800s)                 | No — keyed purely on content of `scenario` + `filters`                    |
| `inflight:analyze:<cacheKey>`                                           | `api/analyze.js:817` (in-memory only via `withRequestDedup`, not Redis) | n/a (process-local Map)                                            | No                                                                        |
| `cache:verify:<sha256(JSON(citations))>`                                | `api/verify.js:99, 372`                                                 | **7 days** (604800s)                                               | No                                                                        |
| `cache:retrieve-caselaw:<sha256(JSON({scenario,filters,suggestions}))>` | `api/retrieve-caselaw.js:89, 199-202`                                   | **7 days**                                                         | No                                                                        |
| `inflight:retrieve-caselaw:<cacheKey>`                                  | `api/retrieve-caselaw.js:145` (in-memory `withRequestDedup`)            | n/a                                                                | No                                                                        |
| `cache:case-summary:<sha256(JSON(body))>`                               | `api/case-summary.js:196, 296-300`                                      | **7 days**                                                         | No                                                                        |
| `inflight:case-summary:<cacheKey>`                                      | `api/case-summary.js:247` (in-memory)                                   | n/a                                                                | No                                                                        |
| `cache:export-pdf:<sha256(JSON(body))>`                                 | `api/export-pdf.js:115, 386`                                            | **7 days**, base64-encoded PDF bytes                               | No                                                                        |
| `metrics:retrieval:events:v1`                                           | `api/_retrievalHealthStore.js:7, 759`                                   | **none (no TTL)** — `SET` with JSON array capped at 10 000 entries | No — single global list                                                   |
| `metrics:retrieval:last-event:v1`                                       | `api/_retrievalHealthStore.js:8, 273`                                   | **none** — `SET`                                                   | No                                                                        |
| `metrics:retrieval:event-count:v1`                                      | `api/_retrievalHealthStore.js:9, 282`                                   | **none** — `INCR`                                                  | No                                                                        |
| `metrics:retrieval:alltime:v1`                                          | `api/_retrievalHealthStore.js:10, 590`                                  | **none** — `SET` JSON blob                                         | No                                                                        |
| `metrics:retrieval:alert:<alertId>`                                     | `api/_retrievalThresholds.js:12-13, 367`                                | `ALERT_DEDUPE_SECONDS` = 900s                                      | No                                                                        |
| `feedback:case-law-reports:v1`                                          | `api/_caseLawReportStore.js:5, 130`                                     | **none** — `SET` JSON array capped at 1000                         | No                                                                        |

## Findings

### [High] Sliding-window rate limiter is not atomic — race allows bypass

File: `api/_rateLimit.js:45-83`
Evidence:

```js
const hitsJson = await Promise.race([redis.get(key), timeout]);
let hits = hitsJson ? JSON.parse(hitsJson) : [];
hits = hits.filter((t) => now - t < WINDOW_MS);
if (hits.length >= maxRequests) { return { allowed: false, ... }; }
hits.push(now);
await Promise.race([
  redis.setex(key, Math.ceil(WINDOW_MS / 1000), JSON.stringify(hits)),
  ...
]);
```

Impact: Two (or N) concurrent invocations for the same IP do a GET → mutate → SET sequence with no Lua script, no `WATCH`/MULTI, and no atomic counter. All concurrent requests read the same `hits` array, each appends one entry, and the last `SETEX` wins — the previous writes are clobbered. A single attacker can burst up to `concurrency × MAX_REQUESTS` requests per window because each concurrent writer independently decides "allowed". On Vercel serverless this is especially easy to trigger because an attacker can spray N simultaneous requests that each land on different function instances. Additionally the last-writer-wins semantic means the stored `hits` undercount real usage in subsequent windows as well.
Trace confidence: High

### [High] Retrieval-health events list grows unbounded on write race

File: `api/_retrievalHealthStore.js:743-761`
Evidence:

```js
const existing = await Promise.race([readRedisEvents(), timeout()]);
const merged = [...existing, event];
const capped =
  merged.length > MAX_PERSISTED_EVENTS
    ? merged.slice(merged.length - MAX_PERSISTED_EVENTS)
    : merged;
await Promise.race([
  redis.set(EVENT_LIST_KEY, JSON.stringify(capped)),
  timeout(),
]);
```

Impact: Read-modify-write pattern on a single Redis key (`metrics:retrieval:events:v1`) without locking. Concurrent `recordRetrievalMetricsEvent` calls (every `/api/analyze`, `/api/retrieve-caselaw`, cache hit, etc., logs one) can each read the same `existing`, append, and overwrite. Expected effects: (1) lost events under burst load, (2) the `MAX_PERSISTED_EVENTS=10_000` cap is only enforced at write time — because each writer reads stale state, the key size can temporarily exceed the cap. Because the value is a JSON array that is read, parsed, rewritten on _every_ event, and never TTL'd, the serialized payload can approach ~10 000 × event-size (≈several MB) and every record/read pair roundtrips that blob through Upstash REST (also transferred to every retrieval-health dashboard poll). This is a DoS/cost-amplification vector — a modest attacker writing events can inflate the persistent blob that every other request must now read.
Trace confidence: High

### [High] Retrieval-metrics event contents are attacker-influenced and stored without TTL

File: `api/_retrievalHealthStore.js:34-103` (normalizeEvent), `api/analyze.js:733-774` (cacheHit path feeds scenarioSnippet)
Evidence: `normalizeEvent` preserves `scenarioSnippet` (up to 280 chars), `errorMessage` (up to 200), `fallbackTriggerReason` (80), `issuePrimary` (40) sourced from the request/retrieval pipeline; `EVENT_LIST_KEY` has no TTL and lives forever capped at 10 000 entries.
Impact: Scenario text is attacker-controlled user input; it is persisted indefinitely in Redis and served back via the retrieval-health dashboard (`/api/retrieval-health`). Combined with the unbounded-growth race above, this is a persistent, publicly-observable (whoever can reach retrieval-health) attacker-writable store. Also relevant to cache poisoning: recent failure samples surfaced back to operators/devs can carry crafted text.
Trace confidence: Medium (downstream dashboard exposure depends on whether retrieval-health endpoint is authenticated)

### [Medium] Cross-user cache poisoning via scenario-keyed response cache

File: `api/analyze.js:64-71, 731-775`; `api/retrieve-caselaw.js:89-108`; `api/case-summary.js:196-216`; `api/verify.js:99-114`; `api/export-pdf.js:115-139`
Evidence: All response caches hash _only_ the request body (`scenario + filters`, `citations`, `{scenario,filters,suggestions}`, full `body`, full `body`). No user/session namespace.
Impact: Because there is no authenticated user, "cross-user" means _any_ visitor who sends the same scenario payload gets the same cached response for 7 days. This is by design for shared AI responses but creates two concrete issues:

1. **Deterministic cache prefill**: an attacker can submit a scenario, and every subsequent user who happens to compose the same scenario receives the attacker-triggered response — which may contain stale or hallucinated case law that slipped past filters. There is no re-verification; the cached JSON is returned verbatim.
2. **export-pdf cache stores binary output keyed on raw body**: `cache:export-pdf:<sha256(JSON(body))>` stores base64 PDF bytes for 7 days. Large bodies mean large cached values; an attacker can inflate Redis storage cost by submitting many distinct large payloads that each mint a 7-day entry.
   Also note `verify.js:99` uses `JSON.stringify(citations)` without normalization: `[a,b]` and `[b,a]` produce different cache keys for the same logical citations, wasting cache and multiplying storage.
   Trace confidence: Medium

### [Medium] `case-summary` cache key uses the raw `body` — user-visible output binding to attacker-chosen fields

File: `api/case-summary.js:196`
Evidence:

```js
const cacheKey = `cache:case-summary:${createHash("sha256").update(JSON.stringify(body)).digest("hex")}`;
```

Impact: The key is computed from `JSON.stringify(body)` _before_ field validation trims/normalizes. Any extra/unknown property the attacker attaches alters the key even though the actual summary generation uses only the whitelisted fields. An attacker can therefore (a) defeat caching by appending random properties (cost amplification toward Anthropic), and (b) create many distinct Redis keys each holding a 7-day summary of the _same_ citation — storage amplification. Same pattern applies to `export-pdf.js:115`.
Trace confidence: High

### [Medium] 7-day TTLs on all response caches exceed typical "user-scoped data" bounds

File: `api/_constants.js:3`; `api/verify.js:372`; `api/retrieve-caselaw.js:200`; `api/case-summary.js:298`; `api/export-pdf.js:386`
Evidence: `ANALYZE_CACHE_TTL_SECONDS = 60*60*24*7`; literal `7 * 24 * 60 * 60` copy-pasted in four other endpoints.
Impact: Case-law and Criminal-Code responses can shift within a week (new CanLII entries, filter tuning, model updates). 7-day TTL means users see stale legal research without any invalidation signal. Because there is no versioning beyond `v3:` in `cache:analyze:v3:…`, a prompt or filter-logic change does not invalidate old entries unless engineers remember to bump the prefix. Other four endpoints have _no_ version prefix at all (`cache:verify:`, `cache:retrieve-caselaw:`, `cache:case-summary:`, `cache:export-pdf:`) — silent stale-response risk after any logic change.
Trace confidence: High

### [Medium] `feedback:case-law-reports:v1` grows by attacker — no TTL, unauthenticated, single global key

File: `api/_caseLawReportStore.js:5-6, 135-155, 124-133`
Evidence:

```js
const REPORTS_KEY = "feedback:case-law-reports:v1";
const MAX_STORED_REPORTS = 1000;
...
export async function recordCaseLawReport(raw = {}) {
  ...
  const existing = await readRedisReports();
  existing.push(normalized);
  await writeRedisReports(existing);
}
```

Impact: Same read-modify-write race as the retrieval-health events list. Every call to `/api/report-case-law` re-reads and rewrites the full array. `MAX_STORED_REPORTS = 1000` cap is only enforced at write time, so concurrent writers can push it beyond 1000 temporarily. Each report holds up to ~1.2 KB of attacker-shaped text (scenarioSnippet 280, citation 180, title 180, summary 300, note 300). 1000 × ~1 KB ≈ ~1 MB blob rewritten on every report submission. No TTL; indefinite storage. No user auth; attacker can fill with 1000 payloads to displace legitimate feedback (log-retention eviction attack).
Trace confidence: High

### [Medium] `metrics:retrieval:alltime:v1` read-modify-write race and unbounded `byIssue` growth

File: `api/_retrievalHealthStore.js:486-591`
Evidence:

```js
const raw = await Promise.race([redis.get(ALLTIME_KEY), timeout()]);
let acc = ...;
... mutate acc, including acc.byIssue[issuePrimary] = {...} ...
await Promise.race([redis.set(ALLTIME_KEY, JSON.stringify(acc)), timeout()]);
```

Impact: (1) Non-atomic RMW — concurrent writers clobber each other's increments (undercounts alltime metrics). (2) `event.issuePrimary` is sliced to 40 chars but otherwise free-form (coming from retrieval pipeline). If the pipeline ever routes user-derived strings into `issuePrimary`, `acc.byIssue` becomes a dict that grows without bound because no cap is applied (only the _top 6_ are exposed; the full dict is still persisted).
Trace confidence: Medium

### [Medium] In-memory rate-limit fallback behaves differently from Redis path — race exists there too

File: `api/_rateLimit.js:92-125`
Evidence: The fallback path uses a non-atomic `store.get` → filter → push → `store.set` sequence on a `Map` that is per-instance. Vercel Fluid Compute reuses instances, so the Map persists _selectively_ across invocations on the same warm instance but not across cold/parallel ones.
Impact: (1) Inconsistent enforcement under Redis outage — an attacker who causes the 500ms timeout to fire (by e.g. saturating Upstash latency, or when Upstash is down) silently degrades to a per-instance limiter, and Vercel serves from N instances, so effective limit becomes `N × 5/hour` per IP. (2) The 500ms timeout errors are caught and the fallback is used — there is no circuit breaker, so every request pays a 500ms RTT when Upstash is unhealthy (compounding DoS). (3) The cleanup block at `_rateLimit.js:107-123` only triggers when `store.size > 500`; under high cardinality (e.g. spoofed `x-forwarded-for`) it runs on every request, adding CPU overhead.
Trace confidence: High

### [Medium] IP spoofing via `x-forwarded-for` trivially bypasses rate limiting

File: `api/_rateLimit.js:150-158`
Evidence:

```js
const forwarded = req.headers["x-forwarded-for"]?.split(",")[0]?.trim();
if (forwarded) return forwarded;
```

Impact: The code takes the _first_ entry of `x-forwarded-for`, which on Vercel's edge _should_ be the client — but an attacker who can reach the function directly (or via an origin URL that doesn't go through the edge) can set arbitrary `x-forwarded-for`. On Vercel production, the edge normally rewrites this header; however any in-house testing bypass, preview URL, or misconfigured direct origin allows trivial per-request IP rotation and unlimited bucket creation. Each spoofed IP creates a new `rl:<endpoint>:<ip>` Redis key with 1-hour TTL; millions of distinct keys are cheap for the attacker, expensive for Upstash cost. No upper bound on rate-limit key cardinality.
Trace confidence: Medium (depends on whether direct function URLs are exposed)

### [Low] Promise.race timer leaks — `setTimeout` never cleared when Redis wins

Files (multiple):

- `api/_rateLimit.js:58, 74-80` — two separate timers, neither cleared
- `api/analyze.js:734-737`
- `api/verify.js:102-114, 369-372`
- `api/retrieve-caselaw.js:92-95, 194-204`
- `api/case-summary.js:199-202, 292-303`
- `api/export-pdf.js:118-121, 383-386`
- `api/_retrievalHealthStore.js:236-239, 261-264, 269-275, 278-284, 287-292, 487-492, 596-599, 744-761`
- `api/_retrievalThresholds.js:357-369`
- `api/_caseLawReportStore.js:102-105, 124-132`
  Evidence (canonical form):

```js
const timeoutGet = new Promise((_, reject) =>
  setTimeout(() => reject(new Error("Timeout")), API_REDIS_TIMEOUT_MS),
);
const cached = await Promise.race([redis.get(cacheKey), timeoutGet]);
```

Impact: When Redis wins the race, the `setTimeout` handle is not captured in a variable, so `clearTimeout` is never called. The timer fires later (500ms–2000ms after the request completed), rejecting an unreferenced promise (which is harmless because nothing awaits it), but the timer keeps the Node event loop from idling sooner. On a hot serverless function each request schedules ~2 uncleared timers; Vercel Fluid may keep an instance alive longer than necessary. Memory/CPU impact per call is small (~1 KB, one V8 timer entry until fire). **Contrast with `_retrievalOrchestrator.js:36-51`, which _does_ correctly capture `timeoutId` and `clearTimeout` in `finally`.** That file demonstrates the intended pattern is known; the other 30+ call sites diverge.
Also note: every `Promise.race([redis.op, timeout])` call _creates a new Promise wrapper per call_, and nothing calls `reject` proactively. If the Upstash call itself hangs (not merely slow but stuck — e.g. TCP-level stall behind the REST SDK), the unhandled-rejection will fire after the HTTP response has been returned. If the outer handler has already finished, these become potential UnhandledPromiseRejectionWarnings unless the Node runtime swallows them (Vercel does, but they still get logged).
Trace confidence: High

### [Low] `withRequestDedup` is process-local — not shared across Vercel instances

File: `api/_requestDedup.js:4-23`
Evidence:

```js
const inflight = new Map();
```

Impact: On Vercel serverless, each instance has its own `inflight` Map. Two concurrent identical requests routed to different instances both call upstream (Anthropic, CanLII). The dedup only collapses requests on the same warm instance. This isn't a security bug per se but it means the dedup comment ("avoid duplicate upstream calls for identical concurrent requests") is _only_ true per-instance. In combination with Fluid Compute instance reuse, dedup may occasionally leak state if a prior request's Promise is kept (see next finding).
Trace confidence: High

### [Low] `inflight` Map retains rejected promises until `.finally` runs — safe, but worth noting

File: `api/_requestDedup.js:15-22`
Evidence: `.finally(() => inflight.delete(key))` runs after both resolution and rejection. Correct. However, if `work()` returns a value that is later mutated by the caller, every concurrent caller receives the _same_ object reference (no deep copy). `api/retrieve-caselaw.js:146` → caller receives `{ cases, meta }` and then code calls `redis.setex(..., JSON.stringify({ case_law: cases, meta }))`. If two concurrent callers sharing the same in-flight promise also share the returned object, any mutation by one affects the other's serialization.
Trace confidence: Low (no obvious mutation observed in current code paths)

### [Low] Retrieval-health `ALLTIME_KEY` fallback computes from in-memory events when Redis read fails

File: `api/_retrievalHealthStore.js:593-719`
Evidence: On Redis error, falls through to `computeWindowStats(events, Date.now(), Infinity)` — but `events` at that point came from `readRedisEvents` which already returned what it could. In a Redis outage both paths return empty results silently; the dashboard shows "zero traffic" rather than "metrics store degraded". There is no `snapshotSource` marker for this specific failure.
Trace confidence: Medium

### [Low] Cache-poisoning resistance relies on SHA-256 input determinism — `JSON.stringify` on objects is key-order dependent

File: `api/_caseLawReportStore.js`, `api/case-summary.js`, `api/export-pdf.js`, `api/verify.js`, `api/retrieve-caselaw.js`
Evidence: Keys built from `JSON.stringify(body)` / `JSON.stringify(citations)` / `JSON.stringify({scenario,filters,suggestions})`. `JSON.stringify` preserves insertion order; different client libraries emit different orders.
Impact: No security issue, but: (a) cache miss rate higher than necessary; (b) attacker can deliberately rotate key order to bypass cache and drive Anthropic/CanLII cost. Combines with the "unknown properties alter the key" finding above.
Trace confidence: High

### [Low] Retrieval-threshold alert store not namespaced by environment

File: `api/_retrievalThresholds.js:353`
Evidence: `const key = ${ALERT_KEY_PREFIX}:${alertId}`;`→`metrics:retrieval:alert:<id>`.
Impact: Preview deployments share Upstash with production if the same `UPSTASH_REDIS_REST_URL`is used; a preview that fires an alert dedupes the prod alert for 15 minutes and vice versa. Same risk applies to every other key in this audit — none of them embed`VERCEL_ENV` or similar. If prod + preview share Redis, **any** preview deployment can poison production caches (`cache:analyze:v3:<hash>` returns preview-generated content to prod users).
Trace confidence: Medium (depends on env-var isolation in Vercel dashboard)

## False Alarms

- **`_retrievalOrchestrator.js:36-51`**: timer is correctly captured and `clearTimeout` runs in `finally`. Not a leak.
- **`API_REDIS_TIMEOUT_MS = 500` / `RATE_LIMIT_REDIS_TIMEOUT_MS = 500`**: 500 ms is awaited and handled via `Promise.race`; catch blocks degrade to fallback. The guard is functional (though leaky, see Low finding).
- **`redis.incr(EVENT_COUNT_KEY)`** (`_retrievalHealthStore.js:282`): atomic on Redis side, no race for that specific counter.
- **Memory-fallback eviction in `_rateLimit.js:107-123`** is bounded (target size 430, hard cap 500) and will not grow unboundedly.
- **`MAX_MEMORY_EVENTS = 2500` / `MEMORY_RETENTION_MS = 2h`** in `_retrievalHealthStore.js` is enforced by `pruneMemory` on every write.
- **`isValidUrl` normalization in `_caseLawReportStore.js:78`** prevents arbitrary-URL injection in the stored `url_canlii` field.

## Coverage Gaps

- No way from static analysis to confirm whether Upstash is shared between Vercel `production` and `preview` env targets (the Low finding about prefix namespacing). Requires checking Vercel project env-var scoping.
- Rate-limit race impact depends on actual concurrency observed in prod; a 5-request/hour bucket with N=2 instances gives ~10 effective/hour per IP, but bursty serverless cold-start behavior could amplify further. No runtime evidence.
- Unknown whether `/api/retrieval-health` is authenticated. If public, the persisted scenario snippets are read-back attacker-controlled content (XSS risk in the dashboard UI if not sanitized on render — out of scope for this category, but worth flagging to the frontend audit).
- `withRequestDedup` is imported/called from multiple endpoints; I did not verify every dedupe key is unique across endpoints (namespaced by `inflight:<endpoint>:` prefix in all sampled cases, which is correct).
- Did not diff against the `api/_caseLawRetrieval.js` internal pipeline for any additional Redis keys set inside that module.
- No instrumentation observed for Redis operation errors being reported to Sentry in the audited files; silent `catch {}` blocks (e.g. `case-summary.js:216`, `retrieve-caselaw.js:108, 205`, `_caseLawReportStore.js:150-152`) suppress failures entirely, making Redis health issues invisible.
