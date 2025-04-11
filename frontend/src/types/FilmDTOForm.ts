
// FilmDTOForm

import {Film} from "./Film.ts";

export type FilmDTOForm = Omit<Film, 'fnr'>;