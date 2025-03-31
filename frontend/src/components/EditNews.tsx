import { FormEvent } from "react";
import axios from "axios";
import { NewsSelector } from "./NewsSelector";
import NewsForm from "./NewsForm";
import { useNewsHandling } from "../hooks/useNewsHandling";
import { News } from "../types/News.ts";

const baseURL = "/api/news";

export default function EditNews() {
    const {
        isLoading,
        allNews,
        selectedId: updatingId,
        selectedNews: updatingNews,
        error,
        successMessage,
        setSelectedId,
        setSelectedNews,
        setSuccessMessage,
        setError,
        getAllNews,
    } = useNewsHandling(true);

    const handleUpdateNews = (event: FormEvent<HTMLFormElement>, newsInForm: News) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        axios.put(`${baseURL}/all/${updatingId}`, newsInForm)
            .then(() => {
                setSuccessMessage("News updated successfully!");
                setSelectedId("");
                setSelectedNews(null);
                getAllNews();
            })
            .catch((error) => {
                const errorMessage =
                    error instanceof Error ? error.message : "Update failed";
                setError(errorMessage);
            });
    };

    return (
        <div>
            {error && <div className="text-danger mb-3">{error}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}

            <NewsSelector
                allNews={allNews} // passes all available news entries to populate the <option> elements in the dropdown menu.
                selectedId={updatingId} // passes the currently selected news ID
                                        // it is a controlled value, meaning its state is managed by the parent component (EditNews in this case)
                onSelect={(id) => {
                    setSelectedId(id); // updates the parent component's state when a new option is selected
                    setSuccessMessage(""); // clears any success message when a new selection is made
                }}
            />

            {isLoading && <p>Loading news details...</p>}

            {!isLoading && updatingNews && (
                <NewsForm
                    newsItem={updatingNews}
                    handleSubmit={handleUpdateNews}
                    onChange={(updatedNews) => setSelectedNews(updatedNews)}
                    formType="edit"
                />
            )}
        </div>
    );
}
