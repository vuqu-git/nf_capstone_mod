// SupportRequestForm.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react';

interface SupportRequestFormData {
    ticketId: string;
    name: string;
    email: string;
    issueDetails: string;
}

interface SupportRequestFormProps {
    onSubmit: (data: SupportRequestFormData) => void;
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; message?: string | null };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: SupportRequestFormData;
}

const SupportRequestForm: React.FC<SupportRequestFormProps> = ({ onSubmit, submissionStatus, onInputChange, formData }) => {
    return (
        <form onSubmit={(e) => onSubmit(formData)}>
            <div>
                <label htmlFor="ticketId">Ticket ID:</label>
                <input
                    type="text"
                    id="ticketId"
                    name="ticketId"
                    value={formData.ticketId}
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
                    value={formData.name}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="issueDetails">Issue Details:</label>
                <textarea
                    id="issueDetails"
                    name="issueDetails"
                    value={formData.issueDetails}
                    onChange={onInputChange}
                    required
                />
            </div>
            <button type="submit" disabled={submissionStatus.status === 'sending'}>Submit Support Request</button>
        </form>
    );
};

export default SupportRequestForm;