package org.pupille.backend.mysql.reihe;

import org.pupille.backend.mysql.termin.Termin;
import org.pupille.backend.mysql.termin.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ReiheService {
    @Autowired
    private ReiheRepository reiheRepository;

    @Autowired
    private TerminRepository terminRepository;

    // This method now benefits from @EntityGraph in repo method findAll(Sort)
    @Transactional(readOnly = true) // Good practice for read-only operations
    public List<ReiheDTOSelection> getAllReihen() {
        return reiheRepository.findAll(Sort.by(Sort.Direction.ASC, "titel")) // use JpaRepository's built-in sorting instead of defining a custom query in ReiheRepository
                .stream()
                .map(ReiheDTOSelection::new)
                .collect(Collectors.toList());
    }

    // --- Read one and convert to DTO (Recommended pattern) ---
    // This method now benefits from @EntityGraph in findById(Long)
    @Transactional(readOnly = true) // Good practice for read-only operations
    public ReiheDTOForFormWithTermineAndFilme getReiheDTOForFormById(Long id) {
        Reihe reihe = reiheRepository.findById(id) // This will eagerly fetch 'termine' due to @EntityGraph
                .orElseThrow(() -> new RuntimeException("Reihe not found"));
        // The DTO conversion happens here, within the open transaction, but the data
        // was already fetched in one go by the repository.
        return new ReiheDTOForFormWithTermineAndFilme(reihe);
    }

    // other service methods us this method, which returns a Reihe object
    // This method now benefits from @EntityGraph in findById(Long)
    @Transactional(readOnly = true)
    public Reihe getReiheById(Long id) {
        return reiheRepository.findById(id) // This will still use the @EntityGraph version
                .orElseThrow(() -> new RuntimeException("Reihe not found"));
    }

    @Transactional // Ensure write operations are transactional
    public Reihe createReihe(Reihe reihe) {
        return reiheRepository.save(reihe);
    }

    @Transactional // Ensure write operations are transactional
    public Reihe updateReihe(Long id, Reihe updatedReihe) {
        Reihe existing = getReiheById(id);
        existing.setTitel(updatedReihe.getTitel());
        existing.setText(updatedReihe.getText());
        existing.setFarbe(updatedReihe.getFarbe());
        // Optional: update Termine or skip it here
        return reiheRepository.save(existing);
    }

    @Transactional // Ensure write operations are transactional
    public void deleteReihe(Long id) {
        Reihe reihe = getReiheById(id);
        reiheRepository.delete(reihe);
    }

    // #####################################################################
    // --- Get a list of Reihen for a given Tnr ---
    @Transactional(readOnly = true)
    public List<ReiheDTOForFormWithTermineAndFilme> getReihenDTOsByTerminId(Long tnr) {
        Termin termin = terminRepository.findById(tnr)
                .orElseThrow(() -> new NoSuchElementException("Termin not found with ID " + tnr));

        Set<Reihe> reihen = termin.getReihen(); // many-to-many relationship

        return reihen.stream()
                .map(ReiheDTOForFormWithTermineAndFilme::new)
                .toList();
    }

    // #####################################################################
    // --- Add Termin to Reihe ---
    @Transactional // This method definitely needs @Transactional as it modifies state
    public Reihe addTerminToReihe(Long reiheId, Long terminId) {
        // Fetching 'reihe' here will include its 'termine' due to @EntityGraph
        Reihe reihe = getReiheById(reiheId);

        Termin termin = terminRepository.findById(terminId)
                .orElseThrow(() -> new RuntimeException("Termin not found"));

        reihe.getTermine().add(termin);
        // For bidirectional consistency (optional but recommended):
        termin.getReihen().add(reihe);

        // Saving the owning side (Reihe) typically cascades the changes to the join table.
        // It's good practice to save both sides if the relationship is bidirectional
        // and you're modifying both collections within the same transaction.
        terminRepository.save(termin);
        // Save the owning side (reihe)
        return reiheRepository.save(reihe);
    }

    // --- Remove Termin from Reihe ---
    @Transactional
    public void removeTerminFromReihe(Long reiheId, Long terminId) {
        Reihe reihe = reiheRepository.findById(reiheId) // Fetch Reihe (eagerly with termine due to @EntityGraph)
                .orElseThrow(() -> new NoSuchElementException("Reihe not found with id: " + reiheId));

        Termin termin = terminRepository.findById(terminId) // Fetch Termin (eagerly with reihen due to @EntityGraph)
                .orElseThrow(() -> new NoSuchElementException("Termin not found with id: " + terminId));

        // Attempt to remove the termin from the reihe's set, i.e. reihe object has field termine, which is a set of Termin objects; removal of termin from this set
        // In-Memory Change: You are modifying the termine Set within the reihe object in your application's memory
        // Because you fetched reihe using reiheRepository.findById(reiheId) within a @Transactional method, the reihe object is now a "managed entity" within the JPA Persistence Context (also Hibernate Session). This means Hibernate is actively tracking any changes made to this reihe object and its managed collections.
        boolean removedFromReihe = reihe.getTermine().remove(termin); // => "This reihe no longer has this termin associated with it."

        // Attempt to remove the reihe from the termin's set (for bidirectional consistency)
        boolean removedFromTermin = termin.getReihen().remove(reihe);

        if (!removedFromReihe && !removedFromTermin) {
            // This means the connection didn't exist in either collection
            throw new NoSuchElementException("Connection between Reihe " + reiheId + " and Termin " + terminId + " not found.");
        }

        // Save the owning side (Reihe) to persist the change to the join table.
        //      Triggering the Delete: By calling reiheRepository.save(reihe) (or if the transaction simply commits and Hibernate performs its dirty checking), Hibernate detects that the termine collection of the managed reihe entity has changed. Because Reihe is the owning side, Hibernate translates this in-memory collection modification into a DELETE SQL statement for the corresponding row in the reihe_terminverknuepfung join table.
        //      What is saved/synchronized: You're not saving the Reihe entity's attributes (like titel, text, farbe) themselves in this specific operation (unless you changed them). What's being synchronized is the state of its termine collection, which dictates the entries in the join table.
        //      => reiheRepository.save(reihe) is the one that directly causes the row to be deleted from the reihe_terminverknuepfung join table because Reihe is the owning side. It's synchronizing the state of the termine collection.
        reiheRepository.save(reihe);

        // Saving Termin is also good practice for consistency of its collection.
        //      Non-Owning Side and Bidirectional Consistency: The Termin entity is the non-owning side (@ManyToMany(mappedBy = "termine")). Changes to the non-owning side's collection (termin.getReihen().remove(reihe)) do not directly trigger SQL updates to the join table. The join table is managed solely by the owning side.
        //      Consistency within the Persistence Context: When you add/remove elements from both sides of a bidirectional relationship, it's crucial to update both entity objects in memory. If you only updated reihe and then, later in the same transaction, tried to access termin.getReihen(), it might still contain the reihe because its in-memory state hasn't been explicitly synchronized.
        //      => terminRepository.save(termin) is for maintaining the correct in-memory state of the termin object within the current transaction/persistence context, particularly for its reihen collection, even though it doesn't directly trigger the join table modification. It's about ensuring bidirectional consistency in your application's state.
        terminRepository.save(termin);
    }
}