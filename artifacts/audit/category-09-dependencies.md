# Category 9: Dependencies & Build Supply Chain

Audit date: 2026-04-16
Working dir: `/Users/alasdairnc/Desktop/Dev/casedive`
Scope: npm supply chain for CaseDive repo (package.json, package-lock.json, node_modules, scripts, registry config).

## npm audit

```
npm audit --json
```

Result (top-level):

- auditReportVersion: 2
- vulnerabilities: info 0, low 0, moderate 0, high 0, critical 0, total 0
- dependency counts: prod 107, dev 206, optional 53, peer 10, total 312

No advisories reported against the current lockfile. Command ran inside the sandbox without issue (no coverage gap).

## Unpinned / suspicious versions

`package.json` (`/Users/alasdairnc/Desktop/Dev/casedive/package.json`):

Exact-pinned (good):

- `@upstash/redis` — `1.31.1` (package.json:36)
- `react` — `18.2.0` (package.json:39)
- `react-dom` — `18.2.0` (package.json:40)

Caret-pinned (accept compatible-minor+patch; major drift impossible but minor supply-chain drift possible):

- `@sentry/node` — `^10.46.0` (package.json:34)
- `@sentry/react` — `^10.46.0` (package.json:35)
- `@vercel/analytics` — `^2.0.1` (package.json:37)
- `pdfkit` — `^0.18.0` (package.json:38) — note: `0.x` caret (`^0.18.0`) pins only the patch range, so new minors (`0.19.x`) will NOT auto-install; this is tighter than caret on a 1.x dep but still accepts patch updates.

Dev deps (caret):

- `@playwright/test` — `^1.58.2` (package.json:43)
- `@testing-library/react` — `^16.3.2` (package.json:44)
- `@types/react` — `^18.2.0` (package.json:45)
- `@types/react-dom` — `^18.2.0` (package.json:46)
- `@vitejs/plugin-react` — `^4.7.0` (package.json:47)
- `@vitest/browser` — `^4.1.2` (package.json:48)
- `happy-dom` — `^20.8.8` (package.json:49)
- `jsdom` — `^29.0.1` (package.json:50)
- `vite` — `^6.4.2` (package.json:51)
- `vitest` — `^4.1.1` (package.json:52)

No `"latest"`, `"*"`, `"x"`, git URLs, `file:` URLs, or `http(s):` tarball specifiers appear in `dependencies` or `devDependencies`.

No dev-only packages appear to be listed under `dependencies` (Vitest, Playwright, jsdom, happy-dom, Vite, @types/\*, @vitejs/plugin-react are all correctly in `devDependencies`). The frontend is bundled by Vite, so dev deps are not shipped in the prod bundle; serverless functions under `api/` require only `@sentry/node`, `@upstash/redis`, `@vercel/analytics`, `pdfkit`, `react`, `react-dom`.

### CVE-sensitive deps — status vs. audit thresholds

Checked against the list in the audit brief:

- `axios` — not installed (neither direct nor transitive) — n/a
- `follow-redirects` — not installed — n/a
- `tar` — not installed at top-level and no references in lock — n/a
- `postcss` — `8.5.8` installed (>= 8.4.31 threshold) — OK (node_modules/postcss/package.json)
- `semver` — `6.3.1` installed as a transitive (>= 7.5.2 threshold is for the 7.x line; 6.3.1 is the fixed 6.x release addressing CVE-2022-25883) — OK
- `node-fetch` — not installed — n/a

None of the called-out CVE thresholds are breached.

## Scripts — dangerous patterns

`package.json` scripts (lines 8–32) reviewed:

- No `curl ... | sh`, no `wget ... | sh`, no `eval`, no remote-fetch-then-execute patterns.
- No `postinstall` / `preinstall` / `install` hooks at the top level (reduces supply-chain blast radius from `npm install` on a fresh clone).
- `security:scan` uses `gitleaks` locally (package.json:29–30).
- `security:hooks` runs `bash scripts/setup-git-hooks.sh` — local file, not remote.
- Test/build scripts invoke pinned local binaries (`vite`, `vitest`, `playwright`, `vercel`, `node scripts/*.js`); all good.

## Transitive install scripts

Enumerated via `grep -E '"(postinstall|preinstall|install)":' node_modules/*/package.json`:

Single match:

- `node_modules/esbuild/package.json` — `"postinstall": "node install.js"`

Inspected `node_modules/esbuild/install.js` (first 60 lines): standard esbuild platform-binary bootstrap (resolves the correct `@esbuild/<platform>` package and exposes its binary via `ESBUILD_BINARY_PATH`). No network fetch beyond what the esbuild package itself has always done; matches upstream source. No unexpected spawn, no curl/wget, no base64 blobs. Benign.

Note: grep only inspects the first directory level (`node_modules/*/package.json`) — scoped packages (`node_modules/@scope/*/package.json`) were not enumerated by the initial pass; treat deeper scoped scripts as a Coverage Gap (see below).

## package-lock.json — resolved-URL integrity

Sampled `"resolved": "..."` lines and filtered for any host that is NOT `https://registry.npmjs.org/`.

```
grep -oE '"resolved":\s*"[^"]+"' package-lock.json | grep -vE '"https://registry\.npmjs\.org/'
```

Zero matches. Every `resolved` URL in `package-lock.json` points to `https://registry.npmjs.org/`. No GitHub tarballs, no private registries, no jsr:, no git+ssh, no HTTP (unencrypted). Supply chain surface is narrowed to the public npm registry.

## Registry overrides

- `.npmrc` — absent (`ls` returns ENOENT)
- `.yarnrc` — absent
- `.yarnrc.yml` — absent

No registry override files in the repo root. Clients will use the npm default registry. `packageManager` is pinned to `npm@11.11.0` (package.json:5), which Corepack will enforce on compatible tooling.

## Findings

### [Low] `@sentry/node` / `@sentry/react` pinned with caret across a fast-moving major

Files: `/Users/alasdairnc/Desktop/Dev/casedive/package.json:34-35`

`^10.46.0` on a pair of runtime packages that ship both server-side (API functions) and client-side (React app) code. Sentry 10.x has shipped frequent minors; caret accepts any `10.x.y >= 10.46.0`. A minor Sentry release could unintentionally alter breadcrumb or transport behaviour server-side where secrets transit. Impact is limited because `package-lock.json` pins exact versions for reproducibility, but a `npm install --force` or lockfile regeneration would resolve the latest `10.x`. Consider exact-pinning Sentry the way `@upstash/redis` is pinned (package.json:36).

### [Low] `pdfkit` at `^0.18.0` for a pre-1.0 dependency

File: `/Users/alasdairnc/Desktop/Dev/casedive/package.json:38`

Caret on a `0.x` version only permits patch updates, which is fine; but `pdfkit` is a pre-1.0 library handling user-controlled content (report generation). Recommend tracking advisories and exact-pinning.

### [Low] Dev-dependency churn surface (`vitest`, `@vitest/browser`, `vite`, `@vitejs/plugin-react`)

Files: `/Users/alasdairnc/Desktop/Dev/casedive/package.json:47-52`

Dev deps accept caret ranges across Vitest 4.x / Vite 6.x. These don't ship to production, but a compromised Vite/Vitest post-install could execute during local CI. Current lockfile is clean (single `esbuild` postinstall, inspected). Tightening would reduce churn-driven supply chain exposure but is not a live vulnerability.

### [Low] No `engines` field or `.nvmrc` in repo root

File: `/Users/alasdairnc/Desktop/Dev/casedive/package.json` (no `engines`)

`packageManager` is pinned (`npm@11.11.0`, package.json:5) but there is no Node version pin in `package.json`'s `engines` or a visible `.nvmrc`. This affects reproducibility of the security properties of `node_modules` (e.g., which native-module versions get compiled) more than runtime security itself.

### [Informational] Single transitive postinstall is the expected esbuild bootstrap

File: `/Users/alasdairnc/Desktop/Dev/casedive/node_modules/esbuild/install.js`

Documented here only so future audits can diff against it. Confirmed benign on this version (`esbuild 0.25.12`). If this file's line count / hash changes unexpectedly between versions, revisit.

## Coverage Gaps

- **Transitive install-script enumeration is shallow.** `grep node_modules/*/package.json` does NOT descend into scoped packages (`node_modules/@sentry/*/package.json`, `node_modules/@vercel/*/package.json`, `node_modules/@playwright/*/package.json`, etc.) or nested `node_modules/*/node_modules/*`. A thorough pass would be `grep -l '"postinstall"\|"preinstall"\|"install":' node_modules/**/package.json` under a glob-expanding shell, or `npm query ':has(#scripts.postinstall)'`. Not performed in this audit.
- **CVE database lookup beyond the audit brief's list.** `npm audit` returned zero advisories, so reliance is on npm's advisory DB. A separate check against GHSA / Snyk was not performed.
- **Lockfile tampering / integrity hash verification.** `package-lock.json` includes `"integrity"` SRI hashes per entry; this audit confirmed registry-origin URLs but did not re-verify each SHA-512 against the upstream registry.
- **`node_modules` freshness.** Packages on disk reflect the last `npm install`; they may diverge from `package-lock.json` if someone ran an ad-hoc install. A fresh `npm ci` would close this gap.
- **Binary platform packages for esbuild** (`@esbuild/darwin-arm64`, etc.) were not individually inspected; trust was inherited from the `esbuild` parent and npm registry provenance.
