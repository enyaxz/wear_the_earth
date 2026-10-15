import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: '../dist',       // put dist folder at project root
    emptyOutDir: true,       // clear old builds before creating new ones
  },
})
