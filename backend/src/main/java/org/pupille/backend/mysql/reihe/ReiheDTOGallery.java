package org.pupille.backend.mysql.reihe;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

// DTO for gallery (field in TerminDTOWithFilmDTOGallery)

@Getter
@Setter
@AllArgsConstructor
public class ReiheDTOGallery {
    private Long rnr;
    private String titel;
    private String sonderfarbe;

    public ReiheDTOGallery(Reihe r) {
        this.rnr = r.getRnr();
        this.titel = r.getTitel();
        this.sonderfarbe = r.getSonderfarbe();
    }
}
