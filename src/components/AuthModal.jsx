import { useEffect, useRef, useState } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { useAuth } from "../hooks/useAuth.js";
import Button from "./ui/Button.jsx";
import { RADIUS } from "../lib/ui.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY = {
  signin: { heading: "Sign in", submit: "Sign in" },
  signup: { heading: "Create account", submit: "Sign up" },
  forgot: { heading: "Reset password", submit: "Send reset link" },
  reset: { heading: "Set new password", submit: "Update password" },
};

export default function AuthModal({ isOpen, onClose, mode: initialMode }) {
  const t = useTheme();
  const { signIn, signUp, resetPassword, updatePassword } = useAuth();

  const [mode, setMode] = useState(initialMode || "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Reset to a clean slate every time the modal opens so a previous
  // session's mode, fields, or messages never leak into the next one.
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || "signin");
      setEmail("");
      setPassword("");
      setError(null);
      setNotice(null);
    }
  }, [isOpen, initialMode]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const el = mode === "reset" ? passwordRef.current : emailRef.current;
    el?.focus();
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const needsEmail = mode !== "reset";
  const needsPassword = mode !== "forgot";
  const { heading, submit } = COPY[mode] || COPY.signin;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (needsEmail && !EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    if (needsPassword && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "signin") {
        const result = await signIn(email.trim(), password);
        if (result) setError(result);
        else onClose();
      } else if (mode === "signup") {
        const result = await signUp(email.trim(), password);
        const errMsg = typeof result === "string" ? result : result?.error;
        const needsConfirmation =
          result && typeof result === "object" && result.needsConfirmation;
        if (errMsg) {
          setError(errMsg);
        } else if (needsConfirmation) {
          setNotice(
            "Check your email — confirm your address to finish creating your account.",
          );
          setPassword("");
        } else {
          onClose();
        }
      } else if (mode === "forgot") {
        const result = await resetPassword?.(email.trim());
        if (result) setError(result);
        else setNotice("Check your email for a password reset link.");
      } else if (mode === "reset") {
        const result = await updatePassword?.(password);
        if (result) {
          setError(result);
        } else {
          setNotice("Password updated — you're signed in.");
          setPassword("");
        }
      }
    } finally {
      setSubmitting(false);
    }
  }

  function switchMode(next) {
    setMode(next);
    setError(null);
    setNotice(null);
    setPassword("");
  }

  const labelStyle = {
    display: "block",
    fontFamily: "var(--font-body)",
    fontSize: 13,
    fontWeight: 600,
    color: t.textSecondary,
    marginBottom: 6,
  };

  const inputStyle = {
    width: "100%",
    height: 40,
    background: t.bgAlt,
    border: `1px solid ${t.border}`,
    borderRadius: RADIUS.md,
    padding: "0 12px",
    fontFamily: "var(--font-body)",
    fontSize: 14,
    color: t.text,
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const calloutStyle = {
    marginBottom: 18,
    padding: "10px 14px",
    borderRadius: RADIUS.lg,
    background: t.bgAlt,
    fontFamily: "var(--font-body)",
    fontSize: 14,
    lineHeight: 1.5,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={heading}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: RADIUS.lg,
          boxShadow: `0 16px 48px ${t.shadowStrong}`,
          width: "100%",
          maxWidth: 400,
          position: "relative",
          padding: "24px 28px 28px",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close"
          onClick={onClose}
          style={{ position: "absolute", top: 12, right: 12, fontSize: 22 }}
        >
          ×
        </Button>

        <div
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 12,
            fontWeight: 500,
            color: t.textTertiary,
            marginBottom: 6,
          }}
        >
          CaseDive account
        </div>

        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1.25,
            color: t.text,
            margin: "0 0 22px",
          }}
        >
          {heading}
        </h2>

        {error && (
          <div
            role="alert"
            style={{
              ...calloutStyle,
              border: `1px solid ${t.accentRed}`,
              color: t.accentRed,
            }}
          >
            {error}
          </div>
        )}

        {notice && (
          <div
            role="status"
            style={{
              ...calloutStyle,
              border: `1px solid ${t.accentGreen}`,
              color: t.accentGreen,
            }}
          >
            {notice}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {needsEmail && (
            <div style={{ marginBottom: 16 }}>
              <label htmlFor="auth-email" style={labelStyle}>
                Email
              </label>
              <input
                id="auth-email"
                ref={emailRef}
                aria-label="Email"
                type="email"
                autoComplete="email"
                value={email}
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}

          {needsPassword && (
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="auth-password" style={labelStyle}>
                {mode === "reset" ? "New password" : "Password"}
              </label>
              <input
                id="auth-password"
                ref={passwordRef}
                aria-label="Password"
                type="password"
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
                value={password}
                placeholder="8+ characters"
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
            </div>
          )}

          {!needsPassword && <div style={{ marginBottom: 8 }} />}

          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            disabled={submitting}
            style={submitting ? { cursor: "wait" } : undefined}
          >
            {submitting ? "Please wait…" : submit}
          </Button>
        </form>

        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          {mode === "signin" && (
            <>
              <Button
                variant="link"
                size="sm"
                onClick={() => switchMode("forgot")}
              >
                Forgot password?
              </Button>
              <Button
                variant="link"
                size="sm"
                onClick={() => switchMode("signup")}
              >
                Don&apos;t have an account? Sign up
              </Button>
            </>
          )}
          {mode === "signup" && (
            <Button
              variant="link"
              size="sm"
              onClick={() => switchMode("signin")}
            >
              Already have an account? Sign in
            </Button>
          )}
          {mode === "forgot" && (
            <Button
              variant="link"
              size="sm"
              onClick={() => switchMode("signin")}
            >
              Back to sign in
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
