import FilmDTOOverviewArchive from "./FilmDTOOverviewArchive.ts";

// this one mirrors TerminDTOWithMainFilme but mainfilms objects are leaner containing only fnr and titel attributes
interface TerminDTOWithMainFilme{
    tnr: number;
    vorstellungsbeginn?: string;
    titel?: string | null;

    mainfilms: FilmDTOOverviewArchive[];
}

export default TerminDTOWithMainFilme;