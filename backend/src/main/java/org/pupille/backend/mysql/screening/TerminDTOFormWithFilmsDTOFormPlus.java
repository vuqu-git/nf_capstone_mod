package org.pupille.backend.mysql.screening;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.pupille.backend.mysql.film.FilmDTOForm;
import org.pupille.backend.mysql.termin.TerminDTOForm;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class TerminDTOFormWithFilmsDTOFormPlus {
    private TerminDTOForm termin;
    private List<FilmDTOFormPlus> mainfilms; // vorfilm=false/null
    private List<FilmDTOFormPlus> vorfilms;   // vorfilm=true
}
