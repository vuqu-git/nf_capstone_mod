import { Form } from "react-bootstrap";
import {Film} from "../../types/Film.ts";

interface FilmSelectionProps {
    films: Film[];
    selectedFilmId: number | null;
    onSelectFilm: (id: number | null) => void;
}

const formatFilmDetails = (titel: string | undefined, stab: string | null | undefined, jahr: number | null | undefined): string => {
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

export default function FilmSelection({ films, selectedFilmId, onSelectFilm }: FilmSelectionProps) {
    return (
        <div>

            <Form.Label>Film selection</Form.Label>
            <Form.Select
            // Adjust the value prop to handle null by converting it to an empty string (""):
            value={selectedFilmId ?? ""}
                onChange={(e) => onSelectFilm(Number(e.target.value) || null)}>
                <option value="">Select a film to edit (or leave empty to add new)</option>
                {films.map((film) => (
                        <option key={film.fnr} value={film.fnr}>
                            {/*{film.titel}*/}
                            {formatFilmDetails(film.titel, film.stab, film.jahr)}
                        </option>
                ))}
            </Form.Select>
        </div>
    );
};