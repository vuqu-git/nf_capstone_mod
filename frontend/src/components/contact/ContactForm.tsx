import React, {useState, FormEvent, ChangeEvent, useEffect} from 'react';
import AOBForm, { AOBFormData } from './AOBForm.tsx';
import SupportRequestForm, { SupportRequestFormData } from './SupportRequestForm';
import SalesInquiryForm, { SalesInquiryFormData } from './SalesInquiryForm';
import EventOhneProjektion from './EventOhneProjektion'
import EventMitProjektion from "./EventMitProjektion.tsx";
import KinomitarbeitForm, { MitKinotechnikFormData } from "./KinomitarbeitForm.tsx";

interface SubmissionStatus {
    status: 'idle' | 'sending' | 'success' | 'error';
    message?: string | null;
}

interface IssueConfig {
    value: string;
    label: string;
}

const issueOptions: IssueConfig[] = [
    { value: 'aob', label: 'Sonstiges' },
    { value: 'kinomitarbeit', label: 'Kinomitarbeit' },
    { value: 'eventOhneProjektion', label: 'Veranstaltung im Festsaal ohne Projektion' },
    { value: 'eventMitProjektion', label: 'Veranstaltung im Festsaal mit Projektion' },
    // { value: 'support', label: 'Support Request' },
    // { value: 'sales', label: 'Sales Inquiry' },
];

const ContactForm: React.FC = () => {
    const [selectedIssue, setSelectedIssue] = useState<string>('');
    const [formData, setFormData] = useState<AOBFormData | MitKinotechnikFormData | SupportRequestFormData | SalesInquiryFormData>({});
    const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({ status: 'idle' });

    // Reset state after a successful submission, but keep the success message
    useEffect(() => {
        if (submissionStatus.status === 'success') {
            setSelectedIssue('');
            setFormData({});
            // Optionally reset status after a timeout if you want to hide the message after a while:
            // setTimeout(() => setSubmissionStatus({ status: 'idle' }), 5000);
        }
    }, [submissionStatus.status]);

    const handleIssueChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedIssue(event.target.value);
        setFormData({});
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // const handleSubmit = async (event: FormEvent, issue: string = selectedIssue, data: AOBFormData | SupportRequestFormData | SalesInquiryFormData = formData) => {
    //     event.preventDefault();
    //     setSubmissionStatus({ status: 'sending' });
    //
    //     try {
    //         const response = await fetch(`/api/contact/${issue}`, { // Use the 'issue' parameter here
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(data),
    //         });

    const handleSubmit = async (
        event: FormEvent,
        explicitIssue?: string, // Optional explicit issue parameter
        explicitData?: AOBFormData | MitKinotechnikFormData | SupportRequestFormData | SalesInquiryFormData // Optional explicit data
    ) => {
        event.preventDefault();
        setSubmissionStatus({ status: 'sending' });

        // Use explicit parameters if provided, otherwise use state values
        const issueToUse = explicitIssue || selectedIssue;
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
                setSubmissionStatus({ status: 'error', message: errorData.message || 'Something went wrong.' });
            }
        } catch (error: any) {
            console.error('Error sending message:', error);
            setSubmissionStatus({ status: 'error', message: 'Network error. Please try again.' });
        }
    };

    const renderForm = () => {
        switch (selectedIssue) {
            case 'aob':
                return (
                    <AOBForm
                        onSubmit={handleSubmit}
                        submissionStatus={submissionStatus}
                        onInputChange={handleChange}
                        formData={formData}
                    />
                );
            case 'kinomitarbeit':
                return (
                    <KinomitarbeitForm
                        onSubmit={handleSubmit}
                        submissionStatus={submissionStatus}
                        onInputChange={handleChange}
                        formData={formData}
                    />
                );
            case 'eventMitProjektion':
                return (
                    <EventMitProjektion
                        onSubmit={handleSubmit} // The callback will now receive the issue from the subselection
                        submissionStatus={submissionStatus}
                        onInputChange={handleChange}
                        formData={formData}
                    />
                );
            case 'eventOhneProjektion':
                return (
                    <EventOhneProjektion/>
                );
            case 'support':
                return (
                    <SupportRequestForm
                        onSubmit={handleSubmit}
                        submissionStatus={submissionStatus}
                        onInputChange={handleChange}
                        formData={formData as SupportRequestFormData}
                    />
                );
            case 'sales':
                return (
                    <SalesInquiryForm
                        onSubmit={handleSubmit}
                        submissionStatus={submissionStatus}
                        onInputChange={handleChange}
                        formData={formData as SalesInquiryFormData}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <h2>Kontakt</h2>
            {submissionStatus.status === 'sending' && <p>Sende Nachricht...</p>}
            {submissionStatus.status === 'success' && <p>Vielen Dank! Deine Nachricht wurde gesendet.</p>}
            {submissionStatus.status === 'error' && submissionStatus.message && (
                <p style={{ color: 'red' }}>{submissionStatus.message}</p>
            )}

            {submissionStatus.status !== 'success' && (
                <>
                    <p>
                        Für eine strukturierte Bearbeitung von Anfragen bitten wir darum, ausschließlich das Kontaktformular auf unserer Webseite zu verwenden.
                    </p>
                    <p>
                        Da das gesamte Kinoteam ehrenamtlich arbeitet, kann die Beantwortung etwas Zeit in Anspruch nehmen – wir bitten um Verständnis und etwas Geduld.
                    </p>
                </>
            )}

            {/* Only show dropdown and form if not success */}
            {submissionStatus.status !== 'success' && (
                <>
                    <div>
                        <select id="issue" value={selectedIssue} onChange={handleIssueChange}>
                            <option key="" value="" disabled>
                                Bitte Anliegen auswählen.
                            </option>
                            {issueOptions.map((option) => (
                                <option key={option.value} value={option.value}>
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