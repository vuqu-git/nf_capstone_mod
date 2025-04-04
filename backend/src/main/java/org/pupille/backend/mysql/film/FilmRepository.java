package org.pupille.backend.mysql.film;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {

//    @Query("SELECT f FROM Film f ORDER BY f.titel ASC")
//    List<FilmProjectionInterface> findAllByOrderByTitelAsc();

    @Query("SELECT f FROM Film f ORDER BY f.titel ASC")
    List<Film> findAllByOrderByTitelAsc();


}
