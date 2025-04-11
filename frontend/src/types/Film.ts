export type Film = {
    fnr: number,
    titel?: string,
    originaltitel?: string | null,
    originaltitelAnzeigen?: boolean | null,
    text?: string | null,
    kurztext?: string | null,
    besonderheit?: string | null,
    land?: string | null,
    jahr?: number | null,
    farbe?: string | null,
    laufzeit?: number | null,
    sprache?: string | null,
    untertitel?: string | null,
    format?: string | null,
    fsk?: '_0' | '_6' | '_12' | '_16' | '_18' | 'UNGEPRUEFT' | null, // Or just optional
    stab?: string | null,
    bild?: string | null,
    sonderfarbeTitel?: number | null,
    sonderfarbe?: number | null,
}

