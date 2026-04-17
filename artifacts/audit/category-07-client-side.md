# Category 7: Client-Side Issues

Audit date: 2026-04-16
Auditor: inline (main session)

## localStorage content summary

| Key                  | Hook                  | Contents                                                           | TTL     |
| -------------------- | --------------------- | ------------------------------------------------------------------ | ------- |
| `caseFinderHistory`  | `useSearchHistory.js` | query string + filters + resultCounts; no full response            | 7 days  |
| `casedive-bookmarks` | `useBookmarks.js`     | citation, summary (item.summary), type, bookmarkedAt, verification | 30 days |

**PII concern**: `useSearchHistory` stores `query` (the user's scenario text) in localStorage with a 7-day TTL. The scenario may contain real legal facts (names, incidents). On a shared device (library computer, shared family device) this scenario text persists for 7 days and is readable by other browser users or browser extensions.

**Bookmarks**: Store `item.summary` which is AI-generated summary text — not raw user input. Does not store the original scenario.

## Findings

### [High] User scenario text persisted in localStorage for 7 days

File: src/hooks/useSearchHistory.js:31-48
Evidence:

```js
const entry = {
  id: ...,
  query,        // ← the full scenario text
  filters: { ...filters },
  resultCounts: {...},
  timestamp: Date.now(),
};
```

`query` is the user's legal scenario (up to 5,000 chars). This could contain "I was arrested for X", "my client hit someone while drunk", "sexual assault charges", etc. Stored in `localStorage["caseFinderHistory"]` for 7 days. Readable by:

- Any JavaScript running on `casedive.ca` (including AdSense — see Category 11)
- Any browser extension with access to localStorage
- Anyone who inspects DevTools on a shared device
  Impact: PII/legal-scenario disclosure on shared devices. Particularly sensitive given the legal-research context. AdSense script has DOM access and could theoretically read localStorage (see Category 11).
  Trace confidence: High

### [Medium] No localStorage quota error handling (silent discard)

File: src/hooks/useSearchHistory.js:19-24, src/hooks/useBookmarks.js:19-25
Evidence:

```js
function saveToStorage(entries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // localStorage unavailable — fail silently
  }
}
```

`QuotaExceededError` is silently swallowed. On private-browsing mode or iOS Safari, localStorage quota is 0 or very low. When quota is exceeded, new search history is dropped without any user indication. This is a UX issue, not a security issue, but the pattern of swallowing all errors means other storage errors (corrupt JSON, security errors) are also hidden.
Impact: Silent data loss for users in private mode or on quota-limited devices.
Trace confidence: High

### [Medium] No focus trap in CaseSummaryModal

File: src/components/CaseSummaryModal.jsx:96-102
Evidence:

```js
useEffect(() => {
  const handler = (e) => {
    if (e.key === "Escape") onClose();
  };
  window.addEventListener("keydown", handler);
  return () => window.removeEventListener("keydown", handler);
}, [onClose]);
```

Escape key closes the modal — good. However there is no focus trap: keyboard users can Tab out of the modal into the background content, which should be inert while the modal is open. This is an accessibility issue (WCAG 2.1 §4.1.3) that can also enable a11y-keyboard-based click-jacking on elements behind the modal.
Impact: Accessibility / minor UX. Not a security exploit.
Trace confidence: High

### [Low] Bookmarked `item.summary` rendered as React text — no XSS

File: src/components/BookmarksPanel.jsx (not read), src/hooks/useBookmarks.js:37-39
Evidence: Bookmark entries store `summary: item.summary || item.description || ""`. No `dangerouslySetInnerHTML` found anywhere in `src/` (grep confirmed zero results). Bookmark content is rendered as React text nodes — inherently escaped.
Impact: None — no stored XSS path through bookmarks.
Trace confidence: Medium (BookmarksPanel.jsx not read; confirmed via dangerouslySetInnerHTML grep)

## Source maps in production

No `build.sourcemap: true` found in vite.config (not present; default is `false` for production builds). `dist/assets/` was inspected — no `.map` files committed to git. Production Vite builds do not emit source maps by default.
Trace confidence: Medium (could not verify the actual built output from a fresh prod build)

## Error boundary / API error leak to UI

`CaseSummaryModal.jsx:129-132`:

```js
if (data.error) {
  setError(data.error);
}
```

The `data.error` string from the API response is rendered directly in the UI (lines 254-264). If an API endpoint returns a verbose error message (e.g., stack trace, file path), it would surface to users. Per Category 3 audit, `analyze.js` and `case-summary.js` return sanitized user-facing error strings ("Analysis service temporarily unavailable", etc.) — so the practical content is not exploitable. But the rendering pattern (display whatever the server returns) is a latent risk if any future endpoint loosens its error handling.
Trace confidence: Medium

## False Alarms

- **Stored XSS via bookmarks**: No `dangerouslySetInnerHTML` in `src/`. Bookmarked content is rendered as text. Not vulnerable.
- **`useSearchHistory` stores resultCounts only, not full API response**: Confirmed — only counts (`criminal_code: result?.criminal_code?.length || 0`) are stored, not the case law text. The scenario text (`query`) is the sensitive field.

## Coverage Gaps

- `src/components/BookmarksPanel.jsx` not read — assumed renders bookmark entries as text (consistent with grep showing no `dangerouslySetInnerHTML`). If it uses any `innerHTML` assignment, that would be a finding.
- No audit of `@vercel/analytics` behavior — whether it transmits scenario text or page parameters to Vercel's analytics pipeline.
- Production source map existence could not be confirmed without running `npm run build` and inspecting output.
