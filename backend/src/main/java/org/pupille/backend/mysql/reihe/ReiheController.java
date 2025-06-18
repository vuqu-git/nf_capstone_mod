package org.pupille.backend.mysql.reihe;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reihe")
public class ReiheController {

    @Autowired
    private ReiheRepository reiheRepository;

    @Autowired
    private ReiheService reiheService;

    @GetMapping("/all")
    public ResponseEntity<List<ReiheDTOSelection>> getAllReihen() {
        return ResponseEntity.ok(reiheService.getAllReihen());
    }

//    @GetMapping("/{rnr}")
//    public ResponseEntity<Reihe> getReiheById(@PathVariable Long rnr) {
//        return ResponseEntity.ok(reiheService.getReiheById(rnr));
//    }

    @GetMapping("/{rnr}")
    public ResponseEntity<ReiheDTOForFormWithTermineAndFilme> getReiheById(@PathVariable Long rnr) {
        return ResponseEntity.ok(new ReiheDTOForFormWithTermineAndFilme( reiheService.getReiheById(rnr) ));
    }

    @PostMapping
    public ResponseEntity<Reihe> createReihe(@RequestBody Reihe reihe) {
        return ResponseEntity.ok(reiheService.createReihe(reihe));
    }

    @PutMapping("/{rnr}")
    public ResponseEntity<Reihe> updateReihe(@PathVariable Long rnr, @RequestBody Reihe reihe) {
        return ResponseEntity.ok(reiheService.updateReihe(rnr, reihe));
    }

    @DeleteMapping("/{rnr}")
    public ResponseEntity<Void> deleteReihe(@PathVariable Long rnr) {
        reiheService.deleteReihe(rnr);
        return ResponseEntity.noContent().build();
    }

    // #####################################################################
    // --- Add Termin to Reihe ---
    @PostMapping("/{rnr}/termine/{tnr}")
    public ResponseEntity<Reihe> addTerminToReihe(
            @PathVariable Long rnr,
            @PathVariable Long tnr) {
        Reihe updated = reiheService.addTerminToReihe(rnr, tnr);
        return ResponseEntity.ok(updated);
    }
}
