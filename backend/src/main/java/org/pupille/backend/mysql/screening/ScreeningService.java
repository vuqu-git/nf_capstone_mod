package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.Film;
import org.pupille.backend.mysql.film.FilmDTOForm;
import org.pupille.backend.mysql.reihe.ReiheDTOGallery;
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

    //filter for veroeffentlichen > 0 happens in frontend react component Gallery2.tsx
    public List<TerminDTOWithFilmAndReiheDTOGallery> getAllFutureTermineWithFilms() {
        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
        LocalTime fixedTime = LocalTime.of(0, 1);
        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);

        List<Termin> futureTermine = terminRepository.findAllFutureTermine(now);

        List<Long> terminIds = futureTermine.stream()
                .map(Termin::getTnr)
                .toList();

        List<Terminverknuepfung> connections = terminverknuepfungRepository
                .findWithFilmsByTerminIds(terminIds);

        return futureTermine.stream()
                .map(termin -> {
                    // Check if titel exists (not null/empty)
                    if (termin.getTitel() != null && !termin.getTitel().isBlank()) {
                        return new TerminDTOWithFilmAndReiheDTOGallery(
                                termin,
                                List.of(), // Empty films list when titel is present
                                termin.getReihen()
                        );
                    } else {
                        // Include films only when titel is absent
                        List<Film> films = connections.stream()
                                .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
                                .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm())
                                .map(Terminverknuepfung::getFilm)
                                .toList();
                        return new TerminDTOWithFilmAndReiheDTOGallery(
                                termin,
                                films,
                                termin.getReihen()
                        );
                    }
                })
                .toList();
    }

    public ReihenAndFilmTermineForGallery getReihenAndTermineForGallery() {
        // Get all rest termine with films + rest reihen of the semester; rest i.e. future from now date
        List<TerminDTOWithFilmAndReiheDTOGallery> termineSemester = getAllFutureTermineWithFilms();

        // Collect all unique reihen.titel values, ignoring null/empty
        List<String> reihenSemester = termineSemester.stream()
                .flatMap(termin -> termin.reihen().stream()) // stream of all reihen in all termine
                .map(ReiheDTOGallery::getTitel)
                .filter(Objects::nonNull)
                .distinct()                                // unique
                .sorted()                                  // A–Z, case-sensitive
                .toList();

        return new ReihenAndFilmTermineForGallery(reihenSemester, termineSemester);
    }

//    // not required because the list doesn't contain any termin data
//    public List<FilmDTOForm> getFilmsByTnr(Long tnr) {
//        List<Terminverknuepfung> connections = terminverknuepfungRepository.findWithFilmsByTnr(tnr);
//
//        return connections.stream()
//                .map(Terminverknuepfung::getFilm)
//                .filter(Objects::nonNull)
//                .map(FilmDTOForm::new)
//                .toList();
//    }

//    ########################################################

    public TerminDTOFormWithFilmsDTOFormPlus getTerminWithFilmsPlusByTnr(Long tnr) {
        // Fetch Termin
        Termin termin = terminRepository.findById(tnr)
                .orElseThrow(() -> new NoSuchElementException("Termin not found"));

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

        int terminGesamtlaufzeit = Stream.concat(mainFilms.stream(), vorfilms.stream())
                .map(f -> f.getFilm().getLaufzeit())  // Extract laufzeit (could be null)
                .filter(Objects::nonNull)             // Ignore null values
                .mapToInt(Integer::intValue)          // Convert to primitive int
                .sum();                               // Sum remaining values

        return new TerminDTOFormWithFilmsDTOFormPlus(
                new TerminDTOForm(termin),
                mainFilms,
                vorfilms,
                terminGesamtlaufzeit
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

                    List<Film> mainfilms = new ArrayList<>();
                    List<Film> vorfilms = new ArrayList<>();

                    for (Terminverknuepfung tv : connections) {
                        if (Boolean.TRUE.equals(tv.getVorfilm())) {
                            vorfilms.add(tv.getFilm());
                        } else {
                            mainfilms.add(tv.getFilm());
                        }
                    }

                    int terminGesamtlaufzeit = Stream.concat(mainfilms.stream(), vorfilms.stream())
                            .map(Film::getLaufzeit)
                            .filter(Objects::nonNull)
                            .mapToInt(Integer::intValue)
                            .sum();

                    return new TerminDTOWithFilmDTOOverviewSemester(termin, mainfilms, termin.getReihen(), terminGesamtlaufzeit);
                })
                .toList();
    }

    public ReihenAndFilmTermineForOverviewSemester getReihenAndTermineForOverviewSemester() {
        // Get all termine with films + reihen of the whole semester
        List<TerminDTOWithFilmDTOOverviewSemester>  termineSemester = getTermineByCurrentSemester();

        // Collect all unique reihen.titel values, ignoring null/empty
        List<String> reihenSemester = termineSemester.stream()
                .flatMap(termin -> termin.reihen().stream()) // stream of all reihen in all termine
                .map(ReiheDTOGallery::getTitel)
                .filter(Objects::nonNull)
                .distinct()                                // unique
                .sorted()                                  // A–Z, case-sensitive
                .toList();

        return new ReihenAndFilmTermineForOverviewSemester(reihenSemester, termineSemester);
    }

                //    public List<TerminDTOWithFilmDTOSlideshow> getFutureTermineWithFilmsSlideshow() {
                //        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
                //        LocalTime fixedTime = LocalTime.of(0, 1);
                //        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);
                //
                //        List<Termin> futureTermine = terminRepository.findFutureTermine(now);
                //        if (futureTermine.isEmpty() || futureTermine.size() == 1) {
                //            return List.of(); // Either no future Termine or only one (which we must exclude)
                //        }
                //
                //        // Sort by vorstellungsbeginn ascending
                //        futureTermine.sort(Comparator.comparing(Termin::getVorstellungsbeginn));
                //
                //        // Exclude the first upcoming screening
                //        List<Termin> relevantTermine = futureTermine.subList(1, futureTermine.size());
                //
                //        List<Long> terminIds = relevantTermine.stream()
                //                .map(Termin::getTnr)
                //                .toList();
                //
                //        List<Terminverknuepfung> connections = terminverknuepfungRepository.findWithFilmsByTerminIds(terminIds);
                //
                //        Map<Long, List<Terminverknuepfung>> groupedConnections = connections.stream()
                //                .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm()) // exclude Vorfilme
                //                .collect(Collectors.groupingBy(tv -> tv.getTermin().getTnr()));
                //
                //        return relevantTermine.stream()
                //                .map(termin -> {
                //                    List<FilmDTOForm> mainfilms = groupedConnections.getOrDefault(termin.getTnr(), List.of()).stream()
                //                            .sorted(Comparator.comparing(Terminverknuepfung::getRang, Comparator.nullsLast(Short::compareTo)))
                //                            .map(tv -> new FilmDTOForm(tv.getFilm()))
                //                            .toList();
                //
                //                    return new TerminDTOWithFilmDTOSlideshow(termin, mainfilms);
                //                })
                //                .toList();
                //    }


//    public List<TerminDTOWithFilmDTOSlideshow> getFutureTermineWithFilmsForSlideshow() {
//        // Get the current time (with fixed time for consistency)
//        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
//        LocalTime fixedTime = LocalTime.of(0, 1);
//        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);
//
//        // 1. Get future Termine
//        List<Termin> futureTermine = terminRepository.findFutureTermine(now);
//
//        // 2. Get related films in batch (using the termin IDs)
//        List<Long> terminIds = futureTermine.stream()
//                .map(Termin::getTnr)
//                .collect(Collectors.toList());
//
//        List<Terminverknuepfung> connections = terminverknuepfungRepository
//                .findWithFilmsByTerminIds(terminIds);
//
//        // 3. Exclude the first next Termin
//        if (!futureTermine.isEmpty()) {
//            futureTermine.remove(0); // Remove the first Termin (this is the one happening next)
//        }
//
//        // 4. Prepare the list of TerminDTOWithFilmDTOSlideshow objects
//        return futureTermine.stream()
//                .map(termin -> {
//                    // Filter and sort films that are NOT vorfilms
//                    List<Film> mainfilms = connections.stream()
//                            .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
//                            .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm())  // Exclude vorfilms
//                            .sorted(Comparator.comparing(Terminverknuepfung::getRang, Comparator.nullsFirst(Short::compare))) // Sort by rang ascending
//                            .map(Terminverknuepfung::getFilm)
//                            .collect(Collectors.toList());
//
//                    // Return the TerminDTOWithFilmDTOSlideshow object
//                    return new TerminDTOWithFilmDTOSlideshow(termin, mainfilms);
//                })
//                .collect(Collectors.toList());
//    }

//    public List<TerminDTOWithFilmDTOSlideshow> getFutureTermineWithFilmsForSlideshow() {
//        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
//        LocalTime fixedTime = LocalTime.of(0, 1);
//        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);
//
//        // 1. Get all future Termine
//        List<Termin> futureTermine = terminRepository.findFutureTermine(now);
//
//        // 2. Filter only those with veroeffentlichen != null and > 0
//        List<Termin> publishableTermine = futureTermine.stream()
//                .filter(t -> t.getVeroeffentlichen() != null && t.getVeroeffentlichen() > 0)
//                .sorted(Comparator.comparing(Termin::getVorstellungsbeginn))
//                .collect(Collectors.toList());
//
//        // 3. Exclude the first next publishable Termin
//        if (!publishableTermine.isEmpty()) {
//            publishableTermine.remove(0);
//        }
//
//        // 4. Collect their IDs
//        List<Long> terminIds = publishableTermine.stream()
//                .map(Termin::getTnr)
//                .collect(Collectors.toList());
//
//        // 5. Load all Terminverknuepfung with film relations
//        List<Terminverknuepfung> connections = terminverknuepfungRepository.findWithFilmsByTerminIds(terminIds);
//
//        // 6. Map to DTOs
//        return publishableTermine.stream()
//                .map(termin -> {
//                    List<Film> mainfilms = connections.stream()
//                            .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
//                            .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm())
//                            .sorted(Comparator.comparing(Terminverknuepfung::getRang, Comparator.nullsFirst(Short::compare)))
//                            .map(Terminverknuepfung::getFilm)
//                            .collect(Collectors.toList());
//
//                    return new TerminDTOWithFilmDTOSlideshow(termin, mainfilms);
//                })
//                .collect(Collectors.toList());
//    }

    public List<TerminDTOWithFilmDTOSlideshow> getFutureTermineWithFilmsForSlideshow(Optional<Integer> next) {
        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
        LocalTime fixedTime = LocalTime.of(0, 1);
        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);

        // 1. Get all future Termine
        List<Termin> futureTermine = terminRepository.findAllFutureTermine(now);

        // 2. Filter veroeffentlichen > 0
        List<Termin> publishableTermine = futureTermine.stream()
                .filter(t -> t.getVeroeffentlichen() != null && t.getVeroeffentlichen() > 0)
                .sorted(Comparator.comparing(Termin::getVorstellungsbeginn))
                .collect(Collectors.toList());

        // 3. Exclude the first next Termin
        if (!publishableTermine.isEmpty()) {
            publishableTermine.remove(0);
        }

        // 4. Apply 'next' limit if present
        if (next.isPresent() && next.get() > 0 && publishableTermine.size() > next.get()) {
            publishableTermine = publishableTermine.subList(0, next.get());
        }

        // 5. Get termin IDs
        List<Long> terminIds = publishableTermine.stream()
                .map(Termin::getTnr)
                .collect(Collectors.toList());

        List<Terminverknuepfung> connections = terminverknuepfungRepository.findWithFilmsByTerminIds(terminIds);

        // 6. Build DTOs
        return publishableTermine.stream()
                .map(termin -> {
                    List<Film> mainfilms = connections.stream()
                            .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
                            .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm())
                            .sorted(Comparator.comparing(Terminverknuepfung::getRang, Comparator.nullsFirst(Short::compare)))
                            .map(Terminverknuepfung::getFilm)
                            .collect(Collectors.toList());

                    return new TerminDTOWithFilmDTOSlideshow(termin, mainfilms);
                })
                .collect(Collectors.toList());
    }

//    +++++++++++++++++++++++++++++
//    mail reminder stuff
//    +++++++++++++++++++++++++++++

    public List<TerminDTOWithFilmDTOMailReminder> getTermineDaysInFuture(int days) {
        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
        LocalDate targetDate = currentDate.plusDays(days);

        // Start and end of the target day
        LocalDateTime startOfDay = targetDate.atStartOfDay();
        LocalDateTime endOfDay = targetDate.atTime(23, 59, 59);

        List<Termin> termineOnTargetDate = terminRepository.findTermineByDateRange(startOfDay, endOfDay);

        return buildTerminDTOWithFilmDTOMailReminderList(termineOnTargetDate).stream()
                .filter(terminDTO -> terminDTO.veroeffentlichen() != null && terminDTO.veroeffentlichen() > 0)
                .collect(Collectors.toList());
    }

    public List<TerminDTOWithFilmDTOMailReminder> getTermineDaysInPast(int days) {
        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
        LocalDate targetDate = currentDate.minusDays(days);

        // Start and end of the target day
        LocalDateTime startOfDay = targetDate.atStartOfDay();
        LocalDateTime endOfDay = targetDate.atTime(23, 59, 59);

        List<Termin> termineOnTargetDate = terminRepository.findTermineByDateRange(startOfDay, endOfDay);

        return buildTerminDTOWithFilmDTOMailReminderList(termineOnTargetDate).stream()
                .filter(terminDTO -> terminDTO.veroeffentlichen() != null && terminDTO.veroeffentlichen() > 0) // only keep termine, which are veröffentlicht
                .collect(Collectors.toList());
    }

            // Helper method to avoid code duplication
            private List<TerminDTOWithFilmDTOMailReminder> buildTerminDTOWithFilmDTOMailReminderList(List<Termin> termine) {
                List<Long> terminIds = termine.stream()
                        .map(Termin::getTnr)
                        .toList();

                List<Terminverknuepfung> connections = terminverknuepfungRepository
                        .findWithFilmsByTerminIds(terminIds);

                return termine.stream()
                        .map(termin -> {
                            // Check if titel exists (not null/empty)
                            if (termin.getTitel() != null && !termin.getTitel().isBlank()) {
                                return new TerminDTOWithFilmDTOMailReminder(
                                        termin,
                                        List.of() // Empty films list (mainfilms) when titel is present
                                );
                            } else {
                                // Include films only when titel is absent
                                List<Film> films = connections.stream()
                                        .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
                                        .filter(tv -> tv.getVorfilm() == null || !tv.getVorfilm())
                                        .map(Terminverknuepfung::getFilm)
                                        .toList();
                                return new TerminDTOWithFilmDTOMailReminder(
                                        termin,
                                        films
                                );
                            }
                        })
                        .toList();
            }

}