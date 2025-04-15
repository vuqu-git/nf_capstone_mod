package org.pupille.backend.mysql.terminverknuepfung;

import org.pupille.backend.mysql.film.FilmDTOSelection;
import org.pupille.backend.mysql.termin.TerminProjectionSelection;

//import java.time.LocalDateTime;

public record TVwithFilmAndTerminDTOSelection(
        Long tnr,
        Long fnr,
        Boolean vorfilm,
        Short rang,
        FilmDTOSelection film,
        TerminProjectionSelection termin
) {
    // this part moved to the service method getAllTVwithFilmAndTermin
//    public TVwithFilmAndTerminDTOSelection(Terminverknuepfung tv) {
//        this(
//                tv.getTnr(),
//                tv.getFnr(),
//                tv.getVorfilm(),
//                tv.getRang(),
//                tv.getFilm() != null ? new FilmDTOSelection(tv.getFilm()) : null,
//
//                tv.getTermin() != null ? new TerminProjectionSelection() {
//                    @Override public Long getTnr() { return tv.getTermin().getTnr(); }
//                    @Override public LocalDateTime getTermin() { return tv.getTermin().getTermin(); }
//                    @Override public String getTitel() { return tv.getTermin().getTitel(); }
//                } : null
//        );
//    }
}