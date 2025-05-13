package org.pupille.backend.mysql.screening;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ScreeningController {

    @Autowired
    private ScreeningService screeningService;

    // for Gallery react component
    @GetMapping("/screenings")
    public List<TerminDTOWithFilmDTOGallery> getFutureTermineWithFilms() {
        return screeningService.getFutureTermineWithFilms();
    }

    // for ScreeningDetails react component
    @GetMapping("/screenings/{tnr}")
    public ResponseEntity<TerminDTOFormWithFilmsDTOFormPlus> getTerminWithFilmsPlusForTermin(@PathVariable Long tnr) {
        TerminDTOFormWithFilmsDTOFormPlus terminWithFilmsPlus = screeningService.getTerminWithFilmsPlusByTerminId(tnr);
        return ResponseEntity.ok(terminWithFilmsPlus);
    }

    // for OverviewArchive react component
    @GetMapping("/screenings-archive")
    public List<TerminDTOWithFilmDTOOverviewArchive> getArchiveScreenings() {
        return screeningService.getPastTermineWithFilms();
    }

    // for SemesterArchive react component
    @GetMapping("/screenings-semester")
    public List<TerminDTOWithFilmDTOOverviewSemester> getCurrentSemesterScreenings() {
        return screeningService.getTermineByCurrentSemester();
    }
}
