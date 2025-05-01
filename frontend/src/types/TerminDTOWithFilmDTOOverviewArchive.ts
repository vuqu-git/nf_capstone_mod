import FilmDTOOverviewArchive from "./FilmDTOOverviewArchive.ts";

// this one mirrors TerminDTOWithFilmDTOOverviewArchive
interface TerminDTOWithFilmDTOOverviewArchive{
    tnr: number;
    screeningTime?: string;
    titel?: string | null;

    films: FilmDTOOverviewArchive[];
}

export default TerminDTOWithFilmDTOOverviewArchive;