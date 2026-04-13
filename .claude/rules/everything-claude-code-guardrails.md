---
paths: "**/*"
---

# CaseDive Guardrails

## IMPORTS

- Import Criminal Code parts via `criminalCodeParts.js` — never import the full
  `criminalCodeData.js` (316KB) unless section-level lookup is required
- All API keys and model IDs live in `api/_constants.js` — never hardcode inline
- CORS headers come from `api/_cors.js` only — never set `Access-Control-*` directly

## CITATIONS

- Use real Canadian legal citations only — never fabricate section numbers,
  case names, or neutral citations
- Criminal Code: RSC 1985, c C-46
- Charter: Constitution Act, 1982, Schedule B, Part I

## API ENDPOINTS

- Every new endpoint must pass `api-invariant-reviewer` before any logic is written
- Rate limit key must match the endpoint filename (e.g. `"analyze"` for `analyze.js`)
- Use `process.env.VAR_NAME` with fallbacks — never read `.env` directly in endpoint files

## GIT

- Conventional commits: `feat:`, `fix:`, `test:`, `docs:`, `chore:`
- Never commit without running `/verify` first
- Never `git push` without running `pre-push-checklist` agent

## DATA FILES

- After any edit to `criminalCodeData.js`, `civilLawData.js`, or `charterData.js`:
  run `legal-data-validator` before committing
