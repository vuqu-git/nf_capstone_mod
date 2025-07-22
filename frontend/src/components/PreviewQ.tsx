import React, {useState, ChangeEvent} from "react";
import {Button, Form} from "react-bootstrap";

import {Link, useLoaderData, useNavigate} from "react-router-dom";
import TerminDTOWithFilmAndReiheDTOGallery from "../types/TerminDTOWithFilmAndReiheDTOGallery.ts";



interface Configuration {
    duration?: number;
    next?: number;
    skipnext?: boolean;
}

export default function PreviewQ() {

    const semesterTermine = useLoaderData<TerminDTOWithFilmAndReiheDTOGallery[]>();


    const [selectedTnrs, setSelectedTnrs] = useState<number[]>([]);
    const [selectedObjects, setSelectedObjects] = useState<TerminDTOWithFilmAndReiheDTOGallery[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValues = Array.from(event.target.selectedOptions, option => option.value);

        // Handle special options
        if (selectedValues.includes('all')) {
            // Select all
            const allTnrs = semesterTermine.map(termin => termin.tnr);
            setSelectedTnrs(allTnrs);
            setSelectedObjects(semesterTermine);
            return;
        }

        if (selectedValues.includes('all_except_first')) {
            // Select all except first
            const allExceptFirst = semesterTermine.slice(1).map(termin => termin.tnr);
            setSelectedTnrs(allExceptFirst);
            setSelectedObjects(semesterTermine.slice(1));
            return;
        }

        // Normal selection
        const selectedTnrsNum = selectedValues.map(Number);
        setSelectedTnrs(selectedTnrsNum);
        setSelectedObjects(semesterTermine.filter(termin => selectedTnrsNum.includes(termin.tnr)));
    };

    // Determine if special options should appear selected
    const isAllSelected = selectedTnrs.length === semesterTermine.length;
    const isAllExceptFirstSelected =
        selectedTnrs.length === semesterTermine.length - 1 &&
        semesterTermine.slice(1).every(termin => selectedTnrs.includes(termin.tnr));

    const selectValue = isAllSelected
        ? ['all']
        : isAllExceptFirstSelected
            ? ['all_except_first']
            : selectedTnrs.map(String);

    // ######################################################

    const [configuration, setConfiguration] = useState<Configuration>({
        duration: undefined,
        next: undefined,
        skipnext: true,
    });

    const navigate = useNavigate();


    // Handle termin form field changes
    const handleFormChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;

        setConfiguration((prevData: Configuration | undefined) => {
            if (prevData) {
                return {
                    ...prevData,
                    [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
                };
            }
            return {
                [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const queryParams = new URLSearchParams();

        if (configuration.duration !== undefined) {
            queryParams.set('duration', String(configuration.duration));
        }
        if (configuration.next !== undefined) {
            queryParams.set('next', String(configuration.next));
        }
        if (configuration.skipnext !== undefined) {
            queryParams.set('skipnext', String(configuration.skipnext));
        }

        const queryString = queryParams.toString();
        navigate(`/startpreviewq${queryString ? `?${queryString}` : ''}`);
    };


    return (
        <div data-bs-theme="dark">
            <Link to={`/admin`}>
                zum Adminbereich
            </Link>

            <h3 className="mt-3">Hinweise</h3>

            <p>Im Edge Browser ist das aktivieren sowie deaktivieren komplette Vollbildansicht (ohne jegliche Menüs und Leisten) mit der Taste <b>F11</b> möglich.</p>
            <p>Für eine optimale Darstellung wird eine Bildschirmhöhe von mindestens 1080 Pixeln empfohlen.</p>


            <Form onSubmit={handleSubmit}>

                <h3 className="mt-3">Configure Preview</h3>

                <Form.Group controlId="duration" className="mt-3">
                    <Form.Label>Anzeigedauer pro Vorführung in Sekunden</Form.Label>
                    <Form.Control
                        type="number"
                        name="duration"
                        min="1"
                        placeholder="60"
                        value={configuration.duration || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="next" className="mt-3">
                    <Form.Label>Anzahl der angezeigten nächsten Vorführungen</Form.Label>

                    <Form.Control
                        type="number"
                        name="next"
                        min="1"
                        // placeholder="10"
                        value={configuration.next || ""}
                        onChange={handleFormChange}
                    />
                    <Form.Text className="text-muted">
                        Leerlassen für <b>alle</b> künftigen Vorführungen
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="skipnext" className="mt-3">
                    <Form.Check
                        type="checkbox"
                        name="skipnext"
                        label="Unmittelbar nächste Vorführung überspringen"
                        checked={configuration?.skipnext || false}
                        onChange={handleFormChange}
                    />
                    <Form.Text className="text-muted">
                        Wenn am Spieltag einer Vorführung die Preview gespielt wird, sollte der Haken gesetzt werden.
                    </Form.Text>
                </Form.Group>


                <Button variant="primary" type="submit" className="mt-4">
                    Start preview
                </Button>
            </Form>


            {/*###########################################*/}

            <>
                <Form.Group>
                    <Form.Label>Wähle die Vorführungen für die Preview aus</Form.Label>
                    <Form.Select
                        multiple
                        htmlSize={semesterTermine.length + 2} // +2 for both special options
                        value={selectValue}
                        onChange={handleChange}
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
                                {/*{termin.vorstellungsbeginn} | {termin.titel || "kein Programmtitel"}*/}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Text className="text-muted">
                        Halte STRG (Windows) oder CMD (Mac) gedrückt, um mehrere, nicht zusammenhängende Vorführungstermine auszuwählen.
                    </Form.Text>
                </Form.Group>

                <div className="mt-3">
                    <h5>Ausgewählte Termine:</h5>
                    <ul>
                        {selectedObjects.map(termin => (
                            <li key={termin.tnr}>
                                {termin.titel || termin.mainfilms[0].titel} ({termin.vorstellungsbeginn?.slice(0,-3)})
                            </li>
                        ))}
                    </ul>
                </div>
            </>

        </div>
    );
}