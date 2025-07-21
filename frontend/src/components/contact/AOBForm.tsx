import React, { ChangeEvent, FormEvent } from 'react'; // Import FormEvent
import styles from './Forms.module.css';
import DatenschutzCheck from "../other/DatenschutzCheck.tsx";

// caller of this component: ContactForm.tsx

export interface AOBFormData {
    betreff: string;
    name: string;
    email: string;
    nachricht: string;
    istEinverstandenMitDatennutzung: boolean,
}

interface AOBFormProps {
    onSubmit: (event: FormEvent, issue?: string, data?: AOBFormData) => void;
    submissionStatusWithMessage: {
        status: 'idle' | 'sending' | 'success' | 'error';
        message?: string
    };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: AOBFormData;
}

const AOBForm: React.FC<AOBFormProps> = ({ onSubmit, submissionStatusWithMessage, onInputChange, formData }) => {

    const handleLocalSubmit = (event: FormEvent) => {
        // Prevent the child form's default submission
        event.preventDefault();

        // Call the parent's onSubmit which is called handleGlobalSubmit there, 2nd parameter explicitIssue of handleGlobalSubmit is undefined here
        // i.e. ContactForm the state variable selectedIssueSelection is used (for recognizing kinomitarbeit or aob)
        onSubmit(event, undefined, formData);
    };

    return (
        <form className={styles.formContainer} onSubmit={handleLocalSubmit}>
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="betreff">Betreff*:</label>
                <input
                    type="text"
                    id="betreff"
                    name="betreff"
                    value={formData.betreff || ''} // Ensure initial value is defined
                    onChange={onInputChange}
                    required
                    className={styles.textInput}
                />
            </div>

            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}     // Ensure initial value is defined
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
                    value={formData.email || ''}    // Ensure initial value is defined
                    onChange={onInputChange}
                    required
                    className={styles.emailInput}
                />
            </div>

            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="nachricht">Nachricht*:</label>
                <textarea
                    id="nachricht"
                    name="nachricht"
                    value={formData.nachricht || ''}  // Ensure initial value is defined
                    onChange={onInputChange}
                    required
                    className={styles.textareaField}
                    style={{ height: '300px' }}
                />
            </div>

            <DatenschutzCheck
                onInputChange={onInputChange}
                formData={formData as AOBFormData}
                messageType="der Nachricht"
            />

            <button
                type="submit"
                className={styles.submitButton}
                disabled={submissionStatusWithMessage.status === 'sending'}
            >
                Anfrage senden
            </button>
            <p><sub className={styles.formSubtext}>*Pflichtfelder</sub></p>

            {submissionStatusWithMessage.status === 'sending' &&
                <p className={styles.statusMessage + " " + styles.statusSending}>&#x2709; Sende Nachricht...</p>
            }
        </form>
    );
};

export default AOBForm;
