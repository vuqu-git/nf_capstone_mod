import { FormEvent, useState } from "react";
import { News } from "../../types/News.ts";
import axios from "axios";
import NewsForm from "./NewsForm.tsx";

import { preprocessFormData } from '../../utils/PreprocessingFormData.ts';
import {Link} from "react-router-dom";
import * as React from "react";

const baseURL = "/api/news";

export default function AddNews() {
    const emptyNewsForForm = {
        id: "",
        text: "",
        image: "",
        startDate: "",
        endDate: "",
        newsVariant: "light" // value of the option needs to be written here
    };

    const [addingNews, setAddingNews] = useState<News>(emptyNewsForForm);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleSaveNews = (event: FormEvent<HTMLFormElement>, newsInForm: News) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccessMessage("");

        axios.post(`${baseURL}/all`, preprocessFormData(newsInForm))
            .then(() => {
                setSuccessMessage("News added successfully!");
                setAddingNews(emptyNewsForForm);
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
            <Link to={`/admin`}>
                zum Adminbereich
            </Link>

            <NewsForm
                newsItem={addingNews}
                handleSubmit={handleSaveNews}
                onChange={(addingNews) => setAddingNews(addingNews)}
                formType="add"
            />
            {error && <div className="text-danger mb-3">{error}</div>}
            {successMessage && <div className="text-success mb-3">&#x2705; {successMessage}</div>}

            {/* Display loading message when submitting */}
            {isLoading && <div className="text-warning mb-3">&#x1f4be; Saving news...</div>}
        </div>
    );
}
