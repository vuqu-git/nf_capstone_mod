package org.pupille.backend.mysql.reihe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.pupille.backend.mysql.termin.TerminDTOWithFilme;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
public class ReiheDTOForFormWithTermineAndFilme {
    private Long rnr;
    private String titel;
    private String text;
    private String farbe;

    private Set<TerminDTOWithFilme> termine; // a Set of your lean TerminDTOSelections

    public ReiheDTOForFormWithTermineAndFilme(Reihe r) {
        this.rnr = r.getRnr();
        this.titel = r.getTitel();
        this.text = r.getText();
        this.farbe = r.getFarbe();

        // Important: Map the Set<Termin> entities to Set<TerminDTO>
        if (r.getTermine() != null) {
            this.termine = r.getTermine().stream()
                    .map(TerminDTOWithFilme::new) // Use the TerminDTO constructor to map
                    .collect(Collectors.toSet());
        } else {
            this.termine = new HashSet<>(); // Ensure it's never null
        }
    }
}
