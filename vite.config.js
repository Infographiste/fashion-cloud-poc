import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes the build work under any GitHub Pages sub-path
// (e.g. https://user.github.io/repo/) and also when opening dist/index.html directly.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
