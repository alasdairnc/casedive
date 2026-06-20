# CaseDive Billing — Plain-English Setup Walkthrough

Everything the code can't do for you, click by click. Do these in order.
You'll collect **6 values** along the way and paste them into Vercel at the end:

```
SUPABASE_URL            (you may already have this)
SUPABASE_SERVICE_KEY    (you may already have this)
STRIPE_SECRET_KEY
STRIPE_PRICE_PLUS
STRIPE_PRICE_STUDENT
STRIPE_WEBHOOK_SECRET
APP_BASE_URL            = https://casedive.ca
```

Keep a scratch note open and paste each value as you get it.

---

## Step 1 — Create the database table (Supabase)

This makes the table that remembers who is a paying subscriber.

1. Go to <https://supabase.com> and open your CaseDive project.
2. In the left sidebar, click **SQL Editor**.
3. Click **+ New query**.
4. Open the file `supabase/migrations/0001_subscriptions.sql` in your project, copy **all** of it, and paste it into the query box.
5. Click **Run** (bottom right).
6. You should see "Success. No rows returned." That's correct — it created the table.
7. To confirm: left sidebar → **Table Editor** → you should now see a table called **subscriptions**.

---

## Step 2 — Grab your Supabase keys (probably already set)

These let the server check who's logged in and save subscription status.

1. Still in Supabase: left sidebar → **Project Settings** (gear icon) → **API**.
2. Find **Project URL** — copy it → this is your `SUPABASE_URL`.
3. Find **Project API keys** → the **`service_role`** key (NOT `anon`). Click reveal, copy it → this is your `SUPABASE_SERVICE_KEY`.
   - ⚠️ The `service_role` key is secret. Never put it in frontend code or commit it. You'll only paste it into Vercel.

> If CaseDive login/sync already works in production, these two are likely already in Vercel — you can skip pasting them again, but having them noted doesn't hurt.

---

## Step 3 — Create your Stripe products and prices

This defines the $9 and $5 plans.

1. Go to <https://dashboard.stripe.com> and sign up / log in.
2. **Top-right: make sure the toggle says "Test mode"** (it should be ON / orange). Everything now is fake money — safe to experiment.
3. Left sidebar → **Product catalog** (or **Products**) → click **+ Add product**.
4. Fill in:
   - **Name:** `CaseDive Plus`
   - **Pricing model:** Recurring
   - **Price:** `9.00`, Currency: **CAD**, Billing period: **Monthly**
5. Click **Add product** (or **Save**).
6. On the product page you'll see the price listed. Click it, and find the **Price ID** — it looks like `price_1AbC...`. Copy it → this is `STRIPE_PRICE_PLUS`.
7. Now make the student price. Easiest: on the same product page click **+ Add another price**, set `5.00` CAD Monthly, save, and copy that new **Price ID** → this is `STRIPE_PRICE_STUDENT`.
   - (Or create a separate product called "CaseDive Student" the same way.)

> Tip: a "Product" is the thing you sell; a "Price" is a specific amount for it. The code needs the **Price** IDs, not the product IDs.

---

## Step 4 — Get your Stripe secret key

This lets the server talk to Stripe.

1. Stripe dashboard (still Test mode) → left sidebar → **Developers** → **API keys**.
2. Find **Secret key**. Click **Reveal test key**.
3. Copy it — it starts with `sk_test_...` → this is `STRIPE_SECRET_KEY`.
   - ⚠️ Secret. Only paste it into Vercel, never into the website code.

---

## Step 5 — Put the values into Vercel and deploy

1. Go to <https://vercel.com>, open the **CaseDive** project.
2. Top menu → **Settings** → left sidebar → **Environment Variables**.
3. For each value below, type the **Name** exactly, paste the **Value**, leave environments as **Production, Preview, Development** (all checked), and click **Save**:
   - `STRIPE_SECRET_KEY` = your `sk_test_...`
   - `STRIPE_PRICE_PLUS` = your `price_...` (Plus)
   - `STRIPE_PRICE_STUDENT` = your `price_...` (Student)
   - `APP_BASE_URL` = `https://casedive.ca`
   - `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` — only if they're not already listed.
   - (You'll add `STRIPE_WEBHOOK_SECRET` in Step 6 — skip it for now.)
4. **Redeploy so the new variables take effect:** top menu → **Deployments** → the latest one → the **⋯** menu → **Redeploy**.

---

## Step 6 — Connect the Stripe webhook

A "webhook" is Stripe phoning your server to say "this person just paid." Without it, payments succeed but your app never learns about them.

1. Stripe dashboard (Test mode) → **Developers** → **Webhooks** → **+ Add endpoint** (or **Add destination**).
2. **Endpoint URL:** `https://casedive.ca/api/stripe-webhook`
3. **Select events to send** → click **Select events** and tick these four:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Click **Add endpoint**.
5. On the new endpoint's page, find **Signing secret** → click **Reveal**. It starts with `whsec_...`. Copy it → this is `STRIPE_WEBHOOK_SECRET`.
6. Back in **Vercel → Settings → Environment Variables**, add `STRIPE_WEBHOOK_SECRET` = that `whsec_...` value, Save.
7. **Redeploy again** (Deployments → latest → ⋯ → Redeploy) so the secret is live.

---

## Step 7 — Test that the webhook actually works (important)

This is the one thing that must be checked on the live site.

1. Stripe dashboard → **Developers** → **Webhooks** → click your `casedive.ca/api/stripe-webhook` endpoint.
2. Click **Send test event** (or **Send test webhook**).
3. Choose event type **`checkout.session.completed`** → **Send test event**.
4. Look at the response Stripe shows for that delivery:
   - **`200`** = working. 🎉
   - **`500`** = the security check passed but the fake test data had no real subscription to look up. **This is fine for a test event** — it means the important part (reading the real message) works.
   - **`400` "Invalid signature"** = ❌ problem. The server couldn't read the raw message (a known hosting quirk). **Tell Claude "the webhook returns 400"** and it'll switch the approach.
5. So: **anything except 400 means the webhook plumbing is good.**

> Real end-to-end (with a real test card `4242 4242 4242 4242`) becomes possible once the Upgrade button exists in the app — that's the next coding step (Phase 4).

---

## Step 8 — Before charging REAL money (don't skip)

Everything above is fake/test money. Before flipping to live:

1. **Add legal pages:** Terms of Service, Privacy Policy, and a visible disclaimer: *"CaseDive provides legal information, not legal advice. Verify all citations before relying on them."*
2. **Check CanLII's API license** allows a paid product (email them if unsure). If it doesn't, the paid feature switches to just linking out to CanLII instead of showing their content.
3. **Go live:** in Stripe, flip the toggle to **Live mode**, then redo Steps 3, 4, and 6 with the **live** keys/prices (live keys start with `sk_live_` / `whsec_`), and update those values in Vercel.

---

## If you get stuck

Tell Claude which step number and what you see on screen. The most likely snag is Step 7 returning 400 — that's a known item with a ready fix.
