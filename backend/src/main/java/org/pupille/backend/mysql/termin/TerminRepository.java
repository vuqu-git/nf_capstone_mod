package org.pupille.backend.mysql.termin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TerminRepository extends JpaRepository<Termin, Integer> {

        @Query("SELECT t FROM Termin t ORDER BY t.termin DESC")
        List<TerminProjectionInterface> findAllByOrderByTerminDesc();

}
