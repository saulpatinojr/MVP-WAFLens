
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginImport from "eslint-plugin-import";

export default [
  {
    files: ["src/**/*.ts", "waflens-code/src/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: "tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "import": pluginImport,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "quotes": ["error", "double"],
      "@typescript-eslint/no-unused-vars": "warn",
      "import/no-duplicates": "warn",
      "indent": ["error", 2],
      "object-curly-spacing": ["error", "always"],
      "max-len": ["warn", { "code": 120 }],
      "comma-dangle": ["error", "always-multiline"],
      "semi": ["error", "always"],
      "require-jsdoc": "off",
    },
  },
  {
    ignores: ["waflens-code/src/dataconnect-generated/**"],
  },
];
