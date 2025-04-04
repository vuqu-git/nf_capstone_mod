package org.pupille.backend.mysql.film;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FilmService {

    private final FilmRepository filmRepository;

    // Retrieve all films
    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    // Retrieve all films sorted by title ascending
    public List<Film> getAllFilmsSortedByTitleAsc() {
        return filmRepository.findAll(Sort.by(Sort.Direction.ASC, "titel"));
    }

//    public List<FilmProjectionInterface> getAllFilmsByOrderByTitelAsc() {
//        return filmRepository.findAllByOrderByTitelAsc();
//    }

//    public List<FilmProjectionInterface> getAllFilmsByOrderByTitelAsc() {
//        List<FilmProjectionInterface> tempList = filmRepository.findAllByOrderByTitelAsc().stream()
//                                                    .map(f -> f.setStab());
//        return tempList;
//    }

    public List<FilmDTO> getAllFilmsByOrderByTitelAsc() {
        return filmRepository.findAllByOrderByTitelAsc()
                                .stream()
                                .map(FilmDTO::new)
                                .map(fdto -> {
                                        fdto.setStab( extractDirectors(fdto.getStab()) );
                                        return fdto;
                                    }
                                )
                                .collect(Collectors.toList());
    }


    public static String extractDirectors(String input) {
        if (input == null || input.isEmpty()) {
            return ""; // Handle null or empty input
        }

        Pattern pattern = Pattern.compile(": (.*?)(?=\\r|$)");
        Matcher matcher = pattern.matcher(input);

        if (matcher.find()) {
            return matcher.group(1).trim();
        } else {
            return "";
        }
    }

    // Retrieve a specific film by ID
    public Optional<Film> getFilmById(Long id) {
        return filmRepository.findById(id);
    }

    // Create or save a new film
    public Film saveFilm(Film film) {
        return filmRepository.save(film);
    }

//    // Update an existing film
//    public Optional<Film> updateFilm(Long id, Film updatedFilm) {
//        return filmRepository.findById(id).map(existingFilm -> {
//            // Update fields of the existing film with values from updatedFilm
//            existingFilm.setTitel(updatedFilm.getTitel());
//            existingFilm.setOriginaltitel(updatedFilm.getOriginaltitel());
//            existingFilm.setOriginaltitelAnzeigen(updatedFilm.getOriginaltitelAnzeigen());
//            existingFilm.setText(updatedFilm.getText());
//            existingFilm.setKurztext(updatedFilm.getKurztext());
//            existingFilm.setBesonderheit(updatedFilm.getBesonderheit());
//            existingFilm.setLand(updatedFilm.getLand());
//            existingFilm.setJahr(updatedFilm.getJahr());
//            existingFilm.setFarbe(updatedFilm.getFarbe());
//            existingFilm.setLaufzeit(updatedFilm.getLaufzeit());
//            existingFilm.setSprache(updatedFilm.getSprache());
//            existingFilm.setUntertitel(updatedFilm.getUntertitel());
//            existingFilm.setFormat(updatedFilm.getFormat());
//            existingFilm.setFsk(updatedFilm.getFsk());
//            existingFilm.setStab(updatedFilm.getStab());
//            existingFilm.setBild(updatedFilm.getBild());
//            existingFilm.setSonderfarbeTitel(updatedFilm.getSonderfarbeTitel());
//            existingFilm.setSonderfarbe(updatedFilm.getSonderfarbe());
//
//            // Save the updated entity back to the database
//            return filmRepository.save(existingFilm);
//        });
//    }

    // Delete a film by ID
    public void deleteFilm(Long id) {
        filmRepository.deleteById(id);
    }
}