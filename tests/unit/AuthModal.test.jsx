// @vitest-environment happy-dom
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// ── Mock useAuth ──────────────────────────────────────────────────────────────

const mockSignIn = vi.fn();
const mockSignUp = vi.fn();
const mockResetPassword = vi.fn();
const mockUpdatePassword = vi.fn();

vi.mock("../../src/hooks/useAuth.js", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signUp: mockSignUp,
    resetPassword: mockResetPassword,
    updatePassword: mockUpdatePassword,
    user: null,
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

describe("AuthModal component", () => {
  beforeEach(() => {
    vi.resetModules();
    mockSignIn.mockResolvedValue(null);
    mockSignUp.mockResolvedValue({ error: null, needsConfirmation: false });
    mockResetPassword.mockResolvedValue(null);
    mockUpdatePassword.mockResolvedValue(null);
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
    expect(screen.getByLabelText(/email/i)).toBeDefined();
    expect(screen.getByLabelText(/password/i)).toBeDefined();
  });

  it("renders sign-up form when mode=signup", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signup" />);
    expect(
      screen.getByRole("heading", { name: /create account|sign up/i }),
    ).toBeDefined();
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

  it("switches from sign-in to sign-up when toggle link clicked", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    const toggle = screen.getByText(/create account|sign up|don't have/i);
    fireEvent.click(toggle);
    expect(
      screen.getByRole("heading", { name: /create account|sign up/i }),
    ).toBeDefined();
  });

  // ── Form validation ─────────────────────────────────────────────────────────

  it("shows error when submitting empty email", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    const submitBtn = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(/email/i);
    });
  });

  it("shows error when email is malformed", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "SecurePass1!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(/email/i);
    });
    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it("shows error when password is too short", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "a@b.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "abc" },
    });
    const submitBtn = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toMatch(/password/i);
    });
  });

  // ── Sign in submission ──────────────────────────────────────────────────────

  it("calls signIn with email and password on submit", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signin" />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "a@b.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "SecurePass1!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith("a@b.com", "SecurePass1!");
    });
  });

  it("closes modal after successful sign-in", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signin" />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "a@b.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "SecurePass1!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("shows error message returned by signIn", async () => {
    mockSignIn.mockResolvedValueOnce("Invalid login credentials");
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "a@b.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpass1!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() => {
      expect(screen.getByText(/invalid/i)).toBeDefined();
    });
  });

  // ── Close behaviour ─────────────────────────────────────────────────────────

  it("calls onClose when close button is clicked", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signin" />);
    const closeBtn = screen.getByRole("button", { name: /close|dismiss|×|✕/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  // ── Accessibility ───────────────────────────────────────────────────────────

  it("modal has role=dialog", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    expect(screen.getByRole("dialog")).toBeDefined();
  });

  it("password field has type=password (not plain text)", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="signin" />);
    const pwField = screen.getByLabelText(/password/i);
    expect(pwField.type).toBe("password");
  });

  it("closes when Escape is pressed", async () => {
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signin" />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  // ── Sign-up confirmation notice ─────────────────────────────────────────────

  it("shows check-your-email notice when sign-up needs confirmation", async () => {
    mockSignUp.mockResolvedValueOnce({ error: null, needsConfirmation: true });
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signup" />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "new@b.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "SecurePass1!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    await waitFor(() => {
      expect(screen.getByRole("status").textContent).toMatch(
        /check your email/i,
      );
    });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes after sign-up when no confirmation is needed", async () => {
    mockSignUp.mockResolvedValueOnce({ error: null, needsConfirmation: false });
    const AuthModal = await getModal();
    const onClose = vi.fn();
    render(<AuthModal isOpen={true} onClose={onClose} mode="signup" />);
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "new@b.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "SecurePass1!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
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
    expect(screen.queryByLabelText(/^password$/i)).toBeNull();

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "a@b.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: /send reset link/i }));
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

  it("reset mode updates the password and shows confirmation", async () => {
    const AuthModal = await getModal();
    render(<AuthModal isOpen={true} onClose={vi.fn()} mode="reset" />);
    expect(
      screen.getByRole("heading", { name: /set new password/i }),
    ).toBeDefined();
    // No email field in reset mode
    expect(screen.queryByLabelText(/email/i)).toBeNull();

    fireEvent.change(screen.getByLabelText(/^password$/i), {
      target: { value: "BrandNewPass1!" },
    });
    fireEvent.click(screen.getByRole("button", { name: /update password/i }));
    await waitFor(() => {
      expect(mockUpdatePassword).toHaveBeenCalledWith("BrandNewPass1!");
      expect(screen.getByRole("status").textContent).toMatch(
        /password updated/i,
      );
    });
  });
});
