import { FormEvent } from "react";
import axios from "axios";
import { FilmsSelector } from "./FilmsSelector.tsx";
import FilmForm from "./FilmForm.tsx";
import { useAllFilms } from "../../hooks/useAllFilms.ts";
import { Film } from "../../types/Film.ts";

const baseURL = "/api/filme";

export default function AddEditFilms() {
    const {
        isLoadingAllFilms,
        allFilms,
        selectedId: updatingId,
        selectedFilm: updatingFilm,
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

        axios.put(`${baseURL}/${updatingId}`, filmInForm)
            .then(() => {
                setSuccessMessage("Film updated successfully!");
                setSelectedId("");
                setSelectedFilm(null);
                getAllFilms();
            })
            .catch((error) => {
                const errorMessage =
                    error instanceof Error ? error.message : "Update failed";
                setError(errorMessage);
            });
    };

    return (
        <div>
            <FilmsSelector
                allFilms={allFilms} // passes all available film entries to populate the <option> elements in the dropdown menu.
                selectedId={updatingId} // passes the currently selected news ID
                                        // it is a controlled value, meaning its state is managed by the parent component (EditNews in this case)
                onSelect={(id) => {
                    setSelectedId(id); // updates the parent component's state when a new option is selected
                    setSuccessMessage(""); // clears any success message when a new selection is made
                }}
            />

            {isLoadingAllFilms && <div className="text-warning mb-3">&#x1f504; Loading film details...</div>}

            {!isLoadingAllFilms && updatingFilm && (
                <FilmForm
                    filmItem={updatingFilm}
                    handleSubmit={handleUpdateFilms}
                    onChange={(updatedFilm) => setSelectedFilm(updatedFilm)}
                    formType="edit"
                />
            )}

            {error && <div className="text-danger mb-3">{error}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}
        </div>
    );
}
