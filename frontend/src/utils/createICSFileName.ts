export function createICSFileName(
    title: string,
    startTime?: string,
): string {

    const newTitle = title.toLowerCase()
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove diacritics (Umlaute, accents, etc.)
                                    .replace(/\s+/g, "-") // Replace whitespace with hyphens
                                    .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric characters except hyphens

    let fileName = newTitle; // Start with the title

    if (startTime) {
        const newStartTime = startTime ? startTime.slice(0, 10).replace(/-/g, '') : ""; // Take only YYYY-MM-DD and remove "-"
        fileName += `-${newStartTime}`; // Add hyphen and startTime only if startTime exists
    }

    return fileName;
}