package org.pupille.backend.mysql.termin;

import java.time.LocalDateTime;

public interface TerminProjectionSelection {
    Long getTnr();
    LocalDateTime getVorstellungsbeginn();
    String getTitel();
}
