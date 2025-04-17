import FilmDTOOverview from "./FilmDTOOverview.ts";

// this one mirrors TerminDTOWithFilmDTOOverviews
interface TerminDTOWithFilmDTOOverviews {
    terminId: number;
    screeningTime?: string;
    titel?: string | null;
    kurztext?: string | null;
    besonderheit?: string| null;
    bild?: string| null;
    sonderfarbe?: number | null;
    veroeffentlichen?: number | null;
    films: FilmDTOOverview[];
}

export default TerminDTOWithFilmDTOOverviews;