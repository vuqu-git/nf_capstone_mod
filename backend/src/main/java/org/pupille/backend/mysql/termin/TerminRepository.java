package org.pupille.backend.mysql.termin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TerminRepository extends JpaRepository<Termin, Long> {

        @Query("SELECT t FROM Termin t ORDER BY t.vorstellungsbeginn DESC")
        List<TerminProjectionSelection> findAllByOrderByVorstellungsbeginnDesc();

        @Query("SELECT t FROM Termin t WHERE t.vorstellungsbeginn >= :now ORDER BY t.vorstellungsbeginn ASC")
        List<Termin> findAllFutureTermine(LocalDateTime now);

//        // If you need the projection for future termine as well:
//        @Query("SELECT t FROM Termin t WHERE t.vorstellungsbeginn >= :now ORDER BY t.vorstellungsbeginn ASC")
//        List<TerminProjectionSelection> findAllFutureTermineProjected(LocalDateTime now);

        @Query("SELECT t FROM Termin t WHERE t.vorstellungsbeginn < :now AND t.veroeffentlichen > 0 ORDER BY t.vorstellungsbeginn DESC")
        List<Termin> findPastTermine(LocalDateTime now);

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
                LocalDateTime now,
                LocalDateTime startDateSummer,
                LocalDateTime endDateSummer,
                LocalDateTime startDateWinter,
                LocalDateTime endDateWinter
        );

        //    +++++++++++++++++++++++++++++
        //    reminder stuff
        //    +++++++++++++++++++++++++++++

        @Query("SELECT t FROM Termin t WHERE t.vorstellungsbeginn BETWEEN :startDateTime AND :endDateTime ORDER BY t.vorstellungsbeginn ASC")
        List<Termin> findTermineByDateRange(
                @Param("startDateTime") LocalDateTime startDateTime,
                @Param("endDateTime") LocalDateTime endDateTime
        );
}
