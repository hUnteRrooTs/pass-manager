import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindscss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindscss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
