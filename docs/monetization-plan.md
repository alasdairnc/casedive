# CaseDive Monetization Plan

_Status: draft — approved direction, build in progress. Last updated 2026-06-19._

## Decisions locked (with the user)

| Decision | Choice |
| --- | --- |
| Primary buyer | **B2C — self-represented litigants + students** |
| Model | **Freemium subscription** (free tier → paid "Plus") |
| Processor | **Stripe** (Checkout + Customer Portal), Canada-only at launch |
| Scope | Write plan, then build Phase-1 foundation |

## TL;DR

Sell **trust, not volume.** Inference is on `claude-haiku-4-5` and costs roughly **$0.01–0.02 per search**, so gating raw search count starves the funnel for no real cost saving. The paid hook is **citation verification against CanLII** (we already have `api/verify.js`) plus pro workflow features. Verification is simultaneously the premium feature and the liability shield for the highest-consumer-harm audience we're selling to.

Launch is **Canada-only, under the GST/HST small-supplier threshold**, so we charge no sales tax at v1. Plain Stripe is correct; no Merchant-of-Record needed yet.

Real money is **gated on a legal layer** (Terms, "legal information, not legal advice" disclaimer, verification live). Plumbing can be built and tested now in Stripe test mode.

---

## 1. Positioning & the liability reframe

Self-represented litigants are the **lowest professional/UPL liability** but the **highest consumer-harm** audience: they cannot tell a real citation from a hallucinated one, and they file what they find in real court. Canadian courts have already sanctioned a party for submitting fabricated AI-generated case citations (BC Supreme Court, 2024 — _verify exact citation (likely Zhang v Chen, 2024 BCSC 285) against CanLII before publishing this doc_). Our own corpus history (24 fabricated pre-2000 SCC cites, fixed 2026-06-16) means accuracy is the trust battleground.

**Consequence for packaging:** the paid tier is built around **"every citation checked against CanLII, with a link to the real decision."** That:

- gives a concrete, demonstrable reason to pay (not just "more searches"),
- doubles as the liability shield (we surface verification state instead of asserting correctness),
- keeps the free funnel wide, which matches the near-zero marginal inference cost.

Brand promise: **CaseDive helps you find real, verifiable Canadian law — and proves it.**

---

## 2. Pricing & packaging

Two tiers, plus a student discount on the paid tier. Prices in **CAD**.

| Capability | Free (anon) | Free (account) | **Plus — $9/mo** ($90/yr) |
| --- | --- | --- | --- |
| Searches | 5 / hour (current IP limit) | ~25 / day | Fair-use (soft 500/mo) |
| Results per query | Standard | Standard | Standard + extended |
| **CanLII citation verification** | — | Existence check only | **Full: every cite verified + link-out** |
| Cloud sync (bookmarks/history/scenarios) | — | ✅ | ✅ |
| PDF memo export | — | 3 / month | Unlimited |
| Search history retention | Session | 100 items | Full |
| Priority during high load | — | — | ✅ |

- **Student plan:** Plus at **$5/mo**, gated on `.edu`/`.ca` student email or simple manual verification. (You are the first user — dogfood this.)
- **Annual:** ~2 months free ($90/yr) to pull cash forward and cut churn.
- **No free trial of Plus at launch** — the generous free account tier *is* the trial. Revisit once conversion data exists.

Anchoring: consumer SaaS sits at ~$9.99; budget-constrained self-reps and students need it lower than pro legal tools (which are $50–200+/mo). $9 / $5 student is deliberately accessible.

---

## 3. Unit economics

Per-search cost on `claude-haiku-4-5` (~$1/M input, ~$5/M output), ~5K input + 1.8K output tokens: **≈ $0.014/search**. CanLII verification calls are cached 7 days (`_canliiCache.js`) and the CanLII API itself is free-tier. So:

- A Plus user doing 500 searches/mo costs **≈ $7** in inference worst-case — already margin-positive at $9, and most users do far fewer.
- The **fair-use soft cap (500/mo)** + a hard cap (e.g. 2,000/mo) caps the tail-risk user. Above the hard cap → throttle, not surprise-bill (we're not metered).
- Stripe fee: 2.9% + $0.30 ≈ **$0.56 on a $9 charge**. Net ≈ $8.44/mo/Plus user.

Conclusion: margins are healthy; the only real cost lever is the abusive tail, handled by the cap, not by squeezing normal users.

---

## 4. Technical architecture

Reuses the existing Supabase + serverless patterns. Nothing about auth changes — we extend it.

### 4.1 The mechanism change that's easy to miss: rate-limit keying

`api/_rateLimit.js` currently keys on `getClientIp()`. Freemium **cannot** sit on IP:

- students share IPs (campus / library / cafe) → a paying user collides with strangers' quota;
- at limit-check time we don't know *who* the user is, so we can't grant the higher quota.

**Fix:** authenticated requests key on the **Supabase user id**; anonymous requests stay IP-keyed. That means `analyze.js`, `case-summary.js`, `export-pdf.js`, and `verify.js` must accept an **optional** `Authorization: Bearer` token and verify it the way `user-data.js` already does, then choose the quota from the user's plan. This is a real mechanism change, not a bigger number.

### 4.2 Stripe (Vercel) — the footguns

- **Webhook handler must use the RAW request body** — `stripe.webhooks.constructEvent` needs the unparsed buffer for signature verification. Our API uses `validateJsonRequest` (which parses); the webhook endpoint must **disable body parsing** (`export const config = { api: { bodyParser: false } }`) and read the raw stream. This is the #1 thing that silently breaks Stripe webhooks.
- **Gating is enforced server-side, always.** The client can hide the upgrade UI; the quota/feature unlock is checked in the endpoint, never trusted from the client.
- **Use Stripe Checkout (hosted) + Customer Portal** — free PCI compliance, free self-serve cancellation/upgrade. Do **not** build card forms.
- **Webhook is the source of truth** for subscription state. It maps Stripe `customer_id` ↔ Supabase `user.id` and writes plan status to Supabase.

### 4.3 New pieces

- **DB:** `subscriptions` table (see `supabase/migrations/`): `user_id`, `stripe_customer_id`, `stripe_subscription_id`, `plan` (`free`/`plus`/`student`), `status`, `current_period_end`. RLS so a user reads only their own row; the service key (webhook) writes.
- **`api/_subscription.js`** (shared module): plan/quota config + `resolveUserPlan(token)` → `{ plan, quota }`; pure, cacheable.
- **`api/create-checkout-session.js`** (new endpoint): auth required → creates a Stripe Checkout session for Plus/student, returns the URL.
- **`api/stripe-webhook.js`** (new endpoint): raw body, signature-verified, upserts `subscriptions` on `checkout.session.completed`, `customer.subscription.updated/deleted`.
- **`api/billing-portal.js`** (new endpoint, optional v1.1): returns a Customer Portal URL for managing/cancelling.
- **Frontend:** an `UpgradeModal` + a pricing section (no router — it's a component/modal in `App.jsx`, matching `AuthModal.jsx`). A `usePlan()` hook reads the user's plan for UI gating.

New endpoints follow the `new-api-endpoint` conventions (rate limit, input validation, security headers) and pass `api-invariant-reviewer` + an `advisor()` gate before business logic, per CLAUDE.md.

---

## 5. Canadian tax posture

Canada's **GST/HST small-supplier threshold is ~$30,000 CAD** of taxable revenue over four rolling quarters (_verify current figure with CRA before launch_). Below it, we are **not required to register for or charge GST/HST.** At launch we will be far below it, so **v1 charges no sales tax** and Stripe's plain integration is sufficient.

Defer, with a trigger: revisit registration as we approach the threshold. If we later expand beyond Canada (US/EU digital-goods tax becomes a real burden), the clean exit is a **Merchant-of-Record** (Paddle / Lemon Squeezy) that handles global tax remittance — but adopting one now would add cost and complexity for a problem we don't have.

---

## 6. Legal & compliance — the launch gate

**Do not flip to live payments until all of these exist.** Building/test-mode plumbing is fine before; taking real money from self-reps without these is not.

- [ ] **Terms of Service** + **Privacy Policy** (we store accounts, history, payment-linked data).
- [ ] **Prominent disclaimer**: "CaseDive provides legal *information*, not legal *advice*. Verify all citations before relying on them." Shown at signup and on results.
- [ ] **Verification feature live** (the paid promise must actually work end-to-end before it's sold).
- [ ] **Refund policy** (Stripe makes refunds trivial; state a clear policy, e.g. 7-day no-questions).
- [ ] **CanLII commercial-use license — OPEN BLOCKER.** CanLII's API terms restrict commercial redistribution of their content. Our paid value leans on CanLII verification. **Confirm the license permits a paid commercial product** before building the verification-as-premium path. Mitigation if restricted: verification surfaces only an *existence check + link-out* to CanLII (no content redistribution), which is a far lighter posture — but this must be confirmed, not assumed. _This can block the business model; resolve early._

---

## 7. Phased rollout

- **Phase 0 — Legal (blocks launch, not build):** ToS, Privacy, disclaimer copy, CanLII license confirmation.
- **Phase 1 — Foundation ✅ DONE:** `subscriptions` migration + `api/_subscription.js` plan/quota module. Additive, breaks nothing, testable without Stripe.
- **Phase 2 — Rate-limit + gating ✅ DONE:** user-id keying via `checkRequestRateLimit` (auth requests key on `user:<id>`, anon stay IP-keyed); `_rateLimit.js` gained an optional per-call `limit`; `analyze`/`case-summary`/`export-pdf`/`verify` now plan-aware. Free hourly limit pinned to 5 (= legacy anon), paid = 100. 11 regression tests; full suite 278/278.
- **Phase 3 — Stripe ✅ BUILT (test-mode, awaiting owner setup):** `stripe@^22` added; `api/_stripe.js`, `api/create-checkout-session.js`, `api/billing-portal.js`, `api/stripe-webhook.js` (raw body + signature verify + complete-row upserts). Degrades to 503 until env vars exist. 8 regression tests; full suite 286/286; build clean. Needs the owner runbook below before it can run.

---

## Owner setup runbook — do these IN ORDER

Steps only Alasdair can do (accounts, keys, env vars). Code is already done.

### A. Database (Supabase)
1. Open the Supabase project → **SQL Editor** → paste and run `supabase/migrations/0001_subscriptions.sql`. Confirm the `subscriptions` table exists with RLS on.
2. Confirm Vercel has `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` (already required for account sync — likely present).

### B. Stripe products (TEST mode — keep the toggle on "Test")
3. Create/sign in to Stripe. Stay in **Test mode**.
4. **Product catalog → Add product**: "CaseDive Plus", recurring price **$9.00 CAD / month** → copy the **Price ID** (`price_…`) → this is `STRIPE_PRICE_PLUS`.
5. Add a second price (same or new product): "CaseDive Student" **$5.00 CAD / month** → Price ID → `STRIPE_PRICE_STUDENT`.
6. **Developers → API keys** → copy the **test Secret key** (`sk_test_…`) → `STRIPE_SECRET_KEY`.

### C. Env vars + deploy
7. In Vercel → Project → Settings → Environment Variables, add: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_PLUS`, `STRIPE_PRICE_STUDENT`, `APP_BASE_URL` (e.g. `https://casedive.ca`). (Add `STRIPE_WEBHOOK_SECRET` in step 9.)
8. Deploy, so `/api/stripe-webhook` is live at a public URL.
9. **Developers → Webhooks → Add endpoint** = `https://casedive.ca/api/stripe-webhook`. Select events: `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`. Save → copy the **Signing secret** (`whsec_…`) → add as `STRIPE_WEBHOOK_SECRET` in Vercel → redeploy.

### D. Webhook round-trip test — REQUIRED GATE (not optional)
10. `brew install stripe/stripe-cli/stripe` → `stripe login` → `stripe listen --forward-to localhost:3000/api/stripe-webhook` (prints a local `whsec_` to use in `.env`). Start `npm run dev:api`, then `stripe trigger checkout.session.completed`.
    - **Confirm the webhook returns `200` and a row appears in `subscriptions`.**
    - **A `400` on a legitimate signed event means Vercel pre-parsed the body** (the `bodyParser:false` raw-body assumption failed) — the webhook is NOT working and no subscription will ever activate. Do not consider the webhook done until a signed event round-trips to a row. This is the one part of Phase 3 that cannot be verified by unit tests.

### E. Launch gate — before flipping to LIVE keys
11. Publish **Terms of Service**, **Privacy Policy**, and the **"legal information, not legal advice" disclaimer**.
12. **Confirm CanLII's commercial-use license** permits the paid product (or restrict the paid feature to existence-check + link-out).
13. Verification feature live. Then switch Stripe to **live mode**, repeat steps 4–9 with live keys/prices, and soft-launch.

> Env var reference (add to `.env` locally / Vercel; the repo's `.env.example` can't be edited by the assistant — copy these manually):
> `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_PLUS`, `STRIPE_PRICE_STUDENT`, `APP_BASE_URL`, plus existing `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`.

### Still on the code side (assistant) — Phase 4
- `usePlan()` hook + an Upgrade button/modal calling `create-checkout-session`, a "Manage billing" link calling `billing-portal`, and feature gating (verification depth, PDF limits). Buildable now without keys; the endpoints 503 cleanly until you finish A–C.
- **Phase 4 — Frontend:** `UpgradeModal`, pricing section, `usePlan()` gating, student verification.
- **Phase 5 — Launch:** Phase 0 complete → flip Stripe to live keys → soft launch to a small cohort → monitor.

---

## 8. Metrics / KPIs

- **Activation:** % of new accounts that run ≥1 verified search.
- **Free→Plus conversion** (target 2–5% for consumer freemium).
- **MRR / ARPU**, **churn** (monthly), **annual mix**.
- **Margin guard:** searches/user distribution vs the fair-use cap.
- **Trust signal:** verification pass-rate on surfaced citations (also a product-quality metric).

---

## 9. Open risks

| Risk | Mitigation |
| --- | --- |
| CanLII commercial license restricts use | Confirm early; fall back to existence-check + link-out only |
| Hallucinated cites erode trust / legal exposure | Verification as the core paid feature + clear disclaimer |
| Low willingness-to-pay among self-reps | Keep free tier generous; price low ($9 / $5 student); annual nudge |
| Abusive heavy users | Fair-use soft cap + hard throttle, not surprise billing |
| Stripe webhook signature failures | Raw-body handler, verified in test mode before live |
| Crossing GST/HST threshold unnoticed | Track revenue; register when approaching ~$30k CAD |
