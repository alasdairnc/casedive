import { useEffect, useRef, useState } from "react";
import { useTheme } from "../lib/ThemeContext.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { friendlyAuthError, friendlyCodeError } from "../lib/authErrors.js";
import { RADIUS } from "../lib/ui.js";
import Button from "./ui/Button.jsx";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;
// Supabase lets the project choose a 6-10 digit email code (default 6), so
// accept anything in that range rather than hardcoding one length.
const CODE_MIN = 6;
const CODE_MAX = 10;
const CODE_RE = new RegExp(`^\\d{${CODE_MIN},${CODE_MAX}}$`);
// Supabase refuses a second email to the same address within 60 seconds.
const RESEND_COOLDOWN_S = 60;

const TABS = [
  { mode: "signin", label: "Sign in" },
  { mode: "signup", label: "Create account" },
];

const ACCOUNT_INTRO =
  "Optional. An account keeps your bookmarks and search history in sync across devices.";

const COPY = {
  signin: {
    heading: "Sign in",
    submit: "Sign in",
    intro: ACCOUNT_INTRO,
  },
  signup: {
    heading: "Create account",
    submit: "Create account",
    intro: ACCOUNT_INTRO,
  },
  forgot: {
    heading: "Reset password",
    submit: "Send reset code",
    intro:
      "Enter your account email and we'll send you a code to choose a new password.",
  },
  reset: {
    heading: "Set new password",
    submit: "Update password",
    intro: "Choose a new password for your account.",
  },
};

// The "check your email" screen, for each kind of code we send.
const CODE_COPY = {
  signup: {
    submit: "Verify and sign in",
    sent: (email) =>
      `We sent a code to ${email}. Enter it below to finish creating your account.`,
    help: "No email after a couple of minutes? Check your spam or promotions folder, or sign in if you already have an account.",
  },
  recovery: {
    submit: "Verify code",
    sent: (email) =>
      `If there's an account for ${email}, we sent it a code. Enter it below to choose a new password.`,
    help: "Nothing after a couple of minutes? Check your spam or promotions folder, then resend.",
  },
};

const ACTION_LABELS = {
  resend: "Send a new code",
  forgot: "Reset your password",
  signin: "Sign in instead",
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
    verifySignupCode,
    verifyRecoveryCode,
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
  // "Enter the code" screen: { kind: "signup" | "recovery", email }
  const [codeStep, setCodeStep] = useState(null);
  const [code, setCode] = useState("");
  // The resend button works again at resendAt (epoch ms). It is judged
  // against `now`, which a timer and visibilitychange keep current.
  const [resendAt, setResendAt] = useState(0);
  const [now, setNow] = useState(() => Date.now());
  const cooldown = Math.max(0, Math.ceil((resendAt - now) / 1000));
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const panelRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const codeRef = useRef(null);
  const continueRef = useRef(null);
  const pressStartedOnBackdrop = useRef(false);

  // Reset to a clean slate every time the modal opens so a previous
  // session's mode, fields, or messages never leak into the next one.
  // Also runs when the app pushes a new mode in (it opens "reset" once a
  // recovery code or link has signed the user in).
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode || "signin");
      setEmail("");
      setPassword("");
      setShowPassword(false);
      setError(null);
      setNotice(null);
      setCodeStep(null);
      setCode("");
      setResendAt(0);
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
    else if (codeStep) codeRef.current?.focus();
    else if (mode === "reset") passwordRef.current?.focus();
    // Arrowing between the tabs must keep focus on the tab strip.
    else if (document.activeElement?.getAttribute("role") !== "tab") {
      emailRef.current?.focus();
    }
  }, [isOpen, mode, codeStep, passwordUpdated]);

  // Count down against the clock, not by ticks: a phone freezes this page's
  // timers while the user reads the email in their mail app, so re-check
  // when they come back as well.
  useEffect(() => {
    if (!resendAt) return undefined;
    const timer = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= resendAt) clearInterval(timer);
    }, 1000);
    const onVisible = () => setNow(Date.now());
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [resendAt]);

  // Confirming through the emailed link in another tab syncs the session back
  // here, so close the waiting screen. A reset code signs the user in too, but
  // they still have to choose a new password, so that one stays open.
  useEffect(() => {
    if (isOpen && user && codeStep?.kind === "signup") onClose();
  }, [isOpen, user, codeStep, onClose]);

  if (!isOpen) return null;

  const needsEmail = mode !== "reset" && !codeStep;
  const needsPassword =
    !codeStep && (mode === "signin" || mode === "signup" || mode === "reset");
  const isNewPassword = mode === "signup" || mode === "reset";
  const copy = COPY[mode] || COPY.signin;
  const codeCopy = codeStep ? CODE_COPY[codeStep.kind] : null;
  const showTabs =
    !codeStep && !passwordUpdated && (mode === "signin" || mode === "signup");
  const heading = passwordUpdated
    ? "Password updated"
    : codeStep
      ? "Check your email"
      : copy.heading;
  const showOAuth = authMethods.google && showTabs;
  const panelProps = showTabs
    ? {
        id: "auth-panel",
        role: "tabpanel",
        "aria-labelledby": `auth-tab-${mode}`,
      }
    : {};

  function showError(raw, friendly = friendlyAuthError) {
    setError(friendly(raw));
  }

  function switchMode(next) {
    setMode(next);
    setError(null);
    setNotice(null);
    setCodeStep(null);
    setCode("");
    setPassword("");
    setShowPassword(false);
  }

  function startCooldown() {
    const current = Date.now();
    setNow(current);
    setResendAt(current + RESEND_COOLDOWN_S * 1000);
  }

  // Move to the "enter the code" screen once an email has gone out.
  function enterCodeStep(kind, addr) {
    setError(null);
    setNotice(null);
    setPassword("");
    setShowPassword(false);
    setCode("");
    startCooldown();
    setCodeStep({ kind, email: addr });
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
    if (codeStep) {
      return CODE_RE.test(code) ? null : "Enter the code from your email.";
    }
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
      if (codeStep) {
        const verify =
          codeStep.kind === "signup" ? verifySignupCode : verifyRecoveryCode;
        const err = await verify(codeStep.email, code);
        if (err) {
          showError(err, friendlyCodeError);
          return;
        }
        setCode("");
        if (codeStep.kind === "signup") {
          onClose();
        } else {
          // The code opened a reset session; the next step is the new password.
          setCodeStep(null);
          setMode("reset");
        }
      } else if (mode === "signin") {
        const err = await signIn(addr, password);
        if (err) showError(err);
        else onClose();
      } else if (mode === "signup") {
        const result = await signUp(addr, password);
        const errMsg = typeof result === "string" ? result : result?.error;
        if (errMsg) {
          showError(errMsg);
        } else if (result?.needsConfirmation) {
          enterCodeStep("signup", addr);
        } else {
          onClose();
        }
      } else if (mode === "forgot") {
        const err = await resetPassword(addr);
        if (err) showError(err);
        else enterCodeStep("recovery", addr);
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
    if (!codeStep || cooldown > 0) return;
    run(async () => {
      const send =
        codeStep.kind === "signup" ? resendConfirmation : resetPassword;
      const err = await send(codeStep.email);
      if (err) {
        showError(err);
      } else {
        startCooldown();
        setNotice("Sent again. Use the newest code; older ones stop working.");
        // The button just disabled itself; don't leave focus on it.
        codeRef.current?.focus();
      }
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
      // Only reached from a sign-in that hit an unconfirmed account.
      const addr = email.trim();
      run(async () => {
        const err = await resendConfirmation(addr);
        if (err) showError(err);
        else enterCodeStep("signup", addr);
      });
    } else if (action === "forgot") {
      switchMode("forgot");
    } else if (action === "signin") {
      switchMode("signin");
    }
  }

  function actionAvailable(action) {
    if (!action || !ACTION_LABELS[action]) return false;
    if (action === "resend") return EMAIL_RE.test(email.trim());
    if (action === "forgot") return mode !== "forgot";
    if (action === "signin") return mode !== "signin";
    return true;
  }

  // Left/Right/Home/End move between the two tabs, as in a native tab strip.
  function onTabKeyDown(e) {
    const step = { ArrowLeft: -1, ArrowRight: 1 }[e.key];
    if (step === undefined && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const current = TABS.findIndex((tab) => tab.mode === mode);
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? TABS.length - 1
          : (current + step + TABS.length) % TABS.length;
    // Home on the first tab (or End on the last) changes nothing, so don't
    // wipe what the user already typed.
    if (TABS[next].mode !== mode) switchMode(TABS[next].mode);
    e.currentTarget.querySelector(`#auth-tab-${TABS[next].mode}`)?.focus();
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
    // A long address in "We sent a code to …" must wrap inside a 320px panel.
    overflowWrap: "anywhere",
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

  const tabStyle = (selected) => ({
    flex: 1,
    minHeight: 40,
    padding: "0 12px",
    boxSizing: "border-box",
    background: selected ? t.bg : "transparent",
    border: `1px solid ${selected ? t.border : "transparent"}`,
    borderRadius: RADIUS.sm,
    color: selected ? t.text : t.textSecondary,
    fontFamily: "var(--font-body)",
    fontSize: 14,
    fontWeight: selected ? 600 : 500,
    cursor: "pointer",
    transition: "background-color 0.15s, color 0.15s",
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
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 600,
              color: t.text,
              margin: "0 0 14px",
            }}
          >
            {heading}
          </h2>

          {showTabs && (
            <div
              role="tablist"
              aria-label="Account"
              onKeyDown={onTabKeyDown}
              style={{
                display: "flex",
                gap: 4,
                padding: 4,
                marginBottom: 18,
                background: t.bgAlt,
                border: `1px solid ${t.border}`,
                borderRadius: RADIUS.md,
              }}
            >
              {TABS.map((tab) => {
                const selected = mode === tab.mode;
                return (
                  <button
                    key={tab.mode}
                    id={`auth-tab-${tab.mode}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="auth-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => {
                      if (!selected) switchMode(tab.mode);
                    }}
                    style={tabStyle(selected)}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {!codeStep && !passwordUpdated && (
            <p style={introStyle}>{copy.intro}</p>
          )}

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

          {(codeStep || passwordUpdated || notice) && (
            <div role="status" style={calloutStyle(t.accentGreen)}>
              {passwordUpdated
                ? "Password updated. You're signed in with your new password."
                : codeStep
                  ? codeCopy.sent(codeStep.email)
                  : null}
              {notice && (codeStep || passwordUpdated) ? " " : null}
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
          ) : codeStep ? (
            <>
              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: 22 }}>
                  <label htmlFor="auth-code" style={labelStyle}>
                    Code from your email
                  </label>
                  <input
                    id="auth-code"
                    ref={codeRef}
                    name="code"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="one-time-code"
                    maxLength={CODE_MAX}
                    aria-describedby="auth-code-help"
                    value={code}
                    placeholder="123456"
                    onChange={(e) =>
                      setCode(
                        e.target.value.replace(/\D/g, "").slice(0, CODE_MAX),
                      )
                    }
                    onFocus={focusInput}
                    onBlur={blurInput}
                    style={{
                      ...inputStyle,
                      fontSize: 22,
                      letterSpacing: "0.3em",
                      textAlign: "center",
                      fontVariantNumeric: "tabular-nums",
                    }}
                  />
                  <div
                    id="auth-code-help"
                    style={{
                      marginTop: 8,
                      fontFamily: "var(--font-body)",
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: t.textTertiary,
                    }}
                  >
                    {codeCopy.help}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  fullWidth
                  disabled={submitting}
                  style={submitting ? { cursor: "wait" } : undefined}
                >
                  {submitting ? "Please wait…" : codeCopy.submit}
                </Button>
              </form>

              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={resend}
                disabled={submitting || cooldown > 0}
                style={{ marginTop: 10 }}
              >
                {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
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
                  setCodeStep(null);
                  setCode("");
                  setError(null);
                  setNotice(null);
                })}
                {bottomLink(
                  codeStep.kind === "signup"
                    ? "Already have an account? Sign in"
                    : "Back to sign in",
                  () => switchMode("signin"),
                )}
              </div>
            </>
          ) : (
            <>
              <div {...panelProps}>
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

                  {showTabs && (
                    <p
                      style={{
                        margin: "12px 0 0",
                        fontFamily: "var(--font-body)",
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: t.textTertiary,
                        textAlign: "center",
                      }}
                    >
                      By continuing, you accept the{" "}
                      <Button
                        variant="link"
                        size="sm"
                        href="/terms.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 12 }}
                      >
                        Terms
                      </Button>
                      . The{" "}
                      <Button
                        variant="link"
                        size="sm"
                        href="/privacy.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: 12 }}
                      >
                        Privacy Policy
                      </Button>{" "}
                      explains what your account stores.
                    </p>
                  )}
                </form>
              </div>

              {mode === "forgot" && (
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  {bottomLink("Back to sign in", () => switchMode("signin"))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
