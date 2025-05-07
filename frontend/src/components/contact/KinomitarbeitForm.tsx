import React, { ChangeEvent, FormEvent } from 'react';

interface KinomitarbeitFormData {
    subject: string;
    name: string;
    email: string;
    message: string;
    stundenEngagement: number;
}

interface KinomitarbeitFormProps {
    onSubmit: (event: FormEvent, issue?: string, data?: KinomitarbeitFormData) => void;
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; message?: string | null };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: KinomitarbeitFormData;
}

const KinomitarbeitForm: React.FC<KinomitarbeitFormProps> = ({ onSubmit, submissionStatus, onInputChange, formData }) => {
    const handleLocalSubmit = (event: FormEvent) => {
        event.preventDefault(); // Prevent the child form's default submission
        onSubmit(event, undefined, formData); // Call the parent's onSubmit
    };
    return (
        <form onSubmit={handleLocalSubmit}>
            <div>
                <label htmlFor="name">Name*:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}     // Ensure initial value is defined
                    onChange={onInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email*:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}    // Ensure initial value is defined
                    onChange={onInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="message">Nachricht*:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message || ''}  // Ensure initial value is defined
                    onChange={onInputChange}
                    required
                    style={{ width: '100%', height: '336px' }}
                />
            </div>

            <div>
                <label htmlFor="stundenEngagement">Engagement (Schätzung in h) im Durchschnitt pro Monat:</label>
                <input
                    type="number"
                    id="stundenEngagement"
                    name="stundenEngagement"
                    value={formData.stundenEngagement !== undefined ? formData.stundenEngagement : 0}
                    onChange={onInputChange}
                    min="0"
                    step="0.5" />
            </div>

            <button type="submit" disabled={submissionStatus.status === 'sending'}>Nachricht senden</button>
            <p><sub>*Pflichtfelder</sub></p>
        </form>
    );
};

export default KinomitarbeitForm;