// /api/stripe-webhook.js — Vercel Function (Web-standard handler)
// Stripe webhook: the SOLE writer of the `subscriptions` table and the source
// of truth for plan/status. Verifies the Stripe signature against the RAW
// request body, then upserts a COMPLETE row per event (no partial writes, so
// out-of-order event delivery can't corrupt state).
//
// WHY a Web-standard handler (`export async function POST(request)`):
// Vercel's Node runtime reads and parses the body BEFORE a `(req, res)` handler
// runs (addHelpers → readBody → lazy `req.body`). The Next.js-only
// `export const config = { api: { bodyParser: false } }` is ignored there, so
// the previous stream-reading implementation always saw an already-consumed
// stream, got an empty buffer, and every real Stripe event failed signature
// verification with a 400. With the Web signature the runtime hands us the
// untouched Request, and `arrayBuffer()` returns the exact bytes Stripe signed.
// Only POST is exported, so the platform answers other methods with 405.

import { getStripe, isStripeConfigured, priceToPlan } from "./_stripe.js";
import { getServiceClient } from "./_subscription.js";
import { logRequestStart, logSuccess, logError } from "./_logging.js";
import { randomUUID } from "crypto";

// Statuses our table's CHECK constraint permits; anything else (incomplete,
// unpaid, paused, …) maps to "inactive" so entitlement falls back to free.
const ALLOWED_STATUSES = new Set([
  "active",
  "trialing",
  "past_due",
  "canceled",
]);

// Security headers. No CORS: this is a server-to-server endpoint with no
// browser origin; the Stripe signature is the authentication boundary.
const RESPONSE_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
  "referrer-policy": "strict-origin-when-cross-origin",
  "content-security-policy": "default-src 'none'",
};

// Stripe event payloads are small (tens of KB; a few hundred KB at the very
// largest). Anything bigger is not from Stripe, so refuse it before buffering:
// a forged request with a fake stripe-signature header must not be able to
// make the function hold an arbitrarily large body in memory.
const MAX_WEBHOOK_BODY_BYTES = 1_048_576; // 1 MiB

function normalizeStatus(status) {
  return ALLOWED_STATUSES.has(status) ? status : "inactive";
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: RESPONSE_HEADERS,
  });
}

// Minimal Node-style request view for the shared structured logger.
function toLogRequest(request) {
  let url = "/api/stripe-webhook";
  try {
    url = new URL(request.url).pathname;
  } catch {
    /* keep default */
  }
  return {
    method: request.method,
    url,
    headers: Object.fromEntries(request.headers),
    socket: {},
  };
}

// Read the raw body, or return null once it exceeds maxBytes. Checks the
// declared Content-Length first, then enforces the cap chunk by chunk so a
// chunked or lying request can't get around it.
async function readBoundedBody(request, maxBytes) {
  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) return null;
  if (!request.body) return Buffer.alloc(0);

  const reader = request.body.getReader();
  const chunks = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => {});
      return null;
    }
    chunks.push(Buffer.from(value));
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

export async function POST(request) {
  const requestId = randomUUID();
  const startMs = Date.now();

  if (!isStripeConfigured() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return json(503, { error: "Billing is not available" });
  }

  // Cheap pre-filter: reject anything without a signature header before we read
  // the body, so unsigned floods can't make us buffer arbitrary payloads.
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return json(400, { error: "Missing signature" });
  }

  logRequestStart(toLogRequest(request), "stripe-webhook", requestId);

  // 1) Read the raw body under a hard size cap. Oversized -> 413, unread.
  let raw;
  try {
    raw = await readBoundedBody(request, MAX_WEBHOOK_BODY_BYTES);
  } catch (err) {
    logError(requestId, "stripe-webhook", err, 400, Date.now() - startMs);
    return json(400, { error: "Invalid body" });
  }
  if (raw === null) {
    logError(
      requestId,
      "stripe-webhook",
      new Error("Webhook body exceeds size limit"),
      413,
      Date.now() - startMs,
    );
    return json(413, { error: "Payload too large" });
  }

  // 2) Verify signature against the raw body. Forged/unsigned -> 400.
  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      raw,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    logError(requestId, "stripe-webhook", err, 400, Date.now() - startMs);
    return json(400, { error: "Invalid signature" });
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
    return json(500, { error: "Store unavailable" });
  }

  // 3) Handle the events that change subscription state.
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
    return json(500, { error: "Failed to process event" });
  }

  // No rate limiter on this endpoint, so pass a stub rlResult to logSuccess.
  logSuccess(requestId, "stripe-webhook", 200, Date.now() - startMs, {
    remaining: null,
  });
  return json(200, { received: true });
}
