import React, { ChangeEvent, FormEvent } from 'react'; // Import FormEvent

interface AOBFormData {
    subject: string;
    name: string;
    email: string;
    message: string;
}

interface AOBFormProps {
    onSubmit: (event: FormEvent, data: AOBFormData) => void; // Expect the event as the first argument
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; message?: string | null };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: AOBFormData;
}

const AOBForm: React.FC<AOBFormProps> = ({ onSubmit, submissionStatus, onInputChange, formData }) => {
    const handleLocalSubmit = (event: FormEvent) => {
        event.preventDefault(); // Prevent the child form's default submission
        onSubmit(event, formData); // Call the parent's onSubmit and pass the event and data
    };
    return (
        <form onSubmit={handleLocalSubmit}>
            <div>
                <label htmlFor="subject">Betreff*:</label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject || ''} // Ensure initial value is defined
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
                <label htmlFor="message">Nachricht*:</label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message || ''}  // Ensure initial value is defined
                    onChange={onInputChange}
                    required
                />
            </div>
            <button type="submit" disabled={submissionStatus.status === 'sending'}>Nachricht senden</button>
            <p><sub>*Pflichtfelder</sub></p>
        </form>
    );
};

export default AOBForm;