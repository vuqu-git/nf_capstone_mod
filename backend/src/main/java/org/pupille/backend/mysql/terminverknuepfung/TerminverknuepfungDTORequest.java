package org.pupille.backend.mysql.terminverknuepfung;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class TerminverknuepfungDTORequest {
    @NotNull
    private Long fnr;

    @NotNull
    private Long tnr;

    private Boolean vorfilm;

    private Short rang;
}

