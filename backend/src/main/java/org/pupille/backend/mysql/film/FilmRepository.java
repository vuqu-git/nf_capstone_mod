package org.pupille.backend.mysql.film;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilmRepository extends JpaRepository<Film, Long> {

//    // No AS needed (Implicit Mapping): Since the getter method names (after removing "get" and lowercasing the first letter) in the FilmProjectionInterface exactly match the field names in your Film entity, Spring Data JPA can implicitly map them without needing AS aliases in your @Query. For example, if you have @Query("SELECT f.fnr, f.titel, f.jahr FROM Film f"), Spring will correctly map these to your FilmProjectionInterface.
//    @Query("SELECT f FROM Film f ORDER BY f.titel ASC")
//    // @Query("SELECT f.fnr, f.titel, f.jahr FROM Film f ORDER BY f.titel ASC")
//    List<FilmProjectionInterface> findAllByOrderByTitelAscReturnListInterface();

    // @Query("SELECT f FROM Film f ORDER BY f.titel ASC")  // This query can be expressed using Spring Data JPA's method naming convention, and you can remove the @Query annotation entirely
                                                            // Spring Data JPA will automatically generate the required SQL/JPQL
    List<Film> findAllByOrderByTitelAsc();

}
