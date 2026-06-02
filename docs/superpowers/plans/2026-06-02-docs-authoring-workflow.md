# CaseDive Docs Authoring Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give Alasdair a complete npm-local markdown/HTML authoring workflow for CaseDive docs and reports — lint, md→HTML build, live preview, and a report-generation skill — with no system dependencies and no changes to the app/API/prompt.

**Architecture:** Four independent units. `scripts/docs-build.js` exports a single `renderMarkdownDocument(markdown, {title})` function (markdown → standalone styled HTML via `marked`, with its own prose stylesheet). `scripts/docs-preview.js` imports that same function and serves files with `browser-sync` live reload, so preview output is identical to build output. `markdownlint-cli2` activates the existing `.markdownlint.json`, scoped to the reports/artifacts actively generated (legacy docs have 59 pre-existing violations and are deliberately out of scope). A `.claude/skills/weekly-report/SKILL.md` captures the established digest format. `tune-filters.js` is NOT modified.

**Tech Stack:** Node ESM scripts, `marked` (md→HTML), `markdownlint-cli2` (lint), `browser-sync` (live preview). All devDependencies.

---

## File Structure

| File                                    | Responsibility                                                           | Action |
| --------------------------------------- | ------------------------------------------------------------------------ | ------ |
| `package.json`                          | devDeps + `docs:*` scripts                                               | Modify |
| `scripts/docs-build.js`                 | Export `renderMarkdownDocument`; CLI: md files → `artifacts/html/*.html` | Create |
| `scripts/docs-preview.js`               | `browser-sync` server rendering `.md` via the build's render fn          | Create |
| `.githooks/pre-commit`                  | Add non-blocking markdown-lint of staged `.md`                           | Modify |
| `.claude/skills/weekly-report/SKILL.md` | Claude generates digests in the established format                       | Create |
| `CLAUDE.md`                             | Document new `docs:*` commands                                           | Modify |
| `docs/README.md`                        | Document the authoring workflow                                          | Modify |

**Lint scope decision (locked):** `docs:lint` targets `reports/**/*.md`,
`artifacts/**/*.md`, and `docs/superpowers/**/*.md` — the files actively authored.
It does NOT lint `README.md`, `SECURITY.md`, `docs/operations/**`, or other legacy
docs (59 pre-existing violations, out of scope). The pre-commit hook lints only
**staged** `.md` files, so legacy files never trip it unless edited.

---

## Task 1: Add dependencies and `docs:*` script placeholders

**Files:**

- Modify: `package.json:8-33` (scripts), `package.json:43-54` (devDependencies)

- [ ] **Step 1: Install the three devDependencies**

Run:

```bash
npm install --save-dev markdownlint-cli2@^0.22.1 marked@^12.0.0 browser-sync@^3.0.0
```

Expected: `package.json` gains the three under `devDependencies`; `package-lock.json` updates; no errors.

- [ ] **Step 2: Add the `docs:*` scripts**

In `package.json`, inside `"scripts"`, add these three entries after the
`"perf:monitor"` line:

```json
    "docs:build": "node scripts/docs-build.js",
    "docs:preview": "node scripts/docs-preview.js",
    "docs:lint": "markdownlint-cli2 \"reports/**/*.md\" \"artifacts/**/*.md\" \"docs/superpowers/**/*.md\"",
```

- [ ] **Step 3: Verify scripts are registered**

Run: `npm run`
Expected: output lists `docs:build`, `docs:preview`, and `docs:lint`.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add docs authoring devDeps and docs:* script placeholders"
```

---

## Task 2: `docs-build.js` — render function + fixture verification

This task builds the core: a pure `renderMarkdownDocument` function. We verify it
with a real fixture and a Node assertion (these scripts have no vitest harness; a
one-off assertion script is the right-sized test and is deleted after).

**Files:**

- Create: `scripts/docs-build.js`
- Temp fixture (created then removed in steps): `scripts/__docs_build_check.mjs`

- [ ] **Step 1: Write the failing check**

Create `scripts/__docs_build_check.mjs`:

```js
import { renderMarkdownDocument } from "./docs-build.js";

const md = "# Title\n\nA **bold** para with `code`.\n\n- one\n- two\n";
const html = renderMarkdownDocument(md, { title: "My Doc" });

const checks = [
  ["<!doctype html>", html.toLowerCase().includes("<!doctype html>")],
  ["<title>My Doc</title>", html.includes("<title>My Doc</title>")],
  ["<h1>Title</h1>", html.includes("<h1>Title</h1>")],
  ["<strong>bold</strong>", html.includes("<strong>bold</strong>")],
  ["<code>code</code>", html.includes("<code>code</code>")],
  ["<li>one</li>", html.includes("<li>one</li>")],
  ["inlined <style>", html.includes("<style>") && html.includes("#2c2825")],
];

const failed = checks.filter(([, ok]) => !ok).map(([name]) => name);
if (failed.length) {
  console.error("FAIL:", failed.join(", "));
  process.exit(1);
}
console.log("PASS: renderMarkdownDocument produces expected HTML");
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `node scripts/__docs_build_check.mjs`
Expected: FAIL — `Cannot find module ... docs-build.js` (or no `renderMarkdownDocument` export).

- [ ] **Step 3: Implement `scripts/docs-build.js`**

Create `scripts/docs-build.js`:

```js
#!/usr/bin/env node
// Convert markdown files to standalone, styled HTML documents.
// Exports renderMarkdownDocument so docs-preview.js renders identically.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { marked } from "marked";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.resolve(__dirname, "..");
const OUT_DIR = path.join(BASE_DIR, "artifacts", "html");

// Prose stylesheet. Targets what documents actually contain (headings,
// paragraphs, lists, blockquotes, fenced code, prose tables). Palette matches
// artifacts/filter-quality-report.html for visual kinship — no shared code.
const PROSE_STYLE = `
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    max-width: 820px; margin: 40px auto; padding: 0 20px; line-height: 1.7;
    color: #2c2825; background: #faf7f2; }
  h1, h2, h3, h4 { line-height: 1.25; margin-top: 1.6em; }
  h1 { font-size: 28px; border-bottom: 3px solid #d4a040; padding-bottom: 8px; }
  h2 { font-size: 22px; border-bottom: 1px solid #e0d8cc; padding-bottom: 6px; }
  h3 { font-size: 18px; }
  a { color: #b07d1e; }
  code { background: #efe8dc; padding: 2px 5px; border-radius: 4px;
    font-size: 0.9em; }
  pre { background: #2c2825; color: #faf7f2; padding: 16px; border-radius: 8px;
    overflow-x: auto; }
  pre code { background: none; color: inherit; padding: 0; }
  blockquote { border-left: 4px solid #d4a040; margin: 1em 0; padding: 4px 16px;
    background: #f3ece0; color: #5a534a; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #e0d8cc; padding: 8px 12px; text-align: left; }
  th { background: #efe8dc; }
  ul, ol { padding-left: 1.4em; }
  hr { border: none; border-top: 1px solid #e0d8cc; margin: 2em 0; }
`;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderMarkdownDocument(markdown, { title = "Document" } = {}) {
  const body = marked.parse(String(markdown || ""));
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>${PROSE_STYLE}</style>
</head>
<body>
${body}
</body>
</html>
`;
}

function deriveTitle(markdown, fallback) {
  const m = String(markdown).match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

function buildFile(srcPath) {
  const markdown = fs.readFileSync(srcPath, "utf-8");
  const base = path.basename(srcPath).replace(/\.md$/i, "");
  const title = deriveTitle(markdown, base);
  const html = renderMarkdownDocument(markdown, { title });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const outPath = path.join(OUT_DIR, `${base}.html`);
  fs.writeFileSync(outPath, html, "utf-8");
  console.log(
    `✓ ${path.relative(BASE_DIR, srcPath)} → ${path.relative(BASE_DIR, outPath)}`,
  );
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error("Usage: node scripts/docs-build.js <file.md> [more.md ...]");
    process.exit(1);
  }
  for (const a of args) buildFile(path.resolve(BASE_DIR, a));
}

// Run main() only when invoked directly (not when imported by docs-preview.js).
// realpathSync comparison is robust to symlinks and spaced paths, unlike a raw
// `file://${process.argv[1]}` string compare.
const invokedPath = process.argv[1] ? fs.realpathSync(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) main();
```

- [ ] **Step 4: Run the check to confirm it passes**

Run: `node scripts/__docs_build_check.mjs`
Expected: `PASS: renderMarkdownDocument produces expected HTML`

- [ ] **Step 5: Verify the CLI path against a real report**

Run: `npm run docs:build -- reports/weekly/2026-06-01.md`
Expected: prints `✓ reports/weekly/2026-06-01.md → artifacts/html/2026-06-01.html`; file exists.

- [ ] **Step 6: Remove the temp check and generated output**

`artifacts/html/` is generated and was never tracked, so a plain `rm` is correct
(no `git checkout` — there is nothing to restore):

```bash
rm scripts/__docs_build_check.mjs
rm -rf artifacts/html
```

- [ ] **Step 7: Ignore generated build output (before any commit)**

Append to `.gitignore` so generated HTML is never staged:

```
artifacts/html/
```

- [ ] **Step 8: Confirm nothing generated is staged, then commit**

Run:

```bash
git add scripts/docs-build.js .gitignore
git status --porcelain artifacts/html   # expect: no output (ignored)
git commit -m "feat: docs-build.js — markdown to standalone styled HTML"
```

Expected: `git status --porcelain artifacts/html` prints nothing; commit includes
only `scripts/docs-build.js` and `.gitignore`.

---

## Task 3: `docs-preview.js` — live-reload server

**Files:**

- Create: `scripts/docs-preview.js`

- [ ] **Step 1: Implement the preview server**

Create `scripts/docs-preview.js`:

```js
#!/usr/bin/env node
// Live-reload preview for docs/reports/artifacts. Renders .md through the SAME
// function docs-build.js uses, so preview === build output.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import browserSync from "browser-sync";
import { renderMarkdownDocument } from "./docs-build.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.resolve(__dirname, "..");
const WATCH = ["docs/**/*.md", "reports/**/*.md", "artifacts/**/*.md", "*.md"];

function deriveTitle(markdown, fallback) {
  const m = String(markdown).match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

const bs = browserSync.create();
bs.init({
  server: {
    baseDir: BASE_DIR,
    // Intercept *.md requests and render them to HTML on the fly.
    middleware: [
      (req, res, next) => {
        const urlPath = decodeURIComponent((req.url || "").split("?")[0]);
        if (!urlPath.toLowerCase().endsWith(".md")) return next();
        const filePath = path.join(BASE_DIR, urlPath);
        if (!filePath.startsWith(BASE_DIR) || !fs.existsSync(filePath))
          return next();
        const md = fs.readFileSync(filePath, "utf-8");
        const html = renderMarkdownDocument(md, {
          title: deriveTitle(md, path.basename(filePath)),
        });
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html);
      },
    ],
  },
  files: WATCH,
  notify: false,
  open: true,
  ui: false,
});
```

- [ ] **Step 2: Smoke-test the server boots and serves a rendered .md**

Run (starts server, fetches one file, then stops):

```bash
npm run docs:preview &
SERVER_PID=$!
sleep 4
curl -s "http://localhost:3000/reports/weekly/2026-06-01.md" | grep -q "<h1>CaseDive Weekly Digest" && echo "PREVIEW OK" || echo "PREVIEW FAIL"
kill $SERVER_PID 2>/dev/null
```

Expected: `PREVIEW OK` (browser-sync default port is 3000; if taken it auto-bumps — adjust the curl port to the one printed if needed).

- [ ] **Step 3: Commit**

```bash
git add scripts/docs-preview.js
git commit -m "feat: docs-preview.js — browser-sync live preview for markdown"
```

---

## Task 4: Lint — verify clean over scope

The `docs:lint` script already exists from Task 1. This task confirms it passes
over the intended scope (it must, since these files were clean in the dry run).

**Files:** none (verification only)

- [ ] **Step 1: Run the lint over scope**

Run: `npm run docs:lint`
Expected: `Summary: 0 error(s)` (scope = `reports/**`, `artifacts/**/*.md`,
`docs/superpowers/**`). If the new spec/plan markdown surfaces a violation, fix it
in that file inline, then re-run until clean.

- [ ] **Step 2: Confirm legacy docs are NOT in scope**

Run: `npm run docs:lint -- --help >/dev/null 2>&1; echo "scope is reports/artifacts/superpowers only — README/SECURITY/operations excluded by design"`
Expected: prints the reminder. (No assertion needed — scope is fixed in the script.)

No commit (no file change). If a fix was needed in Step 1, commit it:

```bash
git add docs/superpowers
git commit -m "docs: fix markdownlint violations in spec/plan"
```

---

## Task 5: Wire markdown lint into pre-commit (non-blocking guard)

**Files:**

- Modify: `.githooks/pre-commit`

- [ ] **Step 1: Append the staged-markdown lint step**

Add to the end of `.githooks/pre-commit` (after the gitleaks line):

```bash

# Lint staged markdown in actively-authored dirs (non-blocking if tool absent).
STAGED_MD=$(git diff --cached --name-only --diff-filter=ACM \
  | grep -E '^(reports|artifacts|docs/superpowers)/.*\.md$' || true)
if [ -n "$STAGED_MD" ]; then
  if command -v npx >/dev/null 2>&1 && [ -d node_modules/markdownlint-cli2 ]; then
    echo "pre-commit: linting staged markdown..."
    echo "$STAGED_MD" | xargs npx --no-install markdownlint-cli2
  else
    echo "pre-commit: markdownlint-cli2 not installed; skipping markdown lint." >&2
  fi
fi
```

- [ ] **Step 2: Verify the hook skips gracefully when nothing markdown is staged**

Run:

```bash
git add .githooks/pre-commit
git commit -m "chore: lint staged markdown in pre-commit (non-blocking)"
```

Expected: gitleaks runs; markdown step prints nothing (no staged `.md` in scope, since the hook file itself isn't `.md`); commit succeeds.

- [ ] **Step 3: Verify the hook catches a bad staged report**

Run:

```bash
printf '#Bad Heading\n\nNo space after hash.\n' > reports/weekly/__lint_probe.md
git add reports/weekly/__lint_probe.md
git commit -m "test: should be blocked by markdown lint" || echo "BLOCKED AS EXPECTED"
git reset HEAD reports/weekly/__lint_probe.md
rm reports/weekly/__lint_probe.md
```

Expected: commit is blocked (MD018/no-missing-space-atx), prints `BLOCKED AS EXPECTED`, probe removed.

---

## Task 6: `/weekly-report` generation skill

**Files:**

- Create: `.claude/skills/weekly-report/SKILL.md`

- [ ] **Step 1: Write the skill**

Create `.claude/skills/weekly-report/SKILL.md`:

````markdown
---
name: weekly-report
description: Generate a CaseDive weekly health digest in the established format, lint-clean, written to reports/weekly/<date>.md. Use when Alasdair asks for the weekly digest or a project health report.
---

# Weekly Report

Produce a CaseDive weekly digest matching the existing `reports/weekly/*.md` format
exactly, then lint it.

## Gather data first

- **Activity:** `git log --since="7 days ago" --oneline` and a count of commits/files.
- **Open PRs:** `gh pr list --state open --json number,title,createdAt,author` (note
  age in days and author; flag Dependabot/bot PRs).
- **Merged this week:** `gh pr list --state merged --search "merged:>=<date-7d>"`.
- **Hottest files:** `git log --since="7 days ago" --name-only --pretty=format:` then
  tally the most-touched paths.
- **Retrieval health:** read current thresholds from `api/_filterConfig.js`
  (e.g. `final_case_min_token_overlap`, `ai_citation_min_token_overlap`) — report
  values and whether they changed this week.
- **Dependency drift:** compare `package.json` versions against latest; recommend
  minor bumps, flag majors as skip (per version-pinning rule).

## Required structure (match exactly)

```text
# CaseDive Weekly Digest — YYYY-MM-DD

## Activity (last 7 days)
## Open PRs
## Merged this week
## Hottest files
## Retrieval health (from config)
## Dependency drift
## Watch list
```
````

`## Watch list` is a numbered list of the 1–3 most important follow-ups, each with a
**bold lead** and a one-line rationale.

## Output and verify

- Write to `reports/weekly/<today>.md` (ISO date).
- Run `npm run docs:lint` and fix any violations before declaring done.
- Do NOT commit unless asked.

````

- [ ] **Step 2: Verify the skill is discoverable**

Run: `ls .claude/skills/weekly-report/SKILL.md`
Expected: file exists. (It will appear in the skills list on next session load.)

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/weekly-report/SKILL.md
git commit -m "feat: /weekly-report skill — generate digests in established format"
````

---

## Task 7: Document the workflow

**Files:**

- Modify: `CLAUDE.md` (the project root `CLAUDE.md` Commands section)
- Modify: `docs/README.md`

- [ ] **Step 1: Add docs commands to `CLAUDE.md`**

In `/Users/alasdairnc/Desktop/Dev/casedive/CLAUDE.md`, under the `## Commands`
section, add a new line after the Security commands block:

```markdown
**Docs authoring:** `npm run docs:preview` (live-reload preview of docs/reports), `npm run docs:build -- <file.md>` (md → `artifacts/html/`), `npm run docs:lint` (markdownlint over reports/artifacts/superpowers). Generate digests with the `/weekly-report` skill.
```

- [ ] **Step 2: Add a section to `docs/README.md`**

Append to `docs/README.md`:

```markdown
## Authoring docs & reports

- **Preview:** `npm run docs:preview` — serves `docs/`, `reports/`, `artifacts/`
  with live reload; `.md` renders to styled HTML on the fly.
- **Build:** `npm run docs:build -- <file.md>` — writes standalone HTML to
  `artifacts/html/` (git-ignored).
- **Lint:** `npm run docs:lint` — runs markdownlint over `reports/**`,
  `artifacts/**/*.md`, `docs/superpowers/**`. Also runs on staged `.md` in
  pre-commit. Legacy docs (`README`, `SECURITY`, `docs/operations/**`) are out of
  scope by design.
- **Generate:** the `/weekly-report` skill produces a digest in the standard format.
```

- [ ] **Step 3: Lint the docs we just edited**

Run: `npm run docs:lint`
Expected: `0 error(s)` (note: `docs/README.md` is NOT in lint scope, so this checks
only the superpowers/reports/artifacts dirs — the `CLAUDE.md`/`docs/README.md` edits
are prose and won't be linted, which is fine).

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md docs/README.md
git commit -m "docs: document docs:* authoring workflow and /weekly-report skill"
```

---

## Final Verification

- [ ] `npm run docs:build -- reports/weekly/2026-06-01.md` → produces `artifacts/html/2026-06-01.html`.
- [ ] `npm run docs:preview` → browser opens, editing a watched `.md` live-reloads.
- [ ] `npm run docs:lint` → `0 error(s)`.
- [ ] Pre-commit blocks a malformed staged report and passes a clean one.
- [ ] `/weekly-report` available in the skills list next session.
- [ ] `git status` clean; `tune-filters.js` never modified by this work (`git log --oneline -- scripts/tune-filters.js | head -1` shows a pre-existing commit, not one from this plan).

## Notes for the implementer

- These are standalone Node ESM scripts — there is **no vitest harness** for them,
  and adding one would be over-engineering. Verification is real-command +
  fixture-assertion, as written. Do not scaffold a test framework.
- `tune-filters.js` is deliberately untouched — do NOT extract its CSS (see the
  de-scope note in the spec). Visual kinship comes from the shared palette only.
- `browser-sync` default port is 3000 and auto-increments if taken; if a smoke-test
  curl fails, check the port browser-sync printed.
- The `marked@^12` API used is `marked.parse(md)` (synchronous) — correct for v12.
