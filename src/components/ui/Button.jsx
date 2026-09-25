import { forwardRef, useState } from "react";
import { useTheme } from "../../lib/ThemeContext.jsx";
import { RADIUS } from "../../lib/ui.js";

// Shared button. Variants:
//   primary   — teal fill, the one main action on a screen
//   secondary — outlined (default)
//   ghost     — no border, for nav items and low-emphasis actions
//   danger    — outlined red, for destructive actions
//   link      — inline text link in the accent colour
//   toggle    — on/off chip; pass `pressed`
// Sizes: sm, md (default), lg, icon (square; give it an aria-label).
// Renders an <a> when `href` is set. Hover lives in React state because inline
// styles can't express :hover; keyboard focus uses the global :focus-visible ring.

const SIZES = {
  sm: { minHeight: 32, padding: "0 12px", fontSize: 13, gap: 6 },
  md: { minHeight: 40, padding: "0 18px", fontSize: 14, gap: 8 },
  lg: { minHeight: 46, padding: "0 26px", fontSize: 15, gap: 8 },
  icon: { width: 36, height: 36, padding: 0, fontSize: 18, gap: 0 },
};

function variantStyle(t, variant, hot, pressed) {
  switch (variant) {
    case "primary":
      return {
        background: hot ? t.buttonBgHover : t.buttonBg,
        color: t.buttonText,
        borderColor: "transparent",
        fontWeight: 600,
      };
    case "ghost":
      return {
        background: hot ? t.bgHover : "transparent",
        color: hot ? t.text : t.textSecondary,
        borderColor: "transparent",
      };
    case "danger":
      return {
        background: hot ? t.bgHover : "transparent",
        color: t.accentRed,
        borderColor: hot ? t.accentRed : t.border,
      };
    case "link":
      return {
        background: "transparent",
        color: t.accent,
        borderColor: "transparent",
        textDecoration: hot ? "underline" : "none",
      };
    case "toggle":
      return pressed
        ? { background: t.accentSoft, color: t.text, borderColor: t.accent }
        : {
            background: hot ? t.bgHover : "transparent",
            color: t.textSecondary,
            borderColor: t.border,
          };
    case "secondary":
    default:
      return {
        background: hot ? t.bgHover : "transparent",
        color: t.text,
        borderColor: hot ? t.textTertiary : t.border,
      };
  }
}

const Button = forwardRef(function Button(
  {
    variant = "secondary",
    size = "md",
    href,
    pressed,
    pill = false,
    fullWidth = false,
    type = "button",
    disabled = false,
    style,
    onMouseEnter,
    onMouseLeave,
    children,
    ...rest
  },
  ref,
) {
  const t = useTheme();
  const [hovered, setHovered] = useState(false);
  const hot = hovered && !disabled;

  const { gap, ...sizeStyle } =
    variant === "link"
      ? { padding: 0, fontSize: (SIZES[size] || SIZES.md).fontSize, gap: 4 }
      : SIZES[size] || SIZES.md;

  const merged = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap,
    boxSizing: "border-box",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: pill ? RADIUS.pill : RADIUS.md,
    fontFamily: "var(--font-body)",
    fontWeight: 500,
    lineHeight: 1.2,
    letterSpacing: "normal",
    textTransform: "none",
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.45 : 1,
    transition: "background-color 0.15s, border-color 0.15s, color 0.15s",
    ...sizeStyle,
    ...variantStyle(t, variant, hot, pressed),
    ...style,
  };

  const handlers = {
    onMouseEnter: (e) => {
      setHovered(true);
      onMouseEnter?.(e);
    },
    onMouseLeave: (e) => {
      setHovered(false);
      onMouseLeave?.(e);
    },
  };

  const ariaPressed = pressed === undefined ? undefined : !!pressed;

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        style={merged}
        aria-pressed={ariaPressed}
        {...handlers}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      style={merged}
      aria-pressed={ariaPressed}
      {...handlers}
      {...rest}
    >
      {children}
    </button>
  );
});

export default Button;
