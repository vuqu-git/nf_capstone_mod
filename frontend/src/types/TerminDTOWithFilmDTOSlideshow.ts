import {FilmDTOForm} from "./FilmDTOForm.ts";

// this one mirrors TerminDTOWithFilmDTOSlideshow
interface TerminDTOWithFilmDTOSlideshow {
    tnr: number;
    vorstellungsbeginn?: string;
    titel?: string | null;
    kurztext?: string | null;
    besonderheit?: string| null;
    bild?: string| null;
    sonderfarbe?: number | null;
    veroeffentlichen?: number | null;
    mainfilms: FilmDTOForm[];
}

export default TerminDTOWithFilmDTOSlideshow;