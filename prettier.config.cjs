/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  arrowParens: "always",
  printWidth: 100,
  semi: false,
  singleQuote: true,
  bracketSameLine: false,
  trailingComma: "all",
};

module.exports = config;
