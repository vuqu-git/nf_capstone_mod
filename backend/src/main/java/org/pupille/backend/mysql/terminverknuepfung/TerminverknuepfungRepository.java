package org.pupille.backend.mysql.terminverknuepfung;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TerminverknuepfungRepository extends JpaRepository<Terminverknuepfung, Terminverknuepfung.TerminverknuepfungId> {

    @Query("SELECT tv FROM Terminverknuepfung tv ORDER BY tv.fnr DESC")
    List<Terminverknuepfung> findAllByOrderByFnrDesc();
}