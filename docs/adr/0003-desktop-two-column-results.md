# ADR-0003: Two-column desktop results layout

**Status:** Accepted
**Date:** 2026-09-25 (backfilled 2026-09-27)
**Deciders:** Alasdair (owner)

## Context

Results rendered in one column capped at 760px (`CONTENT_MAX_WIDTH` in
`src/lib/ui.js`) at every screen width. The owner wanted desktop screens to
use more of the page (session notes, 2026-09-25).

## Decision

On screens 1080px and wider (`WIDE_LAYOUT_QUERY`), once results load, the
results page widens to 1200px (`WIDE_MAX_WIDTH`):

- Cards sit in a main column.
- A sticky 320px sidebar holds jump links with counts, Export PDF, Legal
  Analysis and Suggested Links.
- The search box and filters collapse into a one-line `SearchSummaryBar`
  until "Edit search" reopens them.

The landing page and narrower screens are unchanged (PR #43, `e162f30`).

## Options considered

The owner chose the sidebar layout with collapsed search and chose to leave
the landing page alone. The other candidates weren't recorded.

## Consequences

The first two rules come from bugs caught in review before the change
landed. The rest are what the tests depend on.

- `Results.jsx` keeps one tree shape on both sides of the breakpoint. A
  single wrapper toggles its grid style. Swapping the wrapper would remount
  every `ResultCard` and wipe half-written case-law reports.
- The search form stays mounted with `hidden` while collapsed. History
  re-run and the e2e `toHaveValue` checks depend on it.
- Collapsing moves focus to the results heading when the form held focus.
  Focus on `<body>` counts too, because a disabled Research button blurs to
  `<body>` in Chrome.
- The form doesn't collapse if the user is still typing a new draft when
  the search resolves.
- Chromium e2e runs at 1280px, which is the wide layout. Any spec that types
  a second scenario after results are showing must call
  `expandSearchIfCollapsed` (`tests/e2e/helpers/search.js`).
- Jump-link labels could collide with section headings, so exact-heading
  locators use `getByRole("heading")`.
- Both layouts need testing: `tests/unit/ResultsLayout.test.jsx`,
  `tests/unit/AppDesktopLayout.test.jsx` and
  `tests/e2e/desktop-layout.spec.js`.

## Action items

None open.
