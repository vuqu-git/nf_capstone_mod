package org.pupille.backend.mysql.termin;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.pupille.backend.mysql.film.FilmDTOSelection;
import org.pupille.backend.mysql.terminverknuepfung.Terminverknuepfung;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;
import java.util.stream.Collectors;

@Getter
@Setter
@NoArgsConstructor // Needed for JSON deserialization if you were sending TerminDTOs in requests
@AllArgsConstructor // Useful for manual construction if needed
public class TerminDTOWithMainFilme {
    private Long tnr;
    private LocalDateTime vorstellungsbeginn;
    private String titel;

//    private FilmDTOSelection film; // Nested DTO for the associated film
//
//    // Constructor to map from a Termin entity (and its connections)
//    public TerminDTOSelection(Termin termin) {
//        this.tnr = termin.getTnr();
//        this.vorstellungsbeginn = termin.getVorstellungsbeginn();
//        this.titel = termin.getTitel();
//
//        // Assuming a Termin has a primary Film via Terminverknuepfung.
//        // We try to get the first film connection.
//        // Ensure termin.getFilmConnections() is not null and has elements when called.
//        Optional<Terminverknuepfung> mainConnection = Optional.ofNullable(termin.getFilmConnections())
//                .orElse(new ArrayList<>()) // Handle null collection
//                .stream()
//                .findFirst();
//
//        this.film = mainConnection.map(Terminverknuepfung::getFilm)
//                .map(FilmDTOSelection::new)
//                .orElse(null); // Set to null if no film connection or film is null
//    }

    private Set<FilmDTOSelection> films; // a Set of FilmDTOSelection, no vorfilms included!

    public TerminDTOWithMainFilme(Termin termin) {
        this.tnr = termin.getTnr();
        this.vorstellungsbeginn = termin.getVorstellungsbeginn();
        this.titel = termin.getTitel();

        // Get the film connections. We'll use the correct type (List or Set) based on your Termin entity.
        // Assuming termin.getFilmConnections() returns List<Terminverknuepfung> based on prior issue.
        List<Terminverknuepfung> connections = Optional.ofNullable(termin.getFilmConnections())
                .orElse(new ArrayList<>()); // Fallback for null list

        // Map each Terminverknuepfung to its associated Film, then to FilmDTOSelection
        this.films = connections.stream()
                .filter(connection -> connection.getVorfilm() == null || !connection.getVorfilm()) // Exclude vorfilms
                .map(Terminverknuepfung::getFilm) // Get the Film entity
                .filter(java.util.Objects::nonNull) // Ensure film is not null (e.g., if lazy loading failed, though @EntityGraph should prevent this)
                .map(FilmDTOSelection::new)       // Map Film entity to FilmDTOSelection DTO
                .collect(Collectors.toCollection(HashSet::new)); // Collect into a HashSet
    }
}