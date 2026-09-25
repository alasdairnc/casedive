import { useEffect, useRef, useState } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { friendlyAuthError } from "../lib/authErrors.js";
import { RADIUS } from "../lib/ui.js";
import Button from "./ui/Button.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

const COPY = {
  signin: {
    heading: "Sign in",
    submit: "Sign in",
    intro:
      "Optional. An account keeps your bookmarks and search history in sync across devices.",
  },
  signup: {
    heading: "Create account",
    submit: "Create account",
    intro:
      "Optional. An account keeps your bookmarks and search history in sync across devices.",
  },
  magic: {
    heading: "Email me a link",
    submit: "Send sign-in link",
    intro:
      "No password needed. We'll email you a link that signs you in, and sets up your account if you're new.",
  },
  forgot: {
    heading: "Reset password",
    submit: "Send reset link",
    intro:
      "Enter your account email and we'll send you a link to choose a new password.",
  },
  reset: {
    heading: "Set new password",
    submit: "Update password",
    intro: "Choose a new password for your account.",
  },
};

// What the "check your email" screen says for each kind of email we send.
const SENT_COPY = {
  signup: (email) =>
    `We sent a confirmation link to ${email}. Open it to finish creating your account.`,
  forgot: (email) =>
    `If there's an account for ${email}, we sent it a password reset link.`,
  magic: (email) => `We sent a sign-in link to ${email}. It works once.`,
};

const ACTION_LABELS = {
  resend: "Resend confirmation email",
  forgot: "Reset your password",
  signin: "Sign in instead",
  magic: "Email me a sign-in link",
};

const FOCUSABLE =
  'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

export default function AuthModal({ isOpen, onClose, mode: initialMode }) {
  const t = useTheme();
  const {
    user,
    authMethods = {},
    signIn,
    signUp,
    signInWithMagicLink,
    signInWithGoogle,
    resendConfirmation,
    resetPassword,
    updatePassword,
  } = useAuth();

  const [mode, setMode] = useState(initialMode || "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // { message, action } — action is a key of ACTION_LABELS or null
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  // "Check your email" screen: { kind: "signup" | "forgot" | "magic", email }
  const [sent, setSent] = useState(null);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const panelRef = useRef(null);
  const headingRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const continueRef = useRef(null);
  const pressStartedOnBackdrop = useRef(false);

  // Reset to a clean slate every time the modal opens so a previous
  // session's mode, fields, or messages never leak into the next one.
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || "signin");
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setError(null);
      setNotice(null);
      setSent(null);
      setPasswordUpdated(false);
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
    if (passwordUpdated) continueRef.current?.focus();
    else if (sent) headingRef.current?.focus();
    else if (mode === "reset") passwordRef.current?.focus();
    else emailRef.current?.focus();
  }, [isOpen, mode, sent, passwordUpdated]);

  // Confirming the email or opening a sign-in link usually happens in a new
  // tab. Supabase syncs the session back here, so close the waiting screen.
  useEffect(() => {
    if (isOpen && user && sent && sent.kind !== "forgot") onClose();
  }, [isOpen, user, sent, onClose]);

  if (!isOpen) return null;

  const needsEmail = mode !== "reset";
  const needsPassword =
    mode === "signin" || mode === "signup" || mode === "reset";
  const isNewPassword = mode === "signup" || mode === "reset";
  const copy = COPY[mode] || COPY.signin;
  const heading = passwordUpdated
    ? "Password updated"
    : sent
      ? "Check your email"
      : copy.heading;
  const showOAuth =
    authMethods.google && !sent && (mode === "signin" || mode === "signup");

  function showError(raw) {
    setError(friendlyAuthError(raw));
  }

  function switchMode(next) {
    setMode(next);
    setError(null);
    setNotice(null);
    setSent(null);
    setPassword("");
    setShowPassword(false);
  }

  // Run an auth call with the shared busy flag. A thrown error (network
  // drop, SDK bug) lands in the same friendly error slot as a returned one.
  async function run(task) {
    setError(null);
    setNotice(null);
    setSubmitting(true);
    try {
      await task();
    } catch (err) {
      showError(err);
    } finally {
      setSubmitting(false);
    }
  }

  function validate() {
    const trimmed = email.trim();
    if (needsEmail && !trimmed) return "Enter your email address.";
    if (needsEmail && !EMAIL_RE.test(trimmed)) {
      return "Please enter a valid email address.";
    }
    if (mode === "signin" && !password) return "Enter your password.";
    if (isNewPassword && password.length < MIN_PASSWORD) {
      return `Password must be at least ${MIN_PASSWORD} characters.`;
    }
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const invalid = validate();
    if (invalid) {
      setNotice(null);
      setError({ message: invalid, action: null });
      return;
    }
    const addr = email.trim();

    run(async () => {
      if (mode === "signin") {
        const err = await signIn(addr, password);
        if (err) showError(err);
        else onClose();
      } else if (mode === "signup") {
        const result = await signUp(addr, password);
        const errMsg = typeof result === "string" ? result : result?.error;
        if (errMsg) {
          showError(errMsg);
        } else if (result?.needsConfirmation) {
          setPassword("");
          setSent({ kind: "signup", email: addr });
        } else {
          onClose();
        }
      } else if (mode === "magic") {
        const err = await signInWithMagicLink(addr);
        if (err) showError(err);
        else setSent({ kind: "magic", email: addr });
      } else if (mode === "forgot") {
        const err = await resetPassword(addr);
        if (err) showError(err);
        else setSent({ kind: "forgot", email: addr });
      } else if (mode === "reset") {
        const err = await updatePassword(password);
        if (err) {
          showError(err);
        } else {
          setPassword("");
          setPasswordUpdated(true);
        }
      }
    });
  }

  function resend() {
    if (!sent) return;
    run(async () => {
      const send = {
        signup: resendConfirmation,
        forgot: resetPassword,
        magic: signInWithMagicLink,
      }[sent.kind];
      const err = await send(sent.email);
      if (err) showError(err);
      else
        setNotice(
          "Sent again. Use the newest email; older links stop working.",
        );
    });
  }

  function googleSignIn() {
    run(async () => {
      const err = await signInWithGoogle();
      if (err) showError(err);
    });
  }

  function runAction(action) {
    if (action === "resend") {
      const addr = email.trim();
      run(async () => {
        const err = await resendConfirmation(addr);
        if (err) showError(err);
        else setSent({ kind: "signup", email: addr });
      });
    } else if (action === "forgot") {
      switchMode("forgot");
    } else if (action === "signin") {
      switchMode("signin");
    } else if (action === "magic") {
      switchMode("magic");
    }
  }

  function actionAvailable(action) {
    if (!action || !ACTION_LABELS[action]) return false;
    if (action === "magic") return Boolean(authMethods.magicLink);
    if (action === "resend") return EMAIL_RE.test(email.trim());
    if (action === "forgot") return mode !== "forgot";
    if (action === "signin") return mode !== "signin";
    return true;
  }

  // Keep Tab inside the dialog.
  function trapFocus(e) {
    if (e.key !== "Tab" || !panelRef.current) return;
    const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)];
    if (nodes.length === 0) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
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
    minHeight: 44,
    background: t.bgAlt,
    border: `1px solid ${t.border}`,
    borderRadius: RADIUS.md,
    padding: "10px 12px",
    fontFamily: "var(--font-body)",
    fontSize: 16, // 16px stops iOS Safari zooming the page on focus
    color: t.text,
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const focusInput = (e) => {
    e.target.style.borderColor = t.accent;
  };
  const blurInput = (e) => {
    e.target.style.borderColor = t.border;
  };

  const introStyle = {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    lineHeight: 1.6,
    color: t.textSecondary,
    margin: "0 0 20px",
  };

  const calloutStyle = (tone) => ({
    marginBottom: 18,
    padding: "10px 12px",
    background: t.bgAlt,
    border: `1px solid ${t.border}`,
    borderLeft: `3px solid ${tone}`,
    borderRadius: RADIUS.md,
    fontFamily: "var(--font-body)",
    fontSize: 13,
    lineHeight: 1.6,
    color: tone,
  });

  const bottomLink = (label, onClick) => (
    <Button variant="link" size="sm" onClick={onClick}>
      {label}
    </Button>
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-heading"
      onMouseDown={(e) => {
        pressStartedOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        // Only a click that starts and ends on the backdrop closes the modal,
        // so dragging a text selection out of an input doesn't lose the form.
        if (e.target === e.currentTarget && pressStartedOnBackdrop.current) {
          onClose();
        }
        pressStartedOnBackdrop.current = false;
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        overflowY: "auto",
      }}
    >
      <div
        ref={panelRef}
        onKeyDown={trapFocus}
        style={{
          background: t.bg,
          border: `1px solid ${t.border}`,
          borderRadius: RADIUS.lg,
          boxShadow: `0 16px 48px ${t.shadowStrong}`,
          width: "100%",
          maxWidth: 400,
          position: "relative",
          margin: "auto",
        }}
      >
        <div style={{ padding: "24px 28px 28px" }}>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={onClose}
            style={{ position: "absolute", top: 12, right: 12 }}
          >
            ×
          </Button>

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              fontWeight: 600,
              color: t.textTertiary,
              marginBottom: 6,
            }}
          >
            CaseDive account
          </div>

          <h2
            id="auth-modal-heading"
            ref={headingRef}
            tabIndex={-1}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 600,
              color: t.text,
              margin: "0 0 10px",
              // Programmatic focus target only (tabIndex -1), never tabbed to
              outline: "none",
            }}
          >
            {heading}
          </h2>

          {!sent && !passwordUpdated && <p style={introStyle}>{copy.intro}</p>}

          {error && (
            <div role="alert" style={calloutStyle(t.accentRed)}>
              {error.message}
              {actionAvailable(error.action) && (
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => runAction(error.action)}
                  disabled={submitting}
                  style={{ marginLeft: 6, textDecoration: "underline" }}
                >
                  {ACTION_LABELS[error.action]}
                </Button>
              )}
            </div>
          )}

          {(sent || passwordUpdated || notice) && (
            <div role="status" style={calloutStyle(t.accentGreen)}>
              {passwordUpdated
                ? "Password updated. You're signed in with your new password."
                : sent
                  ? SENT_COPY[sent.kind](sent.email)
                  : null}
              {notice && (sent || passwordUpdated) ? " " : null}
              {notice}
            </div>
          )}

          {passwordUpdated ? (
            <Button
              ref={continueRef}
              variant="primary"
              size="md"
              fullWidth
              onClick={onClose}
            >
              Continue
            </Button>
          ) : sent ? (
            <>
              <p style={introStyle}>
                Nothing after a couple of minutes? Check your spam or promotions
                folder, then resend.
              </p>
              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={resend}
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Resend email"}
              </Button>
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {bottomLink("Use a different email", () => {
                  setSent(null);
                  setError(null);
                  setNotice(null);
                })}
                {sent.kind !== "magic" &&
                  bottomLink(
                    sent.kind === "signup"
                      ? "Already confirmed? Sign in"
                      : "Back to sign in",
                    () => switchMode("signin"),
                  )}
              </div>
            </>
          ) : (
            <>
              {showOAuth && (
                <>
                  <Button
                    variant="secondary"
                    size="md"
                    fullWidth
                    onClick={googleSignIn}
                    disabled={submitting}
                  >
                    Continue with Google
                  </Button>
                  <div
                    aria-hidden="true"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      margin: "18px 0",
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      color: t.textTertiary,
                    }}
                  >
                    <span
                      style={{ flex: 1, borderTop: `1px solid ${t.border}` }}
                    />
                    or
                    <span
                      style={{ flex: 1, borderTop: `1px solid ${t.border}` }}
                    />
                  </div>
                </>
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
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      autoCapitalize="none"
                      spellCheck={false}
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
                  <div style={{ marginBottom: 22 }}>
                    <label htmlFor="auth-password" style={labelStyle}>
                      {mode === "reset" ? "New password" : "Password"}
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        id="auth-password"
                        ref={passwordRef}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete={
                          mode === "signin"
                            ? "current-password"
                            : "new-password"
                        }
                        aria-describedby={
                          isNewPassword ? "auth-password-hint" : undefined
                        }
                        value={password}
                        placeholder={
                          mode === "reset"
                            ? "New password"
                            : mode === "signup"
                              ? "Create a password"
                              : "Your password"
                        }
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={focusInput}
                        onBlur={blurInput}
                        style={{ ...inputStyle, paddingRight: 72 }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        pressed={showPassword}
                        style={{
                          position: "absolute",
                          right: 6,
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </div>
                    {mode === "signin" && (
                      // After the field in the DOM so Tab goes email → password.
                      <div style={{ textAlign: "right", marginTop: 8 }}>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => switchMode("forgot")}
                        >
                          Forgot password?
                        </Button>
                      </div>
                    )}
                    {isNewPassword && (
                      <div
                        id="auth-password-hint"
                        style={{
                          marginTop: 6,
                          fontFamily: "var(--font-body)",
                          fontSize: 12,
                          color: t.textTertiary,
                        }}
                      >
                        At least {MIN_PASSWORD} characters. A short phrase is
                        easy to remember.
                      </div>
                    )}
                  </div>
                )}

                {!needsPassword && <div style={{ marginBottom: 6 }} />}

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={submitting}
                  style={submitting ? { cursor: "wait" } : undefined}
                >
                  {submitting ? "Please wait…" : copy.submit}
                </Button>
              </form>

              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {mode === "signin" &&
                  bottomLink("New to CaseDive? Create an account", () =>
                    switchMode("signup"),
                  )}
                {mode === "signup" &&
                  bottomLink("Already have an account? Sign in", () =>
                    switchMode("signin"),
                  )}
                {(mode === "signin" || mode === "signup") &&
                  authMethods.magicLink &&
                  bottomLink("Email me a sign-in link instead", () =>
                    switchMode("magic"),
                  )}
                {mode === "magic" &&
                  bottomLink("Use a password instead", () =>
                    switchMode("signin"),
                  )}
                {mode === "forgot" &&
                  bottomLink("Back to sign in", () => switchMode("signin"))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
