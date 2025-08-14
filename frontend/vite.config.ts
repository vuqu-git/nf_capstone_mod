import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// sets up a React development environment with SVG support and proxy rules to communicate with a backend server
// proxy configuration is especially useful for avoiding CORS issues during development
// * Seamless development: Frontend and backend can communicate without CORS (Cross-Origin Resource Sharing) issues
// * SVG as React components: Import SVGs directly as React components
// * Hot reloading: React Fast Refresh for instant updates during development
// => proxy essentially makes Vite dev server act as a middleman, forwarding API requests to your backend server while serving your React app, creating the illusion that everything runs on the same domain


// Production vs Development Config
// typically proxy config is NOT NEEDED in production because:
// Development Setup
//     Frontend (Vite): http://localhost:5173
//     Backend (API):   http://localhost:8080
//
//   Different ports = CORS issues
//   Proxy needed to forward requests
//
// Production Setup
//     Option A: Same domain
//     Frontend: https://myapp.com
//     Backend:  https://myapp.com/api
//
//     Option B: Different domains with CORS
//     Frontend: https://myapp.com
//     Backend:  https://api.myapp.com (with CORS headers)

// What happens in production:
//   Vite builds static files (HTML, CSS, JS)
//   Proxy config is ignored - it only works in dev mode
//   You handle routing differently:
//      Reverse proxy (nginx, Apache)
//      Same-origin deployment
//      Proper CORS headers on backend

//    Production example with nginx:
//     server {
//       location / {
//     # Serve React app
//       root /var/www/dist;
//     }
//
//       location /api {
//       # Forward to backend
//         proxy_pass http://localhost:8080;
//       }
//     }


export default defineConfig({
  // svgr(): Plugin that transforms SVG files into React components
  // react(): Official Vite plugin for React support (JSX transformation, Fast Refresh, etc.)
  plugins: [svgr(), react()],
  server: {
    proxy: {  // configuration for proxying API requests during development!
      // Proxy all requests starting with `/api` to your Spring Boot backend; example: fetch request for `/api/film` gets proxied to `http://localhost:8080/api/film`
      '/api': {
        target: 'http://localhost:8080',
        // No changeOrigin: Keeps the original Host header
      },

      // Proxy all requests starting with `/static-files` to your Spring Boot backend; example: `/static-files/film1.jpg` → `http://localhost:8080/static-files/surprise_film1.jpg`
      '/static-files': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },

    }
  }
})

// changeOrigin: Deep Dive
// ~~~~~~~~~~~~~~~~~~~~~~~
// changeOrigin controls whether the proxy "lies" to the target server about where the request came from
// Without changeOrigin: "Hi, I'm forwarding this request from localhost:5173"
// With changeOrigin: "Hi, I'm making this request directly to you (localhost:8080)"
// Most modern backends don't care about the Host header for simple API calls, but many production servers, security systems, and routing mechanisms do rely on it. When in doubt, use changeOrigin: true - it's the safer default and rarely causes issues while often preventing mysterious errors

// changeOrigin does NOT influence what's shown in the browser's address bar.
//    When you open a static image, the browser address bar always shows the original URL (=URL the browser initially requested) you requested, regardless of proxy settings
//    From the browser's point of view:
//       It made a request to localhost:3000/static-files/image.jpg
//       It got an image back
//       It displays the image with that URL
//    The browser has no idea that proxying happened - it's completely transparent. The proxy is purely a development convenience to avoid CORS issues.
// changeOrigin only affects the HTTP headers sent in the background request to the target server





// ********************************************************************************
// --- OPTION B ---
// in combination with addResourceHandlers from class SPAConfiguration
// this ensures that in case of requesting non-existing files OR routes (even routes '/static-files' and /static-files/') the <NotFound /> react component is rendered

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
//     Proxy all requests to /api and /static-files to your backend.
//     For any request that starts with /static-files/ and doesn't find a corresponding file, rewrite the request to /index.html instead of attempting to fetch it from the backend, which will then load your SPA correctly.
//
// This approach ensures that your existing image files are correctly fetched from the backend, while also allowing the client-side routing to function correctly when a non-existent file is requested.

// The term "doesn't find a corresponding file" in the context of the Vite dev server's historyApiFallback is determined by a specific process.
// The Vite dev server, by default, tries to serve files from the project's root directory. When a request comes in (e.g., http://localhost:5173/static-files/surprise_film44.jpg), Vite first checks if a physical file with that exact path exists on the filesystem.
// Here's the breakdown of how the check works:
//   Vite's Static File Check: The Vite dev server will first look for a file at http://localhost:5173/static-files/surprise_film44.jpg within its configured serving directory (typically the project root or the public folder).
//   No Proxy Match: Your initial proxy configuration tells Vite to send any request starting with /static-files to your backend. So, Vite doesn't even get to the step of checking for a local file. The proxy takes precedence.
//   The Proposed Solution's Logic: The historyApiFallback option in the suggested vite.config.js changes this behavior for a specific pattern (/static-files/.*$). It tells Vite: "For any request that matches this pattern, instead of looking for a physical file or proxying it, immediately serve the index.html file."

// So, in the proposed solution, the "doesn't find a corresponding file" check is effectively skipped for requests that match the historyApiFallback rule. The rewrite rule is a directive to the dev server to not even attempt to find the file or forward the request. It simply serves the index.html file directly, allowing the React Router on the client side to handle the routing and display the <NotFound/> component.
// This approach is different from how a web server would typically handle a missing file. A traditional web server would perform a filesystem check, return a 404 error, and then a fallback mechanism might kick in. However, the Vite dev server with historyApiFallback is specifically designed for Single-Page Applications (SPAs) and acts more like a router, ensuring that the application's entry point (index.html) is always served so the client-side router can take over.
