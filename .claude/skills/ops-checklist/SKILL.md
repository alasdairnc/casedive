---
name: ops-checklist
description: Pre-deploy production ops checklist — Sentry errors, env vars, Redis/Upstash quota, deployment sanity
---

# ops-checklist

Run this before any production deployment to confirm the environment is healthy.

## Steps

### 1. Check recent Sentry errors

Use the Sentry MCP to check for new errors in the last 24 hours:

- Query the `casedive` project for unresolved issues with `firstSeen:>-24h`
- Flag any issues with `times_seen > 10` or severity `fatal`/`error`
- If critical errors exist, stop and surface them — do not proceed until acknowledged

### 2. Verify env vars are present on Vercel

```bash
vercel env ls
```

Confirm these are present (production + preview):

- `ANTHROPIC_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `CANLII_API_KEY` (optional but flag if missing)
- `SENTRY_DSN`

If any required var is absent, stop and raise it.

### 3. Upstash quota reminder

Manually check [Upstash console](https://console.upstash.com) for:

- Daily command count approaching limit
- Any rate-limit errors in recent Redis logs

> This step cannot be automated — note it and ask the user to confirm they've checked it.

### 4. Build verification

```bash
npm run build
```

Must exit 0. If it fails, do not deploy.

### 5. Security scan

```bash
npm run security:scan
```

Must pass with no new findings beyond known false positives (see memory: AgentShield chmod false positive).

### 6. Final checklist

Before signalling ready-to-deploy:

- [ ] No critical Sentry errors in last 24h (or acknowledged)
- [ ] All required env vars present on Vercel
- [ ] Upstash quota confirmed healthy (manual)
- [ ] `npm run build` passes
- [ ] `npm run security:scan` passes
- [ ] No uncommitted secrets in working tree (`git status`)

If all items pass, output: **Ops checklist complete — safe to deploy.**
If any item fails, output the specific blocker and stop.
