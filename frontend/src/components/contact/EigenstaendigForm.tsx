import React, { ChangeEvent, FormEvent } from 'react';
import {Badge} from "react-bootstrap";
import HinweisWerbungVeranstaltungsort from "./HinweisWerbungVeranstaltungsort.tsx";

interface EigenstaendigFormData {
    betreff: string;
    ansprechperson: string;
    email: string;

    veranstaltungsbeginn: string; // Will hold ISO 8601 date and time
    veranstaltungsende: string;   // Will hold ISO 8601 date and time
}

interface EigenstaendigFormProps {
    onSubmit: (event: FormEvent, data: EigenstaendigFormData) => void;
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: EigenstaendigFormData;
}

const EigenstaendigForm: React.FC<EigenstaendigFormProps> = ({ onSubmit, onInputChange, formData }) => {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubmit(event, formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <p>
                Der Schlüssel zum Ausrollen der Leinwand liegt bei der Pforte des Studierendenhauses.
                Wir bitten hier um kurze Benachrichtigung zu eurer Nutzung.
            </p>
            <div>
                <label htmlFor="betreff">Betreff*:</label>
                <input
                    type="text"
                    id="betreff"
                    name="betreff"
                    value={formData.betreff || ''}
                    onChange={onInputChange}
                />
            </div>
            <div>
                <label htmlFor="ansprechperson">Ansprechperson*:</label>
                <input type="text" id="ansprechperson" name="ansprechperson" value={formData.ansprechperson || ''} onChange={onInputChange} required />
            </div>
            <div>
                <label htmlFor="email">Email*:</label>
                <input type="email" id="email" name="email" value={formData.email || ''} onChange={onInputChange} required />
            </div>

            <div>
                <label htmlFor="veranstaltungsbeginn">Veranstaltungsbeginn (Datum & Uhrzeit)*:</label>
                <input
                    type="datetime-local"
                    id="veranstaltungsbeginn"
                    name="veranstaltungsbeginn"
                    value={formData.veranstaltungsbeginn || ''}
                    onChange={onInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="veranstaltungsende">Veranstaltungsende (Datum & Uhrzeit)*:</label>
                <input
                    type="datetime-local"
                    id="veranstaltungsende"
                    name="veranstaltungsende"
                    value={formData.veranstaltungsende || ''}
                    onChange={onInputChange}
                    required
                />
            </div>

            <Badge bg="warning" text="dark">
                Hinweis:
            </Badge>
            <HinweisWerbungVeranstaltungsort />

            <button type="submit">Mitteilung senden</button>
            <p><sub>*Pflichtfelder</sub></p>
        </form>
    );
};

export default EigenstaendigForm;