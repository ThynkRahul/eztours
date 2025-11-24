const path = require("path");

const buildEslintCommand = filenames =>
  `pnpm next lint --fix --file ${filenames
    .map(f => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  // Run type-check on changes to TypeScript files
  "**/*.ts?(x)": () => "pnpm check-types",

  // Lint and format TypeScript and JavaScript files
  "**/*.(ts|tsx)": filenames => [
    `pnpm prettier --write ${filenames.join(" ")}`,
    buildEslintCommand(filenames),
  ],

  // Lint and format JavaScript files
  "**/*.(js|jsx)": filenames => [
    `pnpm prettier --write ${filenames.join(" ")}`,
    buildEslintCommand(filenames),
  ],

  // Format MarkDown and JSON files
  "**/*.(md|json)": filenames => `pnpm prettier --write ${filenames.join(" ")}`,
};
