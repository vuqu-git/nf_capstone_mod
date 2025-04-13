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

export default FilmDTOOverview;