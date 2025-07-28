package org.pupille.backend.mysql.film;

// appears only in uncommented service method getAllFilmsByOrderByTitelAsc and repo method findAllByOrderByTitelAscReturnListInterface
public interface FilmProjectionInterface {
    Long getFnr();
    String getTitel();
    Integer getJahr();
    // without regie here compared to FilmDTOSelection because that logic in the constructor there is not possible interfaces
}
