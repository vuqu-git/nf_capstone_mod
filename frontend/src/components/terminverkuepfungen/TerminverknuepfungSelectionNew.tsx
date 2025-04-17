import { Form } from "react-bootstrap";

import React from "react";
import {TVWithFilmAndTerminDTOSelection} from "../../types/TVWithFilmAndTerminDTOSelection.ts";

interface TVSelectionProps {
    tvenFT: TVWithFilmAndTerminDTOSelection[];
    selectedTVId: string | null;
    onSelectTV: (id: string | null) => void;
}

export default function TerminverknuepfungSelectionNew({ tvenFT, selectedTVId, onSelectTV }: TVSelectionProps) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectTV(e.target.value || null);
    }

    return (
        <div>
            <Form.Label htmlFor="tv-selection">Terminverknuepfung selection (ordered by screening date)</Form.Label>
            <Form.Select
                id="tv-selection" // Add id to connect to the label
                value={selectedTVId ?? ""} // Adjust the value prop to handle null by converting it to an empty string (""):
                onChange={handleSelectChange}
                // style={{ backgroundColor: 'dimgrey', color: 'whitesmoke' }}
            >
                <option value="">Select a Terminverknuepfung to edit (or leave unselected to add a new Terminverknuepfung)</option>
                {tvenFT.map((tvFT: TVWithFilmAndTerminDTOSelection) => (
                    <option key={`${tvFT.tnr},${tvFT.fnr}`} value={`${tvFT.tnr},${tvFT.fnr}`}>
                        tnr : fnr | #{tvFT.tnr} : #{tvFT.fnr} | {tvFT.termin.termin?.slice(0,-3)} : {tvFT.film.titel} ({tvFT.film.directors}, {tvFT.film.jahr})
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};