import FilmDTOOverviewSemester from "./FilmDTOOverviewSemester.ts";

// this one mirrors TerminDTOWithFilmDTOOverviewSemester
interface TerminDTOWithFilmDTOOverviewSemester{
    tnr: number;
    vorstellungsbeginn?: string;
    titel?: string | null;

    mainfilms: FilmDTOOverviewSemester[];

    terminGesamtlaufzeit: number;
}

export default TerminDTOWithFilmDTOOverviewSemester;