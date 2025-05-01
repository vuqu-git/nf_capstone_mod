package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;
import org.pupille.backend.mysql.termin.Termin;

import java.time.LocalDateTime;
import java.util.List;

public record TerminDTOWithFilmDTOOverviewSemester(
        Long terminId,
        LocalDateTime screeningTime,
        String titel,
        List<FilmDTOOverviewSemester> mainfilms,
        Integer screeningTotalDuration
) {
    public TerminDTOWithFilmDTOOverviewSemester(Termin termin, List<Film> films, Integer screeningTotalDuration) {
        this(
                termin.getTnr(),
                termin.getTermin(),
                termin.getTitel(),

                films.stream()
                        .map(FilmDTOOverviewSemester::new)
                        .toList(),

                screeningTotalDuration
        );
    }
}


//public record TerminDTOWithFilmDTOOverviewSemester(
//        Long terminId,
//        LocalDateTime screeningTime,
//        String titel,
//        List<FilmDTOOverviewSemester> mainfilms,
//        List<FilmDTOOverviewSemester> vorfilms,
//        Integer screeningTotalDuration
//) {
//        public TerminDTOWithFilmDTOOverviewSemester(Termin termin, List<Film> films, List<Film> vorfilms, Integer screeningTotalDuration) {
//        this(
//                termin.getTnr(),
//                termin.getTermin(),
//                termin.getTitel(),
//
//                films.stream()
//                        .map(FilmDTOOverviewSemester::new)
//                        .toList(),
//
//                vorfilms.stream()
//                        .map(FilmDTOOverviewSemester::new)
//                        .toList(),
//
//                screeningTotalDuration
//        );
//    }
//}