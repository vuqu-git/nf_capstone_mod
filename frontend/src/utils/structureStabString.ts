// export function structureStabString(inputString: string): { abbrev: string; entry: string }[] {
//     const stringList = splitString(inputString);
//     return transformStringList(stringList);
// }
//
// function splitString(inputString: string): string[] {
//     const parts = inputString.split(/ (?=[A-ZÄÖÜ]:)/);
//     return parts;
// }
//
// function transformStringList(stringList: string[]): { abbrev: string; entry: string }[] {
//     return stringList.map(item => {
//         const parts = item.split(': ');
//         const abbrev = parts[0];
//         const entry = parts.slice(1).join(': ');
//         return { abbrev, entry };
//     });
// }


export function structureStabString(inputString: string): { abbrev: string; entry: string }[] {
    const lines = inputString.split(/\r?\n/); // Split by newline characters (\r\n or \n)
    return lines.map(line => {
        const parts = line.split(': ');
        const abbrev = parts[0];
        const entry = parts.slice(1).join(': ');
        return { abbrev, entry };
    });
}