// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PropertySymbol } from "happy-dom";
import CriminalCodeExplorer from "../../src/components/CriminalCodeExplorer.jsx";
import { ThemeProvider } from "../../src/lib/ThemeContext.jsx";

const JUSTICE_LAWS_BASE = "https://laws-lois.justice.gc.ca/eng/acts/c-46";

const ENRICHED = {
  num: "348",
  title:
    "Breaking and entering with intent, committing offence or breaking out",
  severity: "Hybrid",
  maxPenalty: "Life imprisonment (dwelling-house) / 10 years (other place)",
  url: `${JUSTICE_LAWS_BASE}/section-348.html`,
  definition: "Every one who breaks and enters a place with intent.",
  relatedSections: ["349", "350"],
  partOf: "Part IX — Offences Against Rights of Property",
};

// Has a url but nothing to expand
const PLAIN = {
  num: "348.1",
  title: "Aggravating circumstance — home invasion",
  severity: "",
  maxPenalty: "",
  url: `${JUSTICE_LAWS_BASE}/section-348.1.html`,
  partOf: "Part IX — Offences Against Rights of Property",
};

// Skip the 390KB lazy import and the search debounce
vi.mock("../../src/hooks/useCriminalCodeSearch.js", () => ({
  useCriminalCodeSearch: () => ({
    query: "",
    setQuery: () => {},
    severityFilter: "all",
    setSeverityFilter: () => {},
    partFilter: "all",
    setPartFilter: () => {},
    results: [ENRICHED, PLAIN],
    totalMatches: 2,
    totalSections: 2,
    isLoading: false,
  }),
}));

function renderExplorer() {
  const onClose = vi.fn();
  render(
    <ThemeProvider>
      <CriminalCodeExplorer onClose={onClose} />
    </ThemeProvider>,
  );
  return { onClose };
}

// The row is the div with the 14px padding (tests/e2e/ui-states.spec.js relies on it)
function rowFor(section) {
  return screen
    .getByText(`s. ${section.num}`)
    .closest("div[style*='padding: 14px']");
}

function enrichedRow() {
  return rowFor(ENRICHED);
}

let openSpy;

beforeEach(() => {
  // happy-dom's anchor click calls open() on its own window, not the global
  // copy vitest installs, so stub that one to keep the test off the network
  openSpy = vi
    .spyOn(document[PropertySymbol.window], "open")
    .mockReturnValue(null);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CriminalCodeExplorer section rows", () => {
  it("opening the Justice Laws link does not collapse the row", () => {
    renderExplorer();
    const row = enrichedRow();

    fireEvent.click(row);
    expect(screen.getByText("Definition", { exact: true })).toBeTruthy();

    const link = screen.getByRole("link", {
      name: /full text on justice laws/i,
    });
    fireEvent.click(link);

    expect(openSpy).toHaveBeenCalledWith(
      ENRICHED.url,
      "_blank",
      expect.any(String),
    );
    expect(screen.getByText("Definition", { exact: true })).toBeTruthy();
  });

  it("clicking text in the expanded body does not collapse the row", () => {
    renderExplorer();
    fireEvent.click(enrichedRow());
    fireEvent.click(screen.getByText("Max penalty"));

    expect(screen.getByText("Definition", { exact: true })).toBeTruthy();
  });

  it("Enter and Space toggle a focused row", () => {
    renderExplorer();
    const row = enrichedRow();

    expect(row.tabIndex).toBe(0);
    expect(row.getAttribute("aria-expanded")).toBe("false");

    row.focus();
    fireEvent.keyDown(row, { key: "Enter" });
    expect(row.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByText("Definition", { exact: true })).toBeTruthy();

    fireEvent.keyDown(row, { key: " " });
    expect(row.getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByText("Definition", { exact: true })).toBeNull();
  });

  it("Enter on the link does not toggle the row", () => {
    renderExplorer();
    const row = enrichedRow();

    fireEvent.keyDown(row, { key: "Enter" });
    fireEvent.keyDown(
      screen.getByRole("link", { name: /full text on justice laws/i }),
      { key: "Enter" },
    );

    expect(row.getAttribute("aria-expanded")).toBe("true");
  });

  it("Escape still closes the explorer from inside an expanded row", () => {
    const { onClose } = renderExplorer();
    fireEvent.keyDown(enrichedRow(), { key: "Enter" });

    fireEvent.keyDown(
      screen.getByRole("link", { name: /full text on justice laws/i }),
      { key: "Escape" },
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("rows with nothing to expand are not interactive", () => {
    renderExplorer();
    const row = rowFor(PLAIN);

    expect(row.style.cursor).toBe("default");
    expect(row.hasAttribute("tabindex")).toBe(false);
    expect(row.hasAttribute("aria-expanded")).toBe(false);
  });
});
