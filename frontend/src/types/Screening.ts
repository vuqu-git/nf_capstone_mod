// this one mirrors TerminDTOWithFilmDTOOverviews

interface Screening {
    terminId: number;
    screeningTime?: string;
    titel?: string | null;
    kurztext?: string;
    besonderheit?: string;
    sonderfarbe?: number;
    films: FilmsInScreening[];
}

interface FilmsInScreening {
    filmId: number;
    titel?: string;
    kurztext?: string;
    besonderheit?: string;
    // jahr?: number;
    bild?: string
    format?: string
    // fskRating?: string;
}

export default Screening;