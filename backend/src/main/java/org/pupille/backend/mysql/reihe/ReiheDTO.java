package org.pupille.backend.mysql.reihe;

import org.pupille.backend.mysql.termin.Termin;

import java.util.HashSet;
import java.util.Set;

public class ReiheDTO {
    private Long rnr;
    private String titel;
    private String text;
    private String farbe;
    private Set<Termin> termine;

    public ReiheDTO(Reihe reihe) {
        this.rnr = reihe.getRnr();
        this.titel = reihe.getTitel();
        this.text = reihe.getText();
        this.farbe = reihe.getFarbe();
        this.termine = new HashSet<>(reihe.getTermine()); // Defensive copy
    }
}
