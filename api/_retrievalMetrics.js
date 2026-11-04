// api/_retrievalMetrics.js
// Shared retrieval metrics payload builder + logger for case-law telemetry.

import { createLog } from "./_logging.js";
import {
  getWindowSnapshot,
  recordRetrievalMetricsEvent,
} from "./_retrievalHealthStore.js";
import { classifyEvent, normalizeEvent } from "./_retrievalEvents.js";
import {
  emitRetrievalAlerts,
  RETRIEVAL_ALERT_THRESHOLDS,
} from "./_retrievalThresholds.js";
import { classifyScenarioText } from "./_scenarioClassification.js";

const METRIC_FIELDS = [
  "termsTried",
  "databasesTried",
  "searchCalls",
  "candidateCount",
  "verificationCalls",
  "verifiedCount",
  "semanticFilterDropCount",
];

function toNonNegativeInt(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.floor(num);
}

function toDurationMs(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return null;
  return Math.floor(num);
}

function toReason(value) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function toNullableFloat(value, decimals = 3) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return null;
  return Number(num.toFixed(decimals));
}

function normalizeSourceMix(raw = {}) {
  return {
    ai: toNonNegativeInt(raw?.ai),
    landmark: toNonNegativeInt(raw?.landmark),
    localFallback: toNonNegativeInt(raw?.localFallback),
  };
}

function toLabel(value, maxLen = 60) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  if (!cleaned) return null;
  return cleaned.slice(0, maxLen);
}

function inferReason({ reason, finalCaseLawCount, retrievalError }) {
  const explicit = toReason(reason);
  if (explicit) return explicit;
  if (retrievalError) return "retrieval_error";
  return finalCaseLawCount > 0 ? "verified_results" : "no_verified";
}

function normalizeMetrics(retrievalMeta = {}) {
  const out = {};
  for (const field of METRIC_FIELDS) {
    out[field] = toNonNegativeInt(retrievalMeta[field]);
  }
  return out;
}

export function buildRetrievalMetrics(input = {}) {
  const {
    requestId = "unknown",
    endpoint = "unknown",
    source = "retrieval",
    retrievalMeta = {},
    retrievalLatencyMs = null,
    finalCaseLawCount = null,
    reason = "",
    retrievalError = false,
    cacheHit = false,
    filters = {},
    errorMessage = "",
    scenario = "",
  } = input;

  const metrics = normalizeMetrics(retrievalMeta);
  const sourceMix = normalizeSourceMix(retrievalMeta?.candidateSourceMix);
  const classifiedScenario = classifyScenarioText(scenario);
  const finalCount = toNonNegativeInt(
    finalCaseLawCount == null ? metrics.verifiedCount : finalCaseLawCount,
  );
  const normalizedReason = inferReason({
    reason,
    finalCaseLawCount: finalCount,
    retrievalError,
  });
  const isError =
    Boolean(retrievalError) ||
    normalizedReason === "retrieval_error" ||
    normalizedReason === "missing_api_key";
  const classId =
    toLabel(retrievalMeta?.classId, 40) ||
    (classifiedScenario.classId !== "unknown"
      ? classifiedScenario.classId
      : "general_criminal");
  const issuePrimary = toLabel(retrievalMeta?.issuePrimary, 40) || classId;

  return {
    requestId,
    event: "retrieval_metrics",
    endpoint,
    source,
    reason: normalizedReason,
    retrievalLatencyMs: toDurationMs(retrievalLatencyMs),
    finalCaseLawCount: finalCount,
    termsTried: metrics.termsTried,
    databasesTried: metrics.databasesTried,
    searchCalls: metrics.searchCalls,
    candidateCount: metrics.candidateCount,
    verificationCalls: metrics.verificationCalls,
    verifiedCount: metrics.verifiedCount,
    relevanceScoreAvg: toNullableFloat(retrievalMeta?.relevanceScoreAvg),
    fallbackPathUsed: retrievalMeta?.fallbackPathUsed === true,
    fallbackReason: toReason(retrievalMeta?.fallbackReason) || null,
    fallbackTriggerReason:
      toReason(retrievalMeta?.fallbackDiagnostics?.fallbackTriggerReason) ||
      null,
    classId,
    issuePrimary,
    retrievalPass: toLabel(retrievalMeta?.retrievalPass, 40) || null,
    prefilterConceptRescueCount: toNonNegativeInt(
      retrievalMeta?.prefilterDiagnostics?.passedByConceptRescue,
    ),
    semanticFilterDropCount: metrics.semanticFilterDropCount,
    candidateSourceMix: sourceMix,
    caseLawFilterEnabled: filters?.lawTypes?.case_law !== false,
    cacheHit: Boolean(cacheHit),
    retrievalError: isError,
    jurisdiction:
      typeof filters?.jurisdiction === "string" ? filters.jurisdiction : "all",
    courtLevel:
      typeof filters?.courtLevel === "string" ? filters.courtLevel : "all",
    dateRange:
      typeof filters?.dateRange === "string" ? filters.dateRange : "all",
    errorMessage: isError
      ? String(errorMessage || "unknown").slice(0, 200)
      : null,
  };
}

export async function logRetrievalMetrics(input = {}) {
  const payload = buildRetrievalMetrics(input);
  // The log line never carries scenario text; only the store sees it, and it
  // redacts before writing.
  console.log(createLog(payload));

  try {
    await recordRetrievalMetricsEvent({ ...payload, scenario: input.scenario });
  } catch {
    return payload;
  }

  // Alert rules read the 1h window, which costs a list read and can end in a
  // webhook POST. Only do that when this request could have moved a rate (it
  // failed or was slow), and DON'T make the caller wait: the returned promise
  // settles once the event is stored. A rare alert lost to a frozen function is
  // cheaper than adding webhook latency to the user's response.
  if (payload.source === "retrieval") {
    const event = normalizeEvent({ ts: Date.now(), ...payload });
    const slow =
      Number(payload.retrievalLatencyMs) >
      RETRIEVAL_ALERT_THRESHOLDS.p95LatencyMs1h;
    if (event && (classifyEvent(event).isFailure || slow)) {
      void evaluateAlertsInBackground(payload);
    }
  }
  return payload;
}

async function evaluateAlertsInBackground(payload) {
  try {
    const { windows } = await getWindowSnapshot();
    await emitRetrievalAlerts({
      requestId: payload.requestId,
      endpoint: payload.endpoint,
      healthSnapshot: { windows },
    });
  } catch {
    // Threshold checks must never fail the request flow.
  }
}
