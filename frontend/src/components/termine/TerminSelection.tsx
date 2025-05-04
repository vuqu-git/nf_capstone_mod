import { Form } from "react-bootstrap";

import React from "react";
import TerminDTOSelection from "../../types/TerminDTOSelection.ts";
import {formatDateInTerminSelectOption} from "../../utils/formatDateInTerminSelectOption.ts";

interface TerminSelectionProps {
    termine: TerminDTOSelection[];
    selectedTerminId: number | undefined;
    onSelectTermin: (id: number | undefined) => void;
}


export default function TerminSelection({ termine, selectedTerminId, onSelectTermin }: TerminSelectionProps) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectTermin(Number(e.target.value) || undefined);
    }

    return (
        <div>
            <Form.Label htmlFor="termin-selection">Termin selection</Form.Label>
            <Form.Select
                id="termin-selection" // Add id to connect to the label
                value={selectedTerminId ?? ""} // Adjust the value prop to handle null by converting it to an empty string (""):
                onChange={handleSelectChange}
                // style={{ backgroundColor: 'dimgrey', color: 'whitesmoke' }}
            >
                {/*<option value="" disabled selected>Select a Termin to edit (or leave empty to add new)</option>*/}
                <option value="" selected>Select a Termin to edit (or leave empty to add new)</option>
                {termine.map((t: TerminDTOSelection) => (
                    <option key={t.tnr} value={t.tnr}>
                        {`${formatDateInTerminSelectOption(t.termin)} | ${t.titel} | #${t.tnr}`}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};