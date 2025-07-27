// shallow trimming (no nested objects): just map top-level entries (no recursion)
export function trimAllStringsInObjectShallow<T extends object>(obj: T): T {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
            key,
            typeof value === 'string' ? value.trim() : value,
        ])
    ) as T;
}