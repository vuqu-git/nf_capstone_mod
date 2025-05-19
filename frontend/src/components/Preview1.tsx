import React, {ChangeEvent, useState} from "react";
import {Button, Form} from "react-bootstrap";
import TerminDTOWithFilmDTOGallery from "../types/TerminDTOWithFilmDTOGallery.ts";

interface Props {
    semesterTermine: TerminDTOWithFilmDTOGallery[];
    onSubmit: (selectedObjects: TerminDTOWithFilmDTOGallery[]) => void;
    setSubmittedSlideDuration: (newSlideDuration: number) => void;
    slideDuration: number;

    setShowPreview: (newShowPreview: boolean) => void;
}

const Preview1: React.FC<Props> = ({ semesterTermine, onSubmit, setSubmittedSlideDuration, slideDuration, setShowPreview }) => {

    const [selectedTnrs, setSelectedTnrs] = useState<number[]>([]);
    const [selectedObjects, setSelectedObjects] = useState<TerminDTOWithFilmDTOGallery[]>([]);


    const handleSlideDurationChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        setSubmittedSlideDuration(parseInt(e.target.value, 10));
    };

    const handleScreeningSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(event.target.selectedOptions, option => option.value);

        if (selectedValues.includes('all')) {
            const allTnrs = semesterTermine.map(termin => termin.tnr);
            setSelectedTnrs(allTnrs);
            setSelectedObjects(semesterTermine);
            return;
        }

        if (selectedValues.includes('all_except_first')) {
            const allExceptFirst = semesterTermine.slice(1).map(termin => termin.tnr);
            setSelectedTnrs(allExceptFirst);
            setSelectedObjects(semesterTermine.slice(1));
            return;
        }

        const selectedTnrsNum = selectedValues.map(Number);
        setSelectedTnrs(selectedTnrsNum);
        setSelectedObjects(semesterTermine.filter(termin => selectedTnrsNum.includes(termin.tnr)));
    };

    const isAllSelected = selectedTnrs.length === semesterTermine.length;
    const isAllExceptFirstSelected =
        selectedTnrs.length === semesterTermine.length - 1 &&
        semesterTermine.slice(1).every(termin => selectedTnrs.includes(termin.tnr));

    const selectValue = isAllSelected
        ? ['all']
        : isAllExceptFirstSelected
            ? ['all_except_first']
            : selectedTnrs.map(String);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(selectedObjects);
        setShowPreview(true);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="duration" className="mt-3">
                <Form.Label>Anzeigedauer pro Vorführung in Sekunden</Form.Label>
                <Form.Control
                    type="number"
                    name="duration"
                    min="2"
                    value={slideDuration}
                    onChange={handleSlideDurationChange}
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Wähle die Vorführungen für die Preview aus</Form.Label>
                <Form.Select
                    multiple
                    htmlSize={semesterTermine.length + 2}
                    value={selectValue}
                    onChange={handleScreeningSelectionChange}
                >
                    <option key="all" value="all">
                        Alle Vorführungstermine
                    </option>
                    <option key="all_except_first" value="all_except_first">
                        Alle Vorführungstermine ohne den nächsten
                    </option>
                    {semesterTermine.map(termin => (
                        <option key={termin.tnr} value={termin.tnr}>
                            {termin.vorstellungsbeginn?.slice(0,-3)} | {termin.titel || termin.mainfilms[0].titel}
                        </option>
                    ))}
                </Form.Select>
                <Form.Text className="text-muted">
                    Halte STRG (Windows) oder CMD (Mac) gedrückt, um mehrere, nicht zusammenhängende Vorführungstermine auszuwählen.
                </Form.Text>
            </Form.Group>
            <Button type="submit" className="mt-3">Auswahl bestätigen</Button>
        </Form>
    );
};

export default Preview1;