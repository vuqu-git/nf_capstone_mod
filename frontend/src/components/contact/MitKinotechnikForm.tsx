import React, { ChangeEvent, FormEvent } from 'react';
import styles from './Forms.module.css';

export interface EigenstaendigFormData {
    [key: string]: any;
}

interface EigenstaendigFormProps {
    onSubFormSubmit: (event: FormEvent, formData: EigenstaendigFormData) => void;
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; message?: string | null };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: EigenstaendigFormData;
}

const EigenstaendigForm: React.FC<EigenstaendigFormProps> = ({
                                                                 onSubFormSubmit,
                                                                 submissionStatus,
                                                                 onInputChange,
                                                                 formData,
                                                             }) => {
    return (
        <form
            className={styles.formContainer}
            onSubmit={(e) => onSubFormSubmit(e, formData)}
            autoComplete="off"
        >
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="name">
                    Name der veranstaltenden Gruppe
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={onInputChange}
                    className={styles.textInput}
                    required
                />
            </div>
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="email">
                    Kontakt-E-Mail
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={onInputChange}
                    className={styles.emailInput}
                    required
                />
            </div>
            <div className={styles.formField}>
                <label className={styles.formLabel} htmlFor="beschreibung">
                    Beschreibung der Veranstaltung
                </label>
                <textarea
                    id="beschreibung"
                    name="beschreibung"
                    value={formData.beschreibung || ''}
                    onChange={onInputChange}
                    className={styles.textareaField}
                    required
                />
            </div>
            {/* Add more fields as needed, following the same pattern */}

            <button
                type="submit"
                className={styles.submitButton}
                disabled={submissionStatus.status === 'sending'}
            >
                {submissionStatus.status === 'sending' ? 'Senden...' : 'Absenden'}
            </button>

            {submissionStatus.status === 'error' && submissionStatus.message && (
                <div className={styles.statusError}>{submissionStatus.message}</div>
            )}
            {submissionStatus.status === 'success' && (
                <div className={styles.statusSuccess}>Nachricht erfolgreich gesendet!</div>
            )}
        </form>
    );
};

export default EigenstaendigForm;
