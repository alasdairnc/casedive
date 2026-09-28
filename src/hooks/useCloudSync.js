/**
 * useCloudSync — wraps useBookmarks + useSearchHistory with cloud persistence.
 *
 * Guests: the plain local hooks; nothing is sent anywhere.
 *
 * Signed in:
 *  - First the account's copy is fetched and merged with this device's (see
 *    src/lib/syncMerge.js). Nothing is written before that merge: every write
 *    to api/user-data.js replaces the whole list, so an early write would
 *    delete whatever the account had. Removals and clears made while it loads
 *    are remembered so the merge doesn't undo them. If the fetch fails, it is
 *    retried on the next change or token refresh, and still nothing is written.
 *  - After the merge, each change sends the full list, one write at a time.
 *    A list that matches what the account already has isn't sent.
 *  - On sign-out this device's copy is cleared, since it lives in the account,
 *    unless the last save failed; then it is kept so nothing is lost.
 *
 * Returns the same interface as useBookmarks + useSearchHistory combined,
 * so App.jsx can use a single hook for both.
 */

import { useCallback, useEffect, useRef } from "react";
import { useBookmarks } from "./useBookmarks.js";
import { useSearchHistory } from "./useSearchHistory.js";
import {
  ACCOUNT_BOOKMARK_LIMIT,
  ACCOUNT_HISTORY_LIMIT,
  GUEST_BOOKMARK_LIMIT,
  GUEST_HISTORY_LIMIT,
  mergeBookmarks,
  mergeHistory,
  stableStringify,
} from "../lib/syncMerge.js";

const API_BASE = "/api/user-data";

async function apiFetch(token, method, type, body) {
  const url = method === "GET" ? `${API_BASE}?type=${type}` : API_BASE;
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: method === "POST" ? JSON.stringify({ type, data: body }) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      err.error || `user-data ${method} ${type} failed (${res.status})`,
    );
  }
  return res.json();
}

/**
 * Map a DB bookmark row → local bookmark shape (drops DB-only fields).
 */
function dbRowToBookmark(row) {
  return {
    id: row.citation || "",
    citation: row.citation || "",
    summary: row.summary || "",
    type: row.type || "",
    bookmarkedAt: row.bookmarkedAt ?? row.bookmarked_at ?? Date.now(),
    verification: row.verification ?? null,
  };
}

/**
 * Map a local bookmark → the shape expected by api/user-data POST allowlist.
 */
function bookmarkToRow(bm) {
  return {
    citation: bm.citation || bm.id || "",
    summary: bm.summary || "",
    type: bm.type || "",
    bookmarkedAt: bm.bookmarkedAt ?? Date.now(),
    verification: bm.verification ?? null,
  };
}

/**
 * Map a DB history row → local history shape.
 */
function dbRowToHistory(row) {
  return {
    id: String(row.timestamp ?? Date.now()),
    query: row.query || "",
    filters: row.filters || {},
    resultCounts: row.resultCounts || row.result_counts || {},
    timestamp: row.timestamp ?? Date.now(),
  };
}

/**
 * Map a local history entry → shape for api/user-data POST.
 */
function historyToRow(entry) {
  return {
    query: entry.query || "",
    filters: entry.filters || {},
    resultCounts: entry.resultCounts || {},
    timestamp: entry.timestamp ?? Date.now(),
  };
}

const TO_ROW = { bookmarks: bookmarkToRow, history: historyToRow };

function rowsKey(type, list) {
  return stableStringify(list.map(TO_ROW[type]));
}

// Sync state for one signed-in user (or none). It is replaced, never reset,
// when the user changes, so work started for an earlier user can tell.
function syncStateFor(userId) {
  return {
    userId,
    // "idle" → "loading" → "ready", or "failed" if the first fetch failed.
    phase: "idle",
    // Citations removed while the account's copy was loading.
    removed: new Set(),
    // Lists cleared while it was loading; the account's copy is dropped.
    cleared: { bookmarks: false, history: false },
    // What the account holds as far as we know, and the last list queued.
    saved: { bookmarks: null, history: null },
    queued: { bookmarks: null, history: null },
  };
}

export function useCloudSync(user, token) {
  const userId = user?.id ?? null;
  const {
    bookmarks,
    addBookmark: addLocalBookmark,
    removeBookmark: removeLocalBookmark,
    clearBookmarks: clearLocalBookmarks,
    replaceBookmarks,
    isBookmarked,
  } = useBookmarks(userId ? ACCOUNT_BOOKMARK_LIMIT : GUEST_BOOKMARK_LIMIT);
  const {
    history,
    addToHistory: addLocalHistory,
    clearHistory: clearLocalHistory,
    replaceHistory,
    rerunQuery,
    getHistory,
  } = useSearchHistory(userId ? ACCOUNT_HISTORY_LIMIT : GUEST_HISTORY_LIMIT);

  const syncRef = useRef(syncStateFor(null));
  const tokenRef = useRef(token);
  const listsRef = useRef({ bookmarks, history });
  const writerRef = useRef({ running: false, pending: new Map() });

  // Latest values for async work. Declared first so the effects below see
  // this render's values.
  useEffect(() => {
    tokenRef.current = token;
    listsRef.current = { bookmarks, history };
  });

  // Sends queued lists one at a time, only the newest list per type. A write
  // queued before the user signed out or switched accounts is dropped.
  const drainWrites = useCallback(async () => {
    const writer = writerRef.current;
    if (writer.running) return;
    writer.running = true;
    try {
      while (writer.pending.size > 0) {
        const [type, job] = writer.pending.entries().next().value;
        writer.pending.delete(type);
        if (syncRef.current !== job.sync || job.sync.phase !== "ready") {
          continue;
        }
        try {
          await apiFetch(tokenRef.current, "POST", type, job.rows);
          job.sync.saved[type] = job.key;
        } catch (err) {
          console.warn(`[useCloudSync] ${type} sync failed:`, err.message);
        }
      }
    } finally {
      writer.running = false;
    }
  }, []);

  const queueWrite = useCallback(
    (type, list) => {
      const sync = syncRef.current;
      if (sync.phase !== "ready") return;
      const key = rowsKey(type, list);
      if (key === sync.queued[type]) return;
      sync.queued[type] = key;
      writerRef.current.pending.set(type, {
        sync,
        rows: list.map(TO_ROW[type]),
        key,
      });
      drainWrites();
    },
    [drainWrites],
  );

  const loadAccountCopy = useCallback(async () => {
    const sync = syncRef.current;
    const authToken = tokenRef.current;
    if (!sync.userId || !authToken) return;
    if (sync.phase === "loading" || sync.phase === "ready") return;
    sync.phase = "loading";

    let cloud;
    try {
      const [bmData, histData] = await Promise.all([
        apiFetch(authToken, "GET", "bookmarks"),
        apiFetch(authToken, "GET", "history"),
      ]);
      cloud = {
        bookmarks: (bmData.bookmarks ?? []).map(dbRowToBookmark),
        history: (histData.history ?? []).map(dbRowToHistory),
      };
    } catch (err) {
      if (syncRef.current === sync) sync.phase = "failed";
      console.warn("[useCloudSync] initial fetch failed:", err.message);
      return;
    }
    // Signed out or switched accounts while this loaded: not ours to merge.
    if (syncRef.current !== sync) return;

    for (const type of ["bookmarks", "history"]) {
      sync.saved[type] = rowsKey(type, cloud[type]);
      sync.queued[type] = sync.saved[type];
    }
    // Copied out of the refs so the updaters below stay pure (StrictMode
    // runs them twice).
    const removed = new Set(sync.removed);
    const cloudBookmarks = sync.cleared.bookmarks ? [] : cloud.bookmarks;
    const cloudHistory = sync.cleared.history ? [] : cloud.history;
    sync.phase = "ready";
    // The write effects below send the merged lists if they differ from
    // what the account has.
    replaceBookmarks((local) =>
      mergeBookmarks(local, cloudBookmarks, {
        limit: ACCOUNT_BOOKMARK_LIMIT,
        removed,
      }),
    );
    replaceHistory((local) =>
      mergeHistory(local, cloudHistory, { limit: ACCOUNT_HISTORY_LIMIT }),
    );
  }, [replaceBookmarks, replaceHistory]);

  // A different user, or none: leave the old account first, so nothing
  // after this can be sent to it, then clear what this device held for it.
  useEffect(() => {
    const previous = syncRef.current;
    if (previous.userId === userId) return;
    const lists = listsRef.current;
    const everythingSaved =
      previous.phase === "ready" &&
      rowsKey("bookmarks", lists.bookmarks) === previous.saved.bookmarks &&
      rowsKey("history", lists.history) === previous.saved.history;

    syncRef.current = syncStateFor(userId);
    writerRef.current.pending.clear();
    if (previous.userId && everythingSaved) {
      replaceBookmarks(() => []);
      replaceHistory(() => []);
    }
  }, [userId, replaceBookmarks, replaceHistory]);

  // Signed in: fetch and merge the account's copy. A token refresh retries
  // a failed fetch.
  useEffect(() => {
    if (userId && token) loadAccountCopy();
  }, [userId, token, loadAccountCopy]);

  useEffect(() => {
    queueWrite("bookmarks", bookmarks);
  }, [bookmarks, queueWrite]);

  useEffect(() => {
    queueWrite("history", history);
  }, [history, queueWrite]);

  const retryIfFailed = useCallback(() => {
    if (syncRef.current.phase === "failed") loadAccountCopy();
  }, [loadAccountCopy]);

  // --- Cloud-aware mutations: local first; the effects above send them ---

  const addBookmark = useCallback(
    (item, type, verification) => {
      addLocalBookmark(item, type, verification);
      syncRef.current.removed.delete(item.citation || item.section || "");
      retryIfFailed();
    },
    [addLocalBookmark, retryIfFailed],
  );

  const removeBookmark = useCallback(
    (id) => {
      removeLocalBookmark(id);
      const sync = syncRef.current;
      if (sync.userId && sync.phase !== "ready") sync.removed.add(id);
      retryIfFailed();
    },
    [removeLocalBookmark, retryIfFailed],
  );

  const clearBookmarks = useCallback(() => {
    clearLocalBookmarks();
    const sync = syncRef.current;
    if (sync.userId && sync.phase !== "ready") sync.cleared.bookmarks = true;
    retryIfFailed();
  }, [clearLocalBookmarks, retryIfFailed]);

  const addToHistory = useCallback(
    (query, filters, result) => {
      addLocalHistory(query, filters, result);
      retryIfFailed();
    },
    [addLocalHistory, retryIfFailed],
  );

  const clearHistory = useCallback(() => {
    clearLocalHistory();
    const sync = syncRef.current;
    if (sync.userId && sync.phase !== "ready") sync.cleared.history = true;
    retryIfFailed();
  }, [clearLocalHistory, retryIfFailed]);

  return {
    // Bookmarks
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    clearBookmarks,

    // History
    history,
    addToHistory,
    clearHistory,
    rerunQuery,
    getHistory,
  };
}
