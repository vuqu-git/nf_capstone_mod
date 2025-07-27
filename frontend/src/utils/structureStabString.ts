// this utils method create a list of objects
export function structureStabString(inputString: string): { abbrev: string; entry: string }[] {
    const lines = inputString.split(/\r?\n/); // Split by newline characters (\r\n or \n)
    return lines.filter(line => line.trim() !== '') // Filter out empty lines
                .map(line => {
                const parts = line.split(': ');

                const abbrev = parts[0];
                const entry = parts.slice(1).join(': ');   // handling here in case when 1 line contains multiple colons
                                                                                // "FOO: Something: else: again"
                                                                                // splitting with .split(': ') gives: ['FOO', 'Something', 'else', 'again']
                                                                                // parts[0] is 'FOO'
                                                                                // parts.slice(1) is ['Something', 'else', 'again']
                                                                                // parts.slice(1).join(': ') results in 'Something: else: again'
                                                                                // => ensures spiting by only the first colon, resulting in 2 parts of interest

                return { abbrev, entry };   // concise syntax is called object property shorthand
                                            // equivalent to { abbrev: abbrev, entry: entry }
            });
}