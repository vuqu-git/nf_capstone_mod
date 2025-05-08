import React, {ChangeEvent, FormEvent, useState} from 'react';

export interface MitKinotechnikFormData {
    betreff: string;
    ansprechperson: string;
    email: string;
    telefon: string;

    veranstaltungsbeginn: string; // Will hold ISO 8601 date and time
    veranstaltungsende: string;   // Will hold ISO 8601 date and time
    istGemietetBeiAsta: boolean;
    wurdeGelesenHinweisEventlocation: boolean;

    nachricht: string;

    projektionsinhalt: string;
    verleih: string;
    format: 'DCP' | 'Blu-ray' | 'DVD' | 'Datei auf PC' | '35mm' | '16mm' | 'noch unbekannt';
    anzMikrofone: number;

}

interface MitKinotechnikFormProps {
    onSubmit: (event: FormEvent, data: MitKinotechnikFormData) => void;
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    formData: MitKinotechnikFormData;
}

const MitKinotechnikForm: React.FC<MitKinotechnikFormProps> = ({ onSubmit, onInputChange, formData }) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const target = event.target;
        onInputChange(event); // Call the original onInputChange prop

        if (target.type === 'checkbox') {
            const checkboxTarget = target as HTMLInputElement; // Explicitly cast to HTMLInputElement
            const { name, checked } = checkboxTarget;
            const isAstaChecked = name === 'istGemietetBeiAsta' ? checked : formData.istGemietetBeiAsta;
            const isLocationHintChecked = name === 'wurdeGelesenHinweisEventlocation' ? checked : formData.wurdeGelesenHinweisEventlocation;

            if (isAstaChecked && isLocationHintChecked) {
                setErrorMessage(null); // Clear the error message
            }
        }
    };


    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (formData.istGemietetBeiAsta && formData.wurdeGelesenHinweisEventlocation) {
            onSubmit(event, formData);
            setErrorMessage(null); // Clear any previous error message
        } else {
            setErrorMessage('Bitte bestätige beide Punkte, um die Anfrage zu senden.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="betreff">Betreff*:</label>
                <input
                    type="text"
                    id="betreff"
                    name="betreff"
                    value={formData.betreff || ''}
                    onChange={onInputChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="ansprechperson">Ansprechperson*:</label>
                <input type="text" id="ansprechperson" name="ansprechperson" value={formData.ansprechperson || ''} onChange={onInputChange} required/>
            </div>
            <div>
                <label htmlFor="email">Email*:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email || ''}
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
                    value={formData.telefon || ''}
                    onChange={onInputChange}
                />
            </div>

            <div>
                <label htmlFor="nachricht">Eure Nachricht*</label>
                <textarea
                    id="nachricht"
                    name="nachricht"
                    value={formData.nachricht || ''}
                    onChange={onInputChange}
                    required
                    style={{ width: '100%', height: '336px' }}
                />
            </div>

            <div>
                <label htmlFor="projektionsinhalt">Projektionsinhalt* (bspw. Filmtitel):</label>
                <input type="text" id="projektionsinhalt" name="projektionsinhalt" value={formData.projektionsinhalt || ''} onChange={onInputChange} required/>
            </div>

            <div>
                <label htmlFor="verleih">Verleiher/Rechteinhaber (bei öffentlicher Filmvorführung):</label>
                <input
                    type="text"
                    id="verleih"
                    name="verleih"
                    value={formData.verleih || ''}
                    onChange={onInputChange}
                />
            </div>

            <div>
                <label htmlFor="format">Abspielformat*:</label>
                <select
                    id="format"
                    name="format"
                    value={formData.format || ''}
                    onChange={onInputChange}
                    required
                >
                    <option value="" disabled>Bitte auswählen</option>
                    <option value="DCP">DCP</option>
                    <option value="Blu-ray">Blu-ray</option>
                    <option value="DVD">DVD</option>
                    <option value="Filmdatei">Datei auf PC</option>
                    <option value="35mm">35mm</option>
                    <option value="16mm">16mm</option>
                    <option value="noch unbekannt">noch unbekannt</option>
                </select>
            </div>

            <div>
                <label htmlFor="anzMikrofone">Anzahl benötigter Mikrofone:</label>
                <input
                    type="number"
                    id="anzMikrofone"
                    name="anzMikrofone"
                    value={formData.anzMikrofone !== undefined ? formData.anzMikrofone : 0}
                    onChange={onInputChange}
                    min="0"
                    max="2"
                />
            </div>

            <div>
                <label htmlFor="veranstaltungsbeginn">Veranstaltungsbeginn (Datum & Uhrzeit)*:</label>
                <input
                    type="datetime-local"
                    id="veranstaltungsbeginn"
                    name="veranstaltungsbeginn"
                    value={formData.veranstaltungsbeginn || ''}
                    onChange={onInputChange}
                    required
                />
            </div>

            <div>
                <label htmlFor="veranstaltungsende">Veranstaltungsende (Datum & Uhrzeit)*:</label>
                <input
                    type="datetime-local"
                    id="veranstaltungsende"
                    name="veranstaltungsende"
                    value={formData.veranstaltungsende || ''}
                    onChange={onInputChange}
                    required
                />
            </div>

            <div>
                <input
                    type="checkbox"
                    id="istGemietetBeiAsta"
                    name="istGemietetBeiAsta"
                    checked={formData.istGemietetBeiAsta || false}
                    onChange={handleInputChange}
                />
                <label
                    htmlFor="istGemietetBeiAsta"
                    style={{ color: errorMessage && !formData.istGemietetBeiAsta ? 'red' : 'inherit' }}
                >
                    Ich bestätige, dass für den oben genannten Zeitraum der Festsaal beim AStA bereits reserviert bzw. gemietet wurde.
                </label>
            </div>

            <div>
                <input
                    type="checkbox"
                    id="wurdeGelesenHinweisEventlocation"
                    name="wurdeGelesenHinweisEventlocation"
                    checked={formData.wurdeGelesenHinweisEventlocation || false}
                    onChange={handleInputChange}
                />
                <label
                    htmlFor="wurdeGelesenHinweisEventlocation"
                    style={{ color: errorMessage && !formData.wurdeGelesenHinweisEventlocation ? 'red' : 'inherit' }}
                >
                    Hiermit bestätige ich, dass bei Werbemaßnahmen der "Festsaal im Studierendenhaus" als Veranstaltungsort genannt wird und <b>nicht</b> Pupille-Kino, da die Pupille nicht der Veranstalter ist.
                </label>
            </div>

            <button type="submit">Anfrage senden</button>
            <p><sub>*Pflichtfelder</sub></p>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </form>
    );
};

export default MitKinotechnikForm;