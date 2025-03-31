import { FormEvent, useState } from "react";
import { News } from "../types/News.ts";
import axios from "axios";
import NewsForm from "./NewsForm.tsx";

const baseURL = "/api/news";

export default function AddNews() {
    const emptyNews = {
        id: "",
        description: "",
        image: "",
        startDate: "",
        endDate: "",
        newsVariant: "secondary" // Default to "primary"
    };

    const [addingNews, setAddingNews] = useState<News>(emptyNews);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleSaveNews = (event: FormEvent<HTMLFormElement>, newsInForm: News) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        axios.post(`${baseURL}/all`, newsInForm)
            .then(() => {
                setSuccessMessage("News added successfully!");
                setAddingNews(emptyNews);
            })
            .catch((error) => {
                const errorMessage =
                    error instanceof Error ? error.message : "An unknown error occurred";
                setError(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <div>
            {error && <div className="text-danger mb-3">{error}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}

            <NewsForm
                newsItem={addingNews}
                handleSubmit={handleSaveNews}
                onChange={(addingNews) => setAddingNews(addingNews)}
                formType="add"
            />
        </div>
    );
}
