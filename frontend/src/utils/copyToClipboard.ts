export function copyToClipboard(text?: string) {
    // Check if the input text is undefined or null
    if (typeof text === 'undefined' || text === null) {
        console.warn('No text provided to copy to clipboard.');
        return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Text copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    } else {
        console.error('Clipboard API not supported.');
    }
}
