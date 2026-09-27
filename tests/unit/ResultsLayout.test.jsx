// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import Results from "../../src/components/Results.jsx";
import { ThemeProvider } from "../../src/lib/ThemeContext.jsx";

import { installViewport } from "./helpers/viewport.js";

// Results reads WIDE_LAYOUT_QUERY through useMediaQuery.
let viewport;
function setViewportWidth(width) {
  viewport = installViewport(width);
}

const DATA = {
  summary:
    "An accused allegedly defrauded an elderly victim of $90,000 through a fake investment scheme.",
  criminal_code: [
    {
      citation: "s. 380(1)",
      title: "Fraud",
      summary:
        "Fraud — obtaining property by deceit, falsehood or other fraudulent means.",
    },
    {
      citation: "s. 380(1.1)",
      title: "Fraud — aggravating circumstances",
      summary: "Aggravating circumstances for sentencing fraud.",
    },
  ],
  case_law: [
    {
      citation: "R v Theroux, 1993 CanLII 134 (SCC)",
      title: "R v Theroux",
      summary: "Sets out the actus reus and mens rea of fraud.",
      court: "SCC",
      year: "1993",
    },
  ],
  civil_law: [],
  charter: [],
  analysis: "The facts support a charge of fraud over $5,000.",
  suggestions: [
    { type: "canlii", label: "fraud over 5000", term: "fraud over 5000" },
  ],
};

function renderResults(data = DATA) {
  return render(
    <ThemeProvider>
      <Results
        data={data}
        scenario="An accused defrauded an elderly victim."
        scenarioSnippet="An accused defrauded an elderly victim."
        filters={{}}
        addBookmark={vi.fn()}
        removeBookmark={vi.fn()}
        isBookmarked={() => false}
      />
    </ThemeProvider>,
  );
}

// Playwright's exact getByText compares an element's whole normalised text,
// so the e2e specs break if anything besides the heading reads exactly
// "Criminal Code" inside the results section.
function elementsWithExactText(root, text) {
  return Array.from(root.querySelectorAll("*")).filter(
    (el) => el.textContent.replace(/\s+/g, " ").trim() === text,
  );
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => ({ ok: true, json: async () => ({}) })),
  );
});

afterEach(() => {
  viewport?.restore();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Results desktop layout", () => {
  beforeEach(() => setViewportWidth(1280));

  it("puts jump links, Export PDF, analysis and links in the sidebar", () => {
    renderResults();

    const sidebar = screen.getByRole("complementary", {
      name: "Results overview",
    });
    const nav = within(sidebar).getByRole("navigation", {
      name: "On this page",
    });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual([
      "Criminal Code2",
      "Case Law1",
    ]);
    expect(links[0].getAttribute("href")).toBe("#cd-section-criminal_code");

    expect(within(sidebar).getByTestId("export-pdf-btn")).toBeTruthy();
    expect(screen.getAllByTestId("export-pdf-btn")).toHaveLength(1);
    expect(
      within(sidebar).getByRole("heading", { name: "Legal Analysis" }),
    ).toBeTruthy();
    expect(
      within(sidebar).getByRole("heading", { name: "Suggested Links" }),
    ).toBeTruthy();

    // Summary and cards stay in the main column
    const summaryHeading = screen.getByRole("heading", {
      name: "Scenario Summary",
    });
    expect(sidebar.contains(summaryHeading)).toBe(false);
    expect(sidebar.contains(screen.getByText("s. 380(1)"))).toBe(false);
  });

  it("keeps each section label unique for exact text matches", () => {
    renderResults();
    const section = screen.getByTestId("results-section");

    for (const label of ["Criminal Code", "Case Law"]) {
      const matches = elementsWithExactText(section, label);
      expect(matches).toHaveLength(1);
      expect(matches[0].tagName).toBe("H2");
    }
  });

  it("jump link scrolls to its section and focuses the heading without changing the URL", () => {
    const scrolled = [];
    const originalScrollIntoView = Element.prototype.scrollIntoView;
    Element.prototype.scrollIntoView = function scrollIntoView() {
      scrolled.push(this.id);
    };
    const hashBefore = window.location.hash;

    try {
      renderResults();
      fireEvent.click(screen.getByRole("link", { name: /^Case Law/ }));

      expect(scrolled).toEqual(["cd-section-case_law"]);
      expect(document.activeElement).toBe(
        screen.getByRole("heading", { name: "Case Law" }),
      );
      expect(window.location.hash).toBe(hashBefore);
    } finally {
      Element.prototype.scrollIntoView = originalScrollIntoView;
    }
  });

  it("links the case-law empty state when no case law came back", () => {
    renderResults({
      ...DATA,
      case_law: [],
      meta: { case_law: { source: "retrieval", reason: "no_match" } },
    });

    const nav = screen.getByRole("navigation", { name: "On this page" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((a) => a.textContent)).toEqual([
      "Criminal Code2",
      "Case Law0",
    ]);
    expect(document.getElementById("cd-section-case_law")).toBeTruthy();
  });
});

describe("Results across the breakpoint", () => {
  beforeEach(() => setViewportWidth(1280));

  it("keeps a half-written case-law report when the window resizes", () => {
    renderResults();
    fireEvent.click(screen.getByTestId("report-case-law-open"));
    fireEvent.change(screen.getByTestId("report-case-law-note"), {
      target: { value: "Wrong offence entirely" },
    });
    const panel = screen.getByTestId("report-case-law-panel");

    viewport.resize(390);
    expect(screen.queryByRole("complementary")).toBeNull();
    // Same DOM node: the card was not remounted
    expect(screen.getByTestId("report-case-law-panel")).toBe(panel);
    expect(screen.getByTestId("report-case-law-note").value).toBe(
      "Wrong offence entirely",
    );

    viewport.resize(1280);
    expect(
      screen.getByRole("complementary", { name: "Results overview" }),
    ).toBeTruthy();
    expect(screen.getByTestId("report-case-law-panel")).toBe(panel);
  });
});

describe("Results phone layout", () => {
  beforeEach(() => setViewportWidth(390));

  it("renders one column with Export PDF beside the summary heading", () => {
    renderResults();

    expect(screen.queryByRole("complementary")).toBeNull();
    expect(screen.queryByRole("navigation", { name: "On this page" })).toBe(
      null,
    );

    const exportBtn = screen.getByTestId("export-pdf-btn");
    const summaryHeading = screen.getByRole("heading", {
      name: "Scenario Summary",
    });
    expect(exportBtn.closest("div").parentElement).toBe(
      summaryHeading.parentElement,
    );

    // Reading order: cards, then analysis, then links
    const caseLaw = screen.getByRole("heading", { name: "Case Law" });
    const analysis = screen.getByRole("heading", { name: "Legal Analysis" });
    const links = screen.getByRole("heading", { name: "Suggested Links" });
    expect(
      caseLaw.compareDocumentPosition(analysis) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      analysis.compareDocumentPosition(links) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
