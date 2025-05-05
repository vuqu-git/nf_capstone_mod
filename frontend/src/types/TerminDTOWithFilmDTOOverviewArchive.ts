import FilmDTOOverviewArchive from "./FilmDTOOverviewArchive.ts";

// this one mirrors TerminDTOWithFilmDTOOverviewArchive
interface TerminDTOWithFilmDTOOverviewArchive{
    tnr: number;
    vorstellungsbeginn?: string;
    titel?: string | null;

    films: FilmDTOOverviewArchive[];
}

export default TerminDTOWithFilmDTOOverviewArchive;