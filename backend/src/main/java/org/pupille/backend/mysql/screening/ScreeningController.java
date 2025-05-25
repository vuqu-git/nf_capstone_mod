package org.pupille.backend.mysql.screening;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    @GetMapping("/screenings/archive")
    public List<TerminDTOWithFilmDTOOverviewArchive> getArchiveScreenings() {
        return screeningService.getPastTermineWithFilms();
    }

    // for SemesterArchive react component
    @GetMapping("/screenings/semester")
    public List<TerminDTOWithFilmDTOOverviewSemester> getCurrentSemesterScreenings() {
        return screeningService.getTermineByCurrentSemester();
    }

    // For Slideshow react component
//    @GetMapping("/screenings/slideshow")
//    public List<TerminDTOWithFilmDTOSlideshow> getFutureTermineWithFilmsForSlideshow() {
//        List<TerminDTOWithFilmDTOSlideshow> termineWithFilms = screeningService.getFutureTermineWithFilmsForSlideshow();
//        return termineWithFilms;
//    }

    @GetMapping("/screenings/slideshow")
    public List<TerminDTOWithFilmDTOSlideshow> getFutureTermineWithFilmsForSlideshow(
            @RequestParam(value = "next", required = false) Optional<Integer> next
    ) {
        return screeningService.getFutureTermineWithFilmsForSlideshow(next);
    }

//    +++++++++++++++++++++++++++++
//    reminder stuff
//    +++++++++++++++++++++++++++++

    // For screenings exactly N days in the future
    @GetMapping("/screenings/future/{days}")
    public List<TerminDTOWithFilmDTOGallery> getScreeningsDaysInFuture(@PathVariable int days) {
        return screeningService.getTermineDaysInFuture(days);
    }

    // For screenings exactly N days in the past
    @GetMapping("/screenings/past/{days}")
    public List<TerminDTOWithFilmDTOGallery> getScreeningsDaysInPast(@PathVariable int days) {
        return screeningService.getTermineDaysInPast(days);
    }


}
