package org.pupille.backend.mysql.reihe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.pupille.backend.mysql.termin.TerminDTOWithMainFilme;

import java.util.Comparator;
import java.util.LinkedHashSet;
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

    private Set<TerminDTOWithMainFilme> termine; // a Set of your lean TerminDTOSelections

    public ReiheDTOForFormWithTermineAndFilme(Reihe r) {
        this.rnr = r.getRnr();
        this.titel = r.getTitel();
        this.text = r.getText();
        this.farbe = r.getFarbe();

        // Important: Map the Set<Termin> entities to Set<TerminDTOWithMainFilme>
        if (r.getTermine() != null) {
            this.termine = r.getTermine().stream()
                    .map(TerminDTOWithMainFilme::new)
                    .sorted(Comparator.comparing(TerminDTOWithMainFilme::getVorstellungsbeginn))
                    .collect(Collectors.toCollection(LinkedHashSet::new));
        } else {
            this.termine = new LinkedHashSet<>();
        }
    }
}
