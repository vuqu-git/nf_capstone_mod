import React, {ChangeEvent} from "react";

import styles from "../contact/Forms.module.css";

import {AOBFormData} from "../contact/AOBForm.tsx";
import {KinomitarbeitFormData} from "../contact/KinomitarbeitForm.tsx";
import {EigenstaendigFormData} from "../contact/EigenstaendigForm.tsx";
import {MitKinotechnikFormData} from "../contact/MitKinotechnikForm.tsx";
import {KooperationFormData} from "../contact/KooperationForm.tsx";

interface Props {
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    formData: AOBFormData | KinomitarbeitFormData | EigenstaendigFormData | MitKinotechnikFormData | KooperationFormData;
    messageType: string | undefined
}

const DatenschutzCheck: React.FC<Props> = ({ onInputChange, formData, messageType="der Anfrage" }) => {

    return (
        <div className={styles.formFieldCheckbox}>
            <input
                type="checkbox"
                id="istEinverstandenMitDatennutzung"
                name="istEinverstandenMitDatennutzung"
                checked={formData.istEinverstandenMitDatennutzung}
                onChange={onInputChange}
                required
            />
            <label htmlFor="istEinverstandenMitDatennutzung">
                Ich habe die{" "}
                {/*<a className="custom-link" href="/impressum" target="_blank" rel="noopener noreferrer">*/}
                <a className="custom-link" href="/impressum#datenschutzerklaerung" target="_blank" rel="noopener noreferrer">
                    Datenschutzerklärung
                </a>{" "}
                gelesen und bin mit der Nutzung meiner Daten zur Bearbeitung {messageType} einverstanden.
            </label>
        </div>
    );
}

export default DatenschutzCheck;