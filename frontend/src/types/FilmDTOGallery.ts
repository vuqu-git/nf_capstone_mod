interface FilmDTOGallery {
    fnr: number;
    titel?: string | null;
    kurztext?: string | null;
    besonderheit?: string | null;
    jahr?: number;
    bild?: string | null;
    format?: string | null;
    laufzeit?: number | null;
    regie?: string | null;
}

export default FilmDTOGallery;