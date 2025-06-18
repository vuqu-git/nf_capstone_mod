package org.pupille.backend.mysql.reihe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReiheRepository extends JpaRepository<Reihe, Long> {

//    @Query("SELECT r.rnr as rnr, r.titel as titel, r.text as text, r.farbe as farbe, " +
//            "t.tnr as termine_tnr, t.vorstellungsbeginn as termine_vorstellungsbeginn, t.titel as termine_titel " +
//            "FROM Reihe r LEFT JOIN r.termine t WHERE r.rnr = :rnr")
//    Optional<ReiheWithTermineProjection> findReiheWithProjectedTermineById(@Param("rnr") Long rnr);

}
