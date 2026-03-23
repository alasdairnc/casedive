import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads and shows core UI elements", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("casedive");
    await expect(page.locator("text=LEGAL RESEARCH TOOL").first()).toBeVisible();
    await expect(page.locator("textarea")).toBeVisible();
    await expect(page.locator("button").filter({ hasText: /research/i })).toBeVisible();
  });

  test("shows character count", async ({ page }) => {
    await expect(page.locator("text=5,000").first()).toBeVisible();
  });

  test("filters panel toggles closed and open", async ({ page }) => {
    // Filters start open — click to close
    const filtersBtn = page.locator("button").filter({ hasText: /filters/i });
    await expect(page.locator("text=JURISDICTION").first()).toBeVisible();
    await filtersBtn.click();
    await expect(page.locator("text=JURISDICTION").first()).toBeHidden();
    // Click again to re-open
    await filtersBtn.click();
    await expect(page.locator("text=JURISDICTION").first()).toBeVisible();
  });

  test("dark/light mode toggle works", async ({ page }) => {
    const toggle = page.locator("button").filter({ hasText: /dark|light/i });
    const initialText = await toggle.textContent();
    await toggle.click();
    const newText = await toggle.textContent();
    expect(newText).not.toBe(initialText);
  });

  test("research button is disabled when scenario is empty", async ({ page }) => {
    const btn = page.locator("button").filter({ hasText: /research/i });
    await expect(btn).toBeDisabled();
  });

  test("shows disclaimer in footer", async ({ page }) => {
    await expect(page.locator("footer, [role=contentinfo]").filter({ hasText: /not legal advice/i })).toBeVisible();
  });
});
