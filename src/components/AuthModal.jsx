import { useState } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { useAuth } from "../hooks/useAuth.js";

export default function AuthModal({ isOpen, onClose, mode: initialMode }) {
  const theme = useTheme();
  const { signIn, signUp } = useAuth();

  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const result =
        mode === "signin"
          ? await signIn(email, password)
          : await signUp(email, password);

      if (result) {
        setError(result);
      } else {
        onClose();
      }
    } finally {
      setSubmitting(false);
    }
  }

  function toggleMode() {
    setMode((m) => (m === "signin" ? "signup" : "signin"));
    setError(null);
    setEmail("");
    setPassword("");
  }

  const isSignIn = mode === "signin";
  const headingText = isSignIn ? "Sign In" : "Create Account";
  const submitLabel = isSignIn ? "Sign In" : "Sign Up";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={headingText}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.surface,
          border: `1px solid ${theme.border}`,
          borderRadius: 6,
          width: "100%",
          maxWidth: 400,
          padding: "32px 28px",
          position: "relative",
        }}
      >
        {/* Close button */}
        <button
          aria-label="Close"
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 14,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: theme.textSecondary,
            fontSize: 20,
            lineHeight: 1,
            padding: "2px 4px",
          }}
        >
          ×
        </button>

        {/* Heading */}
        <h2
          style={{
            margin: "0 0 24px",
            fontSize: 20,
            fontWeight: 600,
            color: theme.text,
          }}
        >
          {headingText}
        </h2>

        {/* Error message */}
        {error && (
          <div
            role="alert"
            style={{
              marginBottom: 16,
              padding: "10px 12px",
              background: theme.background,
              border: `1px solid ${theme.error}`,
              borderRadius: 4,
              color: theme.error,
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 16 }}>
            <input
              aria-label="Email"
              type="email"
              value={email}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                border: `1px solid ${theme.border}`,
                borderRadius: 4,
                background: theme.background,
                color: theme.text,
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <input
              aria-label="Password"
              type="password"
              value={password}
              placeholder="Password (8+ characters)"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 10px",
                border: `1px solid ${theme.border}`,
                borderRadius: 4,
                background: theme.background,
                color: theme.text,
                fontSize: 14,
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: "100%",
              padding: "10px",
              background: theme.primary,
              color: "#fff",
              border: "none",
              borderRadius: 4,
              fontSize: 14,
              fontWeight: 600,
              cursor: submitting ? "not-allowed" : "pointer",
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitLabel}
          </button>
        </form>

        {/* Mode toggle */}
        <div
          style={{
            marginTop: 16,
            textAlign: "center",
            fontSize: 13,
          }}
        >
          <button
            type="button"
            onClick={toggleMode}
            style={{
              background: "none",
              border: "none",
              color: theme.primary,
              cursor: "pointer",
              fontSize: 13,
              padding: 0,
              textDecoration: "underline",
            }}
          >
            {isSignIn
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
