/**
 * Turn raw Supabase auth error strings into plain-language messages plus an
 * optional follow-up action the modal can offer as a button.
 *
 * action values:
 *   "resend" — offer to send a new confirmation code
 *   "forgot" — offer the reset-password flow
 *   "signin" — offer to switch to the Sign In tab
 *   null     — nothing extra to offer
 */
const RULES = [
  {
    test: /invalid login credentials|invalid_credentials/i,
    message: "Incorrect email or password.",
    action: "forgot",
  },
  {
    test: /email not confirmed|email_not_confirmed/i,
    message:
      "You haven't confirmed your email yet. Check your inbox, or we can send a new code.",
    action: "resend",
  },
  {
    test: /user already registered|already been registered|user_already_exists/i,
    message: "There's already an account with this email.",
    action: "signin",
  },
  {
    // Recovery session gone (the reset session timed out, or the tab sat too
    // long between entering the code and choosing a password).
    test: /auth session missing|session_not_found|session.*expired/i,
    message: "Your reset session has expired. Request a new code.",
    action: "forgot",
  },
  {
    // Reached from an old emailed link (the arrival toast), not from the
    // modal's code field, which uses friendlyCodeError below.
    test: /otp_expired|link is invalid or has expired|token has expired|expired/i,
    message: "That email link has expired or was already used.",
    action: null,
  },
  {
    // Supabase could not hand the message to its mail sender (SMTP down or
    // the built-in test sender refusing a non-team address).
    test: /error sending .*email|unexpected_failure.*email/i,
    message:
      "We couldn't send the email just now. Please try again in a few minutes.",
    action: null,
  },
  {
    // Supabase's per-address email throttle ("you can only request this after
    // N seconds"): a minute is the right wait.
    test: /only request this after/i,
    message: "Too many attempts. Wait a minute, then try again.",
    action: null,
  },
  {
    // The project-wide hourly email cap and the per-IP request limits take
    // longer than a minute to clear, so don't promise one.
    test: /rate limit|too many requests|over_email_send_rate_limit|over_request_rate_limit/i,
    message:
      "We're getting a lot of requests right now. Please try again in a little while.",
    action: null,
  },
  {
    test: /new password should be different|same_password/i,
    message: "Choose a password you haven't used here before.",
    action: null,
  },
  {
    test: /weak|easy to guess|pwned|known to be/i,
    message:
      "That password is too easy to guess. Try a longer or less common one.",
    action: null,
  },
  {
    test: /should contain at least one character/i,
    message:
      "Password needs more variety: mix upper- and lowercase letters, numbers and symbols.",
    action: null,
  },
  {
    test: /password should be at least|password.*too short/i,
    message: "Password must be at least 8 characters.",
    action: null,
  },
  {
    test: /unable to validate email address|invalid format|email address .*is invalid|email_address_invalid/i,
    message: "Please enter a valid email address.",
    action: null,
  },
  {
    test: /signups? not allowed|signup is disabled|signup_disabled/i,
    message: "New accounts are paused right now. Please try again later.",
    action: null,
  },
  {
    test: /provider is not enabled|unsupported provider/i,
    message: "That sign-in option isn't available yet. Use your email instead.",
    action: null,
  },
  {
    test: /failed to fetch|networkerror|network request failed|load failed/i,
    message: "Couldn't reach the server. Check your connection and try again.",
    action: null,
  },
  {
    test: /auth not configured/i,
    message: "Accounts aren't available right now.",
    action: null,
  },
];

const FALLBACK = "Something went wrong. Please try again.";

function textOf(raw) {
  return typeof raw === "string" ? raw : raw.message || raw.code || String(raw);
}

export function friendlyAuthError(raw) {
  if (!raw) return null;
  const text = textOf(raw);
  for (const rule of RULES) {
    if (rule.test.test(text)) {
      return { message: rule.message, action: rule.action };
    }
  }
  // Supabase's retryable fetch error sometimes carries "{}" as its message.
  const trimmed = text.trim();
  if (!trimmed || trimmed === "{}" || trimmed === "[object Object]") {
    return { message: FALLBACK, action: null };
  }
  return { message: trimmed, action: null };
}

// Supabase answers a wrong code and an expired one with the same error
// ("Token has expired or is invalid" / otp_expired), so the copy covers both.
// The modal's resend button sits right under the field, so no action here.
const BAD_CODE = /otp_expired|token has expired|expired or is invalid|invalid.*(token|otp|code)|(token|otp|code).*invalid/i;

/** Like friendlyAuthError, for errors from verifying an emailed code. */
export function friendlyCodeError(raw) {
  if (!raw) return null;
  if (BAD_CODE.test(textOf(raw))) {
    return {
      message: "That code is wrong or has expired. Check it, or send a new one.",
      action: null,
    };
  }
  return friendlyAuthError(raw);
}
