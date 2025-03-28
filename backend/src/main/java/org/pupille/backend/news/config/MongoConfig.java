package org.pupille.backend.news.config;

import org.pupille.backend.news.config.converters.DateToLocalDateConverter;
import org.pupille.backend.news.config.converters.LocalDateToDateConverter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

//@Configuration
//public class MongoConfig {
//
//    @Bean
//    public MongoCustomConversions customConversions() {
//        List<Converter<?, ?>> converters = new ArrayList<>();
//        converters.add(new DateToLocalDateConverter());
//        converters.add(new LocalDateToDateConverter());
//        return new MongoCustomConversions(converters);
//    }
//}

@Configuration
public class MongoConfig {

    @Bean
    public MongoCustomConversions customConversions() {
        return new MongoCustomConversions(Arrays.asList(
                new LocalDateToDateConverter(),
                new DateToLocalDateConverter()
        ));
    }
}