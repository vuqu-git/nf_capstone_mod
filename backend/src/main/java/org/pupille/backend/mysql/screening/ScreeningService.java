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
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

        int screeningTotalDuration = Stream.concat(mainFilms.stream(), vorfilms.stream())
                .map(f -> f.getFilm().getLaufzeit())  // Extract laufzeit (could be null)
                .filter(Objects::nonNull)             // Ignore null values
                .mapToInt(Integer::intValue)          // Convert to primitive int
                .sum();                               // Sum remaining values

        return new TerminDTOFormWithFilmsDTOFormPlus(
                new TerminDTOForm(termin),
                mainFilms,
                vorfilms,
                screeningTotalDuration
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

        boolean isWinter = now.getMonthValue() >= 10 || now.getMonthValue() <= 3;

        LocalDateTime startDate = isWinter
                ? (now.getMonthValue() <= 3
                    ? LocalDateTime.of(now.getYear() - 1, 10, 1, 0, 0)
                    : LocalDateTime.of(now.getYear(), 10, 1, 0, 0))
                : LocalDateTime.of(now.getYear(), 4, 1, 0, 0);

        LocalDateTime endDate = isWinter
                ? LocalDateTime.of(now.getMonthValue() <= 3 ? now.getYear() : now.getYear() + 1, 3, 31, 23, 59, 59)
                : LocalDateTime.of(now.getYear(), 9, 30, 23, 59, 59);

        List<Termin> termineInSemester = terminRepository.findTermineByCurrentSemester(
                now, startDate, endDate, startDate, endDate
        );

        // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

        List<Long> terminIds = termineInSemester.stream()
                .map(Termin::getTnr)
                .collect(Collectors.toList());

        Map<Long, List<Terminverknuepfung>> connectionsByTerminId = terminverknuepfungRepository
                .findWithFilmsByTerminIds(terminIds)
                .stream()
                .collect(Collectors.groupingBy(tv -> tv.getTermin().getTnr()));

        return termineInSemester.stream()
                .map(termin -> {
                    List<Terminverknuepfung> connections = connectionsByTerminId.getOrDefault(termin.getTnr(), List.of());

                    List<Film> films = new ArrayList<>();
                    List<Film> vorfilms = new ArrayList<>();

                    for (Terminverknuepfung tv : connections) {
                        if (Boolean.TRUE.equals(tv.getVorfilm())) {
                            vorfilms.add(tv.getFilm());
                        } else {
                            films.add(tv.getFilm());
                        }
                    }

                    int screeningTotalDuration = Stream.concat(films.stream(), vorfilms.stream())
                            .map(Film::getLaufzeit)
                            .filter(Objects::nonNull)
                            .mapToInt(Integer::intValue)
                            .sum();

                    return new TerminDTOWithFilmDTOOverviewSemester(termin, films, screeningTotalDuration);
//                    return new TerminDTOWithFilmDTOOverviewSemester(termin, films, vorfilms, screeningTotalDuration);
                })
                .toList();
    }

}