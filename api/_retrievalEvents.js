// api/_retrievalEvents.js
// The one place that decides what a retrieval event MEANS (operational? error?
// failure?) and how events add up into counters. Window stats, the all-time
// counters, the trendline and the failure capture all use this, so a new
// reason code is classified once instead of in four copies.

export function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

export function toNonNegativeInt(value) {
  const num = toNumber(value);
  if (num == null || num < 0) return 0;
  return Math.floor(num);
}

function label(value, maxLen, fallback = null) {
  if (typeof value !== "string") return fallback;
  const cleaned = value.trim();
  return cleaned ? cleaned.slice(0, maxLen) : fallback;
}

// Events that are not retrieval attempts: the filter was off, or the model's
// own scope gate correctly returned nothing for a non-criminal question.
export const NON_OPERATIONAL_REASONS = new Set([
  "filter_disabled",
  "non_criminal_scope",
]);

const ERROR_REASONS = new Set(["retrieval_error", "missing_api_key"]);

const ERROR_LABELS = new Set([
  "timeout",
  "network_error",
  "rate_limited",
  "http_4xx",
  "http_5xx",
  "missing_api_key",
  "upstream_error",
]);

/**
 * Reduce an error message to a fixed label. Upstream errors can echo the query
 * they were sent (a fetch URL, a "no results for ..." text), which may contain
 * scenario wording, so the raw message is never stored on a health record.
 * Idempotent: an existing label comes back unchanged.
 */
export function safeErrorLabel(message) {
  if (typeof message !== "string") return null;
  const text = message.trim();
  if (!text) return null;
  if (ERROR_LABELS.has(text)) return text;
  const lower = text.toLowerCase();
  if (/time(d)?\s*out|timeout|aborted/.test(lower)) return "timeout";
  if (/api[_\s-]?key/.test(lower) && /missing|not\s+set|undefined/.test(lower)) {
    return "missing_api_key";
  }
  if (/\b429\b|rate\s*limit|too many requests/.test(lower)) return "rate_limited";
  if (/\b5\d\d\b/.test(lower)) return "http_5xx";
  if (/\b4\d\d\b/.test(lower)) return "http_4xx";
  if (/fetch failed|network|econn|enotfound|eai_again|socket|dns/.test(lower)) {
    return "network_error";
  }
  return "upstream_error";
}

export function normalizeEvent(raw) {
  let event = raw;
  if (typeof raw === "string") {
    try {
      event = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (!event || typeof event !== "object") return null;

  const ts = toNumber(event.ts);
  if (ts == null || ts <= 0) return null;

  const latency = toNumber(event.retrievalLatencyMs);
  const score = toNumber(event.relevanceScoreAvg);

  return {
    ts: Math.floor(ts),
    endpoint: label(event.endpoint, 40, "unknown"),
    source: typeof event.source === "string" ? event.source : "retrieval",
    reason: typeof event.reason === "string" ? event.reason : "unknown",
    retrievalError: Boolean(event.retrievalError),
    caseLawFilterEnabled: event.caseLawFilterEnabled !== false,
    cacheHit: Boolean(event.cacheHit),
    retrievalLatencyMs:
      latency != null && latency >= 0 ? Math.floor(latency) : null,
    finalCaseLawCount: toNonNegativeInt(event.finalCaseLawCount),
    verifiedCount: toNonNegativeInt(event.verifiedCount),
    relevanceScoreAvg:
      score != null && score >= 0 ? Number(score.toFixed(3)) : null,
    fallbackPathUsed: event.fallbackPathUsed === true,
    fallbackTriggerReason: label(event.fallbackTriggerReason, 80),
    issuePrimary: label(event.issuePrimary, 40, "general_criminal"),
    classId: label(event.classId, 40, "general_criminal"),
    retrievalPass: label(event.retrievalPass, 40),
    prefilterConceptRescueCount: toNonNegativeInt(
      event.prefilterConceptRescueCount,
    ),
    semanticFilterDropCount: toNonNegativeInt(event.semanticFilterDropCount),
    candidateSourceMix: {
      ai: toNonNegativeInt(event?.candidateSourceMix?.ai),
      landmark: toNonNegativeInt(event?.candidateSourceMix?.landmark),
      localFallback: toNonNegativeInt(event?.candidateSourceMix?.localFallback),
    },
    errorMessage: label(event.errorMessage, 200),
  };
}

/**
 * Flags for one event. Cache events are served results: they count as
 * `isCache` and can be failures (a cached miss is still a miss the user saw),
 * but they are never `operational` for rate and latency purposes.
 */
export function classifyEvent(event) {
  const isCache = event.source === "cache";
  const isRetrieval = !isCache;
  const filterOn = event.caseLawFilterEnabled;
  const reasonCounts = !NON_OPERATIONAL_REASONS.has(event.reason);

  const operational = isRetrieval && filterOn && reasonCounts;
  const isError =
    operational && (event.retrievalError || ERROR_REASONS.has(event.reason));
  const quality = operational && !isError;
  const noVerified = quality && event.finalCaseLawCount === 0;
  const verified = quality && event.finalCaseLawCount > 0;

  // A failure the user could see, from either source. Used to capture the
  // scenario for review.
  const servedFilterOn = filterOn && reasonCounts;
  const effectiveCount = Math.max(event.finalCaseLawCount, event.verifiedCount);
  const isFailure =
    servedFilterOn &&
    (event.retrievalError ||
      ERROR_REASONS.has(event.reason) ||
      event.reason === "retrieval_timeout" ||
      (effectiveCount === 0 && event.reason !== "verified_results"));

  // Worth a human look even though it is not a failure: the scope gate decided
  // the question isn't criminal law, so no search ran. It stays out of every
  // rate (the gate answering correctly is not a miss), but the scenario is
  // what shows what users ask that the tool doesn't cover, and whether the gate
  // misjudged a criminal one.
  const outOfScope = filterOn && event.reason === "non_criminal_scope";
  const isReviewable = isFailure || outOfScope;

  return {
    isCache,
    isRetrieval,
    operational,
    isError,
    quality,
    noVerified,
    verified,
    isFailure,
    outOfScope,
    isReviewable,
  };
}

function issueKey(issuePrimary) {
  return (
    String(issuePrimary || "general_criminal")
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "_")
      .slice(0, 40) || "general_criminal"
  );
}

/**
 * Counter increments for one event. A flat { field: integer } map so the same
 * object feeds Redis HINCRBY, the in-memory fallback, and window sums.
 */
export function eventIncrements(event) {
  const c = classifyEvent(event);
  const inc = { total: 1 };
  const add = (field, n = 1) => {
    if (n) inc[field] = (inc[field] || 0) + n;
  };

  add(c.isCache ? "cache" : "retrieval");
  if (c.isRetrieval && event.reason === "filter_disabled") add("filterDisabled");
  if (c.isRetrieval && event.reason === "missing_api_key")
    add("missingApiKey");

  if (!c.operational) return inc;

  add("operational");
  add("quality", c.quality ? 1 : 0);
  add("errors", c.isError ? 1 : 0);
  add("noVerified", c.noVerified ? 1 : 0);
  add("verifiedResults", c.verified ? 1 : 0);
  if (c.quality) add("verifiedTotal", event.finalCaseLawCount);
  if (Number.isFinite(event.retrievalLatencyMs)) {
    add("latencyCount");
    add("latencySum", event.retrievalLatencyMs);
  }
  add("fallbackPath", event.fallbackPathUsed ? 1 : 0);
  add("semanticFilterDrops", event.semanticFilterDropCount);
  add("conceptRescues", event.prefilterConceptRescueCount);
  if (c.quality && Number.isFinite(event.relevanceScoreAvg)) {
    add("relevanceCount");
    // Integer thousandths so HINCRBY (integer-only) can hold the sum.
    add("relevanceSumMilli", Math.round(event.relevanceScoreAvg * 1000));
  }
  add("sourceAi", event.candidateSourceMix.ai);
  add("sourceLandmark", event.candidateSourceMix.landmark);
  add("sourceLocalFallback", event.candidateSourceMix.localFallback);

  const issue = issueKey(event.issuePrimary);
  add(`i:${issue}:req`);
  add(`i:${issue}:fb`, event.fallbackPathUsed ? 1 : 0);
  // Per-issue "no verified" has always included errors (denominator is every
  // operational request); keep that so issue alert thresholds don't shift.
  add(`i:${issue}:nv`, event.finalCaseLawCount === 0 ? 1 : 0);
  add(`i:${issue}:err`, c.isError ? 1 : 0);
  add(`i:${issue}:vt`, c.quality ? event.finalCaseLawCount : 0);
  return inc;
}

export function sumIncrements(events) {
  const totals = {};
  for (const event of events) {
    for (const [field, n] of Object.entries(eventIncrements(event))) {
      totals[field] = (totals[field] || 0) + n;
    }
  }
  return totals;
}

function ratio(numerator, denominator) {
  if (!denominator) return null;
  return Number((numerator / denominator).toFixed(4));
}

function perRequest(value, denominator) {
  return denominator ? Number((value / denominator).toFixed(4)) : null;
}

/** Counters -> the stats shape the dashboard and the alert rules read. */
export function statsFromTotals(raw = {}) {
  const t = {};
  for (const [field, value] of Object.entries(raw || {})) {
    t[field] = toNonNegativeInt(value);
  }
  const g = (field) => t[field] || 0;

  const sourceTotal = g("sourceAi") + g("sourceLandmark") + g("sourceLocalFallback");

  const issues = new Map();
  for (const [field, n] of Object.entries(t)) {
    const match = /^i:(.+):(req|fb|nv|err|vt)$/.exec(field);
    if (!match) continue;
    const row = issues.get(match[1]) || {};
    row[match[2]] = n;
    issues.set(match[1], row);
  }
  const byIssue = [...issues.entries()]
    .map(([issuePrimary, row]) => ({ issuePrimary, ...row }))
    .filter((row) => (row.req || 0) > 0)
    .sort((a, b) => b.req - a.req)
    .slice(0, 6)
    .map((row) => ({
      issuePrimary: row.issuePrimary,
      requests: row.req,
      fallbackPathRate: ratio(row.fb || 0, row.req),
      noVerifiedRate: ratio(row.nv || 0, row.req),
      errorRate: ratio(row.err || 0, row.req),
      avgVerifiedPerRequest: perRequest(row.vt || 0, row.req),
    }));

  return {
    samples: {
      total: g("total"),
      retrieval: g("retrieval"),
      cache: g("cache"),
      operational: g("operational"),
      quality: g("quality"),
      latency: g("latencyCount"),
    },
    counts: {
      filterDisabled: g("filterDisabled"),
      missingApiKey: g("missingApiKey"),
      errors: g("errors"),
      noVerified: g("noVerified"),
      verifiedResults: g("verifiedResults"),
      fallbackPath: g("fallbackPath"),
      semanticFilterDrops: g("semanticFilterDrops"),
    },
    rates: {
      errorRate: ratio(g("errors"), g("operational")),
      noVerifiedRate: ratio(g("noVerified"), g("quality")),
      avgVerifiedPerRequest: perRequest(g("verifiedTotal"), g("quality")),
      fallbackPathRate: ratio(g("fallbackPath"), g("operational")),
      avgRelevanceScore: g("relevanceCount")
        ? Number((g("relevanceSumMilli") / 1000 / g("relevanceCount")).toFixed(4))
        : null,
      avgSemanticFilterDrops: perRequest(
        g("semanticFilterDrops"),
        g("operational"),
      ),
      avgConceptRescues: perRequest(g("conceptRescues"), g("operational")),
      candidateSourceMix:
        sourceTotal > 0
          ? {
              ai: Number((g("sourceAi") / sourceTotal).toFixed(4)),
              landmark: Number((g("sourceLandmark") / sourceTotal).toFixed(4)),
              localFallback: Number(
                (g("sourceLocalFallback") / sourceTotal).toFixed(4),
              ),
            }
          : null,
    },
    latencyMs: {
      avg: g("latencyCount") ? Math.round(g("latencySum") / g("latencyCount")) : null,
      p95: null,
    },
    breakdowns: { byIssue },
  };
}
