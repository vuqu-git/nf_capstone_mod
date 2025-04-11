import Termin from "./Termin.ts";
import FilmDTOFormPlus from "./FilmDTOFormPlus.ts";

// this one mirrors the Java class TerminDTOFormWithFilmsDTOFormPlus

export default interface TerminDTOFormWithFilmsDTOFormPlus {
    termin: Termin;
    mainfilms: FilmDTOFormPlus[];
    vorfilms: FilmDTOFormPlus[];
}


// interface FilmDTOFormPlus {
//     film: Film;
//     vorfilm: boolean | null;
//     rang: number | null;
// }