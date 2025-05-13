// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import EigenstaendigForm, { EigenstaendigFormData } from './EigenstaendigForm';
// import MitKinotechnikForm, { MitKinotechnikFormData } from './MitKinotechnikForm';
// import KooperationForm, { KooperationFormData } from './KooperationForm';
// import { Badge } from 'react-bootstrap';
//
// interface EventMitProjektionProps {
//     onSubmit: (event: FormEvent, issue: string, data: EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData) => void; // Added 'issue' parameter
//     submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; message?: string | null };
// }
//
// interface SubSelectionConfig {
//     value: string;
//     label: string;
// }
//
// const subSelectionOptions: SubSelectionConfig[] = [
//     { value: 'eigenstaendig', label: '➀ ganz eigenständig' },
//     { value: 'mitkinotechnik', label: '➁ mit professioneller Kinotechnik' },
//     { value: 'kooperation', label: '➂ gemeinsam in Kooperation mit Pupille' },
// ];
//
// const EventMitProjektion: React.FC<EventMitProjektionProps> = ({ onSubmit, submissionStatus }) => {
//     const [selectedSubSelection, setSelectedSubSelection] = useState<string>('');
//     const [subFormData, setSubFormData] = useState<EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData>({});
//
//     const handleSubSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
//         setSelectedSubSelection(event.target.value);
//         setSubFormData({}); // Reset sub-form data
//     };
//
//     const handleSubFormChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//         const { name, value, type } = event.target;
//         if (type === 'checkbox') {
//             setSubFormData((prevData) => ({
//                 ...prevData,
//                 [name]: (event.target as HTMLInputElement).checked,
//             }));
//         } else {
//             setSubFormData((prevData) => ({
//                 ...prevData,
//                 [name]: value,
//             }));
//         }
//     };
//
//     const onSubFormSubmit = (event: FormEvent, data: EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData) => {
//         // Call the parent's onSubmit which is called handleGlobalSubmit there and pass selectedSubSelection as the issue
//         // i.e. selectedSubSelection is set and passed on here and not in the subform
//         onSubmit(event, selectedSubSelection, data);
//     };
//
//     const renderSubForm = () => {
//         switch (selectedSubSelection) {
//             case 'eigenstaendig':
//                 return (
//                     <EigenstaendigForm
//                         onSubFormSubmit={onSubFormSubmit}
//                         submissionStatus={submissionStatus}
//                         onInputChange={(handleSubFormChange as (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void)}
//                         formData={subFormData as EigenstaendigFormData}
//                     />
//                 );
//             case 'mitkinotechnik':
//                 return (
//                     <MitKinotechnikForm
//                         onSubFormSubmit={onSubFormSubmit}
//                         submissionStatus={submissionStatus}
//                         onInputChange={(handleSubFormChange as (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void)}
//                         formData={subFormData as MitKinotechnikFormData}
//                     />
//                 );
//             case 'kooperation':
//                 return (
//                     <KooperationForm
//                         onSubFormSubmit={onSubFormSubmit}
//                         submissionStatus={submissionStatus}
//                         onInputChange={(handleSubFormChange as (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void)}
//                         formData={subFormData as KooperationFormData}
//                     />
//                 );
//             default:
//                 return null;
//         }
//     };
//
//     return (
//         <div>
//             <div>
//                 <Badge bg="success">Bitte lesen</Badge>
//                 <p>
//                     Informationen zu den verschiedenen Durchführungsarten von Veranstaltungen mit Projektion findet Ihr unter{' '}
//                     <a href="/kinoprojektion" target="_blank" rel="noopener noreferrer">
//                         Infos & Service: Filme etc. zeigen
//                     </a>
//                     .
//                 </p>
//                 <select id="subSelection" value={selectedSubSelection} onChange={handleSubSelectionChange}>
//                     <option key="" value="" disabled>
//                         Bitte Durchführungsart der Veranstaltung auswählen.
//                     </option>
//                     {subSelectionOptions.map((option) => (
//                         <option key={option.value} value={option.value}>
//                             {option.label}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             {renderSubForm()}
//         </div>
//     );
// };
//
// export default EventMitProjektion;

import React, { useState, ChangeEvent, FormEvent } from 'react';
import EigenstaendigForm, { EigenstaendigFormData } from './EigenstaendigForm';
import MitKinotechnikForm, { MitKinotechnikFormData } from './MitKinotechnikForm';
import KooperationForm, { KooperationFormData } from './KooperationForm';
import { Badge } from 'react-bootstrap';

interface EventMitProjektionProps {
    onSubmit: (
        event: FormEvent,
        issue: string,
        data: EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData
    ) => void;
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; message?: string | null };
}

interface SubSelectionConfig {
    value: string;
    label: string;
}

const subSelectionOptions: SubSelectionConfig[] = [
    { value: 'eigenstaendig', label: '➀ ganz eigenständig' },
    { value: 'mitkinotechnik', label: '➁ mit professioneller Kinotechnik' },
    { value: 'kooperation', label: '➂ gemeinsam in Kooperation mit Pupille' },
];

const EventMitProjektion: React.FC<EventMitProjektionProps> = ({ onSubmit, submissionStatus }) => {
    const [selectedIssuesSubSelection, setSelectedIssuesSubSelection] = useState<string>('');
    const [subFormData, setSubFormData] = useState<EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData>({});

    const handleIssueSubSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedIssuesSubSelection(event.target.value);
        setSubFormData({});
    };

    const handleSubFormChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        if (type === 'checkbox') {
            setSubFormData((prevData) => ({
                ...prevData,
                [name]: (event.target as HTMLInputElement).checked,
            }));
        } else {
            setSubFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const onSubFormSubmit = (
        event: FormEvent,
        formData: EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData
    ) => {
        // 2nd parameter selectedIssuesSubSelection targets the subselection (or the subform) with the possible values eigenstaendig, mitkinotechnik or kooperation
        onSubmit(event, selectedIssuesSubSelection, formData);
    };

    const renderSubForm = () => {
        if (!selectedIssuesSubSelection) return null; // not sure if really required !?!?!?!??!

        switch (selectedIssuesSubSelection) {
            case 'eigenstaendig':
                return (
                    <EigenstaendigForm
                        onSubFormSubmit={onSubFormSubmit}
                        submissionStatus={submissionStatus}
                        onInputChange={handleSubFormChange as (
                            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                        ) => void}
                        formData={subFormData as EigenstaendigFormData}
                    />
                );
            case 'mitkinotechnik':
                return (
                    <MitKinotechnikForm
                        onSubFormSubmit={onSubFormSubmit}
                        submissionStatus={submissionStatus}
                        onInputChange={handleSubFormChange as (
                            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
                        ) => void}
                        formData={subFormData as MitKinotechnikFormData}
                    />
                );
            case 'kooperation':
                return (
                    <KooperationForm
                        onSubFormSubmit={onSubFormSubmit}
                        submissionStatus={submissionStatus}
                        onInputChange={handleSubFormChange as (
                            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
                        ) => void}
                        formData={subFormData as KooperationFormData}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div>
                <Badge bg="success">Bitte lesen</Badge>
                <p>
                    Informationen zu den verschiedenen Durchführungsarten von Veranstaltungen mit Projektion findet Ihr unter{' '}
                    <a href="/kinoprojektion" target="_blank" rel="noopener noreferrer">
                        Infos & Service: Filme etc. zeigen
                    </a>
                    .
                </p>
                <select id="subSelection" value={selectedIssuesSubSelection} onChange={handleIssueSubSelectionChange}>
                    <option key="" value="" disabled>
                        Bitte Durchführungsart der Veranstaltung auswählen.
                    </option>
                    {subSelectionOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            {renderSubForm()}
        </div>
    );
};

export default EventMitProjektion;
