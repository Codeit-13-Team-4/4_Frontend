import { relative } from "path";

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => `"${relative(process.cwd(), f)}"`).join(" ")}`;

const config = {
  "*.{js,jsx,ts,tsx}": ["prettier --write", buildEslintCommand],
  "*.{css,md,json}": ["prettier --write"],
};

export default config;
