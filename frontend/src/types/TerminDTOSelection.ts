
// for Termin selection

interface TerminDTOSelection {
    tnr: number; // Primary key, auto-generated, so it might not be present when creating a new Termin
    vorstellungsbeginn?: string; // LocalDateTime represented as an ISO 8601 string in JSON
    titel?: string | null;
}

export default TerminDTOSelection;