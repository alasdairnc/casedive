import { useTheme } from "../lib/ThemeContext.jsx";
import Button from "./ui/Button.jsx";
import { RADIUS } from "../lib/ui.js";

// Rendered inside App's results container, so no own max-width or gutter.
export default function ErrorMessage({ message, onRetry }) {
  const t = useTheme();
  return (
    <div
      role="alert"
      style={{
        background: t.bgAlt,
        borderTop: `1px solid ${t.border}`,
        borderRight: `1px solid ${t.border}`,
        borderBottom: `1px solid ${t.border}`,
        borderLeft: `3px solid ${t.accentRed}`,
        borderRadius: RADIUS.lg,
        padding: 20,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 13,
          fontWeight: 600,
          color: t.accentRed,
          marginBottom: 6,
        }}
      >
        Error
      </div>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: t.textSecondary,
          lineHeight: 1.6,
        }}
      >
        {message}
      </p>
      <Button
        variant="primary"
        size="md"
        onClick={onRetry}
        style={{ marginTop: 16 }}
      >
        Try again
      </Button>
    </div>
  );
}
