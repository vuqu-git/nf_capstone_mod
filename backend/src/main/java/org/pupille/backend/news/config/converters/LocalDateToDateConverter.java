package org.pupille.backend.news.config.converters;

import org.springframework.core.convert.converter.Converter;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.Date;

public class LocalDateToDateConverter implements Converter<LocalDate, Date> {

    @Override
    public Date convert(LocalDate localDate) {
        return Date.from(localDate.atStartOfDay(ZoneOffset.UTC).toInstant());
    }
//    @Override
//    public Date convert(LocalDate source) {
//        return java.sql.Date.valueOf(source); // Convert LocalDate to java.sql.Date
//    }
}