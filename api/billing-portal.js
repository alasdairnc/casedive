// /api/billing-portal.js — Vercel Serverless Function
// Returns a Stripe Customer Portal URL so an authenticated subscriber can
// manage/cancel their plan or update payment details. Self-serve, no card
// handling on our side.

import { randomUUID } from "crypto";
import {
  applyStandardApiHeaders,
  handleOptionsAndMethod,
  respondRateLimit,
} from "./_apiCommon.js";
import { rateLimitHeaders } from "./_rateLimit.js";
import {
  checkRequestRateLimit,
  getAuthedUser,
  getBearerToken,
  getServiceClient,
} from "./_subscription.js";
import { getStripe, isStripeConfigured } from "./_stripe.js";
import {
  logRequestStart,
  logRateLimitCheck,
  logExternalApiCall,
  logSuccess,
  logError,
} from "./_logging.js";

// Return target. Configured URL or production domain only — never the
// client-controlled request Origin.
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

  logRequestStart(requestId, "billing-portal", req);

  if (!isStripeConfigured()) {
    return res.status(503).json({ error: "Billing is not available" });
  }

  const { result: rlResult, identity: rlIdentity } =
    await checkRequestRateLimit(req, "billing-portal");
  logRateLimitCheck(requestId, "billing-portal", rlResult, rlIdentity);
  const rlHeaders = rateLimitHeaders(rlResult);
  Object.entries(rlHeaders).forEach(([k, v]) => res.setHeader(k, v));
  if (respondRateLimit(res, rlResult)) return;

  const user = await getAuthedUser(getBearerToken(req));
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Look up the user's Stripe customer id (written by the webhook at checkout).
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
    logError(requestId, "billing-portal", err.message);
  }

  if (!customerId) {
    return res.status(404).json({ error: "No active subscription" });
  }

  try {
    logExternalApiCall(requestId, "billing-portal", "stripe.billingPortal");
    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: resolveBaseUrl(),
    });
    logSuccess(requestId, "billing-portal");
    return res.status(200).json({ url: session.url });
  } catch (err) {
    logError(requestId, "billing-portal", err.message);
    return res.status(502).json({ error: "Failed to open billing portal" });
  }
}
