// api/_rateLimit.js — Sliding-window rate limiter for Vercel serverless
//
// State is per warm instance (resets on cold start). This is adequate for a
// low-traffic personal project. For cross-instance persistence swap the Map
// for Upstash Redis: https://upstash.com/docs/redis/sdks/ratelimit-ts/overview

const store = new Map(); // ip → timestamp[]
const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

/**
 * Check whether the given IP is within the rate limit.
 * @param {string|null} ip
 * @returns {{ allowed: boolean, remaining: number, resetAt?: string }}
 */
export function checkRateLimit(ip) {
  const now = Date.now();
  const key = ip ?? "unknown";
  const hits = (store.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (hits.length >= MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: new Date(hits[0] + WINDOW_MS).toISOString(),
    };
  }

  hits.push(now);
  store.set(key, hits);

  // Prune old entries to avoid unbounded memory growth
  if (store.size > 10_000) {
    for (const [k, v] of store) {
      if (v.every((t) => now - t >= WINDOW_MS)) store.delete(k);
    }
  }

  return { allowed: true, remaining: MAX_REQUESTS - hits.length };
}

/**
 * Extract the real client IP from Vercel's request headers.
 */
export function getClientIp(req) {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ??
    req.socket?.remoteAddress ??
    null
  );
}
