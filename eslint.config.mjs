import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Disable the base rule to avoid conflicts with TypeScript
      "no-unused-vars": "off",

      "@typescript-eslint/no-require-imports": "error",

      // Configure the TypeScript-specific rule
      "@typescript-eslint/no-unused-vars": [
        "off", // Change "off" to "warn" or "error" if you want to enable it
        {
          vars: "all", // Check all variables
          args: "none", // Ignore unused function arguments
          ignoreRestSiblings: true, // Ignore unused variables in object destructuring
        },
      ],
    },
  },
];

export default eslintConfig;
