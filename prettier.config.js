/**
 * @type {import("prettier").Config}
 */
const config = {
    trailingComma: "none",
    tabWidth: 4,
    semi: false,
    arrowParens: "avoid",
    printWidth: 160,
    importOrder: ["^@^/(.*)$", "^@/(.*)$", "^[./]"],
    plugins: ["prettier-plugin-tailwindcss", "@trivago/prettier-plugin-sort-imports"]
}

export default config
