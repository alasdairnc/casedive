import { useState, useCallback } from "react";

const STORAGE_KEY = "casedive-bookmarks";
const MAX_ENTRIES = 50;
const TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const now = Date.now();
    return parsed.filter(e => now - e.bookmarkedAt < TTL_MS);
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

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState(() => loadFromStorage());

  const addBookmark = useCallback((item, type, verification) => {
    const id = item.citation || item.section || "";
    if (!id) return;

    setBookmarks(prev => {
      // Remove existing entry with same id (re-add to front with fresh timestamp)
      const filtered = prev.filter(b => b.id !== id);
      const entry = {
        id,
        citation: id,
        summary: item.summary || item.description || "",
        type,
        bookmarkedAt: Date.now(),
        verification: verification || null,
      };
      // Enforce max — trim oldest from the end
      const updated = [entry, ...filtered].slice(0, MAX_ENTRIES);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const removeBookmark = useCallback((id) => {
    setBookmarks(prev => {
      const updated = prev.filter(b => b.id !== id);
      saveToStorage(updated);
      return updated;
    });
  }, []);

  const isBookmarked = useCallback((id) => {
    return bookmarks.some(b => b.id === id);
  }, [bookmarks]);

  const clearBookmarks = useCallback(() => {
    setBookmarks([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  }, []);

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, clearBookmarks };
}
