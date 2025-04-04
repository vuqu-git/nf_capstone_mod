package org.pupille.backend.mysql.termin;

import java.time.LocalDateTime;

public interface TerminProjectionInterface {
    Long getTnr();
    LocalDateTime getTermin();
    String getTitel();
}
