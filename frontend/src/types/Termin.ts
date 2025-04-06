interface Termin {
    tnr?: number; // Primary key, auto-generated, so it might not be present when creating a new Termin
    // tnr: number; // Primary key, auto-generated, so it might not be present when creating a new Termin
    termin?: string; // LocalDateTime will likely be represented as an ISO 8601 string in JSON
    titel?: string;
    text?: string;
    kurztext?: string;
    besonderheit?: string;
    startReservierung?: string; // LocalDate will likely be represented as an ISO 8601 string in JSON (YYYY-MM-DD)
    linkReservierung?: string;
    sonderfarbeTitel?: number | null; // Integer can be null
    sonderfarbe?: number | null; // Integer can be null
    veroeffentlichen?: number | null; // Short can be null
}

export default Termin;