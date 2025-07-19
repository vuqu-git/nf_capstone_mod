package org.pupille.backend.mysql.termin;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/termine")
@RequiredArgsConstructor
public class TerminController {

    private final TerminService terminService;

//    @GetMapping
//    public ResponseEntity<List<TerminDTOForm>> getAllTermine() {
//        return new ResponseEntity<>(terminService.getAllTermine(), HttpStatus.OK);
//    }

    @GetMapping("/allsorted")
    public ResponseEntity<List<TerminProjectionSelection>> getAllTermineByOrderByVorstellungsbeginnDesc() {
        List<TerminProjectionSelection> termine = terminService.getAllTermineByOrderByVorstellungsbeginnDesc();
        return ResponseEntity.ok(termine);
    }

    @GetMapping("/allwithmainfilms")
    public ResponseEntity<List<TerminDTOWithMainFilme>> getAllTermineWithMainfilmsByOrderByVorstellungsbeginnDesc() {
        List<TerminDTOWithMainFilme> termineWithMainfilme = terminService.getAllTermineWithMainfilmeByOrderByVorstellungsbeginnDesc();
        return ResponseEntity.ok(termineWithMainfilme);
    }

    @GetMapping("/{tnr}")
    public ResponseEntity<TerminDTOForm> getTerminById(@PathVariable Long tnr) {
        Optional<TerminDTOForm> terminDTOForm = terminService.getTerminById(tnr);
        return terminDTOForm.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<TerminDTOForm> createTermin(@RequestBody Termin termin) {
        return new ResponseEntity<>(terminService.createTermin(termin), HttpStatus.CREATED);
    }

    @PutMapping("/{tnr}")
    public ResponseEntity<TerminDTOForm> updateTermin(@PathVariable Long tnr, @RequestBody Termin termin) {
        return new ResponseEntity<>(terminService.updateTermin(tnr, termin), HttpStatus.OK);
    }

    @DeleteMapping("/{tnr}")
    public ResponseEntity<Void> deleteTermin(@PathVariable Long tnr) {
        terminService.deleteTermin(tnr);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    ###########################################################
////  Just for testing purposes
//    @GetMapping("/futurea")
//    public ResponseEntity<List<TerminDTOForm>> getFutureTermineAsEntities() {
//        List<TerminDTOForm> futureTermine = terminService.getAllFutureTermine();
//        return ResponseEntity.ok(futureTermine);
//    }
//
////  Just for testing purposes
//    @GetMapping("/futurep")
//    public ResponseEntity<List<TerminProjectionSelection>> getFutureTermineAsProjections() {
//        List<TerminProjectionSelection> futureTermine = terminService.getAllFutureTermineProjected();
//        return ResponseEntity.ok(futureTermine);
//    }
//    ###########################################################

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleNotFoundException(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}