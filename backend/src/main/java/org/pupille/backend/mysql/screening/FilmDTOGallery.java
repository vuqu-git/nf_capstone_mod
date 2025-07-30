package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;

public record FilmDTOGallery(
        Long fnr,
        String titel,
        String kurztext,
        String besonderheit,
        String bild,
        String offsetImageInGallery,

        String format,

        String regie,
        Integer jahr,
        Integer laufzeit,

        String sonderfarbe
) {
    public FilmDTOGallery(Film film) {
        this(
                film != null ? film.getFnr() : null,
                film != null && Boolean.TRUE.equals(film.getOriginaltitelAnzeigen()) && film.getOriginaltitel() != null && !film.getOriginaltitel().isBlank()
                        ? film.getOriginaltitel()
                        : (film != null ? film.getTitel() : null),
                film != null ? film.getKurztext() : null,
                film != null ? film.getBesonderheit() : null,
                film != null ? film.getBild() : null,
                film != null ? film.getOffsetImageInGallery() : null,
                film != null ? film.getFormat() : null,
                film != null ? film.getRegie() : null,
                film != null ? film.getJahr() : null,
                film != null ? film.getLaufzeit() : null,
                film != null ? film.getSonderfarbe() : null
        );
    }
}
