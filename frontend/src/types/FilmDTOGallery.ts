interface FilmDTOGallery {
    fnr: number;
    titel?: string | null;
    kurztext?: string | null;
    besonderheit?: string | null;
    jahr?: number;
    bild?: string | null;
    offsetImageInGallery?: string; // i.e. string | undefined

    format?: string | null;
    regie?: string | null;

    laufzeit?: number | null;
    sonderfarbe?: string | null;
}

export default FilmDTOGallery;