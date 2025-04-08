package org.pupille.backend.mysql.terminverknuepfung;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/terminverknuepfung")
public class TerminverknuepfungController {

    private final TerminverknuepfungService terminverknuepfungService;

    @Autowired
    public TerminverknuepfungController(TerminverknuepfungService terminverknuepfungService) {
        this.terminverknuepfungService = terminverknuepfungService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TerminverknuepfungDTOSelection>> getAllTerminverknuepfung() {
        List<TerminverknuepfungDTOSelection> terminverknuepfungDTOSelection = terminverknuepfungService.getAllTerminverknuepfung();
        return ResponseEntity.ok(terminverknuepfungDTOSelection);
    }

    @GetMapping
    public ResponseEntity<List<TerminverknuepfungDTOSelection>> getAllTVByOrderByFnrDesc() {
        List<TerminverknuepfungDTOSelection> terminverknuepfungDTOSelection = terminverknuepfungService.getAllTVByOrderByFnrDesc();
        return ResponseEntity.ok(terminverknuepfungDTOSelection);
    }

    @GetMapping("/{tnr}/{fnr}")
    public ResponseEntity<TerminverknuepfungDTOSelection> getTerminverknuepfungById(@PathVariable Long tnr, @PathVariable Long fnr) {
        Terminverknuepfung.TerminverknuepfungId id = new Terminverknuepfung.TerminverknuepfungId(tnr, fnr);
        Optional<TerminverknuepfungDTOSelection> terminverknuepfungDTOSelection = terminverknuepfungService.getTerminverknuepfungById(id);
        return terminverknuepfungDTOSelection.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Terminverknuepfung> createTerminverknuepfung(@RequestBody Terminverknuepfung terminverknuepfung) {
        Terminverknuepfung createdTerminverknuepfung = terminverknuepfungService.saveTerminverknuepfung(terminverknuepfung);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTerminverknuepfung);
    }

//    @PutMapping("/{tnr}/{fnr}")
//    public ResponseEntity<Terminverknuepfung> updateTerminverknuepfung(@PathVariable Long tnr, @PathVariable Long fnr, @RequestBody Terminverknuepfung updatedTerminverknuepfung) {
//        Terminverknuepfung.TerminverknuepfungId id = new Terminverknuepfung.TerminverknuepfungId(tnr, fnr);
//        Optional<Terminverknuepfung> existingTerminverknuepfung = terminverknuepfungService.getTerminverknuepfungById(id);
//        if (existingTerminverknuepfung.isPresent()) {
//            updatedTerminverknuepfung.setTnr(tnr);
//            updatedTerminverknuepfung.setFnr(fnr);
//            Terminverknuepfung savedTerminverknuepfung = terminverknuepfungService.saveTerminverknuepfung(updatedTerminverknuepfung);
//            return ResponseEntity.ok(savedTerminverknuepfung);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }

    @DeleteMapping("/{tnr}/{fnr}")
    public ResponseEntity<Void> deleteTerminverknuepfung(@PathVariable Long tnr, @PathVariable Long fnr) {
        Terminverknuepfung.TerminverknuepfungId id = new Terminverknuepfung.TerminverknuepfungId(tnr, fnr);
        terminverknuepfungService.deleteTerminverknuepfung(id);
        return ResponseEntity.noContent().build();
    }

    //    ###############################################

    @PostMapping("/{filmId}/filmlinkstotermin/{terminId}")
    public ResponseEntity<String> linkExistingFilmToExistingTermin(
            @PathVariable Long filmId,
            @PathVariable Long terminId) {
        try {
            // Assuming you have a service method for this purpose
            terminverknuepfungService.linkExistingFilmToExistingTermin(filmId, terminId);
            return new ResponseEntity<>("Film with fnr " + filmId + " linked to Termin with tnr " + terminId + " successfully", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/link-film-termin")
    public ResponseEntity<String> linkFilmToTermin(@RequestBody TerminverknuepfungDTORequest request) {
        try {
            terminverknuepfungService.linkExistingFilmToExistingTerminReq(request);
            return new ResponseEntity<>("Film with fnr " + request.getFnr() + " linked to Termin with tnr " + request.getTnr() + " successfully", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}