// for selection in form

interface ReiheDTOSelection {
    rnr: number; // Primary key, auto-generated, so it might not be present when creating a new Reihe
    titel?: string | null;
}

export default ReiheDTOSelection;