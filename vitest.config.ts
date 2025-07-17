import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom",
    globals: true,
  },
});
