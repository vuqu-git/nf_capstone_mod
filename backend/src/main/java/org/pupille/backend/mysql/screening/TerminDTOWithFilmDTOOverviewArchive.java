package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;
import org.pupille.backend.mysql.termin.Termin;

import java.time.LocalDateTime;
import java.util.List;

public record TerminDTOWithFilmDTOOverviewArchive(
        Long tnr,
        LocalDateTime vorstellungsbeginn,
        String titel,
        List<FilmDTOOverviewArchive> films
) {
    public TerminDTOWithFilmDTOOverviewArchive(Termin termin, List<Film> films) {
        this(
                termin.getTnr(),
                termin.getVorstellungsbeginn(),
                termin.getTitel(),

                films.stream()
                        .map(FilmDTOOverviewArchive::new)
                        .toList()
        );
    }
}