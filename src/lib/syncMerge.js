// Merging this device's bookmarks and search history with the copy saved to
// the user's account. useCloudSync runs it once per sign-in.

// How many entries a guest keeps on this device.
export const GUEST_BOOKMARK_LIMIT = 50;
export const GUEST_HISTORY_LIMIT = 20;

// The most api/user-data.js stores per account (MAX_ITEMS there). A signed-in
// list must never be trimmed below these: every save replaces the whole list,
// so anything trimmed locally is deleted from the account too.
export const ACCOUNT_BOOKMARK_LIMIT = 200;
export const ACCOUNT_HISTORY_LIMIT = 100;

const newestFirst = (field) => (a, b) => (b[field] ?? 0) - (a[field] ?? 0);

// One bookmark per citation. When both sides have it, the newer copy wins.
// `removed` holds citations the user removed while the account copy was
// loading, so the merge doesn't bring them back.
export function mergeBookmarks(
  local,
  cloud,
  { limit = ACCOUNT_BOOKMARK_LIMIT, removed = new Set() } = {},
) {
  const byId = new Map();
  for (const entry of [...local, ...cloud]) {
    const id = entry.id || entry.citation;
    if (!id || removed.has(id)) continue;
    const kept = byId.get(id);
    if (!kept || (entry.bookmarkedAt ?? 0) > (kept.bookmarkedAt ?? 0)) {
      byId.set(id, { ...entry, id });
    }
  }
  return [...byId.values()].sort(newestFirst("bookmarkedAt")).slice(0, limit);
}

// History is a log, so a search run twice stays twice. Only exact copies
// collapse: the same query at the same moment is an entry this device saved
// earlier coming back from the account.
export function mergeHistory(
  local,
  cloud,
  { limit = ACCOUNT_HISTORY_LIMIT } = {},
) {
  const byKey = new Map();
  for (const entry of [...local, ...cloud]) {
    const key = `${entry.timestamp}|${entry.query}`;
    if (!byKey.has(key)) byKey.set(key, entry);
  }
  return [...byKey.values()].sort(newestFirst("timestamp")).slice(0, limit);
}

// JSON with object keys sorted, for comparing lists by value. The account
// stores filters and counts as jsonb, which does not keep key order.
export function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value).sort();
    return `{${keys
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value) ?? "null";
}
