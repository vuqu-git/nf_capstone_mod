package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;

public record FilmDTOOverviewArchive(
        Long filmId,
        String titel
) {
    public FilmDTOOverviewArchive(Film film) {
        this(
                film != null ? film.getFnr() : null,
                film != null ? film.getTitel() : null
        );
    }
}
