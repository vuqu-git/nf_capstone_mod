package org.pupille.backend.mysql.programmheft;

import lombok.RequiredArgsConstructor;
import org.pupille.backend.mysql.programmheft.exceptions.ProgrammheftUpdateException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programmheft")
@RequiredArgsConstructor
public class ProgrammheftController {

    private final ProgrammheftService programmheftService;

    @GetMapping()
    public List<Programmheft> getAllProgrammhefte()
    {
        return programmheftService.getAllProgrammhefte();
    }

    @GetMapping("/valid")
    public List<Programmheft> getAllValidProgrammhefte()
    {
        return programmheftService.getAllValidProgrammhefteByDateInRange();
    }

    @GetMapping("/{id}")
    public Programmheft getProgrammheft(@PathVariable Long id) {
        return programmheftService.getProgrammheftById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteProgrammheft(@PathVariable Long id) {
        programmheftService.deleteProgrammheft(id);
    }

    @PostMapping()
    public Programmheft addProgrammheft(@RequestBody Programmheft programmheft) {
        return programmheftService.saveProgrammheft(programmheft);
    }

    @PutMapping("/{id}")
    public Programmheft updateProgrammheft(@PathVariable Long id, @RequestBody Programmheft updatedProgrammheft) {
        try {
            return programmheftService.updateProgrammheft(id, updatedProgrammheft);
        } catch (IllegalArgumentException ex) {
            throw new ProgrammheftUpdateException(ex.getMessage());
        }
    }
}
