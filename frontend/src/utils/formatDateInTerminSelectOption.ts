export function formatDateInTerminSelectOption(dateString: string | null | undefined): string {
    if (!dateString) {
        return "Invalid date"; // Handle undefined or null dates gracefully
    }

    const date = new Date(dateString);

    // Extract components of the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Format as YYYY-MM-DD HH:mm
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}