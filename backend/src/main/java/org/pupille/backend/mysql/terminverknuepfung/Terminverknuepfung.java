package org.pupille.backend.mysql.terminverknuepfung;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

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

    public Terminverknuepfung(Long tnr, Long fnr, Boolean vorfilm, Short rang) {
        this.tnr = tnr;
        this.fnr = fnr;
        this.vorfilm = vorfilm;
        this.rang = rang;
    }
}