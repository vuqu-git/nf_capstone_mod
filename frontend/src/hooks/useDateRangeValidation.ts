import { useEffect, useState } from "react";

// for the forms EigenstaendigForm and MitKinotechnikForm
export function useDateRangeValidation(
    start: string | undefined,
    end: string | undefined,
    errorMessage: string = "Das Veranstaltungsende muss nach dem Veranstaltungsbeginn liegen!"
) {
    const [validationError, setValidationError] = useState<string>("");

    useEffect(() => {
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            if (startDate >= endDate) {
                setValidationError(errorMessage);
            } else {
                setValidationError("");
            }
        } else {
            setValidationError("");
        }
    }, [start, end, errorMessage]);

    return validationError;
}
