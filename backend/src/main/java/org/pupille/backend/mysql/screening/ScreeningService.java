package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;
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


//    public List<TerminDTOWithFilmDTOGallery> getFutureTermineWithFilms() {
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
//                .map(termin -> new TerminDTOWithFilmDTOGallery(
//                        termin,
//                        connections.stream()
//                                .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
//                                .map(Terminverknuepfung::getFilm)
//                                .toList()
//                ))
//                .toList();
//    }

//    public List<TerminDTOWithFilmDTOGallery> getFutureTermineWithFilms() {
//        // Use a fixed time to avoid Termine disappearing immediately after their screening DateTime
//        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
//        LocalTime fixedTime = LocalTime.of(0, 1);
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
//        // Fetch connections with films for the relevant Termine
//        List<Terminverknuepfung> connections = terminverknuepfungRepository
//                .findWithFilmsByTerminIds(terminIds);
//
//        // 3. Map to DTO, filtering out films where vorfilm is true
//        return futureTermine.stream()
//                .map(termin -> new TerminDTOWithFilmDTOGallery(
//                        termin,
//                        connections.stream()
//                                .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
//                                .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm()) // Include only if vorfilm is null or false
//                                .map(Terminverknuepfung::getFilm)
//                                .toList()
//                ))
//                .toList();
//    }

    //leere Filmliste, wenn termin.titel present ist
    public List<TerminDTOWithFilmDTOGallery> getFutureTermineWithFilms() {
        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
        LocalTime fixedTime = LocalTime.of(0, 1);
        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);

        List<Termin> futureTermine = terminRepository.findFutureTermine(now);

        List<Long> terminIds = futureTermine.stream()
                .map(Termin::getTnr)
                .toList();

        List<Terminverknuepfung> connections = terminverknuepfungRepository
                .findWithFilmsByTerminIds(terminIds);

        return futureTermine.stream()
                .map(termin -> {
                    // Check if titel exists (not null/empty)
                    if (termin.getTitel() != null && !termin.getTitel().isBlank()) {
                        return new TerminDTOWithFilmDTOGallery(
                                termin,
                                List.of() // Empty films list when titel is present
                        );
                    } else {
                        // Include films only when titel is absent
                        List<Film> films = connections.stream()
                                .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
                                .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm())
                                .map(Terminverknuepfung::getFilm)
                                .toList();
                        return new TerminDTOWithFilmDTOGallery(
                                termin,
                                films
                        );
                    }
                })
                .toList();
    }


//    // not required because the list doesn't contain any termin data
//    public List<FilmDTOForm> getFilmsByTerminId(Long tnr) {
//        List<Terminverknuepfung> connections = terminverknuepfungRepository.findWithFilmsByTnr(tnr);
//
//        return connections.stream()
//                .map(Terminverknuepfung::getFilm)
//                .filter(Objects::nonNull)
//                .map(FilmDTOForm::new)
//                .toList();
//    }

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

        // ***** utils method *****
        private FilmDTOFormPlus convertToFilmDTO(Terminverknuepfung tv) {
            return new FilmDTOFormPlus(
                    new FilmDTOForm(tv.getFilm()),
                    tv.getVorfilm(),
                    tv.getRang()
            );
        }

    public List<TerminDTOWithFilmDTOOverviewArchive> getPastTermineWithFilms() {
        LocalDateTime now = LocalDateTime.now(ZoneId.of("Europe/Berlin"));
        List<Termin> pastTermine = terminRepository.findPastTermine(now);

        List<Long> terminIds = pastTermine.stream()
                .map(Termin::getTnr)
                .collect(Collectors.toList()); // Explicit collection

        List<Terminverknuepfung> connections = terminverknuepfungRepository
                .findWithFilmsByTerminIds(terminIds);

        return pastTermine.stream()
                .map(termin -> {
                    List<Film> films = connections.stream()
                            .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
                            .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm())
                            .map(Terminverknuepfung::getFilm)
                            .collect(Collectors.toList()); // Explicit collection
                    return new TerminDTOWithFilmDTOOverviewArchive(termin, films);
                })
                .collect(Collectors.toList()); // Convert stream to List
    }


    public List<TerminDTOWithFilmDTOOverviewSemester> getTermineByCurrentSemester() {

        LocalDateTime now = LocalDateTime.now(ZoneId.of("Europe/Berlin"));
        LocalDateTime startDateSummer = LocalDateTime.of(now.getYear(), 4, 1, 0, 0);
        LocalDateTime endDateSummer = LocalDateTime.of(now.getYear(), 9, 30, 23, 59, 59);
        LocalDateTime startDateWinter = LocalDateTime.of(now.getYear(), 10, 1, 0, 0);
        LocalDateTime endDateWinter = LocalDateTime.of(now.getYear() + 1, 3, 31, 23, 59, 59);

        // Adjust year for winter end date if current date is in Jan-Mar
        if (now.getMonthValue() >= 1 && now.getMonthValue() <= 3) {
            startDateWinter = LocalDateTime.of(now.getYear() - 1, 10, 1, 0, 0);
            endDateWinter = LocalDateTime.of(now.getYear(), 3, 31, 23, 59, 59);
        } else if (now.getMonthValue() >= 10) {
            endDateWinter = LocalDateTime.of(now.getYear() + 1, 3, 31, 23, 59, 59);
        }

        List<Termin> termineInSemester = terminRepository.findTermineByCurrentSemester(
                now, startDateSummer, endDateSummer, startDateWinter, endDateWinter
        );

        List<Long> terminIds = termineInSemester.stream()
                .map(Termin::getTnr)
                .collect(Collectors.toList());

        List<Terminverknuepfung> connections = terminverknuepfungRepository
                .findWithFilmsByTerminIds(terminIds);

        return termineInSemester.stream()
                .map(termin -> {
                    List<Film> films = connections.stream()
                            .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
                            .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm())
                            .map(Terminverknuepfung::getFilm)
                            .collect(Collectors.toList());
                    return new TerminDTOWithFilmDTOOverviewSemester(termin, films);
                })
                .collect(Collectors.toList());
    }

}