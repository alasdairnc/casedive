# CaseDive Design System

## Typography

Self-hosted variable fonts (latin subset, woff2) in `public/fonts/`, declared via
`@font-face` in `src/index.css` and exposed as CSS custom properties:

- Display/headlines/wordmark: Space Grotesk (`--font-display`)
- Body/UI: Inter (`--font-body`)
- Code/§ markers: JetBrains Mono (`--font-mono`)
- Labels: Inter, 12–13px, weight 600, sentence case, normal letter-spacing

All three have system fallbacks (`system-ui`, `ui-monospace`) so the UI still renders
if a font fails to load. Reference fonts only via `var(--font-*)` — no inline font stacks.

Copy is sentence case ("Sign in", "Try again", "Reset filters"). No
`textTransform: "uppercase"` or wide letter-spacing on buttons, nav, labels or
headings. Minimum text size is 12px; body copy is 14px.

## Colors

Direction: **bold professional dark**. There is a single (dark) theme — no light mode,
no theme toggle.

- `#0B1220` bg, `#0F1A30` surfaces, `#E8EDF5` text, `#2DD4BF` accent, `#F59E0B` amber
- **Teal is the only primary button colour** (`buttonBg`, hover `buttonBgHover`,
  text `buttonText`). `accentSoft` is a solid teal tint for pressed/selected states
  and count badges.
- Amber (`accentOlive`) is for warnings and highlights only, never buttons.
- `accentRed`/`accentGreen` stay semantic (error/destructive, verified/success).

`themes.js` exports only `themes.dark`; `ThemeContext` always provides it (`useTheme()`
returns the dark theme; there is no `useThemeActions`/`isDark`/`toggleTheme`).
Contrast is gated by `themes.test.js`: text ≥7:1, secondary/tertiary ≥4.5:1 on
bg/bgAlt/cardBg. `textFaint` (3.5:1) is for decoration, not readable text.

## Buttons

Use `src/components/ui/Button.jsx` for every button and button-styled link. Don't
hand-roll button styles or mutate styles in `onMouseEnter`/`onMouseLeave`.

- `primary` — teal fill; the one main action in a view (Research, Sign in, form submit)
- `secondary` (default) — outlined; Donate, Export PDF, example chips, Re-run
- `ghost` — no border; header nav items, Report, Sign out, icon buttons
- `danger` — outlined red; destructive actions such as Clear all
- `link` — inline teal text link (footer links, "View on CanLII")
- `toggle` — on/off chip; pass `pressed` (sets `aria-pressed`)
- Sizes: `sm` (32px), `md` (40px, default), `lg` (46px), `icon` (36px square — always
  give it an `aria-label`). `pill` rounds it; `href` renders an `<a>`.

It forwards `ref`, `data-testid` and `aria-*` to the native element, defaults
`type="button"`, and passes the event to `onClick`.

## Layout and tokens

Non-colour tokens live in `src/lib/ui.js` (a plain module, safe for node-env tests):

- `RADIUS` — `md` (8) buttons/inputs/selects, `lg` (12) cards/panels/modals/callouts,
  `pill` chips/toggles/badges
- `CONTENT_MAX_WIDTH` (760) for the page column, `HEADER_MAX_WIDTH` (1040) for the
  header and footer, `PAGE_GUTTER` (24)
- `MOBILE_NAV_QUERY` — at or below 719px the header collapses into a Menu toggle;
  read it with `useMediaQuery` (`src/hooks/useMediaQuery.js`). Render one DOM copy of
  each nav item, never a hidden duplicate. Sign in stays in the bar on phones.

## Focus and accessibility

- `src/index.css` has a global teal `:focus-visible` ring. Never set inline
  `outline: "none"` on a focusable element, or the ring disappears.
- Dialogs put `role="dialog"`, `aria-modal` and an accessible name on the panel, close
  on Escape, and move focus inside on open.

## Implementation

- All component styling is inline via `ThemeContext` — no CSS framework
- Do not add Tailwind, CSS modules, or styled-components
- Never do string or number maths on theme tokens (hex→rgba etc.): several unit tests
  mock `useTheme` with a shape where every token is `undefined`. Add a literal token
  to `themes.dark` instead.
- No `document`/`window` access at module scope in components (`ResultCard.jsx` is
  imported by a node-env CI test)
- Colour tokens defined in `src/lib/themes.js`; font tokens in `src/index.css` `:root`
- `ThemeContext.jsx` provides theme to all components
