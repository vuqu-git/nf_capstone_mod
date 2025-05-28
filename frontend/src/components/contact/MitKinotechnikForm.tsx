import React, {ChangeEvent, FormEvent, useState} from 'react';
import styles from './Forms.module.css';
import {useDateRangeValidation} from "../../hooks/useDateRangeValidation.ts";

export interface MitKinotechnikFormData {
    betreff: string;
    ansprechperson: string;
    email: string;
    telefon: string;

    veranstaltungsbeginn: string; // Will hold ISO 8601 date and time
    veranstaltungsende: string;   // Will hold ISO 8601 date and time
    istGemietetBeiAsta: boolean;
    wurdeGelesenHinweisEventlocation: boolean;

    nachricht: string;

    projektionsinhalt: string;
    verleih: string;
    format: 'DCP' | 'Blu-ray' | 'DVD' | 'Datei auf PC' | '35mm' | '16mm' | 'noch unbekannt';
    anzMikrofone: number;

}

interface MitKinotechnikFormProps {
    onSubFormSubmit: (event: FormEvent, data: MitKinotechnikFormData) => void;
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; nachricht?: string | null };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    formData: MitKinotechnikFormData;
}

const MitKinotechnikForm: React.FC<MitKinotechnikFormProps> = ({ onSubFormSubmit, submissionStatus, onInputChange, formData }) => {
    const [errorMissingConfirmationMessage, setErrorMissingConfirmationMessage] = useState<string | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = event.target;
        onInputChange(event); // Call the original onInputChange prop

        if (target.type === 'checkbox') {
            const checkboxTarget = target as HTMLInputElement; // Explicitly cast to HTMLInputElement
            const { name, checked } = checkboxTarget;
            const isAstaChecked = name === 'istGemietetBeiAsta' ? checked : formData.istGemietetBeiAsta;
            const isLocationHintChecked = name === 'wurdeGelesenHinweisEventlocation' ? checked : formData.wurdeGelesenHinweisEventlocation;

            if (isAstaChecked && isLocationHintChecked) {
                setErrorMissingConfirmationMessage(null); // Clear the error message
            }
        }
    };

    const handleLocalSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (formData.istGemietetBeiAsta && formData.wurdeGelesenHinweisEventlocation) {
            onSubFormSubmit(event, formData);
            setErrorMissingConfirmationMessage(null); // Clear any previous error message
        } else {
            setErrorMissingConfirmationMessage('Bitte bestätige beide Punkte, um die Anfrage zu senden.');
        }
    };

    const dateRangeError = useDateRangeValidation(
        formData.veranstaltungsbeginn,
        formData.veranstaltungsende
    );

    return (
        <form className={styles.formContainer} onSubmit={handleLocalSubmit}>
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="betreff">Betreff*:</label>
                <input
                    type="text"
                    id="betreff"
                    name="betreff"
                    value={formData.betreff || ''}
                    onChange={onInputChange}
                    required
                    className={styles.textInput}
                />
            </div>
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="ansprechperson">Ansprechperson*:</label>
                <input
                    type="text"
                    id="ansprechperson"
                    name="ansprechperson"
                    value={formData.ansprechperson || ''}
                    onChange={onInputChange}
                    required
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
                <label className={styles.formLabel} htmlFor="telefon">Telefonnummer:</label>
                <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    value={formData.telefon || ''}
                    onChange={onInputChange}
                    className={styles.telInput}
                />
            </div>

            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="nachricht">Eure Nachricht*</label>
                <textarea
                    id="nachricht"
                    name="nachricht"
                    value={formData.nachricht || ''}
                    onChange={onInputChange}
                    required
                    className={styles.textareaField}
                    style={{ height: '300px' }}
                />
            </div>

            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="projektionsinhalt">Projektionsinhalt* (bspw. Filmtitel):</label>
                <input
                    type="text"
                    id="projektionsinhalt"
                    name="projektionsinhalt"
                    value={formData.projektionsinhalt || ''}
                    onChange={onInputChange}
                    required
                    className={styles.textInput}
                />
            </div>

            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="verleih">Verleiher/Rechteinhaber (bei öffentlicher Filmvorführung):</label>
                <input
                    type="text"
                    id="verleih"
                    name="verleih"
                    value={formData.verleih || ''}
                    onChange={onInputChange}
                    className={styles.textInput}
                />
            </div>

            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="format">Abspielformat*:</label>
                <select
                    id="format"
                    name="format"
                    value={formData.format || ''}
                    onChange={onInputChange}
                    required
                    className={styles.formSelect}
                >
                    <option value="" disabled className={styles.selectOption}>Bitte auswählen</option>
                    <option value="DCP" className={styles.selectOption}>DCP</option>
                    <option value="Blu-ray" className={styles.selectOption}>Blu-ray</option>
                    <option value="DVD" className={styles.selectOption}>DVD</option>
                    <option value="Datei auf PC" className={styles.selectOption}>Datei auf PC</option>
                    <option value="35mm" className={styles.selectOption}>35mm</option>
                    <option value="16mm" className={styles.selectOption}>16mm</option>
                    <option value="noch unbekannt" className={styles.selectOption}>noch unbekannt</option>
                </select>
            </div>

            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="anzMikrofone">Anzahl benötigter Mikrofone:</label>
                <input
                    type="number"
                    id="anzMikrofone"
                    name="anzMikrofone"
                    value={formData.anzMikrofone !== undefined ? formData.anzMikrofone : 0}
                    onChange={onInputChange}
                    min={0}
                    max={2}
                    className={styles.numberInput}
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

            <div className={styles.formFieldCheckbox}>
                <input
                    type="checkbox"
                    id="istGemietetBeiAsta"
                    name="istGemietetBeiAsta"
                    checked={formData.istGemietetBeiAsta || false}
                    onChange={handleInputChange}
                    className={styles.checkboxInput}
                />
                <label
                    htmlFor="istGemietetBeiAsta"
                    className={errorMissingConfirmationMessage && !formData.istGemietetBeiAsta ? styles.errorRedLabel : ''}
                >
                    Ich bestätige, dass für den oben genannten Zeitraum der Festsaal beim AStA bereits reserviert bzw. gemietet wurde.
                </label>
            </div>

            <div className={styles.formFieldCheckbox}>
                <input
                    type="checkbox"
                    id="wurdeGelesenHinweisEventlocation"
                    name="wurdeGelesenHinweisEventlocation"
                    checked={formData.wurdeGelesenHinweisEventlocation || false}
                    onChange={handleInputChange}
                    className={styles.checkboxInput}
                />
                <label
                    htmlFor="wurdeGelesenHinweisEventlocation"
                    className={errorMissingConfirmationMessage && !formData.wurdeGelesenHinweisEventlocation ? styles.errorOrangeLabel : ''}
                >
                    Hiermit bestätige ich, dass bei Werbemaßnahmen der "Festsaal im Studierendenhaus" als Veranstaltungsort genannt wird und <b>nicht</b> Pupille-Kino, da die Pupille nicht der Veranstalter ist.
                </label>
            </div>

            <button
                type="submit"
                className={styles.submitButton}
                disabled={submissionStatus.status === 'sending' || !!dateRangeError}
            >
                Anfrage senden
            </button>

            <p><sub className={styles.formSubtext}>*Pflichtfelder</sub></p>

            {errorMissingConfirmationMessage && (
                <p className={styles.errorOrangeLabel}>{errorMissingConfirmationMessage}</p>
            )}

            {submissionStatus.status === 'sending' && (
                <p className={`${styles.statusMessage} ${styles.statusSending}`}>&#x2709; Sende Nachricht...</p>
            )}
        </form>
    );
};

export default MitKinotechnikForm;