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

        // This configuration tells Vite to:
        //
        //     Proxy all requests to /api and /static-files to your backend.
        //
        //     For any request that starts with /static-files/ and doesn't find a corresponding file, rewrite the request to /index.html instead of attempting to fetch it from the backend, which will then load your SPA correctly.
        //
        // This approach ensures that your existing image files are correctly fetched from the backend, while also allowing the client-side routing to function correctly when a non-existent file is requested.
        //
        //
        //
        // The term "doesn't find a corresponding file" in the context of the Vite dev server's historyApiFallback is determined by a specific process.
        //
        // The Vite dev server, by default, tries to serve files from the project's root directory. When a request comes in (e.g., http://localhost:5173/static-files/surprise_film44.jpg), Vite first checks if a physical file with that exact path exists on the filesystem.
        //
        // Here's the breakdown of how the check works:
        //
        //   Vite's Static File Check: The Vite dev server will first look for a file at http://localhost:5173/static-files/surprise_film44.jpg within its configured serving directory (typically the project root or the public folder).
        //
        //   No Proxy Match: Your initial proxy configuration tells Vite to send any request starting with /static-files to your backend. So, Vite doesn't even get to the step of checking for a local file. The proxy takes precedence.
        //
        //   The Proposed Solution's Logic: The historyApiFallback option in the suggested vite.config.js changes this behavior for a specific pattern (/static-files/.*$). It tells Vite: "For any request that matches this pattern, instead of looking for a physical file or proxying it, immediately serve the index.html file."
        //
        // So, in the proposed solution, the "doesn't find a corresponding file" check is effectively skipped for requests that match the historyApiFallback rule. The rewrite rule is a directive to the dev server to not even attempt to find the file or forward the request. It simply serves the index.html file directly, allowing the React Router on the client side to handle the routing and display the <NotFound/> component.
        //
        // This approach is different from how a web server would typically handle a missing file. A traditional web server would perform a filesystem check, return a 404 error, and then a fallback mechanism might kick in. However, the Vite dev server with historyApiFallback is specifically designed for Single-Page Applications (SPAs) and acts more like a router, ensuring that the application's entry point (index.html) is always served so the client-side router can take over.