package org.pupille.backend.mysql.terminverknuepfung;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TerminverknuepfungService {

    private final TerminverknuepfungRepository terminverknuepfungRepository;

    @Autowired
    public TerminverknuepfungService(TerminverknuepfungRepository terminverknuepfungRepository) {
        this.terminverknuepfungRepository = terminverknuepfungRepository;
    }

    public List<Terminverknuepfung> getAllTerminverknuepfung() {
        return terminverknuepfungRepository.findAll();
    }

    public List<Terminverknuepfung> getAllTVByOrderByFnrDesc() {
        return terminverknuepfungRepository.findAllByOrderByFnrDesc();
    }

    public Optional<Terminverknuepfung> getTerminverknuepfungById(Terminverknuepfung.TerminverknuepfungId id) {
        return terminverknuepfungRepository.findById(id);
    }

    public Terminverknuepfung saveTerminverknuepfung(Terminverknuepfung terminverknuepfung) {
        return terminverknuepfungRepository.save(terminverknuepfung);
    }

    public void deleteTerminverknuepfung(Terminverknuepfung.TerminverknuepfungId id) {
        terminverknuepfungRepository.deleteById(id);
    }
}
