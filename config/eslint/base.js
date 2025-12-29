import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
//js + ts 에 대한 기본 eslint rule
export default tseslint.config(
  {
    ignores: ["node_modules", "**/dist/**", "**/storybook-static/**", "**/.turbo/**"],
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      eslintConfigPrettier,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: {
        projectService: true,
      },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "function",
          modifiers: ["exported"],
          format: ["camelCase", "PascalCase"],
        },
        {
          selector: "variable",
          modifiers: ["const"],
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
        },
        {
          selector: "variable",
          types: ["boolean"],
          format: ["PascalCase"],
          prefix: ["is", "has"],
        },
        {
          selector: "typeAlias",
          format: ["PascalCase"],
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
);
