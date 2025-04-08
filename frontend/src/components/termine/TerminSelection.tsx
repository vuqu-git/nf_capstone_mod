import { Form } from "react-bootstrap";

import React from "react";
import TerminDTO from "../../types/TerminDTO.ts";

interface TerminSelectionProps {
    termine: TerminDTO[];
    selectedTerminId: number | null;
    onSelectTermin: (id: number | null) => void;
}

function formatDate(dateString: string | undefined): string {
    if (!dateString) {
        return "Invalid date"; // Handle undefined or null dates gracefully
    }

    const date = new Date(dateString);

    // Extract components of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Format as YYYY-MM-DD HH:mm
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default function TerminSelection({ termine, selectedTerminId, onSelectTermin }: TerminSelectionProps) {

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onSelectTermin(Number(e.target.value) || null);
    }

    return (
        <div>
            <Form.Label htmlFor="termin-selection">Termin selection</Form.Label>
            <Form.Select
                id="termin-selection" // Add id to connect to the label
                value={selectedTerminId ?? ""} // Adjust the value prop to handle null by converting it to an empty string (""):
                onChange={handleSelectChange}
                style={{ backgroundColor: 'dimgrey', color: 'whitesmoke' }}
            >
                <option value="">Select a Termin to edit (or leave empty to add new)</option>
                {termine.map((t: TerminDTO) => (
                    <option key={t.tnr} value={t.tnr}>
                        {`${formatDate(t.termin)}: ${t.titel} | #${t.tnr}`}
                    </option>
                ))}
            </Form.Select>
        </div>
    );
};