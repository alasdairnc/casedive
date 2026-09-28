# Architecture decision records

One file per decision that shaped the code and would be expensive to
rediscover. Every record cites where its reasoning came from (a commit, an
audit log entry, a doc). Records written after the fact are marked
"backfilled" and add no reasoning their sources don't contain.

| #                                             | Decision                                      | Status   | Date       |
| --------------------------------------------- | --------------------------------------------- | -------- | ---------- |
| [0001](0001-stay-within-hobby-function-cap.md) | Stay within the Vercel Hobby 12-function cap | Accepted | 2026-06-19 |
| [0002](0002-park-stripe-billing.md)            | Park Stripe billing                           | Accepted | 2026-09-25 |
| [0003](0003-desktop-two-column-results.md)     | Two-column desktop results layout             | Accepted | 2026-09-25 |

To add one: take the next number, copy the headings from an existing record,
and add a row here. Don't rewrite an accepted record; write a new one that
supersedes it and change the old one's status.
