# CaseDive

AI-powered Canadian legal research tool. Describe a scenario in plain language and
get the relevant Criminal Code sections, Charter rights, civil statutes and
CanLII-verified case law, grouped and cited. Live at [casedive.ca](https://casedive.ca).

Educational tool only, not legal advice.

## Stack

- React 18 + Vite frontend, styled through `ThemeContext` (no CSS framework)
- Vercel serverless functions in `api/` (Anthropic API, CanLII API, Upstash Redis)
- Optional accounts via Supabase (client-side auth, server-side cloud sync)
- Playwright E2E, Vitest unit and component tests

## Getting started

```bash
npm install
cp .env.example .env        # add ANTHROPIC_API_KEY (CANLII_API_KEY optional)
npm run security:hooks      # wire the gitleaks pre-commit + security pre-push hooks
npm run dev:api             # full stack via `vercel dev` (npm run dev = frontend only)
```

## Common commands

| Command | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm run test:unit` | Unit tests (`.test.js`) |
| `npm run test:component` | Component tests (`.test.jsx`) |
| `npm test` | Playwright E2E (start `npm run dev:api` first) |
| `npm run test:guardrails` | Pre-PR gate: sanitizer, retrieval corpus, filter report |
| `npm run security:scan` | gitleaks scan, run before pushing |

## Documentation

- `CLAUDE.md`: project rules and gotchas for AI-assisted work
- `docs/README.md`: documentation index (architecture, security, filtering, operations)
- `docs/ROADMAP.md`: what is next, and the owner-only setup steps still outstanding
- `docs/skills/`: archived domain notes from the original build (CanLII API, Criminal Code data, prompts)
- `SECURITY.md`: how to report a vulnerability
