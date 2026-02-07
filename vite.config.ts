import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const isVercel = process.env.VERCEL === "1";

export default defineConfig({
  base: isVercel ? "/" : "/basketworks/",
  plugins: [react()],
})
