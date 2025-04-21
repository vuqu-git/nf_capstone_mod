import FilmDTOOverviewArchive from "./FilmDTOOverviewArchive.ts";

// this one mirrors TerminDTOWithFilmDTOOverviewArchive
interface TerminDTOWithFilmDTOOverviewArchive{
    terminId: number;
    screeningTime?: string;
    titel?: string | null;

    films: FilmDTOOverviewArchive[];
}

export default TerminDTOWithFilmDTOOverviewArchive;