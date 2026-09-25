import { expect } from "@playwright/test";

// At phone widths the header nav (Criminal Code, Saved, History, Donate)
// lives behind a "Menu" toggle. Call this right before each header-nav
// interaction: clicking a menu item closes the menu again. No-op on desktop,
// and on builds that predate the menu (live smoke against an older deploy).
export async function openNavMenuIfCollapsed(page) {
  // The logo and the Menu toggle render in the same commit, so once the logo
  // is up, isVisible() below is not racing the first render.
  await page.getByAltText("CaseDive").first().waitFor();

  const menu = page.getByRole("button", { name: "Menu", exact: true });
  if (!(await menu.isVisible())) return;

  if ((await menu.getAttribute("aria-expanded")) !== "true") {
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
  }
}
