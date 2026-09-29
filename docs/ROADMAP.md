# CaseDive Roadmap

Kept deliberately short. Each Claude Code session should start from this list,
not from archaeology. Delete an item when it is done; the audit log in
`.claude/skills/casedive-audit/AUDIT_LOG.md` keeps the history.

## Owner-only setup

1. **Finish the live smoke test** in section 7 of `docs/auth-setup.md`
   (sign-up with a `+test` address, wrong password, reset, expired link). The
   email-link step already passed on 2026-09-25.
2. **Remove the four `STRIPE_*` variables** from Vercel → Settings → Environment
   Variables. Nothing reads them since billing was parked.

Done on 2026-09-25: RLS verified on the three user tables, branch protection on
`main`, Dependabot's first batch merged, custom SMTP through Resend (SPF, DKIM
and DMARC passing; reset email landed in a Gmail inbox), confirm-signup, reset
and magic-link templates branded (a live sign-in link from the new modal
landed in the inbox with the branded template), `localhost:5173` added to the
redirect URLs.

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
5. **Finish the case-law fallback relevance work.** #64 gave the fallback a
   fact-pattern anchor: a case must match the user's facts or distinctive tags,
   not just the area of law. That brought R v Briscoe back for "I drove the
   getaway car…" and kept R v Stewart off a stolen chair. It also cleared all 11
   `knownFailure` cases (corpus 58/58, was 47/58). Left to do:
   - **Run the keyed CanLII gate** once `CANLII_API_KEY` is set. #64 was only
     validated offline; CI's `keyed-filter-gate` passes by skipping.
   - **Purge Upstash** for ticket, robbery/theft and counsel scenarios if #64
     should show before the 7-day TTL runs out.
   - **Add a real break-and-enter case** to the corpus (verify on CanLII).
     `residential_break_in_back_window_not_zero` still passes by showing
     R v Stewart on a home break-in, fed in as a landmark match: the same
     mistake #64 fixed in the fallback, on a different path.
   - **Run E2E on Mobile Safari.** #64's E2E ran on Chromium and Mobile Chrome
     only (no WebKit in the cloud container).

## Hygiene rules that keep this list short

- One branch per task, `/verify`, PR, CI green, squash-merge, delete branch.
- When the Sunday digest lands, spend 20 minutes on its watch list and the
  Dependabot batch. Close or merge; never let a PR pass 30 days.
- New dependency majors are pinned by policy; Dependabot is configured to skip them.
