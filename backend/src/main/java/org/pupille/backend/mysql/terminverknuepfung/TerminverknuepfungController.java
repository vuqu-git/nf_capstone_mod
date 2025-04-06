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
    public ResponseEntity<List<Terminverknuepfung>> getAllTerminverknuepfung() {
        List<Terminverknuepfung> terminverknuepfung = terminverknuepfungService.getAllTerminverknuepfung();
        return ResponseEntity.ok(terminverknuepfung);
    }

    @GetMapping
    public ResponseEntity<List<Terminverknuepfung>> getAllTVByOrderByFnrDesc() {
        List<Terminverknuepfung> terminverknuepfung = terminverknuepfungService.getAllTVByOrderByFnrDesc();
        return ResponseEntity.ok(terminverknuepfung);
    }

    @GetMapping("/{tnr}/{fnr}")
    public ResponseEntity<Terminverknuepfung> getTerminverknuepfungById(@PathVariable Long tnr, @PathVariable Long fnr) {
        Terminverknuepfung.TerminverknuepfungId id = new Terminverknuepfung.TerminverknuepfungId(tnr, fnr);
        Optional<Terminverknuepfung> terminverknuepfung = terminverknuepfungService.getTerminverknuepfungById(id);
        return terminverknuepfung.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Terminverknuepfung> createTerminverknuepfung(@RequestBody Terminverknuepfung terminverknuepfung) {
        Terminverknuepfung createdTerminverknuepfung = terminverknuepfungService.saveTerminverknuepfung(terminverknuepfung);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTerminverknuepfung);
    }

    @PutMapping("/{tnr}/{fnr}")
    public ResponseEntity<Terminverknuepfung> updateTerminverknuepfung(@PathVariable Long tnr, @PathVariable Long fnr, @RequestBody Terminverknuepfung updatedTerminverknuepfung) {
        Terminverknuepfung.TerminverknuepfungId id = new Terminverknuepfung.TerminverknuepfungId(tnr, fnr);
        Optional<Terminverknuepfung> existingTerminverknuepfung = terminverknuepfungService.getTerminverknuepfungById(id);
        if (existingTerminverknuepfung.isPresent()) {
            updatedTerminverknuepfung.setTnr(tnr);
            updatedTerminverknuepfung.setFnr(fnr);
            Terminverknuepfung savedTerminverknuepfung = terminverknuepfungService.saveTerminverknuepfung(updatedTerminverknuepfung);
            return ResponseEntity.ok(savedTerminverknuepfung);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{tnr}/{fnr}")
    public ResponseEntity<Void> deleteTerminverknuepfung(@PathVariable Long tnr, @PathVariable Long fnr) {
        Terminverknuepfung.TerminverknuepfungId id = new Terminverknuepfung.TerminverknuepfungId(tnr, fnr);
        terminverknuepfungService.deleteTerminverknuepfung(id);
        return ResponseEntity.noContent().build();
    }
}