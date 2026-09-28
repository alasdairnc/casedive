# Breach response

What to do if personal information held by or for CaseDive may have been
exposed. Under PIPEDA a breach is any loss of, unauthorized access to, or
disclosure of personal information because safeguards failed or were missing.
This is a working checklist, not legal advice.

## Where personal information lives

| System           | What it holds                                                                   |
| ---------------- | ------------------------------------------------------------------------------- |
| Supabase         | Account emails, sign-in data, synced bookmarks and search history (full query text) |
| Upstash Redis    | Case-law reports (280-character scenario snippet, 90 days), response caches keyed by a hash (7 days), rate-limit counters keyed by IP or user id (1 hour) |
| Anthropic        | Scenario text sent for analysis                                                 |
| Resend           | Email addresses that receive sign-in and reset emails                           |
| Vercel logs      | IP addresses and user agents (about one hour on the Hobby plan)                |
| Sentry           | Error reports, with scenario, summary and token fields redacted                |

Scenario text often describes criminal conduct, so treat any exposure of it as
sensitive.

## Steps

1. **Contain.** Rotate whichever key is involved in the Vercel environment
   variables and in the provider's dashboard: `SUPABASE_SERVICE_KEY`,
   `ANTHROPIC_API_KEY`, the Upstash token or the Resend key. If sign-in data
   may be exposed, end all user sessions in Supabase; check Supabase's docs
   for the current method. Take the affected endpoint down if it's the
   source.
2. **Assess.** Decide whether the breach creates a real risk of significant
   harm. Weigh how sensitive the information is and how likely it is to be
   misused. Exposed scenario text or history tied to an email address will
   almost always meet the bar.
3. **Report.** If there's a real risk of significant harm, report it to the
   Office of the Privacy Commissioner of Canada and tell the affected people
   directly, both as soon as feasible. Also tell any other organization that
   could reduce the harm, for example a provider whose key leaked. If Quebec
   residents are affected, Quebec's Law 25 has its own reporting duty, so get
   advice.
4. **Record.** Log every breach, including ones that don't need reporting, and
   keep the record for at least 24 months. Use the template below.
5. **Fix.** Close the gap, add a regression test, and note it in the audit
   log (`.claude/skills/casedive-audit/AUDIT_LOG.md`).

## Record template

```text
Date found:
Date it started (if known):
What happened:
Information involved (systems, fields, number of people):
Real risk of significant harm? (yes/no, and why):
Reported to OPC (date, reference):
People notified (date, how):
Other organizations notified:
Fix and follow-up:
```
