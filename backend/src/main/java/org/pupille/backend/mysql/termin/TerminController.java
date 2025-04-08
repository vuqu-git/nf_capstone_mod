package org.pupille.backend.mysql.termin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/termine")
public class TerminController {

    private final TerminService terminService;

    @Autowired
    public TerminController(TerminService terminService) {
        this.terminService = terminService;
    }

    @GetMapping
    public ResponseEntity<List<Termin>> getAllTermine() {
        return new ResponseEntity<>(terminService.getAllTermine(), HttpStatus.OK);
    }

    @GetMapping("/allsorted")
    public ResponseEntity<List<TerminProjectionSelection>> getAllTermineByOrderByTitelAsc() {
        List<TerminProjectionSelection> termine = terminService.getAllTermineByOrderByTerminDesc();
        return ResponseEntity.ok(termine);
    }

    @GetMapping("/{tnr}")
    public ResponseEntity<TerminDTOForm> getTerminById(@PathVariable Integer tnr) {
        Optional<TerminDTOForm> terminDTOForm = terminService.getTerminById(tnr);
        return terminDTOForm.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Termin> createTermin(@RequestBody Termin termin) {
        return new ResponseEntity<>(terminService.createTermin(termin), HttpStatus.CREATED);
    }

    @PutMapping("/{tnr}")
    public ResponseEntity<Termin> updateTermin(@PathVariable Integer tnr, @RequestBody Termin termin) {
        return new ResponseEntity<>(terminService.updateTermin(tnr, termin), HttpStatus.OK);
    }

    @DeleteMapping("/{tnr}")
    public ResponseEntity<Void> deleteTermin(@PathVariable Integer tnr) {
        terminService.deleteTermin(tnr);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    ###########################################################

    @GetMapping("/futurea")
    public ResponseEntity<List<Termin>> getFutureTermineAsEntities() {
        List<Termin> futureTermine = terminService.getFutureTermine();
        return ResponseEntity.ok(futureTermine);
    }

    @GetMapping("/futurep")
    public ResponseEntity<List<TerminProjectionSelection>> getFutureTermineAsProjections() {
        List<TerminProjectionSelection> futureTermine = terminService.getFutureTermineProjected();
        return ResponseEntity.ok(futureTermine);
    }


//    ###########################################################

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleNotFoundException(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}