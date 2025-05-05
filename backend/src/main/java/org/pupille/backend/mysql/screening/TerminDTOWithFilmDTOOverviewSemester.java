package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;
import org.pupille.backend.mysql.termin.Termin;

import java.time.LocalDateTime;
import java.util.List;

public record TerminDTOWithFilmDTOOverviewSemester(
        Long tnr,
        LocalDateTime vorstellungsbeginn,
        String titel,
        List<FilmDTOOverviewSemester> mainfilms,
        Integer terminGesamtlaufzeit
) {
    public TerminDTOWithFilmDTOOverviewSemester(Termin termin, List<Film> films, Integer terminGesamtlaufzeit) {
        this(
                termin.getTnr(),
                termin.getVorstellungsbeginn(),
                termin.getTitel(),

                films.stream()
                        .map(FilmDTOOverviewSemester::new)
                        .toList(),

                terminGesamtlaufzeit
        );
    }
}
