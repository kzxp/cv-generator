import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdx()],
  resolve: {
    alias: {
      // Fixing rollup unable to resolve react-router-dom
      "react-router-dom": path.resolve(__dirname, "./react-router-dom-compat"),
    },
  },
});
