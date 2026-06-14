# CaseDive Design System

## Typography

Self-hosted variable fonts (latin subset, woff2) in `public/fonts/`, declared via
`@font-face` in `src/index.css` and exposed as CSS custom properties:

- Display/headlines/wordmark: Space Grotesk (`--font-display`)
- Body/UI: Inter (`--font-body`)
- Code/§ markers: JetBrains Mono (`--font-mono`)
- Labels: Inter, ~10–11px, uppercase, letter-spacing ~0.18em

All three have system fallbacks (`system-ui`, `ui-monospace`) so the UI still renders
if a font fails to load. Reference fonts only via `var(--font-*)` — no inline font stacks.

## Colors

Direction: **bold professional dark**. There is a single (dark) theme — no light mode,
no theme toggle. Accent is teal; amber is the secondary accent (`accentOlive`).
`accentRed`/`accentGreen` stay semantic (error/success).

- `#0B1220` bg, `#0F1A30` surfaces, `#E8EDF5` text, `#2DD4BF` accent, `#F59E0B` amber

`themes.js` exports only `themes.dark`; `ThemeContext` always provides it (`useTheme()`
returns the dark theme; there is no `useThemeActions`/`isDark`/`toggleTheme`).
Contrast is gated by `themes.test.js`: text ≥7:1, secondary/tertiary ≥4.5:1 on
bg/bgAlt/cardBg.

## Implementation

- All component styling is inline via `ThemeContext` — no CSS framework
- Do not add Tailwind, CSS modules, or styled-components
- Colour tokens defined in `src/lib/themes.js`; font tokens in `src/index.css` `:root`
- `ThemeContext.jsx` provides theme to all components
