// api/_subscription.js — Plan resolution + per-plan limits (monetization Phase 1)
//
// Pure-ish shared module. NEVER throws and NEVER blocks a request: any failure
// (Supabase unconfigured, bad token, DB error) degrades to the FREE plan, so
// adding plan awareness to an endpoint can't take it down. Mirrors the auth
// pattern in user-data.js.
//
// The Stripe webhook is the source of truth that writes the `subscriptions`
// table (see supabase/migrations/0001_subscriptions.sql). This module only reads.

import { createClient } from "@supabase/supabase-js";
import { checkRateLimit, getClientIp } from "./_rateLimit.js";
import { withRedisTimeout } from "./_redisTimeout.js";
import { API_REDIS_TIMEOUT_MS } from "./_constants.js";

export const PLAN_FREE = "free";
export const PLAN_PLUS = "plus";
export const PLAN_STUDENT = "student";

// Statuses that entitle a user to their paid plan. Anything else (past_due,
// canceled, inactive, unknown) falls back to free.
const ENTITLED_STATUSES = new Set(["active", "trialing"]);

// Per-plan limits. Two distinct layers:
//   - `rateLimitPerHour` — the ABUSE ceiling enforced NOW by _rateLimit.js on
//     every metered request. free=5 deliberately matches the historical
//     anonymous limit, so logged-out/free behavior is unchanged.
//   - `searchesPerDay` / `fairUseMonthly` — the PRODUCT quota (packaging). Not
//     yet enforced; a later phase adds daily/monthly counters. `null` = fair use.
// The UI reads `verification`/`pdfPerMonth`/`sync` for feature gating.
export const PLAN_LIMITS = {
  [PLAN_FREE]: {
    label: "Free",
    rateLimitPerHour: 5,
    searchesPerDay: 25,
    fairUseMonthly: null,
    verification: "existence", // existence check only
    pdfPerMonth: 3,
    sync: true,
  },
  [PLAN_PLUS]: {
    label: "Plus",
    rateLimitPerHour: 100,
    searchesPerDay: null, // fair use
    fairUseMonthly: 500, // soft cap; throttle (not bill) past a hard multiple
    verification: "full", // full CanLII verification + link-out
    pdfPerMonth: null, // unlimited
    sync: true,
  },
  [PLAN_STUDENT]: {
    label: "Student",
    rateLimitPerHour: 100,
    searchesPerDay: null,
    fairUseMonthly: 500,
    verification: "full",
    pdfPerMonth: null,
    sync: true,
  },
};

export function getPlanLimits(plan) {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS[PLAN_FREE];
}

// Hourly abuse-limit for a plan. Safe for unknown plans (falls back to free).
export function getHourlyRateLimit(plan) {
  return getPlanLimits(plan).rateLimitPerHour;
}

function isConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY);
}

let cachedClient = null;
function getClient() {
  if (!isConfigured()) return null;
  if (!cachedClient) {
    cachedClient = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY,
    );
  }
  return cachedClient;
}

// Service-role Supabase client (bypasses RLS) for the Stripe webhook to write
// subscription rows. Returns null when Supabase is unconfigured.
export function getServiceClient() {
  return getClient();
}

// Timeout-guarded Supabase reads. These run on the hot path (every
// authenticated analyze/case-summary/export-pdf/verify call), so a hung
// Supabase must not stall the request: on timeout withRedisTimeout rejects and
// callers degrade to free/null exactly as they do for any other failure.
async function timedAuthUser(supabase, token) {
  const { data, error } = await withRedisTimeout(
    supabase.auth.getUser(token),
    API_REDIS_TIMEOUT_MS,
    "Supabase auth timeout",
  );
  return error || !data?.user ? null : data.user;
}

async function timedPlanRow(supabase, userId) {
  const { data, error } = await withRedisTimeout(
    supabase
      .from("subscriptions")
      .select("plan, status")
      .eq("user_id", userId)
      .maybeSingle(),
    API_REDIS_TIMEOUT_MS,
    "Supabase subscriptions timeout",
  );
  return error ? null : (data ?? null);
}

function planFromRow(row) {
  if (!row || !ENTITLED_STATUSES.has(row.status) || !PLAN_LIMITS[row.plan]) {
    return PLAN_FREE;
  }
  return row.plan;
}

// Verify a Bearer token and return the full Supabase user (incl. email), or
// null. Used by endpoints that need the authenticated user's identity/email
// (e.g. creating a Stripe Checkout session). Never throws.
export async function getAuthedUser(token) {
  if (!token) return null;
  const supabase = getClient();
  if (!supabase) return null;
  try {
    return await timedAuthUser(supabase, token);
  } catch {
    return null;
  }
}

// Extract a Bearer token from an incoming request, or null. Anonymous-safe.
export function getBearerToken(req) {
  const header = req?.headers?.authorization ?? "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
}

// Resolve the effective plan for a request token.
// Returns one of PLAN_FREE | PLAN_PLUS | PLAN_STUDENT. Falls back to FREE on any
// failure or for anonymous requests.
export async function resolvePlan(token) {
  if (!token) return PLAN_FREE;
  const supabase = getClient();
  if (!supabase) return PLAN_FREE;
  try {
    const user = await timedAuthUser(supabase, token);
    if (!user) return PLAN_FREE;
    return planFromRow(await timedPlanRow(supabase, user.id));
  } catch {
    return PLAN_FREE;
  }
}

// Convenience: resolve the authenticated user id AND plan in one call, for
// endpoints that key rate limits on the user id (Phase 2). Returns
// { userId, plan } with userId null for anonymous/failed auth.
export async function resolveUserAndPlan(token) {
  if (!token) return { userId: null, plan: PLAN_FREE };
  const supabase = getClient();
  if (!supabase) return { userId: null, plan: PLAN_FREE };
  try {
    const user = await timedAuthUser(supabase, token);
    if (!user) return { userId: null, plan: PLAN_FREE };
    return {
      userId: user.id,
      plan: planFromRow(await timedPlanRow(supabase, user.id)),
    };
  } catch {
    return { userId: null, plan: PLAN_FREE };
  }
}

// Single entry point for endpoint rate limiting. Resolves the caller's plan and
// keys the limit bucket on the Supabase user id when authenticated (so a paid
// user gets their own quota and never collides with strangers sharing an IP —
// e.g. a campus or library NAT), or on the client IP when anonymous.
//
// The `user:` prefix can never collide with a real IP: getClientIp() validates
// IP shape and collapses anything else to "unknown".
//
// Returns { result, identity, plan, userId }. `result` has the same shape as
// checkRateLimit() so callers feed it straight into rateLimitHeaders() /
// respondRateLimit() exactly as before.
export async function checkRequestRateLimit(req, endpoint) {
  const token = getBearerToken(req);
  const { userId, plan } = await resolveUserAndPlan(token);
  const identity = userId ? `user:${userId}` : getClientIp(req);
  const result = await checkRateLimit(identity, endpoint, {
    limit: getHourlyRateLimit(plan),
  });
  return { result, identity, plan, userId };
}
