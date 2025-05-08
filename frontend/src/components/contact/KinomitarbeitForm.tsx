import React, { ChangeEvent, FormEvent } from 'react';

export interface KinomitarbeitFormData {
    name: string;
    email: string;
    nachricht: string;
    stundenEngagement: number;
}

interface KinomitarbeitFormProps {
    onSubmit: (event: FormEvent, issue?: string, data?: KinomitarbeitFormData) => void;
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; nachricht?: string | null };
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
                <label htmlFor="nachricht">Nachricht*:</label>
                <textarea
                    id="nachricht"
                    name="nachricht"
                    value={formData.nachricht || ''}  // Ensure initial value is defined
                    onChange={onInputChange}
                    required
                    style={{ height: '300px' }}
                />
            </div>

            <div>
                <label htmlFor="stundenEngagement">Geschätztes Engagement (in h) im Durchschnitt pro Monat:</label>
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