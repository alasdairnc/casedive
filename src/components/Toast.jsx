import { useEffect, useRef } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { RADIUS } from "../lib/ui.js";
import Button from "./ui/Button.jsx";

const AUTO_DISMISS_MS = 6000;

/**
 * Small, non-blocking message pinned to the bottom of the viewport.
 * Optional action button (e.g. "Sign in"). Auto-dismisses.
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
        borderLeft: `3px solid ${t.accent}`,
        borderRadius: RADIUS.lg,
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
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              onAction();
              onDismiss?.();
            }}
          >
            {actionLabel}
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label="Dismiss"
          onClick={() => onDismiss?.()}
        >
          ×
        </Button>
      </span>
    </div>
  );
}
