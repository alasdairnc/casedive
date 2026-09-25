# CaseDive Roadmap

Kept deliberately short. Each Claude Code session should start from this list,
not from archaeology. Move an item to `.claude/skills/casedive-audit/AUDIT_LOG.md`
or delete it when it is done.

## Owner-only setup (blocks everything below)

1. **Run `supabase/migrations/0002_user_data_rls.sql`** in the Supabase SQL editor,
   then confirm the RLS shield is on for `user_bookmarks`, `user_history` and
   `user_scenarios` in Table Editor. Until this runs, RLS on those tables is unverified.
2. **Branch protection on `main`**: require the `Quality Guardrails` and
   `Secret Scan` checks to pass, and require a pull request. GitHub → Settings →
   Branches → Add rule.
3. ~~Decide billing~~ Parked on 2026-09-25 (see below). Remove the four `STRIPE_*`
   variables from Vercel → Settings → Environment Variables so no unused key sits there.
4. **Review the Dependabot alerts tab** once after this PR merges; anything left is
   dev-tooling only.

## Product

5. **Billing is parked.** The endpoints, Stripe client, tests and one-off scripts were
   removed; `_subscription.js`, migration `0001` and the docs stay. To revive: restore
   the files from the commit before `chore(billing): park`, `npm i stripe`, build the UI,
   and clear the legal gate in `docs/monetization-plan.md` first.
6. **Case-law corpus**: review and rebase PR #19 (fabricated-citation fixes, family
   law, expanded corpus). Run `npm run test:retrieval-failures` before merging.
7. **Traffic before telemetry**: the retrieval-health machinery has 57 events all
   time. Do not add more monitoring until there are users to monitor.

## Hygiene rules that keep this list short

- One branch per task, `/verify`, draft PR, CI green, squash-merge, delete branch.
- When the Sunday digest lands, spend 20 minutes on its watch list. Close or merge;
  never let a PR pass 30 days.
- New dependency majors are pinned by policy; Dependabot is configured to skip them.
