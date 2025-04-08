// FilmsSelector.tsx (shared component)
import { Form } from "react-bootstrap";
import { FilmDTO } from "../../types/FilmDTO.ts";

interface Props {
    allFilms: FilmDTO[];
    selectedId: string;
    onSelect: (fnrInSelectOption: string) => void;
    // formType: "edit" | "add"; // determines whether the selector is for editing or adding
}

const formatFilmDetails = (titel: string, stab: string | null | undefined, jahr: number | null | undefined): string => {
    let details = "";
    let titleWithSpace = titel;

    const hasStab = stab && stab.trim() !== "";
    const hasJahr = jahr !== null && jahr !== undefined && String(jahr).trim() !== "";

    if (hasStab || hasJahr) {
        titleWithSpace += " "; // Add a space after the title
        details += "(";
        if (hasStab) {
            details += stab.trim();
            if (hasJahr) {
                details += ", ";
            }
        }
        if (hasJahr) {
            details += String(jahr).trim();
        }
        details += ")";
    }

    return `${titleWithSpace}${details}`;
};

export const FilmsSelector = ({ allFilms, selectedId, onSelect }: Props) => (
    <Form.Group>
        <Form.Label>Select a specific film entry for editing, otherwise keep "Select here..." for adding a new film entry</Form.Label>
        <Form.Select
            value={selectedId}
            onChange={(e) => onSelect(e.target.value)}
            disabled={!allFilms.length}
        >
            <option value="">Select here...</option>
            {allFilms.map((film) => (
                <option key={film.fnr} value={film.fnr}>
                    {/*{film.titel} ({film.stab}, {film.jahr})*/}
                    {formatFilmDetails(film.titel, film.stab, film.jahr)}
                </option>
            ))}
        </Form.Select>
    </Form.Group>
);
