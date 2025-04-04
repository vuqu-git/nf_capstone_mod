package org.pupille.backend.mysql.film;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/filme")
@RequiredArgsConstructor
public class FilmController {

    private final FilmService filmService;

    @GetMapping
    public List<Film> getAllFilms() {
        return filmService.getAllFilms();
    }

    @GetMapping("/servicesort")
    public ResponseEntity<List<Film>> getAllFilmsSortedByTitleAsc() {
        List<Film> films = filmService.getAllFilmsSortedByTitleAsc();
        return ResponseEntity.ok(films);
    }

//    @GetMapping("/reposorted")
//    public ResponseEntity<List<FilmProjectionInterface>> getAllFilmsByOrderByTitelAsc() {
//        List<FilmProjectionInterface> films = filmService.getAllFilmsByOrderByTitelAsc();
//        return ResponseEntity.ok(films);
//    }

    @GetMapping("/allsorted")
    public ResponseEntity<List<FilmDTO>> getAllFilmsByOrderByTitelAsc() {
        List<FilmDTO> films = filmService.getAllFilmsByOrderByTitelAsc();
        return ResponseEntity.ok(films);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Film> getFilmById(@PathVariable Long id) {
        return filmService.getFilmById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Film createFilm(@RequestBody Film film) {
        return filmService.saveFilm(film);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Film> updateFilm(@PathVariable Long id, @RequestBody Film updatedFilm) {
        return filmService.getFilmById(id)
                .map(existingFilm -> {
                    updatedFilm.setFnr(existingFilm.getFnr());
                    return ResponseEntity.ok(filmService.saveFilm(updatedFilm));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilm(@PathVariable Long id) {
        if (filmService.getFilmById(id).isPresent()) {
            filmService.deleteFilm(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}

