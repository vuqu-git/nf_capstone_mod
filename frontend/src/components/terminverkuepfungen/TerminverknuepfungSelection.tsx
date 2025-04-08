import { Form } from "react-bootstrap";

import React from "react";
import {Terminverknuepfung} from "../../types/Terminverknuepfung.ts";

interface TVSelectionProps {
    tven: Terminverknuepfung[];
    selectedTVId: string | null;
    onSelectTV: (id: string | null) => void;
}

export default function TerminverknuepfungSelection({ tven, selectedTVId, onSelectTV }: TVSelectionProps) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectTV(e.target.value || null);
    }

    return (
        <div>
            <Form.Label htmlFor="tv-selection">Terminverknuepfung selection</Form.Label>
            <Form.Select
                id="tv-selection" // Add id to connect to the label
                value={selectedTVId ?? ""} // Adjust the value prop to handle null by converting it to an empty string (""):
                onChange={handleSelectChange}
                style={{ backgroundColor: 'dimgrey', color: 'whitesmoke' }}
            >
                <option value="">Select a Terminverknuepfung to edit (or leave empty to add new)</option>
                {tven.map((tv: Terminverknuepfung) => (
                    <option key={`${tv.tnr},${tv.fnr}`} value={`${tv.tnr},${tv.fnr}`}>
                        tnr : fnr | #{tv.tnr} : #{tv.fnr}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};