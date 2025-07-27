import { useEffect, useState } from "react";

// for the forms NewsForm
export function useDateStartBeforeEndValidation(
    start: string | undefined,
    end: string | undefined,
    endBeforeStartErrorMessage: string = "Das Enddatum muss nach dem Startdatum liegen oder taggleich sein!",
) {
    const [validationError, setValidationError] = useState<string>("");

    useEffect(() => {
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            if (startDate > endDate) {
                setValidationError(endBeforeStartErrorMessage);
            } else {
                setValidationError("");
            }
        } else {
            setValidationError("");
        }
    }, [start, end, endBeforeStartErrorMessage]);

    return validationError;
}