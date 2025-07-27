import { useEffect, useState } from "react";

// for the forms EigenstaendigForm and MitKinotechnikForm
export function useDateRangeValidation(
    start: string | undefined,
    end: string | undefined,
    endBeforeStartErrorMessage: string = "Das Veranstaltungsende muss nach dem Veranstaltungsbeginn liegen!",
    startInFutureErrorMessage: string = "Der Veranstaltungsbeginn muss in der Zukunft liegen!"
) {
    const [validationErrorMessage, setValidationErrorMessage] = useState<string>("");

    useEffect(() => {
        if (start) {
            const startDate = new Date(start);
            const now = new Date();

            if (startDate <= now) {
                setValidationErrorMessage(startInFutureErrorMessage);
                return; // Exit early if start date is not in the future
            }
        }

        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            if (startDate >= endDate) {
                setValidationErrorMessage(endBeforeStartErrorMessage);
            } else {
                setValidationErrorMessage("");
            }
        } else {
            setValidationErrorMessage("");
        }
    }, [start, end, endBeforeStartErrorMessage, startInFutureErrorMessage]);

    return validationErrorMessage;
}
