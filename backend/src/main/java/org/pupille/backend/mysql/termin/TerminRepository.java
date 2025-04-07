package org.pupille.backend.mysql.termin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TerminRepository extends JpaRepository<Termin, Integer> {

        @Query("SELECT t FROM Termin t ORDER BY t.termin DESC")
        List<TerminProjectionInterface> findAllByOrderByTerminDesc();

        @Query("SELECT t FROM Termin t WHERE t.termin >= :now ORDER BY t.termin ASC")
        List<Termin> findFutureTermine(LocalDateTime now);

        // If you need the projection for future termine as well:
        @Query("SELECT t FROM Termin t WHERE t.termin >= :now ORDER BY t.termin ASC")
        List<TerminProjectionInterface> findFutureTermineProjected(LocalDateTime now);

}
