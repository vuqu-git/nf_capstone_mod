package org.pupille.backend.mysql.terminverknuepfung;

//import java.time.LocalDateTime;

//public record TVwithFilmAndTerminDTOSelection(
////        Long tnr,
////        Long fnr,
////        Boolean vorfilm,
////        Short rang,
////        FilmDTOSelection film,
////        TerminProjectionSelection termin
////) {
////    // this part moved to the service method getAllTVWithFilmAndTermin
//////    public TVwithFilmAndTerminDTOSelection(Terminverknuepfung tv) {
//////        this(
//////                tv.getTnr(),
//////                tv.getFnr(),
//////                tv.getVorfilm(),
//////                tv.getRang(),
//////                tv.getFilm() != null ? new FilmDTOSelection(tv.getFilm()) : null,
//////
//////                tv.getTermin() != null ? new TerminProjectionSelection() {
//////                    @Override public Long getTnr() { return tv.getTermin().getTnr(); }
//////                    @Override public LocalDateTime getTermin() { return tv.getTermin().getTermin(); }
//////                    @Override public String getTitel() { return tv.getTermin().getTitel(); }
//////                } : null
//////        );
//////    }
////}

public record TVWithFilmAndTerminDTOSelection(
        Long tnr,          // From Terminverknuepfung
        Long fnr,          // From Terminverknuepfung
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
                        extractDirectors(tv.getFilm().getStab())
                ),
                new TerminProjectionForTVSelection(
                        tv.getTermin().getVorstellungsbeginn(),
                        tv.getTermin().getTitel()
                )
        );
    }

    //    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
    // utils function
    public static String extractDirectors(String stab) {
        if (stab == null || stab.isEmpty()) return "";

        // Normalize line endings
        String[] lines = stab.replace("\r\n", "\n").replace('\r', '\n').split("\n");

        // List of possible director field prefixes (add more as needed)
        String[] directorPrefixes = {
                "Regie:", "R:", "R, B&S:", "B,R&amp;S:", "R&S:", "R&amp;S:", "B&R:", "B&amp;R:", "B,R&S:","B,R&amp;S:", "B,R&K:", "B,R&amp;K:", "B,R:", "Buch & Regie:", "Buch &amp; Regie:", "Buch und Regie:",
                "Buch, Regie & Produktion:", "Buch, Regie &amp; Produktion:", "B&R&S:" , "B&amp;R&amp;S:", "B&R&K:" , "B&amp;R&amp;K:", "B&R&K&S:" , "B&amp;R&amp;K&amp;S:", "B,R&K&S:", "B,R&amp;K&amp;S:", "B,R&K:" , "B,R&amp;K:", "B,R:", "B&R:", "B&amp;R:", "Buch, Regie:"
        };

        for (String line : lines) {
            String trimmed = line.trim();
            for (String prefix : directorPrefixes) {
                if (trimmed.startsWith(prefix)) {
                    // Extract after prefix and trim
                    return trimmed.substring(prefix.length()).trim();
                }
            }
        }

        // Fallback: try to match "R:" at the start of any line
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.startsWith("R:")) {
                return trimmed.substring(2).trim();
            }
        }

        // Fallback: try to match "Regie:" at the start of any line
        for (String line : lines) {
            String trimmed = line.trim();
            if (trimmed.startsWith("Regie:")) {
                return trimmed.substring(6).trim();
            }
        }

        // If nothing found, return null
        return null;
    }
    //    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

}