import { useId, useState } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { RADIUS } from "../lib/ui.js";

// Chevron drawn as a data-URI so the native <select> keeps its role and value.
function chevron(color) {
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' fill='none' stroke='${encodeURIComponent(color)}' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`;
}

// Styled native <select>. Forwards every prop (aria-label, id, value,
// onChange…) to the element; `style` merges last for overrides.
export function SelectControl({ style, children, ...rest }) {
  const t = useTheme();
  const [hovered, setHovered] = useState(false);
  return (
    <select
      {...rest}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: 36,
        maxWidth: "100%",
        padding: "0 32px 0 12px",
        fontFamily: "var(--font-body)",
        fontSize: 13,
        color: t.text,
        backgroundColor: t.bgAlt,
        backgroundImage: chevron(t.textTertiary),
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        backgroundSize: "10px 6px",
        border: `1px solid ${hovered ? t.textTertiary : t.border}`,
        borderRadius: RADIUS.md,
        cursor: "pointer",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "none",
        textOverflow: "ellipsis",
        boxSizing: "border-box",
        transition: "border-color 0.15s",
        ...style,
      }}
    >
      {children}
    </select>
  );
}

export default function Select({ label, options, value, onChange }) {
  const t = useTheme();
  const id = useId();
  return (
    <div style={{ flex: "1 1 160px", minWidth: 0 }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontFamily: "var(--font-body)",
          fontSize: 13,
          fontWeight: 600,
          color: t.textSecondary,
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <SelectControl
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "100%" }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </SelectControl>
    </div>
  );
}
