import { useState, useCallback } from "react";
import { GUEST_HISTORY_LIMIT } from "../lib/syncMerge.js";

// Signed in, useCloudSync passes the account limit instead of the guest one.
export function useSearchHistory(limit = GUEST_HISTORY_LIMIT) {
  const [history, setHistory] = useState([]);

  const addToHistory = useCallback(
    (query, filters, result) => {
      setHistory((prev) => {
        const entry = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          query,
          filters: { ...filters },
          resultCounts: {
            criminal_code: result?.criminal_code?.length || 0,
            case_law: result?.case_law?.length || 0,
            civil_law: result?.civil_law?.length || 0,
            charter: result?.charter?.length || 0,
          },
          timestamp: Date.now(),
        };
        return [entry, ...prev].slice(0, limit);
      });
    },
    [limit],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Set the whole list from the current one, e.g. to merge in the account's
  // copy. `update` receives the latest list.
  const replaceHistory = useCallback((update) => {
    setHistory((prev) => update(prev));
  }, []);

  // Returns { query, filters } for the given id — caller re-runs the query
  const rerunQuery = useCallback(
    (id) => {
      const entry = history.find((e) => e.id === id);
      if (!entry) return null;
      return { query: entry.query, filters: entry.filters };
    },
    [history],
  );

  // Sorted newest first (already maintained by addToHistory)
  const getHistory = useCallback(() => history, [history]);

  return {
    history,
    addToHistory,
    clearHistory,
    replaceHistory,
    rerunQuery,
    getHistory,
  };
}
