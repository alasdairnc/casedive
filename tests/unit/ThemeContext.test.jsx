// @vitest-environment happy-dom
import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { ThemeProvider, useTheme } from "../../src/lib/ThemeContext.jsx";
import { themes } from "../../src/lib/themes.js";

const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>;

describe("ThemeContext", () => {
  it("useTheme returns the dark theme (the only theme)", () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current).toEqual(themes.dark);
  });

  it("useTheme throws when called outside ThemeProvider", () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      "useTheme must be used within ThemeProvider",
    );
  });
});
