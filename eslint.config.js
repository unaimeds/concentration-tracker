import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
    {
        ignores: ["dist/", "node_modules/"],
    },
    {
        files: ["**/*.{ts,tsx}"],
        extends: [...tseslint.configs.recommended],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
        },
    },
);
