import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  proxy: {
    '/Production': {
      target: 'https://feeb6yrl7e.execute-api.ap-southeast-2.amazonaws.com',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/Production/, '/Production'),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})

