package org.pupille.backend.mysql.terminverknuepfung;

import org.pupille.backend.utils.PupilleUtils;

public record TVWithFilmAndTerminDTOSelection(
        Long tnr,          // the one from Terminverknuepfung
        Long fnr,          // the one from Terminverknuepfung
        Boolean vorfilm,
        Short rang,
        FilmProjectionForTVSelection film,
        TerminProjectionForTVSelection termin
) {
    public TVWithFilmAndTerminDTOSelection(Terminverknuepfung tv) {
        this(
                tv.getTnr(),
                tv.getFnr(),
                tv.getVorfilm(),
                tv.getRang(),
                new FilmProjectionForTVSelection(
                        tv.getFilm().getTitel(),
                        tv.getFilm().getJahr(),
                        (tv.getFilm().getRegie() == null || tv.getFilm().getRegie().isEmpty()) ? PupilleUtils.extractDirectors(tv.getFilm().getStab()) : tv.getFilm().getRegie()
                ),
                new TerminProjectionForTVSelection(
                        tv.getTermin().getVorstellungsbeginn(),
                        tv.getTermin().getTitel()
                )
        );
    }

}