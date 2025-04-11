import Termin from "./Termin.ts";
import {Film} from "./Film.ts";
import FilmPlus from "./FilmPlus.ts";

// this one mirrors the Java class TerminDTOFormWithFilmsDTOFormPlus

export default interface TerminWithFilms {
    termin: Termin;
    mainfilms: FilmPlus[];
    vorfilms: FilmPlus[];
}


// interface FilmPlus {
//     film: Film;
//     vorfilm: boolean | null;
//     rang: number | null;
// }