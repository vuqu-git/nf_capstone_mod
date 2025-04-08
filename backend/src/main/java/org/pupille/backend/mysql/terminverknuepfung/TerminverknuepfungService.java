package org.pupille.backend.mysql.terminverknuepfung;

import org.pupille.backend.mysql.film.Film;
import org.pupille.backend.mysql.film.FilmRepository;
import org.pupille.backend.mysql.termin.Termin;
import org.pupille.backend.mysql.termin.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TerminverknuepfungService {

    private final FilmRepository filmRepository;
    private final TerminRepository terminRepository;
    private final TerminverknuepfungRepository terminverknuepfungRepository;

    @Autowired
    public TerminverknuepfungService(FilmRepository filmRepository,
                                     TerminRepository terminRepository,
                                     TerminverknuepfungRepository terminverknuepfungRepository) {
        this.filmRepository = filmRepository;
        this.terminRepository = terminRepository;
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

    //    #############################################################

//    @Transactional
//    public void linkExistingFilmToExistingTermin(Long filmId, Long terminId) {
//        Film existingFilm = filmRepository.findById(filmId)
//                .orElseThrow(() -> new RuntimeException("Film not found with ID: " + filmId));
//
//        Termin existingTermin = terminRepository.findById(terminId)
//                .orElseThrow(() -> new RuntimeException("Termin not found with ID: " + terminId));
//
//        // Check if the link already exists (optional, but good practice)
//        if (terminverknuepfungRepository.existsById(new Terminverknuepfung.TerminverknuepfungId(terminId, filmId))) {
//            throw new RuntimeException("Link between Film ID " + filmId + " and Termin ID " + terminId + " already exists.");
//        }
//
//        Terminverknuepfung connection = new Terminverknuepfung();
//        connection.setFilm(existingFilm);
//        connection.setFnr(existingFilm.getFnr());
//        connection.setTermin(existingTermin);
//        connection.setTnr(existingTermin.getTnr());
//        connection.setVorfilm(false); // Set default or request-based value
//        connection.setRang((short) 1);   // Set default or request-based value
//
//        existingFilm.getTerminConnections().add(connection);
//        existingTermin.getFilmConnections().add(connection);
//
//        terminverknuepfungRepository.save(connection);
//    }

    @Transactional
    public void linkExistingFilmToExistingTermin(Long filmId, Long terminId) {
        Film existingFilm = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Film not found with ID: " + filmId));

        Termin existingTermin = terminRepository.findById(terminId)
                .orElseThrow(() -> new RuntimeException("Termin not found with ID: " + terminId));

        // ID check remains critical
        if (terminverknuepfungRepository.existsById(new Terminverknuepfung.TerminverknuepfungId(terminId, filmId))) {
            throw new RuntimeException("Link already exists");
        }

        Terminverknuepfung connection = new Terminverknuepfung();
        connection.setFilm(existingFilm);
        connection.setTermin(existingTermin);
        connection.setFnr(existingFilm.getFnr());
        connection.setTnr(existingTermin.getTnr());
        connection.setVorfilm(false); // Set default or request-based value
        connection.setRang((short) 1);   // Set default or request-based value

        // Remove bidirectional relationship management
        terminverknuepfungRepository.save(connection);
    }

    @Transactional
    public void linkExistingFilmToExistingTerminReq(TerminverknuepfungDTORequest request) {
        Film existingFilm = filmRepository.findById(request.getFnr())
                .orElseThrow(() -> new RuntimeException("Film not found with ID: " + request.getFnr()));

        Termin existingTermin = terminRepository.findById(request.getTnr())
                .orElseThrow(() -> new RuntimeException("Termin not found with ID: " + request.getTnr()));

        if (terminverknuepfungRepository.existsById(new Terminverknuepfung.TerminverknuepfungId(request.getTnr(), request.getFnr()))) {
            throw new RuntimeException("Link already exists");
        }

        Terminverknuepfung connection = new Terminverknuepfung();
        connection.setFilm(existingFilm);
        connection.setTermin(existingTermin);
        connection.setVorfilm(request.getVorfilm());
        connection.setRang(request.getRang());

        terminverknuepfungRepository.save(connection);
    }


}
