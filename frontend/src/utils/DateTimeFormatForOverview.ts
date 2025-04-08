export function formatDateTime(isoString?: string): { date: string; time: string; weekday: string } | undefined {
    // Check if isoString is undefined or invalid
    if (!isoString) {
        console.warn("Invalid input: isoString is undefined.");
        return undefined; // Return undefined or handle it as needed
    }

    const date = new Date(isoString);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        console.warn("Invalid input: isoString does not represent a valid date.");
        return undefined; // Return undefined or handle it as needed
    }

    const germanWeekdays = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    const weekday = germanWeekdays[date.getDay()];
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${date.getFullYear()}`;
    const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} Uhr`;

    return { date: formattedDate, time: formattedTime, weekday };
}