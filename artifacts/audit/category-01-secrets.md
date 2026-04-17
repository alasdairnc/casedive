# Category 1: Secrets & Credentials

Audit date: 2026-04-16
Auditor: inline (main session)

## Findings

### [Medium] `VITE_SENTRY_DSN` ships to client bundle — DSN is a Sentry ingest URL, not a private key, but it is PII-adjacent

File: src/main.jsx:9
Evidence:

```js
dsn: import.meta.env.VITE_SENTRY_DSN,
```

Vite bakes all `VITE_*` env vars into the JS bundle at build time. `VITE_SENTRY_DSN` contains the Sentry project DSN (a public ingest URL). Sentry DSNs are designed to be client-exposed, so this is not a secret leak per se — but the DSN identifies the Sentry project/org and allows anyone to submit events, which can cause noise or exhaust event quotas.
Impact: DSN abuse (fake event injection into Sentry); low blast radius.
Trace confidence: High

### [Low] AdSense publisher ID (`ca-pub-5931276184603899`) is public in HTML and JS

File: index.html:63, src/App.jsx:180-181
Evidence:

```html
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5931276184603899"
```

Publisher IDs are intentionally public, but this one is embedded in a public repo and HTML. Allows competitors to target this pub-ID.
Impact: Negligible for security; noted for completeness.
Trace confidence: High

### [Low] No runtime guard on `CANLII_API_BASE_URL` env override in production

File: api/\_caseLawRetrieval.js:32-36
Evidence:

```js
// SECURITY TESTING: Set CANLII_API_BASE_URL env var to redirect to a mock server.
const CANLII_API_BASE =
  process.env.CANLII_API_BASE_URL ?? "https://api.canlii.org/v1";
```

Comment says "Revert both after testing" but there is no assertion/guard that rejects this override in `VERCEL_ENV=production`. An insider who sets this env var redirects all CanLII API calls to an attacker-controlled host, which is also an SSRF/prompt-injection amplification path (see Category 2 and 6 findings).
Impact: Requires Vercel env-var write access (privileged). Blast radius elevated because the injection chain from a spoofed CanLII title to the system prompt is fully wired (see Cat 2).
Trace confidence: High

## No secrets found in tracked files

- `git ls-files | grep -E '\\.env($|\\.)'` → only `.env.example` tracked (expected).
- `.env.example` could not be read (permissions-restricted in sandbox). File presence is normal.
- Grep for `sk-ant-`, `AIza`, `xoxb-`, `ghp_`, `eyJ`, `BEGIN RSA/PRIVATE`, `sk_live`, `sk_test`, `bearer` across all JS/JSX/JSON returned no matches in non-node_modules source.
- `git log -S "sk-ant-"`, `-S "UPSTASH_REDIS_REST"`, `-S "CANLII_API_KEY"` returned no commits (no secrets appear in git history based on scoped searches).
- `public/` contains only `about.html`, `ads.txt`, `favicon.svg`, `logos/`, `og-image.png`, `privacy.html`, `robots.txt`, `sitemap.xml`, `terms.html` — no secrets.
- API endpoints read secrets via `process.env.VAR_NAME` only; no env value is echoed in a response body, error message, or log line. All error messages for missing keys (e.g., `"ANTHROPIC_API_KEY is not configured"`) use hardcoded strings, not the key value itself.
- `dist/` is git-ignored and not tracked.
- No `.env` (actual) file is tracked.

## False Alarms

- `process.env.ANTHROPIC_API_KEY` at `api/analyze.js:717`: read and passed to `callAnthropic()`; never logged, never returned in a response. Clean.
- `process.env.RETRIEVAL_HEALTH_TOKEN` at `api/retrieval-health.js:39`: used only in `timingSafeEqual` comparison; never logged or returned.
- Upstash REST token at `api/_rateLimit.js:18-20`: used to initialize the `@upstash/redis` client; not logged or returned.

## Coverage Gaps

- `.env.example` contents unreadable in sandbox (permission-restricted). Assumed to contain only placeholder values, not real secrets. Verify manually.
- Git history search was limited to high-signal patterns; a full `git log -p --all` was not run (too large). `gitleaks` is wired as `npm run security:scan` — run it for authoritative git-history coverage.
- `VITE_*` values in Vercel env dashboard (vs. local `.env`) not verified — could contain non-public values if someone set a `VITE_` prefixed secret there.
