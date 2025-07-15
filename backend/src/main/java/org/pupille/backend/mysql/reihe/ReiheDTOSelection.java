package org.pupille.backend.mysql.reihe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

// DTO for selection field

@Getter
@Setter
@AllArgsConstructor
public class ReiheDTOSelection {
    private Long rnr;
    private String titel;

    public ReiheDTOSelection(Reihe r) {
        this.rnr = r.getRnr();
        this.titel = r.getTitel();
    }
}
