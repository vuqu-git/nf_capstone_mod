package org.pupille.backend.mysql.reihe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.pupille.backend.mysql.termin.TerminDTOWithMainfilms;

import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
public class ReiheDTOFormWithTermineAndFilme {
    private Long rnr;
    private String titel;
    private String text;
    private String sonderfarbe;

    private Set<TerminDTOWithMainfilms> termine;

    public ReiheDTOFormWithTermineAndFilme(Reihe r) {
        this.rnr = r.getRnr();
        this.titel = r.getTitel();
        this.text = r.getText();
        this.sonderfarbe = r.getSonderfarbe();

        // Important: Map the Set<Termin> entities to Set<TerminDTOWithMainfilms>
        if (r.getTermine() != null) {
            this.termine = r.getTermine().stream()
                    .map(TerminDTOWithMainfilms::new)
                    .sorted(Comparator.comparing(TerminDTOWithMainfilms::getVorstellungsbeginn))
                    .collect(Collectors.toCollection(LinkedHashSet::new));
        } else {
            this.termine = new LinkedHashSet<>();
        }
    }
}
