package org.pupille.backend.mysql.termin;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class TerminDTOForm {

    private Long tnr;
    private LocalDateTime termin;
    private String titel;
    private String text;
    private String kurztext;
    private String besonderheit;
    private LocalDate startReservierung;
    private String linkReservierung;
    private Integer sonderfarbeTitel;
    private Integer sonderfarbe;
    private Short veroeffentlichen;
    // Note: filmConnections are intentionally excluded

    public TerminDTOForm(Termin termin) {
        this.tnr = termin.getTnr();
        this.termin = termin.getTermin();
        this.titel = termin.getTitel();
        this.text = termin.getText();
        this.kurztext = termin.getKurztext();
        this.besonderheit = termin.getBesonderheit();
        this.startReservierung = termin.getStartReservierung();
        this.linkReservierung = termin.getLinkReservierung();
        this.sonderfarbeTitel = termin.getSonderfarbeTitel();
        this.sonderfarbe = termin.getSonderfarbe();
        this.veroeffentlichen = termin.getVeroeffentlichen();
        // Note: filmConnections are intentionally excluded
    }
}