// /api/create-checkout-session.js — Vercel Serverless Function
// Creates a Stripe Checkout (hosted) session for an authenticated user to
// subscribe to Plus/Student. Returns the redirect URL; the client navigates to
// it. The webhook (stripe-webhook.js) is the source of truth for plan state —
// this endpoint never writes the subscription.

import { randomUUID } from "crypto";
import {
  applyStandardApiHeaders,
  handleOptionsAndMethod,
  respondRateLimit,
  validateJsonRequest,
} from "./_apiCommon.js";
import { rateLimitHeaders } from "./_rateLimit.js";
import {
  checkRequestRateLimit,
  getAuthedUser,
  getBearerToken,
} from "./_subscription.js";
import {
  getStripe,
  isStripeConfigured,
  planToPriceId,
  CHECKOUT_PLANS,
} from "./_stripe.js";
import {
  logRequestStart,
  logRateLimitCheck,
  logValidationError,
  logExternalApiCall,
  logSuccess,
  logError,
} from "./_logging.js";

// Redirect target. Use only a configured URL or the production domain — never
// the request Origin, which a client controls and could point the post-checkout
// redirect anywhere. Set APP_BASE_URL per environment (e.g. localhost in dev).
function resolveBaseUrl() {
  return process.env.APP_BASE_URL || "https://casedive.ca";
}

export default async function handler(req, res) {
  const requestId = randomUUID();
  applyStandardApiHeaders(
    req,
    res,
    "POST, OPTIONS",
    "Content-Type, Authorization",
  );
  if (handleOptionsAndMethod(req, res, "POST")) return;

  logRequestStart(requestId, "create-checkout-session", req);

  // Config guard — fail cleanly when billing isn't wired up.
  if (!isStripeConfigured()) {
    return res.status(503).json({ error: "Billing is not available" });
  }

  // Rate limit (keyed on the authenticated user when present).
  const { result: rlResult, identity: rlIdentity } =
    await checkRequestRateLimit(req, "create-checkout-session");
  logRateLimitCheck(requestId, "create-checkout-session", rlResult, rlIdentity);
  const rlHeaders = rateLimitHeaders(rlResult);
  Object.entries(rlHeaders).forEach(([k, v]) => res.setHeader(k, v));
  if (respondRateLimit(res, rlResult)) return;

  // Auth — require a valid Supabase session.
  const user = await getAuthedUser(getBearerToken(req));
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Validate body.
  if (
    !validateJsonRequest(req, res, {
      requestId,
      endpoint: "create-checkout-session",
      maxBytes: 1000,
      logValidationError,
    })
  ) {
    return;
  }

  const plan = req.body?.plan;
  if (!CHECKOUT_PLANS.has(plan)) {
    logValidationError(
      requestId,
      "create-checkout-session",
      "Invalid plan",
      "plan",
    );
    return res.status(400).json({ error: "Invalid plan" });
  }

  const priceId = planToPriceId(plan);
  if (!priceId) {
    logError(requestId, "create-checkout-session", "Price id not configured");
    return res.status(503).json({ error: "Billing is not available" });
  }

  const baseUrl = resolveBaseUrl();
  const stripe = getStripe();

  try {
    logExternalApiCall(requestId, "create-checkout-session", "stripe.checkout");
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      // Bind the session to this user so the webhook can map customer -> user.
      client_reference_id: user.id,
      customer_email: user.email,
      metadata: { supabase_user_id: user.id, plan },
      subscription_data: {
        metadata: { supabase_user_id: user.id, plan },
      },
      allow_promotion_codes: true,
      success_url: `${baseUrl}/?checkout=success`,
      cancel_url: `${baseUrl}/?checkout=cancelled`,
    });

    logSuccess(requestId, "create-checkout-session");
    return res.status(200).json({ url: session.url });
  } catch (err) {
    logError(requestId, "create-checkout-session", err.message);
    return res.status(502).json({ error: "Failed to start checkout" });
  }
}
