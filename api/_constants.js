// Centralized API/runtime constants for easier tuning.

export const ANALYZE_CACHE_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const ANTHROPIC_MESSAGES_URL = "https://api.anthropic.com/v1/messages";
export const ANTHROPIC_TIMEOUT_MS = 25_000;
// /api/analyze may run 60 s (vercel.json). One model call gets up to
// ANALYZE_MODEL_TIMEOUT_MS; a bad-JSON retry only runs if ANALYZE_MIN_RETRY_MS is
// left once the post-model case-law retrieval has been reserved for. The shorter
// ANTHROPIC_TIMEOUT_MS stays for endpoints with a 30 s limit (case-summary).
export const ANALYZE_TOTAL_BUDGET_MS = 55_000;
export const ANALYZE_MODEL_TIMEOUT_MS = 40_000;
export const ANALYZE_POST_MODEL_RESERVE_MS = 8_000;
export const ANALYZE_MIN_RETRY_MS = 12_000;
export const ANTHROPIC_MODEL_ID =
  process.env.ANTHROPIC_MODEL_ID || "claude-haiku-4-5-20251001";

export const API_REDIS_TIMEOUT_MS = 500;

// Redis timeouts are endpoint-specific because threshold checks must fail fast.
export const RATE_LIMIT_REDIS_TIMEOUT_MS = 500;
export const RETRIEVAL_THRESHOLDS_REDIS_TIMEOUT_MS = 500;
export const RETRIEVAL_HEALTH_STORE_REDIS_TIMEOUT_MS = 2000;
