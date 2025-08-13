package org.pupille.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

// this SPAConfiguration creates a Single Page Application (SPA) fallback mechanism
// What is index.html in an SPA? → index.html is the single entry point for your entire React application. It's literally the "single page" in "Single Page Application."

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

        // 1. Specific Handler for the static-files on hard disk, external-static-container acts as a wrapper
        // This handler maps requests starting with "/static-files/" directly to the "static-files" folder inside your static directory.
//        registry.addResourceHandler("/static-files/**")
//                .addResourceLocations("file:C:\\Daten\\dcTest\\external-static-container\\static-files\\")
//                .resourceChain(true)
//                .addResolver(new PathResourceResolver() {
//                    @Override
//                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
//                        Resource requestedResource = location.createRelative(resourcePath);
//                        if (requestedResource.exists() && requestedResource.isReadable()) {
//                            return requestedResource;
//                        } else {
//                            // Fall back to index.html if the file does not exist
//                            return new ClassPathResource("/static/index.html");
//                        }
//                    }
//                });

        // 0. Explicitly handle the directory path /static-files and redirect it to the root of your SPA.
        // This ensures that the request gets picked up by your main SPA handler.
        registry.addResourceHandler("/static-files", "/static-files/")
                .addResourceLocations("classpath:/static/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        return location.createRelative("index.html");
                    }
                });


        // 1.5 Specific Handler for the static-files in docker container, which is bind mounted, external-static-container acts as a wrapper
        // This handler maps requests starting with "/static-files/" directly to the "static-files" folder inside your static directory.
        registry.addResourceHandler("/static-files/**")
                .addResourceLocations("file:/app/external-static-container/static-files/")
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {
                    @Override
                    protected Resource getResource(String resourcePath, Resource location) throws IOException {
                        Resource requestedResource = location.createRelative(resourcePath);
                        if (requestedResource.exists() && requestedResource.isReadable()) {
                            return requestedResource;
                        } else {
                            // Fall back to index.html if the file does not exist
                            return new ClassPathResource("/static/index.html");
                        }
                    }
                });


        // 2. The main handler for your SPA, which should be placed AFTER specific handlers.
        registry.addResourceHandler("/**")
                .addResourceLocations(      // Spring will search for static files in this exact order
                        "classpath:/static/",
                        "classpath:/public/",
                        "classpath:/resources/",
                        "classpath:/META-INF/resources/"
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
                            return location.createRelative("index.html");
                        }
                    }
                });
    }












}


//Example Request Flow:

//Request for /favicon.ico:
//Look in classpath:/static/favicon.ico → Found? Return it ✅
//If not found, look in classpath:/public/favicon.ico → Found? Return it
//Continue through all locations...
//If not found anywhere → Return index.html (SPA fallback)

//Request for /kinobesuch (React route):
//Look in all 5 locations for a file named kinobesuch → Not found
//SPA fallback: Return index.html → React Router handles it ✅