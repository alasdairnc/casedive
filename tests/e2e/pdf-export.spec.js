import { test, expect } from "@playwright/test";
import { analyzeResponse } from "./helpers/analyzeFixture.js";

const MOCK_ANALYZE_RESPONSE = analyzeResponse({
  case_law: [
    {
      citation: "R v Dorfer, 2014 BCCA 449",
      title: "R v Dorfer",
      summary: "Sentencing principles for residential break and enter.",
    },
  ],
  analysis:
    "This scenario involves a classic residential break and enter with theft.",
  suggestions: [
    {
      type: "canlii",
      label: "residential break and enter",
      term: "residential break and enter",
    },
  ],
});

const MOCK_VERIFY_RESPONSE = {
  "R v Dorfer, 2014 BCCA 449": {
    status: "verified",
    url: "https://www.canlii.org/en/bc/bcca/doc/2014/2014bcca449/2014bcca449.html",
    searchUrl: "https://www.canlii.org/en/#search/text=R+v+Dorfer",
    title: "R v Dorfer",
  },
};

test.describe("PDF Export", () => {
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

  async function runSearch(page) {
    await page
      .locator('[data-testid="scenario-input"]')
      .fill("A person broke into a house at night and stole jewelry");
    await page.locator('[data-testid="research-submit"]').click();
    await expect(page.locator('[data-testid="results-section"]')).toBeVisible({
      timeout: 10000,
    });
  }

  test("Export PDF button is visible after search results load", async ({
    page,
  }) => {
    await runSearch(page);
    await expect(page.locator('[data-testid="export-pdf-btn"]')).toBeVisible();
  });

  test("clicking Export PDF fires request to /api/export-pdf", async ({
    page,
  }) => {
    let pdfRequested = false;
    let pdfPayload;
    await page.route("/api/export-pdf", async (route) => {
      pdfRequested = true;
      pdfPayload = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: "application/pdf",
        body: Buffer.from("%PDF-1.4 minimal"),
      });
    });

    await runSearch(page);
    await page.locator('[data-testid="export-pdf-btn"]').click();

    // Wait briefly for the request to fire
    await page.waitForTimeout(500);
    expect(pdfRequested).toBe(true);
    const { summary, criminal_code, case_law, civil_law, charter, analysis } =
      MOCK_ANALYZE_RESPONSE;
    expect(pdfPayload).toEqual({
      scenario: "A person broke into a house at night and stole jewelry",
      summary,
      criminal_code,
      case_law,
      civil_law,
      charter,
      analysis,
      verifications: MOCK_VERIFY_RESPONSE,
    });
  });

  test("no error message shown after successful PDF export", async ({
    page,
  }) => {
    await page.route("/api/export-pdf", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/pdf",
        body: Buffer.from("%PDF-1.4 minimal"),
      });
    });

    await runSearch(page);
    await page.locator('[data-testid="export-pdf-btn"]').click();
    await page.waitForTimeout(500);

    // No error message should be visible
    await expect(
      page.locator("text=/pdf error|export failed/i"),
    ).not.toBeVisible();
  });

  test("shows export failed state when PDF export request errors", async ({
    page,
  }) => {
    await page.route("/api/export-pdf", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: "Export failed" }),
      });
    });

    await runSearch(page);
    await page.locator('[data-testid="export-pdf-btn"]').click();

    await expect(page.locator('[data-testid="export-pdf-btn"]')).toHaveText(
      "Export failed",
    );
  });
});
