import { test, expect } from "@playwright/test";

const MOCK_ANALYZE_RESPONSE = {
  summary: "A person entered a residential property at night without permission and stole jewelry.",
  criminal_code: [
    {
      citation: "s. 348(1)(b)",
      title: "Breaking and Entering",
      summary: "Breaking and entering a place with intent to commit an indictable offence.",
    },
    {
      citation: "s. 334(b)",
      title: "Theft Under $5,000",
      summary: "Theft of property valued under $5,000.",
    },
  ],
  case_law: [
    {
      citation: "R v Dorfer, 2014 BCCA 449",
      title: "R v Dorfer",
      description: "Sentencing principles for residential break and enter.",
    },
  ],
  civil_law: [],
  charter: [],
  analysis: "This scenario involves a classic residential break and enter with theft.",
  searchTerms: ["residential break and enter", "theft under 5000"],
};

const MOCK_VERIFY_RESPONSE = {
  "R v Dorfer, 2014 BCCA 449": {
    status: "verified",
    url: "https://www.canlii.org/en/bc/bcca/doc/2014/2014bcca449/2014bcca449.html",
    searchUrl: "https://www.canlii.org/en/#search/text=R+v+Dorfer+2014+BCCA+449",
    title: "R v Dorfer",
  },
};

test.describe("Search flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("/api/analyze", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_ANALYZE_RESPONSE),
      });
    });
    await page.route("/api/verify", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_VERIFY_RESPONSE),
      });
    });
    await page.goto("/");
  });

  test("submits scenario and shows results", async ({ page }) => {
    await page.locator("textarea").fill("A person broke into a house at night and stole jewelry");
    await page.locator("button").filter({ hasText: /research/i }).click();

    await expect(page.getByText("Scenario Summary", { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("A person entered a residential property")).toBeVisible();
  });

  test("shows criminal code section", async ({ page }) => {
    await page.locator("textarea").fill("A person broke into a house at night and stole jewelry");
    await page.locator("button").filter({ hasText: /research/i }).click();

    await expect(page.getByText("Scenario Summary", { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/s\. 348/)).toBeVisible();
    await expect(page.getByText(/Breaking and entering/)).toBeVisible();
  });

  test("shows case law section with verified citation", async ({ page }) => {
    await page.locator("textarea").fill("A person broke into a house at night and stole jewelry");
    await page.locator("button").filter({ hasText: /research/i }).click();

    await expect(page.getByText("Scenario Summary", { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("R v Dorfer")).toBeVisible();
  });

  test("shows legal analysis", async ({ page }) => {
    await page.locator("textarea").fill("A person broke into a house at night and stole jewelry");
    await page.locator("button").filter({ hasText: /research/i }).click();

    await expect(page.getByText("Legal Analysis")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/break and enter/)).toBeVisible();
  });

  test("shows CanLII search terms", async ({ page }) => {
    await page.locator("textarea").fill("A person broke into a house at night and stole jewelry");
    await page.locator("button").filter({ hasText: /research/i }).click();

    await expect(page.getByText("Suggested CanLII Searches")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("residential break and enter")).toBeVisible();
  });

  test("Cmd+Enter submits the form", async ({ page }) => {
    await page.locator("textarea").fill("A person broke into a house at night and stole jewelry");
    await page.locator("textarea").press("Meta+Enter");

    await expect(page.getByText("Scenario Summary", { exact: true })).toBeVisible({ timeout: 10000 });
  });
});
