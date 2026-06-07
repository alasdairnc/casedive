// @vitest-environment happy-dom
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// ── Mock useAuth ──────────────────────────────────────────────────────────────

const mockSignIn = vi.fn();
const mockSignUp = vi.fn();

vi.mock("../../src/hooks/useAuth.js", () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    signUp: mockSignUp,
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
    mockSignUp.mockResolvedValue(null);
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
      expect(screen.getByText(/email/i)).toBeDefined();
    });
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
      expect(screen.getByText(/password/i)).toBeDefined();
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
});
