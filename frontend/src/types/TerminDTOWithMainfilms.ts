import FilmDTOOverviewArchive from "./FilmDTOOverviewArchive.ts";

// this one mirrors TerminDTOWithMainfilme
interface TerminDTOWithMainfilms {
    tnr: number;
    vorstellungsbeginn?: string;
    titel?: string | null;

    mainfilms: FilmDTOOverviewArchive[];
}

export default TerminDTOWithMainfilms;