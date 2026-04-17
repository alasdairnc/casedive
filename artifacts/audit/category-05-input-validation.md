# Category 5: Input Validation & Injection

Audit date: 2026-04-16
Auditor: inline (main session)

## URL validator analysis

`src/lib/validateUrl.js` (lines 1-16) uses `new URL(url)` and enforces:

- `parsed.protocol === "https:"` — blocks `http:`, `data:`, `javascript:`, `file:`, `blob:`, `//` (protocol-relative)
- Hostname must equal or end-dot-match `canlii.org` or `laws-lois.justice.gc.ca`

Bypass attempts evaluated:

| Attempt                                          | Result     | Reason                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `data:text/html,...`                             | Blocked    | protocol !== "https:"                                                                                                                                                                                                                                                                                                                                      |
| `javascript:alert(1)`                            | Blocked    | protocol !== "https:"                                                                                                                                                                                                                                                                                                                                      |
| `file:///etc/passwd`                             | Blocked    | protocol                                                                                                                                                                                                                                                                                                                                                   |
| `blob:https://canlii.org/...`                    | Blocked    | protocol                                                                                                                                                                                                                                                                                                                                                   |
| `//canlii.org/path`                              | Blocked    | `new URL("//canlii.org")` parses as `https:` only if base is provided; without base, throws. Validator returns false on throw.                                                                                                                                                                                                                             |
| `https://canlii.org.attacker.com`                | Blocked    | `.endsWith(".canlii.org")` requires dot prefix; "canlii.org.attacker.com" ends with ".org" not ".canlii.org"                                                                                                                                                                                                                                               |
| `https://attacker@canlii.org/`                   | **Passes** | `new URL("https://attacker@canlii.org/").hostname === "canlii.org"` — URL userinfo is stripped from hostname; validator approves. The resulting `href` is `https://attacker@canlii.org/`. In an `<a href>` this is harmless. If ever passed to `fetch()`, the userinfo is ignored by Node's http client. **Not exploitable in current usage** (href only). |
| IDN homoglyph `https://canlіі.org` (Cyrillic і)  | Blocked    | `new URL()` normalizes to punycode; `xn--canlii-r2b.org` does not match                                                                                                                                                                                                                                                                                    |
| Null bytes `https://canlii.org\x00.attacker.com` | Blocked    | `new URL()` throws on embedded nulls                                                                                                                                                                                                                                                                                                                       |
| `https://canlii.org:8443/path`                   | Passes     | hostname is still `canlii.org`; non-standard port is allowed. Ports 80/443 should be the only expected ports. Low risk given CanLII only serves HTTPS on 443.                                                                                                                                                                                              |

**Conclusion:** The validator is well-constructed. The userinfo (@) case is technically allowed but not exploitable in current call sites. Port is not constrained (low risk).

## Findings

### [Low] URL validator allows non-standard ports

File: src/lib/validateUrl.js:3-16
Evidence: `parsed.protocol === "https:"` and hostname check — no `parsed.port` check.
Attack: `https://canlii.org:1234/path` passes validation. If ever used as a fetch target (currently only used for `<a href>` links), this could direct traffic to non-standard ports.
Impact: Low — current callers only use the result for anchor hrefs, not fetch targets.
Trace confidence: High

### [Low] URL validator allows userinfo component

File: src/lib/validateUrl.js:7-13
Evidence: `parsed.hostname` strips userinfo; `https://attacker@canlii.org/` passes.
Attack: Currently not exploitable — used only in `<a href>`, and browsers display the URL to users. If a future caller passed validated URLs to fetch(), userinfo would be benign (Node ignores it for HTTP).
Impact: Negligible today; defense-in-depth gap.
Trace confidence: High

## No dangerouslySetInnerHTML found

Grep for `dangerouslySetInnerHTML` across `src/` returned zero results. All model output and CanLII content is rendered via React text nodes (`{item.summary}`, `{item.title}`, etc.), not as raw HTML. XSS via innerHTML is not a current vector.
Trace confidence: High

## No user-controlled regex found

Grep for `new RegExp(` across `src/` and `api/` returned no instances of user-controlled input passed to a RegExp constructor. All regexes are hardcoded constants. The `sanitizeUserInput` regex in `api/analyze.js:59` uses the pattern `[<>\`\n\r]`and`[a-zA-Z\_][a-zA-Z0-9_]\*` — both hardcoded, no catastrophic backtracking (no nested quantifiers). Low ReDoS risk confirmed.
Trace confidence: High

## No prototype pollution path found

Grep for `Object.assign({}, req.body)` and spread of `req.body` across `api/` found no pattern that directly spreads a raw parsed-JSON object into a plain prototype-bearing target in a way that could pollute `Object.prototype`. `req.body` fields are destructured by name (e.g., `const { scenario, filters } = req.body`) — only named properties are extracted, not spread wholesale.
Trace confidence: Medium (destructured values could still be objects; no deep-freeze or null-prototype usage confirmed)

## No open redirects found

No API endpoint or frontend code performs a redirect to a user-supplied URL. The only URLs used for navigation are those passing `isValidUrl()`, which constrains to trusted domains.
Trace confidence: High

### [Medium] `api/export-pdf.js` renders user-controlled text in PDF without per-field injection check

File: api/export-pdf.js (lines ~104-350, not read in full)
Evidence (inferred from Category 3 report): Fields `scenario`, `summary`, individual `case_law[].summary`, `criminal_code[].text` etc. are sanitized by `sanitizePdfText` (20,000-char cap). PDFKit renders text via `doc.text()` which outputs raw text strings — it does not interpret HTML or JavaScript, so there is no script injection in the PDF output itself. The threat would be hyperlink injection: if PDFKit renders a `doc.link()` with attacker-controlled URL. Whether PDFKit link injection is possible depends on whether any field is used as a link target; this was not traced in detail.
Impact: Low-to-medium — PDF text injection can create misleading PDFs but cannot execute code in the browser.
Trace confidence: Low (PDFKit link rendering path not fully traced)

## False Alarms

- `JSON.parse(raw)` in `useBookmarks.js:10` and `useSearchHistory.js:9` — parses localStorage strings. If corrupted, the `catch {}` block returns `[]`. Not attacker-controlled from a remote threat model (would require XSS first). Safe.
- `JSON.parse(hitsJson)` in `api/_rateLimit.js:35` — parses Redis content previously written by the same function. Not attacker-controlled from outside (Redis is backend infra). Safe.
- `{...filters}` in `useSearchHistory.js:37` — shallow copy of a local state object, not from parsed JSON directly from user input. Safe.

## Coverage Gaps

- `api/export-pdf.js` not fully read — PDF link injection path not confirmed or ruled out.
- CanLII URL construction in `_caseLawRetrieval.js` was confirmed to use `buildApiUrl()` from `src/lib/canlii.js:253` which calls `encodeURIComponent(apiKey)` for the key parameter. Citation components (`dbId`, `caseId`) are derived from a hardcoded map and a parsed-integer extraction — URL encoding was not verified for every field.
