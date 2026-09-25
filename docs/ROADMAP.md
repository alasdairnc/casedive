# CaseDive Roadmap

Kept deliberately short. Each Claude Code session should start from this list,
not from archaeology. Delete an item when it is done; the audit log in
`.claude/skills/casedive-audit/AUDIT_LOG.md` keeps the history.

## Owner-only setup

1. **Brand the Magic Link email template** in Supabase (table in section 3 of
   `docs/auth-setup.md`). "Email me a sign-in link" is on by default, so
   returning users get that email; it is still Supabase's plain default.
2. **After the sign-in polish deploys, run the five-minute live smoke test** in
   section 7 of `docs/auth-setup.md`.
3. **Remove the four `STRIPE_*` variables** from Vercel → Settings → Environment
   Variables. Nothing reads them since billing was parked.

Done on 2026-09-25: RLS verified on the three user tables, branch protection on
`main`, Dependabot's first batch merged, custom SMTP through Resend (SPF, DKIM
and DMARC passing; reset email landed in a Gmail inbox), confirm-signup and
reset templates branded, `localhost:5173` added to the redirect URLs.

## Product

1. **Traffic before telemetry.** The retrieval-health store has 57 events all time.
   The daily autofix workflow is manual-only for that reason. Do not add monitoring
   until there are users to monitor; do get users.
2. **Legal layer before money.** Terms and a "legal information, not legal advice"
   page are the gate in `docs/monetization-plan.md`. Write them before reviving
   billing.
3. **Billing is parked.** Endpoints, Stripe client, tests and one-off scripts were
   removed; `_subscription.js`, migration `0001` and the docs stay. To revive:
   restore the files from the commit before `chore(billing): park`, `npm i stripe`,
   build the UI, clear the legal gate first.
4. **Google sign-in, optional.** The code is in; it stays hidden until the
   OAuth client is set up and `VITE_AUTH_GOOGLE=true` (section 5 of
   `docs/auth-setup.md`). Worth doing once people are signing up.

## Hygiene rules that keep this list short

- One branch per task, `/verify`, PR, CI green, squash-merge, delete branch.
- When the Sunday digest lands, spend 20 minutes on its watch list and the
  Dependabot batch. Close or merge; never let a PR pass 30 days.
- New dependency majors are pinned by policy; Dependabot is configured to skip them.
