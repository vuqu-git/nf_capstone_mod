import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {Badge} from "react-bootstrap";

export interface KooperationFormData {
    betreff: string;
    ansprechperson: string;
    email: string;
    telefon: string;

    filmtitel: string;
    verleih: string;
    format: 'DCP' | 'Blu-ray' | 'DVD' | 'Datei auf PC' | '35mm' | '16mm' | 'noch unbekannt';

    terminpraeferenz: string;
    nachricht: string;
    zusammenarbeit: string;

}

interface KooperationFormProps {
    onSubFormSubmit: (event: FormEvent, data: KooperationFormData | null) => void;
    submissionStatus: { status: 'idle' | 'sending' | 'success' | 'error'; nachricht?: string | null };
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    formData: KooperationFormData | null;
}

const KooperationForm: React.FC<KooperationFormProps> = ({ onSubFormSubmit, submissionStatus, onInputChange, formData }) => {

    const [terminPraeferenzLabel, setTerminPraeferenzLabel] = useState('');
    const [momentaneAnfrageFuerSemester, setMomentaneAnfrageFuerSemester] = useState('');

    useEffect(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-indexed (0 for January, 6 for July)

        if (month >= 3 && month <= 6) { // April (3) to July (6)
            setTerminPraeferenzLabel(`Eure Terminpräferenzen für das Wintersemester ${year.toString().slice(-2)}/${(year + 1).toString().slice(-2)}*:`);
            setMomentaneAnfrageFuerSemester(`D.h. momentan sind nur Anfragen für das Wintersemester ${year.toString().slice(-2)}/${(year + 1).toString().slice(-2)} möglich.`)
        } else { // August (7) to March (2) of the following year
            setTerminPraeferenzLabel(`Eure Terminpräferenzen für das Sommersemester ${year + 1}*:`);
            setMomentaneAnfrageFuerSemester(`D.h. momentan sind nur Anfragen für das Sommersemester ${year + 1} möglich.`);
        }
    }, []);

    const handleLocalSubmit = (event: FormEvent) => {
        event.preventDefault();
        onSubFormSubmit(event, formData);
    };


    return (
        <form onSubmit={handleLocalSubmit}>
            <Badge bg="warning" text="dark">Hinweis:</Badge>
            <p>
                Der Einsendeschluss für Kooperationsanfragen ist der 31. Januar (für das Sommersemester) sowie der 31. Juli (für das Wintersemester). {momentaneAnfrageFuerSemester}
            </p>
            <div>
                <label htmlFor="betreff">Betreff*:</label>
                <input
                    type="text"
                    id="betreff"
                    name="betreff"
                    value={formData?.betreff || ''}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="ansprechperson">Ansprechperson*:</label>
                <input type="text" id="ansprechperson" name="ansprechperson" value={formData?.ansprechperson || ''} onChange={onInputChange} required/>
            </div>
            <div>
                <label htmlFor="email">Email*:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData?.email || ''}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="telefon">Telefonnummer:</label>
                <input
                    type="tel"
                    id="telefon"
                    name="telefon"
                    value={formData?.telefon || ''}
                    onChange={onInputChange}
                />
            </div>

            <div>
                <label htmlFor="filmtitel">Filmtitel*:</label>
                <input
                    type="text"
                    id="filmtitel"
                    name="filmtitel"
                    value={formData?.filmtitel || ''}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="verleih">Verleiher/Rechteinhaber des vorgeschlagenen Films*:</label>
                <input
                    type="text"
                    id="verleih"
                    name="verleih"
                    value={formData?.verleih || ''}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="format">Abspielformat*:</label>
                <select
                    id="format"
                    name="format"
                    value={formData?.format || ''}
                    onChange={onInputChange}
                    required
                >
                    <option value="" disabled>Bitte auswählen</option>
                    <option value="DCP">DCP</option>
                    <option value="Blu-ray">Blu-ray</option>
                    <option value="DVD">DVD</option>
                    <option value="Datei auf PC">Filmdatei</option>
                    <option value="35mm">35mm</option>
                    <option value="16mm">16mm</option>
                    <option value="noch unbekannt">noch unbekannt</option>
                </select>
            </div>

            <div>
                <label htmlFor="nachricht">Eure Nachricht*:</label>
                <textarea
                    id="nachricht"
                    name="nachricht"
                    value={formData?.nachricht || ''}
                    onChange={onInputChange}
                    required
                    style={{ height: '300px' }}
                />
            </div>

            <div>
                <label htmlFor="terminpraeferenz">{terminPraeferenzLabel}</label>
                <textarea
                    id="terminpraeferenz"
                    name="terminpraeferenz"
                    value={formData?.terminpraeferenz || ''}
                    placeholder="Spieltage sind Montag und Mittwoch in der Vorlesungszeit des Uni-Semesters"
                    onChange={onInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="zusammenarbeit">Eure Vorstellungen zur Arbeitsteilung und Kostenbeteiligung (u.a. Ticketeinnahmen, Filmbestellung, Vorführlizenz)*:</label>
                <textarea
                    id="zusammenarbeit"
                    name="zusammenarbeit"
                    value={formData?.zusammenarbeit || ''}
                    onChange={onInputChange}
                    required
                    style={{ height: '150px' }}
                />
            </div>

            <button type="submit" disabled={submissionStatus.status === 'sending'}>Anfrage senden</button>
            <p><sub>*Pflichtfelder</sub></p>

            {submissionStatus.status === 'sending' &&
                <p className="text-warning">&#x2709; Sende Nachricht...</p>
            }
        </form>
    );
};

export default KooperationForm;