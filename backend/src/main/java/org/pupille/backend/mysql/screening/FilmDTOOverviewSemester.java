package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;

public record FilmDTOOverviewSemester(
        Long filmId,
        String titel,
        Integer jahr,
        String besonderheit,
        Integer laufzeit
) {
    public FilmDTOOverviewSemester(Film film) {
        this(
                film != null ? film.getFnr() : null,
                film != null ? film.getTitel() : null,
                film != null ? film.getJahr() : null,
                film != null ? film.getBesonderheit() : null,
                film != null ? film.getLaufzeit() : null
        );
    }
}
