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

`## Watch list` is a numbered list of the 1–3 most important follow-ups, each with a
**bold lead** and a one-line rationale.

## Output and verify

- Write to `reports/weekly/<today>.md` (ISO date).
- Run `npm run docs:lint` and fix any violations before declaring done.
- Do NOT commit unless asked.
