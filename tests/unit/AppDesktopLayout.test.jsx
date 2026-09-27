// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "../../src/App.jsx";
import { installViewport } from "./helpers/viewport.js";

let viewport;
function setViewportWidth(width) {
  viewport = installViewport(width);
}

const SCENARIO =
  "An accused allegedly defrauded an elderly victim of $90,000 through a fake investment scheme.";

const ANALYZE_RESPONSE = {
  summary: "Fraud over $5,000 against an elderly victim.",
  criminal_code: [
    {
      citation: "s. 380(1)",
      title: "Fraud",
      summary:
        "Fraud — obtaining property by deceit, falsehood or other fraudulent means.",
    },
  ],
  case_law: [],
  civil_law: [],
  charter: [],
  analysis: "The facts support a charge of fraud over $5,000.",
  suggestions: [],
};

// `gate`, when given, holds the /api/analyze response until it resolves.
function mockApi(gate) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url) => {
      if (gate && String(url).includes("/api/analyze")) await gate;
      return {
        ok: true,
        status: 200,
        headers: { get: () => null },
        json: async () =>
          String(url).includes("/api/analyze") ? ANALYZE_RESPONSE : {},
      };
    }),
  );
}

function setScrollY(value) {
  Object.defineProperty(window, "scrollY", { value, configurable: true });
}

async function runSearch() {
  fireEvent.change(screen.getByTestId("scenario-input"), {
    target: { value: SCENARIO },
  });
  fireEvent.click(screen.getByTestId("research-submit"));
  await screen.findByTestId("results-section");
}

beforeEach(() => {
  mockApi();
  window.scrollTo = () => {};
});

afterEach(() => {
  viewport?.restore();
  setScrollY(0);
  vi.unstubAllGlobals();
});

describe("App results view on desktop", () => {
  beforeEach(() => setViewportWidth(1280));

  it("collapses the search into a summary bar once results load", async () => {
    render(<App />);
    expect(screen.queryByTestId("search-summary")).toBeNull();

    await runSearch();

    const bar = await screen.findByTestId("search-summary");
    expect(bar.textContent).toContain(SCENARIO);
    expect(bar.textContent).toContain("All jurisdictions, courts and dates");

    // The form stays mounted (history re-runs still fill it) but is hidden
    const textarea = screen.getByTestId("scenario-input");
    expect(textarea.closest("#cd-search-form").hidden).toBe(true);
    expect(textarea.value).toBe(SCENARIO);

    expect(
      screen.getByRole("complementary", { name: "Results overview" }),
    ).toBeTruthy();
  });

  it("Edit search brings the form back and focuses the textarea", async () => {
    render(<App />);
    await runSearch();
    await screen.findByTestId("search-summary");

    fireEvent.click(screen.getByRole("button", { name: "Edit search" }));

    await waitFor(() =>
      expect(screen.queryByTestId("search-summary")).toBeNull(),
    );
    const textarea = screen.getByTestId("scenario-input");
    expect(textarea.closest("#cd-search-form").hidden).toBe(false);
    expect(document.activeElement).toBe(textarea);
    // Results stay on screen while the search is being edited
    expect(screen.getByTestId("results-section")).toBeTruthy();
  });

  it("describes non-default filters in the summary bar", async () => {
    render(<App />);
    fireEvent.change(screen.getByRole("combobox", { name: "Jurisdiction" }), {
      target: { value: "Ontario" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Case Law" }));

    await runSearch();

    const bar = await screen.findByTestId("search-summary");
    expect(bar.textContent).toContain("Ontario · Excludes Case Law");
  });
});

describe("App results view on desktop: scroll and focus", () => {
  beforeEach(() => setViewportWidth(1280));

  it("scrolls back to the top when results land further down", async () => {
    const scrollTo = vi.fn();
    window.scrollTo = scrollTo;
    setScrollY(400);

    render(<App />);
    await runSearch();

    await waitFor(() =>
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" }),
    );
  });

  it("hands focus to the results when the collapse hides the focused textarea", async () => {
    render(<App />);
    const textarea = screen.getByTestId("scenario-input");
    fireEvent.change(textarea, { target: { value: SCENARIO } });
    textarea.focus();
    fireEvent.keyDown(textarea, { key: "Enter", metaKey: true });

    await screen.findByTestId("search-summary");
    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByRole("heading", { name: "Scenario Summary" }),
      ),
    );
  });

  it("hands focus to the results after a Research click left it on <body>", async () => {
    render(<App />);
    fireEvent.change(screen.getByTestId("scenario-input"), {
      target: { value: SCENARIO },
    });
    // Chrome blurs the Research button when it disables during loading
    document.activeElement?.blur?.();
    expect(document.activeElement).toBe(document.body);
    fireEvent.click(screen.getByTestId("research-submit"));

    await screen.findByTestId("search-summary");
    await waitFor(() =>
      expect(document.activeElement).toBe(
        screen.getByRole("heading", { name: "Scenario Summary" }),
      ),
    );
  });

  it("leaves the form open when the user kept typing during the request", async () => {
    let release;
    mockApi(new Promise((resolve) => (release = resolve)));

    render(<App />);
    const textarea = screen.getByTestId("scenario-input");
    fireEvent.change(textarea, { target: { value: SCENARIO } });
    textarea.focus();
    fireEvent.keyDown(textarea, { key: "Enter", metaKey: true });
    fireEvent.change(textarea, { target: { value: "A new draft scenario" } });

    await act(async () => release());
    await screen.findByTestId("results-section");

    expect(screen.queryByTestId("search-summary")).toBeNull();
    expect(textarea.closest("#cd-search-form").hidden).toBe(false);
    expect(textarea.value).toBe("A new draft scenario");
    expect(document.activeElement).toBe(textarea);
  });
});

describe("App results view on phones", () => {
  beforeEach(() => setViewportWidth(390));

  it("keeps the search form open and the single-column results", async () => {
    render(<App />);
    await runSearch();

    expect(screen.queryByTestId("search-summary")).toBeNull();
    const textarea = screen.getByTestId("scenario-input");
    expect(textarea.closest("#cd-search-form").hidden).toBe(false);
    expect(screen.queryByRole("complementary")).toBeNull();
  });

  it("scrolls the results into view", async () => {
    const original = Element.prototype.scrollIntoView;
    const scrollIntoView = vi.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    try {
      render(<App />);
      await runSearch();
      await waitFor(() => expect(scrollIntoView).toHaveBeenCalled());
    } finally {
      Element.prototype.scrollIntoView = original;
    }
  });
});
