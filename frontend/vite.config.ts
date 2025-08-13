import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    proxy: {
      // Proxy all requests starting with `/api` to your Spring Boot backend.
      // Example: `/api/film` → `http://localhost:8080/api/film`
      '/api': {
        target: 'http://localhost:8080',
      },

      // Proxy all requests starting with `/bilder` to your Spring Boot backend.
      // Example: `/bilder/film1.jpg` → `http://localhost:8080/bilder/surprise_film1.jpg`
      '/bilder': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },

    }
  }
})

