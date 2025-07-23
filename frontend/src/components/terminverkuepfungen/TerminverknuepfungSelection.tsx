import { Form } from "react-bootstrap";
import React from "react";
import {TVWithFilmAndTerminDTOSelection} from "../../types/TVWithFilmAndTerminDTOSelection.ts";

interface TVSelectionProps {
    tvenWithFilmAndTermin: TVWithFilmAndTerminDTOSelection[];
    selectedTVId: string | undefined;
    onSelectTV: (id: string | undefined) => void;
    textForDefaultOption: string | undefined;
}

export default function TerminverknuepfungSelection({
                                                        tvenWithFilmAndTermin,
                                                        selectedTVId,
                                                        onSelectTV,
                                                        textForDefaultOption="Select a Terminverknuepfung to edit (or leave unselected to add a new Terminverknuepfung)",
}: Readonly<TVSelectionProps>) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectTV(e.target.value || undefined);
    }

    return (
        <div>
            <Form.Label htmlFor="tv-selection">Terminverknuepfung selection</Form.Label>
            <Form.Select
                id="tv-selection" // Add id to connect to the label
                value={selectedTVId ?? ""} // Adjust the value prop to handle null/undefined by converting it to an empty string (""):
                onChange={handleSelectChange}
            >
                <option value="">{textForDefaultOption}</option>
                {tvenWithFilmAndTermin.map((tvFT: TVWithFilmAndTerminDTOSelection) => (
                    <option key={`${tvFT.tnr},${tvFT.fnr}`} value={`${tvFT.tnr},${tvFT.fnr}`}>
                        tnr : fnr | #{tvFT.tnr} : #{tvFT.fnr} | {tvFT.termin.vorstellungsbeginn?.slice(0,-3)} : {tvFT.film.titel} ({tvFT.film.regie}, {tvFT.film.jahr})
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};