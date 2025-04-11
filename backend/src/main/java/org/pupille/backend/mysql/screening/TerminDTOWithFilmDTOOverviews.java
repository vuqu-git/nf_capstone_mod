package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;
import org.pupille.backend.mysql.termin.Termin;

import java.time.LocalDateTime;
import java.util.List;

public record TerminDTOWithFilmDTOOverviews(
        Long terminId,
        LocalDateTime screeningTime,
        String titel,
        String kurztext,
        String besonderheit,
        Integer sonderfarbe,
        List<FilmDTOOverview> films
) {
    public TerminDTOWithFilmDTOOverviews(Termin termin, List<Film> films) {
        this(
                termin.getTnr(),
                termin.getTermin(),
                termin.getTitel(),
                termin.getKurztext(),
                termin.getBesonderheit(),
                termin.getSonderfarbe(),
                films.stream()
                        .map(FilmDTOOverview::new)
                        .toList()
        );
    }
}