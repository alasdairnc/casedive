import { expect } from "@playwright/test";

// On desktop the search form collapses into a summary bar once results are
// showing. Call this before typing a new scenario after a search. No-op on
// phones and on the landing page, where the form is always open.
export async function expandSearchIfCollapsed(page) {
  const bar = page.getByTestId("search-summary");
  if (!(await bar.isVisible())) return;
  await bar.getByRole("button", { name: "Edit search" }).click();
  await expect(page.getByTestId("scenario-input")).toBeVisible();
}
