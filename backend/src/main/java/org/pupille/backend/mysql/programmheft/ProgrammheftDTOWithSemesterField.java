package org.pupille.backend.mysql.programmheft;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import static org.pupille.backend.utils.PupilleUtils.formatSemesterFromLocalDateTermin;

@Data
@NoArgsConstructor
public class ProgrammheftDTOWithSemesterField {

    private Long pnr;
    private String titel;
    private String bild;
    private String pdf;
    private LocalDate gueltigVon;
    private LocalDate gueltigBis;
    private String semester;

    // Constructor that takes a Programmheft and maps all fields
    public ProgrammheftDTOWithSemesterField(Programmheft ph) {
        this.pnr = ph.getPnr();
        this.titel = ph.getTitel();
        this.bild = ph.getBild();
        this.pdf = ph.getPdf();
        this.gueltigVon = ph.getGueltigVon();
        this.gueltigBis = ph.getGueltigBis();
        this.semester = formatSemesterFromLocalDateTermin(ph.getGueltigBis()); // Compute the derived field
    }
}

