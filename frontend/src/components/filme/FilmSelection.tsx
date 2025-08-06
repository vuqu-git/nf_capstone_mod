import { Form } from "react-bootstrap";
import React from "react";
import {FilmDTOSelection} from "../../types/FilmDTOSelection.ts";
import {formatFilmDetailsInFilmSelectOption} from "../../utils/formatFilmDetailsInFilmSelectOption.ts";

interface FilmSelectionProps {
    allFilms: FilmDTOSelection[];
    selectedFilmId: number | undefined;
    onSelectFilm: (id: number  | undefined) => void;
    textForDefaultOption: string | undefined;
}

export default function FilmSelection({
                                          allFilms,
                                          selectedFilmId,
                                          onSelectFilm,
                                          textForDefaultOption = "Select a film to edit (or leave empty to add new)",
                                      }: Readonly<FilmSelectionProps>) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectFilm(Number(e.target.value) || undefined);
    }

    return (
        <div>
            <Form.Label htmlFor="film-selection">Film selection</Form.Label>
            <Form.Select
                id="film-selection" // Add id to connect to the label
                value={selectedFilmId ?? ""} // Adjust the value prop to handle null/undefined by converting it to an empty string (""):
                onChange={handleSelectChange}
            >
                <option value="">{textForDefaultOption}</option>
                {allFilms.map((film) => (
                        <option key={film.fnr} value={film.fnr}>
                            {`${formatFilmDetailsInFilmSelectOption(film.titel, film.regie, film.jahr)} | #${film.fnr}`}
                        </option>
                ))}
            </Form.Select>
        </div>
    );
};