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

    // For fetching all Reihe with their Termine for DTO selection/forms
    @EntityGraph(attributePaths = "termine")
    List<Reihe> findAll(Sort sort); // Overriding JpaRepository's findAll to apply the graph

    // For fetching a single Reihe with its Termine for form details
    @EntityGraph(attributePaths = "termine")
    Optional<Reihe> findById(Long id); // Overriding JpaRepository's findById to apply the graph

            // Not required if findAll(Sort) with @EntityGraph is used for the same purpose
            // @Query("SELECT r FROM Reihe r JOIN FETCH r.termine")
            // List<Reihe> findAllWithTermine();

            // Not required if findById(Long id) with @EntityGraph is used for the same purpose
            // @Query("SELECT r FROM Reihe r JOIN FETCH r.termine WHERE r.rnr = :rnr")
            // Optional<Reihe> findByIdWithTermine(Long rnr);

}
