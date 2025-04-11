// this one mirrors TerminDTOWithFilmDTOOverviews

interface TerminDTOWithFilmDTOOverviews {
    terminId: number;
    screeningTime?: string;
    titel?: string | null;
    kurztext?: string | null;
    besonderheit?: string| null;
    sonderfarbe?: number | null;
    films: FilmDTOOverview[];
}

interface FilmDTOOverview {
    filmId: number;
    titel?: string | null;
    kurztext?: string | null;
    besonderheit?: string | null;
    jahr?: number;
    bild?: string | null;
    format?: string | null;
    // fskRating?: string;
}

export default TerminDTOWithFilmDTOOverviews;