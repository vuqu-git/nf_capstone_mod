export const formatFilmDetailsInFilmSelectOption = (titel: string | null | undefined, regie: string | null | undefined, jahr: number | null | undefined): string => {
    let details = "";
    let titleWithSpace = titel;

    const hasRegie = regie && regie.trim() !== "";
    const hasJahr = jahr !== null && jahr !== undefined && String(jahr).trim() !== "";

    if (hasRegie || hasJahr) {
        titleWithSpace += " "; // Add a space after the title
        details += "(";
        if (hasRegie) {
            details += regie.trim();
            if (hasJahr) {
                details += ", ";
            }
        }
        if (hasJahr) {
            details += String(jahr).trim();
        }
        details += ")";
    }

    return `${titleWithSpace}${details}`;
};