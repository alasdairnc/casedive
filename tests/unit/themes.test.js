import { describe, it, expect } from "vitest";
import { themes } from "../../src/lib/themes.js";

const REQUIRED_KEYS = [
  "bg", "bgAlt", "text", "textSecondary", "border", "accent",
  "cardBg", "inputBg", "buttonBg", "buttonText",
];

describe("themes", () => {
  it("exports both light and dark themes", () => {
    expect(themes).toHaveProperty("light");
    expect(themes).toHaveProperty("dark");
  });

  it("light theme has all required keys", () => {
    for (const key of REQUIRED_KEYS) {
      expect(themes.light).toHaveProperty(key);
    }
  });

  it("dark theme has all required keys", () => {
    for (const key of REQUIRED_KEYS) {
      expect(themes.dark).toHaveProperty(key);
    }
  });

  it("accent color is the same in both themes", () => {
    expect(themes.light.accent).toBe(themes.dark.accent);
  });

  it("light and dark bg colors are different", () => {
    expect(themes.light.bg).not.toBe(themes.dark.bg);
  });
});
