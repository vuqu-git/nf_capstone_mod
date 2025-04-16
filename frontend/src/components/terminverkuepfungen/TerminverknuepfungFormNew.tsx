import React, { useState, useEffect } from "react";
import TerminverknuepfungSelection from "./TerminverknuepfungSelection";

import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {Terminverknuepfung} from "../../types/Terminverknuepfung.ts";
import {preprocessFormData} from "../../utils/PreprocessingFormData.ts";
import {TVWithFilmAndTerminDTOSelection} from "../../types/TVWithFilmAndTerminDTOSelection.ts";
import TerminverknuepfungSelectionNew from "./TerminverknuepfungSelectionNew.tsx";
import {FilmDTOSelection} from "../../types/FilmDTOSelection.ts";
import FilmSelection from "../filme/FilmSelection.tsx";
import TerminDTOSelection from "../../types/TerminDTOSelection.ts";
import TerminSelection from "../termine/TerminSelection.tsx";
import {formatDate} from "react-datetime-picker/dist/cjs/shared/dateFormatter";


const baseURL = "/api/terminverknuepfung";

const emptyTVForForm = {
    tnr: 0,
    fnr: 0,
    vorfilm: undefined,
    rang: undefined,

    film: {titel: '', jahr: undefined, directors: ""},
    termin: {termin: "", titel: ""},
}

export default function TerminverknuepfungFormNew() {
    const [allTVs, setAllTVs] = useState<TVWithFilmAndTerminDTOSelection[]>([]); // All Termine fetched from the server

    const [selectedTVId, setSelectedTVId] = useState<string | null>(null); // Selected TVId (as concatenated string) for editing or deleting
    // const [selectedTVTNR, setSelectedTVTNR] = useState<number | null>(null); // Selected TVTNR for editing or deleting
    // const [selectedTVFNR, setSelectedTVFNR] = useState<number | null>(null); // Selected TVFNR for editing or deleting

    const [selectedTV, setSelectedTV] = useState<TVWithFilmAndTerminDTOSelection>(emptyTVForForm); // Termin data for the form

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>(""); // for POST, PUT, DELETE requests

    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // for POST, PUT
    const [isGetLoading, setIsGetLoading] = useState(false); // for GET

    const [selectionChanged, setSelectionChanged] = useState(false); // to track if a new selection has been made manually by the user

    // GET all termine
    const getAllTVs = () => {
        // setIsLoading(true);
        setErrorMessage("");

        axios.get(`${baseURL}/terminsorted`)
            .then((response) => setAllTVs(response.data))
            .catch((error) => {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                setErrorMessage(errorMessage);
            })
        // .finally(() => setIsLoading(false));
    };

    // Fetch all termine for the dropdown selection
    useEffect(() => {
        getAllTVs();
    }, []);

    // Fetch the selected termin details only if we are editing or deleting
    useEffect(() => {

        if (selectionChanged) {
            // Reset the success message when the selected termin changes
            setSuccessMessage("");
            setSelectionChanged(false); // Reset the flag
        }

        if (selectedTVId) {
            // GET single termin (details)
            const getSingleTV = () => {

                setIsGetLoading(true);
                setErrorMessage("");

                const [tnr, fnr] = selectedTVId.split(',');

                axios.get(`${baseURL}/${tnr}/${fnr}`)
                    .then((response) => setSelectedTV(response.data))
                    .catch((error) => {
                        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                        setErrorMessage(errorMessage);
                    })
                    .finally(() => setIsGetLoading(false));
            };

            getSingleTV();

        } else {
            // Reset the form for adding a new termin
            setSelectedTV(emptyTVForForm);
        }
    }, [selectedTVId]);

    // Handle form field changes, with distinguishing between checked and value
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type } = e.target;
        setSelectedTV((prevData: TVWithFilmAndTerminDTOSelection) => ({
            ...prevData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value,
        }));





    };


    // Handle the form submission (PUT or POST)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setErrorMessage("");
        setSuccessMessage("");
        setIsLoading(true);

        // Check if we're adding or editing a termin
        if (selectedTVId) {
            // Editing an existing termin (PUT request)

            const [tnr, fnr] = selectedTVId.split(',');

            axios.put(`${baseURL}/${tnr}/${fnr}`, preprocessFormData(selectedTV))
                .then(() => {
                    setSuccessMessage("Termin updated successfully!");

                    getAllTVs();
                    setSelectedTVId(null); // Reset the selection
                    setSelectedTV(emptyTVForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Update failed";
                    setErrorMessage(errorMessage);
                })
                .finally(() => setIsLoading(false));
        } else {


            axios.post(`${baseURL}/link-film-termin`, preprocessFormData(selectedTV))
                .then(() => {
                    setSuccessMessage("Termin saved successfully!");

                    getAllTVs();
                    // setSelectedTerminId(null); // Reset the selection, not required for POST because selection is unchanged
                    setSelectedTV(emptyTVForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Saving failed";
                    setErrorMessage(errorMessage);
                })
                .finally(() => setIsLoading(false));

        }
    };

    // Handle termin deletion
    const handleDelete = () => {
        setErrorMessage("");
        setSuccessMessage("");
        if (selectedTVId) {

            const [tnr, fnr] = selectedTVId.split(',');

            axios.delete(`${baseURL}/${tnr}/${fnr}`)
                .then(() => {
                    setSuccessMessage("Termin deleted successfully!");

                    getAllTVs();
                    setConfirmDeleteOpen(false);

                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // !!! DO NOT reset selectedTerminId immediately !!!
                    // => I need to set it to remove the delete button after deletion!!
                    setSelectedTVId(null);

                    setSelectedTV(emptyTVForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Deletion failed";
                    setErrorMessage(errorMessage);
                    setConfirmDeleteOpen(false);
                });
        }
    };

    const handleTVSelectionChange = (id: string | null) => {
        setSelectedTVId(id);
        setSelectionChanged(true); // Set flag when selection changes
    };

    // lllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
    // GET all movies
    const [allFilms, setAllFilms] = useState<FilmDTOSelection[]>([]);
    const [selectedFilmId, setSelectedFilmId] = useState<number | undefined>(undefined);

    const getAllFilms = () => {
        setErrorMessage("");

        axios.get(`api/filme/allsorted`)
            .then((response) => setAllFilms(response.data))
            .catch((error) => {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                setErrorMessage(errorMessage);
            })
    };

    // Fetch all films for the dropdown selection
    useEffect(() => {
        getAllFilms();
    }, []);

    const handleFilmSelectionChange = (id: number | undefined) => {
        setSelectedFilmId(id);

        setSelectedTV((prevData: TVWithFilmAndTerminDTOSelection) => ({
            ...prevData,
            fnr: id,
        }));
    };

    // -----------------------------------------------------------
    // GET all movies

    const [allTermine, setAllTermine] = useState<TerminDTOSelection[]>([]);
    const [selectedTerminId, setSelectedTerminId] = useState<number | undefined>(undefined);

    // GET all termine
    const getAllTermine = () => {
        // setIsLoading(true);
        setErrorMessage("");

        axios.get(`api/termine/allsorted`)
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

    const handleTerminSelectionChange = (id: number | undefined) => {
        setSelectedTerminId(id);

        setSelectedTV((prevData: TVWithFilmAndTerminDTOSelection) => ({
            ...prevData,
            tnr: id,
        }));
    };
    // lllllllllllllllllllllllllllllllllllllllllllllllllllllllllll

    return (
        <div>
            <h3 className="mt-3">{selectedTVId ? "Edit or delete Terminverknuepfung" : "Add new Terminverknuepfung for existing Film and Termin"}</h3>

            <TerminverknuepfungSelectionNew
                tvenFT={allTVs}
                selectedTVId={selectedTVId}
                onSelectTV={handleTVSelectionChange}
            />

            <div style={{ minHeight: '30px' }}>
                {isGetLoading && <div className="text-warning mb-3">&#x1f504; Loading Termin details... Please wait!</div>}
            </div>


            <Form onSubmit={handleSubmit}>

                <h3 className="mt-3">Terminverknuepfung form</h3>

                {/*<FilmSelection*/}
                {/*    films={allFilms}*/}
                {/*    selectedFilmId={selectedFilmId}*/}
                {/*    onSelectFilm={handleFilmSelectionChange}*/}
                {/*/>*/}

                <Form.Label htmlFor="film-selection">Film (fnr) selection</Form.Label>
                <Form.Select
                    id="film-selection" // Add id to connect to the label
                    name="fnr" // // <-- Add name attribute here, so that the generic handleChange can access it
                    value={selectedTV.fnr ?? ""}
                    onChange={handleChange}
                >
                    <option value="">Select a film</option>
                    {allFilms.map((film) => (
                        <option key={film.fnr} value={film.fnr}>
                            {`${film.titel} | #${film.fnr}`}
                        </option>
                    ))}
                </Form.Select>

                {/*<TerminSelection*/}
                {/*    termine={allTermine}*/}
                {/*    selectedTerminId={selectedTerminId}*/}
                {/*    onSelectTermin={handleTerminSelectionChange}*/}
                {/*/>*/}

                <Form.Label htmlFor="termin-selection">Termin selection</Form.Label>
                <Form.Select
                    id="termin-selection" // Add id to connect to the label
                    name="tnr" // <-- Add name attribute here, so that the generic handleChange can access it
                    value={selectedTV.tnr ?? ""}
                    onChange={handleChange}
                >
                    <option value="">Select a Termin</option>
                    {allTermine.map((t: TerminDTOSelection) => (
                        <option key={t.tnr} value={t.tnr}>
                            {/*{`${formatDate(t.termin)}: ${t.titel} | #${t.tnr}`}*/}
                            {`${t.termin} | #${t.tnr}`}
                        </option>
                    ))}
                </Form.Select>

                <Form.Group controlId="tnr" className="mt-3">
                    <Form.Label>tnr</Form.Label>
                    <Form.Control
                        type="number"
                        name="tnr"
                        value={selectedTV.tnr || ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="fnr" className="mt-3">
                    <Form.Label>fnr</Form.Label>
                    <Form.Control
                        type="number"
                        name="fnr"
                        value={selectedTV.fnr || ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="vorfilm" className="mt-3">
                    <Form.Check
                        type="checkbox"
                        label="Vorfilm"
                        name="vorfilm"
                        checked={selectedTV.vorfilm || false}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="rang" className="mt-3">
                    <Form.Label>Rang</Form.Label>
                    <Form.Control
                        type="number"
                        name="rang"
                        value={selectedTV.rang || ""}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant={selectedTVId ? "success" : "primary"} type="submit" className="mt-4">
                    {selectedTVId ? "Update " : "Add "} terminverknuepfung entry
                </Button>
            </Form>

            {selectedTVId && !confirmDeleteOpen && (
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
                    <p>Are you sure you want to delete this news item?</p>
                    <Button variant="secondary" onClick={() => setConfirmDeleteOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete} className="ms-2">
                        Confirm Delete
                    </Button>
                </div>
            )}
            {isLoading && <div className="text-warning mb-3">&#x1f504; Perform {selectedTVId ? "updating " : "saving "} termin entry... Please wait!</div>}
            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}
        </div>
    );

}