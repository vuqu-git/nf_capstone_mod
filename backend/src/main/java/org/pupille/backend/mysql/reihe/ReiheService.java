package org.pupille.backend.mysql.reihe;

import org.pupille.backend.mysql.termin.Termin;
import org.pupille.backend.mysql.termin.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReiheService {
    @Autowired
    private ReiheRepository reiheRepository;

    @Autowired
    private TerminRepository terminRepository;

    // --- Create ---
    public Reihe createReihe(Reihe reihe) {
        return reiheRepository.save(reihe);
    }

    // --- Read all ---
    public List<ReiheDTOSelection> getAllReihen() {
        return reiheRepository.findAll(Sort.by(Sort.Direction.ASC, "titel")) // use JpaRepository's built-in sorting instead of defining a custom query in ReiheRepository
                .stream()
                .map(ReiheDTOSelection::new)
                .collect(Collectors.toList());
    }

    // --- Read one ---
    public Reihe getReiheById(Long id) {
        return reiheRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reihe not found"));
    }

    // --- Update ---
    public Reihe updateReihe(Long id, Reihe updatedReihe) {
        Reihe existing = getReiheById(id);
        existing.setTitel(updatedReihe.getTitel());
        existing.setText(updatedReihe.getText());
        existing.setFarbe(updatedReihe.getFarbe());
        // Optional: update Termine or skip it here
        return reiheRepository.save(existing);
    }

    // --- Delete ---
    public void deleteReihe(Long id) {
        Reihe reihe = getReiheById(id);
        reiheRepository.delete(reihe);
    }


    // #####################################################################
    // --- Add Termin to Reihe ---
    public Reihe addTerminToReihe(Long reiheId, Long terminId) {

        Reihe reihe = getReiheById(reiheId);

        Termin termin = terminRepository.findById(terminId)
                .orElseThrow(() -> new RuntimeException("Termin not found"));

        reihe.getTermine().add(termin);
        // For bidirectional consistency (optional but recommended):
        termin.getReihen().add(reihe);

        // Save the owning side (reihe)
        return reiheRepository.save(reihe);
    }
}