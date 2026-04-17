# Category 8: Concurrency & State

Audit target: `api/_rateLimit.js`, `api/_requestDedup.js`, `api/_retrievalHealthStore.js`, `api/analyze.js` (rate-limit entry + dedup key construction).

## Rate limiter atomicity

Summary: **Not atomic.** The Redis path is a classic sequential `GET` then `SETEX` (read-modify-write) with no Lua script, no MULTI/EXEC, and no pipeline. Each `checkRateLimit` call issues an independent `redis.get(key)` via Upstash REST, filters/sliding-windows the returned array in Node.js, then writes the mutated list back with `redis.setex`. Under concurrent requests from the same IP that arrive before the first caller’s `SETEX` completes, each caller reads the same stale `hits` array, independently decides `hits.length < MAX_REQUESTS`, appends its own timestamp, and writes back. The last writer wins; earlier writers’ timestamps are lost, but every caller in the race is already past the `allowed: true` gate. There is no atomic counter (`INCR` / `ZADD` with expiry) or token bucket guard.

The in-memory fallback has the same shape (`store.get` → mutate → `store.set`) but because Node’s event loop is single-threaded and neither `get` nor `set` yields, the local-map path is incidentally serialized within a single instance. This only applies to a single Vercel instance; across instances (or across the process + Redis boundary), nothing is serialized.

## Request dedup cross-user risk

Summary: **High – cross-user response leakage is possible on cache miss race.** `withRequestDedup(key, work)` stores an in-memory promise keyed by `inflight:analyze:<sha256(scenario + JSON.stringify(filters))>` (`api/analyze.js:817`). The key does **not** include the client IP, user id, request id, or rate-limit bucket. Two concurrent requests from different users with identical scenario + filters on the same warm Vercel instance will share a single Promise, meaning both users receive the exact same response object (including `meta.requestId` set from the first caller’s `requestId`, see `withRequestId` at `api/analyze.js:84-101`). The response body itself is content-addressed (scenario + filters hash) and subsequently cached in Redis under the same hash (`api/analyze.js:1010-1012`), so the cached payload is already shared by design — but the dedup layer makes a _per-request_ `requestId` leak across users on races. It also means a user whose rate-limit bucket is already exhausted can effectively ride a second user’s in-flight response if the rate-limit check is bypassed post-dedup (it is not here — rate-limit runs before dedup — but the pattern is fragile). The larger concern is that the scenario + filters hash is low-entropy for common scenarios (short prompts, default filters) and trivially collidable across users.

Note: `inflight` lives in module scope (`api/_requestDedup.js:4`), so on Vercel Fluid Compute it persists across requests on the same hot instance. It does not persist across instances.

## In-memory state & Fluid Compute reuse

Summary: Every in-memory structure in these files is module-scoped and therefore survives across invocations on a reused Vercel instance:

- `store` in `api/_rateLimit.js:37` (rate-limit fallback map)
- `inflight` in `api/_requestDedup.js:4` (dedup map)
- `memoryEvents` in `api/_retrievalHealthStore.js:21` (retrieval metrics ring)

On a warm instance, user A’s state is visible to user B’s request on the same instance. On cold/alternate instances, state is empty or divergent. For rate limiting this becomes a **bypass primitive** when Redis is unconfigured or times out: a user load-balanced to a cold instance starts fresh at 0/5 even if they are over quota on a warm instance. For dedup it means the cross-user Promise sharing above is instance-local.

## Prod Redis vs dev in-memory divergence

Prod (with `UPSTASH_REDIS_REST_URL` set) uses Redis; dev/CI (no env) silently falls through to in-memory (`api/_rateLimit.js:29-34`, `92-125`). The in-memory store has a 500-key cap and LRU eviction (`api/_rateLimit.js:107-123`), meaning an attacker able to flood the rate-limit map with distinct IP-keyed entries (possible via spoofable `x-forwarded-for` — see Category 3) can evict legitimate entries and reset counters. This works in dev and in any prod scenario where Redis is misconfigured. The Redis branch swallows all failures (`catch` at `api/_rateLimit.js:85-90`) and falls through to the same in-memory path, so transient Redis outages also surface this behavior silently to attackers.

## Retrieval health counter drift

Summary: `recordRetrievalMetricsEvent` (`api/_retrievalHealthStore.js:721-783`) performs several non-atomic read-modify-write sequences against Redis keys:

- `EVENT_LIST_KEY` (`metrics:retrieval:events:v1`): `redis.get` → JSON parse → `[...existing, event]` → `.slice(...)` cap → `redis.set` (`api/_retrievalHealthStore.js:751-761`).
- `ALLTIME_KEY` (`metrics:retrieval:alltime:v1`): `redis.get` → mutate aggregate object → `redis.set` (`api/_retrievalHealthStore.js:486-591`).
- Only `EVENT_COUNT_KEY` uses an atomic `INCR` (`api/_retrievalHealthStore.js:278-285`).

Concurrent events overlapping the GET/SET window will lose writes: the slower writer overwrites the aggregate with its own stale+mutated copy. This is data-loss grade for the alltime accumulator and the event list, not a security issue in itself.

---

## Findings

### [CRITICAL] Cross-user response leak via request dedup key

File: `api/_requestDedup.js:4-23`, `api/analyze.js:817-821`
Evidence:

```
// api/_requestDedup.js
const inflight = new Map();
export async function withRequestDedup(key, work) {
  if (inflight.has(key)) {
    return inflight.get(key);
  }
  ...
}

// api/analyze.js
const dedupeKey = `inflight:analyze:${cacheKey(scenario, filters)}`;
const { result, ... } = await withRequestDedup(
  dedupeKey,
  () => analyzeWithRetry(scenario, filters, apiKey, preRetrievedCases),
);
```

Race scenario:

1. User A (`requestId=A`) POSTs scenario "I was pulled over for speeding" with default filters at t=0ms; cache miss in Redis.
2. `withRequestDedup` stores `inflight:analyze:<hashS+F>` → Promise_A on the warm Vercel instance.
3. User B (`requestId=B`, different IP, different rate-limit bucket, possibly different auth context) POSTs the identical scenario + filters at t=200ms while Anthropic is still responding.
4. Cache is still empty (Anthropic not returned). Dedup map has the key. User B receives Promise_A.
5. Both responses include `meta.requestId` derived from A's request (the Anthropic body is shared; A's request id is logged server-side but the response-shape re-inserts `requestId` at serialize time per-request, see `withRequestId` at `api/analyze.js:1018` — this one is actually per-caller because it runs _after_ `await`, mitigating that specific leak, but the response body itself is still identical to A's).
   Impact: Two users sharing an identical scenario fingerprint will share a single upstream Anthropic response object. The response is content-equivalent (by definition, same scenario + filters) so semantic leakage is minor, BUT: (a) the dedup runs on every cache-miss regardless of authentication boundary, (b) retrieved CanLII meta (search calls, fallback reasons, per-request retrieval pass) belongs to A's pipeline and is surfaced to B, and (c) an authenticated deployment extension (future: per-user rate plan, per-tenant prompt) would leak tenant-scoped response data because the key has no tenant component. Also, if `analyzeWithRetry` throws, both users receive the same rejection — a single bad input can poison all concurrent identical requests. CRITICAL severity is conditional: today the response is content-addressed so the observable leak is metadata (retrieval stats, landmark match order) and timing; as soon as the endpoint gains any per-user shaping the leak becomes a full cross-user response disclosure.
   Trace confidence: High (key construction is explicit at `api/analyze.js:817`, dedup map is module-scoped).

### [HIGH] Rate limiter read-modify-write race permits burst over quota

File: `api/_rateLimit.js:56-84`
Evidence:

```
const hitsJson = await Promise.race([redis.get(key), timeout]);
let hits = hitsJson ? JSON.parse(hitsJson) : [];
hits = hits.filter((t) => now - t < WINDOW_MS);

if (hits.length >= maxRequests) {
  return { allowed: false, ... };
}

hits.push(now);
await Promise.race([
  redis.setex(key, Math.ceil(WINDOW_MS / 1000), JSON.stringify(hits)),
  ...
]);

return { allowed: true, remaining: maxRequests - hits.length };
```

Race scenario:

1. Attacker currently has `hits = [t1, t2, t3, t4]` stored in Redis (4/5 used).
2. Attacker fires 5 parallel requests at t=now, all within a few ms.
3. Each invocation calls `redis.get(key)` — Upstash REST is fully async; all five reads complete before any `setex` lands. Each reads `[t1, t2, t3, t4]`.
4. Each independently computes `hits.length == 4 < 5`, pushes its own `now`, and calls `setex`. Each returns `allowed: true`.
5. Final Redis value is the last writer’s 5-element array. The attacker just executed 5 additional calls against a nominal 5-per-hour limit (double quota) with zero downstream detection.
   Impact: Doubling/burning the per-hour quota is practical; with N concurrent invocations the attacker can fire up to N extra calls per window (bounded by Vercel concurrency, but the Anthropic/CanLII spend scales linearly). Because the limiter is the only gate before a paid upstream (`callAnthropic`, `runCaseLawRetrieval`), this is a direct cost-amplification vector. Because all five pass, this also defeats the DoS protection the limiter nominally provides.
   Trace confidence: High. Upstash REST client does not offer atomic sliding-window primitives here (no `ZADD` + `ZREMRANGEBYSCORE` pipeline, no Lua EVAL).

### [HIGH] Rate-limit fallback silently opens on Redis timeout/failure

File: `api/_rateLimit.js:85-125`
Evidence:

```
} catch (err) {
  console.error(
    "Redis rate limit check failed, falling back to in-memory:",
    err.message,
  );
}

// Fallback: in-memory store (development or Redis unavailable)
const hits = (store.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
```

Race scenario:

1. Attacker finds/induces Redis latency > `RATE_LIMIT_REDIS_TIMEOUT_MS`, or Redis is transiently unavailable (Upstash maintenance, token rotation).
2. `Promise.race` rejects; control flows to the in-memory fallback.
3. On each cold/new Vercel instance, the in-memory `store` is empty — the attacker is at 0/5 regardless of their true quota.
4. Vercel load-balances bursts across multiple instances; each fresh instance is another empty bucket.
   Impact: Full rate-limit bypass during Redis outages or via any technique that can induce Redis slowness (e.g., triggering a large retrieval health read on the same Redis from another endpoint). No alert fires; the `console.error` is silent to the client, and the response is a normal `allowed: true`. Combine with instance churn and per-IP quota is effectively unbounded. Also note the fallback LRU (`api/_rateLimit.js:107-123`) allows a flood of distinct IP keys (spoofable via `x-forwarded-for`) to evict legitimate entries, further amplifying bypass.
   Trace confidence: High.

### [MEDIUM] Retrieval health alltime accumulator loses writes under concurrency

File: `api/_retrievalHealthStore.js:486-591`, `721-783`
Evidence:

```
async function updateAlltimeAccumulator(event) {
  ...
  const raw = await Promise.race([redis.get(ALLTIME_KEY), timeout()]);
  let acc = {};
  if (raw) { acc = typeof raw === "string" ? JSON.parse(raw) : raw; ... }
  ...
  acc.total = (acc.total || 0) + 1;
  ...
  await Promise.race([redis.set(ALLTIME_KEY, JSON.stringify(acc)), timeout()]);
}
```

Race scenario: Two concurrent analyze invocations finish at ~the same ms. Both call `recordRetrievalMetricsEvent` → `updateAlltimeAccumulator`. Both `GET` the same `acc`; each increments locally; each `SET`s. The later write clobbers the earlier’s increments. Same pattern for `EVENT_LIST_KEY` at `api/_retrievalHealthStore.js:751-761`.
Impact: Under moderate concurrent load the `alltime` counters undercount, making the retrieval-health dashboard under-report real traffic and failures. Not a security issue, but a data-integrity finding that could mask attacks (e.g., a burst of retrieval errors gets partially lost, so alerting thresholds aren’t hit).
Trace confidence: High.

### [MEDIUM] In-memory dedup survives across users on warm Vercel instance

File: `api/_requestDedup.js:4-23`
Evidence: `const inflight = new Map();` at module scope — not cleared on handler entry, only on Promise settle (`.finally(() => inflight.delete(key))`).
Race scenario: Tied to the CRITICAL finding above. Called out separately because the underlying state model (module-scoped Map survives across requests on reused instances) is the enabling mechanism and would compound with any future per-user response customization.
Impact: Same as CRITICAL finding re: cross-user sharing on warm instance.
Trace confidence: High.

### [LOW] `pruneMemory` and fallback LRU contain-but-don’t-protect against spoofed IP floods

File: `api/_rateLimit.js:107-123`, `api/_retrievalHealthStore.js:225-233`
Evidence:

```
if (store.size > 500) {
  ...
  const targetSize = 430;
  const excess = store.size - targetSize;
  if (excess > 0) {
    const oldestKeys = Array.from(store.keys()).slice(0, excess);
    for (const staleKey of oldestKeys) { store.delete(staleKey); }
  }
}
```

Race scenario: Insertion-order LRU means an attacker flooding unique spoofed `x-forwarded-for` IPs evicts the oldest 70 entries when size passes 500, which likely includes legitimate users’ live buckets. On the next request from an evicted user, they’re at 0/5 again.
Impact: Bypass/DoS amplification under Redis-unavailable conditions. Low severity because prod normally has Redis; conditional on HIGH finding above.
Trace confidence: Medium (depends on whether the fallback branch is ever reached in prod).

### [LOW] `getRetrievalEvents` mutates `memoryEvents` as a side effect of a read

File: `api/_retrievalHealthStore.js:785-812`
Evidence:

```
const cutoff = nowMs - MEMORY_RETENTION_MS;
const recent = sorted.filter((event) => event.ts >= cutoff);

memoryEvents.length = 0;
memoryEvents.push(...recent);
pruneMemory(nowMs);
```

Race scenario: A read path concurrent with a write path (`recordRetrievalMetricsEvent` calling `memoryEvents.push(event)`) interleaves the `memoryEvents.length = 0` with an in-flight push. Because Node is single-threaded the actual splice/push calls can’t interleave at the statement level, but the sequence `length = 0; push(...recent)` can drop a concurrent `push` that happens between those two lines if `recent` was computed earlier. In practice this is cosmetic.
Impact: Occasional dropped in-memory metrics events in dev/Redis-down mode.
Trace confidence: Medium.

---

## False Alarms

- **EVENT_COUNT_KEY increment**: uses `redis.incr` atomically (`api/_retrievalHealthStore.js:278-285`). No race.
- **Cross-instance in-memory rate-limit bypass in prod**: real risk, but covered under the HIGH Redis-fallback finding — not an independent issue when Redis is up.
- **`withRequestId` leaking requestIds across users**: `withRequestId` runs on the handler side of the dedup `await` (`api/analyze.js:1018`), so each caller wraps the shared `result` with their own `requestId`. Not a leak by itself. The shared `result.meta.case_law.retrieval.*` stats however are not per-caller — see CRITICAL.
- **Cache key collision**: `cacheKey` is `sha256(scenario + JSON.stringify(filters))` (`api/analyze.js:64-71`). Content-addressed caching is intentional and not a cross-user leak per se; it only becomes one if responses ever contain per-user data, which they currently don’t.

## Coverage Gaps

- Did not trace every other endpoint’s use of `checkRateLimit` (e.g., `api/report-case-law.js`, retrieval-health, feedback). The atomicity finding applies to all of them uniformly because it’s in `_rateLimit.js`.
- Did not inspect `api/_caseLawReportStore.js` (new untracked file) for similar GET/SET race patterns; worth a follow-up given the pattern is repeated across stores in this codebase.
- Did not reproduce the dedup cross-user race empirically (no load test harness) — finding is based on static analysis of key construction and state scope.
- Did not audit Upstash client internals for connection-pool ordering; assumed REST calls are independent and commutative.
- Did not examine whether `x-vercel-id` is deterministic enough that two concurrent dedup’d callers could be distinguished in logs; this matters for post-incident forensics of the CRITICAL finding.
