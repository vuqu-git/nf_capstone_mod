package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;
import org.pupille.backend.mysql.termin.Termin;

import java.time.LocalDateTime;
import java.util.List;

public record TerminDTOWithFilmDTOOverviewSemester(
        Long terminId,
        LocalDateTime screeningTime,
        String titel,
        List<FilmDTOOverviewSemester> films
) {
    public TerminDTOWithFilmDTOOverviewSemester(Termin termin, List<Film> films) {
        this(
                termin.getTnr(),
                termin.getTermin(),
                termin.getTitel(),

                films.stream()
                        .map(FilmDTOOverviewSemester::new)
                        .toList()
        );
    }
}