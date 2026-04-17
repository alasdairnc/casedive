# Category 12: Logging & PII

Audit date: 2026-04-16
Auditor: inline (main session)

## Logger coverage

| Destination                        | What goes there                                                                                                                                                                                                                       | Scrubbed?                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| Vercel stdout (`console.log`)      | Structured JSON via `_logging.js`: requestId, endpoint, method, url, clientIp, userAgent, rateLimitRemaining, event names, errorMessage, durationMs, cacheKeyHash (first 16 chars). No scenario text in the documented log functions. | N/A — no scenario text in logger   |
| Sentry (`captureException`)        | Uncaught errors in analyze.js:1020, case-summary.js (implied), retrieve-caselaw.js:210. `err.message` and stack. No `beforeSend` hook.                                                                                                | No — full exception captured       |
| Redis                              | Response caches (keyed by scenario SHA-256), rate-limit buckets, metrics events with `scenarioSnippet`.                                                                                                                               | Partial — snippet is 280 chars max |
| `_retrievalHealthStore.js` metrics | `scenarioSnippet` (up to 280 chars), `errorMessage` (200), `fallbackTriggerReason` (80), `issuePrimary` (40). Stored in Redis with no TTL.                                                                                            | Truncated but not scrubbed         |

## Findings

### [High] `_retrievalHealthStore` persists scenario snippets indefinitely in Redis

File: api/\_retrievalHealthStore.js:34-103 (normalizeEvent), api/analyze.js (cacheHit/miss paths calling recordRetrievalMetricsEvent)
Evidence: `normalizeEvent` preserves `scenarioSnippet` up to 280 chars. Events are stored in `metrics:retrieval:events:v1` (Redis key, no TTL) and capped at 10,000 entries. This is attacker-influenced user-provided text (the scenario) stored in a persistent backend store with no expiry.
Impact: Up to 2.8MB of user scenario text (10,000 × 280 chars) persists in Redis indefinitely. Retrievable via `/api/retrieval-health` (token-gated but a single leaked token exposes all of it). For a legal research product, these snippets may contain real legal facts about real people. Legal sensitivity is high.
Trace confidence: High

### [High] Sentry receives full exception objects with no `beforeSend` scrubbing hook

File: api/\_sentry.js:5-13
Evidence:

```js
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.VERCEL_ENV || "development",
  tracesSampleRate: 0.2,
});
```

No `beforeSend` hook. Sentry's Node SDK captures the exception, its message, stack trace, and — critically — the breadcrumb trail including HTTP request context. If an unhandled exception occurs during scenario processing, Sentry may capture:

- The scenario text (as part of a request body breadcrumb if the Sentry HTTP integration captures request bodies)
- CanLII API responses (in error context)
- Internal prompts (if included in an Error's message)

`Sentry.captureException(err)` is called at `analyze.js:1020` (top-level catch) and `analyze.js:944` (retrieval error). The `err.message` for retrieval failures could include partial scenario context if propagated.
Impact: User legal scenario text may flow to Sentry's external cloud service without scrubbing. Sentry retains data per the organization's data retention settings.
Trace confidence: Medium (depends on whether Sentry HTTP integration attaches request bodies; not confirmed)

### [Medium] `logRequestStart` logs `req.url` including any query parameters

File: api/\_logging.js:22-37
Evidence:

```js
url: req.url,
```

For GET endpoints (`/api/retrieval-health`, `/api/status`, `/api/filter-quality`), query parameters are part of `req.url` and are logged to stdout. Currently these endpoints don't accept sensitive query params, but the pattern is fragile. If any GET endpoint were added with a token or user-identifier in the URL, it would be logged.
Impact: Low for current endpoints. Pattern risk for future additions.
Trace confidence: High

### [Low] Vercel Analytics (`@vercel/analytics`) may capture page-view metadata

File: src/main.jsx:3, 17-21
Evidence: `<Analytics />` component from `@vercel/analytics/react` is rendered in the app. Vercel Analytics captures page views by default. It does not capture form inputs or typed text, but it does capture URL path and navigation events. Since CaseDive is a SPA with no URL-based routing that includes scenario text, this is low risk.
Impact: Negligible — page views only, no scenario text in URLs.
Trace confidence: Medium

## No scenario text in stdout logger functions

Review of all `logXxx` calls in `_logging.js`: none of the exported functions accept or log `scenario`, `body`, or request payload text. Logger functions are: `logRequestStart`, `logRateLimitCheck`, `logValidationError`, `logCacheHit`, `logCacheMiss`, `logExternalApiCall`, `logSuccess`, `logError`. All log operational metadata (IDs, counts, durations, error messages) — not user content.

`logValidationError` at `analyze.js:661` logs `"Scenario too long"` with `field: "scenario"` — logs the validation message, not the scenario value. Correct.

`logCacheHit` logs `cacheKey.substring(0, 16)` — first 16 chars of the SHA-256 hex (32 chars total). This leaks nothing about the scenario content.
Trace confidence: High

## False Alarms

- `console.log` in `_logging.js`: all uses are via structured logger functions that don't include user scenario text.
- `logError` at `_logging.js:179-200`: logs `error.message`, not request body. Error messages from API endpoints are sanitized upstream.
- `_retrievalMetrics.js` — not read; assumed similar to `_retrievalHealthStore.js` patterns. Flagged in Coverage Gaps.

## Coverage Gaps

- Sentry HTTP integration breadcrumb behavior not confirmed — whether Sentry SDK for Node automatically captures request body in breadcrumbs depends on SDK version and config. Requires a runtime check or SDK docs review.
- `api/_retrievalMetrics.js` not read — may have additional logging/storage patterns.
- `api/report-case-law.js` stores user-submitted report `note` (up to 300 chars of freeform text) in `_caseLawReportStore.js`. This is intentional but constitutes user-controlled text in a backend store.
- Vercel log drain — if a log drain is configured in the Vercel dashboard, all stdout (including structured logs) flows to a third-party provider. Not verifiable from repo files.
