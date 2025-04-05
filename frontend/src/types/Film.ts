export type Film = {
    fnr: number,
    titel: string,
    originaltitel: string,
    originaltitelAnzeigen: boolean,
    text: string,
    kurztext: string,
    besonderheit: string,
    land: string,
    jahr: number,
    farbe: string,
    laufzeit: number,
    sprache: string,
    untertitel: string,
    format: string,
    fsk: '_0' | '_6' | '_12' | '_16' | '_18' | 'UNGEPRUEFT',
    stab: string
    bild: string,
    sonderfarbeTitel: number,
    sonderfarbe: number
}