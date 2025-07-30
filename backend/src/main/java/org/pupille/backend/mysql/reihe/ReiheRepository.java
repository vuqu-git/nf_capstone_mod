package org.pupille.backend.mysql.reihe;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReiheRepository extends JpaRepository<Reihe, Long> {

    // When you add @EntityGraph(attributePaths = "termine") to a method  in your JpaRepository interface,
    // anytime that specific method is called, it will always eager-fetch the termine collection.

            // @EntityGraph(attributePaths = {"termine"})
            // equivalent to =>
            // @Query("SELECT r FROM Reihe r JOIN FETCH r.termine")
            // List<Reihe> findAll();

            // @EntityGraph(attributePaths = {"termine"})
            // equivalent to =>
            // @Query("SELECT r FROM Reihe r JOIN FETCH r.termine WHERE r.rnr = :id")
            // Optional<Reihe> findByIdWithTermine(Long id);


    List<Reihe> findAll(Sort sort);

    // For eager fetching a single Reihe with its Termine and Filme for the ReiheForm
    // called in getReiheDTOFormByIdWithTermineAndFilms in ReiheService
    // !!! TAKE NOTE: identifiers termine, filmConnections and film in the attributePaths are the field names in the respective entities !!!
    @EntityGraph(attributePaths = {         // constructor ReiheDTOFormWithTermineAndFilme applied on Reihe r
            "termine",                      // within that r.getTermine() is called on the Reihe object → need Termin object
                                            // constructor TerminDTOWithMainfilms applied on a Termin object
            "termine.filmConnections",      // within that termin.getFilmConnections() is called on termin; result is List<Terminverknuepfung>
            "termine.filmConnections.film"  // on each item of filmConnections, which is of type Terminverknuepfung getFilm is called
    })
    Optional<Reihe> findWithTermineAndFilmsByRnr(Long id);

    // called by getReiheById (and indirect in updateReihe and deleteReihe) in ReiheService
    // no eager fetching because only Reihe type is returned for simple update-delete-operations
    // Optional<Reihe> findById(Long id);   // no need to manually declare (JpaRepository already provides a generic findById) => Only if you want to add special behavior, custom JPQL, or annotations (like @EntityGraph), then you can redeclare (override) it with your custom logic or annotations

    @EntityGraph(attributePaths = {"termine"})
    Optional<Reihe> findWithTermineByRnr(Long id);
}
