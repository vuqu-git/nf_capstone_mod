import React, { ChangeEvent, FormEvent } from 'react'; // Import FormEvent
import './Forms.css';

export interface AOBFormData {
    betreff: string;
    name: string;
    email: string;
    nachricht: string;
}

interface AOBFormProps {
    onSubmit: (event: FormEvent, issue?: string, data?: AOBFormData) => void;
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; nachricht?: string | null };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: AOBFormData;
}

const AOBForm: React.FC<AOBFormProps> = ({ onSubmit, submissionStatus, onInputChange, formData }) => {
    const handleLocalSubmit = (event: FormEvent) => {
        event.preventDefault(); // Prevent the child form's default submission
        onSubmit(event, undefined, formData); // Call the parent's onSubmit

    };
    return (
        <form onSubmit={handleLocalSubmit}>
            <div>
                <label htmlFor="betreff">Betreff*:</label>
                <input
                    type="text"
                    id="betreff"
                    name="betreff"
                    value={formData.betreff || ''} // Ensure initial value is defined
                    onChange={onInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name || ''}     // Ensure initial value is defined
                    onChange={onInputChange}
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
            <button type="submit" disabled={submissionStatus.status === 'sending'}>Nachricht senden</button>
            <p><sub>*Pflichtfelder</sub></p>
        </form>
    );
};

export default AOBForm;