package org.pupille.backend.mysql.termin;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TerminRepository extends JpaRepository<Termin, Long> {

//        Explanation of @EntityGraph:
//        attributePaths = {"filmConnections", "filmConnections.film"} tells JPA to fetch:
//              1) The filmConnections collection (which contains Terminverknuepfung objects) eagerly.
//              2) And then, for each Terminverknuepfung, eagerly fetch its associated film object.
//        => @EntityGraph tells JPA how to traverse the graph starting from Termin (Termin -> Terminverknuepfung -> Film).

        @EntityGraph(attributePaths = {"filmConnections", "filmConnections.film"}) // Fetch all Termine with their associated TVen and Films
        @Query("SELECT t FROM Termin t ORDER BY t.vorstellungsbeginn DESC")
        List<TerminProjectionSelection> findAllByOrderByVorstellungsbeginnDesc();

        @EntityGraph(attributePaths = {"filmConnections", "filmConnections.film"}) // Fetch all Termine with their associated TVen and Films
        @Query("SELECT t FROM Termin t ORDER BY t.vorstellungsbeginn DESC")
        List<TerminDTOWithMainFilme> findWithMainfilmeAllByOrderByVorstellungsbeginnDesc();

        @EntityGraph(attributePaths = {"filmConnections", "filmConnections.film"}) // Fetch all future Termine with their associated TVen and Films
        @Query("SELECT t FROM Termin t WHERE t.vorstellungsbeginn >= :now ORDER BY t.vorstellungsbeginn ASC")
        List<Termin> findAllFutureTermine(@Param("now") LocalDateTime now);

//        // If you need the projection for future termine as well:
//        @Query("SELECT t FROM Termin t WHERE t.vorstellungsbeginn >= :now ORDER BY t.vorstellungsbeginn ASC")
//        List<TerminProjectionSelection> findAllFutureTermineProjected(LocalDateTime now);

        @EntityGraph(attributePaths = {"filmConnections", "filmConnections.film"})
        @Query("SELECT t FROM Termin t WHERE t.vorstellungsbeginn < :now AND t.veroeffentlichen > 0 ORDER BY t.vorstellungsbeginn DESC")
        List<Termin> findPastTermine(@Param("now") LocalDateTime now);

        @EntityGraph(attributePaths = {"filmConnections", "filmConnections.film", "reihen"})
        Optional<Termin> findById(Long id); // Overriding JpaRepository's findById

        @EntityGraph(attributePaths = {"filmConnections", "filmConnections.film"})
        @Query(
        "SELECT t FROM Termin t " +
                "WHERE " +
                "   (" + // Start of the main seasonal logic group
                "       (:now BETWEEN :startDateSummer AND :endDateSummer AND t.vorstellungsbeginn BETWEEN :startDateSummer AND :endDateSummer) " +
                "       OR " +
                "       (:now NOT BETWEEN :startDateSummer AND :endDateSummer AND t.vorstellungsbeginn BETWEEN :startDateWinter AND :endDateWinter) " +
                "   ) " + // End of the main seasonal logic group
                "   AND (t.veroeffentlichen > 0) " + // AND this condition with the entire preceding group
                "ORDER BY t.vorstellungsbeginn ASC"
        )
        List<Termin> findTermineByCurrentSemester(
                @Param("now") LocalDateTime now,
                @Param("startDateSummer") LocalDateTime startDateSummer,
                @Param("endDateSummer") LocalDateTime endDateSummer,
                @Param("startDateWinter") LocalDateTime startDateWinter,
                @Param("endDateWinter") LocalDateTime endDateWinter
        );

        //    +++++++++++++++++++++++++++++
        //    for mail reminder stuff
        //    +++++++++++++++++++++++++++++

        @EntityGraph(attributePaths = {"filmConnections", "filmConnections.film"})
        @Query("SELECT t FROM Termin t WHERE t.vorstellungsbeginn BETWEEN :startDateTime AND :endDateTime ORDER BY t.vorstellungsbeginn ASC")
        List<Termin> findTermineByDateRange(
                @Param("startDateTime") LocalDateTime startDateTime,
                @Param("endDateTime") LocalDateTime endDateTime
        );
}
