import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
const isVercel = process.env.VERCEL === "1";
const apiTarget = process.env.VITE_API_PROXY_TARGET || "http://localhost:3000";

export default defineConfig(({ command }) => ({
  base: command === "serve" ? "/" : isVercel ? "/" : "/basketworks/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
