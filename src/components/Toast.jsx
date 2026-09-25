import { useEffect, useRef } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";

const AUTO_DISMISS_MS = 6000;

/**
 * Small, non-blocking message pinned to the bottom of the viewport.
 * Optional action button (e.g. "Sign In"). Auto-dismisses.
 */
export default function Toast({ message, actionLabel, onAction, onDismiss }) {
  const t = useTheme();

  // Parent re-renders pass a fresh onDismiss each time; keep the timer keyed
  // to the message only so typing elsewhere doesn't keep resetting it.
  const dismissRef = useRef(onDismiss);
  dismissRef.current = onDismiss;

  useEffect(() => {
    const id = setTimeout(() => dismissRef.current?.(), AUTO_DISMISS_MS);
    return () => clearTimeout(id);
  }, [message]);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed",
        left: "50%",
        bottom: "max(20px, env(safe-area-inset-bottom))",
        transform: "translateX(-50%)",
        zIndex: 250,
        width: "calc(100% - 32px)",
        maxWidth: 460,
        background: t.bgAlt,
        border: `1px solid ${t.border}`,
        borderTop: `2px solid ${t.accent}`,
        boxShadow: `0 12px 32px ${t.shadowStrong}`,
        padding: "12px 14px 12px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        fontFamily: "var(--font-body)",
        fontSize: 13,
        lineHeight: 1.5,
        color: t.text,
      }}
    >
      <span style={{ flex: "1 1 200px" }}>{message}</span>
      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={() => {
              onAction();
              onDismiss?.();
            }}
            style={{
              background: "none",
              border: `1px solid ${t.accentOlive}`,
              color: t.accentOlive,
              cursor: "pointer",
              padding: "6px 12px",
              fontFamily: "var(--font-body)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {actionLabel}
          </button>
        )}
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => onDismiss?.()}
          style={{
            background: "none",
            border: "none",
            color: t.textTertiary,
            cursor: "pointer",
            fontSize: 18,
            lineHeight: 1,
            width: 32,
            height: 32,
          }}
        >
          ×
        </button>
      </span>
    </div>
  );
}
