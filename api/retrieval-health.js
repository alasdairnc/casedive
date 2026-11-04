// /api/retrieval-health.js — Internal retrieval health + alert status endpoint.

import { randomUUID, timingSafeEqual } from "crypto";
import { checkRateLimit, getClientIp, rateLimitHeaders } from "./_rateLimit.js";
import {
  FAILURE_STATUSES,
  getFailureQueue,
  getRetrievalHealthSnapshot,
  setFailureStatus,
} from "./_retrievalHealthStore.js";
import { FINGERPRINT_PATTERN } from "./_scenarioRedaction.js";
import {
  evaluateRetrievalAlerts,
  RETRIEVAL_ALERT_THRESHOLDS,
} from "./_retrievalThresholds.js";
import { buildRetrievalImprovements } from "./_retrievalImprovements.js";
import {
  applyStandardApiHeaders,
  handleOptionsAndMethod,
  respondRateLimit,
  validateJsonRequest,
} from "./_apiCommon.js";
import {
  logRequestStart,
  logRateLimitCheck,
  logValidationError,
  logSuccess,
  logError,
} from "./_logging.js";

const MAX_FAILURE_ARCHIVE_LIMIT = 100;
const MAX_FAILURE_ARCHIVE_OFFSET = 1000;

function parseBoundedInt(value, fallback, min, max) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  const int = Math.floor(num);
  if (int < min) return fallback;
  return Math.min(max, int);
}

function isAuthorized(req) {
  const expectedToken = process.env.RETRIEVAL_HEALTH_TOKEN || "";
  if (!expectedToken) {
    // Secure by default: lock endpoint if token is not configured.
    return false;
  }
  const authHeader = req.headers.authorization || "";
  const expected = `Bearer ${expectedToken}`;
  if (authHeader.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(authHeader), Buffer.from(expected));
}

const NOTE_MAX_CHARS = 280;
const TRIAGE_BODY_MAX_BYTES = 2_000;

function parseQuery(req) {
  try {
    const url = new URL(
      req.url || "http://localhost/api/retrieval-health",
      "http://localhost",
    );
    const status = url.searchParams.get("status");
    return {
      status: status === "all" || FAILURE_STATUSES.includes(status)
        ? status
        : "new",
      limit: parseBoundedInt(
        url.searchParams.get("failureLimit"),
        20,
        1,
        MAX_FAILURE_ARCHIVE_LIMIT,
      ),
      offset: parseBoundedInt(
        url.searchParams.get("failuresOffset"),
        0,
        0,
        MAX_FAILURE_ARCHIVE_OFFSET,
      ),
    };
  } catch {
    return { status: "new", limit: 20, offset: 0 };
  }
}

// POST { id, status, note? }: triage one failed scenario. Strict on purpose:
// the id must be a fingerprint we minted, the status a known value, the note
// short plain text. Nothing here can create a failure record, only update one.
function parseTriageBody(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const { id, status, note } = body;
  if (typeof id !== "string" || !FINGERPRINT_PATTERN.test(id)) return null;
  if (!FAILURE_STATUSES.includes(status)) return null;
  if (note !== undefined && note !== null) {
    if (typeof note !== "string" || note.length > NOTE_MAX_CHARS) return null;
  }
  return { id, status, note: typeof note === "string" ? note : "" };
}

export default async function handler(req, res) {
  const requestId = req.headers["x-vercel-id"] || randomUUID();
  const startMs = Date.now();
  logRequestStart(req, "retrieval-health", requestId);

  applyStandardApiHeaders(
    req,
    res,
    "GET, POST, OPTIONS",
    "Authorization, Content-Type",
  );
  if (handleOptionsAndMethod(req, res, ["GET", "POST"])) return;

  const rlResult = await checkRateLimit(getClientIp(req), "retrieval-health");
  logRateLimitCheck(requestId, "retrieval-health", rlResult, getClientIp(req));
  const rlHeaders = rateLimitHeaders(rlResult);
  Object.entries(rlHeaders).forEach(([key, value]) =>
    res.setHeader(key, value),
  );
  if (respondRateLimit(res, rlResult)) return;

  if (!isAuthorized(req)) {
    logValidationError(
      requestId,
      "retrieval-health",
      "Unauthorized retrieval health request",
      "authorization",
    );
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    if (req.method === "POST") {
      if (
        !validateJsonRequest(req, res, {
          requestId,
          endpoint: "retrieval-health",
          maxBytes: TRIAGE_BODY_MAX_BYTES,
          logValidationError,
        })
      ) {
        return;
      }
      const triage = parseTriageBody(req.body);
      if (!triage) {
        logValidationError(
          requestId,
          "retrieval-health",
          "Invalid triage body",
          "body",
        );
        return res.status(400).json({ error: "Invalid request" });
      }
      const updated = await setFailureStatus(triage.id, triage);
      if (!updated) return res.status(404).json({ error: "Not found" });
      logSuccess(
        requestId,
        "retrieval-health",
        200,
        Date.now() - startMs,
        rlResult,
        { triage: triage.status },
      );
      return res.status(200).json({ failure: updated });
    }

    // No response cache: this is a live view and triage must show on reload.
    const query = parseQuery(req);
    const [snapshot, failures] = await Promise.all([
      getRetrievalHealthSnapshot(),
      getFailureQueue(query),
    ]);
    const alerts = evaluateRetrievalAlerts(snapshot);
    // Suggestions come from the whole open backlog, not just the page shown.
    const backlog =
      query.status === "new" && !failures.hasMore && query.offset === 0
        ? failures.items
        : (await getFailureQueue({ status: "new", limit: 100 })).items;
    const improvements = buildRetrievalImprovements(backlog);

    const response = {
      generatedAt: snapshot.generatedAt,
      snapshotSource: snapshot.snapshotSource,
      retentionMs: snapshot.retentionMs,
      historyMode: snapshot.historyMode,
      historyMaxEvents: snapshot.historyMaxEvents,
      totalStoredEvents: snapshot.totalStoredEvents,
      windows: snapshot.windows,
      alltime: snapshot.alltime,
      trendline: snapshot.trendline,
      failures,
      improvements,
      thresholds: RETRIEVAL_ALERT_THRESHOLDS,
      alerts,
    };

    logSuccess(
      requestId,
      "retrieval-health",
      200,
      Date.now() - startMs,
      rlResult,
      {
        alerts: alerts.length,
        totalStoredEvents: snapshot.totalStoredEvents,
      },
    );

    return res.status(200).json(response);
  } catch (err) {
    const statusCode = err.status
      ? err.status >= 500
        ? 502
        : err.status
      : 500;
    logError(
      requestId,
      "retrieval-health",
      err,
      statusCode,
      Date.now() - startMs,
    );
    return res.status(statusCode).json({ error: "Internal server error" });
  }
}
