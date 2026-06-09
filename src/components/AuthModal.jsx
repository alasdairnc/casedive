import { useEffect, useRef, useState } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { useAuth } from "../hooks/useAuth.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COPY = {
  signin: { heading: "Sign In", submit: "Sign In" },
  signup: { heading: "Create Account", submit: "Sign Up" },
  forgot: { heading: "Reset Password", submit: "Send Reset Link" },
  reset: { heading: "Set New Password", submit: "Update Password" },
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
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 10,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: t.textTertiary,
    marginBottom: 6,
  };

  const inputStyle = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${t.border}`,
    padding: "8px 0",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 14,
    color: t.text,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const focusInput = (e) => {
    e.target.style.borderBottomColor = t.accent;
  };
  const blurInput = (e) => {
    e.target.style.borderBottomColor = t.border;
  };

  const linkStyle = {
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
    fontFamily: "'Helvetica Neue', sans-serif",
    fontSize: 11,
    letterSpacing: "0.04em",
    color: t.textTertiary,
    transition: "color 0.15s",
  };

  const linkHover = (e) => {
    e.currentTarget.style.color = t.text;
  };
  const linkLeave = (e) => {
    e.currentTarget.style.color = t.textTertiary;
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
          boxShadow: `0 16px 48px ${t.shadowStrong}`,
          width: "100%",
          maxWidth: 400,
          position: "relative",
        }}
      >
        {/* Gold top rule — mirrors the site header */}
        <div style={{ height: 2, background: t.accent }} />

        <div style={{ padding: "26px 32px 30px" }}>
          <button
            aria-label="Close"
            onClick={onClose}
            onMouseEnter={linkHover}
            onMouseLeave={linkLeave}
            style={{
              position: "absolute",
              top: 14,
              right: 16,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: t.textTertiary,
              fontSize: 18,
              lineHeight: 1,
              padding: "2px 4px",
              transition: "color 0.15s",
            }}
          >
            ×
          </button>

          <div
            style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: 9,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
              color: t.textTertiary,
              marginBottom: 10,
            }}
          >
            CaseDive Account
          </div>

          <h2
            style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: 26,
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.3px",
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
                marginBottom: 18,
                paddingLeft: 10,
                borderLeft: `2px solid ${t.accentRed}`,
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 12,
                lineHeight: 1.6,
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
                marginBottom: 18,
                paddingLeft: 10,
                borderLeft: `2px solid ${t.accentGreen}`,
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 12,
                lineHeight: 1.6,
                color: t.accentGreen,
              }}
            >
              {notice}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {needsEmail && (
              <div style={{ marginBottom: 18 }}>
                <div style={labelStyle}>Email</div>
                <input
                  ref={emailRef}
                  aria-label="Email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={focusInput}
                  onBlur={blurInput}
                  style={inputStyle}
                />
              </div>
            )}

            {needsPassword && (
              <div style={{ marginBottom: 26 }}>
                <div style={labelStyle}>
                  {mode === "reset" ? "New Password" : "Password"}
                </div>
                <input
                  ref={passwordRef}
                  aria-label="Password"
                  type="password"
                  autoComplete={
                    mode === "signin" ? "current-password" : "new-password"
                  }
                  value={password}
                  placeholder="8+ characters"
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={focusInput}
                  onBlur={blurInput}
                  style={inputStyle}
                />
              </div>
            )}

            {!needsPassword && <div style={{ marginBottom: 26 }} />}

            <button
              type="submit"
              disabled={submitting}
              style={{
                width: "100%",
                background: "none",
                border: `1px solid ${submitting ? t.border : t.accentOlive}`,
                color: submitting ? t.textFaint : t.accentOlive,
                padding: "10px 28px",
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                cursor: submitting ? "wait" : "pointer",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (submitting) return;
                e.currentTarget.style.borderColor = t.text;
                e.currentTarget.style.color = t.text;
              }}
              onMouseLeave={(e) => {
                if (submitting) return;
                e.currentTarget.style.borderColor = t.accentOlive;
                e.currentTarget.style.color = t.accentOlive;
              }}
            >
              {submitting ? "Please wait…" : submit}
            </button>
          </form>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            {mode === "signin" && (
              <>
                <button
                  type="button"
                  onClick={() => switchMode("forgot")}
                  onMouseEnter={linkHover}
                  onMouseLeave={linkLeave}
                  style={linkStyle}
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  onClick={() => switchMode("signup")}
                  onMouseEnter={linkHover}
                  onMouseLeave={linkLeave}
                  style={linkStyle}
                >
                  Don&apos;t have an account? Sign Up
                </button>
              </>
            )}
            {mode === "signup" && (
              <button
                type="button"
                onClick={() => switchMode("signin")}
                onMouseEnter={linkHover}
                onMouseLeave={linkLeave}
                style={linkStyle}
              >
                Already have an account? Sign In
              </button>
            )}
            {mode === "forgot" && (
              <button
                type="button"
                onClick={() => switchMode("signin")}
                onMouseEnter={linkHover}
                onMouseLeave={linkLeave}
                style={linkStyle}
              >
                Back to Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
