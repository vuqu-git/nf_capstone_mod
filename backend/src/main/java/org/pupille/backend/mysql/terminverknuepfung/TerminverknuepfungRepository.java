package org.pupille.backend.mysql.terminverknuepfung;

import org.pupille.backend.mysql.termin.TerminProjectionSelection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TerminverknuepfungRepository extends JpaRepository<Terminverknuepfung, Terminverknuepfung.TerminverknuepfungId> {

    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    @Query("SELECT tv FROM Terminverknuepfung tv ORDER BY tv.tnr DESC")
    List<Terminverknuepfung> findAllByOrderByTnrDesc();
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    @Query("SELECT tv FROM Terminverknuepfung tv JOIN FETCH tv.film JOIN FETCH tv.termin ORDER BY tv.tnr DESC")
    List<Terminverknuepfung> findAllWithFilmAndTermin();


    @Query("SELECT tv FROM Terminverknuepfung tv " +
            "JOIN FETCH tv.film " +
            "JOIN FETCH tv.termin " +
            "ORDER BY tv.termin.vorstellungsbeginn DESC")
    List<Terminverknuepfung> findAllWithFilmAndTerminOrderByTerminDesc();


    @Query("SELECT tv FROM Terminverknuepfung tv " +
            "JOIN FETCH tv.film " +
            "JOIN FETCH tv.termin " +
            "WHERE tv.tnr = :tnr AND tv.fnr = :fnr")
    Optional<Terminverknuepfung> findWithFilmAndTerminByTnrAndFnr(
            @Param("tnr") Long tnr,
            @Param("fnr") Long fnr
    );

    // ---------------------------------------------------------------------------------------------
    // two methods for fetching list of filme (termine) when giving tnr (fnr)

    @Query("SELECT tv FROM Terminverknuepfung tv JOIN FETCH tv.film WHERE tv.tnr = :tnr")
    List<Terminverknuepfung> findWithFilmsByTnr(@Param("tnr") Long tnr);

    // method for fetching list of termine when giving fnr

    // *this query must contain column names (or more accurately, the aliased names) like tnr or vorstellungsbeginn
    //  that matches the property names (derived from the getter method names) in the TerminProjectionSelection interface, otherwise the mapping won't work
    // *you can select more columns than the getters defined in your projection interface
    //  but: the extra selected columns are simply ignored in the returned projection instances.
    @Query("""
                SELECT 
                    t.tnr AS tnr,
                    t.vorstellungsbeginn AS vorstellungsbeginn,
                    t.titel AS titel
                FROM Termin t
                JOIN t.filmConnections tv
                WHERE tv.film.fnr = :fnr
                ORDER BY t.vorstellungsbeginn DESC
            """)
    List<TerminProjectionSelection> findTermineByFilmFnr(@Param("fnr") Long fnr);

    // ****  ****   ****  ****   ****  ****   ****  ****
    // the following one is only used in ScreeningService
    @Query("SELECT tv FROM Terminverknuepfung tv JOIN FETCH tv.film WHERE tv.termin.tnr IN :terminIds")
    List<Terminverknuepfung> findWithFilmsByTerminIds(@Param("terminIds") List<Long> terminIds);

}