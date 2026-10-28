// @vitest-environment happy-dom
import { afterEach, describe, expect, it, vi, beforeEach } from "vitest";
import {
  act,
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";

// ── Mock useAuth ──────────────────────────────────────────────────────────────

const mockSignIn = vi.fn();
const mockSignUp = vi.fn();
const mockVerifySignupCode = vi.fn();
const mockVerifyRecoveryCode = vi.fn();
const mockResetPassword = vi.fn();
const mockUpdatePassword = vi.fn();
const mockSignInWithGoogle = vi.fn();
const mockResendConfirmation = vi.fn();
// Mutable so a test can flip the signed-in user or the enabled methods.
const mockAuthState = {
  user: null,
  authMethods: { google: false },
};

vi.mock("../../src/hooks/useAuth.js", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signUp: mockSignUp,
    verifySignupCode: mockVerifySignupCode,
    verifyRecoveryCode: mockVerifyRecoveryCode,
    resetPassword: mockResetPassword,
    updatePassword: mockUpdatePassword,
    signInWithGoogle: mockSignInWithGoogle,
    resendConfirmation: mockResendConfirmation,
    user: mockAuthState.user,
    authMethods: mockAuthState.authMethods,
    loading: false,
    token: null,
  }),
}));

// ── Mock ThemeContext ─────────────────────────────────────────────────────────

vi.mock("../../src/lib/ThemeContext.jsx", () => ({
  useTheme: () => ({
    theme: {
      background: "#fff",
      surface: "#f5f5f5",
      border: "#ddd",
      text: "#111",
      textSecondary: "#666",
      primary: "#2563eb",
      error: "#dc2626",
    },
  }),
}));

const CODE_LABEL = "Code from your email";
const WRONG_CODE_COPY =
  "That code is wrong or has expired. Check it, or send a new one.";
const SENT_AGAIN_COPY =
  "Sent again. Use the newest code; older ones stop working.";

async function getModal() {
  const { default: AuthModal } =
    await import("../../src/components/AuthModal.jsx");
  return AuthModal;
}

function fillEmail(value) {
  fireEvent.change(screen.getByLabelText("Email"), { target: { value } });
}

function fillPassword(value, label = "Password") {
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
}

function fillCode(value) {
  fireEvent.change(screen.getByLabelText(CODE_LABEL), { target: { value } });
}

function submit(name) {
  fireEvent.click(screen.getByRole("button", { name }));
}

function tab(name) {
  return screen.getByRole("tab", { name });
}

function heading(name) {
  return screen.getByRole("heading", { name });
}

// Flush the promise chain behind an auth call. Unlike waitFor this also works
// while timers are faked.
async function settle() {
  for (let i = 0; i < 3; i += 1) {
    await act(async () => {});
  }
}

// Sign-up all the way to the "Check your email" screen.
async function reachSignupCodeScreen(
  AuthModal,
  { onClose = vi.fn(), email = "new@b.com" } = {},
) {
  mockSignUp.mockResolvedValueOnce({ error: null, needsConfirmation: true });
  const utils = render(
    <AuthModal isOpen={true} onClose={onClose} mode="signup" />,
  );
  fillEmail(email);
  fillPassword("SecurePass1!");
  submit("Create account");
  await settle();
  expect(heading("Check your email")).toBeDefined();
  return utils;
}

// Forgot password all the way to the "Check your email" screen.
async function reachRecoveryCodeScreen(
  AuthModal,
  { onClose = vi.fn(), email = "a@b.com" } = {},
) {
  const utils = render(
    <AuthModal isOpen={true} onClose={onClose} mode="forgot" />,
  );
  fillEmail(email);
  submit("Send reset code");
  await settle();
  expect(heading("Check your email")).toBeDefined();
  return utils;
}

describe("AuthModal component", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockAuthState.user = null;
    mockAuthState.authMethods = { google: false };
    mockSignIn.mockResolvedValue(null);
    mockSignUp.mockResolvedValue({ error: null, needsConfirmation: false });
    mockVerifySignupCode.mockResolvedValue(null);
    mockVerifyRecoveryCode.mockResolvedValue(null);
    mockResetPassword.mockResolvedValue(null);
    mockUpdatePassword.mockResolvedValue(null);
    mockSignInWithGoogle.mockResolvedValue(null);
    mockResendConfirmation.mockResolvedValue(null);
  });

  // ── Rendering ───────────────────────────────────────────────────────────────

  it("renders nothing when isOpen=false", async () => {
    const AuthModal = await getModal();
    const { container } = render(
      <AuthModal isOpen={false} onClose={vi.fn()} mode="signin" />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders sign-in form when isOpen=true and mode=signin", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    // Explains why an account is worth having.
    expect(screen.getByText(/bookmarks and search history/i)).toBeDefined();
  });

  it("renders sign-up form when mode=signup", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    expect(
      screen.getByRole("heading", { name: /create account/i }),
    ).toBeDefined();
    expect(screen.getByText(/at least 8 characters\./i)).toBeDefined();
  });

  it("links the Terms and Privacy Policy in new tabs on account flows", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    const terms = screen.getByRole("link", { name: "Terms" });
    const privacy = screen.getByRole("link", { name: "Privacy Policy" });
    expect(terms.getAttribute("href")).toBe("/terms.html");
    expect(privacy.getAttribute("href")).toBe("/privacy.html");
    expect(terms.getAttribute("target")).toBe("_blank");
    expect(privacy.getAttribute("rel")).toContain("noopener");
  });

  it("leaves the Terms line off the password-reset screen", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="forgot" />);
    expect(screen.queryByRole("link", { name: "Privacy Policy" })).toBeNull();
  });

  it("focuses the email field when opened", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    expect(document.activeElement).toBe(screen.getByLabelText("Email"));
  });

  // ── No CSS framework ────────────────────────────────────────────────────────

  it("uses no Tailwind or Bootstrap class names", async () => {
    const AuthModal = await getModal();
    const { container } = render(
      <AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />,
    );
    const allElements = container.querySelectorAll("[class]");
    allElements.forEach((el) => {
      const classes = el.className || "";
      // Tailwind classes start with known prefixes; Bootstrap uses btn, col-, row-, etc.
      expect(classes).not.toMatch(
        /\b(flex|grid|px-|py-|mt-|mb-|text-sm|font-|btn |col-|row-)\b/,
      );
    });
  });

  // ── Sign in / Create account tabs ───────────────────────────────────────────

  it("renders the Account tablist with Sign in selected and the form in the panel", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    const tablist = screen.getByRole("tablist", { name: "Account" });
    expect(
      within(tablist)
        .getAllByRole("tab")
        .map((el) => el.textContent),
    ).toEqual(["Sign in", "Create account"]);

    expect(tab("Sign in").getAttribute("aria-selected")).toBe("true");
    expect(tab("Create account").getAttribute("aria-selected")).toBe("false");
    // Only the selected tab is in the Tab order; arrows move between them.
    expect(tab("Sign in").getAttribute("tabindex")).toBe("0");
    expect(tab("Create account").getAttribute("tabindex")).toBe("-1");

    const panel = screen.getByRole("tabpanel");
    expect(panel.id).toBe("auth-panel");
    expect(panel.getAttribute("aria-labelledby")).toBe("auth-tab-signin");
    expect(tab("Sign in").getAttribute("aria-controls")).toBe("auth-panel");
    expect(panel.contains(screen.getByLabelText("Email"))).toBe(true);
    expect(panel.contains(screen.getByLabelText("Password"))).toBe(true);
  });

  it("selects Create account when opened in signup mode", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    expect(tab("Create account").getAttribute("aria-selected")).toBe("true");
    expect(tab("Sign in").getAttribute("aria-selected")).toBe("false");
    expect(screen.getByRole("tabpanel").getAttribute("aria-labelledby")).toBe(
      "auth-tab-signup",
    );
  });

  it("switches tabs on click and keeps the typed email", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("a@b.com");

    fireEvent.click(tab("Create account"));
    expect(heading(/create account/i)).toBeDefined();
    expect(tab("Create account").getAttribute("aria-selected")).toBe("true");
    expect(tab("Sign in").getAttribute("aria-selected")).toBe("false");
    expect(screen.getByRole("tabpanel").getAttribute("aria-labelledby")).toBe(
      "auth-tab-signup",
    );
    expect(screen.getByLabelText("Email").value).toBe("a@b.com");
    expect(screen.getByText(/at least 8 characters\./i)).toBeDefined();

    fireEvent.click(tab("Sign in"));
    expect(heading(/sign in/i)).toBeDefined();
    expect(tab("Sign in").getAttribute("aria-selected")).toBe("true");
    expect(screen.getByLabelText("Email").value).toBe("a@b.com");
  });

  it("clears the password and any error when switching tabs", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("a@b.com");
    submit("Sign in");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /enter your password/i,
      );
    });
    fillPassword("abc123");

    fireEvent.click(tab("Create account"));
    expect(screen.queryByRole("alert")).toBeNull();
    expect(screen.getByLabelText("Password").value).toBe("");
  });

  it("does nothing when the selected tab is clicked again", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("a@b.com");
    fillPassword("abc123");
    fireEvent.click(tab("Sign in"));
    expect(screen.getByLabelText("Password").value).toBe("abc123");
  });

  it.each([
    ["signin", "Home"],
    ["signup", "End"],
  ])(
    "%s tab + %s keeps what was typed (the selected tab doesn't change)",
    async (start, key) => {
      const AuthModal = await getModal();
      render(<AuthModal isOpen={true} onClose={vi.fn()} mode={start} />);
      fillEmail("a@b.com");
      fillPassword("abc123");
      const current = document.getElementById(`auth-tab-${start}`);
      current.focus();
      fireEvent.keyDown(current, { key });
      expect(screen.getByLabelText("Email").value).toBe("a@b.com");
      expect(screen.getByLabelText("Password").value).toBe("abc123");
    },
  );

  it.each([
    ["signin", "ArrowRight", "signup"],
    ["signin", "ArrowLeft", "signup"],
    ["signup", "ArrowLeft", "signin"],
    ["signup", "ArrowRight", "signin"],
    ["signin", "End", "signup"],
    ["signup", "Home", "signin"],
    ["signin", "Home", "signin"],
    ["signup", "End", "signup"],
  ])(
    "on the %s tab, %s selects the %s tab and keeps focus on it",
    async (start, key, expected) => {
      const AuthModal = await getModal();
      render(<AuthModal isOpen={true} onClose={vi.fn()} mode={start} />);
      const current = document.getElementById(`auth-tab-${start}`);
      current.focus();
      expect(document.activeElement).toBe(current);

      fireEvent.keyDown(current, { key });

      const landed = document.getElementById(`auth-tab-${expected}`);
      expect(landed.getAttribute("aria-selected")).toBe("true");
      expect(document.activeElement).toBe(landed);
      expect(document.activeElement.getAttribute("role")).toBe("tab");
      // Focus did not jump into the form behind the tab strip.
      expect(document.activeElement).not.toBe(screen.getByLabelText("Email"));
    },
  );

  it("ignores other keys on the tab strip", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    const current = tab("Sign in");
    current.focus();
    fireEvent.keyDown(current, { key: "ArrowDown" });
    fireEvent.keyDown(current, { key: "a" });
    expect(tab("Sign in").getAttribute("aria-selected")).toBe("true");
    expect(document.activeElement).toBe(current);
  });

  it("hides the tabs on the forgot-password screen and brings them back", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fireEvent.click(screen.getByRole("button", { name: /forgot password/i }));
    expect(heading(/reset password/i)).toBeDefined();
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryAllByRole("tab")).toHaveLength(0);
    expect(screen.queryByRole("tabpanel")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /back to sign in/i }));
    expect(screen.getByRole("tablist", { name: "Account" })).toBeDefined();
    expect(tab("Sign in").getAttribute("aria-selected")).toBe("true");
  });

  it("hides the tabs on the sign-up code screen", async () => {
    const AuthModal = await getModal();
    await reachSignupCodeScreen(AuthModal);
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryAllByRole("tab")).toHaveLength(0);
    expect(screen.queryByRole("tabpanel")).toBeNull();
  });

  it("hides the tabs on the reset-code screen", async () => {
    const AuthModal = await getModal();
    await reachRecoveryCodeScreen(AuthModal);
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryAllByRole("tab")).toHaveLength(0);
    expect(screen.queryByRole("tabpanel")).toBeNull();
  });

  it("hides the tabs on the set-new-password and password-updated screens", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="reset" />);
    expect(heading(/set new password/i)).toBeDefined();
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryByRole("tabpanel")).toBeNull();

    fillPassword("BrandNewPass1!", "New password");
    submit("Update password");
    await settle();
    expect(heading("Password updated")).toBeDefined();
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(screen.queryByRole("tabpanel")).toBeNull();
  });

  it("describes the code field with the sent-to status so a screen reader hears the address", async () => {
    const AuthModal = await getModal();
    await reachSignupCodeScreen(AuthModal, { email: "new@b.com" });
    const ids = screen
      .getByLabelText(CODE_LABEL)
      .getAttribute("aria-describedby")
      .split(" ");
    const status = screen.getByRole("status");
    expect(ids).toContain(status.id);
    expect(status.textContent).toMatch(/We sent a code to new@b\.com/);
    // Every id it points at has to exist, or the description is silently empty.
    for (const id of ids) expect(document.getElementById(id)).not.toBeNull();
  });

  it("describes Continue with the password-updated status", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="reset" />);
    fillPassword("BrandNewPass1!", "New password");
    submit("Update password");
    await settle();

    const status = screen.getByRole("status");
    expect(status.textContent).toMatch(/Password updated/);
    expect(
      screen.getByRole("button", { name: "Continue" }).getAttribute(
        "aria-describedby",
      ),
    ).toBe(status.id);
  });

  it("drops the old bottom links now that the tabs do that job", async () => {
    const AuthModal = await getModal();
    const { unmount } = render(
      <AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />,
    );
    expect(screen.queryByText(/new to casedive/i)).toBeNull();
    expect(
      screen.queryByRole("button", { name: /create an account/i }),
    ).toBeNull();
    unmount();

    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    expect(screen.queryByText(/already have an account/i)).toBeNull();
  });

  // ── Form validation ─────────────────────────────────────────────────────────

  it("shows error when submitting empty email", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    submit("Sign in");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(/email/i);
    });
  });

  it("shows error when email is malformed", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("not-an-email");
    fillPassword("SecurePass1!");
    submit("Sign in");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(/valid email/i);
    });
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it("asks for a password on sign-in without enforcing a length", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("a@b.com");
    submit("Sign in");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /enter your password/i,
      );
    });
    expect(mockSignIn).not.toHaveBeenCalled();

    // An older, shorter password still reaches Supabase.
    fillPassword("abc123");
    submit("Sign in");
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("a@b.com", "abc123");
    });
  });

  it("requires 8+ characters when creating an account", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    fillEmail("a@b.com");
    fillPassword("abc");
    submit("Create account");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /at least 8 characters/i,
      );
    });
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  // ── Show / hide password ────────────────────────────────────────────────────

  it("toggles password visibility", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    const field = screen.getByLabelText("Password");
    expect(field.type).toBe("password");
    fireEvent.click(screen.getByRole("button", { name: "Show password" }));
    expect(field.type).toBe("text");
    fireEvent.click(screen.getByRole("button", { name: "Hide password" }));
    expect(field.type).toBe("password");
  });

  // ── Sign in submission ──────────────────────────────────────────────────────

  it("calls signIn with the trimmed email and password", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("  a@b.com ");
    fillPassword("SecurePass1!");
    submit("Sign in");
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("a@b.com", "SecurePass1!");
    });
  });

  it("closes modal after successful sign-in", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signin" />);
    fillEmail("a@b.com");
    fillPassword("SecurePass1!");
    submit("Sign in");
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("explains bad credentials in plain language and offers a reset", async () => {
    mockSignIn.mockResolvedValueOnce("Invalid login credentials");
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("a@b.com");
    fillPassword("wrongpass1!");
    submit("Sign in");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /incorrect email or password/i,
      );
    });
    fireEvent.click(
      screen.getByRole("button", { name: /reset your password/i }),
    );
    expect(
      screen.getByRole("heading", { name: /reset password/i }),
    ).toBeDefined();
    expect(screen.getByLabelText("Email").value).toBe("a@b.com");
  });

  it("shows a friendly message when the auth call throws", async () => {
    mockSignIn.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("a@b.com");
    fillPassword("SecurePass1!");
    submit("Sign in");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /couldn't reach the server/i,
      );
    });
    // The button is usable again.
    expect(screen.getByRole("button", { name: "Sign in" }).disabled).toBe(
      false,
    );
  });

  // ── Sign-in with an unconfirmed account ─────────────────────────────────────

  it("offers a new code when sign-in hits an unconfirmed account", async () => {
    mockSignIn.mockResolvedValueOnce("Email not confirmed");
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("new@b.com");
    fillPassword("SecurePass1!");
    submit("Sign in");
    await settle();

    expect(screen.getByRole("alert").textContent).toContain(
      "You haven't confirmed your email yet. Check your inbox, or we can send a new code.",
    );
    // The old "resend confirmation email" wording is gone.
    expect(
      screen.queryByRole("button", { name: /resend confirmation email/i }),
    ).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Send a new code" }));
    await settle();

    expect(mockResendConfirmation).toHaveBeenCalledWith("new@b.com");
    expect(heading("Check your email")).toBeDefined();
    expect(screen.getByLabelText(CODE_LABEL)).toBeDefined();
    expect(screen.getByRole("status").textContent).toMatch(
      /sent a code to new@b\.com/i,
    );
    // It is the sign-up kind of code screen, so the code goes to verifySignupCode.
    expect(
      screen.getByRole("button", { name: "Already have an account? Sign in" }),
    ).toBeDefined();
    fillCode("123456");
    submit("Verify and sign in");
    await settle();
    expect(mockVerifySignupCode).toHaveBeenCalledWith("new@b.com", "123456");
    expect(mockVerifyRecoveryCode).not.toHaveBeenCalled();
  });

  it("stays on the sign-in form when the new code cannot be sent", async () => {
    mockSignIn.mockResolvedValueOnce("Email not confirmed");
    mockResendConfirmation.mockResolvedValueOnce(
      "For security purposes, you can only request this after 42 seconds.",
    );
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("new@b.com");
    fillPassword("SecurePass1!");
    submit("Sign in");
    await settle();
    fireEvent.click(screen.getByRole("button", { name: "Send a new code" }));
    await settle();

    expect(screen.getByRole("alert").textContent).toMatch(/wait a minute/i);
    expect(screen.queryByLabelText(CODE_LABEL)).toBeNull();
    expect(heading(/sign in/i)).toBeDefined();
  });

  // ── Close behaviour ─────────────────────────────────────────────────────────

  it("calls onClose when close button is clicked", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signin" />);
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("closes on a backdrop click but not when a drag starts inside the form", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signin" />);
    const backdrop = screen.getByRole("dialog");

    // Text-selection drag from the email field that ends on the backdrop.
    fireEvent.mouseDown(screen.getByLabelText("Email"));
    fireEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.mouseDown(backdrop);
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // ── Accessibility ───────────────────────────────────────────────────────────

  it("modal is a labelled dialog", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    expect(screen.getByRole("dialog", { name: /sign in/i })).toBeDefined();
  });

  it("tabs from email straight to password", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    const order = [
      ...screen.getByRole("dialog").querySelectorAll("input, button"),
    ];
    const email = order.indexOf(screen.getByLabelText("Email"));
    const password = order.indexOf(screen.getByLabelText("Password"));
    const forgot = order.indexOf(
      screen.getByRole("button", { name: /forgot password/i }),
    );
    expect(password).toBe(email + 1);
    expect(forgot).toBeGreaterThan(password);
  });

  it("password field has type=password (not plain text)", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    expect(screen.getByLabelText("Password").type).toBe("password");
  });

  it("closes when Escape is pressed", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signin" />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  // ── Sign-up ─────────────────────────────────────────────────────────────────

  it("moves to the code screen after sign-up and asks for the emailed code", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    await reachSignupCodeScreen(AuthModal, { onClose });

    expect(mockSignUp).toHaveBeenCalledWith("new@b.com", "SecurePass1!");
    expect(screen.getByRole("status").textContent).toMatch(
      /sent a code to new@b\.com/i,
    );
    expect(onClose).not.toHaveBeenCalled();

    const codeInput = screen.getByLabelText(CODE_LABEL);
    expect(codeInput.id).toBe("auth-code");
    expect(codeInput.getAttribute("inputmode")).toBe("numeric");
    expect(codeInput.getAttribute("autocomplete")).toBe("one-time-code");
    expect(document.activeElement).toBe(codeInput);

    expect(
      screen.getByRole("button", { name: "Verify and sign in" }).disabled,
    ).toBe(false);
    const resend = screen.getByRole("button", { name: "Resend code in 60s" });
    expect(resend.disabled).toBe(true);

    // The account form is gone so it can't be resubmitted by accident.
    expect(screen.queryByLabelText("Password")).toBeNull();
    expect(screen.queryByLabelText("Email")).toBeNull();
  });

  it("closes after sign-up when no confirmation is needed", async () => {
    mockSignUp.mockResolvedValueOnce({ error: null, needsConfirmation: false });
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signup" />);
    fillEmail("new@b.com");
    fillPassword("SecurePass1!");
    submit("Create account");
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
    expect(screen.queryByLabelText(CODE_LABEL)).toBeNull();
  });

  it("offers sign-in when the email already has an account", async () => {
    mockSignUp.mockResolvedValueOnce({
      error: "User already registered",
      needsConfirmation: false,
    });
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    fillEmail("taken@b.com");
    fillPassword("SecurePass1!");
    submit("Create account");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /already an account/i,
      );
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in instead/i }));
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeDefined();
    expect(tab("Sign in").getAttribute("aria-selected")).toBe("true");
    expect(screen.getByLabelText("Email").value).toBe("taken@b.com");
  });

  it("says plainly when the confirmation email could not be sent", async () => {
    mockSignUp.mockResolvedValueOnce({
      error: "Error sending confirmation email",
      needsConfirmation: false,
    });
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    fillEmail("new@b.com");
    fillPassword("SecurePass1!");
    submit("Create account");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /couldn't send the email/i,
      );
    });
  });

  // ── Code entry ──────────────────────────────────────────────────────────────

  it("strips non-digits from the code and caps it at 10 digits", async () => {
    const AuthModal = await getModal();
    await reachSignupCodeScreen(AuthModal);
    const input = screen.getByLabelText(CODE_LABEL);

    fillCode("12ab-34 56");
    expect(input.value).toBe("123456");

    fillCode("12345678901234");
    expect(input.value).toBe("1234567890");

    fillCode("abc");
    expect(input.value).toBe("");
  });

  it("asks for the code when it is shorter than 6 digits", async () => {
    const AuthModal = await getModal();
    await reachSignupCodeScreen(AuthModal);

    submit("Verify and sign in");
    await settle();
    expect(screen.getByRole("alert").textContent).toBe(
      "Enter the code from your email.",
    );

    fillCode("12345");
    submit("Verify and sign in");
    await settle();
    expect(screen.getByRole("alert").textContent).toBe(
      "Enter the code from your email.",
    );
    expect(mockVerifySignupCode).not.toHaveBeenCalled();
    expect(heading("Check your email")).toBeDefined();
  });

  it("applies the same code check on the reset-code screen", async () => {
    const AuthModal = await getModal();
    await reachRecoveryCodeScreen(AuthModal);
    fillCode("123");
    submit("Verify code");
    await settle();
    expect(screen.getByRole("alert").textContent).toBe(
      "Enter the code from your email.",
    );
    expect(mockVerifyRecoveryCode).not.toHaveBeenCalled();
  });

  it.each([["123456"], ["12345678"], ["1234567890"]])(
    "accepts a %s code length",
    async (value) => {
      const AuthModal = await getModal();
      await reachSignupCodeScreen(AuthModal);
      fillCode(value);
      submit("Verify and sign in");
      await settle();
      expect(mockVerifySignupCode).toHaveBeenCalledWith("new@b.com", value);
    },
  );

  it("verifies the sign-up code with the email and closes on success", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    await reachSignupCodeScreen(AuthModal, { onClose });
    fillCode("654321");
    submit("Verify and sign in");
    await settle();

    expect(mockVerifySignupCode).toHaveBeenCalledTimes(1);
    expect(mockVerifySignupCode).toHaveBeenCalledWith("new@b.com", "654321");
    expect(mockVerifyRecoveryCode).not.toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it.each([["Token has expired or is invalid"], ["otp_expired"]])(
    "shows the wrong-or-expired copy for %s and stays on the code screen",
    async (raw) => {
      mockVerifySignupCode.mockResolvedValueOnce(raw);
      const AuthModal = await getModal();
      const onClose = vi.fn();
      await reachSignupCodeScreen(AuthModal, { onClose });
      fillCode("000000");
      submit("Verify and sign in");
      await settle();

      expect(screen.getByRole("alert").textContent).toBe(WRONG_CODE_COPY);
      expect(onClose).not.toHaveBeenCalled();
      expect(heading("Check your email")).toBeDefined();
      // The button is usable again for another try.
      expect(
        screen.getByRole("button", { name: "Verify and sign in" }).disabled,
      ).toBe(false);
    },
  );

  it("falls back to the general copy for other verify errors", async () => {
    mockVerifySignupCode.mockRejectedValueOnce(
      new TypeError("Failed to fetch"),
    );
    const AuthModal = await getModal();
    await reachSignupCodeScreen(AuthModal);
    fillCode("123456");
    submit("Verify and sign in");
    await settle();
    expect(screen.getByRole("alert").textContent).toMatch(
      /couldn't reach the server/i,
    );
  });

  // ── Links on the code screen ────────────────────────────────────────────────

  it("returns to the sign-up form from the code screen with the email kept", async () => {
    const AuthModal = await getModal();
    await reachSignupCodeScreen(AuthModal, { email: "typo@b.con" });
    fillCode("123");
    fireEvent.click(
      screen.getByRole("button", { name: "Use a different email" }),
    );

    expect(heading("Create account")).toBeDefined();
    expect(tab("Create account").getAttribute("aria-selected")).toBe("true");
    expect(screen.getByLabelText("Email").value).toBe("typo@b.con");
    expect(screen.getByLabelText("Password").value).toBe("");
    expect(screen.queryByLabelText(CODE_LABEL)).toBeNull();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("goes to sign-in from the sign-up code screen", async () => {
    const AuthModal = await getModal();
    await reachSignupCodeScreen(AuthModal);
    fireEvent.click(
      screen.getByRole("button", { name: "Already have an account? Sign in" }),
    );

    expect(heading("Sign in")).toBeDefined();
    expect(tab("Sign in").getAttribute("aria-selected")).toBe("true");
    expect(screen.queryByLabelText(CODE_LABEL)).toBeNull();
    expect(screen.getByLabelText("Email").value).toBe("new@b.com");
  });

  it("offers Back to sign in, not the account link, on the reset-code screen", async () => {
    const AuthModal = await getModal();
    await reachRecoveryCodeScreen(AuthModal);
    expect(
      screen.queryByRole("button", {
        name: "Already have an account? Sign in",
      }),
    ).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Back to sign in" }));
    expect(heading("Sign in")).toBeDefined();
    expect(screen.queryByLabelText(CODE_LABEL)).toBeNull();
    expect(screen.getByLabelText("Email").value).toBe("a@b.com");
  });

  it("returns to the reset form from the reset-code screen with the email kept", async () => {
    const AuthModal = await getModal();
    await reachRecoveryCodeScreen(AuthModal, { email: "typo@b.con" });
    fireEvent.click(
      screen.getByRole("button", { name: "Use a different email" }),
    );
    expect(heading("Reset password")).toBeDefined();
    expect(screen.getByLabelText("Email").value).toBe("typo@b.con");
    expect(screen.queryByLabelText(CODE_LABEL)).toBeNull();
  });

  // ── Resend code (60 second cooldown) ────────────────────────────────────────

  describe("resend code", () => {
    beforeEach(() => {
      // Date is faked too: the countdown is judged against the clock.
      vi.useFakeTimers();
    });

    afterEach(() => {
      // Unmount while the fake clock is still installed.
      cleanup();
      vi.useRealTimers();
    });

    function advanceSeconds(seconds) {
      // One second per act so the countdown effect re-arms between ticks.
      for (let i = 0; i < seconds; i += 1) {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }
    }

    it("counts down from 60 and keeps the button disabled until it ends", async () => {
      const AuthModal = await getModal();
      await reachSignupCodeScreen(AuthModal);

      let resend = screen.getByRole("button", { name: "Resend code in 60s" });
      expect(resend.disabled).toBe(true);
      // A click on the disabled button sends nothing.
      fireEvent.click(resend);
      expect(mockResendConfirmation).not.toHaveBeenCalled();

      advanceSeconds(1);
      resend = screen.getByRole("button", { name: "Resend code in 59s" });
      expect(resend.disabled).toBe(true);

      advanceSeconds(58);
      resend = screen.getByRole("button", { name: "Resend code in 1s" });
      expect(resend.disabled).toBe(true);

      advanceSeconds(1);
      resend = screen.getByRole("button", { name: "Resend code" });
      expect(resend.disabled).toBe(false);
    });

    it("resends a sign-up code with resendConfirmation, shows the notice and restarts the cooldown", async () => {
      const AuthModal = await getModal();
      await reachSignupCodeScreen(AuthModal);
      advanceSeconds(60);

      fireEvent.click(screen.getByRole("button", { name: "Resend code" }));
      await settle();

      expect(mockResendConfirmation).toHaveBeenCalledTimes(1);
      expect(mockResendConfirmation).toHaveBeenCalledWith("new@b.com");
      expect(mockResetPassword).not.toHaveBeenCalled();
      expect(screen.getByRole("status").textContent).toContain(SENT_AGAIN_COPY);
      expect(
        screen.getByRole("button", { name: "Resend code in 60s" }).disabled,
      ).toBe(true);
      expect(heading("Check your email")).toBeDefined();

      // The new cooldown runs down like the first one.
      advanceSeconds(60);
      expect(screen.getByRole("button", { name: "Resend code" }).disabled).toBe(
        false,
      );
    });

    it("resends a reset code with resetPassword, shows the notice and restarts the cooldown", async () => {
      const AuthModal = await getModal();
      await reachRecoveryCodeScreen(AuthModal);
      expect(mockResetPassword).toHaveBeenCalledTimes(1);
      expect(
        screen.getByRole("button", { name: "Resend code in 60s" }).disabled,
      ).toBe(true);
      advanceSeconds(60);

      fireEvent.click(screen.getByRole("button", { name: "Resend code" }));
      await settle();

      expect(mockResetPassword).toHaveBeenCalledTimes(2);
      expect(mockResetPassword).toHaveBeenLastCalledWith("a@b.com");
      expect(mockResendConfirmation).not.toHaveBeenCalled();
      expect(screen.getByRole("status").textContent).toContain(SENT_AGAIN_COPY);
      expect(
        screen.getByRole("button", { name: "Resend code in 60s" }).disabled,
      ).toBe(true);
    });

    it("keeps the cooldown at zero when a resend fails", async () => {
      mockResendConfirmation.mockResolvedValueOnce(
        "For security purposes, you can only request this after 42 seconds.",
      );
      const AuthModal = await getModal();
      await reachSignupCodeScreen(AuthModal);
      advanceSeconds(60);

      fireEvent.click(screen.getByRole("button", { name: "Resend code" }));
      await settle();

      expect(screen.getByRole("alert").textContent).toMatch(/wait a minute/i);
      expect(screen.queryByText(SENT_AGAIN_COPY)).toBeNull();
      expect(heading("Check your email")).toBeDefined();
      expect(screen.getByRole("button", { name: "Resend code" }).disabled).toBe(
        false,
      );
    });

    it("follows the clock, so time spent away from the page counts (phone mail app)", async () => {
      const AuthModal = await getModal();
      await reachSignupCodeScreen(AuthModal);
      expect(
        screen.getByRole("button", { name: "Resend code in 60s" }).disabled,
      ).toBe(true);

      // The page's timers were frozen for 90 seconds; coming back fires
      // visibilitychange with no timer tick in between.
      act(() => {
        vi.setSystemTime(new Date(Date.now() + 90_000));
        document.dispatchEvent(new Event("visibilitychange"));
      });
      expect(screen.getByRole("button", { name: "Resend code" }).disabled).toBe(
        false,
      );
    });

    it("moves focus back to the code field after a resend, not onto the disabled button", async () => {
      const AuthModal = await getModal();
      await reachSignupCodeScreen(AuthModal);
      advanceSeconds(60);
      const resend = screen.getByRole("button", { name: "Resend code" });
      resend.focus();

      fireEvent.click(resend);
      await settle();

      expect(document.activeElement).toBe(screen.getByLabelText(CODE_LABEL));
    });

    it("starts a fresh 60 second cooldown each time the code screen opens", async () => {
      const AuthModal = await getModal();
      await reachSignupCodeScreen(AuthModal);
      advanceSeconds(30);
      expect(
        screen.getByRole("button", { name: "Resend code in 30s" }),
      ).toBeDefined();

      // Back to the form, then on to a new code screen.
      fireEvent.click(
        screen.getByRole("button", { name: "Use a different email" }),
      );
      fillPassword("SecurePass1!");
      mockSignUp.mockResolvedValueOnce({
        error: null,
        needsConfirmation: true,
      });
      submit("Create account");
      await settle();
      expect(
        screen.getByRole("button", { name: "Resend code in 60s" }),
      ).toBeDefined();
    });
  });

  // ── Cross-tab sign-in while waiting for a code ──────────────────────────────

  it("closes the sign-up code screen once the account is confirmed in another tab", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    const { rerender } = await reachSignupCodeScreen(AuthModal, { onClose });
    expect(onClose).not.toHaveBeenCalled();

    mockAuthState.user = { id: "u1", email: "new@b.com" };
    rerender(<AuthModal isOpen={true} onClose={onClose} mode="signup" />);
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it("does not close the reset-code screen when a user is signed in", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    const { rerender } = await reachRecoveryCodeScreen(AuthModal, { onClose });

    mockAuthState.user = { id: "u1", email: "a@b.com" };
    rerender(<AuthModal isOpen={true} onClose={onClose} mode="forgot" />);
    await settle();

    expect(onClose).not.toHaveBeenCalled();
    expect(heading("Check your email")).toBeDefined();
    expect(screen.getByLabelText(CODE_LABEL)).toBeDefined();
  });

  // ── Google ──────────────────────────────────────────────────────────────────

  it("shows Continue with Google only when enabled", async () => {
    const AuthModal = await getModal();
    const { unmount } = render(
      <AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />,
    );
    expect(
      screen.queryByRole("button", { name: /continue with google/i }),
    ).toBeNull();
    unmount();

    mockAuthState.authMethods = { google: true };
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fireEvent.click(
      screen.getByRole("button", { name: /continue with google/i }),
    );
    await waitFor(() => expect(mockSignInWithGoogle).toHaveBeenCalled());
  });

  it("keeps Google off the forgot-password and code screens", async () => {
    mockAuthState.authMethods = { google: true };
    const AuthModal = await getModal();
    const { unmount } = render(
      <AuthModal isOpen={true} onClose={vi.fn()} mode="forgot" />,
    );
    expect(
      screen.queryByRole("button", { name: /continue with google/i }),
    ).toBeNull();
    unmount();

    await reachSignupCodeScreen(AuthModal);
    expect(
      screen.queryByRole("button", { name: /continue with google/i }),
    ).toBeNull();
  });

  it("explains a disabled Google provider", async () => {
    mockAuthState.authMethods = { google: true };
    mockSignInWithGoogle.mockResolvedValueOnce(
      "Unsupported provider: provider is not enabled",
    );
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    fireEvent.click(
      screen.getByRole("button", { name: /continue with google/i }),
    );
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /isn't available yet/i,
      );
    });
  });

  // ── Forgot password flow ────────────────────────────────────────────────────

  it("switches to forgot-password mode and sends a reset code", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fireEvent.click(screen.getByText(/forgot password/i));
    expect(
      screen.getByRole("heading", { name: /reset password/i }),
    ).toBeDefined();
    // No password field in forgot mode
    expect(screen.queryByLabelText("Password")).toBeNull();

    fillEmail("a@b.com");
    submit("Send reset code");
    await settle();

    expect(mockResetPassword).toHaveBeenCalledWith("a@b.com");
    // It moves on to the code screen, which talks about a code, not a link.
    expect(heading("Check your email")).toBeDefined();
    expect(screen.getByRole("status").textContent).toMatch(/a@b\.com/);
    expect(screen.getByRole("status").textContent).not.toMatch(/\blinks?\b/i);
    expect(screen.getByRole("status").textContent).toMatch(
      /choose a new password/i,
    );
    expect(screen.getByLabelText(CODE_LABEL)).toBeDefined();
    expect(screen.getByRole("button", { name: "Verify code" })).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Resend code in 60s" }).disabled,
    ).toBe(true);
  });

  it("returns to sign-in from forgot mode", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fireEvent.click(screen.getByText(/forgot password/i));
    fireEvent.click(screen.getByText(/back to sign in/i));
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeDefined();
  });

  it("shows an error and stays on the form when the reset code cannot be sent", async () => {
    mockResetPassword.mockResolvedValueOnce("Error sending recovery email");
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="forgot" />);
    fillEmail("a@b.com");
    submit("Send reset code");
    await settle();
    expect(screen.getByRole("alert").textContent).toMatch(
      /couldn't send the email/i,
    );
    expect(screen.queryByLabelText(CODE_LABEL)).toBeNull();
    expect(heading("Reset password")).toBeDefined();
  });

  it("verifies the reset code and moves to the new-password step without closing", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    const { rerender } = await reachRecoveryCodeScreen(AuthModal, { onClose });

    // Verifying a recovery code signs the user in; the modal must stay open.
    mockAuthState.user = { id: "u1", email: "a@b.com" };
    rerender(<AuthModal isOpen={true} onClose={onClose} mode="forgot" />);

    fillCode("246810");
    submit("Verify code");
    await settle();

    expect(mockVerifyRecoveryCode).toHaveBeenCalledTimes(1);
    expect(mockVerifyRecoveryCode).toHaveBeenCalledWith("a@b.com", "246810");
    expect(mockVerifySignupCode).not.toHaveBeenCalled();
    expect(onClose).not.toHaveBeenCalled();

    expect(heading("Set new password")).toBeDefined();
    expect(
      screen.getByText(
        "Choose a new password for your account.",
      ),
    ).toBeDefined();
    expect(screen.queryByLabelText(CODE_LABEL)).toBeNull();
    expect(screen.queryByLabelText("Email")).toBeNull();
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(document.activeElement).toBe(screen.getByLabelText("New password"));

    // Finish the flow: the modal only closes on Continue.
    fillPassword("BrandNewPass1!", "New password");
    submit("Update password");
    await settle();
    expect(mockUpdatePassword).toHaveBeenCalledWith("BrandNewPass1!");
    expect(heading("Password updated")).toBeDefined();
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows the wrong-or-expired copy for a bad reset code", async () => {
    mockVerifyRecoveryCode.mockResolvedValueOnce(
      "Token has expired or is invalid",
    );
    const AuthModal = await getModal();
    await reachRecoveryCodeScreen(AuthModal);
    fillCode("111111");
    submit("Verify code");
    await settle();
    expect(screen.getByRole("alert").textContent).toBe(WRONG_CODE_COPY);
    expect(heading("Check your email")).toBeDefined();
    expect(
      screen.queryByRole("heading", { name: "Set new password" }),
    ).toBeNull();
  });

  // ── Password recovery (reset) mode ──────────────────────────────────────────

  it("reset mode updates the password, confirms, and Continue closes", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="reset" />);
    expect(
      screen.getByRole("heading", { name: /set new password/i }),
    ).toBeDefined();
    expect(
      screen.getByText(
        "Choose a new password for your account.",
      ),
    ).toBeDefined();
    // No email field in reset mode
    expect(screen.queryByLabelText("Email")).toBeNull();

    fillPassword("BrandNewPass1!", "New password");
    submit("Update password");
    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith("BrandNewPass1!");
      expect(screen.getByRole("status").textContent).toMatch(
        /password updated/i,
      );
    });
    // The form is replaced by a single way forward.
    expect(screen.queryByLabelText("New password")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Continue" }));
    expect(onClose).toHaveBeenCalled();
  });

  it("reset mode requires 8+ characters", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="reset" />);
    fillPassword("abc", "New password");
    submit("Update password");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /at least 8 characters/i,
      );
    });
    expect(mockUpdatePassword).not.toHaveBeenCalled();
  });

  it("reset mode offers a new code when the reset session has expired", async () => {
    mockUpdatePassword.mockResolvedValueOnce("Auth session missing!");
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="reset" />);
    fillPassword("BrandNewPass1!", "New password");
    submit("Update password");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toContain(
        "Your reset session has expired. Request a new code.",
      );
    });
    fireEvent.click(
      screen.getByRole("button", { name: /reset your password/i }),
    );
    expect(
      screen.getByRole("heading", { name: /reset password/i }),
    ).toBeDefined();
  });

  it("switches itself to the reset step when the app pushes mode=reset", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    const { rerender } = render(
      <AuthModal isOpen={true} onClose={onClose} mode="signin" />,
    );
    expect(heading("Sign in")).toBeDefined();

    rerender(<AuthModal isOpen={true} onClose={onClose} mode="reset" />);
    expect(heading("Set new password")).toBeDefined();
    expect(screen.queryByRole("tablist")).toBeNull();
    expect(document.activeElement).toBe(screen.getByLabelText("New password"));
    expect(onClose).not.toHaveBeenCalled();
  });

  // ── No sign-in link anywhere ────────────────────────────────────────────────

  describe("no email sign-in link", () => {
    const LINK_COPY = /magic|\blinks?\b|email me a/i;

    function expectNoLinkOption() {
      const dialog = screen.getByRole("dialog");
      expect(dialog.textContent).not.toMatch(LINK_COPY);
      expect(screen.queryAllByRole("button", { name: /link/i })).toHaveLength(
        0,
      );
    }

    it("is not offered on the sign-in or create-account tabs", async () => {
      // The Google button is on so the whole form is rendered.
      mockAuthState.authMethods = { google: true };
      const AuthModal = await getModal();
      render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
      expectNoLinkOption();
      fireEvent.click(tab("Create account"));
      expectNoLinkOption();
    });

    it("is not offered on the forgot, code or reset screens", async () => {
      const AuthModal = await getModal();
      const { unmount: unmountForgot } = render(
        <AuthModal isOpen={true} onClose={vi.fn()} mode="forgot" />,
      );
      expectNoLinkOption();
      unmountForgot();

      const { unmount: unmountSignup } = await reachSignupCodeScreen(AuthModal);
      expectNoLinkOption();
      unmountSignup();

      const { unmount: unmountRecovery } =
        await reachRecoveryCodeScreen(AuthModal);
      expectNoLinkOption();
      unmountRecovery();

      render(<AuthModal isOpen={true} onClose={vi.fn()} mode="reset" />);
      expectNoLinkOption();
    });

    it("is not offered in the sign-in error messages", async () => {
      mockSignIn.mockResolvedValueOnce("Email not confirmed");
      const AuthModal = await getModal();
      render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
      fillEmail("new@b.com");
      fillPassword("SecurePass1!");
      submit("Sign in");
      await settle();
      expect(screen.getByRole("alert")).toBeDefined();
      expectNoLinkOption();
    });
  });
});
