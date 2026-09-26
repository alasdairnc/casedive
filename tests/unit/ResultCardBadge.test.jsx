// @vitest-environment happy-dom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { PropertySymbol } from "happy-dom";
import ResultCard from "../../src/components/ResultCard.jsx";
import { ThemeProvider } from "../../src/lib/ThemeContext.jsx";

const CANLII_URL =
  "https://www.canlii.org/en/ca/scc/doc/2024/2024scc1/2024scc1.html";

function renderCard() {
  const onCardClick = vi.fn();
  render(
    <ThemeProvider>
      <ResultCard
        item={{
          citation: "R v Example, 2024 SCC 1",
          title: "R v Example",
          summary: "Example summary.",
          court: "SCC",
          year: "2024",
        }}
        type="case_law"
        verification={{ status: "verified", url: CANLII_URL }}
        onCardClick={onCardClick}
      />
    </ThemeProvider>,
  );
  return { onCardClick };
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

describe("ResultCard verification badge", () => {
  it("opens CanLII without opening the case summary", () => {
    const { onCardClick } = renderCard();

    fireEvent.click(screen.getByRole("link", { name: /verified on canlii/i }));

    expect(openSpy).toHaveBeenCalledWith(
      CANLII_URL,
      "_blank",
      expect.any(String),
    );
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it("Enter on the badge does not open the case summary", () => {
    const { onCardClick } = renderCard();

    fireEvent.keyDown(
      screen.getByRole("link", { name: /verified on canlii/i }),
      { key: "Enter" },
    );

    expect(onCardClick).not.toHaveBeenCalled();
  });

  it("clicking the card body still opens the case summary", () => {
    const { onCardClick } = renderCard();

    fireEvent.click(screen.getByText("Example summary."));

    expect(onCardClick).toHaveBeenCalledTimes(1);
  });
});
