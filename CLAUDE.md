npm run dev:api # Full stack via Vercel CLI — USE THIS for any API work
npm run test:component # Vitest component tests (.test.jsx only)
npm run test:guardrails # Pre-PR: sanitizer + retrieval-failures + hallucination filter

# CaseDive - Claude Context File

AI-powered Canadian legal research tool. Stack: React 18 + Vite, Vercel serverless `/api/`, Anthropic API, Upstash Redis, CanLII API. Live at [casedive.ca](https://casedive.ca).

## Action Bias & Testing

- Act directly when intent is clear; avoid verbose narration
- Always start dev server (`npm run dev:api`) before E2E/Playwright tests
- Run full test suite after code changes; fix failures before declaring done
- Add regression tests when fixing bugs

## Dependencies & Build

- Pin major version upgrades; do not auto-bump
- Verify build after any dependency change

## Active Dev Context

Run `npm run security:scan` before any pre-push check.

## Commands

`npm run dev` (frontend), `npm run dev:api` (full stack), `npm run build`, `npm test`, `npm run test:unit`, `npm run test:component`, `npm run test:guardrails`, `npm run test:retrieval-failures`

**Filter tuning:** `npm run test:filter` (report), `npm run test:filter:calibrate` (recalibrate thresholds), `npm run test:filter:compare` (before/after diff)

**Security:** `npm run security:scan` (gitleaks scan, run before pushing)

**Docs authoring:** `npm run docs:preview` (live-reload preview of docs/reports), `npm run docs:build -- <file.md>` (md → `artifacts/html/`), `npm run docs:lint` (markdownlint over reports + docs/superpowers). Generate digests with the `/weekly-report` skill.

## Memory & Session

Save non-obvious decisions/gotchas to `.claude/projects/*/memory/` immediately.

## Critical Rules

- No CSS framework (all styling via ThemeContext)
- Model/API calls server-side only
- New endpoints: rate limiting, input validation, security headers
- CORS via `_cors.js` only
- Model ID from `_constants.js` only
- Use real Canadian legal citations only
- Preserve grouped response schema: `criminal_code`, `case_law`, `civil_law`, `charter`
- Never commit `.env`/secrets or push to git without explicit instruction
- Claude-token workflows: default skip, require opt-in, concurrency cancel, precheck for low-value

## Key Gotchas

- `npm run dev` ≠ `npm run dev:api` (use `dev:api` for `/api/`)
- `test:unit` excludes `.test.jsx` (use `test:component` for JSX)
- `criminalCodeData.js` is 316KB (import `criminalCodeParts.js` for parts list)
- Redis falls back to in-memory in dev
- CanLII API key optional; Sentry no-ops if unset
- PostToolUse hooks: use `$CLAUDE_TOOL_INPUT_FILE_PATH` env var (shell hooks) or `data.get('tool_input', {}).get('file_path', '')` from stdin (Python hooks) — both patterns exist in `.claude/hooks/`
- `node --check` cannot parse JSX — scope JS syntax checks to `.js` only, never `.jsx`
- All Redis cache TTLs are 7 days (`604800s`). Changes to filter logic or landmark data won't be visible to cached users until TTL expires — manually purge affected keys in Upstash if a hotfix needs to take effect immediately.
- context7 MCP is active via global plugin; `.claude/mcp.json` entry is for team/project sharing — don't add it twice

## API Module Structure

`api/_*.js` = shared modules (rate limit, CORS, constants, filters, etc.)
`api/*.js` = endpoint handlers (analyze, case-summary, export-pdf, etc.)
`.claude/rules/` = auto-loaded guardrails (import rules, citation rules, git rules)

## Reference Files (read on demand)

- `docs/README.md` (documentation index)
- `docs/architecture.md`, `docs/design-system.md`, `docs/security.md`
- `docs/filtering/FILTER_TUNING.md`, `docs/filtering/FILTER_TUNING_QUICKSTART.md`
- `docs/operations/` (runbooks, snapshots, performance plan, audit log)
- `artifacts/` (generated outputs, including `filter-quality-report.html`)

## Advisor Checkpoints

Call `advisor()` (no parameters — forwards full context to a stronger reviewer) at these gates:

- **New API endpoint:** after `api-invariant-reviewer` passes, before writing business logic
- **Retrieval/filter changes:** before editing any `_filters.js`, `_filterScoring.js`, `_filterConfig.js`, `_scenarioClassification.js`, or `_retrievalThresholds.js` — retrieval regressions are hard to spot inline
- **Security-touching changes:** before any change to auth, CORS, rate limiting, or input validation
- **Pre-push on high-effort tasks:** before `pre-push-checklist`, if the branch touches 4+ files or changes core logic
- **Stuck:** after 2 consecutive tool failures, before changing approach

## Agent Skills & Subagents

Auto-loaded from `.claude/skills/` (e.g., `casedive-audit`, `new-api-endpoint`).

- `api-invariant-reviewer`: Checks `api/*.js` for rate limiting, input validation, security headers
- `legal-data-validator`: Validates schema of legal data files
- `pre-push-checklist`: Chains build + security scan + E2E before any push
- `retrieval-regression-detector`: Run when `_filters.js`, `_filterScoring.js`, `_filterConfig.js`, `_scenarioClassification.js`, or `_retrievalThresholds.js` change
- `test-selector`: Determines which test suites to run based on changed files

**Full skills list:** `casedive-audit`, `new-api-endpoint`, `e2e`, `e2e-verify`, `feature-factory`, `security-audit`, `caching-audit`, `verify-before-push`, `resume-checkpoint`, `filter-tune`

## Workflow Rules (from claude-doctor)

- Read the full file before editing; plan all changes, then make ONE complete edit
- If a file is edited 3+ times, re-read requirements
- Re-read the last user message before responding; follow every instruction
- Every few turns, re-read the original request to avoid drift
- When corrected, quote back the request and confirm before proceeding
- When stuck, summarize attempts and ask for guidance — **call `advisor()` before changing approach**
- Double-check output before presenting; verify it addresses the request
- After 2 consecutive tool failures, **call `advisor()`** before trying a third approach

## Testing & Verification

- Always start dev server (`npm run dev:api`) before E2E/Playwright tests — hung tests = missing server
- After any refactor that changes data shapes or API contracts, run full unit suite before declaring done
- For E2E failures, run with `--workers=1` first to rule out parallelism before diagnosing state issues
- If 10+ tests fail simultaneously, suspect parallelism or missing server — not individual test bugs
