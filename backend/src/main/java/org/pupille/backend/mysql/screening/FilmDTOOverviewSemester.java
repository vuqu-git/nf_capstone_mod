package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;

public record FilmDTOOverviewSemester(
        Long fnr,
        String titel,
        String besonderheit,
        String regie,
        Integer jahr,
        Integer laufzeit
) {
    public FilmDTOOverviewSemester(Film film) {
        this(
                film != null ? film.getFnr() : null,
                film != null ? film.getTitel() : null,
                film != null ? film.getBesonderheit() : null,
                film != null ? film.getRegie() : null,
                film != null ? film.getJahr() : null,
                film != null ? film.getLaufzeit() : null
        );
    }
}