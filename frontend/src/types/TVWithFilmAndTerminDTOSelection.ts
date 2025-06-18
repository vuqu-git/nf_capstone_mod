export interface ReiheDTOForm {
    tnr?: number; // Corresponds to Long in Java, // Primary key, auto-generated, so it might not be present when creating a new TV
    fnr?: number; // Corresponds to Long in Java // Primary key, auto-generated, so it might not be present when creating a new TV
    vorfilm?: boolean | null;
    rang?: number | null;

    film: {titel?: string | null, jahr?: number | null, directors?: string | null}
    termin: {vorstellungsbeginn?: string, titel?: string | null}
}
