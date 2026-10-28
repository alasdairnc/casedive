import { test, expect } from "@playwright/test";
import { openNavMenuIfCollapsed } from "./helpers/nav.js";

// Sign-in / sign-up / password-reset flows against a mocked Supabase Auth API.
// Sign-up and password reset both end on an emailed-code screen, so POST
// /auth/v1/verify is mocked too: one fixed code (CODE) works, any other gets
// Supabase's real "Token has expired or is invalid" 403.
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

const CODE = "123456";

// POST /auth/v1/verify: a session when the body carries CODE and the expected
// type ("signup" or "recovery"), Supabase's wrong-or-expired error otherwise.
// Returns the request bodies it saw.
async function mockVerify(page, expectedType) {
  const bodies = [];
  await page.route("**/auth/v1/verify**", (route) => {
    const body = route.request().postDataJSON();
    bodies.push(body);
    if (body.token === CODE && body.type === expectedType) {
      return json(route, 200, session());
    }
    return authError(
      route,
      403,
      "otp_expired",
      "Token has expired or is invalid",
    );
  });
  return bodies;
}

// POST /auth/v1/signup: the user comes back without a session, as Supabase
// answers while the address is unconfirmed.
async function mockSignup(page) {
  const seen = { redirectTo: null, body: null };
  await page.route("**/auth/v1/signup**", (route) => {
    seen.redirectTo = new URL(route.request().url()).searchParams.get(
      "redirect_to",
    );
    seen.body = route.request().postDataJSON();
    return json(route, 200, {
      ...USER,
      email_confirmed_at: null,
      confirmation_sent_at: "2026-09-25T00:00:00Z",
    });
  });
  return seen;
}

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
const codeField = (dialog) =>
  dialog.getByLabel("Code from your email", { exact: true });
const tabNamed = (dialog, name) =>
  dialog.getByRole("tab", { name, exact: true });
// Disabled while the 60 second cooldown runs; the count is a moving target.
const resendCooldown = (dialog) =>
  dialog.getByRole("button", { name: /^resend code in \d+s$/i });

// Create-account tab -> email + password -> the emailed-code screen.
async function signUpToCodeScreen(dialog) {
  await tabNamed(dialog, "Create account").click();
  await emailField(dialog).fill(USER.email);
  await passwordField(dialog).fill("correct horse battery");
  await dialog.getByRole("button", { name: /^create account$/i }).click();
  await expect(
    dialog.getByRole("heading", { name: "Check your email" }),
  ).toBeVisible();
}

// Forgot password -> email -> the emailed-code screen (mocks /recover).
async function forgotToCodeScreen(page, dialog) {
  await page.route("**/auth/v1/recover**", (route) => json(route, 200, {}));
  await dialog.getByRole("button", { name: /forgot password/i }).click();
  await emailField(dialog).fill(USER.email);
  await dialog.getByRole("button", { name: /send reset code/i }).click();
  await expect(
    dialog.getByRole("heading", { name: "Check your email" }),
  ).toBeVisible();
}

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

    await tabNamed(dialog, "Create account").click();
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

  test("tabs switch between Sign in and Create account", async ({ page }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await expect(
      dialog.getByRole("tablist", { name: "Account" }),
    ).toBeVisible();
    const signInTab = tabNamed(dialog, "Sign in");
    const createTab = tabNamed(dialog, "Create account");
    const panel = dialog.getByRole("tabpanel");

    await expect(signInTab).toHaveAttribute("aria-selected", "true");
    await expect(createTab).toHaveAttribute("aria-selected", "false");
    await expect(panel).toHaveAttribute("id", "auth-panel");
    await expect(panel).toContainText("Forgot password?");

    await createTab.click();
    await expect(createTab).toHaveAttribute("aria-selected", "true");
    await expect(signInTab).toHaveAttribute("aria-selected", "false");
    await expect(
      dialog.getByRole("heading", { name: "Create account" }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("tabpanel", { name: "Create account" }),
    ).toBeVisible();
    await expect(panel).not.toContainText("Forgot password?");
    await expect(
      panel.getByRole("button", { name: /^create account$/i }),
    ).toBeVisible();

    await signInTab.click();
    await expect(signInTab).toHaveAttribute("aria-selected", "true");
    await expect(
      dialog.getByRole("heading", { name: "Sign in" }),
    ).toBeVisible();
    await expect(
      panel.getByRole("button", { name: /^sign in$/i }),
    ).toBeVisible();
  });

  test("arrow keys, Home and End move between the tabs", async ({ page }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    const signInTab = tabNamed(dialog, "Sign in");
    const createTab = tabNamed(dialog, "Create account");
    // locator.press() focuses the tab first; a click would not focus a button
    // in WebKit.
    const expectActive = async (active, other) => {
      await expect(active).toHaveAttribute("aria-selected", "true");
      await expect(active).toBeFocused();
      await expect(other).toHaveAttribute("aria-selected", "false");
    };

    await signInTab.press("ArrowRight");
    await expectActive(createTab, signInTab);
    await createTab.press("ArrowLeft");
    await expectActive(signInTab, createTab);
    await signInTab.press("End");
    await expectActive(createTab, signInTab);
    await createTab.press("Home");
    await expectActive(signInTab, createTab);
    // Arrows wrap around the two tabs.
    await signInTab.press("ArrowLeft");
    await expectActive(createTab, signInTab);
    await createTab.press("ArrowRight");
    await expectActive(signInTab, createTab);
  });

  test("the old bottom links and the sign-in-link option are gone", async ({
    page,
  }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    const gone = [
      dialog.getByRole("button", { name: /create an account/i }),
      dialog.getByRole("button", { name: /already have an account/i }),
      dialog.getByRole("button", { name: /sign-in link/i }),
      dialog.getByText(/new to casedive/i),
    ];
    for (const locator of gone) await expect(locator).toHaveCount(0);

    await tabNamed(dialog, "Create account").click();
    for (const locator of gone) await expect(locator).toHaveCount(0);
  });

  test("forgot password hides the tabs and Back to sign in restores them", async ({
    page,
  }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await dialog.getByRole("button", { name: /forgot password/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Reset password" }),
    ).toBeVisible();
    await expect(dialog.getByRole("tablist")).toHaveCount(0);
    await expect(dialog.locator("input#auth-password")).toHaveCount(0);

    await dialog.getByRole("button", { name: /back to sign in/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Sign in" }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("tablist", { name: "Account" }),
    ).toBeVisible();
    await expect(tabNamed(dialog, "Sign in")).toHaveAttribute(
      "aria-selected",
      "true",
    );
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

  test("unconfirmed account is offered a new code, which finishes the sign-in", async ({
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
    const verifyBodies = await mockVerify(page, "signup");
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await emailField(dialog).fill(USER.email);
    await passwordField(dialog).fill("correct horse battery");
    await dialog.getByRole("button", { name: /^sign in$/i }).click();
    await expect(dialog.getByRole("alert")).toContainText(
      "You haven't confirmed your email yet. Check your inbox, or we can send a new code.",
    );

    await dialog.getByRole("button", { name: /send a new code/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Check your email" }),
    ).toBeVisible();
    expect(resendBody).toMatchObject({ type: "signup", email: USER.email });
    await expect(dialog.getByRole("status")).toContainText(
      `We sent a code to ${USER.email}`,
    );
    await expect(resendCooldown(dialog)).toBeDisabled();

    // It is the same signup code screen, so the code finishes the sign-in.
    await codeField(dialog).fill(CODE);
    await dialog.getByRole("button", { name: "Verify and sign in" }).click();
    await expect(dialog).toBeHidden();
    expect(verifyBodies).toHaveLength(1);
    expect(verifyBodies[0]).toMatchObject({
      email: USER.email,
      token: CODE,
      type: "signup",
    });
  });

  test("sign-up ends on the code screen with the resend button cooling down", async ({
    page,
  }) => {
    const signup = await mockSignup(page);
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await signUpToCodeScreen(dialog);

    expect(signup.body).toMatchObject({
      email: USER.email,
      password: "correct horse battery",
    });
    // During the rollout the email carries a link as well as the code; the
    // link returns to the site the user signed up on.
    expect(signup.redirectTo).toBe(new URL(page.url()).origin);

    // The tabs and the password form are gone; the code field has focus.
    await expect(dialog.getByRole("tablist")).toHaveCount(0);
    await expect(passwordField(dialog)).toHaveCount(0);
    await expect(dialog.getByRole("status")).toContainText(
      `We sent a code to ${USER.email}`,
    );
    const code = codeField(dialog);
    await expect(code).toBeFocused();
    await expect(code).toHaveAttribute("autocomplete", "one-time-code");
    await expect(code).toHaveAttribute("inputmode", "numeric");
    await expect(
      dialog.getByRole("button", { name: "Verify and sign in" }),
    ).toBeVisible();

    // Resend starts disabled: Supabase refuses a second email within 60s.
    await expect(resendCooldown(dialog)).toBeDisabled();
  });

  test("a correct sign-up code signs the user in", async ({ page }) => {
    await mockSignup(page);
    const verifyBodies = await mockVerify(page, "signup");
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await signUpToCodeScreen(dialog);
    await codeField(dialog).fill(CODE);
    await dialog.getByRole("button", { name: "Verify and sign in" }).click();

    await expect(dialog).toBeHidden();
    expect(verifyBodies).toHaveLength(1);
    expect(verifyBodies[0]).toMatchObject({
      email: USER.email,
      token: CODE,
      type: "signup",
    });
    // On phones the account (email + Sign out) lives in the Menu.
    await openNavMenuIfCollapsed(page);
    await expect(page.getByRole("button", { name: /sign out/i })).toBeVisible();
    await expect(page.getByText(USER.email)).toBeVisible();
  });

  test("a wrong code shows the error and keeps the code screen open", async ({
    page,
  }) => {
    await mockSignup(page);
    const verifyBodies = await mockVerify(page, "signup");
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await signUpToCodeScreen(dialog);
    const code = codeField(dialog);
    const verify = dialog.getByRole("button", { name: "Verify and sign in" });

    // Too short: caught in the browser, nothing is sent.
    await code.fill("12");
    await verify.click();
    await expect(dialog.getByRole("alert")).toContainText(
      "Enter the code from your email.",
    );
    expect(verifyBodies).toHaveLength(0);

    // Anything but digits is dropped as you type.
    await code.fill("12 34-57");
    await expect(code).toHaveValue("123457");

    // Well-formed but wrong: Supabase answers 403 otp_expired.
    await verify.click();
    await expect(dialog.getByRole("alert")).toContainText(
      "That code is wrong or has expired. Check it, or send a new one.",
    );
    expect(verifyBodies).toHaveLength(1);
    expect(verifyBodies[0]).toMatchObject({ token: "123457", type: "signup" });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Check your email" }),
    ).toBeVisible();
    await expect(code).toBeVisible();

    // The right code works from the same screen.
    await code.fill(CODE);
    await verify.click();
    await expect(dialog).toBeHidden();
    expect(verifyBodies).toHaveLength(2);
  });

  test("the code screen links lead back to the form", async ({ page }) => {
    await mockSignup(page);
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await signUpToCodeScreen(dialog);
    await dialog
      .getByRole("button", { name: /use a different email/i })
      .click();
    await expect(
      dialog.getByRole("heading", { name: "Create account" }),
    ).toBeVisible();
    await expect(tabNamed(dialog, "Create account")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(emailField(dialog)).toHaveValue(USER.email);
    await expect(passwordField(dialog)).toHaveValue("");

    await passwordField(dialog).fill("correct horse battery");
    await dialog.getByRole("button", { name: /^create account$/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Check your email" }),
    ).toBeVisible();
    await dialog
      .getByRole("button", { name: /already have an account\? sign in/i })
      .click();
    await expect(
      dialog.getByRole("heading", { name: "Sign in" }),
    ).toBeVisible();
    await expect(tabNamed(dialog, "Sign in")).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("forgot password: a code, then a new password, and the user stays signed in", async ({
    page,
  }) => {
    let recoverBody = null;
    await page.route("**/auth/v1/recover**", (route) => {
      recoverBody = route.request().postDataJSON();
      return json(route, 200, {});
    });
    const verifyBodies = await mockVerify(page, "recovery");
    let updateBody = null;
    await page.route("**/auth/v1/user**", (route) => {
      if (route.request().method() === "PUT") {
        updateBody = route.request().postDataJSON();
      }
      return json(route, 200, USER);
    });
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await dialog.getByRole("button", { name: /forgot password/i }).click();
    await emailField(dialog).fill(USER.email);
    await dialog.getByRole("button", { name: /send reset code/i }).click();

    // Reset code screen: neutral wording, since the address may not exist.
    await expect(
      dialog.getByRole("heading", { name: "Check your email" }),
    ).toBeVisible();
    expect(recoverBody).toMatchObject({ email: USER.email });
    await expect(dialog.getByRole("status")).toContainText(
      `If there's an account for ${USER.email}, we sent it a code.`,
    );
    await expect(resendCooldown(dialog)).toBeDisabled();
    await expect(
      dialog.getByRole("button", { name: /use a different email/i }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("button", { name: /^back to sign in$/i }),
    ).toBeVisible();

    await codeField(dialog).fill(CODE);
    await dialog.getByRole("button", { name: /^verify code$/i }).click();

    // Verifying signs the user in, but the modal moves on instead of closing.
    await expect(
      dialog.getByRole("heading", { name: "Set new password" }),
    ).toBeVisible();
    await expect(
      dialog.getByText(
        "Choose a new password for your account.",
      ),
    ).toBeVisible();
    await expect(dialog.getByRole("tablist")).toHaveCount(0);
    expect(verifyBodies).toHaveLength(1);
    expect(verifyBodies[0]).toMatchObject({
      email: USER.email,
      token: CODE,
      type: "recovery",
    });

    await passwordField(dialog).fill("a brand new passphrase");
    await dialog.getByRole("button", { name: /update password/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Password updated" }),
    ).toBeVisible();
    await expect(dialog.getByRole("status")).toContainText("Password updated");
    expect(updateBody).toMatchObject({ password: "a brand new passphrase" });

    await dialog.getByRole("button", { name: "Continue" }).click();
    await expect(dialog).toBeHidden();
    // The reset code already signed the user in.
    await openNavMenuIfCollapsed(page);
    await expect(page.getByRole("button", { name: /sign out/i })).toBeVisible();
    await expect(page.getByText(USER.email)).toBeVisible();
  });

  test("a wrong reset code is refused and Back to sign in leaves the flow", async ({
    page,
  }) => {
    const verifyBodies = await mockVerify(page, "recovery");
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await forgotToCodeScreen(page, dialog);
    await codeField(dialog).fill("654321");
    await dialog.getByRole("button", { name: /^verify code$/i }).click();

    await expect(dialog.getByRole("alert")).toContainText(
      "That code is wrong or has expired. Check it, or send a new one.",
    );
    expect(verifyBodies).toHaveLength(1);
    await expect(
      dialog.getByRole("heading", { name: "Check your email" }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: "Set new password" }),
    ).toHaveCount(0);

    await dialog.getByRole("button", { name: /^back to sign in$/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Sign in" }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("tablist", { name: "Account" }),
    ).toBeVisible();
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
