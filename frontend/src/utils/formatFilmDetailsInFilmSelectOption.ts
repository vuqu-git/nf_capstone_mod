export const formatFilmDetailsInFilmSelectOption = (titel: string | null | undefined, stab: string | null | undefined, jahr: number | null | undefined): string => {
    let details = "";
    let titleWithSpace = titel;

    const hasStab = stab && stab.trim() !== "";
    const hasJahr = jahr !== null && jahr !== undefined && String(jahr).trim() !== "";

    if (hasStab || hasJahr) {
        titleWithSpace += " "; // Add a space after the title
        details += "(";
        if (hasStab) {
            details += stab.trim();
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