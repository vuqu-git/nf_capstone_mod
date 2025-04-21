import FilmDTOOverviewSemester from "./FilmDTOOverviewSemester.ts";

// this one mirrors TerminDTOWithFilmDTOOverviewSemester
interface TerminDTOWithFilmDTOOverviewSemester{
    terminId: number;
    screeningTime?: string;
    titel?: string | null;

    films: FilmDTOOverviewSemester[];
}

export default TerminDTOWithFilmDTOOverviewSemester;