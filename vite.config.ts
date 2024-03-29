import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";


const repo : string | undefined= process.env["GITHUB_REPOSITORY"]?.split("/")[1]; // owner/repo


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  base: repo
});
