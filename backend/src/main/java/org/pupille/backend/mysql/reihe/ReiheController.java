package org.pupille.backend.mysql.reihe;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/reihe")
@RequiredArgsConstructor
public class ReiheController {

    private final ReiheService reiheService;

    @GetMapping()
    public ResponseEntity<List<ReiheDTOSelection>> getAllReihen() {
        return ResponseEntity.ok(reiheService.getAllReihen());
    }

    @GetMapping("/{rnr}")
    public ResponseEntity<ReiheDTOForFormWithTermineAndFilme> getReiheById(@PathVariable Long rnr) {
        return ResponseEntity.ok(reiheService.getReiheDTOForFormById(rnr));
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
    // --- Get a list of Reihen (with Termine & Films) for a given Tnr ---
    @GetMapping("/from-termin/{tnr}")
    public ResponseEntity<List<ReiheDTOForFormWithTermineAndFilme>> getReihenByTerminId(@PathVariable Long tnr) {
        return ResponseEntity.ok(reiheService.getReihenDTOsByTerminId(tnr));
    }

    // #####################################################################
    // --- Add Termin to Reihe ---
    @PostMapping("/{rnr}/termin/{tnr}")
    public ResponseEntity<Reihe> addTerminToReihe(
            @PathVariable Long rnr,
            @PathVariable Long tnr) {
        Reihe updated = reiheService.addTerminToReihe(rnr, tnr);
        return ResponseEntity.ok(updated);
    }

    // --- Delete Termin from Reihe ---
    @DeleteMapping("/{rnr}/termin/{tnr}")
    public ResponseEntity<Void> removeTerminFromReihe(
            @PathVariable Long rnr,
            @PathVariable Long tnr) {
        try {
            reiheService.removeTerminFromReihe(rnr, tnr);
            return ResponseEntity.noContent().build(); // 204 No Content for successful deletion
        } catch (NoSuchElementException e) {
            // This catches "Reihe not found", "Termin not found", or "Connection not found"
            return ResponseEntity.notFound().build(); // 404 Not Found
        }
    }
}
