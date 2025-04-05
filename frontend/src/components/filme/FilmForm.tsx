import { FormEvent } from "react";
import { Form, Button } from "react-bootstrap";
import * as React from "react";
import {Film} from "../../types/Film.ts";

interface Props {
    filmItem: Film; // this is need for prefilled form in case of edit
    handleSubmit: (event: FormEvent<HTMLFormElement>, filmInForm: Film) => void;
    onChange: (filmItem: Film) => void; // to have a Film object with field values equaling the prevailing form inputs
    formType: "edit" | "add"; // determines whether the form is for editing or adding
}

export default function FilmForm({ filmItem, handleSubmit, onChange, formType }: Props) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        onChange({ ...filmItem, [name]: value });
    };

    return (
        <>
            {/* heading based on formType */}
            <h4 className="mb-4">{formType === "edit" ? "Edit Film" : "Add Film"}</h4>


            <Form onSubmit={(e) => handleSubmit(e, filmItem)}>
                <Form.Group controlId="titel" className="mt-3">
                    <Form.Label>Titel</Form.Label>
                    <Form.Control
                        type="text"
                        name="titel"
                        value={filmItem.titel}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="originaltitel" className="mt-3">
                    <Form.Label>Originaltitel</Form.Label>
                    <Form.Control
                        type="text"
                        name="originaltitel"
                        value={filmItem.originaltitel}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="originaltitelAnzeigen" className="mt-3">
                    <Form.Check
                        type="checkbox"
                        label="Originaltitel anzeigen"
                        name="originaltitelAnzeigen"
                        checked={filmItem.originaltitelAnzeigen}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="text">
                    <Form.Label>Text</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={13}
                        name="text"
                        value={filmItem.text}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="kurztext">
                    <Form.Label>Kurztext</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="kurztext"
                        value={filmItem.kurztext}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="besonderheit">
                    <Form.Label>Besonderheit</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={2}
                        name="besonderheit"
                        value={filmItem.besonderheit}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="land" className="mt-3">
                    <Form.Label>Land</Form.Label>
                    <Form.Control
                        type="text"
                        name="land"
                        value={filmItem.land}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="jahr" className="mt-3">
                    <Form.Label>Jahr</Form.Label>
                    <Form.Control
                        type="number"
                        name="jahr"
                        value={filmItem.jahr}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="farbe" className="mt-3">
                    <Form.Label>Farbe</Form.Label>
                    <Form.Control
                        type="text"
                        name="farbe"
                        value={filmItem.farbe}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="laufzeit" className="mt-3">
                    <Form.Label>Laufzeit (Minuten)</Form.Label>
                    <Form.Control
                        type="number"
                        name="laufzeit"
                        value={filmItem.laufzeit}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="sprache" className="mt-3">
                    <Form.Label>Sprache</Form.Label>
                    <Form.Control
                        type="text"
                        name="sprache"
                        value={filmItem.sprache}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="untertitel" className="mt-3">
                    <Form.Label>Untertitel</Form.Label>
                    <Form.Control
                        type="text"
                        name="untertitel"
                        value={filmItem.untertitel}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="format" className="mt-3">
                    <Form.Label>Format</Form.Label>
                    <Form.Control
                        type="text"
                        name="format"
                        value={filmItem.format}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="fsk" className="mt-3">
                    <Form.Label>FSK</Form.Label>
                    <Form.Control
                        as="select"
                        name="fsk"
                        value={filmItem.fsk}
                        onChange={handleChange}
                    >
                        <option value="_0">0</option>
                        <option value="_6">6</option>
                        <option value="_12">12</option>
                        <option value="_16">16</option>
                        <option value="_18">18</option>
                        <option value="UNGEPRUEFT">Ungeprüft</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="stab" className="mt-3">
                    <Form.Label>Stab</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={10}
                        name="stab"
                        value={filmItem.stab}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="bild" className="mt-3">
                    <Form.Label>Bild URL</Form.Label>
                    <Form.Control
                        type="text"
                        name="bild"
                        value={filmItem.bild}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="sonderfarbeTitel" className="mt-3">
                    <Form.Label>Sonderfarbe Titel</Form.Label>
                    <Form.Control
                        type="number"
                        name="sonderfarbeTitel"
                        value={filmItem.sonderfarbeTitel}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="sonderfarbe" className="mt-3">
                    <Form.Label>Sonderfarbe</Form.Label>
                    <Form.Control
                        type="number"
                        name="sonderfarbe"
                        value={filmItem.sonderfarbe}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4">
                    Save
                </Button>
            </Form>
        </>
    );
}
