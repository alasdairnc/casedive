import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// axe-core's WCAG 2.1 A and AA rules, run in every browser project.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

const MOCK_ANALYZE_RESPONSE = {
  summary:
    "A person entered a residential property at night without permission and stole jewelry.",
  criminal_code: [
    {
      citation: "s. 348(1)(b)",
      summary:
        "Breaking and entering a place with intent to commit an indictable offence.",
      matched_section:
        "Entering a dwelling-house at night and committing theft inside.",
    },
  ],
  case_law: [
    {
      citation: "R v Briscoe, 2010 SCC 13",
      title: "R v Briscoe",
      court: "SCC",
      year: "2010",
      summary:
        "Wilful blindness can substitute for knowledge as a fault element.",
      url_canlii:
        "https://www.canlii.org/en/ca/scc/doc/2010/2010scc13/2010scc13.html",
    },
  ],
  civil_law: [],
  charter: [],
  analysis: "This scenario involves a residential break and enter.",
  suggestions: [
    {
      type: "canlii",
      label: "residential break and enter",
      term: "residential break and enter",
    },
  ],
};

// Violations as short, readable records, so a failure names the rule and
// the elements instead of dumping axe's whole result.
async function violations(page, include) {
  const builder = new AxeBuilder({ page }).withTags(WCAG_TAGS);
  if (include) builder.include(include);
  const results = await builder.analyze();
  return results.violations.map((v) => ({
    rule: v.id,
    impact: v.impact,
    help: v.help,
    targets: v.nodes.map((n) => n.target.join(" ")),
  }));
}

const json = (body) => ({
  status: 200,
  contentType: "application/json",
  body: JSON.stringify(body),
});

test.describe("Accessibility (axe, WCAG 2.1 A/AA)", () => {
  // Content fades in from opacity 0; axe would measure contrast mid-fade.
  // The app honours reduced motion, which makes the fade instant.
  test.use({ reducedMotion: "reduce" });

  test("landing page has no violations", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("scenario-input")).toBeVisible();

    expect(await violations(page)).toEqual([]);
  });

  test("results page has no violations", async ({ page }) => {
    await page.route("/api/analyze", (route) =>
      route.fulfill(json(MOCK_ANALYZE_RESPONSE)),
    );
    await page.route("/api/verify", (route) => route.fulfill(json({})));

    await page.goto("/");
    await page
      .getByTestId("scenario-input")
      .fill("A person broke into a house at night and stole jewelry");
    await page.getByTestId("research-submit").click();
    await expect(page.getByTestId("results-section")).toBeVisible({
      timeout: 10000,
    });

    expect(await violations(page)).toEqual([]);
  });

  test("sign-in modal has no violations", async ({ page }) => {
    await page.goto("/");
    const signIn = page.getByRole("button", { name: /^sign in$/i });
    // The header hides Sign In until the stored session has been read.
    await signIn
      .first()
      .waitFor({ timeout: 5000 })
      .catch(() => {});
    test.skip(
      (await signIn.count()) === 0,
      "Auth is off: the dev server needs VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY",
    );

    await signIn.first().click();
    await expect(page.getByRole("dialog")).toBeVisible();

    expect(await violations(page, '[role="dialog"]')).toEqual([]);
  });
});
