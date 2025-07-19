package org.pupille.backend.mysql.film;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.pupille.backend.utils.DirectorExtractorUtils;

// DTO for selection field

@Getter
@Setter
@AllArgsConstructor
public class FilmDTOSelection {
    private Long fnr;
    private String titel;
    private Integer jahr;
    private String regie;

    public FilmDTOSelection(Film film) {
        this.fnr = film.getFnr();
        this.titel = film.getTitel();
        this.jahr = film.getJahr();

        // if regie is not set in the DB, regie is extracted from column/field stab via helper function extractDirectors
        // original stab value will not be used in the creation of a FilmDTOSelection instance
        if (film.getRegie() == null || film.getRegie().isEmpty()) {
            this.regie = DirectorExtractorUtils.extractDirectors(film.getStab());
        } else {
            this.regie = film.getRegie();
        }
    }

}