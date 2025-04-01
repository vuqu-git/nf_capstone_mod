package org.pupille.backend.news.models;

import java.time.LocalDate;

public record News(
        String id,
        String text,
        String image,
        LocalDate startDate,
        LocalDate endDate,
        String newsVariant
) {
    public News {
        if ((text == null || text.isEmpty()) && (image == null || image.isEmpty())) {
            // Throws an exception only if both text and image are empty.
            throw new IllegalArgumentException("Both text and image cannot be empty");
        }
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Start and end dates are required");
        }
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }
    }

    public News(
            String text,
            String image,
            LocalDate startDate,
            LocalDate endDate,
            String newsVariant
    ) {
        this(null, text, image, startDate, endDate, newsVariant);
    }

    public News withId(String id) {
        return new News(id, text, image, startDate, endDate, newsVariant);
    }

}