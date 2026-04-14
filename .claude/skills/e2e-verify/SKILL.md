---
name: e2e-verify
description: Start the dev server and run the full Playwright E2E suite, then report failures with root-cause analysis. Use before any deploy or after touching API/component code.
---

# E2E Verify

Invoke with `/e2e-verify`. Starts the dev server, runs all Playwright tests, and reports failures with root-cause analysis.

## Steps

1. **Check if dev server is already running**

   ```bash
   lsof -i :3000 | grep LISTEN || echo "not running"
   ```

   If not running, start it in the background:

   ```bash
   npm run dev:api &
   ```

2. **Wait for the server to be ready** — poll until port 3000 responds (max 30s):

   ```bash
   npx wait-on http://localhost:3000 --timeout 30000
   ```

3. **Run the full Playwright suite**:

   ```bash
   npm test
   ```

4. **Report results**:
   - If all tests pass: confirm with the count (e.g., "42/42 tests passed").
   - If any tests fail: for each failing test, identify the root cause. Check whether the failure is:
     - A real regression (behavior changed)
     - A flaky test (retry once to confirm)
     - A missing fixture or stale snapshot
     - A network/timeout issue unrelated to code changes
   - Output a grouped summary: **Passed**, **Failed** (with root cause), **Skipped**.

5. **Stop the dev server** if you started it in step 1:
   ```bash
   kill $(lsof -ti :3000) 2>/dev/null || true
   ```

## Constraints

- Always use `npm run dev:api` — not `npm run dev` — to include the API layer
- Do not mark work as done if any test is failing without explanation
- Do not modify test files during this skill — report failures only
