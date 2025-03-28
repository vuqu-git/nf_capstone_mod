package org.pupille.backend.news.config.converters;

import org.springframework.core.convert.converter.Converter;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;

public class DateToLocalDateConverter implements Converter<Date, LocalDate> {

    @Override
    public LocalDate convert(Date date) {
        return date.toInstant().atOffset(ZoneOffset.UTC).toLocalDate();
    }
//    @Override
//    public LocalDate convert(Date source) {
//        return new java.sql.Date(source.getTime()).toLocalDate(); // Convert Date to LocalDate
//    }
}
