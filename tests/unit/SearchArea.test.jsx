// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SearchArea from "../../src/components/SearchArea.jsx";
import { ThemeProvider } from "../../src/lib/ThemeContext.jsx";

describe("SearchArea privacy hint", () => {
  it("tells people to leave out identifying details and links the policy", () => {
    render(
      <ThemeProvider>
        <SearchArea
          query=""
          setQuery={vi.fn()}
          onSubmit={vi.fn()}
          loading={false}
        />
      </ThemeProvider>,
    );

    const input = screen.getByTestId("scenario-input");
    const hint = document.getElementById(
      input.getAttribute("aria-describedby"),
    );
    expect(hint.textContent).toMatch(/leave out names/i);

    const link = screen.getByRole("link", {
      name: "How we handle what you type",
    });
    expect(link.getAttribute("href")).toBe("/privacy.html");
    // A new tab, so following it doesn't throw away a half-written scenario.
    expect(link.getAttribute("target")).toBe("_blank");
  });
});
