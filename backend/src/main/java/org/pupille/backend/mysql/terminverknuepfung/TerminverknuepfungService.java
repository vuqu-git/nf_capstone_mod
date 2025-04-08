package org.pupille.backend.mysql.terminverknuepfung;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TerminverknuepfungService {

    private final TerminverknuepfungRepository terminverknuepfungRepository;

    @Autowired
    public TerminverknuepfungService(TerminverknuepfungRepository terminverknuepfungRepository) {
        this.terminverknuepfungRepository = terminverknuepfungRepository;
    }

    public List<TerminverknuepfungDTOSelection> getAllTerminverknuepfung() {
        List<Terminverknuepfung> terminverknuepfungen = terminverknuepfungRepository.findAll();
        return terminverknuepfungen.stream()
                .map(TerminverknuepfungDTOSelection::new)
                .collect(Collectors.toList());
    }

    public List<TerminverknuepfungDTOSelection> getAllTVByOrderByFnrDesc() {
        List<Terminverknuepfung> terminverknuepfungen = terminverknuepfungRepository.findAllByOrderByFnrDesc();
        return terminverknuepfungen.stream()
                .map(TerminverknuepfungDTOSelection::new)
                .collect(Collectors.toList());
    }

    public Optional<TerminverknuepfungDTOSelection> getTerminverknuepfungById(Terminverknuepfung.TerminverknuepfungId id) {
        return Optional.of( new TerminverknuepfungDTOSelection(terminverknuepfungRepository.findById(id).get()) );
    }

    public Terminverknuepfung saveTerminverknuepfung(Terminverknuepfung terminverknuepfung) {
        return terminverknuepfungRepository.save(terminverknuepfung);
    }

    public void deleteTerminverknuepfung(Terminverknuepfung.TerminverknuepfungId id) {
        terminverknuepfungRepository.deleteById(id);
    }
}
