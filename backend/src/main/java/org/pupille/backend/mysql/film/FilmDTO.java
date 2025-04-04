package org.pupille.backend.mysql.film;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class FilmDTO {
    private Long fnr;
    private String titel;
    private Integer jahr;
    private String stab;

    public FilmDTO(Film film) {
        this.fnr = film.getFnr();
        this.titel = film.getTitel();
        this.jahr = film.getJahr();
        this.stab = film.getStab();
    }
}