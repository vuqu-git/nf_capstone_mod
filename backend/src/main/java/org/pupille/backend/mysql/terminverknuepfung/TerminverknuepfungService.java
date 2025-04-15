package org.pupille.backend.mysql.terminverknuepfung;

import jakarta.persistence.EntityNotFoundException;
import org.pupille.backend.mysql.film.Film;
import org.pupille.backend.mysql.film.FilmDTOSelection;
import org.pupille.backend.mysql.film.FilmRepository;
import org.pupille.backend.mysql.termin.Termin;
import org.pupille.backend.mysql.termin.TerminProjectionSelection;
import org.pupille.backend.mysql.termin.TerminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
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

//    // this simple saving doesn't work because of the relationships of Terminverknuepfung entity!
//    public Terminverknuepfung saveTerminverknuepfung(Terminverknuepfung terminverknuepfung) {
//        return terminverknuepfungRepository.save(terminverknuepfung);
//    }

    public TerminverknuepfungDTOSelection updateTerminverknuepfung(Long tnr, Long fnr, TerminverknuepfungDTOSelection updatingTV) {
        Terminverknuepfung.TerminverknuepfungId id =
                new Terminverknuepfung.TerminverknuepfungId(tnr, fnr);

        return terminverknuepfungRepository.findById(id)
                .map(existing -> {
                    existing.setVorfilm(updatingTV.vorfilm());
                    existing.setRang(updatingTV.rang());
                    Terminverknuepfung updated = terminverknuepfungRepository.save(existing);
                    return new TerminverknuepfungDTOSelection(updated);
                })
                .orElseThrow(() -> new EntityNotFoundException(
                        "Terminverknuepfung not found with tnr: " + tnr + " and fnr: " + fnr));
    }

    public void deleteTerminverknuepfung(Terminverknuepfung.TerminverknuepfungId deletingTVId) {
        terminverknuepfungRepository.deleteById(deletingTVId);
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

    // this is the usual add or save function for new Terminverknuepfung
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

//    @Transactional
//    public void linkExistingFilmToExistingTermin(TerminverknuepfungDTORequest newTV) {
//        Film existingFilm = filmRepository.findById(newTV.getFnr())
//                .orElseThrow(() -> new RuntimeException("Film not found with ID: " + newTV.getFnr()));
//
//        Termin existingTermin = terminRepository.findById(newTV.getTnr())
//                .orElseThrow(() -> new RuntimeException("Termin not found with ID: " + newTV.getTnr()));
//
//        // ID check remains critical
//        if (terminverknuepfungRepository.existsById(new Terminverknuepfung.TerminverknuepfungId(newTV.getTnr(), newTV.getFnr()))) {
//            throw new RuntimeException("Link already exists");
//        }
//
//        Terminverknuepfung connection = new Terminverknuepfung();
//        connection.setFilm(existingFilm);
//        connection.setTermin(existingTermin);
//        connection.setVorfilm(newTV.getVorfilm());
//        connection.setRang(newTV.getRang());
//
//        // Remove bidirectional relationship management
//        terminverknuepfungRepository.save(connection);
//    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

            //    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
            // utils function
            public static String extractDirectors(String stab) {
                if (stab == null || stab.isEmpty()) return "";

                // Normalize line endings
                String[] lines = stab.replace("\r\n", "\n").replace('\r', '\n').split("\n");

                // List of possible director field prefixes (add more as needed)
                String[] directorPrefixes = {
                        "Regie:", "R:", "R, B&S:", "B,R&amp;S:", "B&R:", "B&amp;R:", "B,R&S:","B,R&amp;S:", "B,R&K:", "B,R&amp;K:", "B,R:", "Buch & Regie:", "Buch &amp; Regie:", "Buch und Regie:",
                        "Buch, Regie & Produktion:", "Buch, Regie &amp; Produktion:", "B&R&S:" , "B&amp;R&amp;S:", "B&R&K:" , "B&amp;R&amp;K:", "B&R&K&S:" , "B&amp;R&amp;K&amp;S:", "B,R&K&S:", "B,R&amp;K&amp;S:", "B,R&K:" , "B,R&amp;K:", "B,R:", "B&R:", "B&amp;R:", "Buch, Regie:"
                };

                for (String line : lines) {
                    String trimmed = line.trim();
                    for (String prefix : directorPrefixes) {
                        if (trimmed.startsWith(prefix)) {
                            // Extract after prefix and trim
                            return trimmed.substring(prefix.length()).trim();
                        }
                    }
                }

                // Fallback: try to match "R:" at the start of any line
                for (String line : lines) {
                    String trimmed = line.trim();
                    if (trimmed.startsWith("R:")) {
                        return trimmed.substring(2).trim();
                    }
                }

                // Fallback: try to match "Regie:" at the start of any line
                for (String line : lines) {
                    String trimmed = line.trim();
                    if (trimmed.startsWith("Regie:")) {
                        return trimmed.substring(6).trim();
                    }
                }

                // If nothing found, return null
                return null;
            }
            //    +-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-

//    public List<TVwithFilmAndTerminDTOSelection> getAllTVwithFilmAndTermin() {
//        List<Terminverknuepfung> terminverknuepfungen = terminverknuepfungRepository.findAllWithFilmAndTermin();
//        return terminverknuepfungen.stream()
//                .map(TVwithFilmAndTerminDTOSelection::new)
//                .collect(Collectors.toList());
//    }

    public List<TVwithFilmAndTerminDTOSelection> getAllTVwithFilmAndTermin() {
        List<Terminverknuepfung> terminverknuepfungen = terminverknuepfungRepository.findAllWithFilmAndTermin();

        return terminverknuepfungen.stream()
                .map(tv -> {
                    Film film = tv.getFilm();
                    Termin termin = tv.getTermin();

                    // Create processed FilmDTOSelection
                    FilmDTOSelection filmDTO = new FilmDTOSelection(
                            film.getFnr(),
                            film.getTitel(),
                            film.getJahr(),
                            extractDirectors(film.getStab())  // Apply processing
                    );

                    // Create Termin projection
                    TerminProjectionSelection terminProjection = new TerminProjectionSelection() {
                        @Override public Long getTnr() { return termin.getTnr(); }
                        @Override public LocalDateTime getTermin() { return termin.getTermin(); }
                        @Override public String getTitel() { return termin.getTitel(); }
                    };

                    return new TVwithFilmAndTerminDTOSelection(
                            tv.getTnr(),
                            tv.getFnr(),
                            tv.getVorfilm(),
                            tv.getRang(),
                            filmDTO,
                            terminProjection
                    );
                })
                .collect(Collectors.toList());
    }

}
