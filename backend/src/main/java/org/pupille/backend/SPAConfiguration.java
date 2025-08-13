package org.pupille.backend;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;

import java.io.IOException;

// this SPAConfiguration creates a Single Page Application (SPA) fallback mechanism
// What is index.html in an SPA? → index.html is the single entry point for your entire React application. It's literally the "single page" in "Single Page Application."

@Configuration
public class SPAConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**")
                .addResourceLocations(      // Spring will search for static files in this exact order
                        "classpath:/static/",              // default places for static files
                        "classpath:/public/",              // default places for static files
                        "classpath:/resources/",           // default places for static files
                        "classpath:/META-INF/resources/",  // default places for static files
                        "file:/app/static-files/"          // folder on docker container, which bind mounts to static files like filmbilder and programmhefte
                )
                .resourceChain(true)
                .addResolver(new PathResourceResolver() {

                    // SPA Magic - What this does:
                    //      Request for /styles.css → File exists → Return styles.css
                    //      Request for /kinobesuch → File doesn't exist → Return index.html (THIS is the SPA fallback)
                    //      Request for /some/deep/route → File doesn't exist → Return index.html (THIS is the SPA fallback)
                    // This allows React Router to handle client-side routing!

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