# ADR-0001: Stay within the Vercel Hobby 12-function cap

**Status:** Accepted
**Date:** 2026-06-19 (backfilled 2026-09-27)
**Deciders:** Alasdair (owner)

## Context

Vercel's Hobby plan caps a project at 12 serverless functions. Each
`api/*.js` file deploys as its own function. Shared code lives in `api/_*.js`
modules, which Vercel does not deploy as functions.

PR #22 added Stripe billing as three new endpoint files. Its production
deploy added a 13th function and hit the limit (commit `bb463b1`).

## Decision

Before adding a new file under `api/`, fold the new action into an existing
endpoint behind an action or method switch. Keep a separate function only
when the platform forces it.

Applied so far:

- `api/billing.js` served checkout and portal through
  `POST { action: "checkout" | "portal" }`, replacing two files (`bb463b1`).
- The Stripe webhook stayed its own function because it needed the raw
  request body (`bb463b1`).
- `handleOptionsAndMethod` in `api/_apiCommon.js` accepts a list of methods,
  so one file can serve several verbs (`3820c19`).

## Options considered

| Option                             | Outcome in the record                         |
| ---------------------------------- | --------------------------------------------- |
| One file per action (before #23)   | Production deploy failed at 13 functions      |
| Combine actions into one function  | Chosen; back to 12 (`bb463b1`)                |

No commit, audit entry or doc discusses moving to a paid plan.

## Consequences

- The project runs at 10 of 12 since billing was parked
  ([ADR-0002](0002-park-stripe-billing.md)).
- Reviving billing as it was built (billing plus webhook) uses both remaining
  slots.
- A combined endpoint carries per-action validation, rate limiting and
  logging inside one handler.
- An endpoint that needs raw request bytes must be a Web-standard
  `export async function POST(request)` handler (see CLAUDE.md), so it can't
  share a `(req, res)` handler with other actions.
- Each function needs an entry in `vercel.json` `functions` for its memory
  and duration limits. The 2026-09-25 audit found two missing.

## Action items

1. [ ] Check the count in this record and in CLAUDE.md whenever a file is
   added to or removed from `api/`.
