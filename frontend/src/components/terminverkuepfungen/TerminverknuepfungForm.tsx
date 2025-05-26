import React, { useState, useEffect } from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {preprocessFormData} from "../../utils/preprocessFormData.ts";
import {TVWithFilmAndTerminDTOSelection} from "../../types/TVWithFilmAndTerminDTOSelection.ts";
import TerminverknuepfungSelection from "./TerminverknuepfungSelection.tsx";
import {FilmDTOSelection} from "../../types/FilmDTOSelection.ts";
import FilmSelection from "../filme/FilmSelection.tsx";
import TerminDTOSelection from "../../types/TerminDTOSelection.ts";
import TerminSelection from "../termine/TerminSelection.tsx";
// import {formatDateInTerminSelectOption} from "../../utils/formatDateInTerminSelectOption.ts";
import {Link} from "react-router-dom";

const baseURL = "/api/terminverknuepfung";

const emptyTVForForm = {
    tnr: 0,
    fnr: 0,
    vorfilm: undefined,
    rang: undefined,

    film: {titel: '', jahr: undefined, directors: ""},
    termin: {vorstellungsbeginn: "", titel: ""},
}

export default function TerminverknuepfungForm() {
    const [allTVs, setAllTVs] = useState<TVWithFilmAndTerminDTOSelection[]>([]); // All Termine fetched from the server

    const [selectedTVId, setSelectedTVId] = useState<string | undefined>(undefined); // Selected TVId (as concatenated string) for editing or deleting
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
            // axios.put(`${baseURL}/${selectedTV.tnr}/${selectedTV.fnr}`, preprocessFormData(selectedTV))
                .then(() => {
                    setSuccessMessage("terminverknuepfung updated successfully!");

                    getAllTVs();
                    setSelectedTVId(undefined); // Reset the selection
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
                    setSuccessMessage("terminverknuepfung saved successfully!");

                    getAllTVs();
                    // setSelectedTerminId(undefined); // Reset the selection, not required for POST because selection is unchanged
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
                    setSuccessMessage("terminverknuepfung deleted successfully!");

                    getAllTVs();
                    setConfirmDeleteOpen(false);

                    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    // => I need to set it to remove the delete button from display after deletion!!
                    setSelectedTVId(undefined);

                    setSelectedTV(emptyTVForForm); // Reset the form
                })
                .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Deletion failed";
                    setErrorMessage(errorMessage);
                    setConfirmDeleteOpen(false);
                });
        }
    };

    // Handle form field changes, with extra distinguishing between checked and value
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type } = e.target;
        setSelectedTV((prevData: TVWithFilmAndTerminDTOSelection) => ({
            ...prevData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : (e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value,
        }));
    };

    // Handle TV selection changes
    const handleTVSelectionChange = (id: string | undefined) => {
        setSelectedTVId(id);
        setSelectionChanged(true); // Set flag when selection changes
    };

    // ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
    // GET all films
    const [allFilms, setAllFilms] = useState<FilmDTOSelection[]>([]);
    // const [selectedFilmId, setSelectedFilmId] = useState<number | undefined>(undefined);

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
        setSelectedTV((prevData: TVWithFilmAndTerminDTOSelection) => ({
            ...prevData,
            fnr: id,
        }));
    };

    // -----------------------------------------------------------
    // GET all termine

    const [allTermine, setAllTermine] = useState<TerminDTOSelection[]>([]);
    // const [selectedTerminId, setSelectedTerminId] = useState<number | undefined>(undefined);

    // GET all termine
    const getAllSortedTermine = () => {
        setErrorMessage("");

        axios.get(`api/termine/allsorted`)
            .then((response) => setAllTermine(response.data))
            .catch((error) => {
                const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
                setErrorMessage(errorMessage);
            })
    };

    // Fetch all termine for the dropdown selection
    useEffect(() => {
        getAllSortedTermine();
    }, []);

    const handleTerminSelectionChange = (id: number | undefined) => {
        setSelectedTV((prevData: TVWithFilmAndTerminDTOSelection) => ({
            ...prevData,
            tnr: id,
        }));
    };
    // ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑

    return (
        <div data-bs-theme="dark">
            <Link to={`/admin`}>
                zum Adminbereich
            </Link>

            <h3 className="mt-3">{selectedTVId ? "Edit or delete Terminverknuepfung" : "Add new Terminverknuepfung for existing Film and existing Termin"}</h3>

            <TerminverknuepfungSelection
                tvenFT={allTVs}
                selectedTVId={selectedTVId}
                onSelectTV={handleTVSelectionChange}
            />

            <div style={{ minHeight: '30px' }}>
                {isGetLoading && <div className="text-warning mb-3">&#x1f504; Loading Termin details... Please wait!</div>}
            </div>


            <Form onSubmit={handleSubmit}>

                <h3 className="mt-3">Terminverknuepfung details</h3>

                <TerminSelection
                    termine={allTermine}
                    selectedTnr={selectedTV.tnr}
                    onSelectTermin={handleTerminSelectionChange}
                />

                {/*<Form.Label htmlFor="termin-selection" className="mt-3">Termin selection</Form.Label>*/}
                {/*<Form.Select*/}
                {/*    id="termin-selection" // Add id to connect to the label*/}
                {/*    name="tnr" // <-- Add name attribute here, so that the generic handleChange can access it*/}
                {/*    value={selectedTV.tnr ?? ""}*/}
                {/*    onChange={handleFormChange}*/}
                {/*    style={{ backgroundColor: 'dimgrey', color: 'whitesmoke' }}*/}
                {/*>*/}
                {/*    <option value="">Select a Termin</option>*/}
                {/*    {allTermine.map((t: TerminDTOSelection) => (*/}
                {/*        <option key={t.tnr} value={t.tnr}>*/}
                {/*            /!*{`${formatDateInTerminSelectOption(t.vorstellungsbeginn)}| ${t.titel} | #${t.tnr}`}*!/*/}
                {/*            {`${formatDateInTerminSelectOption(t.vorstellungsbeginn)}| #${t.tnr}`}*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</Form.Select>*/}

                {/*---------------------------------------------------------------------------*/}
                <FilmSelection
                    films={allFilms}
                    selectedFilmId={selectedTV.fnr}
                    onSelectFilm={handleFilmSelectionChange}
                />

                {/*<Form.Label htmlFor="film-selection" className="mt-3">Film selection</Form.Label>*/}
                {/*<Form.Select*/}
                {/*    id="film-selection" // Add id to connect to the label*/}
                {/*    name="fnr" // // <-- Add name attribute here, so that the generic handleChange can access it*/}
                {/*    value={selectedTV.fnr ?? ""}*/}
                {/*    onChange={handleFormChange}*/}
                {/*    style={{ backgroundColor: 'dimgrey', color: 'whitesmoke' }}*/}
                {/*>*/}
                {/*    <option value="">Select a Film</option>*/}
                {/*    {allFilms.map((film) => (*/}
                {/*        <option key={film.fnr} value={film.fnr}>*/}
                {/*            {`${film.titel} | #${film.fnr}`}*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</Form.Select>*/}


                <Form.Group controlId="vorfilm" className="mt-3">
                    <Form.Check
                        type="checkbox"
                        label="Vorfilm"
                        name="vorfilm"
                        checked={selectedTV.vorfilm || false}
                        onChange={handleFormChange}
                    />
                </Form.Group>

                <Form.Group controlId="rang" className="mt-3">
                    <Form.Label>Rang</Form.Label>
                    <Form.Control
                        type="number"
                        name="rang"
                        value={selectedTV.rang || ""}
                        onChange={handleFormChange}
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
                    Delete terminverknuepfung entry
                </Button>
            )}

            {confirmDeleteOpen && (
                <div className="mt-3">
                    <p>Are you sure you want to delete this terminverknuepfung entry?</p>
                    <Button variant="secondary" onClick={() => setConfirmDeleteOpen(false)}>
                        Cancel
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete} className="ms-2">
                        Confirm Delete
                    </Button>
                </div>
            )}
            {isLoading && <div className="text-warning mb-3">&#x1f504; Perform {selectedTVId ? "updating " : "saving "} terminverknuepfung entry... Please wait!</div>}
            {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}
        </div>
    );

}