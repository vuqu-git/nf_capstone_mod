export function convertToHtmlEntities(str: string): string {

    // if (!str) return "";

    const map: { [key: string]: string } = {
        'ü': '&uuml;',
        'ä': '&auml;',
        'ö': '&ouml;',
        'ß': '&szlig;',
        '€': '&euro;',
        '&': '&amp;',
        '–': '&mdash;', // en dash
        '—': '&ndash;', // em dash
        // Add more character to entity mappings as needed
    };

    // Create a regular expression dynamically based on the map keys
    const regex = new RegExp(Object.keys(map).join('|'), 'g');

    // Replace all characters with their HTML entity equivalents
    return str.replace(regex, (match: string) => map[match] || match);
}