package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;

public record FilmDTOGallery(
        Long filmId,
        String titel,
        String kurztext,
        String besonderheit,
        String bild,
        Integer jahr,
        String format,
        Integer laufzeit
        // placeholder for String regie
) {
    public FilmDTOGallery(Film film) {
        this(
                film != null ? film.getFnr() : null,
                film != null ? film.getTitel() : null,
                film != null ? film.getKurztext() : null,
                film != null ? film.getBesonderheit() : null,
                film != null ? film.getBild() : null,
                film != null ? film.getJahr() : null,
                film != null ? film.getFormat() : null,
                film != null ? film.getLaufzeit() : null
        );
    }
}
