package org.pupille.backend.mysql.film;


// Spring Data JPA also supports interface-based projections

public interface FilmProjectionInterface {
    Long getFnr();
    String getTitel();
    Integer getJahr();
    String getStab();
}
