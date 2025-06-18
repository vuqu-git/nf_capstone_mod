import React, { useState, useEffect } from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {preprocessFormData} from "../../utils/preprocessFormData.ts";
import ReiheSelection from "./ReiheSelection.tsx";
import AdminNav from "../AdminNav.tsx";
import ReiheDTOForFormWithTermineAndFilme from "../../types/ReiheDTOForFormWithTermineAndFilme.ts";
import Reihe from "../../types/Reihe.ts";
import ReiheDTOSelection from "../../types/ReiheDTOSelection.ts";

const baseURL = "/api/reihe";

const emptyReiheForForm = {
    rnr: 0,
    titel: '',
    text: '',
    farbe: '',
    termine:[]
}

export default function ReiheForm() {
    const [allReihen, setAllReihen] = useState<ReiheDTOSelection[]>([]); // All Reihen fetched from the server

    const [selectedReiheId, setSelectedReiheId] = useState<number | undefined>(undefined); // Selected TVId (as concatenated string) for editing or deleting
    const [selectedReihe, setSelectedReihe] = useState<Reihe>(emptyReiheForForm); // Reihe data for the form

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>(""); // for POST, PUT, DELETE requests

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // for POST, PUT
    const [isGetLoading, setIsGetLoading] = useState(false); // for GET

    const [selectionChanged, setSelectionChanged] = useState(false); // to track if a new selection has been made manually by the user

    // GET all Reihen
    const getAllReihen = () => {
        // setIsLoading(true);
        setErrorMessage("");

        axios.get(`${baseURL}/all`)
            .then((response) => setAllReihen(response.data))
            .catch((error) => {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                setErrorMessage(errorMessage);
            })
        // .finally(() => setIsLoading(false));
    };

    // Fetch all Reihen for the dropdown selection
    useEffect(() => {
        getAllReihen();
    }, []);

    // Fetch the selected Reihe details only if we are editing or deleting
    useEffect(() => {

        if (selectionChanged) {
            // Reset the success message when the selected Reihe changes
            setSuccessMessage("");
            setSelectionChanged(false); // Reset the flag
        }

        if (selectedReiheId) {
            // GET single Reihe (details)
            const getSingleReihe = () => {

                setIsGetLoading(true);
                setErrorMessage("");

                axios.get(`${baseURL}/${selectedReiheId}`)
                    .then((response) => setSelectedReihe(response.data))
                    .catch((error) => {
                        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                        setErrorMessage(errorMessage);
                    })
                    .finally(() => setIsGetLoading(false));
            };

            getSingleReihe();

        } else {
            // Reset the form for adding a new Reihe
            setSelectedReihe(emptyReiheForForm);
        }
    }, [selectedReiheId]);


    // Handle the form submission (PUT or POST)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");
        setIsLoading(true);

        // Check if we're adding or editing a Reihe
        if (selectedReiheId) {
            // Editing an existing Reihe (PUT request)

            axios.put(`${baseURL}/${selectedReiheId}`, preprocessFormData(selectedReihe))
                .then(() => {
                    setSuccessMessage("Reihe updated successfully!");

                    getAllReihen();
                    setSelectedReiheId(undefined); // Reset the selection
                    setSelectedReihe(emptyReiheForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Update failed";
                    setErrorMessage(errorMessage);
                })
                .finally(() => setIsLoading(false));
        } else {

            // ###################################################
            const { rnr, ...reiheInFormWithoutRnr } = selectedReihe;
            // ###################################################

            // axios.post(`${baseURL}`, selectedReihe)
            axios.post(`${baseURL}`, preprocessFormData(reiheInFormWithoutRnr))
                .then(() => {
                    setSuccessMessage("Reihe saved successfully!");

                    getAllReihen();
                    // setSelectedReiheId(undefined); // Reset the selection, not required for POST because selection is unchanged
                    setSelectedReihe(emptyReiheForForm); // Reset the form
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
        if (selectedReiheId) {

            axios.delete(`${baseURL}/${selectedReiheId}`)
                .then(() => {
                    setSuccessMessage("Reihe deleted successfully!");

                    getAllReihen();
                    setConfirmDeleteOpen(false);

                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // => I need to set it to remove the delete button from display after deletion!!
                    setSelectedReiheId(undefined);

                    setSelectedReihe(emptyReiheForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Deletion failed";
                    setErrorMessage(errorMessage);
                    setConfirmDeleteOpen(false);
                });
        }
    };

    // Handle Reihe form field changes
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelectedReihe((prevData: Reihe) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle selection changes
    const handleSelectionChange = (id: number | undefined) => {
        setSelectedReiheId(id);
        setSelectionChanged(true); // Set flag when selection changes
    };

    return (
        <div data-bs-theme="dark">
            <AdminNav />

            <h3 className="mt-3">{selectedReiheId ? "Edit or delete " : "Add new "} Reihe</h3>

            <ReiheSelection
                reihen={allReihen}
                selectedReiheId={selectedReiheId}
                onSelectReihe={handleSelectionChange}
            />

            <div style={{ minHeight: '30px' }}>
                {isGetLoading && <div className="text-warning mb-3">&#x1f504; Loading Reihe details... Please wait!</div>}
            </div>

            {/*{selectedReiheId && (*/}
            {/*    <Form.Group controlId="filmsDisplay"*/}
            {/*                className="mt-3"*/}
            {/*                style={{*/}
            {/*                    opacity: 0.4,*/}
            {/*                }}*/}
            {/*    >*/}
            {/*        <Form.Label>{filmsOfSelectedTerminId.length > 1 ? "Filme" : "Film"} zum ausgewählten Termin:</Form.Label>*/}
            {/*        <Form.Control*/}
            {/*            as="textarea"*/}
            {/*            rows={filmsOfSelectedTerminId.length}*/}
            {/*            value={*/}
            {/*                filmsOfSelectedTerminId.map(f => f.titel + " | #" + f.fnr).join("\n")*/}
            {/*            }*/}
            {/*            readOnly*/}

            {/*        />*/}
            {/*    </Form.Group>*/}
            {/*)}*/}

            <Form onSubmit={handleSubmit}>

                <h3 className="mt-3">Reihe details</h3>

                <Form.Group controlId="titel" className="mt-3">
                    <Form.Label>Titel</Form.Label>
                    <Form.Control
                        type="text"
                        name="titel"
                        value={selectedReihe.titel || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="text" className="mt-3">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={6}
                        name="text"
                        value={selectedReihe.text || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="farbe" className="mt-3">
                    <Form.Label>Farbe</Form.Label>
                    <Form.Control
                        type="text"
                        name="farbe"
                        value={selectedReihe.farbe || ""}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Button variant={selectedReiheId ? "success" : "primary"} type="submit" className="mt-4">
                    {selectedReiheId ? "Update " : "Add "} Reihe entry
                </Button>
            </Form>

            {selectedReiheId && !confirmDeleteOpen && (
                <Button
                    variant="danger"
                    type="submit"
                    className="mt-4"
                    onClick={() => setConfirmDeleteOpen(true)}
                >
                    Delete Reihe entry
                </Button>
            )}

            {confirmDeleteOpen && (
                <div className="mt-3">
                    <p>Are you sure you want to delete this Reihe entry?</p>
                    <Button variant="secondary" onClick={() => setConfirmDeleteOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete} className="ms-2">
                        Confirm Delete
                    </Button>
                </div>
            )}
            {isLoading && <div className="text-warning mb-3">&#x1f504; Perform {selectedReiheId ? "updating " : "saving "} Reihe entry... Please wait!</div>}
            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}
        </div>
    );
}