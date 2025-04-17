package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.FilmDTOForm;
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

    @GetMapping("/screenings")
    public List<TerminDTOWithFilmDTOOverviews> getFutureTermineWithFilms() {
        return screeningService.getFutureTermineWithFilms();
    }

//    // not required because the list doesn't contain any termin data
//    @GetMapping("/screeningsold/{tnr}")
//    public ResponseEntity<List<FilmDTOForm>> getFilmsForTermin(@PathVariable Long tnr) {
//        List<FilmDTOForm> films = screeningService.getFilmsByTerminId(tnr);
//        return ResponseEntity.ok(films);
//    }

    @GetMapping("/screenings/{tnr}")
    public ResponseEntity<TerminDTOFormWithFilmsDTOFormPlus> getTerminWithFilmsPlusForTermin(@PathVariable Long tnr) {
        TerminDTOFormWithFilmsDTOFormPlus terminWithFilmsPlus = screeningService.getTerminWithFilmsPlusByTerminId(tnr);
        return ResponseEntity.ok(terminWithFilmsPlus);
    }
}
