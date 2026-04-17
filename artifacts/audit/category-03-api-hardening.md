# Category 3 — API Endpoint Hardening Audit

Scope: adversarial review of shared infra (`api/_apiCommon.js`, `api/_rateLimit.js`, `api/_cors.js`) and the following endpoints: `analyze`, `verify`, `retrieve-caselaw`, `case-summary`, `export-pdf`, `retrieval-health`, `status`, `filter-quality`, `report-case-law`.

Findings only. No fixes applied.

---

## Summary Matrix

Legend: OK (pass), MISS (finding), N/A (not applicable), ADV (advisory/weak).

| Endpoint         | Method?  | CT? | Size?      | Schema?                                      | RL order                                              | RL bypass          | CORS | Errors | Timing                                | Headers |
| ---------------- | -------- | --- | ---------- | -------------------------------------------- | ----------------------------------------------------- | ------------------ | ---- | ------ | ------------------------------------- | ------- |
| analyze          | OK       | OK  | 50KB (OK)  | OK (allow-list filters)                      | OK (RL before AI; pre-retrieval is gated by RL)       | MISS (XFF trusted) | ADV  | OK     | N/A                                   | OK      |
| verify           | OK       | OK  | 50KB (OK)  | MISS (array only; element typecheck minimal) | OK                                                    | MISS (XFF trusted) | ADV  | OK     | N/A                                   | OK      |
| retrieve-caselaw | OK       | OK  | 50KB (OK)  | MISS (filters passed through untyped)        | OK                                                    | MISS (XFF trusted) | ADV  | OK     | N/A                                   | OK      |
| case-summary     | OK       | OK  | 50KB (OK)  | MISS (extra fields ignored but not rejected) | OK                                                    | MISS (XFF trusted) | ADV  | OK     | N/A                                   | OK      |
| export-pdf       | OK       | OK  | 200KB (OK) | MISS (arrays passed through)                 | OK                                                    | MISS (XFF trusted) | ADV  | OK     | N/A                                   | OK      |
| retrieval-health | OK (GET) | N/A | N/A (GET)  | OK (URL params bounded)                      | MISS (RL before auth; no DoS effect given token gate) | MISS (XFF trusted) | ADV  | OK     | OK (timingSafeEqual)                  | OK      |
| status           | OK (GET) | N/A | N/A        | N/A                                          | OK                                                    | MISS (XFF trusted) | ADV  | OK     | N/A                                   | OK      |
| filter-quality   | OK (GET) | N/A | N/A        | OK                                           | MISS (RL before auth)                                 | MISS (XFF trusted) | ADV  | OK     | OK (timingSafeEqual, but see finding) | OK      |
| report-case-law  | OK       | OK  | 20KB (OK)  | OK (strict allow-list)                       | OK                                                    | MISS (XFF trusted) | ADV  | OK     | N/A                                   | OK      |

---

## Cross-cutting findings

### [High] X-Forwarded-For is fully trusted — rate-limit bypass on all endpoints

File: `api/_rateLimit.js:150-158`
Evidence:

```js
export function getClientIp(req) {
  // Vercel sets x-forwarded-for reliably; x-real-ip is not standard on Vercel
  const forwarded = req.headers["x-forwarded-for"]?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  const remote = req.socket?.remoteAddress;
  if (remote) return remote;
  return "unknown";
}
```

The left-most `x-forwarded-for` entry is taken verbatim as the client IP. Vercel does set this header, but upstream clients can prepend arbitrary values and Vercel appends rather than replacing. Because the left-most value is used (and there is no configured "trust N hops" boundary), an attacker can send a fresh random IP on every request (`X-Forwarded-For: 1.2.3.4` — or a.b.c.d changing each call) and reset their rate-limit bucket indefinitely. The MAX_REQUESTS = 5/hr ceiling (line 9) becomes advisory.
Impact: Token-burn DoS against `/api/analyze` (Anthropic), `/api/verify` and `/api/retrieve-caselaw` (CanLII), `/api/case-summary` (Anthropic), `/api/export-pdf` (compute + Redis). Every paid-per-call downstream is exposed.
Trace confidence: High

### [Medium] CORS allowlist is advisory, not enforced

File: `api/_cors.js:16-24`
Evidence:

```js
export function applyCorsHeaders(req, res, methods, headers) {
  const origin = req.headers.origin ?? "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", methods);
  res.setHeader("Access-Control-Allow-Headers", headers);
  res.setHeader("Vary", "Origin");
}
```

If `Origin` is not in the allowlist the `Access-Control-Allow-Origin` header is simply omitted — the request is still processed and a response is returned with full data. Non-browser clients, server-to-server callers, and browsers ignoring CORS (or from a same-site-relaxed context) are unaffected. There is no 403/forbidden return for disallowed origins.
Impact: CSRF-style cross-origin abuse from tools that don't honour CORS; defense-in-depth missing. Browser SOP still protects end-users, but any automated caller can hit these paid endpoints with no origin gate.
Trace confidence: High

### [Low] No CSRF token / no SameSite cookie enforcement on state-changing endpoints

File: `api/analyze.js:615-631`, `api/verify.js:55-71`, `api/retrieve-caselaw.js:40-57`, `api/case-summary.js:131-147`, `api/export-pdf.js:76-92`, `api/report-case-law.js:111-127`
Evidence: None of the POST endpoints check a CSRF token, a double-submit cookie, or a custom `X-Requested-With`-style header beyond `Content-Type: application/json` validation in `_apiCommon.js:34-44`. No authenticated-session cookie exists in the app (the endpoints are unauthenticated), so traditional CSRF (abusing an authenticated user's session) is not directly applicable. However the side-effect here is the paid-API token burn — an attacker-controlled page can force a victim's browser to hit `/api/analyze` and burn the victim's rate-limit slot / the app's Anthropic budget.
Impact: Low severity because there is no authenticated state to forge. The main abuse vector (token burn) is already covered by the XFF finding above.
Trace confidence: High

### [Low] Body-size cap is only effective when Vercel has already materialized `req.body`

File: `api/_apiCommon.js:46-59`
Evidence:

```js
const bodySize =
  typeof req.body === "string"
    ? Buffer.byteLength(req.body)
    : Buffer.byteLength(JSON.stringify(req.body ?? ""));
if (Number.isFinite(maxBytes) && bodySize > maxBytes) { ... }
```

The size check runs against the already-parsed body. Vercel's Node runtime applies its own cap before this check (~4.5MB for functions), so a 10MB payload is rejected upstream (by the platform) with a 413 before this handler ever runs — which is fine — but the declared per-endpoint cap (50KB / 200KB / 20KB) is not actually enforced at the wire; Vercel hands over anything up to its platform limit. An attacker can push ~4MB through to `export-pdf`'s 200KB-declared endpoint and it will still reach the handler (where the check then rejects). CPU and memory to parse & stringify that body were already spent. No `config.api.bodyParser.sizeLimit` export is present on any of the endpoints.
Impact: Parsing/CPU DoS below Vercel's platform cap but above the declared per-endpoint cap. Exploitable in conjunction with the XFF RL bypass to amplify cost.
Trace confidence: Medium (platform-specific; depends on Vercel runtime defaults and how `@vercel/node` pre-parses the body — no explicit `bodyParser` config is present).

---

## Per-endpoint findings

### `api/analyze.js`

#### [Low] Schema — filters allow-list is correct; top-level shape not strictly guarded

File: `api/analyze.js:647-712`
Evidence: The handler destructures `{ scenario, filters: rawFilters } = req.body;` then runs rawFilters through an allow-list for `jurisdiction`, `courtLevel`, `dateRange`, `lawTypes`. Extra top-level fields on `req.body` are silently ignored (not poisoned because nothing reads them), and the filters sub-object has a proper allow-list.
Impact: No injection vector into downstream prompts via filters. This is a positive — flagging only that the body isn't rejected if unknown top-level keys are present (defense in depth).
Trace confidence: High

#### [Low] Error-message leak — Anthropic upstream errors are flattened but status echoed

File: `api/analyze.js:1017-1031`
Evidence:

```js
const statusCode = err.status ? (err.status >= 500 ? 502 : err.status) : 500;
...
if (err.status) {
  return res.status(statusCode).json({ error: "Analysis service temporarily unavailable." });
}
return res.status(500).json({ error: "Internal server error" });
```

Error bodies are sanitized; no stack traces or paths are returned. However, upstream Anthropic HTTP status is relayed to the client (400, 401, 429, etc. from Anthropic → same 4xx from here), which allows an attacker to infer API-key state (e.g. 401 → key invalid/revoked; 429 → Anthropic throttle vs local RL). Low risk; low confidence this is intentionally exposed.
Impact: Minor information leak about upstream state.
Trace confidence: Medium

### `api/verify.js`

#### [Medium] Schema — `citations` array elements only loosely validated; non-string entries silently dropped

File: `api/verify.js:83-97, 123-142`
Evidence:

```js
const { citations } = req.body;
if (!Array.isArray(citations) || citations.length === 0) { ... }
if (citations.length > 10) { ... }
...
const processCitation = async (rawCitation) => {
  if (!rawCitation || typeof rawCitation !== "string") {
    results[rawCitation] = { status: "unparseable", ... };
    return;
  }
```

Only length (≤10) is enforced at the array level. Non-string elements (e.g. objects, numbers, null) are handled per-element but set a results-map key equal to the stringified object (e.g. `[object Object]`), which collapses to one key for many inputs. Unknown top-level fields on `req.body` are ignored. This is low-severity but an attacker can make CanLII outbound calls for ~10 crafted strings per request with XFF bypass for unlimited sessions.
Impact: Minor — per-request cap bounds outbound calls, but does not bound citation length beyond 500 chars (line 132).
Trace confidence: High

### `api/retrieve-caselaw.js`

#### [Medium] Schema — `filters` passed to orchestrator without allow-list

File: `api/retrieve-caselaw.js:69-76`
Evidence:

```js
const body = req.body || {};
const scenario = sanitizeUserInput(body.scenario || "").trim();
const filters =
  body.filters && typeof body.filters === "object" ? body.filters : {};
const suggestions = Array.isArray(body.suggestions)
  ? body.suggestions.slice(0, 12)
  : [];
```

Unlike `api/analyze.js`, this endpoint does not whitelist `jurisdiction`/`courtLevel`/`dateRange`/`lawTypes`. Whatever the caller sends in `filters` is handed to `runCaseLawRetrieval`. If the orchestrator downstream trusts those fields (e.g. routing by `jurisdiction`), an attacker can inject arbitrary strings. `suggestions` elements are not individually typechecked beyond `Array.isArray` + slice(12).
Impact: Possible logic poisoning downstream; possible prompt-shaping if suggestions reach Anthropic. Needs orchestrator review to determine blast radius.
Trace confidence: Medium

### `api/case-summary.js`

#### [Low] Schema — field presence/length validated; extra fields silently accepted

File: `api/case-summary.js:159-194`
Evidence: `citation` requires string; other fields must be strings of bounded length (title 300, court 100, year 10, summary 2000, matchedContent 3000). Unknown top-level fields are ignored — not rejected. The caseText template only reads the known keys, so extra keys cannot poison the prompt.
Impact: None directly. Flagging only for defense-in-depth: no strict allow-list on body keys.
Trace confidence: High

#### [Low] Cache key includes entire body

File: `api/case-summary.js:196`
Evidence:

```js
const cacheKey = `cache:case-summary:${createHash("sha256").update(JSON.stringify(body)).digest("hex")}`;
```

Because the full `body` is hashed (not a whitelisted subset), an attacker can pollute the cache key space by adding random extra fields, defeating caching and forcing Anthropic calls. Works in conjunction with XFF RL bypass for token burn.
Impact: Cache-busting amplifier for token-burn DoS.
Trace confidence: High

### `api/export-pdf.js`

#### [Medium] Schema — inputs are arrays with caps per type but no element validation

File: `api/export-pdf.js:104-179`
Evidence:

```js
let { scenario, summary, criminal_code, case_law, civil_law, charter, analysis, verifications } = body;
...
if (Array.isArray(criminal_code)) criminal_code = criminal_code.slice(0, MAX_ARRAY_ITEMS);
if (Array.isArray(case_law)) case_law = case_law.slice(0, MAX_CASE_LAW_ITEMS);
```

Array items are rendered directly (`item.citation`, `item.summary`) with `sanitizePdfText` cap (20,000 chars each), but arrays are not bounded in total rendered character count. An attacker with 10 case_law items × 20,000-char summaries + 20 criminal_code × 20,000 + 20 civil_law × 20,000 + 20 charter × 20,000 = ~1.4M chars of PDF content per request. With 200KB request body cap, attacker can achieve ~10:1 amplification via repeated short fields (the 20KB PDF sanitize cap per field applies after parse). Worst-case PDF size is bounded but non-trivial.
Impact: CPU / memory DoS on PDF generation; disk-like amplification (input 200KB → cached PDF can be much larger). Cache stores base64 of PDF in Redis (line 386).
Trace confidence: Medium

#### [Low] Cache key includes entire body

File: `api/export-pdf.js:115`
Evidence:

```js
const cacheKey = `cache:export-pdf:${createHash("sha256").update(JSON.stringify(body)).digest("hex")}`;
```

Same cache-busting amplification as `case-summary`.
Impact: Defeats PDF cache; amplifies token burn via forced regeneration.
Trace confidence: High

### `api/retrieval-health.js`

#### [OK] Token comparison — uses `crypto.timingSafeEqual`

File: `api/retrieval-health.js:38-48`
Evidence:

```js
function isAuthorized(req) {
  const expectedToken = process.env.RETRIEVAL_HEALTH_TOKEN || "";
  if (!expectedToken) return false;
  const authHeader = req.headers.authorization || "";
  const expected = `Bearer ${expectedToken}`;
  if (authHeader.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(authHeader), Buffer.from(expected));
}
```

Correctly constant-time. Length pre-check is acceptable (length of expected is known and fixed once env var is set; leaks at most the token length).
Impact: None — this is a positive finding.
Trace confidence: High

#### [Low] Rate limit checked before auth — unauthenticated callers can exhaust the monitoring bucket

File: `api/retrieval-health.js:63-83`
Evidence: `checkRateLimit` runs before `isAuthorized`. The rate limit for this endpoint is 100/hr (line 12 of `_rateLimit.js`). An anonymous attacker can burn the bucket for a given IP without the token. Because the bucket is per-IP and legitimate monitoring presumably calls from distinct IPs, this is low impact — and further, XFF spoofing makes the limit itself meaningless. But ordering is worth flagging: auth-free 429s should be cheap (they are — `checkRateLimit` is a Redis GET/SETEX) but the endpoint reveals, via distinct response code, whether the user is in-bucket before revealing whether they hold the token.
Impact: Minor signal — attacker can probe liveness of monitoring endpoint without token.
Trace confidence: High

### `api/status.js`

#### [Low] Method & OPTIONS handled inline instead of via shared helper

File: `api/status.js:14-20`
Evidence:

```js
if (req.method === "OPTIONS") {
  return res.status(200).end();
}
if (req.method !== "GET") {
  return res.status(405).json({ error: "Method not allowed" });
}
```

Works, but bypasses `handleOptionsAndMethod` — divergence from the pattern used by every other endpoint. No direct vulnerability; maintenance risk.
Impact: None today.
Trace confidence: High

#### [Low] No request logging or requestId

File: `api/status.js:4-27`
Evidence: No `logRequestStart` / `logSuccess` calls; no requestId generated. Not strictly a security finding, but abuse of this endpoint (cheap health probe) won't surface in logs.
Impact: Blind spot for observability.
Trace confidence: High

### `api/filter-quality.js`

#### [Medium] `timingSafeEqual` can throw when token length differs — uncaught

File: `api/filter-quality.js:47-63`
Evidence:

```js
const token = req.headers.authorization?.replace(/^Bearer\s+/, "");
const expectedToken = process.env.RETRIEVAL_HEALTH_TOKEN;

if (
  !expectedToken ||
  !token ||
  token.length !== expectedToken.length ||
  !timingSafeEqual(Buffer.from(token), Buffer.from(expectedToken))
) {
```

Short-circuit evaluation (`token.length !== expectedToken.length`) guards the call, so `timingSafeEqual` only runs when lengths are equal. Good. However there is no `try/catch` around `timingSafeEqual`; if a future edit drops the length check, the function throws on unequal-length inputs — uncaught, 500 with possibly leaked stack.
Impact: Defensive issue only; currently safe.
Trace confidence: High

#### [Low] Rate limit runs before auth (same as retrieval-health)

File: `api/filter-quality.js:34-63`
Impact: Same as retrieval-health. Trace confidence: High.

#### [Low] Response body includes a `metrics_notes`, `tuning_guide`, and internal file paths

File: `api/filter-quality.js:111-139`
Evidence:

```js
"node scripts/tune-filters.js --baseline      # Save baseline metrics",
...
auto_tuning_script: "scripts/tune-filters.js",
```

Internal script paths and operational guidance are exposed to anyone who obtains the RETRIEVAL_HEALTH_TOKEN. Low severity because the endpoint is already token-gated; flagged because leaking filesystem layout to an attacker who has compromised the token is additional recon. Not a default-visible leak.
Impact: Post-token-compromise recon.
Trace confidence: High

### `api/report-case-law.js`

#### [OK] Strong allow-list validation

File: `api/report-case-law.js:66-109, 146-294`
Evidence: `normalizeFilters` strictly rejects unknown jurisdictions / courtLevels / dateRanges / lawTypes; `reason` must be in `CASE_LAW_REPORT_REASON_SET`; numeric `resultIndex` is integer-bounded 0-100; `sanitizeText` enforces length caps per field. Only known fields propagate to `recordCaseLawReport`.
Impact: None — this is the positive reference for how an endpoint should validate.
Trace confidence: High

#### [Low] No authentication on a user-report ingestion endpoint

File: `api/report-case-law.js:111-143`
Evidence: Endpoint is unauthenticated; rate-limited at the default 5/hr per IP (via `_rateLimit.js:9` since endpoint name is not in the `retrieval-health` exception list). With XFF bypass, an attacker can submit large volumes of junk reports to `_caseLawReportStore.js`, potentially poisoning moderation queues or storage.
Impact: Data pollution in the reports store; Redis quota burn.
Trace confidence: High

---

## Notes on shared infrastructure

- `applyStandardApiHeaders` sets `X-Content-Type-Options`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Content-Security-Policy: default-src 'none'`, `Cache-Control: no-store`. All endpoints call it — good baseline. No `Strict-Transport-Security` header is emitted from any endpoint (Vercel handles HSTS at the edge; documenting only).
- `handleOptionsAndMethod` returns 200 for OPTIONS even when the declared method is GET-only without a real preflight — harmless but worth noting for audit completeness (`api/_apiCommon.js:17-27`).
- In-memory rate-limit fallback caps the store at 500 entries with LRU eviction (`api/_rateLimit.js:107-123`). If Redis is unreachable in production, the combination of (a) XFF spoofing and (b) LRU eviction lets an attacker evict legitimate buckets by flooding new IPs, another rate-limit bypass path.

---

## Severity recap

| Severity | Count | Items                                                                                                                                                   |
| -------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Critical | 0     | —                                                                                                                                                       |
| High     | 1     | XFF spoofing → rate-limit bypass on all endpoints                                                                                                       |
| Medium   | 5     | CORS advisory; verify element validation; retrieve-caselaw filters untyped; export-pdf input amplification; filter-quality timing-fragile (future risk) |
| Low      | 12    | Various defense-in-depth (body-size pre-parse, cache-key body-hashing, auth-after-RL ordering, error-status leak, etc.)                                 |
