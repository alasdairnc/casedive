import { useEffect, useRef, useState } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { friendlyAuthError } from "../lib/authErrors.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

const COPY = {
  signin: {
    heading: "Sign In",
    submit: "Sign In",
    intro:
      "Optional. An account keeps your bookmarks and search history in sync across devices.",
  },
  signup: {
    heading: "Create Account",
    submit: "Create Account",
    intro:
      "Optional. An account keeps your bookmarks and search history in sync across devices.",
  },
  magic: {
    heading: "Email Me a Link",
    submit: "Send Sign-In Link",
    intro:
      "No password needed. We'll email you a link that signs you in, and sets up your account if you're new.",
  },
  forgot: {
    heading: "Reset Password",
    submit: "Send Reset Link",
    intro:
      "Enter your account email and we'll send you a link to choose a new password.",
  },
  reset: {
    heading: "Set New Password",
    submit: "Update Password",
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
    ? "Password Updated"
    : sent
      ? "Check Your Email"
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
    fontFamily: "var(--font-body)",
    fontSize: 16, // 16px stops iOS Safari zooming the page on focus
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
    padding: "4px 0",
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontSize: 12,
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

  const primaryButtonStyle = {
    width: "100%",
    background: "none",
    border: `1px solid ${submitting ? t.border : t.accentOlive}`,
    color: submitting ? t.textFaint : t.accentOlive,
    padding: "12px 28px",
    fontFamily: "var(--font-body)",
    fontSize: 11,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    cursor: submitting ? "wait" : "pointer",
    transition: "border-color 0.2s, color 0.2s",
  };
  const primaryHover = (e) => {
    if (submitting) return;
    e.currentTarget.style.borderColor = t.text;
    e.currentTarget.style.color = t.text;
  };
  const primaryLeave = (e) => {
    if (submitting) return;
    e.currentTarget.style.borderColor = t.accentOlive;
    e.currentTarget.style.color = t.accentOlive;
  };

  const secondaryButtonStyle = {
    ...primaryButtonStyle,
    border: `1px solid ${t.border}`,
    color: submitting ? t.textFaint : t.text,
  };

  const inlineActionStyle = {
    background: "none",
    border: "none",
    padding: 0,
    marginLeft: 6,
    cursor: "pointer",
    fontFamily: "var(--font-body)",
    fontSize: 12,
    color: t.text,
    textDecoration: "underline",
    textUnderlineOffset: 3,
  };

  const introStyle = {
    fontFamily: "var(--font-body)",
    fontSize: 12,
    lineHeight: 1.6,
    color: t.textSecondary,
    margin: "0 0 20px",
  };

  const bottomLink = (label, onClick) => (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={linkHover}
      onMouseLeave={linkLeave}
      style={linkStyle}
    >
      {label}
    </button>
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
        background: "rgba(0,0,0,0.45)",
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
          boxShadow: `0 16px 48px ${t.shadowStrong}`,
          width: "100%",
          maxWidth: 400,
          position: "relative",
          margin: "auto",
        }}
      >
        {/* Accent top rule — mirrors the site header */}
        <div style={{ height: 2, background: t.accent }} />

        <div style={{ padding: "26px 28px 28px" }}>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            onMouseEnter={linkHover}
            onMouseLeave={linkLeave}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: t.textTertiary,
              fontSize: 20,
              lineHeight: 1,
              width: 36,
              height: 36,
              transition: "color 0.15s",
            }}
          >
            ×
          </button>

          <div
            style={{
              fontFamily: "var(--font-body)",
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
            id="auth-modal-heading"
            ref={headingRef}
            tabIndex={-1}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 26,
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: "-0.3px",
              color: t.text,
              margin: "0 0 12px",
              outline: "none",
            }}
          >
            {heading}
          </h2>

          {!sent && !passwordUpdated && <p style={introStyle}>{copy.intro}</p>}

          {error && (
            <div
              role="alert"
              style={{
                marginBottom: 18,
                paddingLeft: 10,
                borderLeft: `2px solid ${t.accentRed}`,
                fontFamily: "var(--font-body)",
                fontSize: 12,
                lineHeight: 1.6,
                color: t.accentRed,
              }}
            >
              {error.message}
              {actionAvailable(error.action) && (
                <button
                  type="button"
                  onClick={() => runAction(error.action)}
                  disabled={submitting}
                  style={inlineActionStyle}
                >
                  {ACTION_LABELS[error.action]}
                </button>
              )}
            </div>
          )}

          {(sent || passwordUpdated || notice) && (
            <div
              role="status"
              style={{
                marginBottom: 18,
                paddingLeft: 10,
                borderLeft: `2px solid ${t.accentGreen}`,
                fontFamily: "var(--font-body)",
                fontSize: 12,
                lineHeight: 1.6,
                color: t.accentGreen,
              }}
            >
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
            <button
              ref={continueRef}
              type="button"
              onClick={onClose}
              onMouseEnter={primaryHover}
              onMouseLeave={primaryLeave}
              style={primaryButtonStyle}
            >
              Continue
            </button>
          ) : sent ? (
            <>
              <p style={introStyle}>
                Nothing after a couple of minutes? Check your spam or promotions
                folder, then resend.
              </p>
              <button
                type="button"
                onClick={resend}
                disabled={submitting}
                style={secondaryButtonStyle}
              >
                {submitting ? "Sending…" : "Resend Email"}
              </button>
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
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
                      : "Back to Sign In",
                    () => switchMode("signin"),
                  )}
              </div>
            </>
          ) : (
            <>
              {showOAuth && (
                <>
                  <button
                    type="button"
                    onClick={googleSignIn}
                    disabled={submitting}
                    style={secondaryButtonStyle}
                  >
                    Continue with Google
                  </button>
                  <div
                    aria-hidden="true"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      margin: "18px 0",
                      fontFamily: "var(--font-body)",
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
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
                  <div style={{ marginBottom: 18 }}>
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
                  <div style={{ marginBottom: 24 }}>
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
                        style={{ ...inputStyle, paddingRight: 52 }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        aria-pressed={showPassword}
                        onMouseEnter={linkHover}
                        onMouseLeave={linkLeave}
                        style={{
                          ...linkStyle,
                          position: "absolute",
                          right: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: 10,
                          letterSpacing: "0.16em",
                          textTransform: "uppercase",
                          padding: "8px 0 8px 8px",
                        }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    {mode === "signin" && (
                      // After the field in the DOM so Tab goes email → password.
                      <div style={{ textAlign: "right", marginTop: 6 }}>
                        <button
                          type="button"
                          onClick={() => switchMode("forgot")}
                          onMouseEnter={linkHover}
                          onMouseLeave={linkLeave}
                          style={{ ...linkStyle, fontSize: 11 }}
                        >
                          Forgot password?
                        </button>
                      </div>
                    )}
                    {isNewPassword && (
                      <div
                        id="auth-password-hint"
                        style={{
                          marginTop: 6,
                          fontFamily: "var(--font-body)",
                          fontSize: 11,
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

                <button
                  type="submit"
                  disabled={submitting}
                  style={primaryButtonStyle}
                  onMouseEnter={primaryHover}
                  onMouseLeave={primaryLeave}
                >
                  {submitting ? "Please wait…" : copy.submit}
                </button>
              </form>

              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
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
                  bottomLink("Back to Sign In", () => switchMode("signin"))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
