package org.pupille.backend.mysql.terminverknuepfung;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TerminverknuepfungRepository extends JpaRepository<Terminverknuepfung, Terminverknuepfung.TerminverknuepfungId> {

    @Query("SELECT tv FROM Terminverknuepfung tv ORDER BY tv.tnr DESC")
    List<Terminverknuepfung> findAllByOrderByTnrDesc();

    // ##########################################

    @Query("SELECT tv FROM Terminverknuepfung tv JOIN FETCH tv.film WHERE tv.termin.tnr IN :terminIds")
    List<Terminverknuepfung> findWithFilmsByTerminIds(@Param("terminIds") List<Long> terminIds);

    @Query("SELECT tv FROM Terminverknuepfung tv JOIN FETCH tv.film WHERE tv.tnr = :tnr")
    List<Terminverknuepfung> findWithFilmsByTnr(@Param("tnr") Long tnr);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    @Query("SELECT tv FROM Terminverknuepfung tv JOIN FETCH tv.film JOIN FETCH tv.termin ORDER BY tv.tnr DESC")
    List<Terminverknuepfung> findAllWithFilmAndTermin();

    @Query("SELECT tv FROM Terminverknuepfung tv " +
            "JOIN FETCH tv.film " +
            "JOIN FETCH tv.termin " +
            "WHERE tv.tnr = :tnr AND tv.fnr = :fnr")
    Optional<Terminverknuepfung> findWithFilmAndTerminByTnrAndFnr(
            @Param("tnr") Long tnr,
            @Param("fnr") Long fnr
    );


    @Query("SELECT tv FROM Terminverknuepfung tv " +
            "JOIN FETCH tv.film " +
            "JOIN FETCH tv.termin " +
            "ORDER BY tv.termin.termin DESC")
    List<Terminverknuepfung> findAllWithFilmAndTerminOrderByTerminDesc();



}