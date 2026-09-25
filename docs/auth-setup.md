# Auth setup checklist

Everything the sign-in/sign-up code needs from Supabase, Google, and Vercel.
The code side lives in `src/lib/AuthContext.jsx`, `src/lib/supabase.js`,
`src/lib/authErrors.js`, and `src/components/AuthModal.jsx`.

## 1. Custom SMTP (do this first)

Supabase's built-in email sender is for testing only: it's heavily
rate-limited and may only deliver to your own team's addresses. If it's
still in use, confirmation, magic-link, and reset emails won't reach real
users.

1. Create an account with an email provider (Resend is the simplest; Postmark
   or Amazon SES also work) and verify `casedive.ca` as a sending domain
   (add the DNS records they give you in Cloudflare).
2. Supabase → Authentication → Emails → SMTP Settings → enable custom SMTP.
   - Sender email: `no-reply@casedive.ca`
   - Sender name: `CaseDive`
   - Host / port / username / password from the provider.
3. Supabase → Authentication → Rate Limits: raise the email limit (for
   example to 30/hour) now that you have your own sender.
4. Send yourself a password reset from the live site to confirm delivery.

## 2. URL configuration

Supabase → Authentication → URL Configuration:

- **Site URL:** `https://www.casedive.ca`
- **Redirect URLs** (add each):
  - `https://www.casedive.ca/**`
  - `https://casedive.ca/**`
  - `http://localhost:5173/**` (local dev)
  - Optional, for Vercel previews: a wildcard matching your preview domain,
    e.g. `https://*-<your-team>.vercel.app/**` (copy the exact domain from a
    preview deployment in Vercel)

The app passes `window.location.origin` as the redirect for every email link
and for OAuth, so any origin not on this list falls back to the Site URL.

## 3. Email templates

Supabase → Authentication → Emails → Templates. Brand the **Confirm signup**,
**Magic Link**, and **Reset Password** templates (subject lines like
"Confirm your CaseDive account", "Your CaseDive sign-in link"). Keep the
`{{ .ConfirmationURL }}` placeholder.

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
