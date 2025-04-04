import { FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import { News } from "../../types/News.ts";
import * as React from "react";

interface Props {
    newsItem: News; // this is need for prefilled form in case of edit
    handleSubmit: (event: FormEvent<HTMLFormElement>, newsInForm: News) => void;
    onChange: (newsItem: News) => void; // to have a News object with field values equaling the prevailing form inputs
    formType: "edit" | "add"; // determines whether the form is for editing or adding
}

export default function NewsForm({ newsItem, handleSubmit, onChange, formType }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange({ ...newsItem, [name]: value });
    };

    return (
        <>
            {/* heading based on formType */}
            <h4 className="mb-4">{formType === "edit" ? "Edit News" : "Add News"}</h4>

            <Form onSubmit={(e) => handleSubmit(e, newsItem)}>
                <Form.Group controlId="text">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10} // Large textarea
                        name="text"
                        value={newsItem.text}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="image" className="mt-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="image"
                        value={newsItem.image}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="startDate" className="mt-3">
                    <Form.Label>Start Date (inclusive)</Form.Label>
                    <Form.Control
                        type="date"
                        name="startDate"
                        value={newsItem.startDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="endDate" className="mt-3">
                    <Form.Label>End Date (inclusive)</Form.Label>
                    <Form.Control
                        type="date"
                        name="endDate"
                        value={newsItem.endDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="exampleForm.Select" className="mt-3">
                    <Form.Label>Color Design</Form.Label>
                    <Form.Select
                        value={newsItem.newsVariant}
                        onChange={handleChange}
                        name="newsVariant"
                    >
                        <option value="primary">blue</option>
                        <option value="secondary">grey</option>
                        <option value="success">green</option>
                        <option value="danger">red</option>
                        <option value="warning">yellow</option>
                        <option value="info">sky blue</option>
                        <option value="light">white</option>
                        <option value="dark">dark grey</option>
                        <option value="free">free</option>
                    </Form.Select>
                </Form.Group>

                <div>
                    <img src="/assets/newsDesigns.png" alt="News Color Design Legend" className="mt-3" />
                </div>

                <Button variant="primary" type="submit" className="mt-4">
                    Save
                </Button>
            </Form>
        </>
    );
}
