import { FormEvent } from "react";
import axios from "axios";
import { FilmsSelector } from "./FilmsSelector.tsx";
import FilmFormOLD from "./FilmFormOLD.tsx";
import { useAllFilms } from "../../hooks/useAllFilms.ts";
import { Film } from "../../types/Film.ts";

const baseURL = "/api/filme";

export default function AddEditFilms() {
    const {
        isLoadingAllFilms,
        allFilms,
        selectedId,
        selectedFilm,
        emptyFilmForAddingForm,
        error,
        successMessage,
        setSelectedId,
        setSelectedFilm,
        setSuccessMessage,
        setError,
        getAllFilms,
    } = useAllFilms(true);

    const handleUpdateFilms = (event: FormEvent<HTMLFormElement>, filmInForm: Film) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        axios.put(`${baseURL}/${selectedId}`, filmInForm)
            .then(() => {
                setSuccessMessage("Film updated successfully!");
                setSelectedId("");
                setSelectedFilm(emptyFilmForAddingForm);
                getAllFilms();
            })
            .catch((error) => {
                const errorMessage =
                    error instanceof Error ? error.message : "Update failed";
                setError(errorMessage);
            });
    };

    const handleAddFilms = (event: FormEvent<HTMLFormElement>, filmInForm: Film) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        // ################################

        const { fnr, ...filmInFormWithoutFnr } = filmInForm;

        // ################################

        // axios.post(`${baseURL}`, filmInForm)
        axios.post(`${baseURL}`, filmInFormWithoutFnr)
            .then(() => {
                setSuccessMessage("Film saved successfully!");
                setSelectedId("");
                setSelectedFilm(emptyFilmForAddingForm);
                getAllFilms();
            })
            .catch((error) => {
                const errorMessage =
                    error instanceof Error ? error.message : "Saving failed";
                setError(errorMessage);
            });
    };

    return (
        <div>
            <FilmsSelector
                allFilms={allFilms} // passes all available film entries to populate the <option> elements in the dropdown menu.
                selectedId={selectedId} // passes the currently selected news ID
                                        // it is a controlled value, meaning its state is managed by the parent component (EditNews in this case)
                onSelect={(id) => {
                    setSelectedId(id); // updates the parent component's state when a new option is selected
                    setSuccessMessage(""); // clears any success message when a new selection is made
                }}
            />

            {isLoadingAllFilms && <div className="text-warning mb-3">&#x1f504; Loading film details...</div>}

            {!isLoadingAllFilms && selectedFilm && selectedId && (
                <FilmFormOLD
                    filmItem={selectedFilm}
                    handleSubmit={handleUpdateFilms}
                    onChange={(updatedFilm) => setSelectedFilm(updatedFilm)}
                    formType="edit"
                />
            )}

            {!isLoadingAllFilms && !selectedId && (
                <FilmFormOLD
                    // filmItem={selectedFilm}
                    filmItem={
                        // {
                        //     titel: 'Kukuk',
                        //     originaltitel: '',
                        //     originaltitelAnzeigen: undefined,
                        //     text: '',
                        //     kurztext: '',
                        //     besonderheit: '',
                        //     land: '',
                        //     jahr: undefined,
                        //     farbe: '',
                        //     laufzeit: undefined,
                        //     sprache: '',
                        //     untertitel: '',
                        //     format: '',
                        //     fsk: undefined,
                        //     stab: '',
                        //     bild: '',
                        //     sonderfarbeTitel: undefined,
                        //     sonderfarbe: undefined,
                        // }
                        selectedFilm
                    }
                    handleSubmit={handleAddFilms}
                    onChange={(updatedFilm) => setSelectedFilm(updatedFilm)}
                    formType="add"
                />
            )}

            {error && <div className="text-danger mb-3">{error}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}
        </div>
    );
}
