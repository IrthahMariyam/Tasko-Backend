import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Ignore folders
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "logs/**",
      "*.log",
    ],
  },

  {
    files: ["src/**/*.{ts,js}"],

    languageOptions: {
      globals: globals.node,

      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    rules: {
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);