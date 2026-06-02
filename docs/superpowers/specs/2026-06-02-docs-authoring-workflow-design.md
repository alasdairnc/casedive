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

Four small, independent units, all npm-local (no system deps).

> **De-scope (2026-06-02, post-spec):** An earlier draft proposed a _shared
> stylesheet extracted from `tune-filters.js`_ as the keystone. Reading that CSS
> (`tune-filters.js:388-409`) showed it is **report-specific** dashboard CSS —
> `.metric` grids, `.suggestion` boxes, pass/fail row coloring — not a reusable
> prose theme. A weekly digest is prose (headings, paragraphs, code, tables) with
> almost no overlap, so there is nothing to DRY. The _only_ shared surface is ~3
> palette hex codes. Therefore: `docs-build.js` carries its **own self-contained
> prose stylesheet**, reusing the existing palette (`#2c2825` / `#faf7f2` /
> `#d4a040`) for visual kinship; `tune-filters.js` is **left untouched**, and the
> byte-identical-report verification (which existed only to guard that refactor) is
> removed.

```
scripts/
  docs-build.js        ← md → standalone styled .html (marked + own prose CSS)
  docs-preview.js      ← browser-sync live server (renders md via the same pipeline)
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
- **Depends on:** `marked` only.
- **Behavior:** Wraps `marked`-rendered HTML body in a full HTML document with an
  inlined prose `<style>` (standalone files, no external CSS — portable/shareable).
  The stylesheet targets what prose documents actually contain — headings,
  paragraphs, lists, blockquotes, fenced code, and prose tables — and reuses the
  existing report palette (`#2c2825` header, `#faf7f2` text-on-dark, `#d4a040`
  accent) so output is visually kin to `filter-quality-report.html` without sharing
  code. `tune-filters.js` is **not** modified.

### Unit 3 — Preview

- **What it does:** Serves `docs/`, `reports/`, and `artifacts/` in the browser with
  live reload; `.md` is rendered on the fly through the **same render function
  `docs-build.js` exports** (`renderMarkdownDocument`), so preview === build output.
- **How to use it:** `npm run docs:preview` (opens browser, watches files, reloads
  on save).
- **Depends on:** `browser-sync`, and `scripts/docs-build.js` (imports its exported
  render function — `marked` comes in transitively).
- **Implementation:** `browser-sync` with a small middleware that intercepts `*.md`
  requests, renders them via the shared `renderMarkdownDocument`, and serves the
  HTML. Static `.html` files served directly.

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

Preview and build converge on one render function (`renderMarkdownDocument` in
`docs-build.js`), so what you preview is exactly what you ship. The existing filter
report keeps its own generator untouched; visual kinship comes from a shared palette,
not shared code.

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
3. `npm run docs:preview` serves and live-reloads a `.md` edit.
4. `/weekly-report` produces a digest matching the template and passing `docs:lint`.

(`tune-filters.js` is untouched, so no report byte-diff verification is needed.)

No changes to existing test suites (`test:unit`, `test:component`, `test:guardrails`)
are needed since no app/API code changes.

## Build Sequence

1. Add devDeps (`markdownlint-cli2`, `marked`, `browser-sync`); `npm install`.
2. `scripts/docs-build.js` (exports `renderMarkdownDocument`) + `docs:build` script.
3. `scripts/docs-preview.js` (imports that render fn) + `docs:preview` script.
4. `docs:lint` script; run it; clean up violations.
5. Wire markdown lint into `.githooks/pre-commit` (non-blocking guard).
6. `.claude/skills/weekly-report/SKILL.md`.
7. Update project docs (`CLAUDE.md` commands list, `docs/README.md`) to mention the
   new `docs:*` scripts and the skill.
