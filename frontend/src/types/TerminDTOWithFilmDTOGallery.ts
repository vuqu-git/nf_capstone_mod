import FilmDTOGallery from "./FilmDTOGallery.ts";

// this one mirrors TerminDTOWithFilmDTOGallery
interface TerminDTOWithFilmDTOGallery {
    tnr: number;
    vorstellungsbeginn?: string;
    titel?: string | null;
    kurztext?: string | null;
    besonderheit?: string| null;
    bild?: string| null;
    sonderfarbe?: number | null;
    veroeffentlichen?: number | null;
    mainfilms: FilmDTOGallery[];
}

export default TerminDTOWithFilmDTOGallery;