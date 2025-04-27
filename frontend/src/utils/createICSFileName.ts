export function createICSFileName(
    title: string,
    startTime: string,
): string {

    const newTitle = title.toLowerCase()
                                    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove diacritics (Umlaute, accents, etc.)
                                    .replace(/\s+/g, "-") // Replace whitespace with hyphens
                                    .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric characters except hyphens

    const newStartTime = startTime.slice(0, 10).replace(/-/g, ''); // Take only YYYY-MM-DD and remove "-"

    return `${newTitle}-${newStartTime}`;
}