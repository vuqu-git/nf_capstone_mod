import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [svgr(), react()],
//   server: {
//     proxy: {
//       // Proxy all requests starting with `/api` to your Spring Boot backend.
//       // Example: `/api/film` → `http://localhost:8080/api/film`
//       '/api': {
//         target: 'http://localhost:8080',
//       },
//
//       // Proxy all requests starting with `/bilder` to your Spring Boot backend.
//       // Example: `/bilder/film1.jpg` → `http://localhost:8080/bilder/surprise_film1.jpg`
//       '/bilder': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//       },
//
//     }
//   }
// })

export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    proxy: {
      // Proxy all requests starting with `/api` to your Spring Boot backend.
      // Example: `/api/film` → `http://localhost:8080/api/film`
      '/api': {
        target: 'http://localhost:8080',
      },

      // Proxy all requests starting with `/static-files` to your Spring Boot backend.
      // Example: `/static-files/film1.jpg` → `http://localhost:8080/static-files/surprise_film1.jpg`
      '/static-files': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },

    }
  }
})


// export default defineConfig({
//   plugins: [svgr(), react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//       },
//       '/static-files': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         // The rewrite function below is important for handling the fallback
//         rewrite: (path) => path.replace(/^\/static-files/, '/static-files'),
//       },
//     },
//     // The historyApiFallback is an important part of handling these redirects
//     // for single-page applications. This tells the dev server to serve
//     // the index.html for any request that doesn't match an existing file.
//     historyApiFallback: {
//       rewrites: [
//         { from: /^\/static-files\/.*$/, to: '/index.html' },
//       ],
//     },
//   },
// });