import React, { ChangeEvent, FormEvent } from 'react';
import styles from './Forms.module.css';
import {Badge} from "react-bootstrap";
import HinweisWerbungVeranstaltungsort from "./HinweisWerbungVeranstaltungsort.tsx";
import {useDateRangeValidation} from "../../hooks/useDateRangeValidation.ts";
import DatenschutzCheck from "../other/DatenschutzCheck.tsx";

// caller of this component: EventMitProjektion.tsx

export interface EigenstaendigFormData {
    betreff: string;
    ansprechperson: string;
    email: string;
    veranstaltungsbeginn: string; // Will hold ISO 8601 date and time
    veranstaltungsende: string;   // Will hold ISO 8601 date and time
    privacy: boolean;
}

interface EigenstaendigFormProps {
    onSubFormSubmit: (event: FormEvent, data: EigenstaendigFormData) => void;
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; nachricht?: string | null };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: EigenstaendigFormData;
}

const EigenstaendigForm: React.FC<EigenstaendigFormProps> = ({ onSubFormSubmit, submissionStatus, onInputChange, formData }) => {

    const handleLocalSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubFormSubmit(event, formData);
    };

    const dateRangeError = useDateRangeValidation(
        formData.veranstaltungsbeginn,
        formData.veranstaltungsende
    );

    return (
        <form className={styles.formContainer} onSubmit={handleLocalSubmit}>
            <p className={styles.formDescription}>
                Der Schlüssel zum Ausrollen der Leinwand liegt bei der Pforte des Studierendenhauses.
                {/*Wir bitten hier um kurze Benachrichtigung zu eurer Nutzung.*/}
                Ihr könnt gerne eine kurze Benachrichtigung zu eurer Nutzung hinterlassen.
            </p>
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="betreff">Betreff*:</label>
                <input
                    type="text"
                    id="betreff"
                    name="betreff"
                    value={formData.betreff ?? ''}
                    onChange={onInputChange}
                    className={styles.textInput}
                    required
                />
            </div>
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="ansprechperson">Ansprechperson:</label>
                <input
                    type="text"
                    id="ansprechperson"
                    name="ansprechperson"
                    value={formData.ansprechperson || ''}
                    onChange={onInputChange}
                    className={styles.textInput}
                />
            </div>
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="email">Email*:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={onInputChange}
                    required
                    className={styles.emailInput}
                />
            </div>

            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="veranstaltungsbeginn">Veranstaltungsbeginn (Datum & Uhrzeit)*:</label>
                <input
                    type="datetime-local"
                    id="veranstaltungsbeginn"
                    name="veranstaltungsbeginn"
                    value={formData.veranstaltungsbeginn || ''}
                    onChange={onInputChange}
                    required
                    className={styles.datetimeInput}
                />
            </div>

            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="veranstaltungsende">Veranstaltungsende (Datum & Uhrzeit)*:</label>
                <input
                    type="datetime-local"
                    id="veranstaltungsende"
                    name="veranstaltungsende"
                    value={formData.veranstaltungsende || ''}
                    onChange={onInputChange}
                    required
                    className={styles.datetimeInput}
                />

                <div style={{ minHeight: '1.5em' }}>
                    {dateRangeError && <p className={styles.statusError + " m-0"}>{dateRangeError}</p>}
                </div>
            </div>

            <Badge bg="warning" text="dark">
                Hinweis:
            </Badge>
            <HinweisWerbungVeranstaltungsort />

            <DatenschutzCheck
                onInputChange={onInputChange}
                formData={formData as EigenstaendigFormData}
                messageType="der Nachricht"
            />

            <button
                type="submit"
                className={styles.submitButton}
                disabled={submissionStatus.status === 'sending' || !!dateRangeError}
            >
                Mitteilung senden
            </button>
            <p><sub className={styles.formSubtext}>*Pflichtfelder</sub></p>

            {submissionStatus.status === 'sending' &&
                <p className={styles.statusMessage + " " + styles.statusSending}>&#x2709; Sende Nachricht...</p>
            }
        </form>
    );
};

export default EigenstaendigForm;
