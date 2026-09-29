---
name: verify
description: The pre-push check, scoped to what changed. Docs-only changes get docs lint and a secret scan; code changes add tests, build and the guardrails/E2E that the touched files call for. Run before any commit you intend to push.
---

# /verify

Look at what changed first, then run only the checks that change can break.
Stops at the first failure. CI repeats the full suite on every PR and the
pre-push hook already runs `test:unit`, so this is the fast local pass, not a
second copy of CI.

## Step 0: scope the change

```bash
git diff --name-only origin/main...HEAD; git diff --name-only; git ls-files --others --exclude-standard
```

Classify the union of those files:

- **docs-only**: every file is `*.md`, under `docs/`, `reports/` or `artifacts/`
- **code**: anything else

Then pick checks from the table.

| Check | Run when |
| --- | --- |
| Secret scan | always |
| Docs lint | any `.md` changed |
| Unit + component | code |
| Build | `src/`, `index.html`, `vite.config.*`, `package*.json` changed |
| Guardrails | `api/_filter*`, `api/_scenarioClassification.js`, `api/_retrievalThresholds.js`, `src/lib/*Data.js`, sanitizer files, or `tests/retrieval*` changed |
| Legal-data validator | `criminalCodeData.js`, `civilLawData.js` or `charterData.js` changed |
| E2E | `/verify e2e` asked for, or `src/`, `api/` or `tests/e2e/` changed |

A docs-only change runs just the secret scan and docs lint.

## Checks

1. **Secret scan**

   ```bash
   npm run security:scan
   ```

2. **Docs lint**

   ```bash
   npm run docs:lint
   ```

3. **Unit + component tests**

   ```bash
   npm run test:unit && npm run test:component
   ```

   Stop here if anything fails. Never run E2E on top of red unit tests.

4. **Build** (no pipe: a pipe to `tail` would hide a non-zero exit)

   ```bash
   npm run build
   ```

5. **Guardrails** (result-card sanitizer, retrieval failure corpus, filter report)

   ```bash
   npm run test:guardrails
   ```

   The filter report is a no-op without `CANLII_API_KEY`; that's expected locally.

6. **E2E**

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

Mark checks that didn't apply as `skipped`.

```
VERIFY  (docs-only | code)
Secrets      PASS
Docs lint    PASS | skipped
Unit/Comp    PASS  (309 / 71) | skipped
Build        PASS | skipped
Guardrails   PASS | skipped
E2E          PASS  (n/n) | skipped
Diff         k files

READY | NOT READY
```

## Constraints

- `npm run dev:api`, never `npm run dev`, for anything that hits `/api/`.
- Do not edit tests or source while verifying. Report, then fix as a separate step.
- Do not push. This skill reports; the person decides.
