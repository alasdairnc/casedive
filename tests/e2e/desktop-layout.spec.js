import { test, expect } from "@playwright/test";
import { expandSearchIfCollapsed } from "./helpers/search.js";
import { analyzeResponse } from "./helpers/analyzeFixture.js";

// Matches WIDE_LAYOUT_QUERY in src/lib/ui.js
const WIDE_MIN_WIDTH = 1080;

const SCENARIO = "A person broke into a house at night and stole jewelry";

const MOCK_ANALYZE_RESPONSE = analyzeResponse({
  criminal_code: [
    {
      citation: "s. 348(1)(b)",
      title: "Breaking and Entering",
      summary:
        "Breaking and entering a place with intent to commit an indictable offence.",
    },
    {
      citation: "s. 349(1)",
      title: "Being Unlawfully in a Dwelling-house",
      summary:
        "Entering or being in a dwelling-house without lawful excuse with intent to commit an indictable offence.",
    },
    {
      citation: "s. 334(b)",
      title: "Theft Under $5,000",
      summary: "Theft of property valued under $5,000.",
    },
    {
      citation: "s. 354(1)",
      title: "Possession of Property Obtained by Crime",
      summary:
        "Possessing property knowing it was obtained by an indictable offence.",
    },
  ],
  case_law: [
    {
      citation: "R v Dorfer, 2014 BCCA 449",
      title: "R v Dorfer",
      summary: "Sentencing principles for residential break and enter.",
      court: "BCCA",
      year: "2014",
    },
  ],
  analysis:
    "This scenario involves a residential break and enter with theft of jewelry.",
  suggestions: [
    {
      type: "canlii",
      label: "residential break and enter",
      term: "residential break and enter",
    },
  ],
});

async function search(page, scenario = SCENARIO) {
  await page.getByTestId("scenario-input").fill(scenario);
  await page.getByTestId("research-submit").click();
  await expect(page.getByTestId("results-section")).toBeVisible({
    timeout: 10000,
  });
}

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
      body: JSON.stringify({}),
    });
  });
  await page.goto("/");
});

test.describe("Desktop results layout", () => {
  test.skip(
    ({ viewport }) => !viewport || viewport.width < WIDE_MIN_WIDTH,
    "two-column layout is desktop-only",
  );

  test("search collapses into a summary bar and Edit search reopens it", async ({
    page,
  }) => {
    await search(page);

    const bar = page.getByTestId("search-summary");
    await expect(bar).toBeVisible();
    await expect(bar).toContainText(SCENARIO);
    await expect(page.getByTestId("scenario-input")).toBeHidden();
    // Focus moves to the results instead of being lost with the hidden form
    await expect(
      page.getByRole("heading", { name: "Scenario Summary" }),
    ).toBeFocused();

    await bar.getByRole("button", { name: "Edit search" }).click();
    await expect(bar).toHaveCount(0);
    await expect(page.getByTestId("scenario-input")).toBeFocused();

    await search(page, "A second break-in scenario at a cottage");
    await expect(page.getByTestId("search-summary")).toContainText(
      "A second break-in scenario at a cottage",
    );
  });

  test("sidebar sits right of the cards and stays in view on scroll", async ({
    page,
  }) => {
    await search(page);

    const sidebar = page.getByRole("complementary", {
      name: "Results overview",
    });
    await expect(sidebar).toBeVisible();
    await expect(
      sidebar.getByRole("heading", { name: "Legal Analysis" }),
    ).toBeVisible();
    await expect(sidebar.getByTestId("export-pdf-btn")).toBeVisible();

    const summary = page.getByRole("heading", { name: "Scenario Summary" });
    const sidebarBox = await sidebar.boundingBox();
    const summaryBox = await summary.boundingBox();
    expect(sidebarBox.x).toBeGreaterThan(summaryBox.x + 400);

    // Scroll part-way down and check the sidebar has pinned 24px from the
    // top. Re-scrolls on every retry, not just once: App's own post-search
    // scrollTo(0) timer can otherwise land between an initial scroll and the
    // position check and reset the page before the assertion reads it.
    await expect
      .poll(async () => {
        await page.evaluate(() => window.scrollTo(0, 500));
        return Math.round((await sidebar.boundingBox()).y);
      })
      .toBe(24);
  });

  test("jump link scrolls to its section and focuses the heading", async ({
    page,
  }) => {
    await search(page);

    const nav = page.getByRole("navigation", { name: "On this page" });
    await nav.getByRole("link", { name: /^Case Law/ }).click();

    const heading = page
      .getByTestId("results-section")
      .getByRole("heading", { name: "Case Law", exact: true });
    await expect(heading).toBeInViewport();
    await expect(heading).toBeFocused();
    expect(new URL(page.url()).hash).toBe("");
  });

  test("history re-run keeps the collapsed bar through loading", async ({
    page,
  }) => {
    await search(page);
    await expandSearchIfCollapsed(page);
    await search(page, "A second break-in scenario at a cottage");

    // Hold the re-run's response so the loading state can be checked
    let release;
    const held = new Promise((resolve) => (release = resolve));
    await page.unroute("/api/analyze");
    await page.route("/api/analyze", async (route) => {
      await held;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_ANALYZE_RESPONSE),
      });
    });
    const rerunRequest = page.waitForRequest(
      (req) =>
        req.url().includes("/api/analyze") &&
        req.postDataJSON()?.scenario === SCENARIO,
    );

    await page.getByRole("button", { name: /history/i }).click();
    await page
      .getByText(SCENARIO, { exact: true })
      .locator("xpath=../..")
      .getByRole("button", { name: "Re-run" })
      .click();
    await rerunRequest;

    // Loading: still the wide view with the bar, not the full form
    await expect(page.getByText("Analyzing scenario...")).toBeVisible();
    await expect(page.getByTestId("search-summary")).toContainText(SCENARIO);
    await expect(page.getByTestId("scenario-input")).toBeHidden();
    await expect(page.getByTestId("scenario-input")).toHaveValue(SCENARIO);

    release();
    await expect(page.getByTestId("results-section")).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByTestId("search-summary")).toContainText(SCENARIO);
  });
});

test.describe("Phone results layout", () => {
  test.skip(
    ({ viewport }) => !!viewport && viewport.width >= WIDE_MIN_WIDTH,
    "phone layout only",
  );

  test("keeps the search form open and a single column", async ({ page }) => {
    await search(page);

    await expect(page.getByTestId("search-summary")).toHaveCount(0);
    await expect(page.getByTestId("scenario-input")).toBeVisible();
    await expect(page.getByRole("complementary")).toHaveCount(0);
    await expect(page.getByTestId("export-pdf-btn")).toBeVisible();
  });
});
