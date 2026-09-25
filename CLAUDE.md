# CaseDive - Claude Context File

AI-powered Canadian legal research tool. Stack: React 18 + Vite, Vercel serverless `/api/`, Anthropic API, Upstash Redis, CanLII API. Live at [casedive.ca](https://casedive.ca).

## Action Bias & Testing

- Act directly when intent is clear; avoid verbose narration
- When asked to "implement", "do", or "fix" something, execute it — do not drop into a brainstorming or scoping pass first. Plan briefly inline, then act. (Ask one clarifying question only if the target is genuinely ambiguous.)
- Always start dev server (`npm run dev:api`) before E2E/Playwright tests
- Run full test suite after code changes; fix failures before declaring done
- Add regression tests when fixing bugs

## Dependencies & Build

- Pin major version upgrades; do not auto-bump
- Verify build after any dependency change

## Commands

**Setup (new machine, macOS/Windows/Linux):** `npm install && npm run setup` — see `docs/local-setup.md`.

`npm run dev` (frontend), `npm run dev:api` (full stack), `npm run build`, `npm test`, `npm run test:unit`, `npm run test:component`, `npm run test:guardrails` (pre-PR: sanitizer + retrieval-failures + filter), `npm run test:retrieval-failures`

**Filter tuning:** `npm run test:filter` (report), `npm run test:filter:calibrate` (recalibrate thresholds), `npm run test:filter:compare` (before/after diff)

**Security:** `npm run security:scan` (gitleaks scan, run before pushing)

**Caselaw curation:** `npm run improve:caselaw` (propose-only relevance loop, dated digest), `npm run expand:caselaw` (propose-only corpus expansion), `npm run caselaw:curate` (both in sequence)

**Docs authoring:** `npm run docs:preview` (live-reload preview of docs/reports), `npm run docs:build -- <file.md>` (md → `artifacts/html/`), `npm run docs:lint` (markdownlint over reports + top-level docs). Generate digests with the `/weekly-report` skill.

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
- `criminalCodeData.js` is ~390KB (import `criminalCodeParts.js` for parts list)
- Redis falls back to in-memory in dev
- CanLII API key optional; Sentry no-ops if unset
- Hooks are Node scripts in `.claude/hooks/*.mjs` reading the JSON payload from stdin (`tool_input.file_path` / `tool_input.command`); exit 2 blocks the tool call. No python3 or sh dependency.
- `node --check` cannot parse JSX — scope JS syntax checks to `.js` only, never `.jsx`
- All Redis cache TTLs are 7 days (`604800s`). Changes to filter logic or landmark data won't be visible to cached users until TTL expires — manually purge affected keys in Upstash if a hotfix needs to take effect immediately.
- context7 MCP is active via global plugin; `.claude/mcp.json` entry is for team/project sharing — don't add it twice
- Vercel's Node runtime reads and parses the body BEFORE a `(req, res)` handler runs; the Next.js-style `export const config = { api: { bodyParser: false } }` is ignored. Anything that needs raw bytes (e.g. a payment webhook) must use a Web-standard handler: `export async function POST(request)` + `request.arrayBuffer()`.
- Hobby plan caps the project at 12 serverless functions; `api/` is at 10/12 since billing was parked (2026-09-25). Combine actions into one endpoint before adding a new file.
- `user-data` (cloud sync) is rate-limited per Supabase user at 120/h, not the 5/h AI default. Sync fires on every bookmark and every search, so the default silently broke sync after five actions.
- Vercel Hobby keeps about one hour of runtime logs. Anything older is only in Sentry.

## API Module Structure

`api/_*.js` = shared modules (rate limit, CORS, constants, filters, etc.)
`api/*.js` = endpoint handlers (analyze, case-summary, export-pdf, etc.)
Billing (Stripe checkout/portal/webhook) was **parked on 2026-09-25**: endpoints removed, `_subscription.js` and the `subscriptions` table kept so plan-aware rate limiting still works. Revive from git history (commit before `chore(billing): park`) and `docs/monetization-plan.md`.
`.claude/rules/` = auto-loaded guardrails (import rules, citation rules, git rules)

## Auth (Optional Login)

- Client-side Supabase auth: `src/lib/supabase.js`, `src/hooks/useAuth.js`, `src/components/AuthModal.jsx`; cloud sync via `api/user-data.js`
- There is NO `api/auth.js` — it was deleted; auth runs in the browser via the Supabase SDK
- Gated on `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`: if missing, auth silently disables (`isAuthEnabled` false, no sign-in button, no error)
- Server-side sync needs `SUPABASE_URL` + `SUPABASE_SERVICE_KEY`

## Reference Files (read on demand)

- `docs/README.md` (documentation index)
- `docs/ROADMAP.md` (current priorities + owner-only setup steps)
- `docs/local-setup.md` (macOS & Windows local dev setup)
- `docs/architecture.md`, `docs/design-system.md`, `docs/security.md`
- `docs/filtering/FILTER_TUNING.md`, `docs/filtering/FILTER_TUNING_QUICKSTART.md`
- `docs/auth-setup.md` (Supabase SMTP, redirect URLs, Google sign-in checklist)
- `docs/operations/PERFORMANCE_PLAN.md`; audit history in `.claude/skills/casedive-audit/AUDIT_LOG.md`
- `docs/archive/` (frozen April–June plans and snapshots, reference only)
- `artifacts/` (generated outputs, including `filter-quality-report.html`)

## Advisor Checkpoints

Call `advisor()` (no parameters — forwards full context to a stronger reviewer) at these gates:

- **New API endpoint:** after `api-invariant-reviewer` passes, before writing business logic
- **Retrieval/filter changes:** before editing any `_filters.js`, `_filterScoring.js`, `_filterConfig.js`, `_scenarioClassification.js`, or `_retrievalThresholds.js` — retrieval regressions are hard to spot inline
- **Security-touching changes:** before any change to auth, CORS, rate limiting, or input validation
- **Pre-push on high-effort tasks:** before `/verify`, if the branch touches 4+ files or changes core logic
- **Stuck:** after 2 consecutive tool failures, before changing approach

## Skills, Commands & Subagents

Consolidated 2026-09-25 from 27 pieces to 13. Everything here is referenced by a hook, a rule, a workflow or the roadmap; if you add one, add its reference too.

**Skills** (`.claude/skills/`, invoke as `/name`)

- `verify` — the one pre-push check: build, unit + component, guardrails, gitleaks, optional E2E (`/verify e2e`)
- `casedive-audit` — full project audit (security, caching, tests, data, config); appends to `AUDIT_LOG.md`
- `new-api-endpoint` — scaffold an endpoint with rate limit, validation, headers, logging pre-wired (remember the 12-function cap)
- `filter-tune` — filter calibration pipeline with baseline safety check
- `ops-checklist` — pre-deploy production checklist (Sentry, env vars, Redis quota)
- `weekly-report` — Sunday digest in the established format

**Commands** (`.claude/commands/`)

- `/improve-caselaw` — propose-only caselaw relevance loop, interprets the digest
- `/retrieval-health` — fetch and diagnose the live retrieval health snapshot (needs `RETRIEVAL_HEALTH_TOKEN`)

**Subagents** (`.claude/agents/`)

- `api-invariant-reviewer` — rate limiting, validation, headers, and caching invariants on `api/*.js` (the post-edit hook reminds you)
- `legal-data-validator` — schema check on `criminalCodeData.js`, `civilLawData.js`, `charterData.js`
- `retrieval-quality-reviewer` — scoring/threshold consistency after `_filter*`, `_scenarioClassification`, `_retrievalThresholds` changes
- `retrieval-regression-detector` — runs the retrieval failure corpus after the same files change
- `caselaw-curator` — propose-only relevance + expansion loop; never edits corpus, filter or threshold files

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
