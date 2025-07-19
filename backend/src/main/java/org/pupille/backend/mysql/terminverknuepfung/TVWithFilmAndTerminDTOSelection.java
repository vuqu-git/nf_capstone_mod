package org.pupille.backend.mysql.terminverknuepfung;

import org.pupille.backend.utils.DirectorExtractorUtils;

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
//                        DirectorExtractorUtils.extractDirectors(tv.getFilm().getStab())
                        (tv.getFilm().getRegie() == null || tv.getFilm().getRegie().isEmpty()) ? DirectorExtractorUtils.extractDirectors(tv.getFilm().getStab()) : tv.getFilm().getRegie()
                ),
                new TerminProjectionForTVSelection(
                        tv.getTermin().getVorstellungsbeginn(),
                        tv.getTermin().getTitel()
                )
        );
    }

}