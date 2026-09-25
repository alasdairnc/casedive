// @vitest-environment happy-dom
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../../src/lib/ThemeContext.jsx";
import { themes } from "../../src/lib/themes.js";
import Button from "../../src/components/ui/Button.jsx";

function renderButton(ui) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

describe("Button", () => {
  it("renders a native button with type=button by default", () => {
    renderButton(<Button>Save</Button>);
    const btn = screen.getByRole("button", { name: "Save" });
    expect(btn.tagName).toBe("BUTTON");
    expect(btn.getAttribute("type")).toBe("button");
  });

  it("forwards data-testid, aria props, and the click event", () => {
    const onClick = vi.fn((e) => e.stopPropagation());
    renderButton(
      <Button data-testid="x-btn" aria-label="Do thing" onClick={onClick}>
        Go
      </Button>,
    );
    fireEvent.click(screen.getByTestId("x-btn"));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick.mock.calls[0][0]).toHaveProperty("stopPropagation");
    expect(screen.getByRole("button", { name: "Do thing" })).toBeDefined();
  });

  it("uses the teal fill for the primary variant", () => {
    renderButton(<Button variant="primary">Research</Button>);
    const btn = screen.getByRole("button", { name: "Research" });
    expect(btn.textContent).toBe("Research");
    expect(btn.getAttribute("style")).toMatch(
      /background: (#2dd4bf|rgb\(45, 212, 191\))/i,
    );
    expect(themes.dark.buttonBg).toBe("#2DD4BF");
  });

  it("marks toggles with aria-pressed", () => {
    renderButton(
      <>
        <Button variant="toggle" pressed>
          On
        </Button>
        <Button variant="toggle" pressed={false}>
          Off
        </Button>
      </>,
    );
    expect(
      screen.getByRole("button", { name: "On" }).getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen.getByRole("button", { name: "Off" }).getAttribute("aria-pressed"),
    ).toBe("false");
  });

  it("does not fire onClick when disabled", () => {
    const onClick = vi.fn();
    renderButton(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    );
    const btn = screen.getByRole("button", { name: "Nope" });
    expect(btn.disabled).toBe(true);
    fireEvent.click(btn);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders an anchor when href is set", () => {
    renderButton(
      <Button href="https://example.com" target="_blank" rel="noreferrer">
        Donate
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Donate" });
    expect(link.getAttribute("href")).toBe("https://example.com");
    expect(link.getAttribute("type")).toBeNull();
  });
});
