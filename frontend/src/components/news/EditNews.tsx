import { FormEvent } from "react";
import axios from "axios";
import { NewsSelector } from "./NewsSelector.tsx";
import NewsForm from "./NewsForm.tsx";
import { useAllNews } from "../../hooks/useAllNews.ts";
import { News } from "../../types/News.ts";

import {preprocessFormData} from "../../utils/preprocessFormData.ts";
import {trimAllStringsInObjectShallow} from "../../utils/trimAllStringsInObjectShallow.ts";

const baseURL = "/api/news";

export default function EditNews() {
    const {
        isLoadingAllNews,
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
    } = useAllNews(true);

    const handleUpdateNews = (event: FormEvent<HTMLFormElement>, newsInForm: News) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");

        axios.put(`${baseURL}/${updatingId}`, trimAllStringsInObjectShallow( preprocessFormData(newsInForm) ))
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
            <NewsSelector
                allNews={allNews} // passes all available news entries to populate the <option> elements in the dropdown menu.
                selectedId={updatingId} // passes the currently selected news ID
                                        // it is a controlled value, meaning its state is managed by the parent component (EditNews in this case)
                onSelect={(id) => {
                    setSelectedId(id); // updates the parent component's state when a new option is selected
                    setSuccessMessage(""); // clears any success message when a new selection is made
                }}
            />

            {isLoadingAllNews && <div className="text-warning mb-3">&#x1f504; Loading news details...</div>}

            {!isLoadingAllNews && updatingNews && (
                <NewsForm
                    newsItem={updatingNews}
                    handleSubmit={handleUpdateNews}
                    onChange={(updatedNews) => setSelectedNews(updatedNews)}
                    formType="edit"
                />
            )}
            {error && <div className="text-danger mb-3" role="alert">{error}</div>}
            {successMessage && <output className="text-success mb-3">&#x2705; {successMessage}</output>}
        </div>
    );
}
