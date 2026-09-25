import { describe, expect, it } from "vitest";
import { friendlyAuthError } from "../../src/lib/authErrors.js";

// Raw strings are the messages (or codes) Supabase Auth actually returns.
const CASES = [
  ["Invalid login credentials", /incorrect email or password/i, "forgot"],
  ["Email not confirmed", /haven't confirmed your email/i, "resend"],
  ["User already registered", /already an account/i, "signin"],
  ["Auth session missing!", /reset link has expired/i, "forgot"],
  ["otp_expired", /expired or was already used/i, "magic"],
  [
    "Email link is invalid or has expired",
    /expired or was already used/i,
    "magic",
  ],
  ["Error sending confirmation email", /couldn't send the email/i, null],
  ["Error sending recovery email", /couldn't send the email/i, null],
  ["Error sending magic link email", /couldn't send the email/i, null],
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
});
