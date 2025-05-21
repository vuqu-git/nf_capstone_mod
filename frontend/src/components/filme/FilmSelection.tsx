import { Form } from "react-bootstrap";
import React from "react";
import {FilmDTOSelection} from "../../types/FilmDTOSelection.ts";
import {formatFilmDetailsInFilmSelectOption} from "../../utils/formatFilmDetailsInFilmSelectOption.ts";

interface FilmSelectionProps {
    films: FilmDTOSelection[];
    selectedFilmId: number | undefined;
    onSelectFilm: (id: number  | undefined) => void;
}

export default function FilmSelection({ films, selectedFilmId, onSelectFilm }: FilmSelectionProps) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectFilm(Number(e.target.value) || undefined);
    }

    return (
        <div>
            <Form.Label htmlFor="film-selection">Film selection</Form.Label>
            <Form.Select
                id="film-selection" // Add id to connect to the label
                value={selectedFilmId ?? ""} // Adjust the value prop to handle null by converting it to an empty string (""):
                onChange={handleSelectChange}
            >
                <option value="">Select a film to edit (or leave empty to add new)</option>
                {films.map((film) => (
                        <option key={film.fnr} value={film.fnr}>
                            {`${formatFilmDetailsInFilmSelectOption(film.titel, film.stab, film.jahr)} | #${film.fnr}`}
                        </option>
                ))}
            </Form.Select>
        </div>
    );
};