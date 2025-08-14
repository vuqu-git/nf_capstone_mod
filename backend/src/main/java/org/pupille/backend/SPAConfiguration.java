package org.pupille.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

// This Spring Boot configuration class serves static files and handles SPA client-side routing by falling back to index.html for unknown routes.
// Setup is for production deployment where your Spring Boot server hosts both your API and your frontend application in a single JAR file!
// btw: What is index.html in an SPA? → index.html is the single entry point for your entire React application. It's literally the "single page" in "Single Page Application."

@Configuration
public class SPAConfiguration implements WebMvcConfigurer {

//    // surprise_film2.jpg & bilder folder in resources/static
//    // works: http://localhost:5173/kinobesuch
//
//    // works: http://localhost:5173/bilder/surprise_film4.jpg
//    // works: http://localhost:8080/bilder/surprise_film4.jpg
//
//    // works: http://localhost:8080/surprise_film2.jpg
//    // works not: http://localhost:5173/surprise_film2.jpg → <NotFound />
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/**")
//                .addResourceLocations(      // Spring will search for static files (in these folders and its subfolders) in this exact order
//                        "classpath:/static/",              // default places for static files
//                        "classpath:/public/",              // default places for static files
//                        "classpath:/resources/",           // default places for static files
//                        "classpath:/META-INF/resources/",  // default places for static files
//                        "file:/app/static-files/"          // folder on docker container, which bind mounts to static files like filmbilder and programmhefte; don't forget to e.g. -v "C:\Daten\fbTest\filmbilder:/app/static-files" in the docker run command
//                )
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//
//                    // SPA Magic - What this does:
//                    //      Request for /styles.css → File exists → Return styles.css
//                    //      Request for /kinobesuch → File doesn't exist → Return index.html (THIS is the SPA fallback)
//                    //      Request for /some/deep/route → File doesn't exist → Return index.html (THIS is the SPA fallback)
//                    // This allows React Router to handle client-side routing!
//
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        Resource requestedResource = location.createRelative(resourcePath);
//
//                        if (requestedResource.exists() && requestedResource.isReadable()) {
//                            return requestedResource;
//                        } else {
//                            // If the resource doesn't exist, return index.html for SPA routing
//                            return location.createRelative("index.html");
//                        }
//                    }
//                });
//    }












    // surprise_film2.jpg & bilder folder in C:\Daten\dcTest\external_static
//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/**")
//                .addResourceLocations(      // Spring will search for static files (in these folders and its subfolders) in this exact order
//                        "classpath:/static/",              // default places for static files
//                        "classpath:/public/",              // default places for static files
//                        "classpath:/resources/",           // default places for static files
//                        "classpath:/META-INF/resources/",  // default places for static files
//
//                        "file:C:\\Daten\\dcTest\\external_static",          // on harddisk
//
//                        "file:/app/static-files/"          // folder on docker container, which bind mounts to static files like filmbilder and programmhefte; don't forget to e.g. -v "C:\Daten\fbTest\filmbilder:/app/static-files" in the docker run command
//                )
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//
//                    // SPA Magic - What this does:
//                    //      Request for /styles.css → File exists → Return styles.css
//                    //      Request for /kinobesuch → File doesn't exist → Return index.html (THIS is the SPA fallback)
//                    //      Request for /some/deep/route → File doesn't exist → Return index.html (THIS is the SPA fallback)
//                    // This allows React Router to handle client-side routing!
//
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        Resource requestedResource = location.createRelative(resourcePath);
//
//                        if (requestedResource.exists() && requestedResource.isReadable()) {
//                            return requestedResource;
//                        } else {
//                            // If the resource doesn't exist, return index.html for SPA routing
//                            return location.createRelative("index.html");
//                        }
//                    }
//                });
//    }


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

//        // -- 0. Explicitly handle the directory path /static-files and redirect it to the root of your SPA.
//        // This ensures that the request gets picked up by your main SPA handler (i.e. index.html).
//        registry.addResourceHandler("/static-files", "/static-files/")
//                .addResourceLocations("classpath:/static/") // i.e. inside JAR
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        System.out.println("=== 0th HANDLER RESOLVER CALLED ===");
//                        return location.createRelative("index.html"); // Find index.html relative to wherever I'm currently looking (c.f. location in addResourceLocations method)
//                    }
//                });

        // -- 0.5. Specific Handler for the static-files on hard disk, external-static-container acts as a wrapper
        // This handler maps requests starting with "/static-files/" directly to the "static-files" folder inside your static directory.
//        registry.addResourceHandler("/static-files/**")
//                .addResourceLocations("file:C:\\Daten\\dcTest\\external-static-container\\static-files\\")
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        System.out.println("=== FIRST HANDLER RESOLVER CALLED ===");
//                        System.out.println("resourcePath: " + resourcePath);
//                        System.out.println("location: " + location);
//
//                        Resource requestedResource = location.createRelative(resourcePath);
//                        if (requestedResource.exists() && requestedResource.isReadable()) {
//                            System.out.println("FIRST HANDLER: returning requested resource");
//                            return requestedResource;
//                        } else {
//                            // Fall back to index.html in /static if the file does not exist
//                            System.out.println("FIRST HANDLER: falling back to ClassPathResource");
//                            return new ClassPathResource("/static/index.html");
//                        }
//                    }
//                });

        // -- 1. Specific Handler for the static-files in docker container, which is bind mounted, external-static-container acts as a wrapper
        // This handler maps requests STARTING with "/static-files/" directly to the "static-files" folder inside your static directory.
        // Handles: /static-files/anything/here.jpg
        //        GET /static-files/photo.jpg    → /app/external-static-container/static-files/photo.jpg
        //        GET /static-files/missing.png  → /static/index.html (fallback)
        //        GET /static-files/docs/file.pdf → /app/external-static-container/static-files/docs/file.pdf
        registry.addResourceHandler("/static-files/**") // URL: /static-files is NO MATCH; because it requires something after /static-files/
                .addResourceLocations("file:/app/external-static-container/static-files/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        if (requestedResource.exists() && requestedResource.isReadable()) {
                            return requestedResource;
                        } else {
                            // Fall back to index.html in /static if the file does not exist
                            return new ClassPathResource("/static/index.html"); // Always get index.html from /static/, ignore where I'm currently looking
                        }
                    }
                });

        // 2. The main handler for your SPA, which should be placed AFTER specific handlers.
        // Enables SPA routing - Any unknown route falls back to index.html, allowing client-side routing to work
        // Handles: Everything else (/, /about, /users/123, /app.js, etc.)
        // Serves from: Multiple locations (searches in order)
        // Logic: Serve real files when they exist (in the specified locations), otherwise serve index.html for SPA routing
        //        GET /                    → /static/index.html (SPA)
        //        GET /about               → /static/index.html (SPA route)
        //        GET /users/123           → /static/index.html (SPA route)
        //        GET /app.js              → /static/app.js (actual JS file)
        //        GET /favicon.ico         → /static/favicon.ico (actual icon)
        //        GET /missing-file.css    → /static/index.html (fallback)
        registry.addResourceHandler("/**")
                .addResourceLocations(      // Spring will search for static files in this exact order
                        "classpath:/static/"
                                                    //                        "classpath:/public/",
                                                    //                        "classpath:/resources/",
                                                    //                        "classpath:/META-INF/resources/"
                )
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        if (requestedResource.exists() && requestedResource.isReadable()) {
                            return requestedResource;
                        } else {
                            // If the resource doesn't exist, return index.html for SPA routing
                                        //                            return location.createRelative("index.html"); // Find index.html relative to wherever I'm currently looking (c.f. locations in addResourceLocations method)
                                                                    // The change to a different location happens when the originally requested file is not found, AND the fallback index.html is also not found in the current location.
                            return new ClassPathResource("/static/index.html");
                        }
                    }
                });

//        registry.addResourceHandler("/**")
//                .addResourceLocations("classpath:/static/")
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        System.out.println("=== LAST RESOLVER CALLED ===");
//                        System.out.println("resourcePath: " + resourcePath);
//                        System.out.println("location: " + location);
//
//                        try {
//                            Resource requestedResource = location.createRelative(resourcePath);
//                            System.out.println("requestedResource: " + requestedResource);
//                            System.out.println("requestedResource.exists(): " + requestedResource.exists());
//                            System.out.println("requestedResource.isReadable(): " + requestedResource.isReadable());
//
//                            if (requestedResource.exists() && requestedResource.isReadable()) {
//                                System.out.println("RETURNING: requestedResource");
//                                return requestedResource;
//                            } else {
//                                System.out.println("!!! ELSE clause of last Handler !!!");
//                                Resource fallback = location.createRelative("index.html");
//                                System.out.println("fallback: " + fallback);
//                                System.out.println("fallback.exists(): " + fallback.exists());
//                                System.out.println("fallback.isReadable(): " + fallback.isReadable());
//                                System.out.println("RETURNING: fallback");
//                                return fallback;
//                            }
//                        } catch (Exception e) {
//                            System.out.println("EXCEPTION: " + e.getMessage());
//                            e.printStackTrace();
//                            return null;
//                        }
//                    }
//                });
//    }

        //    Production Flow:
        //    User visits: https://myapp.com/dashboard
        //    Spring checks: No file at /static/dashboard
        //    Spring returns: /static/index.html
        //    React Router: Takes over and shows dashboard component
        //    User requests: https://myapp.com/static-files/avatar.jpg
        //    Spring serves: /app/external-static-container/static-files/avatar.jpg

        //    Request Flow Examples
        //    URL                         Handler Used    Result
        //    /                           Handler 3       index.html (SPA)
        //    /kinobesuch                 Handler 3       index.html (SPA)
        //    /app.js                     Handler 3       app.js (real file)
        //    /static-files               Handler 1       index.html
        //    /static-files/photo.jpg     Handler 2       photo.jpg ✅
        //    /static-files/missing.jpg   Handler 2       index.html (fallback)


// ********************************************************************************
// --- OPTION B ---
// // in combination with defineConfig from vite.config.ts

//    @Override
//    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//
//        // -- 0. Explicitly handle the directory path /static-files and redirect it to the root of your SPA.
//        // This ensures that the request gets picked up by your main SPA handler (i.e. index.html).
//        registry.addResourceHandler("/static-files", "/static-files/")
//                .addResourceLocations("classpath:/static/") // i.e. inside JAR
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        return location.createRelative("index.html"); // Find index.html relative to wherever I'm currently looking (c.f. location in addResourceLocations method)
//                    }
//                });
//
//        // -- 0.5. Specific Handler for the static-files on hard disk, external-static-container acts as a wrapper
//        // This handler maps requests starting with "/static-files/" directly to the "static-files" folder inside your static directory.
// //        registry.addResourceHandler("/static-files/**")
// //                .addResourceLocations("file:C:\\Daten\\dcTest\\external-static-container\\static-files\\")
// //                .resourceChain(true)
// //                .addResolver(new PathResourceResolver() {
// //                    @Override
// //                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
// //                        Resource requestedResource = location.createRelative(resourcePath);
// //                        if (requestedResource.exists() && requestedResource.isReadable()) {
// //                            return requestedResource;
// //                        } else {
// //                            // Fall back to index.html in /static if the file does not exist
// //                            return new ClassPathResource("/static/index.html");
// //                        }
// //                    }
// //                });
//
//        // -- 1. Specific Handler for the static-files in docker container, which is bind mounted, external-static-container acts as a wrapper
//        // This handler maps requests STARTING with "/static-files/" directly to the "static-files" folder inside your static directory.
//        // Handles: /static-files/anything/here.jpg
//        //        GET /static-files/photo.jpg    → /app/external-static-container/static-files/photo.jpg
//        //        GET /static-files/missing.png  → /static/index.html (fallback)
//        //        GET /static-files/docs/file.pdf → /app/external-static-container/static-files/docs/file.pdf
//        registry.addResourceHandler("/static-files/**")
//                .addResourceLocations("file:/app/external-static-container/static-files/")
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        Resource requestedResource = location.createRelative(resourcePath);
//                        if (requestedResource.exists() && requestedResource.isReadable()) {
//                            return requestedResource;
//                        } else {
//                            // Fall back to index.html in /static if the file does not exist
//                            return new ClassPathResource("/static/index.html"); // Always get index.html from /static/, ignore where I'm currently looking
//                        }
//                    }
//                });
//
//        // 2. The main handler for your SPA, which should be placed AFTER specific handlers.
//        // Enables SPA routing - Any unknown route falls back to index.html, allowing client-side routing to work
//        // Handles: Everything else (/, /about, /users/123, /app.js, etc.)
//        // Serves from: Multiple locations (searches in order)
//        // Logic: Serve real files when they exist (in the specified locations), otherwise serve index.html for SPA routing
//        //        GET /                    → /static/index.html (SPA)
//        //        GET /about               → /static/index.html (SPA route)
//        //        GET /users/123           → /static/index.html (SPA route)
//        //        GET /app.js              → /static/app.js (actual JS file)
//        //        GET /favicon.ico         → /static/favicon.ico (actual icon)
//        //        GET /missing-file.css    → /static/index.html (fallback)
//        registry.addResourceHandler("/**")
//                .addResourceLocations(      // Spring will search for static files in this exact order
//                        "classpath:/static/",
//                        "classpath:/public/",
//                        "classpath:/resources/",
//                        "classpath:/META-INF/resources/"
//                )
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        Resource requestedResource = location.createRelative(resourcePath);
//                        if (requestedResource.exists() && requestedResource.isReadable()) {
//                            return requestedResource;
//                        } else {
//                            // If the resource doesn't exist, return index.html for SPA routing
//                            return location.createRelative("index.html"); // Find index.html relative to wherever I'm currently looking (c.f. locations in addResourceLocations method)
//                            // The change to a different location happens when the originally requested file is not found, AND the fallback index.html is also not found in the current location.
//                        }
//                    }
//                });

    }

}
