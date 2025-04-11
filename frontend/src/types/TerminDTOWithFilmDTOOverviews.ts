// this one mirrors TerminDTOWithFilmDTOOverviews

interface TerminDTOWithFilmDTOOverviews {
    terminId: number;
    screeningTime?: string;
    titel?: string | null;
    kurztext?: string;
    besonderheit?: string;
    sonderfarbe?: number;
    films: FilmDTOOverview[];
}

interface FilmDTOOverview {
    filmId: number;
    titel?: string;
    kurztext?: string;
    besonderheit?: string;
    // jahr?: number;
    bild?: string
    format?: string
    // fskRating?: string;
}

export default TerminDTOWithFilmDTOOverviews;