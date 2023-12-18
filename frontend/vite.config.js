import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 80,
    proxy: {
      "/api": {
        target: "http://0.0.0.0:5000",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
