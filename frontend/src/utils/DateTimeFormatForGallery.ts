// export function formatDateTime(isoString: string | undefined, withLeadingZeros: boolean = false): { date: string; time: string; weekday: string } | null {
//     // Check if isoString is undefined or invalid
//     if (!isoString) {
//         console.warn("Invalid input: isoString is undefined.");
//         return null; // or return undefined
//     }
//
//     const date = new Date(isoString);
//
//     // Check if the date is valid
//     if (isNaN(date.getTime())) {
//         console.warn("Invalid input: isoString does not represent a valid date.");
//         return null; // or return undefined
//     }
//     // chose to return null for the following reasons:
//     //     Explicit Absence of a Value: null is often used to explicitly represent the intentional absence of a value. In this context, if the input dateTime is missing or invalid, the function cannot produce a meaningful formatted date and time. Returning null clearly signals this lack of a valid result.
//     //     Common Practice in Data Handling: In many data handling scenarios, especially when dealing with databases or APIs, null is a common way to represent missing or non-existent data. Returning null from the formatting function can align with this convention.
//     //     Slightly More Common in Older JavaScript: While both are used, null has historically been slightly more prevalent for representing the intentional absence of a value in JavaScript.
//
//     // Returning undefined would also be a valid choice in this scenario. Here's why someone might choose undefined:
//     //     Implicit Absence of a Value: undefined often indicates that a variable has been declared but has not been assigned a value, or that a function does not explicitly return anything. In the context of a function, returning undefined can imply that the function couldn't produce a meaningful result.
//     //     TypeScript's Inference: If a function doesn't have an explicit return statement or returns without a value, TypeScript infers its return type as void or sometimes undefined. Returning undefined explicitly can align with this implicit behavior.
//     //     Optional Parameters: As seen in your function definition (isoString?: string), undefined is the value assigned to optional parameters that are not provided. Returning undefined can be consistent with this concept of a missing optional value.
//
//     // Consistency is Key:
//     //     The most important thing is to be consistent within your codebase. If your project generally uses null to represent the intentional absence of data, then returning null here makes sense. If you tend to use undefined for similar situations, then returning undefined would be more consistent.
//
//     // =>  Given that dateTime can be NULL in your MySQL database, and this translates to null in your JavaScript/TypeScript code, returning null from your formatDateTime function aligns more directly with the data source.
//     //     Here's why choosing null makes more sense in this specific context:
//     //          Direct Representation of the Database Value: When your database explicitly stores a NULL value for screeningTime, returning null from formatDateTime maintains a more direct correspondence with the underlying data. It clearly indicates that the absence of a formatted date/time is due to the absence of data in the database.
//     //          Consistency in Data Handling: If your application and backend systems treat null as the standard representation for missing or non-existent data, then consistently using null throughout the data flow (from the database to your UI) can improve clarity and reduce potential confusion.
//     //          Explicit Intent: Returning null explicitly signals that the function was called with a missing value and, as a result, could not produce a valid formatted date and time.
//
//     const germanWeekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
//     const weekday = germanWeekdays[date.getDay()];
//     const day = withLeadingZeros ? String(date.getDate()).padStart(2, '0') : String(date.getDate());
//     const month = withLeadingZeros ? String(date.getMonth() + 1).padStart(2, '0') : String(date.getMonth() + 1);
//     const formattedDate = `${day}.${month}.${date.getFullYear()}`;
//     const formattedTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} Uhr`;
//
//     return { date: formattedDate, time: formattedTime, weekday };
// }

export function formatDateTime(
    isoString: string | undefined,
    withLeadingZeros: boolean = false,
    withShortYear: boolean = false
): { date: string; time: string; weekday: string } | null {
    // Check if isoString is undefined or invalid
    if (!isoString) {
        console.warn("Invalid input: isoString is undefined.");
        return null;
    }

    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
        console.warn("Invalid input: isoString does not represent a valid date.");
        return null;
    }

    const germanWeekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const weekday = germanWeekdays[date.getDay()];
    const day = withLeadingZeros ? String(date.getDate()).padStart(2, '0') : String(date.getDate());
    const month = withLeadingZeros ? String(date.getMonth() + 1).padStart(2, '0') : String(date.getMonth() + 1);
    const year = withShortYear
        ? String(date.getFullYear()).slice(-2)
        : String(date.getFullYear());

    const formattedDate = `${day}.${month}.${year}`;
    const formattedTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')} Uhr`;

    return { date: formattedDate, time: formattedTime, weekday };
}
