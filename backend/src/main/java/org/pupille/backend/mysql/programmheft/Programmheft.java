package org.pupille.backend.mysql.programmheft;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "programmheft")
public class Programmheft {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(nullable = false)
        private Long pnr;

        private String titel;

        private String bild;

        @Column(name = "programmheft", nullable = false)
        private String programmPdf;

        @Column(name = "gueltig_von", nullable = false)
        private LocalDate gueltigVon;

        @Column(name = "gueltig_bis", nullable = false)
        private LocalDate gueltigBis;
}
