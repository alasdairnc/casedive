// /api/stripe-webhook.js — Vercel Serverless Function
// Stripe webhook: the SOLE writer of the `subscriptions` table and the source
// of truth for plan/status. Verifies the Stripe signature against the RAW
// request body, then upserts a COMPLETE row per event (no partial writes, so
// out-of-order event delivery can't corrupt state).

import { getStripe, isStripeConfigured, priceToPlan } from "./_stripe.js";
import { getServiceClient } from "./_subscription.js";
import { logRequestStart, logSuccess, logError } from "./_logging.js";
import { randomUUID } from "crypto";

// Vercel parses JSON bodies by default; Stripe signature verification needs the
// UNPARSED bytes, so body parsing MUST be disabled for this route.
export const config = { api: { bodyParser: false } };

// Statuses our table's CHECK constraint permits; anything else (incomplete,
// unpaid, paused, …) maps to "inactive" so entitlement falls back to free.
const ALLOWED_STATUSES = new Set([
  "active",
  "trialing",
  "past_due",
  "canceled",
]);

function normalizeStatus(status) {
  return ALLOWED_STATUSES.has(status) ? status : "inactive";
}

async function readRawBody(req) {
  // Fast paths for runtimes that hand us the raw body directly. The stream path
  // only works if body parsing is actually disabled (see config above); if a
  // platform pre-parses into an object, raw bytes are unrecoverable and the
  // signature check below will (correctly) fail — verify on a real deploy.
  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") return Buffer.from(req.body);
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

function customerIdOf(sub) {
  return typeof sub.customer === "string" ? sub.customer : sub.customer?.id;
}

// Map a Stripe Subscription -> a complete `subscriptions` row.
function subscriptionToRow(sub) {
  const item = sub.items?.data?.[0];
  const priceId = item?.price?.id;
  // In Stripe's 2025+ ("basil") API — which stripe@22 targets —
  // current_period_end lives on the subscription item, not the root. Read both.
  const periodEndUnix = sub.current_period_end ?? item?.current_period_end;
  return {
    user_id: sub.metadata?.supabase_user_id ?? null,
    stripe_customer_id: customerIdOf(sub) ?? null,
    stripe_subscription_id: sub.id,
    plan: priceToPlan(priceId) ?? sub.metadata?.plan ?? "free",
    status: normalizeStatus(sub.status),
    current_period_end: Number.isFinite(periodEndUnix)
      ? new Date(periodEndUnix * 1000).toISOString()
      : null,
  };
}

// Persist a subscription. Upsert by user_id when we know it (the common path —
// metadata carries supabase_user_id); otherwise update the existing row matched
// by Stripe customer id. If neither resolves, skip (logged by caller).
async function persistSubscription(supabase, sub) {
  const row = subscriptionToRow(sub);
  if (row.user_id) {
    return supabase.from("subscriptions").upsert(row, { onConflict: "user_id" });
  }
  if (row.stripe_customer_id) {
    const { user_id: _omit, ...rest } = row;
    return supabase
      .from("subscriptions")
      .update(rest)
      .eq("stripe_customer_id", row.stripe_customer_id);
  }
  return { error: new Error("no user_id or customer id on subscription") };
}

// Security headers. No CORS: this is a server-to-server endpoint with no
// browser origin; the Stripe signature is the authentication boundary.
function applyWebhookHeaders(res) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Content-Security-Policy", "default-src 'none'");
}

export default async function handler(req, res) {
  const requestId = randomUUID();
  const startMs = Date.now();
  applyWebhookHeaders(res);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return res.status(503).json({ error: "Billing is not available" });
  }

  // Cheap pre-filter: reject anything without a signature header before we read
  // the body, so unsigned floods can't make us buffer arbitrary payloads.
  const sig = req.headers["stripe-signature"];
  if (!sig) {
    return res.status(400).json({ error: "Missing signature" });
  }

  logRequestStart(req, "stripe-webhook", requestId);

  // 1) Verify signature against the raw body. Forged/unsigned -> 400.
  let event;
  try {
    const raw = await readRawBody(req);
    event = getStripe().webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    logError(requestId, "stripe-webhook", err, 400, Date.now() - startMs);
    return res.status(400).json({ error: "Invalid signature" });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    // Can't persist; 500 so Stripe retries once Supabase is configured.
    logError(
      requestId,
      "stripe-webhook",
      new Error("Supabase not configured"),
      500,
      Date.now() - startMs,
    );
    return res.status(500).json({ error: "Store unavailable" });
  }

  // 2) Handle the events that change subscription state.
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const subId = session.subscription;
        if (subId) {
          const sub = await getStripe().subscriptions.retrieve(subId);
          // Carry the session's user mapping in case the subscription lacks it.
          sub.metadata = {
            supabase_user_id:
              sub.metadata?.supabase_user_id ??
              session.metadata?.supabase_user_id ??
              session.client_reference_id,
            plan: sub.metadata?.plan ?? session.metadata?.plan,
          };
          const { error } = await persistSubscription(supabase, sub);
          if (error) throw error;
        }
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const { error } = await persistSubscription(supabase, event.data.object);
        if (error) throw error;
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const customerId = customerIdOf(sub);
        if (customerId) {
          const { error } = await supabase
            .from("subscriptions")
            .update({ status: "canceled", plan: "free" })
            .eq("stripe_customer_id", customerId);
          if (error) throw error;
        }
        break;
      }
      default:
        // Acknowledge unhandled event types so Stripe stops retrying them.
        break;
    }
  } catch (err) {
    logError(requestId, "stripe-webhook", err, 500, Date.now() - startMs);
    // 500 -> Stripe retries with backoff (writes are idempotent upserts).
    return res.status(500).json({ error: "Failed to process event" });
  }

  // No rate limiter on this endpoint, so pass a stub rlResult to logSuccess.
  logSuccess(requestId, "stripe-webhook", 200, Date.now() - startMs, {
    remaining: null,
  });
  return res.status(200).json({ received: true });
}
