import { useEffect, useState } from "react";

// for the forms EigenstaendigForm and MitKinotechnikForm
export function useDateRangeValidation(
    start: string | undefined,
    end: string | undefined,
    endBeforeStartErrorMessage: string = "Das Veranstaltungsende muss nach dem Veranstaltungsbeginn liegen!",
    startInFutureErrorMessage: string = "Der Veranstaltungsbeginn muss in der Zukunft liegen!"
) {
    const [validationError, setValidationError] = useState<string>("");

    useEffect(() => {
        if (start) {
            const startDate = new Date(start);
            const now = new Date();

            if (startDate <= now) {
                setValidationError(startInFutureErrorMessage);
                return; // Exit early if start date is not in the future
            }
        }

        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            if (startDate >= endDate) {
                setValidationError(endBeforeStartErrorMessage);
            } else {
                setValidationError("");
            }
        } else {
            setValidationError("");
        }
    }, [start, end, endBeforeStartErrorMessage, startInFutureErrorMessage]);

    return validationError;
}



// import { useEffect, useState } from "react";
//
// // for the forms EigenstaendigForm and MitKinotechnikForm
// export function useDateRangeValidation(
//     start: string | undefined,
//     end: string | undefined,
//     endBeforeStartErrorMessage: string = "Das Veranstaltungsende muss nach dem Veranstaltungsbeginn liegen!",
//     startInFutureErrorMessage: string = "Der Veranstaltungsbeginn muss in der Zukunft liegen!"
// ) {
//     const [validationError, setValidationError] = useState<string>("");
//
//     useEffect(() => {
//         let error = "";
//
//         if (start) {
//             const startDate = new Date(start);
//             const now = new Date();
//
//             if (startDate <= now) {
//                 error += startInFutureErrorMessage;
//             }
//         }
//
//         if (start && end) {
//             const startDate = new Date(start);
//             const endDate = new Date(end);
//             if (startDate >= endDate) {
//                 if (error) {
//                     error += "<br>"; // Add line break if there's already an error
//                 }
//                 error += endBeforeStartErrorMessage;
//             }
//         }
//
//         setValidationError(error);
//     }, [start, end, endBeforeStartErrorMessage, startInFutureErrorMessage]);
//
//     return validationError;
// }
