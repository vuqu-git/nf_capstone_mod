package org.pupille.backend.mysql.termin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TerminRepository extends JpaRepository<Termin, Long> {

        @Query("SELECT t FROM Termin t ORDER BY t.termin DESC")
        List<TerminProjectionSelection> findAllByOrderByTerminDesc();

        @Query("SELECT t FROM Termin t WHERE t.termin >= :now ORDER BY t.termin ASC")
        List<Termin> findFutureTermine(LocalDateTime now);

        // If you need the projection for future termine as well:
        @Query("SELECT t FROM Termin t WHERE t.termin >= :now ORDER BY t.termin ASC")
        List<TerminProjectionSelection> findFutureTermineProjected(LocalDateTime now);


        @Query("SELECT t FROM Termin t WHERE t.termin < :now ORDER BY t.termin DESC")
        List<Termin> findPastTermine(LocalDateTime now);

        @Query(
                "SELECT t FROM Termin t " +
                        "WHERE " +
                        "   (:now BETWEEN :startDateSummer AND :endDateSummer AND t.termin BETWEEN :startDateSummer AND :endDateSummer) OR " +
                        "   (:now NOT BETWEEN :startDateSummer AND :endDateSummer AND t.termin BETWEEN :startDateWinter AND :endDateWinter) " +
                        "ORDER BY t.termin ASC"
        )
        List<Termin> findTermineByCurrentSemester(
                LocalDateTime now,
                LocalDateTime startDateSummer,
                LocalDateTime endDateSummer,
                LocalDateTime startDateWinter,
                LocalDateTime endDateWinter
        );

}
