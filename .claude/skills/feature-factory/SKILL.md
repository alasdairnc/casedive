---
name: feature-factory
description: Decompose a feature spec into independent slices, write failing tests first per slice, then dispatch parallel subagents to implement each slice until green. Use for any feature touching 3+ files.
---

# Feature Factory

Parallel test-driven feature delivery for CaseDive. You write the contracts, dispatch the agents, they iterate to green.

## When to use

- Feature spec is clear enough to decompose into 3–6 independent slices
- Slices have minimal cross-dependencies (each can be tested in isolation)
- You want parallel execution rather than sequential

Not for: hotfixes, single-file changes, or anything requiring tight slice coordination.

## Process

### Step 1 — Decompose the spec

Read the spec (user message, a file, or both). Identify 3–6 slices. Each slice must:

- Own a clear boundary (e.g. API endpoint, data model, UI component, test suite)
- Have a defined input/output contract
- Be testable independently before integration

Write the slice table to chat:

| Slice | Owner files | Contract (in → out) | Test file path |
| ----- | ----------- | ------------------- | -------------- |
| ...   | ...         | ...                 | ...            |

Ask the user to confirm or adjust before proceeding.

### Step 2 — Write failing tests first (per slice, sequential)

For each slice:

1. Create the test file at the agreed path
2. Write tests that will **fail** against the current codebase (red state)
3. Commit: `test(<slice>): add failing tests for <slice-name>`
4. Do NOT implement yet

**CaseDive test rules:**

- API slice tests → `tests/unit/<slice>.test.js` using Vitest
- Component slice tests → `tests/unit/<slice>.test.jsx` using Vitest + React Testing Library
- E2E slice tests → `tests/<slice>.spec.js` using Playwright
- No mocking of the database or Redis — use real in-memory fallback
- Use real Canadian legal citations only

Run `npm run test:unit` (or `test:component` for JSX) after each test file to confirm it fails for the right reason (missing implementation, not syntax errors).

### Step 3 — Dispatch parallel implementer subagents

After all test files are committed and red, dispatch one subagent per slice **in parallel** using the Agent tool.

Each subagent prompt must include:

- The slice name and its contract
- The exact test file path and command to run
- Files it is allowed to modify (its owner files only)
- The exit condition: "iterate until your test file passes"
- CaseDive constraints (see below)

**Subagent prompt template:**

```
You are implementing the <SLICE> slice for CaseDive.

Contract: <INPUT> → <OUTPUT>

Files you may modify: <OWNER_FILES>
Test file: <TEST_FILE>
Run tests with: <TEST_COMMAND>

Your job: make the tests in <TEST_FILE> pass. Iterate — read failures, implement, re-run — until all pass. Then stop.

CaseDive rules:
- No CSS frameworks. Inline styles via ThemeContext only.
- API endpoints: rate limiting (_rateLimit.js), input validation (validateJsonRequest), security headers (applyStandardApiHeaders), CORS (_cors.js).
- Model ID from _constants.js only — never hardcoded.
- Real Canadian legal citations — no fabricated sections or cases.
- All model/API calls in api/ — never from React components.

Commit when green: "feat(<slice>): implement <slice-name>"
```

### Step 4 — Integration check

After all subagents report green, run the full suite:

```bash
npm run test:unit && npm run test:component && npm run test:guardrails
```

Fix any cross-slice failures yourself (don't re-dispatch). Then run `/e2e-verify` for end-to-end confirmation.

### Step 5 — Finish

Use `superpowers:finishing-a-development-branch` to wrap up.

## Constraints

- You write the tests. Subagents write the implementation.
- Subagents may not modify files outside their designated owner files.
- If a subagent is blocked by a missing dependency from another slice, pause it and resolve the dependency yourself before re-dispatching.
- Maximum 6 slices per factory run. Larger features need to be split across multiple runs.
