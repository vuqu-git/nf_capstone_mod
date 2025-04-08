package org.pupille.backend.mysql.screening;

import org.pupille.backend.mysql.film.FilmDTOForm;
import org.pupille.backend.mysql.termin.Termin;
import org.pupille.backend.mysql.termin.TerminRepository;
import org.pupille.backend.mysql.terminverknuepfung.Terminverknuepfung;
import org.pupille.backend.mysql.terminverknuepfung.TerminverknuepfungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Objects;

@Service
public class ScreeningService {

    private final TerminRepository terminRepository;
    private final TerminverknuepfungRepository terminVerknuepfungRepository;

    @Autowired // Constructor injection (recommended)
    public ScreeningService(TerminRepository terminRepository,
                            TerminverknuepfungRepository terminVerknuepfungRepository) {
        this.terminRepository = terminRepository;
        this.terminVerknuepfungRepository = terminVerknuepfungRepository;
    }


    public List<TerminDTOWithFilmDTOOverviews> getFutureTermineWithFilms() {
        // this time is too precise and hence Termine will disappear immediately when their screening DateTime is passed
        // LocalDateTime now = LocalDateTime.now();

        LocalDate currentDate = LocalDate.now(ZoneId.of("Europe/Berlin"));
        LocalTime fixedTime = LocalTime.of(0, 1);
        // Combine the current date and the fixed time
        LocalDateTime now = LocalDateTime.of(currentDate, fixedTime);

        // 1. Get future Termine
        List<Termin> futureTermine = terminRepository.findFutureTermine(now);

        // 2. Get related films in batch
        List<Long> terminIds = futureTermine.stream()
                .map(Termin::getTnr)
                .toList();

        List<Terminverknuepfung> connections = terminVerknuepfungRepository
                .findWithFilmsByTerminIds(terminIds);

        // 3. Map to DTO
        return futureTermine.stream()
                .map(termin -> new TerminDTOWithFilmDTOOverviews(
                        termin,
                        connections.stream()
                                .filter(tv -> tv.getTermin().getTnr().equals(termin.getTnr()))
                                .map(Terminverknuepfung::getFilm)
                                .toList()
                ))
                .toList();
    }



    public List<FilmDTOForm> getFilmsByTerminId(Long tnr) {
        List<Terminverknuepfung> connections = terminVerknuepfungRepository.findWithFilmsByTnr(tnr);

        return connections.stream()
                .map(Terminverknuepfung::getFilm)
                .filter(Objects::nonNull)
                .map(FilmDTOForm::new)
                .toList();
    }

}