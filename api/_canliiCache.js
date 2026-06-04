// api/_canliiCache.js
// Redis-backed cache around CanLII citation verification (lookupCase).
//
// Why: each /api/analyze request verifies up to 20 citations (a pre-Anthropic
// grounding pass + a Phase B pass), and the two passes verify overlapping
// citations — AI suggestions repeat the same landmark cases the pre-pass already
// verified. lookupCase() is the only CanLII network call in the retrieval path
// and is uncached, so the same citations are re-verified on every request across
// every user. This wrapper memoizes the verdict.
//
// Zero behavior change: on any miss / null Redis / timeout it falls straight
// through to lookupCase(). Only the two statuses that cost a network round-trip
// (verified, not_found) are cached; transient errors are never cached.
//
// Redis lives in the api/ layer only — src/lib/canlii.js is imported by the
// frontend and must stay client-safe.

import { lookupCase } from "../src/lib/canlii.js";
import { redis } from "./_rateLimit.js";
import { withRedisTimeout } from "./_redisTimeout.js";
import { API_REDIS_TIMEOUT_MS } from "./_constants.js";

const CACHE_PREFIX = "canlii:verify:v1:";
const TTL_VERIFIED_S = 60 * 60 * 24 * 7; // 7d — verified corpus facts are stable
const TTL_NOT_FOUND_S = 60 * 60 * 24; // 24h — softer signal (404 + partiesMatch heuristic)

// Only statuses that cost a network round-trip and are stable facts about
// CanLII's corpus. `error`/`unverified`/`unparseable`/`unknown_court` are either
// transient or return before the fetch — caching them would poison results or
// save nothing.
const CACHEABLE = new Set(["verified", "not_found"]);

// Parties-INCLUSIVE key. lookupCase's verdict depends on the parties (partiesMatch),
// so two citations sharing a neutral cite but differing in parties
// (R v Smith, 2020 ONCA 123 vs R v Jones, 2020 ONCA 123) must NOT collide.
// Do not reuse buildCitationIdentityKey — it drops parties for numbered cites.
function verifyCacheKey(citation) {
  return (
    CACHE_PREFIX +
    String(citation || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim()
  );
}

function ttlForStatus(status) {
  return status === "verified" ? TTL_VERIFIED_S : TTL_NOT_FOUND_S;
}

/**
 * Verify a citation through the CanLII lookup pipeline, reading/writing a Redis
 * cache for stable verdicts. Falls back to a direct lookupCase() call on any
 * cache miss, Redis absence, or timeout.
 *
 * @param {string} citation
 * @param {string} apiKey
 * @param {Map<string, object>} [memo] optional in-request memo of resolved verdicts
 * @returns {Promise<{status: string, url?: string, searchUrl?: string, title?: string}>}
 */
export async function cachedLookupCase(citation, apiKey, memo) {
  const key = verifyCacheKey(citation);

  if (memo?.has(key)) return memo.get(key);

  if (redis) {
    const hit = await withRedisTimeout(
      redis.get(key),
      API_REDIS_TIMEOUT_MS,
    ).catch(() => null);
    if (hit) {
      const result = typeof hit === "string" ? JSON.parse(hit) : hit;
      memo?.set(key, result);
      return result;
    }
  }

  const result = await lookupCase(citation, apiKey);

  if (CACHEABLE.has(result.status)) {
    if (redis) {
      withRedisTimeout(
        redis.setex(key, ttlForStatus(result.status), JSON.stringify(result)),
        API_REDIS_TIMEOUT_MS,
      ).catch(() => {});
    }
    memo?.set(key, result);
  }

  return result;
}
