import { useState, useEffect } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { RADIUS } from "../lib/ui.js";

const stages = [
  "Analyzing scenario...",
  "Searching Criminal Code...",
  "Searching case law & civil law...",
  "Checking Charter implications...",
  "Building legal analysis...",
];

// Rendered inside App's results container, so no own max-width or gutter.
export default function StagedLoading() {
  const t = useTheme();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = stages.map((_, i) =>
      setTimeout(() => setStage(i), i * 1500),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        background: t.bgAlt,
        border: `1px solid ${t.border}`,
        borderRadius: RADIUS.lg,
        padding: 20,
      }}
    >
      <ol
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {stages.map((s, i) => (
          <li
            key={i}
            aria-current={i === stage ? "step" : undefined}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: i === stage ? 500 : 400,
              color:
                i < stage
                  ? t.textSecondary
                  : i === stage
                    ? t.text
                    : t.textTertiary,
              transition: "color 0.4s",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                flexShrink: 0,
                width: 8,
                height: 8,
                background:
                  i < stage
                    ? t.accentGreen
                    : i === stage
                      ? t.accent
                      : t.border,
                borderRadius: "50%",
                transition: "background 0.4s",
              }}
            />
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
