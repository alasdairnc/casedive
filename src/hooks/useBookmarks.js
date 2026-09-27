import { useState, useCallback } from "react";
import { GUEST_BOOKMARK_LIMIT } from "../lib/syncMerge.js";

const STORAGE_KEY = "casedive-bookmarks";
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const now = Date.now();
    return parsed.filter((e) => now - e.bookmarkedAt < TTL_MS);
  } catch {
    return [];
  }
}

function saveToStorage(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // localStorage unavailable — fail silently
  }
}

// Signed in, useCloudSync passes the account limit instead of the guest one.
export function useBookmarks(limit = GUEST_BOOKMARK_LIMIT) {
  const [bookmarks, setBookmarks] = useState(() => loadFromStorage());

  const addBookmark = useCallback(
    (item, type, verification) => {
      const id = item.citation || item.section || "";
      if (!id) return;

      setBookmarks((prev) => {
        // Remove existing entry with same id (re-add to front with fresh timestamp)
        const filtered = prev.filter((b) => b.id !== id);
        const entry = {
          id,
          citation: id,
          summary: item.summary || item.description || "",
          type,
          bookmarkedAt: Date.now(),
          verification: verification || null,
        };
        // Enforce max — trim oldest from the end
        const updated = [entry, ...filtered].slice(0, limit);
        saveToStorage(updated);
        return updated;
      });
    },
    [limit],
  );

  // Set the whole list from the current one, e.g. to merge in the account's
  // copy. `update` receives the latest list, so changes queued in the same
  // tick aren't lost.
  const replaceBookmarks = useCallback((update) => {
    setBookmarks((prev) => {
      const updated = update(prev);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const removeBookmark = useCallback((id) => {
    setBookmarks((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const isBookmarked = useCallback(
    (id) => {
      return bookmarks.some((b) => b.id === id);
    },
    [bookmarks],
  );

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    clearBookmarks,
    replaceBookmarks,
  };
}
