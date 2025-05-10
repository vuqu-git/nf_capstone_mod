import FilmDTOOverviewSemester from "./FilmDTOOverviewSemester.ts";

// this one mirrors TerminDTOWithFilmDTOOverviewSemester
// for entries on the OverviewSemester component
interface TerminDTOWithFilmDTOOverviewSemester{
    tnr: number;
    vorstellungsbeginn?: string;
    titel?: string | null;

    mainfilms: FilmDTOOverviewSemester[];
    terminGesamtlaufzeit: number;
}

export default TerminDTOWithFilmDTOOverviewSemester;