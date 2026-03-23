# CaseFinder — Claude Code Context

## Project
AI-powered Canadian criminal law research tool. Users describe a scenario, get charges, Criminal Code sections, case law, sentencing, and legal analysis. Live at casedive.ca. Portfolio project by Alasdair NC (Justice Studies, University of Guelph-Humber).

## Repo
`alasdairnc/casefinder` — auto-deploys to Vercel on push to main.

## Stack
- React 18 + Vite (frontend)
- Node.js serverless functions in `/api/` (backend)
- Anthropic Claude API — `claude-sonnet-4-20250514`
- CanLII API for citation verification
- Upstash Redis for persistent rate limiting
- Vercel (deployment) + Namecheap (casedive.ca)

## File Structure
```
casefinder/
├── api/
│   ├── analyze.js              # Claude API call (serverless)
│   └── verify-citations.js     # CanLII verification endpoint (serverless)
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── FiltersPanel.jsx
│   │   ├── SearchArea.jsx
│   │   ├── StagedLoading.jsx
│   │   ├── Results.jsx
│   │   ├── ChargeCard.jsx
│   │   ├── CaseCard.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── Select.jsx
│   ├── lib/
│   │   ├── themes.js
│   │   ├── constants.js
│   │   ├── prompts.js
│   │   └── canlii.js           # Citation parser, URL builder, lookupCase()
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── SKILLS/                     # Skill files for Claude Code
├── MIGRATION_GUIDE.md
└── CLAUDE.md                   # This file
```

## Architecture Rules — Never Break These

1. **All API keys stay server-side.** Anthropic and CanLII keys only in `/api/` functions. Never in `src/`.
2. **No CSS frameworks.** Styling is inline styles via ThemeContext. Intentional.
3. **Verification pipeline.** Claude suggests citations → `/api/verify-citations.js` checks against CanLII → only verified cases show with badge.
4. **Rate limiting on every endpoint.** Use existing Upstash Redis middleware.
5. **Input validation both sides.** Client-side before submit, server-side in the function.
6. **Real Criminal Code sections only.** No made-up section numbers.
7. **Never commit `.env` or `.env.local`.**

## Design Tokens

### Light Theme (`#FAF7F2` base)
- Background: `#FAF7F2`
- Text: `#2c2825`
- Accent: `#d4a040`
- Red: `#8a3020`
- Green: `#3a6a4a`
- Border: `#d8d0c4`

### Dark Theme (`#1a1814` base)
- Background: `#1a1814`
- Text: `#e8e0d0`
- Accent: `#d4a040`
- Red: `#d4654a`
- Green: `#6aaa7a`
- Border: `#3a3530`

### Typography
- Headlines/citations: `Times New Roman` (serif)
- UI/body: `Helvetica Neue` (sans-serif)
- Code/sections: `Courier New` (monospace)
- Labels: Helvetica Neue, 10px, uppercase, letter-spacing 3.5px

## Key Libraries & Utilities

### `src/lib/canlii.js`
- `parseCitation(citation)` — parses "R v Smith, 2020 ONCA 123" → `{ parties, year, courtCode, number, dbId }`
- `lookupCase(citation, apiKey)` — verifies against CanLII API, returns `{ status, url, searchUrl, title }`
- Status values: `verified | not_found | unverified | unparseable | unknown_court | error`
- COURT_DB_MAP covers ~35 Canadian courts (SCC, ONCA, ONSC, BCCA, ABCA, etc.)

### `src/lib/prompts.js`
- `buildSystemPrompt(filters)` — builds Claude system prompt with jurisdiction/court/date filters
- Returns JSON: `{ summary, charges[], cases[], analysis, searchTerms[] }`

### `src/lib/constants.js`
- `jurisdictions`, `courtLevels`, `dateRanges`, `exampleScenarios`

## Environment Variables
```
ANTHROPIC_API_KEY=       # server-side only, /api/analyze.js
CANLII_API_KEY=          # server-side only, /api/verify-citations.js
UPSTASH_REDIS_REST_URL=  # rate limiting
UPSTASH_REDIS_REST_TOKEN=
```
Local: `.env.local` (gitignored). Production: set in Vercel dashboard.

## Active Work / Roadmap
- [ ] Wire `/api/verify-citations.js` into Results component (citations verified live after analysis)
- [ ] PDF export from Results
- [ ] Case bookmarking (localStorage)
- [ ] Citation export in legal formats
- [ ] Vercel Analytics
- [ ] SEO + Open Graph meta

## Git Workflow
- Feature branches for new work, merge to main for auto-deploy
- Commit per feature/fix with clear messages
- Test locally with `npm run dev` before merging

## Communication Style
- Concise. Confirm actions in one sentence.
- No time estimates.
- Ask one clarifying question max if ambiguous.
- No over-explaining.
