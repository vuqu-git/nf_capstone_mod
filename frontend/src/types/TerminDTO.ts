
// for Termin selection

interface TerminDTO {
    tnr?: number; // Primary key, auto-generated, so it might not be present when creating a new Termin
    termin?: string; // LocalDateTime will likely be represented as an ISO 8601 string in JSON
    titel?: string;
}

export default TerminDTO;