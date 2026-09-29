# Documentation Map

## Start here

- `ROADMAP.md` — Current priorities and the owner-only setup steps still outstanding.
- `local-setup.md` — Local dev setup for macOS & Windows (one-command `npm run setup`).
- `auth-setup.md` — Supabase auth checklist: custom SMTP, redirect URLs, Google sign-in.

## Core

- `architecture.md` — System architecture and component boundaries.
- `design-system.md` — UI patterns, tokens, and design conventions.
- `adr/` — Architecture decision records: why the function cap, parked billing and the desktop layout are the way they are.

## Filtering


## Operations


## Parked


## Archive (frozen, reference only)

- `archive/superpowers/` — Agent workflow plans from April–June 2026.

## Generated

- `../artifacts/` — Generated reports and run outputs (for example `filter-quality-report.html`). Git-ignored except where noted.

## Authoring docs & reports

- **Preview:** `npm run docs:preview` — serves `docs/`, `reports/`, `artifacts/` with live reload.
- **Build:** `npm run docs:build -- <file.md>` — standalone HTML into `artifacts/html/`.
- **Lint:** `npm run docs:lint` — markdownlint over `reports/**` and the top-level `docs/*.md`, except the two parked billing docs. Also runs on staged `.md` in pre-commit. Archived and generated files are excluded on purpose.
- **Digest:** the `/weekly-report` skill produces the Sunday digest in the standard format.
