# Auth setup checklist

Everything the sign-in/sign-up code needs from Supabase, Google, and Vercel.

The code side:

- `src/lib/supabase.js`: the client, the Google build flag (`authMethods`), the
  redirect URL, and `initialAuthParams` (what an emailed link or a Google
  redirect put in the URL).
- `src/lib/AuthContext.jsx`: `<AuthProvider>`, the one session subscription.
  It also holds `verifySignupCode` and `verifyRecoveryCode`, thin wrappers
  around `supabase.auth.verifyOtp` with type `signup` and `recovery`.
  `src/hooks/useAuth.js` reads it.
- `src/lib/authErrors.js`: Supabase errors → plain language plus a one-click
  follow-up (send a new code, reset password, sign in instead).
  `friendlyCodeError` covers a wrong or expired code.
- `src/components/AuthModal.jsx`: the Sign in and Create account tabs (email
  and password), forgot password, the code screen for sign-up and reset codes
  (with a 60 second resend cooldown), and set new password.
- `src/components/Toast.jsx`: the welcome / expired-link message shown after
  arriving from an emailed link or a Google redirect.

`tests/e2e/auth.spec.js` covers sign in, sign up, the code screens, password
reset and arriving from an emailed link, against a mocked Supabase; the header
of that file has the one-line command to run it locally.

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
sending confirmation email" / "recovery email"). Check, in order: Resend →
Logs for the send attempt and bounce reason; that the key in Supabase still
exists in Resend; that the Cloudflare DNS records are still in place;
Supabase → Authentication → Rate Limits.

## 2. URL configuration

Supabase → Authentication → URL Configuration:

- **Site URL:** `https://www.casedive.ca`
- **Redirect URLs** (add each):
  - `https://www.casedive.ca/**`
  - `https://casedive.ca/**`
  - `http://localhost:5173/**` (local dev, added 2026-09-25)
  - To test from a Vercel preview, add that one preview's exact URL for the
    test and remove it afterwards. Don't add a wildcard such as
    `https://*-alasdairncs-projects.vercel.app/**`: project names are chosen by
    whoever creates the project, so another account could register a host that
    matches it and receive the session from an emailed link. Without an entry,
    email links sent from a preview land on the live site.

The app passes `window.location.origin` as the redirect for the sign-up and
reset emails (the button in them, while the templates still carry one) and for
OAuth, so any origin not on this list falls back to the Site URL. The code
itself needs no redirect.

## 3. Email templates

Supabase → Authentication → Emails → Templates. The HTML lives in
`supabase/templates/`; each file's header comment names the template and
subject, and everything below the comment is what gets pasted into Message
body (and the subject into Subject heading).

Sign-up and password reset both use a one-time code that the user types into
the modal. The two templates below carry the code (`{{ .Token }}`, shown large
and monospaced) **and** the old button (`{{ .ConfirmationURL }}`). That is the
transitional form: it works for the previous site, which only understood
links, and for the current one, which asks for the code. Keep both
placeholders until the code-only switch in "Rollout order" below.

| Template | Sent when | Status |
| --- | --- | --- |
| Confirm signup | Create account; "Resend code" on the sign-up code screen; "Send a new code" after signing in to an unconfirmed account | Branded, code + link: "Confirm your CaseDive account" (`confirm_signup.html`) |
| Reset Password | Forgot password; "Resend code" on the reset code screen | Branded, code + link: "Reset your CaseDive password" (`recovery.html`) |
| Magic Link | Nothing in the app sends it any more | Not used. Whatever is in Supabase can stay; the repo copy (`magic_link.html`) was removed |

Change Email Address, Invite user and Reauthentication aren't reachable from
the app, so they can stay default.

A confirmation or reset link from an old email still works. It lands on the
site with the session in the URL, and the app shows "Email confirmed — you're
signed in" (or goes to the set new password step for a reset link), or "That
email link has expired or was already used" if the link is spent or older than
an hour. Some corporate mail scanners open links before the user does, which
burns one-time links. While the emails still carry the button, the button and
the code check the same one-time secret, so a scanned email's code is spent
too. A scanned sign-up email has already confirmed the account, so the user
signs in with their password ("Resend code" sends nothing for a confirmed
address). A scanned reset email needs a new reset email, and its button can be
scanned again. The code only gets past scanners once rollout step 4 removes the
button.

### Rollout order

The templates go first so that no email is sent without a code once the new
modal is live, and so that the previous site still gets a working link while it
is serving.

1. Paste `confirm_signup.html` into Confirm signup and `recovery.html` into
   Reset Password, with the subjects from their header comments.
2. Deploy the code.
3. Run the smoke test in section 7. Its sign-up and reset emails are also the
   check that each template shows the code large and still has the button.
4. Once the code flow has been live and verified, and soon after, because it
   is also what makes the code safe from mail scanners: paste the code-only
   versions of both templates into Supabase. The repo copies are already
   code-only (no `{{ .ConfirmationURL }}`, intro reads "Enter this code on
   CaseDive. The code expires in 1 hour."). New emails then carry the code
   only; links in emails already sent keep working until they expire.

## 4. Email code settings

Supabase → Authentication → Sign In / Providers → Email controls the code
length (6 to 10 digits) and how long a code is valid (default 1 hour; the
templates say "1 hour", so change them if you change this). The app accepts 6
to 10 digits
and strips anything that isn't a digit, so any length in that range works
without a code change.

The resend button is disabled for 60 seconds after each send because Supabase
refuses a second email to the same address inside 60 seconds. Only the newest
code works; sending a new one invalidates the older ones.

**Security note.** Supabase's passwordless OTP endpoint can't be switched off
separately from email sign-in. Someone holding the public anon key (it ships
in the site's JavaScript) could still ask Supabase to email a passwordless
sign-in message to any address. The app never calls that endpoint, and the only
effect of such a request is an email arriving at that address; it doesn't sign
anyone in without the code or link in that inbox. Public sign-up already lets
anyone with the anon key trigger a confirmation email to any address, so this
adds nothing new, and the Supabase email rate limits cover both.

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

`VITE_*` vars are baked in at build time, so redeploy after changing them.

`VITE_AUTH_MAGIC_LINK` is no longer read by anything. If it is still set in
Vercel, delete it.

## 7. Live smoke test (ten minutes)

Run it after steps 1 and 2 of "Rollout order" in section 3: the transitional
templates are pasted and the code flow is deployed.

Use addresses that are not on your Supabase team, ideally opened in a phone's
mail app. You need two accounts; plus-addresses of one inbox
(`you+a@example.com`, `you+b@example.com`) work.

1. **Sign up with a code (account A).** Create account tab, email and
   password, Create account. The "Check your email" screen appears. The email
   arrives with the code large and monospaced and a button below it. Type the
   code, Verify and sign in. The modal closes, "Email confirmed — you're
   signed in" appears and your email shows in the header.
2. **Sign in.** Sign out, then sign in as A with the same password. Your email
   shows in the header.
3. **Wrong password.** Sign out, then sign in as A with a wrong password: "Incorrect email or
   password." with a "Reset your password" link.
4. **Wrong code (account B).** Sign up as B and, on the code screen, enter a
   code with one digit changed: "That code is wrong or has expired. Check it,
   or send a new one." Enter fewer than 6 digits: "Enter the code from your
   email."
5. **Resend after the wait.** The button reads "Resend code in 60s" and counts
   down and is disabled until zero. At zero, click "Resend code": "Sent
   again. Use the newest code; older ones stop working." A second email
   arrives. The first email's code is now refused.
6. **Unconfirmed sign-in.** Close the modal, reopen it and sign in as B before
   confirming: "You haven't confirmed your email yet. Check your inbox, or we
   can send a new code." Wait a minute after step 5's email, then click "Send
   a new code" (this button has no cooldown of its own; sooner than that
   Supabase answers "Too many attempts. Wait a minute, then try again."). The
   code screen opens and a new email arrives.
7. **An old confirmation link still signs you in.** In B's newest email, click
   the button instead of typing the code. You land on the site signed in with
   "Email confirmed — you're signed in". (A confirmation email sent before the
   deploy is the same test.) Click the button a second time: "That email link
   has expired or was already used."
8. **Forgot password with a code.** Sign out. Sign in tab, "Forgot
   password?", enter A's email, Send reset code. The code screen appears
   (button "Verify code") and the reset email arrives with a code and a
   button. Enter the code: the modal moves to "Set new password" and stays
   open. Choose a new password, Update password, then Continue; you are still
   signed in. Sign out and sign in with the new password.

If any step says "We couldn't send the email just now", see "If emails stop
arriving" in section 1.
