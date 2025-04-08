interface Screening {
    terminId: number;
    screeningTime?: string;
    titel?: string | null;
    kurztext?: string;
    besonderheit?: string;
    films: FilmInScreening[];
}

interface FilmInScreening {
    filmId: number;
    titel?: string;
    kurztext?: string;
    besonderheit?: string;
    jahr?: number;
    bild?: string
    fskRating?: string;
}

export default Screening;