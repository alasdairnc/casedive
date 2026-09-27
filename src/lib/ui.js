// Non-colour UI tokens. Colours live in themes.js and come from useTheme().
// Kept in a plain module (no DOM access) so node-env tests can import components.

export const RADIUS = { sm: 6, md: 8, lg: 12, pill: 999 };

export const CONTENT_MAX_WIDTH = 760;
// Results page on desktop: main column + sticky sidebar. The header and footer
// share this width so their edges line up with the results grid.
export const WIDE_MAX_WIDTH = 1200;
export const HEADER_MAX_WIDTH = WIDE_MAX_WIDTH;
export const RESULTS_SIDEBAR_WIDTH = 320;
export const PAGE_GUTTER = 24;

// At or above this width the results page switches to the two-column layout
// and the search box collapses into a summary bar once results are showing.
export const WIDE_LAYOUT_QUERY = "(min-width: 1080px)";

// Header collapses into a hamburger menu at or below this width.
export const MOBILE_NAV_QUERY = "(max-width: 719px)";
