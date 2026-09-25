---
name: verify
description: The one pre-push check. Build, unit + component tests, guardrails (sanitizer + retrieval corpus + filter report), gitleaks, and optionally the Playwright E2E suite. Run before any commit you intend to push.
---

# /verify

Runs every fast check a contributor should run locally, in order, and stops at
the first failure. E2E is opt-in because it needs the dev server and takes a
minute; everything else finishes in under a minute.

## Steps

1. **Build**

   ```bash
   npm run build 2>&1 | tail -3
   ```

2. **Unit + component tests**

   ```bash
   npm run test:unit && npm run test:component
   ```

   Stop here if anything fails. Never run E2E on top of red unit tests.

3. **Guardrails** (result-card sanitizer, retrieval failure corpus, filter report)

   ```bash
   npm run test:guardrails
   ```

   The filter report is a no-op without `CANLII_API_KEY`; that's expected locally.

4. **Secret scan**

   ```bash
   npm run security:scan
   ```

5. **Docs lint** (only if `.md` files changed)

   ```bash
   npm run docs:lint
   ```

6. **E2E** — only when `/verify e2e` is asked for, or when `src/`, `api/` or
   `tests/e2e/` changed:

   ```bash
   lsof -i :3000 | grep -q LISTEN || (npm run dev:api & npx wait-on http://localhost:3000 --timeout 30000)
   npx playwright test --workers=1
   ```

   Single worker first. If that passes, `npm test` for the parallel run. Ten or
   more simultaneous failures means a missing server or parallelism, not ten bugs.
   Kill the server afterwards if this skill started it:
   `kill $(lsof -ti :3000) 2>/dev/null || true`.

7. **Diff review**

   ```bash
   git diff --stat
   ```

   Look for files you didn't mean to touch (lockfile churn, `.env`, generated output).

## Report

```
VERIFY
Build        PASS
Unit/Comp    PASS  (309 / 71)
Guardrails   PASS
Secrets      PASS
Docs lint    PASS | skipped
E2E          PASS  (n/n) | skipped
Diff         k files

READY | NOT READY
```

## Constraints

- `npm run dev:api`, never `npm run dev`, for anything that hits `/api/`.
- Do not edit tests or source while verifying. Report, then fix as a separate step.
- Do not push. This skill reports; the person decides.
