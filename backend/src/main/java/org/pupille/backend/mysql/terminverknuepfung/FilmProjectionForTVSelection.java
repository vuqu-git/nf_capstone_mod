package org.pupille.backend.mysql.terminverknuepfung;

// The naming convention "Projection" is not exclusively tied to interfaces.
// It's a general term used to describe a subset of an entity's data, regardless of whether it's an interface, a DTO, or a record.
// here: DTO/Class-based Projections

public record FilmProjectionForTVSelection(
        String titel,
        Integer jahr,
        String regie
) {
}
