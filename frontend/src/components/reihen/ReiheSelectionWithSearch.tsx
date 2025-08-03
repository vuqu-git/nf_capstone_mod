import { Form } from "react-bootstrap";
import React, {useEffect, useMemo, useState} from "react";
import ReiheDTOSelection from "../../types/ReiheDTOSelection.ts";
import Select, {ActionMeta, SingleValue} from "react-select";
import {formSelectionWithSearchStyles} from "../styles/formSelectionWithSearchStyles.ts";

interface ReiheSelectionWithSearchProps {
    allReihen: ReiheDTOSelection[];
    selectedReiheId: number | undefined;
    onSelectReihe: (id: number | undefined) => void;
    textForDefaultOption: string | undefined;
}

interface ReiheOption {
    value: number;  // value of select option
    label: React.ReactNode; // label of select option; if using JSX (i.e. HTML tags used), otherwise string
}

export default function ReiheSelectionWithSearch({
                                           allReihen,
                                           selectedReiheId,
                                           onSelectReihe,
                                           textForDefaultOption  = "Select a Reihe to edit (or leave unselected to add a new Reihe)",
                                       }: Readonly<ReiheSelectionWithSearchProps>) {

    const [isClearable] = useState(true);
    const [isSearchable] = useState(true);

    const [selectedOption, setSelectedOption] = useState<ReiheOption | null>(null); // contains the currently selected option

    const reiheOptions = useMemo(() =>
        allReihen.map(r => ({
            value: r.rnr,
            label: `${r.titel} | #${r.rnr}`
        })), [allReihen]
    );

    const handleReactSelectChange = (
        newValue: SingleValue<ReiheOption>,
        actionMeta: ActionMeta<ReiheOption>
    ) => {
        setSelectedOption(newValue);
        onSelectReihe(newValue?.value);
    };

    // this effect ensures that when the parent component changes selectedReiheId, your React Select component updates accordingly,
    // value={selectedOption} is the React Select equivalent of value={selectedReiheId ?? ""}, but you need the additional useEffect to keep them synchronized.
    useEffect(() => {
        if (selectedReiheId) {
            const option = reiheOptions.find(opt => opt.value === selectedReiheId);
            setSelectedOption(option || null);
        } else {
            setSelectedOption(null);
        }
    }, [selectedReiheId]);

    return (
        <div>
            <Form.Label htmlFor="reihe-selection">Reihe selection/search</Form.Label>

            <Select
                options={reiheOptions}

                value={selectedOption}  // equivalent of value={selectedReiheId ?? ""} in HTML select
                // here value expects the entire option object, while in an HTML select value expects a primitive value (string, number)
                onChange={handleReactSelectChange}

                isClearable={isClearable}
                isSearchable={isSearchable}
                placeholder={textForDefaultOption}
                noOptionsMessage={() => "Keine Reihen gefunden"}

                styles={formSelectionWithSearchStyles}
                maxMenuHeight={500}
                inputId="reihe-selection" // React Select's built-in inputId prop; connects to the actual input element
            />
        </div>
    );
};