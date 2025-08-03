import { Form } from "react-bootstrap";
import React from "react";
import ReiheDTOSelection from "../../types/ReiheDTOSelection.ts";

interface ReiheSelectionProps {
    allReihen: ReiheDTOSelection[];
    selectedReiheId: number | undefined;
    onSelectReihe: (id: number | undefined) => void;
    textForDefaultOption: string | undefined;
}

export default function ReiheSelection({
                                           allReihen,
                                           selectedReiheId,
                                           onSelectReihe,
                                           textForDefaultOption  = "Select a Reihe to edit (or leave unselected to add a new Reihe)",
                                       }: Readonly<ReiheSelectionProps>) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectReihe(Number(e.target.value) || undefined);
    }

    return (
        <div>
            <Form.Label htmlFor="reihe-selection">Reihe selection</Form.Label>
            <Form.Select
                id="reihe-selection" // Add id to connect to the label
                value={selectedReiheId ?? ""} // Adjust the value prop to handle null/undefined by converting it to an empty string (""):
                onChange={handleSelectChange}
            >
                <option value="">{textForDefaultOption}</option>
                {allReihen.map((reihe: ReiheDTOSelection) => (
                    <option key={reihe.rnr} value={reihe.rnr}>
                        {`${reihe.titel} | #${reihe.rnr}`}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};