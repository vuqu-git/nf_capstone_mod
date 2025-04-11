package org.pupille.backend.mysql.film;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

// DTO for selection field

@Getter
@Setter
@AllArgsConstructor
public class FilmDTOSelection {
    private Long fnr;
    private String titel;
    private Integer jahr;
    private String stab;

    public FilmDTOSelection(Film film) {
        this.fnr = film.getFnr();
        this.titel = film.getTitel();
        this.jahr = film.getJahr();
        this.stab = film.getStab();
    }
}