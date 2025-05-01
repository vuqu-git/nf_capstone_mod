import FilmDTOOverviewSemester from "./FilmDTOOverviewSemester.ts";

// this one mirrors TerminDTOWithFilmDTOOverviewSemester
interface TerminDTOWithFilmDTOOverviewSemester{
    tnr: number;
    screeningTime?: string;
    titel?: string | null;

    mainfilms: FilmDTOOverviewSemester[];

    screeningTotalDuration: number;
}

export default TerminDTOWithFilmDTOOverviewSemester;