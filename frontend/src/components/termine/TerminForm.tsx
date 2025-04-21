import React, { useState, useEffect } from "react";
import TerminSelection from "./TerminSelection";
import Termin from "../../types/Termin.ts";
import TerminDTOSelection from "../../types/TerminDTOSelection.ts";
import {Button, Form} from "react-bootstrap";
import axios from "axios";

import { preprocessFormData } from '../../utils/PreprocessingFormData.ts';

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

export default function TerminForm() {
    const [allTermine, setAllTermine] = useState<TerminDTOSelection[]>([]); // All Termine fetched from the server
    const [selectedTerminId, setSelectedTerminId] = useState<number | undefined>(undefined); // Selected Termin for editing or deleting
    const [selectedTermin, setSelectedTermin] = useState<Termin>(emptyTerminForForm); // Termin data for the form

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>(""); // for POST, PUT, DELETE requests

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // for POST, PUT
    const [isGetLoading, setIsGetLoading] = useState(false); // for GET

    const [selectionChanged, setSelectionChanged] = useState(false); // to track if a new selection has been made manually by the user

    // GET all termine
    const getAllTermine = () => {
        // setIsLoading(true);
        setErrorMessage("");

        axios.get(`${baseURL}/allsorted`)
            .then((response) => setAllTermine(response.data))
            .catch((error) => {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                setErrorMessage(errorMessage);
            })
        // .finally(() => setIsLoading(false));
    };

    // Fetch all termine for the dropdown selection
    useEffect(() => {
        getAllTermine();
    }, []);

    // Fetch the selected termin details only if we are editing or deleting
    useEffect(() => {

        if (selectionChanged) {
            // Reset the success message when the selected termin changes
            setSuccessMessage("");
            setSelectionChanged(false); // Reset the flag
        }

        if (selectedTerminId) {
            // GET single termin (details)
            const getSingleTermin = () => {

                setIsGetLoading(true);
                setErrorMessage("");

                axios.get(`${baseURL}/${selectedTerminId}`)
                    .then((response) => setSelectedTermin(response.data))
                    .catch((error) => {
                        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                        setErrorMessage(errorMessage);
                    })
                    .finally(() => setIsGetLoading(false));
            };

            getSingleTermin();

        } else {
            // Reset the form for adding a new termin
            setSelectedTermin(emptyTerminForForm);
        }
    }, [selectedTerminId]);


    // Handle the form submission (PUT or POST)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");
        setIsLoading(true);

        // Check if we're adding or editing a termin
        if (selectedTerminId) {
            // Editing an existing termin (PUT request)

            axios.put(`${baseURL}/${selectedTerminId}`, preprocessFormData(selectedTermin))
                .then(() => {
                    setSuccessMessage("Termin updated successfully!");

                    getAllTermine();
                    setSelectedTerminId(undefined); // Reset the selection
                    setSelectedTermin(emptyTerminForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Update failed";
                    setErrorMessage(errorMessage);
                })
                .finally(() => setIsLoading(false));
        } else {

            // ###################################################
            const { tnr, ...terminInFormWithoutFnr } = selectedTermin;
            // ###################################################

            // axios.post(`${baseURL}`, selectedTermin)
            axios.post(`${baseURL}`, preprocessFormData(terminInFormWithoutFnr))
                .then(() => {
                    setSuccessMessage("Termin saved successfully!");

                    getAllTermine();
                    // setSelectedTerminId(undefined); // Reset the selection, not required for POST because selection is unchanged
                    setSelectedTermin(emptyTerminForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Saving failed";
                    setErrorMessage(errorMessage);
                })
                .finally(() => setIsLoading(false));

        }
    };

    // Handle DELETE
    const handleDelete = () => {
        setErrorMessage("");
        setSuccessMessage("");
        if (selectedTerminId) {

            axios.delete(`${baseURL}/${selectedTerminId}`)
                .then(() => {
                    setSuccessMessage("Termin deleted successfully!");

                    getAllTermine();
                    setConfirmDeleteOpen(false);

                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // => I need to set it to remove the delete button from display after deletion!!
                    setSelectedTerminId(undefined);

                    setSelectedTermin(emptyTerminForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Deletion failed";
                    setErrorMessage(errorMessage);
                    setConfirmDeleteOpen(false);
                });
        }
    };

    // Handle termin form field changes
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedTermin((prevData: Termin) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle selection changes
    const handleSelectionChange = (id: number | undefined) => {
        setSelectedTerminId(id);
        setSelectionChanged(true); // Set flag when selection changes
    };

    return (
        <div>
            <h3 className="mt-3">{selectedTerminId ? "Edit or delete " : "Add new "} Termin</h3>

            <TerminSelection
                termine={allTermine}
                selectedTerminId={selectedTerminId}
                onSelectTermin={handleSelectionChange}
            />

            <div style={{ minHeight: '30px' }}>
                {isGetLoading && <div className="text-warning mb-3">&#x1f504; Loading Termin details... Please wait!</div>}
            </div>

            <Form onSubmit={handleSubmit}>

                <h3 className="mt-3">Termin details</h3>

                <Form.Group controlId="termin" className="mt-3">
                    <Form.Label>Termin</Form.Label>
                    <Form.Control
                        type="datetime-local"
                        name="termin"
                        value={selectedTermin.termin || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="titel" className="mt-3">
                    <Form.Label>Titel</Form.Label>
                    <Form.Control
                        type="text"
                        name="titel"
                        value={selectedTermin.titel || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="text" className="mt-3">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={13}
                        name="text"
                        value={selectedTermin.text || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="kurztext" className="mt-3">
                    <Form.Label>Kurztext</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="kurztext"
                        value={selectedTermin.kurztext || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="besonderheit" className="mt-3">
                    <Form.Label>Besonderheit</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        name="besonderheit"
                        value={selectedTermin.besonderheit || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="bild" className="mt-3">
                    <Form.Label>vollständiger Bilddateiname (müssen unter https://pupille.org/bilder/filmbilder/ abgelegt sein)</Form.Label>
                    <Form.Control
                        type="text"
                        name="bild"
                        value={selectedTermin.bild || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="startReservierung" className="mt-3">
                    <Form.Label>Start Reservierungsdatum</Form.Label>
                    <Form.Control
                        type="date"
                        name="startReservierung"
                        value={selectedTermin.startReservierung || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="linkReservierung" className="mt-3">
                    <Form.Label>Link zur Reservierung</Form.Label>
                    <Form.Control
                        type="text"
                        name="linkReservierung"
                        value={selectedTermin.linkReservierung || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="sonderfarbeTitel" className="mt-3">
                    <Form.Label>Sonderfarbe Titel</Form.Label>
                    <Form.Control
                        type="number"
                        name="sonderfarbeTitel"
                        value={selectedTermin.sonderfarbeTitel || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="sonderfarbe" className="mt-3">
                    <Form.Label>Sonderfarbe</Form.Label>
                    <Form.Control
                        type="number"
                        name="sonderfarbe"
                        value={selectedTermin.sonderfarbe || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="veroeffentlichen" className="mt-3">
                    <Form.Label>Veroeffentlichen</Form.Label>
                    <Form.Control
                        type="number"
                        name="veroeffentlichen"
                        value={selectedTermin.veroeffentlichen || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Button variant={selectedTerminId ? "success" : "primary"} type="submit" className="mt-4">
                    {selectedTerminId ? "Update " : "Add "} termin entry
                </Button>
            </Form>

            {selectedTerminId && !confirmDeleteOpen && (
                <Button
                    variant="danger"
                    type="submit"
                    className="mt-4"
                    onClick={() => setConfirmDeleteOpen(true)}
                >
                    Delete termin entry
                </Button>
            )}

            {confirmDeleteOpen && (
                <div className="mt-3">
                    <p>Are you sure you want to delete this termin entry?</p>
                    <Button variant="secondary" onClick={() => setConfirmDeleteOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete} className="ms-2">
                        Confirm Delete
                    </Button>
                </div>
            )}
            {isLoading && <div className="text-warning mb-3">&#x1f504; Perform {selectedTerminId ? "updating " : "saving "} termin entry... Please wait!</div>}
            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}
        </div>
    );
}