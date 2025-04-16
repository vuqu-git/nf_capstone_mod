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

    @GetMapping("/plain/all")
    public ResponseEntity<List<TerminverknuepfungDTOSelection>> getAllTerminverknuepfung() {
        List<TerminverknuepfungDTOSelection> terminverknuepfungDTOSelection = terminverknuepfungService.getAllTerminverknuepfung();
        return ResponseEntity.ok(terminverknuepfungDTOSelection);
    }

    @GetMapping("/plain")
    public ResponseEntity<List<TerminverknuepfungDTOSelection>> getAllTVByOrderByTnrDesc() {
        List<TerminverknuepfungDTOSelection> terminverknuepfungDTOSelection = terminverknuepfungService.getAllTVByOrderByTnrDesc();
        return ResponseEntity.ok(terminverknuepfungDTOSelection);
    }

    @GetMapping("/plain/{tnr}/{fnr}")
    public ResponseEntity<TerminverknuepfungDTOSelection> getTerminverknuepfungById(@PathVariable Long tnr, @PathVariable Long fnr) {
        Terminverknuepfung.TerminverknuepfungId id = new Terminverknuepfung.TerminverknuepfungId(tnr, fnr);
        Optional<TerminverknuepfungDTOSelection> terminverknuepfungDTOSelection = terminverknuepfungService.getTerminverknuepfungById(id);
        return terminverknuepfungDTOSelection.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

//    // this simple adding/creating doesn't work because of the relationships of Terminverknuepfung entity!
//    @PostMapping
//    public ResponseEntity<Terminverknuepfung> createTerminverknuepfung(@RequestBody Terminverknuepfung terminverknuepfung) {
//        Terminverknuepfung createdTerminverknuepfung = terminverknuepfungService.saveTerminverknuepfung(terminverknuepfung);
//        return ResponseEntity.status(HttpStatus.CREATED).body(createdTerminverknuepfung);
//    }


    @PutMapping("/{tnr}/{fnr}")
    public ResponseEntity<TerminverknuepfungDTOSelection> updateTerminverknuepfung(
            @PathVariable Long tnr,
            @PathVariable Long fnr,
            @RequestBody TerminverknuepfungDTOSelection updatingTV) {

        TerminverknuepfungDTOSelection updated = terminverknuepfungService
                .updateTerminverknuepfung(tnr, fnr, updatingTV);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{tnr}/{fnr}")
    public ResponseEntity<Void> deleteTerminverknuepfung(@PathVariable Long tnr, @PathVariable Long fnr) {
        Terminverknuepfung.TerminverknuepfungId id = new Terminverknuepfung.TerminverknuepfungId(tnr, fnr);
        terminverknuepfungService.deleteTerminverknuepfung(id);
        return ResponseEntity.noContent().build();
    }

    // ###############################################

    // this is the usual add function for new Terminverknuepfung, but because of the relationships of
    // Terminverknuepfung entity, there a various versions of this add function, version here: link between existing Film and existing Termin
    @PostMapping("/link-film-termin")
    public ResponseEntity<String> linkExistingFilmToExistingTermin(@RequestBody TerminverknuepfungDTOSelection newTV) {
        try {
            terminverknuepfungService.linkExistingFilmToExistingTermin(newTV);
            return new ResponseEntity<>("Film with fnr " + newTV.fnr() + " linked to Termin with tnr " + newTV.tnr() + " successfully", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    @GetMapping()
    public ResponseEntity<List<TVWithFilmAndTerminDTOSelection>> getTVwithFilmAndTermin() {
        List<TVWithFilmAndTerminDTOSelection> result = terminverknuepfungService.getAllTVwithFilmAndTermin();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/{tnr}/{fnr}")
    public ResponseEntity<TVWithFilmAndTerminDTOSelection> getTVbyIds(
            @PathVariable Long tnr,
            @PathVariable Long fnr
    ) {
        return ResponseEntity.ok(terminverknuepfungService.getTVwithFilmAndTerminbyTnrAndFnr(tnr, fnr));
    }

    @GetMapping("/terminsorted")
    public ResponseEntity<List<TVWithFilmAndTerminDTOSelection>> getAllTVSortedByTermin() {
        return ResponseEntity.ok(
                terminverknuepfungService.getAllTVwithFilmAndTerminSortedByTermin()
        );
    }


}