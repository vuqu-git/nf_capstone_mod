/**
 * Formats an ISO date string to "DD.MM.YYYY" using locale-based formatting.
 * Handles undefined input by returning an empty string.
 * @param isoDate - A valid ISO 8601 date string (e.g., "2025-03-28T22:00:00") or undefined
 * @returns A formatted date string in "DD.MM.YYYY" format, or an empty string if input is undefined.
 */
export function formatDateInOverviewArchive(isoDate: string | undefined): string {
    if (isoDate === undefined) {
        return "";
    }

    const date = new Date(isoDate);

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }

    return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
}