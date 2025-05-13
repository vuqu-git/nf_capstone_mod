// import './Forms.css';
//
// import React, {useState, FormEvent, ChangeEvent, useEffect} from 'react';
// import AOBForm, { AOBFormData } from './AOBForm.tsx';
//
// import EventOhneProjektion from './EventOhneProjektion'
// import EventMitProjektion from "./EventMitProjektion.tsx";
// import KinomitarbeitForm, { KinomitarbeitFormData } from "./KinomitarbeitForm.tsx";
//
// interface SubmissionStatus {
//     status: 'idle' | 'sending' | 'success' | 'error';
//     message?: string | null;
// }
//
// interface IssueConfig {
//     value: string;
//     label: string;
// }
//
// const issueSelectOptions: IssueConfig[] = [
//     { value: 'eventOhneProjektion', label: 'Veranstaltung im Festsaal ohne Projektion' },
//     { value: 'eventMitProjektion', label: 'Veranstaltung im Festsaal mit Projektion' },
//     { value: 'kinomitarbeit', label: 'Kinomitarbeit' },
//     { value: 'aob', label: 'Sonstiges' },
// ];
//
// const ContactForm: React.FC = () => {
//     const [selectedIssue, setSelectedIssue] = useState<string>('');
//     const [formData, setFormData] = useState<any>(null);
//     const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({ status: 'idle' });
//
//     // Reset state after a successful submission, but keep the success message
//     useEffect(() => {
//         if (submissionStatus.status === 'success') {
//             setSelectedIssue('');
//             setFormData(null);
//             // Optionally reset status after a timeout if you want to hide the message after a while:
//             // setTimeout(() => setSubmissionStatus({ status: 'idle' }), 5000);
//         }
//     }, [submissionStatus.status]);
//
//     const handleIssueSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
//         setSelectedIssue(event.target.value);
//         setFormData({});
//     };
//
//     const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         if (!formData) return; // Prevent updates if formData is null
//
//         const { name, value } = event.target;
//         setFormData((prevData: any) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };
//
//     const handleGlobalSubmit = async (
//         event: FormEvent,
//         explicitIssue?: string, // optional parameter
//         explicitData?: any // optional parameter
//     ) => {
//         event.preventDefault(); //maybe remove this because in the (grand) child's handleLocalSubmit event.preventDefault() is already called
//         setSubmissionStatus({ status: 'sending' });
//
//         // Use explicit parameters if provided, otherwise use state values
//         const issueToUse = explicitIssue || selectedIssue;
//         const dataToUse = explicitData || formData;
//
//         try {
//             const response = await fetch(`/api/contact/${issueToUse}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(dataToUse),
//             });
//
//             if (response.ok) {
//                 setSubmissionStatus({ status: 'success' });
//                 setFormData(null);
//             } else {
//                 const errorData = await response.json();
//                 setSubmissionStatus({ status: 'error', message: errorData.nachricht || 'Something went wrong.' });
//             }
//         } catch (error: any) {
//             console.error('Error sending message:', error);
//             setSubmissionStatus({ status: 'error', message: 'Network error. Please try again.' });
//         }
//     };
//
//     const renderForm = () => {
//         switch (selectedIssue) {
//             case 'aob':
//                 return (
//                     <AOBForm
//                         onSubmit={handleGlobalSubmit}
//                         submissionStatus={submissionStatus}
//                         onInputChange={handleChange}
//                         formData={formData}
//                     />
//                 );
//             case 'kinomitarbeit':
//                 return (
//                     <KinomitarbeitForm
//                         onSubmit={handleGlobalSubmit}
//                         submissionStatus={submissionStatus}
//                         onInputChange={handleChange}
//                         formData={formData}
//                     />
//                 );
//             case 'eventMitProjektion':
//                 return (
//                     <EventMitProjektion
//                         onSubmit={handleGlobalSubmit} // The callback will now receive the issue from the subselection
//                         submissionStatus={submissionStatus}
//                     />
//                 );
//             case 'eventOhneProjektion':
//                 return (
//                     <EventOhneProjektion/>
//                 );
//             default:
//                 return null;
//         }
//     };
//
//     return (
//         <div className="contact-form-container">
//             <h2>Kontakt</h2>
//
//             <h3>fernmündlich</h3>
//             <p>I.d.R. nur taggleich vor und nach den Spielterminen erreichbar.</p>
//             <p>Telefon: 069 7982 8976</p>
//
//             <h3>schriftlich</h3>
//             {submissionStatus.status === 'success' && <p className="text-success">&#x2705; Vielen Dank! Die Nachricht wurde gesendet.</p>}
//             {submissionStatus.status === 'error' && submissionStatus.message && (
//                 <p className="text-danger">{submissionStatus.message}</p>
//             )}
//
//             {submissionStatus.status !== 'success' && (
//                 <>
//                     <p>
//                         Für eine schnelle und strukturierte Bearbeitung von Anfragen bitten wir darum, ausschließlich das Kontaktformular auf unserer Webseite zu verwenden.
//                     </p>
//                     <p>
//                         Da das gesamte Kinoteam ehrenamtlich arbeitet, kann die Beantwortung etwas Zeit in Anspruch nehmen – wir bitten um Verständnis und etwas Geduld.
//                     </p>
//                 </>
//             )}
//
//             {/* Only show dropdown and form if not success */}
//             {submissionStatus.status !== 'success' && (
//                 <>
//                     <div>
//                         <select id="issue" value={selectedIssue} onChange={handleIssueSelectionChange}>
//                             <option key="" value="" disabled>
//                                 Bitte Anliegen auswählen.
//                             </option>
//                             {issueSelectOptions.map((option) => (
//                                 <option key={option.value} value={option.value}>
//                                     {option.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     {renderForm()}
//                 </>
//             )}
//         </div>
//     );
//
// };
//
// export default ContactForm;

import './Forms.css';

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
    { value: 'eventOhneProjektion', label: 'Veranstaltung im Festsaal ohne Projektion' },
    { value: 'eventMitProjektion', label: 'Veranstaltung im Festsaal mit Projektion' },
    { value: 'kinomitarbeit', label: 'Kinomitarbeit' },
    { value: 'aob', label: 'Sonstiges' },
];

const ContactForm: React.FC = () => {
    const [selectedIssue, setSelectedIssue] = useState<string>('');

    // formData management only for AOBForm and KinomitarbeitForm; for the subforms c.f. EventMitProjektion and the subFormData management there
    const [formData, setFormData] = useState<AOBFormData | KinomitarbeitFormData>({});

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

    const handleIssueSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedIssue(event.target.value);
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
                setSubmissionStatus({ status: 'error', message: errorData.nachricht || 'Something went wrong.' });
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
        <div className="contact-form-container">
            <h2>Kontakt</h2>

            <h3>fernmündlich</h3>
            <p>I.d.R. nur taggleich vor und nach den Spielterminen erreichbar.</p>
            <p>Telefon: 069 7982 8976</p>

            <h3>schriftlich</h3>
            {submissionStatus.status === 'success' && <p className="text-success">&#x2705; Vielen Dank! Die Nachricht wurde gesendet.</p>}
            {submissionStatus.status === 'error' && submissionStatus.message && (
                <p className="text-danger">{submissionStatus.message}</p>
            )}

            {submissionStatus.status !== 'success' && (
                <>
                    <p>
                        Für eine schnelle und strukturierte Bearbeitung von Anfragen bitten wir darum, ausschließlich das Kontaktformular auf unserer Webseite zu verwenden.
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
                        <select id="issue" value={selectedIssue} onChange={handleIssueSelectionChange}>
                            <option key="" value="" disabled>
                                Bitte Anliegen auswählen.
                            </option>
                            {issueSelectOptions.map((option) => (
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