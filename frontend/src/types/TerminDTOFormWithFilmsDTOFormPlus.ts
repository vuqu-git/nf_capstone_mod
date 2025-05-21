import Termin from "./Termin.ts";
import FilmDTOFormPlus from "./FilmDTOFormPlus.ts";

// this one mirrors the Java class TerminDTOFormWithFilmsDTOFormPlus
// for entries on the ScreeningDetails component
export default interface TerminDTOFormWithFilmsDTOFormPlus {
    termin: Termin;
    mainfilms: FilmDTOFormPlus[];
    vorfilms: FilmDTOFormPlus[];
    terminGesamtlaufzeit: number
}
