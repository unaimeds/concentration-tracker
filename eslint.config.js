import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
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
