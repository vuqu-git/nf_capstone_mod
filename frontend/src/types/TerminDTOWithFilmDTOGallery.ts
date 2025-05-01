import FilmDTOGallery from "./FilmDTOGallery.ts";

// this one mirrors TerminDTOWithFilmDTOGallery
interface TerminDTOWithFilmDTOGallery {
    tnr: number;
    screeningTime?: string;
    titel?: string | null;
    kurztext?: string | null;
    besonderheit?: string| null;
    bild?: string| null;
    sonderfarbe?: number | null;
    veroeffentlichen?: number | null;
    films: FilmDTOGallery[];
}

export default TerminDTOWithFilmDTOGallery;