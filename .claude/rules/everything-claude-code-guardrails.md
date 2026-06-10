---
paths: "**/*"
---

# CaseDive Guardrails

## IMPORTS

- Import Criminal Code parts via `criminalCodeParts.js` — never import the full
  `criminalCodeData.js` (~390KB) unless section-level lookup is required
- All API keys and model IDs live in `api/_constants.js` — never hardcode inline
- CORS headers come from `api/_cors.js` only — never set `Access-Control-*` directly

## CITATIONS

- Use real Canadian legal citations only — never fabricate section numbers,
  case names, or neutral citations
- Criminal Code: RSC 1985, c C-46
- Charter: Constitution Act, 1982, Schedule B, Part I

## API ENDPOINTS

- Every new endpoint must pass `api-invariant-reviewer` before any logic is written
- After `api-invariant-reviewer` passes, **call `advisor()` before writing business logic** — catches design issues before they're baked in
- Rate limit key must match the endpoint filename (e.g. `"analyze"` for `analyze.js`)
- Use `process.env.VAR_NAME` with fallbacks — never read `.env` directly in endpoint files

## GIT

- Conventional commits: `feat:`, `fix:`, `test:`, `docs:`, `chore:`
- Never commit without running `/verify` first
- Never `git push` without running `pre-push-checklist` agent

## DATA FILES

- After any edit to `criminalCodeData.js`, `civilLawData.js`, or `charterData.js`:
  run `legal-data-validator` before committing

## ENVIRONMENT

- `rm -rf` is denied by the sandbox guardrail. To remove an **empty** directory,
  use `rmdir` — it preserves the guardrail and skips the blocked-command retry.
  For a non-empty directory, list and remove contents explicitly, then `rmdir`.
- After bumping Playwright, the bundled browser binaries do **not** update with the
  npm package. Run `npx playwright install chromium webkit` before any E2E run, or
  the first two suites fail with "browser not found".
