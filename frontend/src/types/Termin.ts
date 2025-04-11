interface Termin {
    tnr?: number; // Primary key, auto-generated, so it might not be present when creating a new Termin
    // tnr: number; // Primary key, auto-generated, so it might not be present when creating a new Termin
    termin?: string | null; // LocalDateTime will likely be represented as an ISO 8601 string in JSON
    titel?: string | null;
    text?: string | null;
    kurztext?: string | null;
    besonderheit?: string | null;
    startReservierung?: string | null; // LocalDate will likely be represented as an ISO 8601 string in JSON (YYYY-MM-DD)
    linkReservierung?: string | null;
    sonderfarbeTitel?: number | null; // Integer can be null
    sonderfarbe?: number | null; // Integer can be null
    veroeffentlichen?: number | null; // Short can be null
}

export default Termin;