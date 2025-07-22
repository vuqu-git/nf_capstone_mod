package org.pupille.backend.mysql.screening;

import java.util.List;

public record ReihenAndFilmTermineForOverviewSemester(
        List<String> reihenSemester,
        List<TerminDTOWithFilmDTOOverviewSemester> termineSemester
) {
}
