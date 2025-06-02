package org.pupille.backend.oauthgithub;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.url}")
    String appUrl;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST,"/api/news/all").authenticated()
                        .requestMatchers(HttpMethod.PUT,"/api/news/all/{id}").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"/api/news/all/{id}").authenticated()

                        .requestMatchers(HttpMethod.POST,"/api/filme").authenticated()
                        .requestMatchers(HttpMethod.PUT,"/api/filme/{id}").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"/api/filme/{id}").authenticated()

                        .requestMatchers(HttpMethod.POST,"/api/termine").authenticated()
                        .requestMatchers(HttpMethod.PUT,"/api/termine/{id}").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"/api/termine/{id}").authenticated()

                        .requestMatchers(HttpMethod.POST,"/api/terminverknuepfung/link-film-termin").authenticated()
                        .requestMatchers(HttpMethod.PUT,"/api/terminverknuepfung/{tnr}/{fnr}").authenticated()
                        .requestMatchers(HttpMethod.DELETE,"/api/terminverknuepfung/{tnr}/{fnr}").authenticated()

                        .requestMatchers(HttpMethod.POST,"/api/perplexityai/emojify").authenticated()
                        .requestMatchers(HttpMethod.POST,"/api/perplexityai/film-text").authenticated()
                        .anyRequest().permitAll())
                .sessionManagement(sessions ->
                        sessions.sessionCreationPolicy(SessionCreationPolicy.ALWAYS))
                .logout(l -> l.logoutSuccessUrl(appUrl))
                .oauth2Login(o -> o.defaultSuccessUrl(appUrl))
                .exceptionHandling(e -> e
                                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                        );

        return http.build();
    }

}
