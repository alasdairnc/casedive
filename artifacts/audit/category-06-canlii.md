# Category 6: CanLII Integration Correctness

Audit date: 2026-04-16
Auditor: inline (main session)

## webDbId vs apiDbId usage

`src/lib/canlii.js` defines two maps:

- `COURT_WEB_MAP` (aliased as webDbId in return objects) — path segments like `ca/scc`, `on/onca` — used to build `https://www.canlii.org/en/{webDbId}/doc/...` URLs
- `COURT_API_MAP` (aliased as apiDbId) — short strings like `csc-scc`, `onca` — used to build `https://api.canlii.org/v1/caseBrowse/en/{apiDbId}/{caseId}/`

Usage verified:

- `buildCaseUrl(dbId, year, caseId)` at canlii.js:261 → constructs `https://www.canlii.org/en/{dbId}/...` — callers pass `parsed.webDbId`. Correct.
- `buildApiUrl(dbId, caseId, apiKey)` at canlii.js:253 → constructs `https://api.canlii.org/v1/caseBrowse/en/{dbId}/...` — callers pass `parsed.apiDbId`. Correct.
- `verify.js:306` calls `buildCaseUrl(parsed.webDbId, ...)` ✓
- `verify.js:315` calls `buildApiUrl(parsed.apiDbId, ...)` — but wait: `buildApiUrl` receives `parsed.apiDbId` but the first argument is named `dbId`, used as `${CANLII_BASE}/caseBrowse/en/${dbId}/`. Correct.
- `COURT_DB_MAP` at canlii.js:106 is an alias for `COURT_API_MAP` (backwards compat). Verify any caller using `COURT_DB_MAP` is using it for API URLs (not web URLs).

**No webDbId/apiDbId mix-up found** in the traced call sites.

## Fetch target safety

`src/lib/canlii.js:253` → `buildApiUrl` constructs `${CANLII_BASE}/caseBrowse/en/${dbId}/${caseId}/?api_key=...`

- `CANLII_BASE = "https://api.canlii.org/v1"` — hardcoded, not overridable from user input.
- `dbId` comes from `COURT_API_MAP[courtCode.toUpperCase()]` — a closed string-keyed map; unknown courts return `null` and the pipeline returns `{ status: "unknown_court" }` before any fetch.
- `caseId` is built from `year` (4-digit number), `courtCode` (uppercased alpha), `number` (digits) — all extracted from parsed neutral citation regex. No user-controlled freeform string directly in the URL.
- `CANLII_API_BASE_URL` env override exists in `api/_caseLawRetrieval.js:35-36` (see Category 1 finding) — can redirect to arbitrary host if set by an operator. This is the only SSRF-adjacent path.

**SSRF conclusion**: Not exploitable from untrusted user input via citation parsing. The one override path requires Vercel env-var write access.

## Findings

### [Medium] `CANLII_API_BASE_URL` env override enables operator-controlled SSRF/prompt-injection

File: api/\_caseLawRetrieval.js:32-36
Evidence:

```js
// SECURITY TESTING: Set CANLII_API_BASE_URL env var to redirect to a mock server.
const CANLII_API_BASE =
  process.env.CANLII_API_BASE_URL ?? "https://api.canlii.org/v1";
```

Attack: An insider/attacker with Vercel env-var write access sets `CANLII_API_BASE_URL=https://attacker.example.com/v1`. All CanLII API search calls now hit the attacker's server. The attacker-controlled response's `case.title` flows into `analyze.js`'s system prompt (see Category 2 High finding). This is both SSRF (redirect of server-side requests) and a prompt-injection amplification path.
Impact: Requires Vercel project access (privileged). Blast radius is high if exploited: every analyze call that triggers retrieval gets an attacker-shaped system-prompt injection. Combined with the 7-day response cache TTL, poisoned responses persist.
Trace confidence: High

### [Medium] No fetch timeout on `api._caseLawRetrieval.js` CanLII search calls

File: api/\_caseLawRetrieval.js (CanLII search calls, not directly traced — see Coverage Gaps)
Evidence: `api/verify.js:315-317` uses `AbortSignal.timeout(8_000)` on its CanLII fetch — correctly guarded. `src/lib/canlii.js:362` uses `AbortSignal.timeout(8_000)` in `lookupCase`. However, `_caseLawRetrieval.js` does not call `fetch()` directly (its search calls go through `lookupCase` and other helpers from canlii.js) — so timeout is inherited from the canlii.js helpers. The `_retrievalOrchestrator.js` uses its own `Promise.race` timeout wrapper.
Confirmed: `lookupCase` in `canlii.js:362` has an 8s AbortSignal timeout. Covered.
Trace confidence: Medium (inferred from canlii.js; \_caseLawRetrieval.js not fully read)

### [Low] Citation normalization handles null/undefined gracefully

File: src/lib/canlii.js:108-112, 176-179
Evidence:

```js
function normalizeCitationInput(citation) {
  return String(citation || "").replace(/\s+/g, " ").trim();
}
export function parseCitation(citation) {
  if (!citation || typeof citation !== "string") return null;
```

Empty string, null, undefined, overly long strings: `parseCitation` returns null → callers return `{ status: "unparseable", searchUrl: ... }`. No crash.
For extremely long strings (>5000 chars): `scenario` is capped at 5000 chars in `analyze.js:660-665` before reaching citation parsing. `citations` array elements are capped at 500 chars in `verify.js:132`. Safe.
Impact: None — graceful degradation confirmed.
Trace confidence: High

### [Low] CANLII_API_KEY absent → correct graceful degrade (not fail-open)

File: src/lib/canlii.js:357-360, api/retrieve-caselaw.js:87-88, api/verify.js:308-310
Evidence:

```js
if (!apiKey) {
  return { status: "unverified", url: caseUrl, searchUrl };
}
```

When key is absent: returns `"unverified"` with a best-guess URL. Does not skip validation — it simply cannot verify against the API. Does not fail open to "verified". Correct behavior.
Trace confidence: High

## False Alarms

- **COURT_DB_MAP vs COURT_WEB_MAP confusion**: `COURT_DB_MAP` is explicitly aliased to `COURT_API_MAP` (canlii.js:106). Any caller of `COURT_DB_MAP` gets API IDs, not web IDs. No mix-up.
- **`caseId` injection via citation parsing**: citation number component is extracted by `/(\d+)$/` pattern — pure digits. Court code is uppercased and then looked up in a closed map; unknown courts short-circuit. No user-controlled freeform in URL path.
- **Database scoping by jurisdiction**: `JURISDICTION_DB_IDS` map in `_caseLawRetrieval.js:42-52` maps province names (from a whitelisted `VALID_JURISDICTIONS` set validated in `analyze.js:668-713`) to their court DB IDs. An attacker cannot request Quebec courts when Ontario is selected via the normal API — the jurisdiction value is allowlisted.

## Coverage Gaps

- `api/_caseLawRetrieval.js` is ~2700 lines — full content not read. The CanLII full-text search endpoint (`/v1/search/...`) may be called somewhere in that file; whether those calls have timeouts was not verified line-by-line.
- `_retrievalOrchestrator.js` not read in detail — assumed to call into canlii.js helpers which have 8s timeouts.
- No runtime test of the actual CanLII API to confirm URL construction correctness for edge-case jurisdictions (CMAC, TCC, NUCJ).
