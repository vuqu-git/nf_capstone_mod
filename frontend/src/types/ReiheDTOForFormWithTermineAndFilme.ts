import TerminDTOWithFilmDTOOverviewArchive from "./TerminDTOWithFilmDTOOverviewArchive.ts";

interface ReiheDTOForFormWithTermineAndFilme {
    rnr?: number; // Primary key, auto-generated, so it might not be present when creating a new Reihe
    titel?: string | null;
    text?: string | null;
    sonderfarbe?: string | null;

    termine: TerminDTOWithFilmDTOOverviewArchive[];
}

export default ReiheDTOForFormWithTermineAndFilme;