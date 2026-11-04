// Data loading + triage for the internal retrieval-health dashboard.
// One place owns the token, the snapshot, the failure-queue paging and the
// POST triage call, so the view components stay presentational.

import { useCallback, useEffect, useMemo, useState } from "react";

export const TOKEN_STORAGE_KEY = "casediveRetrievalHealthToken";
export const QUEUE_PAGE_SIZE = 20;
export const AUTO_REFRESH_MS = 30_000;

function readStoredToken() {
  try {
    return sessionStorage.getItem(TOKEN_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

async function requestJson(url, token, init = {}) {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(token.trim() ? { Authorization: `Bearer ${token.trim()}` } : {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `HTTP ${res.status}`);
  return body;
}

export default function useRetrievalHealth() {
  const [token, setTokenState] = useState(readStoredToken);
  const [data, setData] = useState(null);
  const [queue, setQueue] = useState(null);
  const [queueStatus, setQueueStatus] = useState("new");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [busyIds, setBusyIds] = useState(() => new Set());
  const [autoRefresh, setAutoRefresh] = useState(false);

  const setToken = useCallback((value) => {
    const next = value.trim();
    try {
      if (next) sessionStorage.setItem(TOKEN_STORAGE_KEY, next);
      else sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // Session storage can be unavailable; the token then lives in memory.
    }
    setTokenState(next);
    if (!next) {
      setData(null);
      setQueue(null);
    }
  }, []);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        failureLimit: String(QUEUE_PAGE_SIZE),
        status: queueStatus,
      });
      const body = await requestJson(`/api/retrieval-health?${params}`, token);
      setData(body);
      setQueue(body.failures || null);
    } catch (e) {
      setData(null);
      setQueue(null);
      setError(e.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }, [token, queueStatus]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!autoRefresh) return undefined;
    const id = setInterval(load, AUTO_REFRESH_MS);
    return () => clearInterval(id);
  }, [autoRefresh, load]);

  const loadMore = useCallback(async () => {
    if (!queue?.hasMore || typeof queue.nextOffset !== "number") return;
    setLoadingMore(true);
    try {
      const params = new URLSearchParams({
        failureLimit: String(QUEUE_PAGE_SIZE),
        status: queueStatus,
        failuresOffset: String(queue.nextOffset),
      });
      const body = await requestJson(`/api/retrieval-health?${params}`, token);
      const next = body.failures || {};
      setQueue((prev) => ({
        ...next,
        items: [...(prev?.items || []), ...(next.items || [])],
      }));
    } catch (e) {
      setError(e.message || "Failed to load more");
    } finally {
      setLoadingMore(false);
    }
  }, [queue, queueStatus, token]);

  // Returns true on success. The snapshot is reloaded afterwards so tab counts,
  // suggestions and the list itself reflect the change (nothing is cached).
  const triage = useCallback(
    async (id, status, note = "") => {
      setBusyIds((prev) => new Set(prev).add(id));
      setError(null);
      try {
        await requestJson("/api/retrieval-health", token, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, status, note }),
        });
        await load();
        return true;
      } catch (e) {
        setError(e.message || "Could not update that scenario");
        return false;
      } finally {
        setBusyIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    [token, load],
  );

  return useMemo(
    () => ({
      token,
      setToken,
      data,
      queue,
      queueStatus,
      setQueueStatus,
      error,
      loading,
      loadingMore,
      busyIds,
      autoRefresh,
      setAutoRefresh,
      load,
      loadMore,
      triage,
    }),
    [
      token,
      setToken,
      data,
      queue,
      queueStatus,
      error,
      loading,
      loadingMore,
      busyIds,
      autoRefresh,
      load,
      loadMore,
      triage,
    ],
  );
}
