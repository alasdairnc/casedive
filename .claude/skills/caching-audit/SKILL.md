---
name: caching-audit
description: Audit Redis caching across CaseDive API endpoints — checks for missing caches, unbounded TTLs, missing timeouts, and Vite chunk config. Audit only, no fixes.
---

# Caching Audit

Invoke with `/caching-audit`. Audit only — never fix anything.

## Checks

### 1. Endpoint Cache Coverage

For each non-underscore file in `api/`, determine whether it uses Redis caching (`get`/`setex` via Upstash or `_cache.js`). Flag any endpoint that:

- Makes an expensive external call (Anthropic API, CanLII API) but has **no** cache
- Caches with `.set()` instead of `.setex()` (unbounded TTL — will never expire)

### 2. Redis Operation Timeouts

Check `_rateLimit.js` and any Redis utility files for whether Redis operations have explicit timeouts:

- `AbortSignal.timeout()`
- `Promise.race` with a timeout
- Library-level timeout config

Flag if Redis calls can hang indefinitely.

### 3. Cache TTL Audit

For every `.setex()` call across `api/*.js`, list:

- The key pattern
- The TTL value (in seconds)
- Whether the TTL is appropriate for the data type (e.g., case law can be longer-lived than search results)

Flag any TTL under 60s (likely too short) or over 86400s (likely too long for legal data that may update).

### 4. Vite Chunk Config

Check `vite.config.js` for `manualChunks` — verify React and other large vendor deps are split into separate chunks rather than bundled into the main entrypoint.

## Output Format

### Cache Coverage

| Endpoint   | Cached? | Cache Key         | TTL   | Issue                           |
| ---------- | ------- | ----------------- | ----- | ------------------------------- |
| analyze.js | ✓       | `analyze:${hash}` | 3600s | —                               |
| verify.js  | ✗       | —                 | —     | Missing cache on Anthropic call |

### Redis Timeout Guard

- [ ] `_rateLimit.js` has timeout guard: **yes/no** (file:line)

### TTL Issues

List any TTLs flagged as too short, too long, or unbounded.

### Vite Chunks

- [ ] `manualChunks` declared: **yes/no** (vite.config.js:line)

## Constraints

- Audit only — do not fix, refactor, or modify any files
- Report file path and line number for every finding
