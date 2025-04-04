package org.pupille.backend.mysql.film;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class FskConverter implements AttributeConverter<Film.Fsk, String> {

    @Override
    public String convertToDatabaseColumn(Film.Fsk attribute) {
        if (attribute == null) {
            return null;
        }
        switch (attribute) {
            case _0:
                return "0";
            case _6:
                return "6";
            case _12:
                return "12";
            case _16:
                return "16";
            case _18:
                return "18";
            case UNGEPRUEFT:
                return "ungeprüft";
            default:
                throw new IllegalArgumentException("Unknown Fsk: " + attribute);
        }
    }

    @Override
    public Film.Fsk convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null; // or handle it as you prefer
        }
        switch (dbData) {
            case "0":
                return Film.Fsk._0;
            case "6":
                return Film.Fsk._6;
            case "12":
                return Film.Fsk._12;
            case "16":
                return Film.Fsk._16;
            case "18":
                return Film.Fsk._18;
            case "ungeprüft":
                return Film.Fsk.UNGEPRUEFT;
            default:
                throw new IllegalArgumentException("Unknown Fsk database value: " + dbData);
        }
    }
}