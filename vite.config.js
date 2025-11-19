import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ghPages from "vite-plugin-gh-pages";

const repoName = "Game-Jam-Site";

export default defineConfig({
  plugins: [react(), ghPages()],
  base: `/${repoName}/`,
});
