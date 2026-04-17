import { useState, useCallback } from "react";

const MAX_ENTRIES = 20;

export function useSearchHistory() {
  const [history, setHistory] = useState([]);

  const addToHistory = useCallback((query, filters, result) => {
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
      return [entry, ...prev].slice(0, MAX_ENTRIES);
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
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

  return { history, addToHistory, clearHistory, rerunQuery, getHistory };
}
