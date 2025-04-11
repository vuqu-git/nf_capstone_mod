
// FilmDTO for Form

import {Film} from "./Film.ts";

export type FilmInForm = Omit<Film, 'fnr'>;