// SalesInquiryForm.tsx
import React, { ChangeEvent } from 'react';

interface SalesInquiryFormData {
    company: string;
    name: string;
    email: string;
    interest: string;
}

interface SalesInquiryFormProps {
    onSubmit: (data: SalesInquiryFormData) => void;
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; message?: string | null };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: SalesInquiryFormData;
}

const SalesInquiryForm: React.FC<SalesInquiryFormProps> = ({ onSubmit, submissionStatus, onInputChange, formData }) => {
    return (
        <form onSubmit={(e) => onSubmit(formData)}>
            <div>
                <label htmlFor="company">Company:</label>
                <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
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
                <label htmlFor="interest">Interest:</label>
                <textarea
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={onInputChange}
                    required
                />
            </div>
            <button type="submit" disabled={submissionStatus.status === 'sending'}>Submit Sales Inquiry</button>
        </form>
    );
};

export default SalesInquiryForm;