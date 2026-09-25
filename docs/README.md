# Documentation Map

## Start here

- `ROADMAP.md` — Current priorities and the owner-only setup steps still outstanding.
- `local-setup.md` — Local dev setup for macOS & Windows (one-command `npm run setup`).
- `auth-setup.md` — Supabase auth checklist: custom SMTP, redirect URLs, Google sign-in.

## Core

- `architecture.md` — System architecture and component boundaries.
- `design-system.md` — UI patterns, tokens, and design conventions.
- `security.md` — Security posture and safeguards.

## Filtering

- `filtering/FILTER_TUNING.md` — Full filter tuning architecture and workflow.
- `filtering/FILTER_TUNING_QUICKSTART.md` — Fast path for running and improving filter quality.

## Operations

- `operations/PERFORMANCE_PLAN.md` — Performance optimization and monitoring plan.
- Audit history lives in `.claude/skills/casedive-audit/AUDIT_LOG.md` (append-only, written by the `casedive-audit` skill).

## Parked

- `monetization-plan.md`, `billing-setup-walkthrough.md` — Billing plan and setup steps. Code parked 2026-09-25; see the status note at the top of each.

## Archive (frozen, reference only)

- `archive/operations/` — April 2026 mode snapshots, runbook and canary checklist.
- `archive/superpowers/` — Agent workflow plans from April–June 2026.
- `skills/` — Domain notes from the original build (CanLII API patterns, Criminal Code data entry, prompt engineering, prompt-injection testing). Not auto-loaded skills; those live in `.claude/skills/`.

## Generated

- `../artifacts/` — Generated reports and run outputs (for example `filter-quality-report.html`). Git-ignored except where noted.

## Authoring docs & reports

- **Preview:** `npm run docs:preview` — serves `docs/`, `reports/`, `artifacts/` with live reload.
- **Build:** `npm run docs:build -- <file.md>` — standalone HTML into `artifacts/html/`.
- **Lint:** `npm run docs:lint` — markdownlint over `reports/**` and the top-level `docs/*.md`, except the two parked billing docs. Also runs on staged `.md` in pre-commit. Archived and generated files are excluded on purpose.
- **Digest:** the `/weekly-report` skill produces the Sunday digest in the standard format.
