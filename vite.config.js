import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  assetsInclude: ['**/*.avi'],
  resolve: {
    alias: {
      // '@': '/src',
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [react()],
})
