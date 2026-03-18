import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    projects: [
      {
        plugins: [tsconfigPaths()],
        test: {
          name: "unit",
          environment: "jsdom",
          globals: true,
          setupFiles: ["./tests/setup.ts"],
          include: [
            "**/__tests__/**/*.{test,spec}.{ts,tsx}",
            "**/*.{test,spec}.{ts,tsx}",
          ],
          exclude: ["**/node_modules/**", "**/*.stories.{ts,tsx}"],
        },
      },
    ],
  },
});
