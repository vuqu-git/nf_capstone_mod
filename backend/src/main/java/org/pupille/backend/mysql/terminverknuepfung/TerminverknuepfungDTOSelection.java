package org.pupille.backend.mysql.terminverknuepfung;

public record TerminverknuepfungDTOSelection(
        Long tnr,
        Long fnr,
        Boolean vorfilm,
        Short rang
) {
    public TerminverknuepfungDTOSelection(Terminverknuepfung tv) {
        this(
                tv.getTnr(),
                tv.getFnr(),
                tv.getVorfilm(),
                tv.getRang()
        );
    }
}
