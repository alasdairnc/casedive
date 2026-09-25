# Auth setup checklist

Everything the sign-in/sign-up code needs from Supabase, Google, and Vercel.

The code side:

- `src/lib/supabase.js`: the client, build flags (`authMethods`), the redirect
  URL, and `initialAuthParams` (what an email link put in the URL).
- `src/lib/AuthContext.jsx`: `<AuthProvider>`, the one session subscription.
  `src/hooks/useAuth.js` reads it.
- `src/lib/authErrors.js`: Supabase errors → plain language plus a one-click
  follow-up (resend confirmation, reset password, sign in instead, email link).
- `src/components/AuthModal.jsx`: sign in, create account, email link, forgot
  and reset password, and the "check your email" screen with resend.
- `src/components/Toast.jsx`: the welcome / expired-link message shown after
  arriving from an email link.

`tests/e2e/auth.spec.js` exercises every flow against a mocked Supabase; the
header of that file has the one-line command to run it locally.

## 1. Custom SMTP

**Done 2026-09-25.** Supabase hands every auth email to Resend over SMTP:

- Sender: `CaseDive <no-reply@casedive.ca>`
- `casedive.ca` is verified in Resend; SPF, DKIM and DMARC records live in
  Cloudflare and all three passed on the first test email (Gmail inbox, not
  spam).
- SMTP password: the Resend API key `supabase-smtp`, sending-only and limited
  to `casedive.ca`.
- Supabase email rate limit: 30/hour.

Supabase's built-in sender (test-only, team addresses only) is no longer used.

### Replacing the SMTP key

Do this if the key leaks, or on a schedule.

1. Resend → API Keys → Create API key: permission **Sending access**, domain
   `casedive.ca`. Copy it (Resend shows it once).
2. Supabase → Authentication → Emails → SMTP Settings → paste it as the
   password and Save. Host, port and username (`resend`) stay as they are.
3. Send yourself a password reset from the live site and check it arrives.
4. Only then delete the old key in Resend, so there is no gap in delivery.

### If emails stop arriving

The modal shows "We couldn't send the email just now" (Supabase's "Error
sending confirmation email" / "recovery email" / "magic link email"). Check,
in order: Resend → Logs for the send attempt and bounce reason; that the key
in Supabase still exists in Resend; that the Cloudflare DNS records are
still in place; Supabase → Authentication → Rate Limits.

## 2. URL configuration

Supabase → Authentication → URL Configuration:

- **Site URL:** `https://www.casedive.ca`
- **Redirect URLs** (add each):
  - `https://www.casedive.ca/**`
  - `https://casedive.ca/**`
  - `http://localhost:5173/**` (local dev, added 2026-09-25)
  - Optional, for Vercel previews: `https://*-alasdairncs-projects.vercel.app/**`.
    Preview URLs look like
    `casefinder-project-git-<branch>-alasdairncs-projects.vercel.app`, and only
    this Vercel team can create hosts ending in `-alasdairncs-projects`.
    Without it, email links sent from a preview land on the live site.

The app passes `window.location.origin` as the redirect for every email link
and for OAuth, so any origin not on this list falls back to the Site URL.

## 3. Email templates

Supabase → Authentication → Emails → Templates. Keep the
`{{ .ConfirmationURL }}` placeholder in each. The HTML lives in
`supabase/templates/`; each file's header comment names the template and
subject, and everything below the comment is what gets pasted into Message
body.

| Template | Sent when | Status |
| --- | --- | --- |
| Confirm signup | Sign-up, "Resend confirmation email", first email sign-in link for a new address | Branded: "Confirm your CaseDive account" (not yet copied into the repo) |
| Reset Password | Forgot password | Branded: "Reset your CaseDive password" (`recovery.html`) |
| Magic Link | "Email me a sign-in link" for an existing account | **Paste `magic_link.html`**, subject "Your CaseDive sign-in link" |

Change Email Address, Invite user and Reauthentication aren't reachable from
the app, so they can stay default.

Also check **Authentication → Emails → Templates → Confirm signup** points at
`{{ .ConfirmationURL }}` (the default). The app reads the result from the URL
when the user lands back on the site and shows "Email confirmed — you're
signed in", or "That email link has expired or was already used" with a Sign In
button. Some corporate mail scanners open links before the user does, which
burns one-time links; the resend button on the "check your email" screen is the
way back.

## 4. Magic link

On by default (`VITE_AUTH_MAGIC_LINK` unset). No extra Supabase setup beyond
the Email provider being enabled and SMTP working. To hide it, set
`VITE_AUTH_MAGIC_LINK=false` in Vercel and redeploy.

## 5. Google sign-in

1. Google Cloud Console → create/select a project → APIs & Services →
   OAuth consent screen: External, app name "CaseDive", support email,
   authorized domain `casedive.ca`, scopes `email`, `profile`, `openid`.
   Publish the app (move out of "Testing").
2. Credentials → Create credentials → OAuth client ID → Web application.
   - Authorized JavaScript origins: `https://www.casedive.ca`,
     `https://casedive.ca`
   - Authorized redirect URI: the callback shown in Supabase → Authentication
     → Sign In / Providers → Google (looks like
     `https://<project-ref>.supabase.co/auth/v1/callback`).
3. Paste the Client ID and Client Secret into Supabase → Google provider →
   enable → save.
4. Vercel → Project → Settings → Environment Variables: add
   `VITE_AUTH_GOOGLE=true` (Production + Preview), then redeploy.

## 6. Vercel env vars (reference)

| Variable | Needed for |
| --- | --- |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` | Auth at all (no sign-in button without them) |
| `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` | Cloud sync (`api/user-data.js`) |
| `VITE_AUTH_GOOGLE` | `true` to show "Continue with Google" |
| `VITE_AUTH_MAGIC_LINK` | `false` to hide the email-link option |

`VITE_*` vars are baked in at build time, so redeploy after changing them.

## 7. Live smoke test (five minutes)

Run it once the sign-in polish (PR #36) is deployed; before that the live site
still has the old modal.

Use an address that is not on your Supabase team, ideally a phone's mail app.

1. **Sign up** on `www.casedive.ca` → "Check Your Email" screen → the email
   arrives → the link lands you back signed in with "Email confirmed".
2. **Sign out, sign in** with the same password → your email shows in the header.
3. **Wrong password** → "Incorrect email or password" with a "Reset your
   password" link.
4. **Forgot password** → email arrives → link opens "Set New Password" →
   Update → Continue → still signed in.
5. **Email me a sign-in link** → email arrives → link signs you in.
6. **Open an old link a second time** → "That email link has expired or was
   already used" with a Sign In button.

If any step says "We couldn't send the email just now", see "If emails stop
arriving" in section 1.
