import { describe, expect, it } from "vitest";
import {
  friendlyAuthError,
  friendlyCodeError,
} from "../../src/lib/authErrors.js";

// Raw strings are the messages (or codes) Supabase Auth actually returns.
const CASES = [
  ["Invalid login credentials", /incorrect email or password/i, "forgot"],
  ["invalid_credentials", /incorrect email or password/i, "forgot"],
  [
    "Email not confirmed",
    /haven't confirmed your email yet\. check your inbox, or we can send a new code\./i,
    "resend",
  ],
  ["User already registered", /already an account/i, "signin"],
  [
    "Auth session missing!",
    /your reset session has expired\. request a new code\./i,
    "forgot",
  ],
  ["session_not_found", /reset session has expired/i, "forgot"],
  ["otp_expired", /email link has expired or was already used/i, null],
  [
    "Email link is invalid or has expired",
    /email link has expired or was already used/i,
    null,
  ],
  ["Error sending confirmation email", /couldn't send the email/i, null],
  ["Error sending recovery email", /couldn't send the email/i, null],
  ["Error sending email", /couldn't send the email/i, null],
  ["email rate limit exceeded", /too many attempts/i, null],
  [
    "For security purposes, you can only request this after 42 seconds.",
    /too many attempts/i,
    null,
  ],
  [
    "New password should be different from the old password.",
    /haven't used here before/i,
    null,
  ],
  [
    "Password is known to be weak and easy to guess, please choose a different one.",
    /too easy to guess/i,
    null,
  ],
  [
    "Password should contain at least one character of each: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789",
    /needs more variety/i,
    null,
  ],
  ["Password should be at least 6 characters.", /at least 8 characters/i, null],
  ['Email address "bob@example" is invalid', /valid email address/i, null],
  ["Signups not allowed for this instance", /paused/i, null],
  [
    "Unsupported provider: provider is not enabled",
    /isn't available yet/i,
    null,
  ],
  ["Failed to fetch", /couldn't reach the server/i, null],
  ["Load failed", /couldn't reach the server/i, null],
  ["Auth not configured", /aren't available/i, null],
];

// Actions the modal knows how to render. "magic" went away with the
// sign-in-link option and must not come back.
const ALLOWED_ACTIONS = new Set(["resend", "forgot", "signin", null]);

describe("friendlyAuthError", () => {
  it.each(CASES)("maps %j", (raw, message, action) => {
    const result = friendlyAuthError(raw);
    expect(result.message).toMatch(message);
    expect(result.action).toBe(action);
  });

  it("accepts Error objects", () => {
    expect(friendlyAuthError(new TypeError("Failed to fetch")).message).toMatch(
      /couldn't reach the server/i,
    );
  });

  it("returns null for no error", () => {
    expect(friendlyAuthError(null)).toBeNull();
    expect(friendlyAuthError("")).toBeNull();
  });

  it("passes unknown messages through unchanged", () => {
    expect(friendlyAuthError("Something specific happened")).toEqual({
      message: "Something specific happened",
      action: null,
    });
  });

  it("replaces an empty retryable-fetch message with a generic one", () => {
    expect(friendlyAuthError("{}").message).toMatch(/something went wrong/i);
    expect(friendlyAuthError({ message: "" }).message).toMatch(
      /something went wrong/i,
    );
  });

  it("never returns the removed magic action", () => {
    for (const [raw] of CASES) {
      expect(friendlyAuthError(raw).action).not.toBe("magic");
    }
    for (const raw of ["Token has expired or is invalid", "Invalid OTP"]) {
      expect(friendlyAuthError(raw).action).not.toBe("magic");
    }
  });

  it("only returns actions the modal can render", () => {
    for (const [raw] of CASES) {
      expect(ALLOWED_ACTIONS.has(friendlyAuthError(raw).action)).toBe(true);
    }
  });

  it("does not mention a sign-in link in any mapped message", () => {
    for (const [raw] of CASES) {
      expect(friendlyAuthError(raw).message).not.toMatch(
        /sign-in link|magic link/i,
      );
    }
  });
});

describe("friendlyCodeError", () => {
  const WRONG_OR_EXPIRED =
    "That code is wrong or has expired. Check it, or send a new one.";

  it.each([
    "Token has expired or is invalid",
    "otp_expired",
    "Invalid OTP",
    "token is invalid",
    "Invalid token",
    "Invalid code",
    "The code is invalid",
  ])("maps %j to the wrong-or-expired copy with no action", (raw) => {
    expect(friendlyCodeError(raw)).toEqual({
      message: WRONG_OR_EXPIRED,
      action: null,
    });
  });

  it("matches regardless of case", () => {
    expect(friendlyCodeError("TOKEN HAS EXPIRED OR IS INVALID")).toEqual({
      message: WRONG_OR_EXPIRED,
      action: null,
    });
  });

  it("accepts an Error object with a message", () => {
    expect(
      friendlyCodeError(new Error("Token has expired or is invalid")),
    ).toEqual({ message: WRONG_OR_EXPIRED, action: null });
  });

  it("accepts a plain object that only carries a code", () => {
    expect(friendlyCodeError({ code: "otp_expired" })).toEqual({
      message: WRONG_OR_EXPIRED,
      action: null,
    });
  });

  it("returns null for no error", () => {
    expect(friendlyCodeError(null)).toBeNull();
    expect(friendlyCodeError(undefined)).toBeNull();
    expect(friendlyCodeError("")).toBeNull();
  });

  describe("falls through to friendlyAuthError for non-code errors", () => {
    it("keeps the rate-limit message", () => {
      const result = friendlyCodeError("email rate limit exceeded");
      expect(result.message).toMatch(/too many attempts/i);
      expect(result.message).not.toBe(WRONG_OR_EXPIRED);
      expect(result.action).toBeNull();
    });

    it("keeps the network-failure message", () => {
      const result = friendlyCodeError(new TypeError("Failed to fetch"));
      expect(result.message).toMatch(/couldn't reach the server/i);
      expect(result.action).toBeNull();
    });

    it("does not treat invalid login credentials as a bad code", () => {
      const result = friendlyCodeError("Invalid login credentials");
      expect(result.message).toMatch(/incorrect email or password/i);
      expect(result.message).not.toBe(WRONG_OR_EXPIRED);
      expect(result.action).toBe("forgot");
    });

    it("keeps the resend action for an unconfirmed email", () => {
      const result = friendlyCodeError("Email not confirmed");
      expect(result.message).toMatch(/haven't confirmed your email/i);
      expect(result.action).toBe("resend");
    });

    it("keeps the expired reset-session copy and forgot action", () => {
      const result = friendlyCodeError("Auth session missing!");
      expect(result.message).toMatch(/request a new code/i);
      expect(result.action).toBe("forgot");
    });

    it("keeps the not-configured message", () => {
      expect(friendlyCodeError("Auth not configured").message).toMatch(
        /aren't available/i,
      );
    });

    it("passes unknown messages through unchanged", () => {
      expect(friendlyCodeError("Something specific happened")).toEqual({
        message: "Something specific happened",
        action: null,
      });
    });

    it("replaces an empty retryable-fetch message with a generic one", () => {
      expect(friendlyCodeError("{}").message).toMatch(/something went wrong/i);
    });
  });

  it("differs from friendlyAuthError on a bad code", () => {
    // The same raw string reads as an old email link outside the code field.
    expect(
      friendlyAuthError("Token has expired or is invalid").message,
    ).toMatch(/email link has expired/i);
    expect(friendlyCodeError("Token has expired or is invalid").message).toBe(
      WRONG_OR_EXPIRED,
    );
  });

  it("never returns the removed magic action", () => {
    const raws = [
      "Token has expired or is invalid",
      "otp_expired",
      "Invalid OTP",
      "token is invalid",
      "Invalid login credentials",
      "Email not confirmed",
      "email rate limit exceeded",
      "Failed to fetch",
      ...CASES.map(([raw]) => raw),
    ];
    for (const raw of raws) {
      const result = friendlyCodeError(raw);
      expect(result.action).not.toBe("magic");
      expect(ALLOWED_ACTIONS.has(result.action)).toBe(true);
    }
  });
});
