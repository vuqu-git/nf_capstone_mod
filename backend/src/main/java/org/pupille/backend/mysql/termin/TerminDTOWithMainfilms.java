package org.pupille.backend.mysql.termin;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.pupille.backend.mysql.screening.FilmDTOOverviewArchive;
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
public class TerminDTOWithMainfilms {
    private Long tnr;
    private LocalDateTime vorstellungsbeginn;
    private String titel;

    private Set<FilmDTOOverviewArchive> mainfilms; // a Set of FilmDTOOverviewArchive, no vorfilms included (because of filtering below)
    // private Set<FilmDTOSelection> films; // when having FilmDTOSelection instead, the fields jahr and regie are available in addition

    public TerminDTOWithMainfilms(Termin termin) {
        this.tnr = termin.getTnr();
        this.vorstellungsbeginn = termin.getVorstellungsbeginn();
        this.titel = termin.getTitel();

        // Get the film connections. We'll use the correct type (List or Set) based on your Termin entity.
        // Assuming termin.getFilmConnections() returns List<Terminverknuepfung> based on prior issue.
        List<Terminverknuepfung> filmConnections = Optional.ofNullable(termin.getFilmConnections())
                .orElse(new ArrayList<>()); // Fallback for null list

        // Map each Terminverknuepfung to its associated Film, then to FilmDTOSelection
        this.mainfilms = filmConnections.stream()
                .filter(connection -> connection.getVorfilm() == null || !connection.getVorfilm()) // Exclude vorfilms
                .map(Terminverknuepfung::getFilm) // Get the Film entity
                .filter(java.util.Objects::nonNull) // Ensure film is not null (e.g., if lazy loading failed, though @EntityGraph should prevent this)
                .map(FilmDTOOverviewArchive::new)       // Map Film entity to FilmDTOSelection DTO
                //.map(FilmDTOSelection::new)       // Map Film entity to FilmDTOSelection DTO
                .collect(Collectors.toCollection(HashSet::new)); // Collect into a HashSet
    }
}