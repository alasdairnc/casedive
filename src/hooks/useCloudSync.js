/**
 * useCloudSync — wraps useBookmarks + useSearchHistory with cloud persistence.
 *
 * When the user is authenticated (user + token present):
 *  - On login: fetches bookmarks, history, and scenarios from the server and
 *    replaces local state.
 *  - On mutations: updates local state immediately (optimistic), then syncs
 *    the full array to the server in the background.
 *
 * When the user is a guest (user === null):
 *  - Falls back to the underlying localStorage hooks transparently.
 *
 * Returns the same interface as useBookmarks + useSearchHistory combined,
 * so App.jsx can use a single hook for both.
 */

import { useCallback, useEffect, useRef } from "react";
import { useBookmarks } from "./useBookmarks.js";
import { useSearchHistory } from "./useSearchHistory.js";

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

export function useCloudSync(user, token) {
  const bm = useBookmarks();
  const sh = useSearchHistory();

  // Track whether we've done the initial cloud fetch for this session.
  const fetchedRef = useRef(false);

  // Sync the full bookmarks array to the cloud (best-effort, no throw).
  const syncBookmarks = useCallback(
    async (items) => {
      if (!token) return;
      try {
        await apiFetch(token, "POST", "bookmarks", items.map(bookmarkToRow));
      } catch (err) {
        console.warn("[useCloudSync] bookmark sync failed:", err.message);
      }
    },
    [token],
  );

  // Sync the full history array to the cloud (best-effort, no throw).
  const syncHistory = useCallback(
    async (items) => {
      if (!token) return;
      try {
        await apiFetch(token, "POST", "history", items.map(historyToRow));
      } catch (err) {
        console.warn("[useCloudSync] history sync failed:", err.message);
      }
    },
    [token],
  );

  // On login: fetch cloud data and replace local state once per session.
  useEffect(() => {
    if (!user || !token || fetchedRef.current) return;
    fetchedRef.current = true;

    (async () => {
      try {
        const [bmData, histData] = await Promise.all([
          apiFetch(token, "GET", "bookmarks"),
          apiFetch(token, "GET", "history"),
        ]);

        const cloudBookmarks = (bmData.bookmarks ?? []).map(dbRowToBookmark);
        const cloudHistory = (histData.history ?? []).map(dbRowToHistory);

        // Replace local state with cloud data (cloud is authoritative on login).
        if (cloudBookmarks.length > 0) {
          bm.clearBookmarks();
          // Re-add in reverse order so newest ends up at front.
          [...cloudBookmarks].reverse().forEach((b) => {
            bm.addBookmark(
              { citation: b.citation, summary: b.summary },
              b.type,
              b.verification,
            );
          });
        }

        if (cloudHistory.length > 0) {
          sh.clearHistory();
          // History hook maintains newest-first; add in reverse (oldest first)
          // so the final state matches the cloud ordering.
          [...cloudHistory].reverse().forEach((h) => {
            sh.addToHistory(h.query, h.filters, {
              criminal_code: new Array(h.resultCounts?.criminal_code ?? 0),
              case_law: new Array(h.resultCounts?.case_law ?? 0),
              civil_law: new Array(h.resultCounts?.civil_law ?? 0),
              charter: new Array(h.resultCounts?.charter ?? 0),
            });
          });
        }
      } catch (err) {
        console.warn("[useCloudSync] initial fetch failed:", err.message);
      }
    })();
  }, [user, token]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reset fetchedRef on sign-out so next login re-fetches.
  useEffect(() => {
    if (!user) {
      fetchedRef.current = false;
    }
  }, [user]);

  // --- Cloud-aware mutations ---

  const addBookmark = useCallback(
    (item, type, verification) => {
      bm.addBookmark(item, type, verification);
      if (token) {
        // Get updated array after React state schedules the update.
        // We capture current + new entry to avoid stale closure.
        const id = item.citation || item.section || "";
        if (!id) return;
        const newEntry = bookmarkToRow({
          id,
          citation: id,
          summary: item.summary || item.description || "",
          type,
          bookmarkedAt: Date.now(),
          verification: verification || null,
        });
        // Sync with current local bookmarks + new entry.
        // useBookmarks enforces dedup internally; we mirror that here.
        const existing = bm.bookmarks.filter((b) => b.id !== id);
        const updated = [{ ...newEntry, id }, ...existing].slice(0, 200);
        syncBookmarks(updated);
      }
    },
    [bm, token, syncBookmarks],
  );

  const removeBookmark = useCallback(
    (id) => {
      bm.removeBookmark(id);
      if (token) {
        const updated = bm.bookmarks.filter((b) => b.id !== id);
        syncBookmarks(updated);
      }
    },
    [bm, token, syncBookmarks],
  );

  const clearBookmarks = useCallback(() => {
    bm.clearBookmarks();
    if (token) {
      syncBookmarks([]);
    }
  }, [bm, token, syncBookmarks]);

  const addToHistory = useCallback(
    (query, filters, result) => {
      sh.addToHistory(query, filters, result);
      if (token) {
        const newEntry = historyToRow({
          query,
          filters,
          resultCounts: {
            criminal_code: result?.criminal_code?.length ?? 0,
            case_law: result?.case_law?.length ?? 0,
            civil_law: result?.civil_law?.length ?? 0,
            charter: result?.charter?.length ?? 0,
          },
          timestamp: Date.now(),
        });
        const updated = [newEntry, ...sh.history.map(historyToRow)].slice(
          0,
          100,
        );
        syncHistory(updated);
      }
    },
    [sh, token, syncHistory],
  );

  const clearHistory = useCallback(() => {
    sh.clearHistory();
    if (token) {
      syncHistory([]);
    }
  }, [sh, token, syncHistory]);

  return {
    // Bookmarks
    bookmarks: bm.bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked: bm.isBookmarked,
    clearBookmarks,

    // History
    history: sh.history,
    addToHistory,
    clearHistory,
    rerunQuery: sh.rerunQuery,
    getHistory: sh.getHistory,
  };
}
