// @vitest-environment happy-dom
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// ── Mock useAuth ──────────────────────────────────────────────────────────────

const mockSignIn = vi.fn();
const mockSignUp = vi.fn();
const mockResetPassword = vi.fn();
const mockUpdatePassword = vi.fn();
const mockSignInWithMagicLink = vi.fn();
const mockSignInWithGoogle = vi.fn();
const mockResendConfirmation = vi.fn();
// Mutable so a test can flip the signed-in user or the enabled methods.
const mockAuthState = {
  user: null,
  authMethods: { magicLink: false, google: false },
};

vi.mock("../../src/hooks/useAuth.js", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signUp: mockSignUp,
    resetPassword: mockResetPassword,
    updatePassword: mockUpdatePassword,
    signInWithMagicLink: mockSignInWithMagicLink,
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

function submit(name) {
  fireEvent.click(screen.getByRole("button", { name }));
}

describe("AuthModal component", () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
    mockAuthState.user = null;
    mockAuthState.authMethods = { magicLink: false, google: false };
    mockSignIn.mockResolvedValue(null);
    mockSignUp.mockResolvedValue({ error: null, needsConfirmation: false });
    mockResetPassword.mockResolvedValue(null);
    mockUpdatePassword.mockResolvedValue(null);
    mockSignInWithMagicLink.mockResolvedValue(null);
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

  // ── Mode switching ──────────────────────────────────────────────────────────

  it("switches from sign-in to sign-up and keeps the typed email", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("a@b.com");
    fireEvent.click(screen.getByRole("button", { name: /create an account/i }));
    expect(
      screen.getByRole("heading", { name: /create account/i }),
    ).toBeDefined();
    expect(screen.getByLabelText("Email").value).toBe("a@b.com");
  });

  // ── Form validation ─────────────────────────────────────────────────────────

  it("shows error when submitting empty email", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    submit("Sign In");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(/email/i);
    });
  });

  it("shows error when email is malformed", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("not-an-email");
    fillPassword("SecurePass1!");
    submit("Sign In");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(/valid email/i);
    });
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it("asks for a password on sign-in without enforcing a length", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("a@b.com");
    submit("Sign In");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /enter your password/i,
      );
    });
    expect(mockSignIn).not.toHaveBeenCalled();

    // An older, shorter password still reaches Supabase.
    fillPassword("abc123");
    submit("Sign In");
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("a@b.com", "abc123");
    });
  });

  it("requires 8+ characters when creating an account", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    fillEmail("a@b.com");
    fillPassword("abc");
    submit("Create Account");
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
    submit("Sign In");
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
    submit("Sign In");
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
    submit("Sign In");
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

  it("offers to resend the confirmation email when sign-in hits an unconfirmed account", async () => {
    mockSignIn.mockResolvedValueOnce("Email not confirmed");
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("new@b.com");
    fillPassword("SecurePass1!");
    submit("Sign In");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /haven't confirmed your email/i,
      );
    });
    fireEvent.click(
      screen.getByRole("button", { name: /resend confirmation email/i }),
    );
    await waitFor(() => {
      expect(mockResendConfirmation).toHaveBeenCalledWith("new@b.com");
      expect(
        screen.getByRole("heading", { name: /check your email/i }),
      ).toBeDefined();
    });
  });

  it("shows a friendly message when the auth call throws", async () => {
    mockSignIn.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("a@b.com");
    fillPassword("SecurePass1!");
    submit("Sign In");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /couldn't reach the server/i,
      );
    });
    // The button is usable again.
    expect(screen.getByRole("button", { name: "Sign In" }).disabled).toBe(
      false,
    );
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

  it("shows a check-your-email screen when sign-up needs confirmation", async () => {
    mockSignUp.mockResolvedValueOnce({ error: null, needsConfirmation: true });
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signup" />);
    fillEmail("new@b.com");
    fillPassword("SecurePass1!");
    submit("Create Account");
    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /check your email/i }),
      ).toBeDefined();
      expect(screen.getByRole("status").textContent).toMatch(
        /confirmation link to new@b\.com/i,
      );
    });
    expect(onClose).not.toHaveBeenCalled();
    // The form is gone so it can't be resubmitted by accident.
    expect(screen.queryByLabelText("Password")).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /resend email/i }));
    await waitFor(() => {
      expect(mockResendConfirmation).toHaveBeenCalledWith("new@b.com");
      expect(screen.getByRole("status").textContent).toMatch(/sent again/i);
    });
  });

  it("returns to the form from the check-your-email screen", async () => {
    mockSignUp.mockResolvedValueOnce({ error: null, needsConfirmation: true });
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    fillEmail("typo@b.con");
    fillPassword("SecurePass1!");
    submit("Create Account");
    await waitFor(() => screen.getByRole("heading", { name: /check your/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /use a different email/i }),
    );
    expect(
      screen.getByRole("heading", { name: /create account/i }),
    ).toBeDefined();
    expect(screen.getByLabelText("Email").value).toBe("typo@b.con");
  });

  it("closes the waiting screen once the account is confirmed in another tab", async () => {
    mockSignUp.mockResolvedValueOnce({ error: null, needsConfirmation: true });
    const AuthModal = await getModal();
    const onClose = vi.fn();
    const { rerender } = render(
      <AuthModal isOpen={true} onClose={onClose} mode="signup" />,
    );
    fillEmail("new@b.com");
    fillPassword("SecurePass1!");
    submit("Create Account");
    await waitFor(() => screen.getByRole("heading", { name: /check your/i }));
    expect(onClose).not.toHaveBeenCalled();

    mockAuthState.user = { id: "u1", email: "new@b.com" };
    rerender(<AuthModal isOpen={true} onClose={onClose} mode="signup" />);
    await waitFor(() => expect(onClose).toHaveBeenCalled());
  });

  it("closes after sign-up when no confirmation is needed", async () => {
    mockSignUp.mockResolvedValueOnce({ error: null, needsConfirmation: false });
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signup" />);
    fillEmail("new@b.com");
    fillPassword("SecurePass1!");
    submit("Create Account");
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
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
    submit("Create Account");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /already an account/i,
      );
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in instead/i }));
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeDefined();
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
    submit("Create Account");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /couldn't send the email/i,
      );
    });
  });

  // ── Email sign-in link ──────────────────────────────────────────────────────

  it("hides the email-link option when it is switched off", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    expect(
      screen.queryByRole("button", { name: /email me a sign-in link/i }),
    ).toBeNull();
  });

  it("sends a sign-in link and can resend it", async () => {
    mockAuthState.authMethods = { magicLink: true, google: false };
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fillEmail("a@b.com");
    fireEvent.click(
      screen.getByRole("button", { name: /email me a sign-in link instead/i }),
    );
    expect(
      screen.getByRole("heading", { name: /email me a link/i }),
    ).toBeDefined();
    // Email carried over, no password asked for.
    expect(screen.getByLabelText("Email").value).toBe("a@b.com");
    expect(screen.queryByLabelText("Password")).toBeNull();

    submit("Send Sign-In Link");
    await waitFor(() => {
      expect(mockSignInWithMagicLink).toHaveBeenCalledWith("a@b.com");
      expect(screen.getByRole("status").textContent).toMatch(
        /sign-in link to a@b\.com/i,
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /resend email/i }));
    await waitFor(() => {
      expect(mockSignInWithMagicLink).toHaveBeenCalledTimes(2);
    });
  });

  it("surfaces a rate limit on resend without leaving the screen", async () => {
    mockAuthState.authMethods = { magicLink: true, google: false };
    mockSignInWithMagicLink
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(
        "For security purposes, you can only request this after 42 seconds.",
      );
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="magic" />);
    fillEmail("a@b.com");
    submit("Send Sign-In Link");
    await waitFor(() => screen.getByRole("heading", { name: /check your/i }));
    fireEvent.click(screen.getByRole("button", { name: /resend email/i }));
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(/wait a minute/i);
    });
    expect(screen.getByRole("heading", { name: /check your/i })).toBeDefined();
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

    mockAuthState.authMethods = { magicLink: false, google: true };
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fireEvent.click(
      screen.getByRole("button", { name: /continue with google/i }),
    );
    await waitFor(() => expect(mockSignInWithGoogle).toHaveBeenCalled());
  });

  it("explains a disabled Google provider", async () => {
    mockAuthState.authMethods = { magicLink: false, google: true };
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

  it("switches to forgot-password mode and sends reset email", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fireEvent.click(screen.getByText(/forgot password/i));
    expect(
      screen.getByRole("heading", { name: /reset password/i }),
    ).toBeDefined();
    // No password field in forgot mode
    expect(screen.queryByLabelText("Password")).toBeNull();

    fillEmail("a@b.com");
    submit("Send Reset Link");
    await waitFor(() => {
      expect(mockResetPassword).toHaveBeenCalledWith("a@b.com");
      expect(screen.getByRole("status").textContent).toMatch(/reset link/i);
    });
  });

  it("returns to sign-in from forgot mode", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fireEvent.click(screen.getByText(/forgot password/i));
    fireEvent.click(screen.getByText(/back to sign in/i));
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeDefined();
  });

  // ── Password recovery (reset) mode ──────────────────────────────────────────

  it("reset mode updates the password, confirms, and Continue closes", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="reset" />);
    expect(
      screen.getByRole("heading", { name: /set new password/i }),
    ).toBeDefined();
    // No email field in reset mode
    expect(screen.queryByLabelText("Email")).toBeNull();

    fillPassword("BrandNewPass1!", "New password");
    submit("Update Password");
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

  it("reset mode offers a new link when the recovery session has expired", async () => {
    mockUpdatePassword.mockResolvedValueOnce("Auth session missing!");
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="reset" />);
    fillPassword("BrandNewPass1!", "New password");
    submit("Update Password");
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(
        /reset link has expired/i,
      );
    });
    fireEvent.click(
      screen.getByRole("button", { name: /reset your password/i }),
    );
    expect(
      screen.getByRole("heading", { name: /reset password/i }),
    ).toBeDefined();
  });
});
