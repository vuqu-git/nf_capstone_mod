import React, { useState, useEffect } from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {preprocessFormData} from "../../utils/preprocessFormData.ts";
import AdminNav from "../AdminNav.tsx";
import ProgrammheftDTOSelection from "../../types/ProgrammheftDTOSelection.ts";
import {Programmheft} from "../../types/Programmheft.ts";
import ProgrammheftSelection from "./ProgrammheftSelection.tsx";

const baseURL = "/api/programmheft";

const emptyProgrammheftForForm = {
    pnr: 0,
    titel: '',
    bild: '',
    pdf: '',
    gueltigVon: '',
    gueltigBis: ''
}

export default function ProgrammheftForm() {
    const [allProgrammhefte, setAllProgrammhefte] = useState<ProgrammheftDTOSelection[]>([]); // All Programmhefte fetched from the server

    const [selectedProgrammheftId, setSelectedProgrammheftId] = useState<number | undefined>(undefined); // Selected TVId (as concatenated string) for editing or deleting
    const [selectedProgrammheft, setSelectedProgrammheft] = useState<Programmheft>(emptyProgrammheftForForm); // Programmheft data for the form

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>(""); // for POST, PUT, DELETE requests

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const [isLoadingAllProgrammhefte, setIsLoadingAllProgrammhefte] = useState(false); // Get all Programmhefte
    const [isGetLoading, setIsGetLoading] = useState(false); // for GET a specific Programmheft
    const [isLoading, setIsLoading] = useState(false); // for POST, PUT of one Programmheft

    const [selectionChanged, setSelectionChanged] = useState(false); // to track if a new selection has been made manually by the user

    // GET all Programmhefte
    const getAllProgrammhefte = () => {
        setIsLoadingAllProgrammhefte(true);
        setErrorMessage("");

        axios.get(`${baseURL}`)
            .then((response) => setAllProgrammhefte(response.data))
            .catch((error) => {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                setErrorMessage(errorMessage);
            })
            .finally(() => setIsLoadingAllProgrammhefte(false));
    };

    // Fetch all Programmhefte for the dropdown selection
    useEffect(() => {
        getAllProgrammhefte();
    }, []);

    // Fetch the selected Programmheft details only if we are editing or deleting
    useEffect(() => {

        if (selectionChanged) {
            // Reset the success message when the selected Programmheft changes
            setSuccessMessage("");
            setSelectionChanged(false); // Reset the flag
        }

        if (selectedProgrammheftId) {
            // GET single Programmheft (details)
            const getSingleProgrammheft = () => {

                setIsGetLoading(true);
                setErrorMessage("");

                axios.get(`${baseURL}/${selectedProgrammheftId}`)
                    .then((response) => setSelectedProgrammheft(response.data))
                    .catch((error) => {
                        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                        setErrorMessage(errorMessage);
                    })
                    .finally(() => setIsGetLoading(false));
            };

            getSingleProgrammheft();

        } else {
            // Reset the form for adding a new Programmheft
            setSelectedProgrammheft(emptyProgrammheftForForm);
        }
    }, [selectedProgrammheftId]);


    // Handle the form submission (PUT or POST)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");
        setIsLoading(true);

        // Check if we're adding or editing a Programmheft
        if (selectedProgrammheftId) {
            // Editing an existing Programmheft (PUT request)

            axios.put(`${baseURL}/${selectedProgrammheftId}`, preprocessFormData(selectedProgrammheft))
                .then(() => {
                    setSuccessMessage("Programmheft/Flyer updated successfully!");

                    getAllProgrammhefte();
                    setSelectedProgrammheftId(undefined); // Reset the selection
                    setSelectedProgrammheft(emptyProgrammheftForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Update failed";
                    setErrorMessage(errorMessage);
                })
                .finally(() => setIsLoading(false));
        } else {

            // #####################################################
            // ignoring pnr when posting via this form
            const { pnr, ...programmheftInFormWithoutPnr } = selectedProgrammheft;
            // #####################################################

            // axios.post(`${baseURL}`, selectedProgrammheft)
            axios.post(`${baseURL}`, preprocessFormData(programmheftInFormWithoutPnr))
                .then(() => {
                    setSuccessMessage("Programmheft/Flyer saved successfully!");

                    getAllProgrammhefte();
                    // setSelectedProgrammheftId(undefined); // Reset the selection, not required for POST because selection is unchanged
                    setSelectedProgrammheft(emptyProgrammheftForForm); // Reset the form
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
        if (selectedProgrammheftId) {

            axios.delete(`${baseURL}/${selectedProgrammheftId}`)
                .then(() => {
                    setSuccessMessage("Programmheft/Flyer deleted successfully!");

                    getAllProgrammhefte();
                    setConfirmDeleteOpen(false);

                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // => I need to set it to remove the delete button from display after deletion!!
                    setSelectedProgrammheftId(undefined);

                    setSelectedProgrammheft(emptyProgrammheftForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Deletion failed";
                    setErrorMessage(errorMessage);
                    setConfirmDeleteOpen(false);
                });
        }
    };

    // Handle Programmheft form field changes
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedProgrammheft((prevData: Programmheft) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle selection changes
    const handleSelectionChange = (id: number | undefined) => {
        setSelectedProgrammheftId(id);
        setSelectionChanged(true); // Set flag when selection changes
    };

    return (
        <div data-bs-theme="dark">
            <AdminNav />

            <h3 className="mt-3">{selectedProgrammheftId ? "Edit or delete " : "Add new "} Programmheft/Fyler</h3>

            <ProgrammheftSelection
                programmhefte={allProgrammhefte}
                selectedPnr={selectedProgrammheftId}
                onSelectProgrammheft={handleSelectionChange}
                textForDefaultOption={undefined}
            />

            <div style={{ minHeight: '30px' }}>
                {isLoadingAllProgrammhefte && <div className="text-warning mb-3">&#x1f504; Loading all Programmheft entries... Please wait!</div>}
                {isGetLoading && <div className="text-warning mb-3">&#x1f504; Loading details of selected Programmheft... Please wait!</div>}
            </div>


            <Form onSubmit={handleSubmit}>

                <h3 className="mt-3">Programmheft/Flyer details</h3>

                <Form.Group controlId="titel" className="mt-3">
                    <Form.Label>Titel*</Form.Label>
                    <Form.Control
                        type="text"
                        name="titel"
                        value={selectedProgrammheft.titel || ""}
                        onChange={handleFormChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="bild" className="mt-3">
                    <Form.Label>vollständiger Bilddateiname</Form.Label>
                    <Form.Control
                        type="text"
                        name="bild"
                        value={selectedProgrammheft.bild || ""}
                        onChange={handleFormChange}
                    />
                    <Form.Text className="text-muted">
                        Bilddatei muss unter https://pupille.org/bilder/programmheftbilder/ abgelegt sein.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="pdf" className="mt-3">
                    <Form.Label>vollständiger PDF-Dateiname*</Form.Label>
                    <Form.Control
                        type="text"
                        name="pdf"
                        value={selectedProgrammheft.pdf || ""}
                        onChange={handleFormChange}
                        required
                    />
                    <Form.Text className="text-muted">
                        PDF-Datei muss unter https://pupille.org/programmheft/ abgelegt sein.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="gueltigVon" className="mt-3">
                    <Form.Label>Vorstellungsbeginn*</Form.Label>
                    <Form.Control
                        type="date"
                        name="gueltigVon"
                        value={selectedProgrammheft.gueltigVon || ""}
                        onChange={handleFormChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="gueltigBis" className="mt-3">
                    <Form.Label>Vorstellungsbeginn*</Form.Label>
                    <Form.Control
                        type="date"
                        name="gueltigBis"
                        value={selectedProgrammheft.gueltigBis || ""}
                        onChange={handleFormChange}
                        required
                    />
                </Form.Group>

                <Button variant={selectedProgrammheftId ? "success" : "primary"} type="submit" className="mt-4">
                    {selectedProgrammheftId ? "Update " : "Add "} Programmheft/Flyer entry
                </Button>
            </Form>

            {selectedProgrammheftId && !confirmDeleteOpen && (
                <Button
                    variant="danger"
                    type="submit"
                    className="mt-4"
                    onClick={() => setConfirmDeleteOpen(true)}
                >
                    Delete Programmheft/Flyer entry
                </Button>
            )}

            {confirmDeleteOpen && (
                <div className="mt-3">
                    <p>Are you sure you want to delete this Programmheft entry?</p>
                    <Button variant="secondary" onClick={() => setConfirmDeleteOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete} className="ms-2">
                        Confirm Delete
                    </Button>
                </div>
            )}

            {isLoading && <div className="text-warning mb-3">&#x1f504; Perform {selectedProgrammheftId ? "updating " : "saving "} Programmheft entry... Please wait!</div>}
            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}

        </div>
    );
}