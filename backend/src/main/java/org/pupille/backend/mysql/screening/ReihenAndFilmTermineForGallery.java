package org.pupille.backend.mysql.screening;

import java.util.List;

public record ReihenAndFilmTermineForGallery(
        List<String> reihenSemester,
        List<TerminDTOWithFilmAndReiheDTOGallery> termineSemester
) {
}
