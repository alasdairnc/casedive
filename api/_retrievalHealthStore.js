// api/_retrievalHealthStore.js
// Retrieval health storage. Separate shapes, each in the form that suits it:
//
//   totals    hash, HINCRBY, no TTL    lifetime counters (atomic; no read-modify-write)
//   recent    capped list, 7d TTL      the last N events, for 5m/1h windows + trendline
//   failure   one hash per scenario    STRUCTURED features only (class, matched legal
//                                      concepts, retrieval diagnostics, review status),
//                                      30d TTL refreshed on repeats. No scenario text.
//   text      one string per scenario  the redacted, name-masked snippet. Written once
//                                      (SET NX) with a fixed 14d expiry that repeats do
//                                      NOT extend, and deleted when the failure is
//                                      reviewed or ignored.
//
// Every request is ONE pipelined round trip (failures add one status read first).
// Events never carry scenario text. Redis falls back to in-memory state in dev
// and when Redis is unreachable.

import { redis } from "./_rateLimit.js";
import { RETRIEVAL_HEALTH_STORE_REDIS_TIMEOUT_MS } from "./_constants.js";
import { withRedisTimeout } from "./_redisTimeout.js";
import {
  classifyEvent,
  eventIncrements,
  normalizeEvent,
  safeErrorLabel,
  statsFromTotals,
  sumIncrements,
  toNonNegativeInt,
} from "./_retrievalEvents.js";
import {
  FINGERPRINT_PATTERN,
  redactScenario,
  scenarioFingerprint,
} from "./_scenarioRedaction.js";
import { extractLegalConcepts } from "./_legalConcepts.js";
import { stripNegatedEvents } from "./_textUtils.js";

const RECENT_KEY = "metrics:retrieval:recent:v3";
const TOTALS_KEY = "metrics:retrieval:totals:v3";
const FAILURE_PREFIX = "metrics:retrieval:failure:v3:";
const TEXT_PREFIX = "metrics:retrieval:failure-text:v3:";
const FAILURE_INDEX_KEY = "metrics:retrieval:failure-index:v3";

const REDIS_TIMEOUT_MS = RETRIEVAL_HEALTH_STORE_REDIS_TIMEOUT_MS;
export const RECENT_MAX_EVENTS = 1500;
const RECENT_TTL_S = 60 * 60 * 24 * 7;
const MEMORY_RETENTION_MS = 2 * 60 * 60 * 1000;
// Structured failure records (no text) are deleted after this long without a repeat.
export const FAILURE_RETENTION_DAYS = 30;
const FAILURE_TTL_S = FAILURE_RETENTION_DAYS * 24 * 60 * 60;
// The redacted text is deleted this long after it was FIRST captured, whatever
// happens next: repeats do not extend it.
export const FAILURE_TEXT_RETENTION_DAYS = 14;
const FAILURE_TEXT_TTL_S = FAILURE_TEXT_RETENTION_DAYS * 24 * 60 * 60;
const FAILURE_INDEX_MAX = 300;
const NOTE_MAX_CHARS = 280;

export const FAILURE_STATUSES = ["new", "reviewed", "promoted", "ignored"];
// Statuses that mean "a human has dealt with this": text is erased, and repeats
// of the same scenario never store text again.
const TEXT_ERASING_STATUSES = new Set(["reviewed", "ignored"]);

export const RETRIEVAL_WINDOWS = {
  "5m": 5 * 60 * 1000,
  "1h": 60 * 60 * 1000,
};

const mem = {
  recent: [],
  totals: {},
  failures: new Map(),
  // id -> { text, expiresAt }
  texts: new Map(),
};

export function resetMemoryStoreForTests() {
  mem.recent = [];
  mem.totals = {};
  mem.failures = new Map();
  mem.texts = new Map();
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
    // A fixed label, never the raw message (it can echo the query).
    errorMessage: safeErrorLabel(payload.errorMessage),
  });
}

function lengthBucket(chars) {
  if (chars < 60) return "short";
  if (chars < 200) return "medium";
  return "long";
}

// The review record for an event, or null when there's nothing to review (not a
// failure or an out-of-scope answer, or no scenario text to fingerprint). Everything here that comes
// from the scenario is either a controlled-vocabulary label (legal concepts), a
// coarse bucket, or the redacted snippet, which is kept apart (see TEXT_PREFIX).
// Redaction happens HERE, before anything is written, so no caller can store raw
// text by mistake.
function buildFailureRecord(event, payload) {
  if (!classifyEvent(event).isReviewable) return null;
  const rawScenario = payload.scenario;
  const snippet = redactScenario(rawScenario);
  const id = scenarioFingerprint(snippet);
  if (!id) return null;

  // Same negation handling as retrieval ("there was no search" is not a search).
  const concepts = [...extractLegalConcepts(stripNegatedEvents(rawScenario))]
    .sort()
    .join(",");

  return {
    id,
    snippet,
    concepts,
    lengthBucket: lengthBucket(String(rawScenario).trim().length),
    reason: event.reason,
    classId: event.classId,
    issuePrimary: event.issuePrimary,
    finalCaseLawCount: Math.max(event.finalCaseLawCount, event.verifiedCount),
    latencyMs: event.retrievalLatencyMs,
    fallbackPathUsed: event.fallbackPathUsed,
    fallbackTriggerReason: event.fallbackTriggerReason,
    retrievalPass: event.retrievalPass,
    semanticFilterDropCount: event.semanticFilterDropCount,
    termsTried: toNonNegativeInt(payload.termsTried),
    candidateCount: toNonNegativeInt(payload.candidateCount),
    verificationCalls: toNonNegativeInt(payload.verificationCalls),
    errorMessage: event.errorMessage,
    ts: event.ts,
  };
}

// ---- failure records --------------------------------------------------------

function asText(value) {
  if (value == null) return null;
  // @upstash/redis JSON-parses what it reads, so a digits-only snippet comes
  // back as a number and one that looks like JSON as an object.
  return typeof value === "string" ? value : JSON.stringify(value);
}

function failureFromHash(id, hash, text) {
  if (!hash || typeof hash !== "object" || Object.keys(hash).length === 0) {
    return null;
  }
  const str = (v, fallback = "") => (v == null ? fallback : String(v));
  const num = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };
  const iso = (v) => (num(v) ? new Date(num(v)).toISOString() : null);
  const status = FAILURE_STATUSES.includes(str(hash.status))
    ? str(hash.status)
    : "new";
  const snippet = asText(text);
  // "present", "erased" (a reviewer deleted it) or "expired" (aged out).
  const textState = snippet
    ? "present"
    : num(hash.textErasedAt)
      ? "erased"
      : "expired";

  return {
    id,
    // Never read a `snippet` field off the hash: records written before the text
    // moved to its own key may still carry one, and it must not be shown.
    snippet,
    textState,
    concepts: str(hash.concepts)
      ? str(hash.concepts).split(",").filter(Boolean)
      : [],
    lengthBucket: str(hash.lengthBucket) || null,
    reason: str(hash.reason, "unknown"),
    classId: str(hash.classId, "general_criminal"),
    issuePrimary: str(hash.issuePrimary, "general_criminal"),
    count: toNonNegativeInt(hash.count) || 1,
    firstSeen: iso(hash.firstSeen),
    lastSeen: iso(hash.lastSeen),
    status,
    note: str(hash.note) || null,
    reviewedAt: iso(hash.reviewedAt),
    finalCaseLawCount: toNonNegativeInt(hash.finalCaseLawCount),
    latencyMs: num(hash.latencyMs),
    fallbackPathUsed: String(hash.fallbackPathUsed) === "1",
    fallbackTriggerReason: str(hash.fallbackTriggerReason) || null,
    retrievalPass: str(hash.retrievalPass) || null,
    diagnostics: {
      termsTried: toNonNegativeInt(hash.termsTried),
      candidateCount: toNonNegativeInt(hash.candidateCount),
      verificationCalls: toNonNegativeInt(hash.verificationCalls),
      semanticFilterDropCount: toNonNegativeInt(hash.semanticFilterDropCount),
    },
    errorMessage: str(hash.errorMessage) || null,
  };
}

function defined(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined),
  );
}

// The structured fields that are refreshed on every sighting.
function latestFields(f) {
  return defined({
    lastSeen: f.ts,
    reason: f.reason,
    classId: f.classId,
    issuePrimary: f.issuePrimary,
    concepts: f.concepts || null,
    lengthBucket: f.lengthBucket,
    finalCaseLawCount: f.finalCaseLawCount,
    latencyMs: f.latencyMs,
    fallbackPathUsed: f.fallbackPathUsed ? "1" : "0",
    fallbackTriggerReason: f.fallbackTriggerReason,
    retrievalPass: f.retrievalPass,
    semanticFilterDropCount: f.semanticFilterDropCount,
    termsTried: f.termsTried,
    candidateCount: f.candidateCount,
    verificationCalls: f.verificationCalls,
    errorMessage: f.errorMessage,
  });
}

function writeFailureMemory(f, textAllowed) {
  const existing = mem.failures.get(f.id);
  if (existing) {
    existing.count += 1;
    Object.assign(existing, latestFields(f), {
      fallbackPathUsed: f.fallbackPathUsed ? "1" : "0",
    });
  } else {
    mem.failures.set(f.id, {
      ...latestFields(f),
      count: 1,
      firstSeen: f.ts,
      status: "new",
    });
    // Keep the in-memory queue bounded like the Redis index.
    if (mem.failures.size > FAILURE_INDEX_MAX) {
      const oldest = [...mem.failures.entries()].sort(
        (a, b) => Number(a[1].lastSeen) - Number(b[1].lastSeen),
      )[0];
      if (oldest) {
        mem.failures.delete(oldest[0]);
        mem.texts.delete(oldest[0]);
      }
    }
  }
  // SET NX semantics: the first capture wins and its expiry is never extended.
  const held = mem.texts.get(f.id);
  const live = held && held.expiresAt > Date.now();
  if (textAllowed && !live) {
    mem.texts.set(f.id, {
      text: f.snippet,
      expiresAt: Date.now() + FAILURE_TEXT_TTL_S * 1000,
    });
  }
}

function memoryText(id) {
  const held = mem.texts.get(id);
  if (!held) return null;
  if (held.expiresAt <= Date.now()) {
    mem.texts.delete(id);
    return null;
  }
  return held.text;
}

// ---- write path -------------------------------------------------------------

// Whether text may be stored for this scenario. Fails CLOSED: if the status
// can't be read, no text is written, so a flaky read can never re-store text for
// a scenario a reviewer already dealt with.
async function textAllowedFor(id) {
  try {
    const status = await guarded(redis.hget(FAILURE_PREFIX + id, "status"));
    return !TEXT_ERASING_STATUSES.has(status == null ? "" : String(status));
  } catch {
    return false;
  }
}

async function writeRedis(event, failure) {
  const textAllowed = failure ? await textAllowedFor(failure.id) : false;

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
    pipe.hsetnx(key, "firstSeen", failure.ts);
    pipe.hsetnx(key, "status", "new");
    pipe.hset(key, latestFields(failure));
    pipe.hincrby(key, "count", 1);
    pipe.expire(key, FAILURE_TTL_S);
    pipe.zadd(FAILURE_INDEX_KEY, { score: failure.ts, member: failure.id });
    // Bound the queue: drop the least recently seen beyond the cap.
    pipe.zremrangebyrank(FAILURE_INDEX_KEY, 0, -(FAILURE_INDEX_MAX + 1));
    if (textAllowed) {
      // NX + a fixed EX: the first capture sets the clock and repeats never
      // extend it, so text lives at most FAILURE_TEXT_RETENTION_DAYS.
      pipe.set(TEXT_PREFIX + failure.id, failure.snippet, {
        nx: true,
        ex: FAILURE_TEXT_TTL_S,
      });
    }
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
  if (failure) {
    const status = mem.failures.get(failure.id)?.status;
    writeFailureMemory(failure, !TEXT_ERASING_STATUSES.has(status));
  }
}

/**
 * Record one retrieval event. `payload.scenario` is optional raw text: it is
 * redacted here and kept only if the event is a failure.
 */
export async function recordRetrievalMetricsEvent(payload = {}) {
  const event = buildStoredEvent(payload);
  if (!event) return false;
  const failure = buildFailureRecord(event, payload);

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
      for (const id of list) {
        pipe.hgetall(FAILURE_PREFIX + id);
        pipe.get(TEXT_PREFIX + id);
      }
      const rows = await guarded(pipe.exec());
      const items = [];
      const expired = [];
      list.forEach((id, i) => {
        const item = failureFromHash(id, rows[i * 2], rows[i * 2 + 1]);
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
    .map(([id, rec]) => failureFromHash(id, rec, memoryText(id)))
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
    textRetentionDays: FAILURE_TEXT_RETENTION_DAYS,
  };
}

/**
 * Triage one failure. Returns the updated record, or null when the id is
 * unknown or has expired. Validation is strict because this is a write path.
 * Marking a failure reviewed or ignored ERASES its stored text.
 */
export async function setFailureStatus(id, { status, note } = {}) {
  if (typeof id !== "string" || !FINGERPRINT_PATTERN.test(id)) return null;
  if (!FAILURE_STATUSES.includes(status)) return null;
  const cleanNote =
    typeof note === "string"
      ? note.replace(/\s+/g, " ").trim().slice(0, NOTE_MAX_CHARS)
      : "";
  const reviewedAt = Date.now();
  const erase = TEXT_ERASING_STATUSES.has(status);

  if (redis) {
    try {
      const key = FAILURE_PREFIX + id;
      const exists = await guarded(redis.exists(key));
      if (!exists) return null;
      const pipe = redis.pipeline();
      // An empty note clears an old one rather than being skipped.
      pipe.hset(
        key,
        erase
          ? { status, note: cleanNote, reviewedAt, textErasedAt: reviewedAt }
          : { status, note: cleanNote, reviewedAt },
      );
      if (erase) pipe.del(TEXT_PREFIX + id);
      pipe.hgetall(key);
      pipe.get(TEXT_PREFIX + id);
      const rows = await guarded(pipe.exec());
      // Results come back in command order: hset, [del], hgetall, get.
      const hashAt = erase ? 2 : 1;
      return failureFromHash(id, rows[hashAt], rows[hashAt + 1]);
    } catch {
      // fall through to memory
    }
  }
  const rec = mem.failures.get(id);
  if (!rec) return null;
  rec.status = status;
  rec.note = cleanNote;
  rec.reviewedAt = reviewedAt;
  if (erase) {
    rec.textErasedAt = reviewedAt;
    mem.texts.delete(id);
  }
  return failureFromHash(id, rec, memoryText(id));
}
