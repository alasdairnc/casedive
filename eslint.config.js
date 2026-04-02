import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

const sharedGlobals = {
  ...globals.browser,
  ...globals.node,
  ...globals.es2021,
};

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "node_modules_old/**",
      "playwright-report/**",
      "playwright-report-live/**",
      "test-results/**",
      "tmp/**",
      "hooks/**",
      "public/**",
      ".vercel/**",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: sharedGlobals,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "no-undef": "error",
    },
  },
  prettier,
];
