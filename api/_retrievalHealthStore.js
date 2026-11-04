// api/_retrievalHealthStore.js
// Retrieval health storage. Three separate shapes, each in the form that suits it:
//
//   totals   hash, HINCRBY, no TTL   lifetime counters (atomic; no read-modify-write)
//   recent   capped list, 7d TTL     the last N events, for 5m/1h windows + trendline
//   failures one hash per scenario   redacted snippet + count + review status, 30d TTL
//
// Every request is ONE pipelined round trip. Events never carry scenario text;
// the redacted snippet lives only on the failure record, and only for failures.
// Redis falls back to in-memory state in dev and when Redis is unreachable.

import { redis } from "./_rateLimit.js";
import { RETRIEVAL_HEALTH_STORE_REDIS_TIMEOUT_MS } from "./_constants.js";
import { withRedisTimeout } from "./_redisTimeout.js";
import {
  classifyEvent,
  eventIncrements,
  normalizeEvent,
  statsFromTotals,
  sumIncrements,
  toNonNegativeInt,
} from "./_retrievalEvents.js";
import {
  FINGERPRINT_PATTERN,
  redactScenario,
  scenarioFingerprint,
} from "./_scenarioRedaction.js";

const RECENT_KEY = "metrics:retrieval:recent:v3";
const TOTALS_KEY = "metrics:retrieval:totals:v3";
const FAILURE_PREFIX = "metrics:retrieval:failure:v3:";
const FAILURE_INDEX_KEY = "metrics:retrieval:failure-index:v3";

const REDIS_TIMEOUT_MS = RETRIEVAL_HEALTH_STORE_REDIS_TIMEOUT_MS;
export const RECENT_MAX_EVENTS = 1500;
const RECENT_TTL_S = 60 * 60 * 24 * 7;
const MEMORY_RETENTION_MS = 2 * 60 * 60 * 1000;
// Redacted failure snippets are deleted after this long without a repeat.
export const FAILURE_RETENTION_DAYS = 30;
const FAILURE_TTL_S = FAILURE_RETENTION_DAYS * 24 * 60 * 60;
const FAILURE_INDEX_MAX = 300;
const NOTE_MAX_CHARS = 280;

export const FAILURE_STATUSES = ["new", "reviewed", "promoted", "ignored"];

export const RETRIEVAL_WINDOWS = {
  "5m": 5 * 60 * 1000,
  "1h": 60 * 60 * 1000,
};

const mem = {
  recent: [],
  totals: {},
  failures: new Map(),
};

export function resetMemoryStoreForTests() {
  mem.recent = [];
  mem.totals = {};
  mem.failures = new Map();
}

function guarded(promise) {
  return withRedisTimeout(promise, REDIS_TIMEOUT_MS);
}

// ---- event building ---------------------------------------------------------

function buildStoredEvent(payload = {}) {
  return normalizeEvent({
    ts: Date.now(),
    endpoint: payload.endpoint,
    source: payload.source,
    reason: payload.reason,
    retrievalError:
      payload.retrievalError === true ||
      payload.reason === "retrieval_error" ||
      payload.reason === "missing_api_key",
    caseLawFilterEnabled: payload.caseLawFilterEnabled !== false,
    cacheHit: payload.cacheHit === true,
    retrievalLatencyMs: payload.retrievalLatencyMs,
    finalCaseLawCount: payload.finalCaseLawCount,
    verifiedCount: payload.verifiedCount,
    relevanceScoreAvg: payload.relevanceScoreAvg,
    fallbackPathUsed: payload.fallbackPathUsed === true,
    fallbackTriggerReason: payload.fallbackTriggerReason,
    issuePrimary: payload.issuePrimary,
    classId: payload.classId,
    retrievalPass: payload.retrievalPass,
    prefilterConceptRescueCount: payload.prefilterConceptRescueCount,
    semanticFilterDropCount: payload.semanticFilterDropCount,
    candidateSourceMix: payload.candidateSourceMix,
    errorMessage: payload.errorMessage,
  });
}

// The failure record for an event, or null when there's nothing to review (not
// a failure, or no scenario text to fingerprint). Redaction happens HERE, before
// anything is written, so no caller can store raw text by mistake.
function buildFailureRecord(event, rawScenario) {
  if (!classifyEvent(event).isFailure) return null;
  const snippet = redactScenario(rawScenario);
  const id = scenarioFingerprint(snippet);
  if (!id) return null;
  return {
    id,
    snippet,
    reason: event.reason,
    classId: event.classId,
    issuePrimary: event.issuePrimary,
    finalCaseLawCount: Math.max(event.finalCaseLawCount, event.verifiedCount),
    latencyMs: event.retrievalLatencyMs,
    fallbackPathUsed: event.fallbackPathUsed,
    errorMessage: event.errorMessage,
    ts: event.ts,
  };
}

// ---- failure records --------------------------------------------------------

function failureFromHash(id, hash) {
  if (!hash || typeof hash !== "object" || Object.keys(hash).length === 0) {
    return null;
  }
  const str = (v, fallback = "") => (v == null ? fallback : String(v));
  const num = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  const status = FAILURE_STATUSES.includes(str(hash.status))
    ? str(hash.status)
    : "new";
  const first = num(hash.firstSeen);
  const last = num(hash.lastSeen);
  return {
    id,
    snippet: str(hash.snippet),
    reason: str(hash.reason, "unknown"),
    classId: str(hash.classId, "general_criminal"),
    issuePrimary: str(hash.issuePrimary, "general_criminal"),
    count: toNonNegativeInt(hash.count) || 1,
    firstSeen: first ? new Date(first).toISOString() : null,
    lastSeen: last ? new Date(last).toISOString() : null,
    status,
    note: str(hash.note) || null,
    reviewedAt: num(hash.reviewedAt)
      ? new Date(num(hash.reviewedAt)).toISOString()
      : null,
    finalCaseLawCount: toNonNegativeInt(hash.finalCaseLawCount),
    latencyMs: num(hash.latencyMs),
    fallbackPathUsed: String(hash.fallbackPathUsed) === "1",
    errorMessage: str(hash.errorMessage) || null,
  };
}

function writeFailureMemory(f) {
  const existing = mem.failures.get(f.id);
  if (existing) {
    existing.count += 1;
    existing.lastSeen = f.ts;
    existing.reason = f.reason;
    existing.classId = f.classId;
    existing.issuePrimary = f.issuePrimary;
    existing.finalCaseLawCount = f.finalCaseLawCount;
    existing.latencyMs = f.latencyMs;
    existing.fallbackPathUsed = f.fallbackPathUsed ? "1" : "0";
    existing.errorMessage = f.errorMessage;
    return;
  }
  mem.failures.set(f.id, {
    snippet: f.snippet,
    reason: f.reason,
    classId: f.classId,
    issuePrimary: f.issuePrimary,
    count: 1,
    firstSeen: f.ts,
    lastSeen: f.ts,
    status: "new",
    finalCaseLawCount: f.finalCaseLawCount,
    latencyMs: f.latencyMs,
    fallbackPathUsed: f.fallbackPathUsed ? "1" : "0",
    errorMessage: f.errorMessage,
  });
  // Keep the in-memory queue bounded like the Redis index.
  if (mem.failures.size > FAILURE_INDEX_MAX) {
    const oldest = [...mem.failures.entries()].sort(
      (a, b) => a[1].lastSeen - b[1].lastSeen,
    )[0];
    if (oldest) mem.failures.delete(oldest[0]);
  }
}

function defined(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined),
  );
}

// ---- write path -------------------------------------------------------------

async function writeRedis(event, failure) {
  const pipe = redis.pipeline();
  pipe.rpush(RECENT_KEY, JSON.stringify(event));
  pipe.ltrim(RECENT_KEY, -RECENT_MAX_EVENTS, -1);
  pipe.expire(RECENT_KEY, RECENT_TTL_S);

  for (const [field, n] of Object.entries(eventIncrements(event))) {
    pipe.hincrby(TOTALS_KEY, field, n);
  }
  pipe.hsetnx(TOTALS_KEY, "firstTs", event.ts);
  pipe.hset(TOTALS_KEY, { lastTs: event.ts });

  if (failure) {
    const key = FAILURE_PREFIX + failure.id;
    // First sighting only: these must survive repeats and later triage.
    pipe.hsetnx(key, "snippet", failure.snippet);
    pipe.hsetnx(key, "firstSeen", failure.ts);
    pipe.hsetnx(key, "status", "new");
    pipe.hset(
      key,
      defined({
        lastSeen: failure.ts,
        reason: failure.reason,
        classId: failure.classId,
        issuePrimary: failure.issuePrimary,
        finalCaseLawCount: failure.finalCaseLawCount,
        latencyMs: failure.latencyMs,
        fallbackPathUsed: failure.fallbackPathUsed ? "1" : "0",
        errorMessage: failure.errorMessage,
      }),
    );
    pipe.hincrby(key, "count", 1);
    pipe.expire(key, FAILURE_TTL_S);
    pipe.zadd(FAILURE_INDEX_KEY, { score: failure.ts, member: failure.id });
    // Bound the queue: drop the least recently seen beyond the cap.
    pipe.zremrangebyrank(FAILURE_INDEX_KEY, 0, -(FAILURE_INDEX_MAX + 1));
  }

  await guarded(pipe.exec());
}

function writeMemory(event, failure) {
  mem.recent.push(event);
  const cutoff = event.ts - MEMORY_RETENTION_MS;
  while (mem.recent.length > 0 && mem.recent[0].ts < cutoff) mem.recent.shift();
  if (mem.recent.length > RECENT_MAX_EVENTS) {
    mem.recent.splice(0, mem.recent.length - RECENT_MAX_EVENTS);
  }
  for (const [field, n] of Object.entries(eventIncrements(event))) {
    mem.totals[field] = (mem.totals[field] || 0) + n;
  }
  mem.totals.firstTs = mem.totals.firstTs
    ? Math.min(mem.totals.firstTs, event.ts)
    : event.ts;
  mem.totals.lastTs = Math.max(mem.totals.lastTs || 0, event.ts);
  if (failure) writeFailureMemory(failure);
}

/**
 * Record one retrieval event. `payload.scenario` is optional raw text: it is
 * redacted here and kept only if the event is a failure.
 */
export async function recordRetrievalMetricsEvent(payload = {}) {
  const event = buildStoredEvent(payload);
  if (!event) return false;
  const failure = buildFailureRecord(event, payload.scenario);

  if (redis) {
    try {
      await writeRedis(event, failure);
      return true;
    } catch {
      // fall through to the in-memory store
    }
  }
  writeMemory(event, failure);
  return true;
}

// ---- read path --------------------------------------------------------------

export async function getRecentEvents({ limit = RECENT_MAX_EVENTS } = {}) {
  const max = Math.min(Math.max(1, limit), RECENT_MAX_EVENTS);
  let events;
  if (redis) {
    try {
      const rows = await guarded(redis.lrange(RECENT_KEY, -max, -1));
      events = (Array.isArray(rows) ? rows : [])
        .map(normalizeEvent)
        .filter(Boolean);
    } catch {
      events = mem.recent.slice(-max);
    }
  } else {
    events = mem.recent.slice(-max);
  }
  return events.sort((a, b) => a.ts - b.ts);
}

function percentile(values, pct) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.max(0, Math.ceil(pct * sorted.length) - 1);
  return sorted[Math.min(index, sorted.length - 1)];
}

function computeWindowStats(events, nowMs, windowMs) {
  const cutoff = nowMs - windowMs;
  const inWindow = events.filter((e) => e.ts >= cutoff);
  const stats = statsFromTotals(sumIncrements(inWindow));
  const latencies = inWindow
    .filter((e) => classifyEvent(e).operational)
    .map((e) => e.retrievalLatencyMs)
    .filter((v) => Number.isFinite(v));
  stats.latencyMs.p95 = percentile(latencies, 0.95);
  const last = inWindow[inWindow.length - 1];
  stats.lastEventAt = last ? new Date(last.ts).toISOString() : null;
  return stats;
}

export function buildTrendline(
  events,
  { nowMs = Date.now(), buckets = 15, bucketMs = 5 * 60 * 1000 } = {},
) {
  const windowStart = nowMs - buckets * bucketMs;
  const out = [];
  for (let i = 0; i < buckets; i++) {
    const start = windowStart + i * bucketMs;
    const end = start + bucketMs;
    const totals = sumIncrements(
      events.filter((e) => e.ts >= start && e.ts < end),
    );
    const operational = totals.operational || 0;
    const quality = totals.quality || 0;
    out.push({
      ts: end,
      errorRate: operational
        ? Number(((totals.errors || 0) / operational).toFixed(4))
        : null,
      noVerifiedRate: quality
        ? Number(((totals.noVerified || 0) / quality).toFixed(4))
        : null,
      avgLatencyMs: totals.latencyCount
        ? Math.round(totals.latencySum / totals.latencyCount)
        : null,
    });
  }
  return out;
}

export async function getTrendlineSnapshots(opts = {}) {
  const events = await getRecentEvents();
  return buildTrendline(events, opts);
}

async function getAlltimeStats() {
  let totals = null;
  if (redis) {
    try {
      const hash = await guarded(redis.hgetall(TOTALS_KEY));
      if (hash && Object.keys(hash).length > 0) totals = hash;
    } catch {
      // fall back to in-memory totals
    }
  }
  if (!totals) totals = mem.totals;

  const stats = statsFromTotals(totals);
  const firstTs = Number(totals.firstTs);
  const lastTs = Number(totals.lastTs);
  stats.firstEventAt =
    Number.isFinite(firstTs) && firstTs > 0
      ? new Date(firstTs).toISOString()
      : null;
  stats.lastEventAt =
    Number.isFinite(lastTs) && lastTs > 0 ? new Date(lastTs).toISOString() : null;
  return stats;
}

/** 5m/1h windows only. Cheap enough for the alert check on a failing request. */
export async function getWindowSnapshot({ nowMs = Date.now() } = {}) {
  const events = await getRecentEvents();
  const windows = {};
  for (const [label, windowMs] of Object.entries(RETRIEVAL_WINDOWS)) {
    windows[label] = computeWindowStats(events, nowMs, windowMs);
  }
  return { events, windows };
}

export async function getRetrievalHealthSnapshot({ nowMs = Date.now() } = {}) {
  const [{ events, windows }, alltime] = await Promise.all([
    getWindowSnapshot({ nowMs }),
    getAlltimeStats(),
  ]);
  return {
    generatedAt: new Date(nowMs).toISOString(),
    snapshotSource: alltime.samples.total > 0 ? "primary" : "empty",
    retentionMs: redis ? RECENT_TTL_S * 1000 : MEMORY_RETENTION_MS,
    historyMode: redis ? "counters_plus_recent" : "memory_rolling",
    historyMaxEvents: RECENT_MAX_EVENTS,
    totalStoredEvents: alltime.samples.total,
    windows,
    alltime,
    trendline: buildTrendline(events, { nowMs }),
  };
}

// ---- failure queue ----------------------------------------------------------

async function readAllFailures() {
  if (redis) {
    try {
      const ids = await guarded(
        redis.zrange(FAILURE_INDEX_KEY, 0, -1, { rev: true }),
      );
      const list = (Array.isArray(ids) ? ids : []).map(String);
      if (list.length === 0) return [];
      const pipe = redis.pipeline();
      for (const id of list) pipe.hgetall(FAILURE_PREFIX + id);
      const rows = await guarded(pipe.exec());
      const items = [];
      const expired = [];
      list.forEach((id, i) => {
        const item = failureFromHash(id, rows[i]);
        if (item) items.push(item);
        else expired.push(id);
      });
      if (expired.length > 0) {
        // Records expire on their own; drop their index entries lazily.
        guarded(redis.zrem(FAILURE_INDEX_KEY, ...expired)).catch(() => {});
      }
      return items;
    } catch {
      // fall through to memory
    }
  }
  return [...mem.failures.entries()]
    .map(([id, rec]) => failureFromHash(id, rec))
    .filter(Boolean)
    .sort((a, b) => Date.parse(b.lastSeen) - Date.parse(a.lastSeen));
}

/**
 * The review queue. `status` is one of FAILURE_STATUSES or "all". Counts are
 * always for the whole queue so the UI can label every tab.
 */
export async function getFailureQueue({
  status = "new",
  offset = 0,
  limit = 20,
} = {}) {
  const all = await readAllFailures();
  const counts = { all: all.length };
  for (const s of FAILURE_STATUSES) counts[s] = 0;
  for (const item of all) counts[item.status] += 1;

  const filtered =
    status === "all" ? all : all.filter((item) => item.status === status);
  const safeLimit = Math.min(100, Math.max(1, Math.floor(Number(limit)) || 20));
  const safeOffset = Math.max(0, Math.floor(Number(offset)) || 0);
  const items = filtered.slice(safeOffset, safeOffset + safeLimit);
  const next = safeOffset + items.length;

  return {
    items,
    counts,
    total: filtered.length,
    hasMore: filtered.length > next,
    nextOffset: filtered.length > next ? next : null,
    limit: safeLimit,
    offset: safeOffset,
    retentionDays: FAILURE_RETENTION_DAYS,
  };
}

/**
 * Triage one failure. Returns the updated record, or null when the id is
 * unknown or has expired. Validation is strict because this is a write path.
 */
export async function setFailureStatus(id, { status, note } = {}) {
  if (typeof id !== "string" || !FINGERPRINT_PATTERN.test(id)) return null;
  if (!FAILURE_STATUSES.includes(status)) return null;
  const cleanNote =
    typeof note === "string"
      ? note.replace(/\s+/g, " ").trim().slice(0, NOTE_MAX_CHARS)
      : "";
  const reviewedAt = Date.now();

  if (redis) {
    try {
      const key = FAILURE_PREFIX + id;
      const exists = await guarded(redis.exists(key));
      if (!exists) return null;
      // An empty note clears an old one rather than being skipped.
      await guarded(
        redis.hset(key, { status, note: cleanNote, reviewedAt }),
      );
      const hash = await guarded(redis.hgetall(key));
      return failureFromHash(id, hash);
    } catch {
      // fall through to memory
    }
  }
  const rec = mem.failures.get(id);
  if (!rec) return null;
  rec.status = status;
  rec.note = cleanNote;
  rec.reviewedAt = reviewedAt;
  return failureFromHash(id, rec);
}
