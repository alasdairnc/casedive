// scripts/stripe-setup.mjs
// One-time (re-runnable) Stripe setup for CaseDive billing.
// Creates/reuses the Plus + Student products & prices and the webhook endpoint,
// then prints the env values to paste into Vercel.
//
// Usage:
//   STRIPE_SECRET_KEY=sk_test_xxx node scripts/stripe-setup.mjs
//   STRIPE_SECRET_KEY=sk_live_xxx APP_BASE_URL=https://casedive.ca node scripts/stripe-setup.mjs
//
// Safe to re-run: products/prices are matched by name + amount and reused; the
// webhook for the same URL is deleted and recreated so a fresh signing secret
// is printed (the secret is only returned by Stripe on create).

import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Missing STRIPE_SECRET_KEY env var.");
  process.exit(1);
}
const live = key.startsWith("sk_live_");
const stripe = new Stripe(key);

const APP_BASE_URL = process.env.APP_BASE_URL || "https://casedive.ca";
const WEBHOOK_URL = `${APP_BASE_URL}/api/stripe-webhook`;
const EVENTS = [
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
];

const PLANS = [
  { key: "plus", name: "CaseDive Plus", amount: 900, currency: "cad" },
  { key: "student", name: "CaseDive Student", amount: 500, currency: "cad" },
];

async function findProductByName(name) {
  const list = await stripe.products.list({ limit: 100, active: true });
  return list.data.find((p) => p.name === name) || null;
}

async function ensureProductPrice({ name, amount, currency }) {
  let product = await findProductByName(name);
  if (!product) product = await stripe.products.create({ name });

  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 100,
  });
  let price = prices.data.find(
    (p) =>
      p.unit_amount === amount &&
      p.currency === currency &&
      p.recurring?.interval === "month",
  );
  if (!price) {
    price = await stripe.prices.create({
      product: product.id,
      unit_amount: amount,
      currency,
      recurring: { interval: "month" },
    });
  }
  return price.id;
}

async function recreateWebhook() {
  const existing = await stripe.webhookEndpoints.list({ limit: 100 });
  for (const ep of existing.data) {
    if (ep.url === WEBHOOK_URL) await stripe.webhookEndpoints.del(ep.id);
  }
  const ep = await stripe.webhookEndpoints.create({
    url: WEBHOOK_URL,
    enabled_events: EVENTS,
  });
  return ep.secret; // whsec_... — only returned on create
}

async function main() {
  console.log(`Mode: ${live ? "LIVE" : "TEST"}`);
  const out = {};
  for (const plan of PLANS) {
    out[plan.key] = await ensureProductPrice(plan);
    console.log(`✓ ${plan.name}: ${out[plan.key]}`);
  }
  const whsec = await recreateWebhook();
  console.log(`✓ Webhook: ${WEBHOOK_URL}`);

  console.log(
    "\n=== Paste these into Vercel → Settings → Environment Variables ===",
  );
  console.log(`STRIPE_PRICE_PLUS=${out.plus}`);
  console.log(`STRIPE_PRICE_STUDENT=${out.student}`);
  console.log(`STRIPE_WEBHOOK_SECRET=${whsec}`);
  console.log(`APP_BASE_URL=${APP_BASE_URL}`);
  console.log(`STRIPE_SECRET_KEY=<the ${live ? "live" : "test"} key you used>`);
}

main().catch((e) => {
  console.error("Stripe setup failed:", e.message);
  process.exit(1);
});
