package org.pupille.backend.mysql.terminverknuepfung;

import jakarta.persistence.EntityNotFoundException;
import org.pupille.backend.mysql.film.Film;
import org.pupille.backend.mysql.film.FilmDTOSelection;
import org.pupille.backend.mysql.film.FilmRepository;
import org.pupille.backend.mysql.termin.Termin;
import org.pupille.backend.mysql.termin.TerminProjectionSelection;
import org.pupille.backend.mysql.termin.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
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


    public List<TerminverknuepfungDTOSelection> getAllTVByOrderByTnrDesc() {
        List<Terminverknuepfung> terminverknuepfungen = terminverknuepfungRepository.findAllByOrderByTnrDesc();
        return terminverknuepfungen.stream()
                .map(TerminverknuepfungDTOSelection::new)
                .collect(Collectors.toList());
    }


    public Optional<TerminverknuepfungDTOSelection> getTerminverknuepfungById(Terminverknuepfung.TerminverknuepfungId id) {
        return Optional.of( new TerminverknuepfungDTOSelection(terminverknuepfungRepository.findById(id).get()) );
    }


    // this simple saving doesn't work because of the relationships of Terminverknuepfung entity!
    public Terminverknuepfung saveTerminverknuepfung(Terminverknuepfung terminverknuepfung) {
        return terminverknuepfungRepository.save(terminverknuepfung);
    }

//    // this "traditional" update does not work, because in the update we want to change the composite key of tnr and fnr
//    // when I pass the new tnr-fnr-pair the method terminverknuepfungRepository.findById(id) won't find it
//    // beside, JPA (in the standard/default setting) doesn't allow changes in the primary key
//    public TerminverknuepfungDTOSelection updateTerminverknuepfung(
//                  Long tnr, Long fnr,
//                  TerminverknuepfungDTOSelection updatingTV
//    ) {
//        Terminverknuepfung.TerminverknuepfungId id =
//                new Terminverknuepfung.TerminverknuepfungId(tnr, fnr);
//
//        return terminverknuepfungRepository.findById(id)
//                .map(existing -> {
//                    existing.setVorfilm(updatingTV.vorfilm());
//                    existing.setRang(updatingTV.rang());
//                    Terminverknuepfung updated = terminverknuepfungRepository.save(existing);
//                    return new TerminverknuepfungDTOSelection(updated);
//                })
//                .orElseThrow(() -> new EntityNotFoundException(
//                        "Terminverknuepfung not found with tnr: " + tnr + " and fnr: " + fnr));
//    }

    @Transactional
    public TerminverknuepfungDTOSelection updateTerminverknuepfung(
            Long oldTnr, Long oldFnr,
            TerminverknuepfungDTOSelection newTV
    ) {
        // 1. Delete the old entity
        Terminverknuepfung.TerminverknuepfungId oldId =
                new Terminverknuepfung.TerminverknuepfungId(oldTnr, oldFnr);
        if (!terminverknuepfungRepository.existsById(oldId)) {
            throw new EntityNotFoundException("No Terminverknuepfung found for old key");
        }
        terminverknuepfungRepository.deleteById(oldId);

        // 2. Create and save the new entity
        Film film = filmRepository.findById(newTV.fnr())
                .orElseThrow(() -> new RuntimeException("Film not found"));
        Termin termin = terminRepository.findById(newTV.tnr())
                .orElseThrow(() -> new RuntimeException("Termin not found"));

        Terminverknuepfung newEntity = new Terminverknuepfung();
        newEntity.setTnr(newTV.tnr());
        newEntity.setFnr(newTV.fnr());
        newEntity.setVorfilm(newTV.vorfilm());
        newEntity.setRang(newTV.rang());
        newEntity.setFilm(film);
        newEntity.setTermin(termin);

        Terminverknuepfung saved = terminverknuepfungRepository.save(newEntity);
        return new TerminverknuepfungDTOSelection(saved);
    }


    public void deleteTerminverknuepfung(Terminverknuepfung.TerminverknuepfungId deletingTVId) {
        terminverknuepfungRepository.deleteById(deletingTVId);
    }

    //    #############################################################

    // this represents the usual add or save function for new Terminverknuepfung
    // since Terminverknuepfung has relationships a simple save is not enough
    // and more relationship management needs to be done to keep the (relationship) data consistent
    @Transactional
    public void linkExistingFilmToExistingTermin(TerminverknuepfungDTOSelection newTV) {
        Film existingFilm = filmRepository.findById(newTV.fnr())
                .orElseThrow(() -> new RuntimeException("Film not found with ID: " + newTV.fnr()));

        Termin existingTermin = terminRepository.findById(newTV.tnr())
                .orElseThrow(() -> new RuntimeException("Termin not found with ID: " + newTV.tnr()));

        // ID check remains critical
        if (terminverknuepfungRepository.existsById(new Terminverknuepfung.TerminverknuepfungId(newTV.tnr(), newTV.fnr()))) {
            throw new RuntimeException("Link already exists");
        }

        Terminverknuepfung connection = new Terminverknuepfung();
        connection.setFilm(existingFilm);
        connection.setTermin(existingTermin);
        connection.setVorfilm(newTV.vorfilm());
        connection.setRang(newTV.rang());

        // Remove bidirectional relationship management
        terminverknuepfungRepository.save(connection);
    }

    //    #############################################################

    public List<TVWithFilmAndTerminDTOSelection> getAllTVWithFilmAndTermin() {
        return terminverknuepfungRepository.findAllWithFilmAndTermin()
                .stream()
                .map(TVWithFilmAndTerminDTOSelection::new)
                .collect(Collectors.toList());
    }


    public TVWithFilmAndTerminDTOSelection getTVWithFilmAndTerminByTnrAndFnr(Long tnr, Long fnr) {
        return terminverknuepfungRepository.findWithFilmAndTerminByTnrAndFnr(tnr, fnr)
                .map(TVWithFilmAndTerminDTOSelection::new)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Terminverknüpfung not found with tnr: " + tnr + " and fnr: " + fnr
                ));
    }


    public List<TVWithFilmAndTerminDTOSelection> getAllTVWithFilmAndTerminSortedByTermin() {
        return terminverknuepfungRepository.findAllWithFilmAndTerminOrderByTerminDesc()
                .stream()
                .map(TVWithFilmAndTerminDTOSelection::new)
                .collect(Collectors.toList());
    }

    // ---------------------------------------------------------------------------------------------
    // two methods for fetching list of filme (termine) when giving tnr (fnr)
    // the first one: getFilmlistByTnr uses a simple repo method and a constructor to create FilmDTOSelection objects
    // the second one: getTerminlistByFnr contains logic in the repo method to return TerminProjectionSelection objects
    public List<FilmDTOSelection> getFilmlistByTnr(Long tnr) {
        List<Terminverknuepfung> fnrList = terminverknuepfungRepository.findWithFilmsByTnr(tnr);
        List<FilmDTOSelection> filmList = new ArrayList<>();

        for (Terminverknuepfung tv : fnrList) {
            // Assuming Terminverknuepfung has a method getFilm() or similar
            Film film = tv.getFilm();

            // Now create a FilmDTOSelection from the Film object
            FilmDTOSelection filmDto = new FilmDTOSelection(film);
            filmList.add(filmDto);
        }
        return filmList;
    }

    public List<TerminProjectionSelection> getTerminlistByFnr(Long fnr) {
        return terminverknuepfungRepository.findTermineByFilmFnr(fnr);
    }
    // ---------------------------------------------------------------------------------------------
}
