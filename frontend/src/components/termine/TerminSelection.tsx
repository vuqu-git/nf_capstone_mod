import { Form } from "react-bootstrap";
import React from "react";
import TerminDTOSelection from "../../types/TerminDTOSelection.ts";
import {formatDateInTerminSelectOption} from "../../utils/formatDateInTerminSelectOption.ts";

interface TerminSelectionProps {
    termine: TerminDTOSelection[];
    selectedTnr: number | undefined;
    onSelectTermin: (id: number | undefined) => void;
}

export default function TerminSelection({ termine, selectedTnr, onSelectTermin }: TerminSelectionProps) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectTermin(Number(e.target.value) || undefined);
    }

    return (
        <div>
            <Form.Label htmlFor="termin-selection">Termin selection</Form.Label>
            <Form.Select
                id="termin-selection" // Add id to connect to the label
                value={selectedTnr ?? ""} // Adjust the value prop to handle null by converting it to an empty string (""):
                onChange={handleSelectChange}
            >
                <option value="" selected>Select a Termin to edit (or leave empty to add new)</option>
                {termine.map((t: TerminDTOSelection) => (
                    <option key={t.tnr} value={t.tnr}>
                        {`${formatDateInTerminSelectOption(t.vorstellungsbeginn)} | ${t.titel} | #${t.tnr}`}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};