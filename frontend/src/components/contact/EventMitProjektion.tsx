import React, { useState, ChangeEvent, FormEvent } from 'react';
import EigenstaendigForm, { EigenstaendigFormData } from './EigenstaendigForm';
import MitKinotechnikForm, { MitKinotechnikFormData } from './MitKinotechnikForm';
import KooperationForm, { KooperationFormData } from './KooperationForm';
import { Badge } from 'react-bootstrap';

interface EventMitProjektionProps {
    onSubmit: (event: FormEvent, issue: string, data: EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData) => void; // Added 'issue' parameter
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; message?: string | null };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData;
}

interface SubSelectionConfig {
    value: string;
    label: string;
}

const subSelectionOptions: SubSelectionConfig[] = [
    { value: 'eigenstaendig', label: 'ganz eigenständig' },
    { value: 'mitkinotechnik', label: 'mit professioneller Kinotechnik' },
    { value: 'kooperation', label: 'gemeinsam in Kooperation mit Pupille' },
];

interface FormData {
    subSelection: string;
    eigenstaendig?: EigenstaendigFormData;
    mitKinotechnik?: MitKinotechnikFormData;
    kooperation?: KooperationFormData;
}

const EventMitProjektion: React.FC<EventMitProjektionProps> = ({ onSubmit, submissionStatus, onInputChange, formData }) => {
    const [selectedSubSelection, setSelectedSubSelection] = useState<string>('');
    const [subFormData, setSubFormData] = useState<EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData>({});

    const handleSubSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedSubSelection(event.target.value);
        setSubFormData({}); // Reset sub-form data
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

    const handleSubFormSubmit = (event: FormEvent, data: EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData) => {
        onSubmit(event, selectedSubSelection, data); // Pass selectedSubSelection as the issue
    };

    const renderSubForm = () => {
        switch (selectedSubSelection) {
            case 'eigenstaendig':
                return (
                    <EigenstaendigForm
                        onSubmit={handleSubFormSubmit}
                        onInputChange={(handleSubFormChange as (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void)}
                        formData={subFormData as EigenstaendigFormData}
                    />
                );
            case 'mitkinotechnik':
                return (
                    <MitKinotechnikForm
                        onSubmit={handleSubFormSubmit}
                        onInputChange={(handleSubFormChange as (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void)}
                        formData={subFormData as MitKinotechnikFormData}
                    />
                );
            case 'kooperation':
                return (
                    <KooperationForm
                        onSubmit={handleSubFormSubmit}
                        onInputChange={(handleSubFormChange as (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void)}
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
                <select id="subSelection" value={selectedSubSelection} onChange={handleSubSelectionChange}>
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