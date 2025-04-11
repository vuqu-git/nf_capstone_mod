package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.FilmDTOForm;
import org.pupille.backend.mysql.termin.Termin;
import org.pupille.backend.mysql.termin.TerminDTOForm;
import org.pupille.backend.mysql.termin.TerminRepository;
import org.pupille.backend.mysql.terminverknuepfung.Terminverknuepfung;
import org.pupille.backend.mysql.terminverknuepfung.TerminverknuepfungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class ScreeningService {

    private final TerminRepository terminRepository;
    private final TerminverknuepfungRepository terminverknuepfungRepository;

    @Autowired // Constructor injection (recommended)
    public ScreeningService(TerminRepository terminRepository,
                            TerminverknuepfungRepository terminverknuepfungRepository) {
        this.terminRepository = terminRepository;
        this.terminverknuepfungRepository = terminverknuepfungRepository;
    }


//    public List<TerminDTOWithFilmDTOOverviews> getFutureTermineWithFilms() {
//        // this time is too precise and hence Termine will disappear immediately when their screening DateTime is passed
//        // LocalDateTime now = LocalDateTime.now();
//
//        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
//        LocalTime fixedTime = LocalTime.of(0, 1);
//        // Combine the current date and the fixed time
//        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);
//
//        // 1. Get future Termine
//        List<Termin> futureTermine = terminRepository.findFutureTermine(now);
//
//        // 2. Get related films in batch
//        List<Long> terminIds = futureTermine.stream()
//                .map(Termin::getTnr)
//                .toList();
//
//        List<Terminverknuepfung> connections = terminverknuepfungRepository
//                .findWithFilmsByTerminIds(terminIds);
//
//        // 3. Map to DTO
//        return futureTermine.stream()
//                .map(termin -> new TerminDTOWithFilmDTOOverviews(
//                        termin,
//                        connections.stream()
//                                .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
//                                .map(Terminverknuepfung::getFilm)
//                                .toList()
//                ))
//                .toList();
//    }

    public List<TerminDTOWithFilmDTOOverviews> getFutureTermineWithFilms() {
        // Use a fixed time to avoid Termine disappearing immediately after their screening DateTime
        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
        LocalTime fixedTime = LocalTime.of(0, 1);
        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);

        // 1. Get future Termine
        List<Termin> futureTermine = terminRepository.findFutureTermine(now);

        // 2. Get related films in batch
        List<Long> terminIds = futureTermine.stream()
                .map(Termin::getTnr)
                .toList();

        // Fetch connections with films for the relevant Termine
        List<Terminverknuepfung> connections = terminverknuepfungRepository
                .findWithFilmsByTerminIds(terminIds);

        // 3. Map to DTO, filtering out films where vorfilm is true
        return futureTermine.stream()
                .map(termin -> new TerminDTOWithFilmDTOOverviews(
                        termin,
                        connections.stream()
                                .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
                                .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm()) // Include only if vorfilm is null or false
                                .map(Terminverknuepfung::getFilm)
                                .toList()
                ))
                .toList();
    }



    public List<FilmDTOForm> getFilmsByTerminId(Long tnr) {
        List<Terminverknuepfung> connections = terminverknuepfungRepository.findWithFilmsByTnr(tnr);

        return connections.stream()
                .map(Terminverknuepfung::getFilm)
                .filter(Objects::nonNull)
                .map(FilmDTOForm::new)
                .toList();
    }

//    ########################################################


    public TerminDTOFormWithFilmsDTOFormPlus getTerminWithFilmsPlusByTerminId(Long tnr) {
//        // Fetch Termin
//        Termin termin = terminRepository.findById(tnr)
//                .orElseThrow(() -> new RuntimeException("Termin not found"));
//
//        // Get all connections with films
//        List<Terminverknuepfung> connections = terminverknuepfungRepository.findWithFilmsByTnr(tnr);
//
//        // Map to DTOs with connection info
//        List<FilmDTOFormPlus> filmDTOs = connections.stream()
//                .filter(tv -> tv.getFilm() != null)
//                .sorted(
//                        // Primary sort: vorfilm == false/null first
//                        Comparator.comparing(
//                                        (Terminverknuepfung tv) -> {
//                                            Boolean vorfilm = tv.getVorfilm();
//                                            return vorfilm != null && vorfilm; // true means it's in the second group
//                                        },
//                                        Comparator.nullsFirst(Comparator.naturalOrder())
//                                )
//                                // Secondary sort: rang ascending within groups
//                                .thenComparing(
//                                        tv -> tv.getRang(),
//                                        Comparator.nullsFirst(Short::compare)
//                                )
//                )
//                .map(tv -> new FilmDTOFormPlus(
//                        new FilmDTOForm(tv.getFilm()),
//                        tv.getVorfilm(),
//                        tv.getRang()
//                ))
//                .toList();
//
//
//        return new TerminDTOFormWithFilmsDTOFormPlus(
//                new TerminDTOForm(termin),
//                filmDTOs
//        );

        // Fetch Termin
        Termin termin = terminRepository.findById(tnr)
                .orElseThrow(() -> new RuntimeException("Termin not found"));

        // Get all connections with films
        List<Terminverknuepfung> connections = terminverknuepfungRepository.findWithFilmsByTnr(tnr);

        // Split and sort
        Map<Boolean, List<Terminverknuepfung>> grouped = connections.stream()
                .collect(Collectors.partitioningBy(
                        tv -> Boolean.TRUE.equals(tv.getVorfilm())
                ));

        Comparator<Terminverknuepfung> rangComparator = Comparator.comparing(
                Terminverknuepfung::getRang,
                Comparator.nullsFirst(Short::compare)
        );

        List<FilmDTOFormPlus> mainFilms = grouped.get(false).stream()
                .sorted(rangComparator)
                .map(this::convertToFilmDTO)
                .toList();

        List<FilmDTOFormPlus> vorfilms = grouped.get(true).stream()
                .sorted(rangComparator)
                .map(this::convertToFilmDTO)
                .toList();

        return new TerminDTOFormWithFilmsDTOFormPlus(
                new TerminDTOForm(termin),
                mainFilms,
                vorfilms
        );
    }

    private FilmDTOFormPlus convertToFilmDTO(Terminverknuepfung tv) {
        return new FilmDTOFormPlus(
                new FilmDTOForm(tv.getFilm()),
                tv.getVorfilm(),
                tv.getRang()
        );
    }

}