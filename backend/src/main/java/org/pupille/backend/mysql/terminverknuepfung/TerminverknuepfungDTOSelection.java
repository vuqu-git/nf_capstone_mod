package org.pupille.backend.mysql.terminverknuepfung;

public record TerminverknuepfungDTOSelection(
        Long tnr,
        Long fnr,
        Boolean vorfilm,
        Short rang
        // omitted are film and termin field for relationship
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
