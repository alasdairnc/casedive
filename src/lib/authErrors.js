/**
 * Turn raw Supabase auth error strings into plain-language messages plus an
 * optional follow-up action the modal can offer as a button.
 *
 * action values:
 *   "resend" — offer to resend the confirmation email
 *   "forgot" — offer the reset-password flow
 *   "signin" — offer to switch to the Sign In tab
 *   "magic"  — offer an email sign-in link
 *   null     — nothing extra to offer
 */
const RULES = [
  {
    test: /invalid login credentials/i,
    message: "Incorrect email or password.",
    action: "forgot",
  },
  {
    test: /email not confirmed/i,
    message:
      "You haven't confirmed your email yet. Check your inbox, or we can send the link again.",
    action: "resend",
  },
  {
    test: /user already registered|already been registered/i,
    message: "There's already an account with this email.",
    action: "signin",
  },
  {
    test: /otp_expired|link is invalid or has expired|token has expired|expired/i,
    message:
      "That email link has expired or was already used. Request a new one below.",
    action: "magic",
  },
  {
    test: /rate limit|only request this after|too many requests/i,
    message: "Too many attempts. Wait a minute, then try again.",
    action: null,
  },
  {
    test: /new password should be different/i,
    message: "Choose a password you haven't used here before.",
    action: null,
  },
  {
    test: /password should be at least/i,
    message: "Password must be at least 8 characters.",
    action: null,
  },
  {
    test: /unable to validate email address|invalid format/i,
    message: "Please enter a valid email address.",
    action: null,
  },
  {
    test: /signups? not allowed|signup is disabled/i,
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

export function friendlyAuthError(raw) {
  if (!raw) return null;
  const text = typeof raw === "string" ? raw : raw.message || String(raw);
  for (const rule of RULES) {
    if (rule.test.test(text)) {
      return { message: rule.message, action: rule.action };
    }
  }
  return { message: text, action: null };
}
