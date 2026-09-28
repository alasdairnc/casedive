import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    include: ["tests/unit/**/*.test.{js,jsx}"],
    environment: "node",
    setupFiles: ["./tests/unit/setup.js"],
    // `npm run test:coverage` runs unit + component tests with coverage.
    coverage: {
      provider: "v8",
      include: ["src/**/*.{js,jsx}", "api/**/*.js"],
      exclude: [
        // Legal reference data: object literals, not logic.
        "src/lib/criminalCodeData.js",
        "src/lib/civilLawData.js",
        "src/lib/charterData.js",
        "src/lib/landmarkCases.js",
        "src/lib/caselaw/**",
        "src/main.jsx",
      ],
      reporter: ["text-summary", "html"],
      // The measured numbers on 2026-09-27, rounded down. CI fails a change
      // that drops below them; raise them as coverage grows.
      thresholds: { statements: 64, branches: 56, functions: 66, lines: 67 },
    },
  },
});
