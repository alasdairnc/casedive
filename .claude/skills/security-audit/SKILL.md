---
name: security-audit
description: Run a focused security audit on CaseDive API endpoints checking rate limiting, input validation, security headers, CORS, fetch timeouts, and model ID sourcing. Scores against a 100-point rubric.
---

# Security Audit

Invoke with `/security-audit`. Audit only — never fix anything.

## Scoring Rubric (100 points)

| Category          | Points | Checks                                                                |
| ----------------- | ------ | --------------------------------------------------------------------- |
| Rate Limiting     | 20     | Named bucket per endpoint, Redis timeout guard                        |
| Input Validation  | 20     | Body size limit, required field checks, type validation               |
| Security Headers  | 20     | `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `CSP` |
| CORS              | 15     | All headers via `_cors.js`, no inline `Access-Control-*`              |
| Fetch Hygiene     | 15     | `AbortSignal.timeout()` on every external fetch                       |
| Model ID Sourcing | 10     | Model string from `_constants.js`, never hardcoded                    |

**Score = (checks passing / total checks) × 100**

## Steps

### Phase 1 — Enumerate Endpoints

List all non-underscore files in `api/`:

```bash
ls api/*.js | grep -v '_'
```

### Phase 2 — Check Each Endpoint

For each endpoint file, verify:

1. **Rate limiting** — imports from `_rateLimit.js` and passes a named bucket string (not empty/default)
2. **Input validation** — uses `validateJsonRequest` or equivalent with `maxBytes`, plus field-level validation
3. **Security headers** — calls `applyStandardApiHeaders` or sets all four headers manually
4. **CORS** — imports from `_cors.js`; flag any file setting `Access-Control-*` directly
5. **Fetch timeout** — any `fetch()` call wraps with `AbortSignal.timeout()` or `Promise.race` with timeout
6. **Model ID** — any Anthropic API call uses model ID from `_constants.js`, not a hardcoded string

### Phase 3 — Score and Report

Output a markdown table:

| Endpoint   | Rate Limit | Validation | Headers | CORS | Fetch Timeout | Model ID | Score |
| ---------- | ---------- | ---------- | ------- | ---- | ------------- | -------- | ----- |
| analyze.js | ✓          | ✓          | ✓       | ✓    | ✓             | ✓        | 100   |
| search.js  | ✓          | ✗          | ✓       | ✓    | ✗             | ✓        | 67    |

Then output the **overall score** (average across all endpoints) and list every failing check with file:line.

## Constraints

- Audit only — do not fix, refactor, or modify any files
- Report file path and line number for every finding
- Do not invent issues not found in the code
