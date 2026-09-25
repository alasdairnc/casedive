// api/_stripe.js — Stripe client + price/plan mapping (monetization Phase 3)
//
// Lazy, config-guarded: if STRIPE_SECRET_KEY is unset the client is null and
// every billing endpoint degrades to a clean 503, exactly like the Supabase
// guard in user-data.js. Nothing here runs at import time.

import Stripe from "stripe";

let cachedClient = null;

export function isStripeConfigured() {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export function getStripe() {
  if (!isStripeConfigured()) return null;
  if (!cachedClient) {
    cachedClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      // Vercel functions are short-lived; cap network retries/latency.
      maxNetworkRetries: 2,
      timeout: 20000,
    });
  }
  return cachedClient;
}

// Map a requested plan -> Stripe Price id (from env). null if unknown/unset.
export function planToPriceId(plan) {
  if (plan === "plus") return process.env.STRIPE_PRICE_PLUS || null;
  if (plan === "student") return process.env.STRIPE_PRICE_STUDENT || null;
  return null;
}

// Reverse: a Stripe Price id -> our plan name. null if it matches neither env
// price (e.g. a legacy/removed price), so the webhook can skip it safely.
export function priceToPlan(priceId) {
  if (!priceId) return null;
  if (priceId === process.env.STRIPE_PRICE_PLUS) return "plus";
  if (priceId === process.env.STRIPE_PRICE_STUDENT) return "student";
  return null;
}

// Plans a client is allowed to check out. Keep in sync with _subscription.js.
export const CHECKOUT_PLANS = new Set(["plus", "student"]);
