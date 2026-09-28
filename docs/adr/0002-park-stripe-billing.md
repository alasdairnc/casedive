# ADR-0002: Park Stripe billing

**Status:** Accepted
**Date:** 2026-09-25 (backfilled 2026-09-27)
**Deciders:** Alasdair (owner)

## Context

Freemium subscriptions were built in test mode in June 2026 (PR #22,
`5e43d6c`). The build included plan-aware rate limiting, a checkout and
portal endpoint, and a Stripe webhook. By the 2026-09-25 return-from-hiatus
audit:

- No UI called `/api/billing`.
- Production traffic was close to zero. The one-hour log window held two
  requests, both from GitHub Actions.
- The legal launch gate in `docs/monetization-plan.md` section 6 was unmet.
  It requires Terms and a Privacy Policy covering accounts and payment data,
  a "legal information, not legal advice" disclaimer at sign-up and on
  results, verification working end to end, a refund policy, and
  confirmation that CanLII's licence allows a paid product.
- The webhook as built could never verify a real Stripe event, because
  Vercel parses the body before a `(req, res)` handler runs. The same audit
  rewrote it.

The audit left one owner item open: run a Stripe round trip on a preview
deploy, then finish or park billing.

## Decision

Park it (`0ab934a`, PR #33). Remove `api/billing.js`,
`api/stripe-webhook.js`, `api/_stripe.js`, their tests, three one-off
scripts, the two `vercel.json` entries and the `stripe` package.

Keep `api/_subscription.js`, because plan-aware rate limiting still reads the
`subscriptions` table. Keep migration `0001`. Keep the monetization docs,
marked parked, with revival steps.

## Options considered

| Option          | What it needed, per the record                                                                              |
| --------------- | ----------------------------------------------------------------------------------------------------------- |
| Finish billing  | Preview-deploy round trip, Phase 4 frontend (`usePlan`, upgrade modal, pricing), then the legal gate before live keys |
| Park (chosen)   | Delete the dead code and keep the pieces rate limiting depends on                                            |

## Trade-off analysis

The commit gives three reasons: nothing called the endpoints, there was no
traffic to sell to, and the legal gate blocked live payments anyway. Parking
also freed two of the twelve function slots
([ADR-0001](0001-stay-within-hobby-function-cap.md)) and dropped a
dependency.

## Consequences

- `api/` went from 12 functions to 10.
- There is no longer any way to subscribe.
- Four `STRIPE_*` variables are still set in Vercel with nothing reading
  them (ROADMAP, owner-only item 2).
- Reviving billing means restoring the files from the commit before
  `chore(billing): park`, running `npm i stripe`, building the UI, and
  clearing the legal gate first (ROADMAP, Product item 3). The webhook must
  stay a Web-standard `POST(request)` handler.

## Action items

1. [ ] Owner: remove the four `STRIPE_*` variables from Vercel.
2. [ ] Before any revival: meet the legal gate in
   `docs/monetization-plan.md` section 6.
