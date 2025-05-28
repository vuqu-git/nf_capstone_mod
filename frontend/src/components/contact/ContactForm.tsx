import styles from './Forms.module.css';

import React, {useState, FormEvent, ChangeEvent, useEffect} from 'react';
import AOBForm, { AOBFormData } from './AOBForm.tsx';

import EventOhneProjektion from './EventOhneProjektion'
import EventMitProjektion from "./EventMitProjektion.tsx";
import KinomitarbeitForm, { KinomitarbeitFormData } from "./KinomitarbeitForm.tsx";
import {EigenstaendigFormData} from "./EigenstaendigForm.tsx";
import {MitKinotechnikFormData} from "./MitKinotechnikForm.tsx";
import {KooperationFormData} from "./KooperationForm.tsx";

interface SubmissionStatus {
    status: 'idle' | 'sending' | 'success' | 'error';
    message?: string | null;
}

interface IssueConfig {
    value: string;
    label: string;
}

const issueSelectOptions: IssueConfig[] = [
    { value: 'aob', label: 'Allgemeine Anfrage' },
    { value: 'eventOhneProjektion', label: 'Veranstaltung im Festsaal ohne Projektion' },
    { value: 'eventMitProjektion', label: 'Veranstaltung im Festsaal mit Projektion' },
    { value: 'kinomitarbeit', label: 'Kinomitarbeit' },
];

const ContactForm: React.FC = () => {
    // selectedIssueSelection here manages only the options aob, kinomitarbeit, eventOhneProjektion and eventMitProjektion (see issueSelectOptions interface)
    const [selectedIssueSelection, setSelectedIssueSelection] = useState<string>('');

    // formData management only for AOBForm and KinomitarbeitForm; for the subforms c.f. EventMitProjektion and the subFormData management there
    const [formData, setFormData] = useState<AOBFormData | KinomitarbeitFormData>({});

    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({ status: 'idle' });

    // Reset state after a successful submission, but keep the success message
    useEffect(() => {
        if (submissionStatus.status === 'success') {
            setSelectedIssueSelection('');
            setFormData({});
            // Optionally reset status after a timeout if you want to hide the message after a while:
            // setTimeout(() => setSubmissionStatus({ status: 'idle' }), 5000);
        }
    }, [submissionStatus.status]);

    const handleIssueSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedIssueSelection(event.target.value);
        setFormData({});
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            })
        );
    };

    const handleGlobalSubmit = async (
        event: FormEvent,
        explicitIssue?: string, // optional parameter
        explicitData?: AOBFormData | KinomitarbeitFormData | EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData // optional parameter
    ) => {
        event.preventDefault(); //maybe remove this because in the (grand) child's handleLocalSubmit event.preventDefault() is already called
        setSubmissionStatus({ status: 'sending' });

        // Use explicit parameters if provided, otherwise use state values
        const issueToUse = explicitIssue || selectedIssueSelection;
        const dataToUse = explicitData || formData;

        try {
            const response = await fetch(`/api/contact/${issueToUse}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToUse),
            });

            if (response.ok) {
                setSubmissionStatus({ status: 'success' });
                setFormData({});
            } else {
                const errorData = await response.json();
                setSubmissionStatus({ status: 'error', message: errorData.message  || 'Something went wrong.' });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setSubmissionStatus({ status: 'error', message: 'Network error. Please try again.' });
        }
    };

    const renderForm = () => {
        switch (selectedIssueSelection) {
            case 'aob':
                return (
                    <AOBForm
                        onSubmit={handleGlobalSubmit}
                        submissionStatus={submissionStatus}
                        onInputChange={handleChange}
                        formData={formData as AOBFormData}
                    />
                );
            case 'kinomitarbeit':
                return (
                    <KinomitarbeitForm
                        onSubmit={handleGlobalSubmit}
                        submissionStatus={submissionStatus}
                        onInputChange={handleChange}
                        formData={formData as KinomitarbeitFormData}
                    />
                );
            case 'eventMitProjektion':
                return (
                    <EventMitProjektion
                        onSubmit={handleGlobalSubmit} // The callback will now receive the issue from the subselection
                        submissionStatus={submissionStatus}
                    />
                );
            case 'eventOhneProjektion':
                return (
                    <EventOhneProjektion/>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.contactFormWrapper}>
            <h2 className={styles.sectionTitle}>Kontakt</h2>

            <h3 className={styles.subsectionTitle}>fernmündlich</h3>
            <p className={styles.formDescription}>I.d.R. nur taggleich vor und nach den Spielterminen erreichbar.</p>
            <p className={styles.formDescription}><a href="tel:06979828976">Telefon: 069 7982 8976</a></p>

            <h3 className={styles.subsectionTitle}>schriftlich</h3>
            {submissionStatus.status === 'success' && (
                <div className={styles.statusSuccess} role="alert">
                    &#x2705; Vielen Dank! Die Nachricht wurde gesendet.
                </div>
            )}
            {submissionStatus.status === 'error' && submissionStatus.message && (
                <div className={styles.statusError} role="alert">
                    {submissionStatus.message}
                </div>
            )}

            {submissionStatus.status !== 'success' && (
                <>
                    <p className={styles.formDescription}>
                        Für eine schnelle und strukturierte Bearbeitung von Anfragen bitten wir darum, ausschließlich das Kontaktformular auf unserer Webseite zu verwenden.
                    </p>
                    <p className={styles.formDescription}>
                        Da das gesamte Kinoteam ehrenamtlich arbeitet, kann die Beantwortung etwas Zeit in Anspruch nehmen – wir bitten um Verständnis und etwas Geduld.
                    </p>
                </>
            )}

            {/* Only show main selection and form if not success */}
            {/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/}
            {submissionStatus.status !== 'success' && (
                <>
                    <div className={styles.formField}>
                        <label htmlFor="issue" className={`${styles.formLabel} visually-hidden`}>
                            Anliegen auswählen
                        </label>
                        <select
                            id="issue"
                            value={selectedIssueSelection}
                            onChange={handleIssueSelectionChange}
                            className={styles.formSelect}
                        >
                            <option key="" value="" disabled>
                                Bitte Anliegen auswählen.
                            </option>
                            {issueSelectOptions.map((option) => (
                                <option key={option.value} value={option.value} className={styles.selectOption}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                    {renderForm()}
                </>
            )}
        </div>
    );
};

export default ContactForm;
