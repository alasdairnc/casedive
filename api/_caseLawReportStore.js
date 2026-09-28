import { redis } from "./_rateLimit.js";
import { API_REDIS_TIMEOUT_MS } from "./_constants.js";
import { withRedisTimeout } from "./_redisTimeout.js";
import { isValidUrl } from "../src/lib/validateUrl.js";

// One key per report so each expires on its own; the privacy policy promises
// reports are deleted after REPORT_RETENTION_DAYS.
const REPORT_KEY_PREFIX = "feedback:case-law-report:v2:";
export const REPORT_RETENTION_DAYS = 90;
const REPORT_RETENTION_S = REPORT_RETENTION_DAYS * 24 * 60 * 60;
const REPORT_RETENTION_MS = REPORT_RETENTION_S * 1000;
const MAX_STORED_REPORTS = 1000;
const memoryReports = [];

function sanitizeText(value, maxLen, { required = false } = {}) {
  if (typeof value !== "string") {
    return required ? null : null;
  }

  const cleaned = value.replace(/\s+/g, " ").trim().slice(0, maxLen);
  if (!cleaned) return required ? null : null;
  return cleaned;
}

function toNonNegativeInt(value, fallback = 0) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return fallback;
  return Math.floor(num);
}

function normalizeFilters(raw = {}) {
  return {
    jurisdiction: sanitizeText(raw?.jurisdiction, 40) || "all",
    courtLevel: sanitizeText(raw?.courtLevel, 40) || "all",
    dateRange: sanitizeText(raw?.dateRange, 10) || "all",
    lawTypes: {
      criminal_code: raw?.lawTypes?.criminal_code !== false,
      case_law: raw?.lawTypes?.case_law !== false,
      civil_law: raw?.lawTypes?.civil_law !== false,
      charter: raw?.lawTypes?.charter !== false,
    },
  };
}

function normalizeCaseLawMeta(raw = {}) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;

  const normalized = {
    source: sanitizeText(raw?.source, 40),
    reason: sanitizeText(raw?.reason, 60),
    issuePrimary: sanitizeText(raw?.issuePrimary, 40),
    retrievalPass: sanitizeText(raw?.retrievalPass, 40),
    fallbackReason: sanitizeText(raw?.fallbackReason, 80),
    verifiedCount:
      typeof raw?.verifiedCount === "number"
        ? toNonNegativeInt(raw.verifiedCount, 0)
        : null,
  };

  return Object.values(normalized).some((value) => value != null)
    ? normalized
    : null;
}

export function normalizeCaseLawReport(raw = {}) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;

  const citation = sanitizeText(raw?.item?.citation, 180, { required: true });
  if (!citation) return null;

  const normalized = {
    reportId: sanitizeText(raw?.reportId, 80, { required: true }),
    reportedAt: sanitizeText(raw?.reportedAt, 40, { required: true }),
    analysisRequestId: sanitizeText(raw?.analysisRequestId, 120),
    scenarioSnippet: sanitizeText(raw?.scenarioSnippet, 280, {
      required: true,
    }),
    filters: normalizeFilters(raw?.filters),
    item: {
      citation,
      title: sanitizeText(raw?.item?.title, 180),
      court: sanitizeText(raw?.item?.court, 40),
      year: sanitizeText(raw?.item?.year, 12),
      url_canlii: isValidUrl(raw?.item?.url_canlii)
        ? raw.item.url_canlii
        : null,
      summary: sanitizeText(raw?.item?.summary, 300),
    },
    resultIndex: toNonNegativeInt(raw?.resultIndex, 0),
    reason: sanitizeText(raw?.reason, 40, { required: true }),
    note: sanitizeText(raw?.note, 300),
    caseLawMeta: normalizeCaseLawMeta(raw?.caseLawMeta),
  };

  if (!normalized.reportId || !normalized.reportedAt) return null;
  if (!normalized.scenarioSnippet || !normalized.reason) return null;

  return normalized;
}

function isWithinRetention(report, nowMs) {
  const reportedMs = Date.parse(report.reportedAt);
  return (
    Number.isFinite(reportedMs) && reportedMs > nowMs - REPORT_RETENTION_MS
  );
}

function pruneMemoryReports(nowMs) {
  const kept = memoryReports
    .filter((report) => isWithinRetention(report, nowMs))
    .slice(-MAX_STORED_REPORTS);
  memoryReports.length = 0;
  memoryReports.push(...kept);
}

function parseStoredReport(row) {
  if (typeof row !== "string") return normalizeCaseLawReport(row);
  try {
    return normalizeCaseLawReport(JSON.parse(row));
  } catch {
    return null;
  }
}

async function readRedisReports() {
  const keys = [];
  let cursor = "0";
  do {
    const [nextCursor, batch] = await withRedisTimeout(
      redis.scan(cursor, { match: `${REPORT_KEY_PREFIX}*`, count: 500 }),
      API_REDIS_TIMEOUT_MS,
    );
    keys.push(...batch);
    cursor = String(nextCursor);
  } while (cursor !== "0");

  if (keys.length === 0) return [];

  const rows = await withRedisTimeout(
    redis.mget(...keys),
    API_REDIS_TIMEOUT_MS,
  );
  return rows.map(parseStoredReport).filter(Boolean);
}

export async function recordCaseLawReport(raw = {}) {
  const normalized = normalizeCaseLawReport(raw);
  if (!normalized) {
    throw new Error("Invalid case-law report");
  }

  memoryReports.push(normalized);
  pruneMemoryReports(Date.now());

  if (!redis) return normalized;

  try {
    await withRedisTimeout(
      redis.set(
        `${REPORT_KEY_PREFIX}${normalized.reportId}`,
        JSON.stringify(normalized),
        { ex: REPORT_RETENTION_S },
      ),
      API_REDIS_TIMEOUT_MS,
    );
  } catch {
    // In-memory fallback already captured the report.
  }

  return normalized;
}

export async function getStoredCaseLawReports({ nowMs = Date.now() } = {}) {
  if (redis) {
    try {
      const reports = await readRedisReports();
      return reports
        .filter((report) => isWithinRetention(report, nowMs))
        .sort((a, b) => Date.parse(a.reportedAt) - Date.parse(b.reportedAt))
        .slice(-MAX_STORED_REPORTS);
    } catch {
      // Fall through to memory snapshot.
    }
  }

  pruneMemoryReports(nowMs);
  return memoryReports.slice();
}

export function resetInMemoryCaseLawReports() {
  memoryReports.length = 0;
}
