package org.pupille.backend.mysql.programmheft;

import lombok.RequiredArgsConstructor;
import org.pupille.backend.mysql.programmheft.exceptions.ProgrammheftNotFoundException;
import org.pupille.backend.news.services.DateNowService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProgrammheftService {

    private final ProgrammheftRepo programmheftRepo;
    private final DateNowService dateNowService;

    private static final String errorMessage = "No programmheft found with the id %s";

    public List<Programmheft> getAllProgrammhefte() {
        return programmheftRepo.findAllByOrderByGueltigBisDesc();
    }

    public Programmheft getProgrammheftById(Long id) {
        return programmheftRepo.findById(id)
//                // nice to remember
//                .map(ProgrammheftDTOWithSemesterField::new)  // !!! this map converts the Optional<Programmheft> into an Optional<ProgrammheftDTO>, using your constructor,  though I don't have a constructor with input type Optional<Programmheft>!!!
                                            // it does not require a constructor of type ProgrammheftDTOWithSemesterField(Optional<Programmheft>)
                                            // .map() method here is mapping the value inside the Optional, not the Optional itself
                .orElseThrow(
                        () -> new ProgrammheftNotFoundException(String.format(errorMessage, id))
                );
    }

    public Programmheft saveProgrammheft(Programmheft newProgrammheft) {
        return programmheftRepo.save(newProgrammheft);
    }

    public void deleteProgrammheft(Long id) {
        if (programmheftRepo.existsById(id)) {
            programmheftRepo.deleteById(id);
        } else {
            throw new ProgrammheftNotFoundException(String.format(errorMessage, id));
        }
    }

    public Programmheft updateProgrammheft(Long targetId, Programmheft updatedProgrammheft) {

        if (!programmheftRepo.existsById(targetId)) {
            throw new ProgrammheftNotFoundException(String.format(errorMessage, targetId));
        }

        // Ensure the id in the updatedProgrammheft matches the path variable id.
        if (!targetId.equals(updatedProgrammheft.getPnr())) {
            throw new IllegalArgumentException("ID in path and body do not match");
        }
        return programmheftRepo.save(updatedProgrammheft);
    }

    // ########################################
    // now non standard service queries/methods

    public List<Programmheft> getAllValidProgrammhefteByDateInRange() {
        LocalDate currentDate = dateNowService.localDateNow();
        return programmheftRepo.findValidProgrammhefteByDateInRange(currentDate);
    }
}