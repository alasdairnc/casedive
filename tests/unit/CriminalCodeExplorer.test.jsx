// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { PropertySymbol } from "happy-dom";
import CriminalCodeExplorer from "../../src/components/CriminalCodeExplorer.jsx";
import { ThemeProvider } from "../../src/lib/ThemeContext.jsx";
import { STATUTES } from "../../src/lib/statutes.js";

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
  topic: "theft",
  groupLabel: "Breaking and Entering",
};

// Has a url but nothing to expand
const PLAIN = {
  num: "348.1",
  title: "Aggravating circumstance — home invasion",
  severity: "",
  maxPenalty: "",
  url: `${JUSTICE_LAWS_BASE}/section-348.1.html`,
  partOf: "Part IX — Offences Against Rights of Property",
  topic: "theft",
  groupLabel: "Breaking and Entering",
};

// A second topic, so the browse view has more than one group to render
const HOMICIDE = {
  num: "229",
  title: "Murder",
  severity: "Indictable",
  maxPenalty: "Life imprisonment",
  url: `${JUSTICE_LAWS_BASE}/section-229.html`,
  partOf: "Part VIII — Offences Against the Person and Reputation",
  topic: "homicide",
  groupLabel: "Murder, Manslaughter and Infanticide",
};

// The hook is mocked; tests flip these to reach the browse view (no query,
// no filters) or the flat search list (a query).
const hookState = vi.hoisted(() => ({
  statuteId: "criminal-code",
  setStatuteId: () => {},
  query: "348",
  topicFilter: "all",
  setTopicFilter: () => {},
}));

// Skip the 390KB lazy import and the search debounce
vi.mock("../../src/hooks/useCriminalCodeSearch.js", () => ({
  useCriminalCodeSearch: () => ({
    statute: STATUTES[hookState.statuteId],
    setStatuteId: hookState.setStatuteId,
    parts: [],
    query: hookState.query,
    setQuery: () => {},
    severityFilter: "all",
    setSeverityFilter: () => {},
    partFilter: "all",
    setPartFilter: () => {},
    topicFilter: hookState.topicFilter,
    setTopicFilter: hookState.setTopicFilter,
    allSections: [HOMICIDE, ENRICHED, PLAIN],
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
  hookState.statuteId = "criminal-code";
  hookState.setStatuteId = () => {};
  hookState.query = "348";
  hookState.topicFilter = "all";
  hookState.setTopicFilter = () => {};
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

describe("CriminalCodeExplorer topic browse", () => {
  beforeEach(() => {
    hookState.query = "";
  });

  it("lists topics collapsed, with section counts, when nothing is searched", () => {
    renderExplorer();

    const theft = screen.getByRole("button", { name: /Theft, Robbery & Break and Enter/ });
    expect(theft.getAttribute("aria-expanded")).toBe("false");
    expect(theft.textContent).toContain("2 sections");
    expect(screen.getByRole("button", { name: /Homicide, Suicide/ }).textContent).toContain(
      "1 section",
    );
    // Topics with no sections in the loaded data are not listed
    expect(screen.queryByRole("button", { name: /Weapons & Firearms/ })).toBeNull();
    expect(screen.queryByText("s. 348")).toBeNull();
  });

  it("expanding a topic shows its Code headings and section rows", () => {
    renderExplorer();
    fireEvent.click(screen.getByRole("button", { name: /Theft, Robbery & Break and Enter/ }));

    expect(screen.getByText("Breaking and Entering")).toBeTruthy();
    expect(screen.getByText("s. 348")).toBeTruthy();
    expect(screen.getByText("s. 348.1")).toBeTruthy();
    expect(screen.queryByText("s. 229")).toBeNull();
  });

  it("choosing a topic filter opens only that topic", () => {
    hookState.topicFilter = "homicide";
    renderExplorer();

    expect(screen.getByText("s. 229")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Theft, Robbery/ })).toBeNull();
  });

  it("clicking the open topic while a topic filter is set clears the filter", () => {
    hookState.topicFilter = "homicide";
    hookState.setTopicFilter = vi.fn();
    renderExplorer();

    fireEvent.click(screen.getByRole("button", { name: /Homicide, Suicide/ }));
    expect(hookState.setTopicFilter).toHaveBeenCalledWith("all");
  });

  it("a search query switches to the flat list", () => {
    hookState.query = "348";
    renderExplorer();

    expect(screen.getByText("s. 348")).toBeTruthy();
    expect(screen.queryByRole("button", { name: /Theft, Robbery/ })).toBeNull();
  });
});

describe("CriminalCodeExplorer statute switcher", () => {
  it("offers all three Acts and marks the active one pressed", () => {
    renderExplorer();
    const group = screen.getByRole("group", { name: "Statute" });
    expect(group.querySelectorAll("button")).toHaveLength(3);
    expect(screen.getByRole("button", { name: "Criminal Code" }).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByRole("button", { name: "CDSA" }).getAttribute("aria-pressed")).toBe("false");
  });

  it("picking an Act asks the hook to switch", () => {
    hookState.setStatuteId = vi.fn();
    renderExplorer();
    fireEvent.click(screen.getByRole("button", { name: "YCJA" }));
    expect(hookState.setStatuteId).toHaveBeenCalledWith("ycja");
  });

  it("hides the severity filter for Acts without severity data", () => {
    renderExplorer();
    expect(screen.getByText("Severity")).toBeTruthy();
    cleanup();
    hookState.statuteId = "cdsa";
    renderExplorer();
    expect(screen.queryByText("Severity")).toBeNull();
    expect(screen.getByText("Controlled Drugs and Substances Act")).toBeTruthy();
  });
});
