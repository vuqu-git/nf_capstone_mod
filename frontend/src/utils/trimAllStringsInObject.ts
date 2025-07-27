export function trimAllStringsInObject<T extends object>(obj: T): T {
    // Helper to recursively trim strings in nested objects
    function trimValue(value: any): any {
        if (typeof value === 'string') {
            return value.trim();
        } else if (value && typeof value === 'object' && !Array.isArray(value)) {
            // Recursively trim nested objects
            return Object.fromEntries(
                Object.entries(value).map(([k, v]) => [k, trimValue(v)])
            );
        }
        // Leave other types unchanged (numbers, booleans, arrays, functions)
        return value;
    }
    return trimValue(obj);
}