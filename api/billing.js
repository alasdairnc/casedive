// /api/billing.js — Vercel Serverless Function
// Combined billing actions for an authenticated user:
//   POST { action: "checkout", plan }  -> Stripe Checkout session URL
//   POST { action: "portal" }          -> Stripe Customer Portal URL
//
// Checkout + portal share one function to stay within the platform's
// serverless-function cap. The webhook (stripe-webhook.js) stays separate
// because it must receive the RAW body (signature verification).
//
// The webhook is the source of truth for plan state — this endpoint never
// writes the subscription.

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
  getServiceClient,
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

// Redirect/return target. Configured URL or production domain only — never the
// client-controlled request Origin. Set APP_BASE_URL per environment.
function resolveBaseUrl() {
  return process.env.APP_BASE_URL || "https://www.casedive.ca";
}

async function handleCheckout(req, res, requestId, user) {
  const plan = req.body?.plan;
  if (!CHECKOUT_PLANS.has(plan)) {
    logValidationError(requestId, "billing", "Invalid plan", "plan");
    return res.status(400).json({ error: "Invalid plan" });
  }
  const priceId = planToPriceId(plan);
  if (!priceId) {
    logError(requestId, "billing", "Price id not configured");
    return res.status(503).json({ error: "Billing is not available" });
  }

  const baseUrl = resolveBaseUrl();
  try {
    logExternalApiCall(requestId, "billing", "stripe.checkout");
    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      client_reference_id: user.id,
      customer_email: user.email,
      metadata: { supabase_user_id: user.id, plan },
      subscription_data: { metadata: { supabase_user_id: user.id, plan } },
      allow_promotion_codes: true,
      success_url: `${baseUrl}/?checkout=success`,
      cancel_url: `${baseUrl}/?checkout=cancelled`,
    });
    logSuccess(requestId, "billing");
    return res.status(200).json({ url: session.url });
  } catch (err) {
    logError(requestId, "billing", err.message);
    return res.status(502).json({ error: "Failed to start checkout" });
  }
}

async function handlePortal(req, res, requestId, user) {
  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(503).json({ error: "Billing is not available" });
  }

  let customerId = null;
  try {
    const { data, error } = await supabase
      .from("subscriptions")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();
    if (!error) customerId = data?.stripe_customer_id ?? null;
  } catch (err) {
    logError(requestId, "billing", err.message);
  }
  if (!customerId) {
    return res.status(404).json({ error: "No active subscription" });
  }

  try {
    logExternalApiCall(requestId, "billing", "stripe.billingPortal");
    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: resolveBaseUrl(),
    });
    logSuccess(requestId, "billing");
    return res.status(200).json({ url: session.url });
  } catch (err) {
    logError(requestId, "billing", err.message);
    return res.status(502).json({ error: "Failed to open billing portal" });
  }
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

  logRequestStart(requestId, "billing", req);

  if (!isStripeConfigured()) {
    return res.status(503).json({ error: "Billing is not available" });
  }

  // Rate limit (keyed on the authenticated user when present).
  const { result: rlResult, identity: rlIdentity } =
    await checkRequestRateLimit(req, "billing");
  logRateLimitCheck(requestId, "billing", rlResult, rlIdentity);
  const rlHeaders = rateLimitHeaders(rlResult);
  Object.entries(rlHeaders).forEach(([k, v]) => res.setHeader(k, v));
  if (respondRateLimit(res, rlResult)) return;

  // Auth.
  const user = await getAuthedUser(getBearerToken(req));
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Validate body.
  if (
    !validateJsonRequest(req, res, {
      requestId,
      endpoint: "billing",
      maxBytes: 1000,
      logValidationError,
    })
  ) {
    return;
  }

  const action = req.body?.action;
  if (action === "checkout") return handleCheckout(req, res, requestId, user);
  if (action === "portal") return handlePortal(req, res, requestId, user);

  logValidationError(requestId, "billing", "Invalid action", "action");
  return res.status(400).json({ error: "Invalid action" });
}
