package org.pupille.backend.mysql.terminverknuepfung;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TerminverknuepfungRepository extends JpaRepository<Terminverknuepfung, Terminverknuepfung.TerminverknuepfungId> {

    @Query("SELECT tv FROM Terminverknuepfung tv ORDER BY tv.fnr DESC")
    List<Terminverknuepfung> findAllByOrderByFnrDesc();

    //##########################################

    @Query("SELECT tv FROM Terminverknuepfung tv JOIN FETCH tv.film WHERE tv.termin.tnr IN :terminIds")
    List<Terminverknuepfung> findWithFilmsByTerminIds(@Param("terminIds") List<Long> terminIds);

    @Query("SELECT tv FROM Terminverknuepfung tv JOIN FETCH tv.film WHERE tv.tnr = :tnr")
    List<Terminverknuepfung> findWithFilmsByTnr(@Param("tnr") Long tnr);


}