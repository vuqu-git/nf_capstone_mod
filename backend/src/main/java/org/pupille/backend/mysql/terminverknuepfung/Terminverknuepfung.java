package org.pupille.backend.mysql.terminverknuepfung;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.pupille.backend.mysql.film.Film;
import org.pupille.backend.mysql.termin.Termin;

import java.io.Serializable;

@Entity
@Table(name = "terminverknuepfung")
@IdClass(Terminverknuepfung.TerminverknuepfungId.class)
@Data
@NoArgsConstructor
public class Terminverknuepfung implements Serializable {

    @Id
    @Column(name = "tnr")
    private Long tnr;

    @Id
    @Column(name = "fnr")
    private Long fnr;

    @Column(name = "vorfilm")
    private Boolean vorfilm;

    @Column(name = "rang")
    private Short rang;

    public Terminverknuepfung(Long tnr, Long fnr, Boolean vorfilm, Short rang) {
        this.tnr = tnr;
        this.fnr = fnr;
        this.vorfilm = vorfilm;
        this.rang = rang;
    }


    @Data
    @NoArgsConstructor
    @EqualsAndHashCode
    public static class TerminverknuepfungId implements Serializable {
        private Long tnr;
        private Long fnr;

        public TerminverknuepfungId(Long tnr, Long fnr) {
            this.tnr = tnr;
            this.fnr = fnr;
        }
    }


    // ############################################
    // relationship (extension of the entity model)
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("fnr") // Maps composite key component
    @JoinColumn(name = "fnr", insertable = false, updatable = false)
    private Film film;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tnr")  // Maps composite key component
    @JoinColumn(name = "tnr", insertable = false, updatable = false)
    private Termin termin;
    // ############################################
}