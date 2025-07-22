// .eslintrc.js
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "react", "react-hooks"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "next/core-web-vitals",
        "prettier",
    ],
    rules: {
        // Custom rules
        "react/react-in-jsx-scope": "off", // Next.js doesn't need React import
        "@typescript-eslint/no-unused-vars": ["warn"],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
