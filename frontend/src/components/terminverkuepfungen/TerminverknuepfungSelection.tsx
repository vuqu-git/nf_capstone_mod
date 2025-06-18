import { Form } from "react-bootstrap";
import React from "react";
import {TVWithFilmAndTerminDTOSelection} from "../../types/TVWithFilmAndTerminDTOSelection.ts";

interface TVSelectionProps {
    tvenWithFilmAndTermin: TVWithFilmAndTerminDTOSelection[];
    selectedTVId: string | undefined;
    onSelectTV: (id: string | undefined) => void;
}

export default function TerminverknuepfungSelection({ tvenWithFilmAndTermin, selectedTVId, onSelectTV }: TVSelectionProps) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectTV(e.target.value || undefined);
    }

    return (
        <div>
            <Form.Label htmlFor="tv-selection">Terminverknuepfung selection</Form.Label>
            <Form.Select
                id="tv-selection" // Add id to connect to the label
                value={selectedTVId ?? ""} // Adjust the value prop to handle null by converting it to an empty string (""):
                onChange={handleSelectChange}
            >
                <option value="">Select a Terminverknuepfung to edit (or leave unselected to add a new Terminverknuepfung)</option>
                {tvenWithFilmAndTermin.map((tvFT: TVWithFilmAndTerminDTOSelection) => (
                    <option key={`${tvFT.tnr},${tvFT.fnr}`} value={`${tvFT.tnr},${tvFT.fnr}`}>
                        tnr : fnr | #{tvFT.tnr} : #{tvFT.fnr} | {tvFT.termin.vorstellungsbeginn?.slice(0,-3)} : {tvFT.film.titel} ({tvFT.film.directors}, {tvFT.film.jahr})
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};