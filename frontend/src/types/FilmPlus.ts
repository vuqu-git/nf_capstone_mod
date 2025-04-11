import {Film} from "./Film.ts";

// corresponds to java class FilmDTOFormPlus

export default interface FilmPlus {
    film: Film;
    vorfilm: boolean | null;
    rang: number | null;
}