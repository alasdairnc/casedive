# Design: CaseDive Docs Authoring Workflow

**Date:** 2026-06-02
**Status:** Approved (brainstorming complete, pending spec review)

## Problem

While working on CaseDive, Alasdair writes a steady stream of markdown and HTML
artifacts — weekly digests (`reports/weekly/*.md`), security audits
(`artifacts/security-audit-*.md`), docs (`docs/**`), and at least one generated
HTML report (`artifacts/filter-quality-report.html`). The authoring experience for
these is currently poor:

- **Lint:** `.markdownlint.json` exists but `markdownlint` is **not installed** and
  nothing runs it. The config is dead weight. The pre-commit hook
  (`.githooks/pre-commit`) only runs gitleaks.
- **Convert:** No md → HTML path for docs. The one HTML artifact is produced by a
  template string buried inside `scripts/tune-filters.js`. No `pandoc` installed.
- **Preview:** Nothing. Files are written blind.
- **Generate:** Reports are written ad-hoc by Claude/by hand with no enforced
  structure, so format drifts between weeks.

This is **not** an application change. It does not touch the CaseDive app runtime,
the API, the prompt, or the result-rendering path. It is purely about the
author's (Alasdair's) workflow for producing project documentation and reports.

## Non-Goals (YAGNI)

- **No `pandoc`.** Reports are generated in CI by GitHub Actions workflows
  (`chore(digest)` commits originate from `.github/workflows/`). Tooling must run
  wherever `npm install` runs and nowhere else. A system dependency would break CI
  and fresh-machine setup.
- **No doc → PDF / docx.** Not requested. (The app's `api/export-pdf.js` already
  covers result-JSON → PDF via pdfkit; it is unrelated to this workflow and is left
  untouched.)
- **No CI workflow changes.** Out of scope for this iteration.
- **No changes to the app, the API, the prompt (`src/lib/prompts.js`), or the
  result-card rendering.** Explicitly out of scope. The grouped response schema
  (`criminal_code` / `case_law` / `civil_law` / `charter`) and the
  "respond ONLY with JSON, no markdown" prompt contract are NOT modified.

## Architecture Overview

Four small, independent units, all npm-local (no system deps). The keystone is a
**single shared stylesheet** that lint, build, and preview all flow through — and
which is the _same_ theme the existing `filter-quality-report.html` already uses,
so converted docs look like one product, not a bolt-on.

```
scripts/
  _docReportStyle.js   ← shared CSS (extracted from tune-filters.js), single source of truth
  docs-build.js        ← md → standalone styled .html (uses marked + _docReportStyle)
  docs-preview.js      ← browser-sync live server (renders md via marked + _docReportStyle)
.markdownlint.json     ← (existing) now actually enforced
.githooks/pre-commit   ← (existing) gains a markdown-lint step
.claude/skills/weekly-report/SKILL.md  ← generation skill
package.json           ← new devDeps + docs:* scripts
```

Dependencies added (all devDependencies):

- `markdownlint-cli2` — lint, respects existing `.markdownlint.json`
- `marked` — md → HTML conversion (used by both build and preview)
- `browser-sync` — live-reload preview server

### Unit 1 — Lint

- **What it does:** Validates all project markdown against `.markdownlint.json`.
- **How to use it:** `npm run docs:lint`.
- **Depends on:** `markdownlint-cli2`, the existing `.markdownlint.json` and
  `.markdownlintignore` (which already excludes `Skills/`).
- **Scope:** `docs/**/*.md`, `reports/**/*.md`, `artifacts/**/*.md`, root `*.md`.
  Markdown only — never touches `.js`/`.jsx` (avoids the known
  `node --check` / JSX parsing gotcha; this is markdownlint, not node, but the
  scoping discipline is the same: stay in `.md`).
- **Pre-commit wiring:** Append a step to `.githooks/pre-commit` that runs
  `markdownlint-cli2` against **staged** `.md` files only. Must degrade gracefully
  if the binary is missing (mirror the existing gitleaks "not found" guard) so a
  fresh clone without `npm install` doesn't hard-block commits with a confusing
  error.

### Unit 2 — Convert / Build

- **What it does:** Turns a `.md` file into a standalone, styled `.html` document.
- **How to use it:** `npm run docs:build` → emits to `artifacts/html/`.
- **Depends on:** `marked`, `scripts/_docReportStyle.js`.
- **Behavior:** Wraps `marked`-rendered HTML body in a full HTML document with the
  shared `<style>` inlined (standalone files, no external CSS — portable/shareable).
- **Refactor included:** Extract the inline CSS currently in `tune-filters.js`
  (the `#2c2825` / `#faf7f2` palette, `.metrics` grid, etc.) into
  `scripts/_docReportStyle.js`, and have `tune-filters.js` import it. This
  de-duplicates the template and guarantees `filter-quality-report.html` and
  converted docs share one look. **This is a targeted improvement to code we're
  working in, not unrelated refactoring** — `tune-filters.js` behavior is preserved
  (same output bytes for the report, verified by regenerating and diffing).

### Unit 3 — Preview

- **What it does:** Serves `docs/`, `reports/`, and `artifacts/` in the browser with
  live reload; `.md` is rendered on the fly through the same `marked` +
  `_docReportStyle` pipeline as `docs:build`, so preview === build output.
- **How to use it:** `npm run docs:preview` (opens browser, watches files, reloads
  on save).
- **Depends on:** `browser-sync`, `marked`, `scripts/_docReportStyle.js`.
- **Implementation:** `browser-sync` with a small middleware that intercepts `*.md`
  requests, renders them through the shared pipeline, and serves the HTML. Static
  `.html` files served directly.

### Unit 4 — Generate (`/weekly-report` skill)

- **What it does:** Lets Alasdair ask Claude to produce a weekly digest (or security
  audit) in the established format, lint-clean, every time.
- **How to use it:** Invoke `/weekly-report` in Claude Code.
- **Depends on:** Nothing at runtime — it's a `.claude/skills/weekly-report/SKILL.md`
  capturing the structure observed in existing `reports/weekly/*.md`:
  `# CaseDive Weekly Digest — YYYY-MM-DD`, then `## Activity (last 7 days)`,
  `## Open PRs`, `## Merged this week`, `## Hottest files`,
  `## Retrieval health (from config)`, `## Dependency drift`, `## Watch list`.
- **Behavior:** The skill instructs Claude to gather the data (git log, `gh pr list`,
  dependency drift) and emit markdown matching that template, then run
  `npm run docs:lint` on the result before declaring done.

## Data Flow

```
Author writes  →  docs:preview (live render)  →  iterate
                          │
                          ▼
              docs:lint (pre-commit gate)  →  commit
                          │
                          ▼
              docs:build  →  artifacts/html/*.html  (shareable)

Claude /weekly-report  →  reports/weekly/<date>.md  →  docs:lint  →  commit
```

All three of preview / build / the existing filter report converge on
`scripts/_docReportStyle.js` — one stylesheet, one look.

## Error Handling

- **Missing binaries (pre-commit):** mirror the gitleaks guard — print an install
  hint and exit non-blocking if `markdownlint-cli2` isn't present, so a fresh clone
  doesn't hard-fail. (Local `npx` resolution means after `npm install` it's always
  present; the guard covers the pre-`npm install` window.)
- **Malformed markdown in build/preview:** `marked` is tolerant; render best-effort.
  Lint is the gate that catches structural problems, not the build.
- **Port already in use (preview):** `browser-sync` auto-selects an open port.

## Testing / Verification

This is tooling, not app code, so verification is script-level:

1. `npm run docs:lint` runs clean against all current markdown (fix any existing
   violations surfaced, or scope them out via `.markdownlintignore` if pre-existing
   and out of scope).
2. `npm run docs:build` produces valid HTML for a sample report; open it to confirm
   styling.
3. Regenerate `filter-quality-report.html` via `tune-filters.js` after the CSS
   extraction and **diff against the committed version** — must be byte-identical
   (proves the refactor is behavior-preserving).
4. `npm run docs:preview` serves and live-reloads a `.md` edit.
5. `/weekly-report` produces a digest matching the template and passing `docs:lint`.

No changes to existing test suites (`test:unit`, `test:component`, `test:guardrails`)
are needed since no app/API code changes.

## Build Sequence

1. Add devDeps (`markdownlint-cli2`, `marked`, `browser-sync`); `npm install`.
2. Extract `scripts/_docReportStyle.js`; refactor `tune-filters.js` to import it;
   verify byte-identical report output.
3. `scripts/docs-build.js` + `docs:build` script.
4. `scripts/docs-preview.js` + `docs:preview` script.
5. `docs:lint` script; run it; clean up violations.
6. Wire markdown lint into `.githooks/pre-commit` (non-blocking guard).
7. `.claude/skills/weekly-report/SKILL.md`.
8. Update project docs (`CLAUDE.md` commands list, `docs/README.md`) to mention the
   new `docs:*` scripts and the skill.
