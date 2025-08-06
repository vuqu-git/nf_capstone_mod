import { Form } from "react-bootstrap";
import React from "react";
import TerminDTOSelection from "../../types/TerminDTOSelection.ts";
import {formatDateInTerminSelectOption} from "../../utils/formatDateInTerminSelectOption.ts";

interface TerminSelectionProps {
    allTermine: TerminDTOSelection[];
    selectedTnr: number | undefined;
    onSelectTermin: (id: number | undefined) => void;
    textForDefaultOption: string | undefined;
}

export default function TerminSelection({
                                            allTermine,
                                            selectedTnr,
                                            onSelectTermin,
                                            textForDefaultOption  = "Select a Termin to edit (or leave empty to add new)",
                                        }: Readonly<TerminSelectionProps>) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectTermin(Number(e.target.value) || undefined);
    }

    return (
        <div>
            <Form.Label htmlFor="termin-selection">Termin selection</Form.Label>
            <Form.Select
                id="termin-selection" // Add id to connect to the label
                value={selectedTnr ?? ""} // Adjust the value prop to handle null/undefined by converting it to an empty string (""):
                onChange={handleSelectChange}
            >
                <option value="">{textForDefaultOption}</option>
                {allTermine.map((t: TerminDTOSelection) => (
                    <option key={t.tnr} value={t.tnr}>
                        {`${formatDateInTerminSelectOption(t.vorstellungsbeginn)} | ${t.titel} | #${t.tnr}`}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};