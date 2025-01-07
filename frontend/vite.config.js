import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // proxy to the backend server
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:8000'
    }
  }
})
