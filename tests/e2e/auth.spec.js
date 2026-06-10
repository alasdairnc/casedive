import { test, expect } from "@playwright/test";

// AuthModal flows. The sign-in button only renders when VITE_SUPABASE_URL and
// VITE_SUPABASE_ANON_KEY are present in the dev server env, so each test
// skips gracefully against an auth-disabled build instead of failing.

async function openAuthModal(page) {
  await page.goto("/");
  const signIn = page.getByRole("button", { name: /sign in/i });
  if ((await signIn.count()) === 0) return null;
  await signIn.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  return dialog;
}

test.describe("AuthModal", () => {
  test("header Sign In opens the modal and Escape closes it", async ({
    page,
  }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await expect(
      dialog.getByRole("heading", { name: "Sign In" }),
    ).toBeVisible();
    await expect(dialog.getByLabel("Email")).toBeVisible();
    await expect(dialog.getByLabel("Password")).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
  });

  test("close button dismisses the modal", async ({ page }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await dialog.getByRole("button", { name: "Close" }).click();
    await expect(dialog).toBeHidden();
  });

  test("client-side validation rejects bad email and short password", async ({
    page,
  }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    const submit = dialog.getByRole("button", { name: /^sign in$/i });

    await dialog.getByLabel("Email").fill("not-an-email");
    await dialog.getByLabel("Password").fill("longenough");
    await submit.click();
    await expect(dialog.getByRole("alert")).toContainText(
      "valid email address",
    );

    await dialog.getByLabel("Email").fill("user@example.com");
    await dialog.getByLabel("Password").fill("short");
    await submit.click();
    await expect(dialog.getByRole("alert")).toContainText(
      "at least 8 characters",
    );
  });

  test("switches between signin, signup, and forgot-password modes", async ({
    page,
  }) => {
    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await dialog
      .getByRole("button", { name: /don't have an account/i })
      .click();
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
    await expect(dialog.getByLabel("Password")).toHaveCount(0);

    await dialog.getByRole("button", { name: /back to sign in/i }).click();
    await expect(
      dialog.getByRole("heading", { name: "Sign In" }),
    ).toBeVisible();
  });

  test("failed sign-in surfaces the Supabase error", async ({ page }) => {
    await page.route("**/auth/v1/token**", (route) =>
      route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          code: 400,
          error_code: "invalid_credentials",
          msg: "Invalid login credentials",
          error_description: "Invalid login credentials",
        }),
      }),
    );

    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await dialog.getByLabel("Email").fill("user@example.com");
    await dialog.getByLabel("Password").fill("wrongpassword");
    await dialog.getByRole("button", { name: /^sign in$/i }).click();

    await expect(dialog.getByRole("alert")).toContainText(
      /invalid login credentials/i,
    );
    await expect(dialog).toBeVisible();
  });

  test("forgot-password success shows the reset notice", async ({ page }) => {
    await page.route("**/auth/v1/recover**", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: "{}",
      }),
    );

    const dialog = await openAuthModal(page);
    test.skip(!dialog, "auth disabled in this environment");

    await dialog.getByRole("button", { name: /forgot password/i }).click();
    await dialog.getByLabel("Email").fill("user@example.com");
    await dialog.getByRole("button", { name: /send reset link/i }).click();

    await expect(dialog.getByRole("status")).toContainText(
      "Check your email for a password reset link.",
    );
  });
});
