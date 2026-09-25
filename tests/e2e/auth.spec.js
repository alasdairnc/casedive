import { test, expect } from "@playwright/test";
import { openNavMenuIfCollapsed } from "./helpers/nav.js";

// Sign-in / sign-up flows against a mocked Supabase Auth API.
//
// The Sign In button only renders when VITE_SUPABASE_URL and
// VITE_SUPABASE_ANON_KEY are set for the dev server, so every test skips
// against an auth-disabled build. No real Supabase project is needed: every
// /auth/v1/* call is intercepted below, so any URL works, e.g.
//
//   VITE_SUPABASE_URL=http://127.0.0.1:54321 VITE_SUPABASE_ANON_KEY=test \
//     npm run dev
//   npx playwright test tests/e2e/auth.spec.js --project=chromium

const USER = {
  id: "00000000-0000-4000-8000-000000000001",
  aud: "authenticated",
  role: "authenticated",
  email: "user@example.com",
  email_confirmed_at: "2026-09-25T00:00:00Z",
  app_metadata: { provider: "email", providers: ["email"] },
  user_metadata: {},
  identities: [],
  created_at: "2026-09-25T00:00:00Z",
  updated_at: "2026-09-25T00:00:00Z",
};

function fakeJwt() {
  const b64 = (obj) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  return [
    b64({ alg: "HS256", typ: "JWT" }),
    b64({
      sub: USER.id,
      email: USER.email,
      aud: "authenticated",
      role: "authenticated",
      iat: now,
      exp: now + 3600,
    }),
    "signature",
  ].join(".");
}

function session() {
  return {
    access_token: fakeJwt(),
    token_type: "bearer",
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    refresh_token: "refresh-token",
    user: USER,
  };
}

const json = (route, status, body) =>
  route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });

const authError = (route, status, errorCode, msg) =>
  json(route, status, { code: status, error_code: errorCode, msg });

// Cloud sync fires after any sign-in; keep it quiet.
async function mockCloudSync(page) {
  await page.route("**/api/user-data**", (route) =>
    json(route, 200, { bookmarks: [], history: [] }),
  );
}

async function openAuthModal(page, path = "/") {
  await page.goto(path);
  const signIn = page.getByRole("button", { name: /^sign in$/i });
  // The header hides Sign In until the stored session is read.
  await signIn
    .first()
    .waitFor({ timeout: 5000 })
    .catch(() => {});
  if ((await signIn.count()) === 0) return null;
  await signIn.first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  return dialog;
}

const emailField = (dialog) => dialog.getByLabel("Email", { exact: true });
// Password inputs have no ARIA role, and "Show password" shares the label
// text, so target the field itself.
const passwordField = (dialog) => dialog.locator("input#auth-password");

test.describe("AuthModal", () => {
  test.beforeEach(async ({ page }) => {
    await mockCloudSync(page);
  });

  test("header Sign In opens the modal and Escape closes it", async ({
    page,
  }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await expect(
      dialog.getByRole("heading", { name: "Sign In" }),
    ).toBeVisible();
    await expect(emailField(dialog)).toBeFocused();
    await expect(passwordField(dialog)).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("close button dismisses the modal", async ({ page }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(dialog).toBeHidden();
  });

  test("client-side validation rejects bad email and short new password", async ({
    page,
  }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await emailField(dialog).fill("not-an-email");
    await passwordField(dialog).fill("longenough");
    await dialog.getByRole("button", { name: /^sign in$/i }).click();
    await expect(dialog.getByRole("alert")).toContainText(
      "valid email address",
    );

    await dialog.getByRole("button", { name: /create an account/i }).click();
    await emailField(dialog).fill("user@example.com");
    await passwordField(dialog).fill("short");
    await dialog.getByRole("button", { name: /^create account$/i }).click();
    await expect(dialog.getByRole("alert")).toContainText(
      "at least 8 characters",
    );
  });

  test("show/hide toggles the password field", async ({ page }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    const field = dialog.locator("input#auth-password");
    await field.fill("hunter22hunter");
    await expect(field).toHaveAttribute("type", "password");
    await dialog.getByRole("button", { name: "Show password" }).click();
    await expect(field).toHaveAttribute("type", "text");
    await dialog.getByRole("button", { name: "Hide password" }).click();
    await expect(field).toHaveAttribute("type", "password");
  });

  test("switches between signin, signup, and forgot-password modes", async ({
    page,
  }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await dialog.getByRole("button", { name: /create an account/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Create Account" }),
    ).toBeVisible();

    await dialog
      .getByRole("button", { name: /already have an account/i })
      .click();
    await expect(
      dialog.getByRole("heading", { name: "Sign In" }),
    ).toBeVisible();

    await dialog.getByRole("button", { name: /forgot password/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Reset Password" }),
    ).toBeVisible();
    await expect(dialog.locator("input#auth-password")).toHaveCount(0);

    await dialog.getByRole("button", { name: /back to sign in/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Sign In" }),
    ).toBeVisible();
  });

  test("successful sign-in closes the modal and shows the account in the header", async ({
    page,
  }) => {
    await page.route("**/auth/v1/token**", (route) =>
      json(route, 200, session()),
    );
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await emailField(dialog).fill(USER.email);
    await passwordField(dialog).fill("correct horse battery");
    await dialog.getByRole("button", { name: /^sign in$/i }).click();

    await expect(dialog).toBeHidden();
    // On phones the account (email + Sign out) lives in the Menu.
    await openNavMenuIfCollapsed(page);
    await expect(page.getByRole("button", { name: /sign out/i })).toBeVisible();
    await expect(page.getByText(USER.email)).toBeVisible();

    await page.route("**/auth/v1/logout**", (route) =>
      route.fulfill({ status: 204 }),
    );
    await page.getByRole("button", { name: /sign out/i }).click();
    await expect(
      page.getByRole("button", { name: /^sign in$/i }),
    ).toBeVisible();
  });

  test("wrong password gets a plain-language error and a reset shortcut", async ({
    page,
  }) => {
    await page.route("**/auth/v1/token**", (route) =>
      authError(route, 400, "invalid_credentials", "Invalid login credentials"),
    );
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await emailField(dialog).fill(USER.email);
    await passwordField(dialog).fill("wrongpassword");
    await dialog.getByRole("button", { name: /^sign in$/i }).click();

    await expect(dialog.getByRole("alert")).toContainText(
      "Incorrect email or password.",
    );
    await dialog.getByRole("button", { name: /reset your password/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Reset Password" }),
    ).toBeVisible();
    await expect(emailField(dialog)).toHaveValue(USER.email);
  });

  test("unconfirmed account can resend its confirmation email", async ({
    page,
  }) => {
    await page.route("**/auth/v1/token**", (route) =>
      authError(route, 400, "email_not_confirmed", "Email not confirmed"),
    );
    let resendBody = null;
    await page.route("**/auth/v1/resend**", (route) => {
      resendBody = route.request().postDataJSON();
      return json(route, 200, {});
    });
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await emailField(dialog).fill(USER.email);
    await passwordField(dialog).fill("correct horse battery");
    await dialog.getByRole("button", { name: /^sign in$/i }).click();
    await expect(dialog.getByRole("alert")).toContainText(
      "haven't confirmed your email",
    );

    await dialog
      .getByRole("button", { name: /resend confirmation email/i })
      .click();
    await expect(
      dialog.getByRole("heading", { name: "Check Your Email" }),
    ).toBeVisible();
    expect(resendBody).toMatchObject({ type: "signup", email: USER.email });
  });

  test("sign-up shows a check-your-email screen and can resend", async ({
    page,
  }) => {
    let signupRedirect = null;
    await page.route("**/auth/v1/signup**", (route) => {
      signupRedirect = new URL(route.request().url()).searchParams.get(
        "redirect_to",
      );
      return json(route, 200, {
        ...USER,
        email_confirmed_at: null,
        confirmation_sent_at: "2026-09-25T00:00:00Z",
      });
    });
    let resends = 0;
    await page.route("**/auth/v1/resend**", (route) => {
      resends += 1;
      return json(route, 200, {});
    });
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await dialog.getByRole("button", { name: /create an account/i }).click();
    await emailField(dialog).fill(USER.email);
    await passwordField(dialog).fill("correct horse battery");
    await dialog.getByRole("button", { name: /^create account$/i }).click();

    await expect(
      dialog.getByRole("heading", { name: "Check Your Email" }),
    ).toBeVisible();
    await expect(dialog.getByRole("status")).toContainText(USER.email);
    // Confirmation link comes back to the site the user signed up on.
    expect(signupRedirect).toBe(new URL(page.url()).origin);

    await dialog.getByRole("button", { name: /resend email/i }).click();
    await expect(dialog.getByRole("status")).toContainText("Sent again");
    expect(resends).toBe(1);
  });

  test("email sign-in link is sent without a password", async ({ page }) => {
    let otpBody = null;
    await page.route("**/auth/v1/otp**", (route) => {
      otpBody = route.request().postDataJSON();
      return json(route, 200, {});
    });
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    const linkOption = dialog.getByRole("button", {
      name: /email me a sign-in link instead/i,
    });
    test.skip(
      (await linkOption.count()) === 0,
      "VITE_AUTH_MAGIC_LINK=false in this environment",
    );
    await emailField(dialog).fill(USER.email);
    await linkOption.click();
    await expect(dialog.locator("input#auth-password")).toHaveCount(0);
    await dialog.getByRole("button", { name: /send sign-in link/i }).click();

    await expect(dialog.getByRole("status")).toContainText(
      `sign-in link to ${USER.email}`,
    );
    expect(otpBody).toMatchObject({ email: USER.email, create_user: true });
  });

  test("forgot-password success shows the check-your-email screen", async ({
    page,
  }) => {
    await page.route("**/auth/v1/recover**", (route) => json(route, 200, {}));
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await dialog.getByRole("button", { name: /forgot password/i }).click();
    await emailField(dialog).fill(USER.email);
    await dialog.getByRole("button", { name: /send reset link/i }).click();

    await expect(dialog.getByRole("status")).toContainText(
      "password reset link",
    );
  });
});

test.describe("Arriving from an email link", () => {
  test.beforeEach(async ({ page }) => {
    await mockCloudSync(page);
    await page.route("**/auth/v1/user**", (route) => json(route, 200, USER));
  });

  async function authEnabled(page) {
    // Signed out, the header bar shows Sign in. Signed in on a phone, Sign out
    // sits inside the closed Menu, so the email link's own dialog (reset) or
    // toast (welcome) is the signal there. Auth-disabled builds show none.
    const signal = page
      .getByRole("button", { name: /^(sign in|sign out)$/i })
      .or(page.getByRole("dialog"))
      .or(page.getByRole("status"));
    await signal
      .first()
      .waitFor({ timeout: 5000 })
      .catch(() => {});
    return (await signal.count()) > 0;
  }

  test("an expired link explains itself and offers Sign In", async ({
    page,
  }) => {
    await page.goto(
      "/#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired",
    );
    test.skip(!(await authEnabled(page)), "auth disabled in this environment");

    const toast = page.getByRole("status").filter({
      hasText: "expired or was already used",
    });
    await expect(toast).toBeVisible();
    // The error params are cleaned out of the address bar.
    await expect(page).toHaveURL(/\/$/);

    await toast.getByRole("button", { name: /sign in/i }).click();
    await expect(
      page.getByRole("dialog").getByRole("heading", { name: "Sign In" }),
    ).toBeVisible();
  });

  test("a confirmation link signs the user in with a welcome", async ({
    page,
  }) => {
    const s = session();
    await page.goto(
      `/#access_token=${s.access_token}&expires_at=${s.expires_at}&expires_in=3600&refresh_token=r&token_type=bearer&type=signup`,
    );
    test.skip(!(await authEnabled(page)), "auth disabled in this environment");

    await expect(
      page.getByText("Email confirmed — you're signed in."),
    ).toBeVisible();
    await openNavMenuIfCollapsed(page);
    await expect(page.getByRole("button", { name: /sign out/i })).toBeVisible();
    // Tokens never linger in the address bar.
    expect(page.url()).not.toContain("access_token");
  });

  test("a reset link opens Set New Password and finishes cleanly", async ({
    page,
  }) => {
    let updateBody = null;
    await page.route("**/auth/v1/user**", (route) => {
      if (route.request().method() === "PUT") {
        updateBody = route.request().postDataJSON();
      }
      return json(route, 200, USER);
    });
    const s = session();
    await page.goto(
      `/#access_token=${s.access_token}&expires_at=${s.expires_at}&expires_in=3600&refresh_token=r&token_type=bearer&type=recovery`,
    );
    test.skip(!(await authEnabled(page)), "auth disabled in this environment");

    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByRole("heading", { name: "Set New Password" }),
    ).toBeVisible();
    await dialog.locator("input#auth-password").fill("a brand new passphrase");
    await dialog.getByRole("button", { name: /update password/i }).click();

    await expect(dialog.getByRole("status")).toContainText("Password updated");
    expect(updateBody).toMatchObject({ password: "a brand new passphrase" });
    await dialog.getByRole("button", { name: "Continue" }).click();
    await expect(dialog).toBeHidden();
  });
});
