package org.pupille.backend.news.models;

import java.time.LocalDate;

public record News(
        String id,
        String description,
        String image,
        LocalDate startDate,
        LocalDate endDate
) {
    public News {
        if ((description == null || description.isEmpty()) && (image == null || image.isEmpty())) {
            // Throws an exception only if both description and image are empty.
            throw new IllegalArgumentException("Both description and image cannot be empty");
        }
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Start and end dates are required");
        }
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Start date cannot be after end date");
        }
    }

    public News(
            String description,
            String image,
            LocalDate startDate,
            LocalDate endDate
    ) {
        this(null, description, image, startDate, endDate);
    }

    public News withId(String id) {
        return new News(id, description, image, startDate, endDate);
    }

}