// Non-colour UI tokens. Colours live in themes.js and come from useTheme().
// Kept in a plain module (no DOM access) so node-env tests can import components.

export const RADIUS = { sm: 6, md: 8, lg: 12, pill: 999 };

export const CONTENT_MAX_WIDTH = 760;
export const HEADER_MAX_WIDTH = 1040;
export const PAGE_GUTTER = 24;

// Header collapses into a hamburger menu at or below this width.
export const MOBILE_NAV_QUERY = "(max-width: 719px)";
