package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;

public record FilmDTOOverviewArchive(
        Long fnr,
        String titel
) {
    public FilmDTOOverviewArchive(Film film) {
        this(
                film != null ? film.getFnr() : null,
                film != null && Boolean.TRUE.equals(film.getOriginaltitelAnzeigen()) && film.getOriginaltitel() != null && !film.getOriginaltitel().isBlank()
                        ? film.getOriginaltitel()
                        : (film != null ? film.getTitel() : null)
        );
    }
}
