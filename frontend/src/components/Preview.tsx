import React, {useState, useEffect, ChangeEvent} from "react";
import TerminSelection from "./TerminSelection";
import Termin from "../../types/Termin.ts";
import TerminDTOSelection from "../../types/TerminDTOSelection.ts";
import {Button, Form} from "react-bootstrap";
import axios from "axios";

import { preprocessFormData } from '../../utils/preprocessFormData.ts';
import {Link, useLoaderData, useNavigate} from "react-router-dom";
import TerminDTOWithFilmDTOOverviewSemester from "../types/TerminDTOWithFilmDTOOverviewSemester.ts";
import TerminDTOWithFilmDTOGallery from "../types/TerminDTOWithFilmDTOGallery.ts";

const baseURL = "/api/termine";

const emptyTerminForForm = {
    tnr: 0,
    termin: '',
    titel: '',
    text: '',
    kurztext: '',
    besonderheit: '',
    bild: '',
    startReservierung: '',
    linkReservierung: '',
    sonderfarbeTitel: undefined,
    sonderfarbe: undefined,
    veroeffentlichen: 0,
}

interface Configuration {
    duration?: number;
    next?: number;
    skipnext?: boolean;
}

export default function Preview() {

    const semesterTermine = useLoaderData<TerminDTOWithFilmDTOGallery[]>();


    const [selectedTnrs, setSelectedTnrs] = useState<number[]>([]);
    const [selectedObjects, setSelectedObjects] = useState<TerminDTOWithFilmDTOGallery[]>([]);

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



    const [allTermine, setAllTermine] = useState<TerminDTOSelection[]>([]); // All Termine fetched from the server
    const [selectedTerminId, setSelectedTerminId] = useState<number | undefined>(undefined); // Selected Termin for editing or deleting
    const [selectedTermin, setSelectedTermin] = useState<Termin>(emptyTerminForForm); // Termin data for the form

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>(""); // for POST, PUT, DELETE requests

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // for POST, PUT
    const [isGetLoading, setIsGetLoading] = useState(false); // for GET

    const [selectionChanged, setSelectionChanged] = useState(false); // to track if a new selection has been made manually by the user

    // // GET all termine
    // const getAllTermine = () => {
    //     // setIsLoading(true);
    //     setErrorMessage("");
    //
    //     axios.get(`${baseURL}/allsorted`)
    //         .then((response) => setAllTermine(response.data))
    //         .catch((error) => {
    //             const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    //             setErrorMessage(errorMessage);
    //         })
    //     // .finally(() => setIsLoading(false));
    // };
    //
    // // Fetch all termine for the dropdown selection
    // useEffect(() => {
    //     getAllTermine();
    // }, []);

    // // Fetch the selected termin details only if we are editing or deleting
    // useEffect(() => {
    //
    //     if (selectionChanged) {
    //         // Reset the success message when the selected termin changes
    //         setSuccessMessage("");
    //         setSelectionChanged(false); // Reset the flag
    //     }
    //
    //     if (selectedTerminId) {
    //         // GET single termin (details)
    //         const getSingleTermin = () => {
    //
    //             setIsGetLoading(true);
    //             setErrorMessage("");
    //
    //             axios.get(`${baseURL}/${selectedTerminId}`)
    //                 .then((response) => setSelectedTermin(response.data))
    //                 .catch((error) => {
    //                     const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    //                     setErrorMessage(errorMessage);
    //                 })
    //                 .finally(() => setIsGetLoading(false));
    //         };
    //
    //         getSingleTermin();
    //
    //     } else {
    //         // Reset the form for adding a new termin
    //         setSelectedTermin(emptyTerminForForm);
    //     }
    // }, [selectedTerminId]);


    // // Handle the form submission (PUT or POST)
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //
    //     setErrorMessage("");
    //     setSuccessMessage("");
    //     setIsLoading(true);
    //
    //     // Check if we're adding or editing a termin
    //     if (selectedTerminId) {
    //         // Editing an existing termin (PUT request)
    //
    //         axios.put(`${baseURL}/${selectedTerminId}`, preprocessFormData(selectedTermin))
    //             .then(() => {
    //                 setSuccessMessage("Termin updated successfully!");
    //
    //                 getAllTermine();
    //                 setSelectedTerminId(undefined); // Reset the selection
    //                 setSelectedTermin(emptyTerminForForm); // Reset the form
    //             })
    //             .catch((error) => {
    //                 const errorMessage = error instanceof Error ? error.message : "Update failed";
    //                 setErrorMessage(errorMessage);
    //             })
    //             .finally(() => setIsLoading(false));
    //     } else {
    //
    //         // ###################################################
    //         const { tnr, ...terminInFormWithoutFnr } = selectedTermin;
    //         // ###################################################
    //
    //         // axios.post(`${baseURL}`, selectedTermin)
    //         axios.post(`${baseURL}`, preprocessFormData(terminInFormWithoutFnr))
    //             .then(() => {
    //                 setSuccessMessage("Termin saved successfully!");
    //
    //                 getAllTermine();
    //                 // setSelectedTerminId(undefined); // Reset the selection, not required for POST because selection is unchanged
    //                 setSelectedTermin(emptyTerminForForm); // Reset the form
    //             })
    //             .catch((error) => {
    //                 const errorMessage = error instanceof Error ? error.message : "Saving failed";
    //                 setErrorMessage(errorMessage);
    //             })
    //             .finally(() => setIsLoading(false));
    //
    //     }
    // };



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
        navigate(`/startpreview${queryString ? `?${queryString}` : ''}`);
    };

    // // Handle selection changes
    // const handleSelectionChange = (id: number | undefined) => {
    //     setSelectedTerminId(id);
    //     setSelectionChanged(true); // Set flag when selection changes
    // };

    return (
        <div data-bs-theme="dark">
            <Link to={`/admin`}>
                zum Adminbereich
            </Link>

            <h3 className="mt-3">Hinweise</h3>

            <p>Im Edge Browser ist das aktivieren sowie deaktivieren komplette Vollbildansicht (ohne jegliche Menüs und Leisten) mit der Taste <b>F11</b> möglich.</p>
            <p>Für eine optimale Darstellung wird eine Bildschirmhöhe von mindestens 1080 Pixeln empfohlen.</p>

            {/*<TerminSelection*/}
            {/*    termine={allTermine}*/}
            {/*    selectedTerminId={selectedTerminId}*/}
            {/*    onSelectTermin={handleSelectionChange}*/}
            {/*/>*/}

            <div style={{ minHeight: '30px' }}>
                {isGetLoading && <div className="text-warning mb-3">&#x1f504; Loading Termin details... Please wait!</div>}
            </div>

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

            {isLoading && <div className="text-warning mb-3">&#x1f504; Perform {selectedTerminId ? "updating " : "saving "} termin entry... Please wait!</div>}
            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}


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