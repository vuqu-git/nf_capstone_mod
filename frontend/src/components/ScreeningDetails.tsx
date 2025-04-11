import TerminDTOFormWithFilmsDTOFormPlus from "../types/TerminDTOFormWithFilmsDTOFormPlus.ts";
import TerminFilmDetailsCard from "./termine/TerminFilmDetailsCard.tsx";
import {formatDateTime} from "../utils/DateTimeFormatForOverview.ts";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


// const screeningDetails: TerminDTOFormWithFilmsDTOFormPlus = {
//     "termin": {
//         "tnr": 819,
//         "termin": "2024-12-16T20:15:00",
//         "titel": "Alle zusammen, keine allein: Frauenbanden vor und hinter der Kamera",
//         "text": "In diesem Jahr beteiligt sich die Pupille am Kurzfilmtag. Am k&uuml;rzesten Tag des Jahres und um diesen Tag herum wird an verschiedenen Orten der Kurzfilm zelebriert. Mit <em>Alle zusammen, keine allein: Frauenbanden vor und hinter der Kamera</em> zeigen wir vier wegweisende Experimentalfilme der Regisseurinnen Elfi Mikesch, Ute Aurand, Ulrike Pfeiffer und Maria Lang sowie eines Studierendenkollektivs an der Deutschen Film- und Fernsehakademie aus den Jahren 1971&ndash;88: &raquo;Verspielte Super 8-Stadterkundungen wechseln sich ab mit filmischem Empowerment, autobiografischen Dokumenten und lustvoller Zelebrierung transgressiven weiblichen Begehrens.&laquo; Dabei erproben die Regisseurinnen neue Sichtweisen auf Sexualit&auml;t, Familie, Patriarchat und das Filmschaffen an sich.",
//         "kurztext": "In diesem Jahr beteiligt sich die Pupille am Kurzfilmtag. Am k&uuml;rzesten Tag des Jahres und um diesen Tag herum, wird an verschiedenen Orten der Kurzfilm zelebriert.",
//         "besonderheit": "Im Rahmen des Kurzfilmtages 2024 in Kooperation mit der AG Kurzfilm.",
//         "startReservierung": null,
//         "linkReservierung": "",
//         "sonderfarbeTitel": null,
//         "sonderfarbe": null,
//         "veroeffentlichen": 1
//     },
//     "mainfilms": [
//         {
//             "film": {
//                 "fnr": 1219,
//                 "titel": "OH! Die vier Jahreszeiten",
//                 "originaltitel": null,
//                 "originaltitelAnzeigen": null,
//                 "text": "Winter in Berlin vorm Reichstag, Sommer in Paris auf dem Place de la Concorde, Fr&uuml;hling Roter Platz in Moskau, Herbst im Bankenviertel Londons. Sich gegenseitig filmend, bespielen Ute Aurand und Ulrike Pfeiffer die historischen Schaupl&auml;tze, um &#8222;den Ort aus der Geschichte in die Gegenwart zur&uuml;ck zu holen.&ldquo;",
//                 "kurztext": null,
//                 "besonderheit": null,
//                 "land": "DEU",
//                 "jahr": 1988,
//                 "farbe": "Farbe",
//                 "laufzeit": 20,
//                 "sprache": "deu",
//                 "untertitel": "eng",
//                 "format": "DCP",
//                 "fsk": null,
//                 "stab": "R: Ute Aurand, Ulrike Pfeiffer",
//                 "bild": "Oh_die_vier_Jahreszeiten.jpg",
//                 "sonderfarbeTitel": null,
//                 "sonderfarbe": null
//             },
//             "vorfilm": null,
//             "rang": 1
//         },
//         {
//             "film": {
//                 "fnr": 1220,
//                 "titel": "Women's Camera",
//                 "originaltitel": null,
//                 "originaltitelAnzeigen": null,
//                 "text": "Der Film entstand in einem Grundkurs der Deutschen Film- und Fernsehakademie Berlin. Es werden Kamerafunktionen erkl&auml;rt und diese dann filmisch umgesetzt. Aus dem Lehrfilm wird so ein Akt des Empowerments f&uuml;r den politischen und emanzipatorischen Kampf.",
//                 "kurztext": null,
//                 "besonderheit": null,
//                 "land": "DEU",
//                 "jahr": 1971,
//                 "farbe": "schwarz-wei&szlig;",
//                 "laufzeit": 21,
//                 "sprache": "deu",
//                 "untertitel": "eng",
//                 "format": "DCP",
//                 "fsk": null,
//                 "stab": "R: Gardi Deppe, Barbara Kasper, Brigitte Krause, Ingrid Oppermann, Tamara Wyss",
//                 "bild": "Womens_Camera.jpg",
//                 "sonderfarbeTitel": null,
//                 "sonderfarbe": null
//             },
//             "vorfilm": null,
//             "rang": 2
//         },
//         {
//             "film": {
//                 "fnr": 1221,
//                 "titel": "Familiengruft",
//                 "originaltitel": null,
//                 "originaltitelAnzeigen": null,
//                 "text": "Regisseurin Maria Lang portr&auml;tiert hier ihre Mutter. Der Film zeigt den Familienalltag, begleitet die Eltern bei der Verrichtung der tagt&auml;glichen Arbeiten sowie ihrer kleinen Rituale. Gleichzeitig reflektiert er, inspiriert durch Langs Lekt&uuml;re feministischer Texte, damalige Geschlechterrollen.",
//                 "kurztext": null,
//                 "besonderheit": null,
//                 "land": "DEU",
//                 "jahr": 1982,
//                 "farbe": "schwarz-wei&szlig;",
//                 "laufzeit": 11,
//                 "sprache": "deu",
//                 "untertitel": "eng",
//                 "format": "DCP",
//                 "fsk": null,
//                 "stab": "R: Maria Lang",
//                 "bild": "Familiengruft.jpg",
//                 "sonderfarbeTitel": null,
//                 "sonderfarbe": null
//             },
//             "vorfilm": null,
//             "rang": 3
//         },
//         {
//             "film": {
//                 "fnr": 1222,
//                 "titel": "Das Fr&uuml;hst&uuml;ck der Hy&auml;ne",
//                 "originaltitel": null,
//                 "originaltitelAnzeigen": null,
//                 "text": "Eine junge Frau verbringt ihre Zeit zwischen dem Ignorieren von Mansplaining-Anrufen ihres Ex-Partners und Tagtr&auml;umen mit Gewaltphantasien. In elegantem Schwarzwei&szlig; zeigt Mikesch Aufbruch, Identit&auml;tssuche und Ringen um weibliche Subjektivit&auml;t und Autonomie mit queer-feministischen Blick.",
//                 "kurztext": null,
//                 "besonderheit": null,
//                 "land": "DEU",
//                 "jahr": 1983,
//                 "farbe": "schwarz-wei&szlig;",
//                 "laufzeit": 26,
//                 "sprache": "deu",
//                 "untertitel": "eng",
//                 "format": "DCP",
//                 "fsk": null,
//                 "stab": "R: Elfi Mikesch",
//                 "bild": "Das_Fruehstueck_der_Hyaene.jpg",
//                 "sonderfarbeTitel": null,
//                 "sonderfarbe": null
//             },
//             "vorfilm": null,
//             "rang": 4
//         }
//     ],
//     "vorfilms": []
// }
//


// const screeningDetails: TerminDTOFormWithFilmsDTOFormPlus = {
//     "termin": {
//         "tnr": 854,
//         "termin": "2027-01-01T20:15:00",
//         "titel": null,
//         "text": null,
//         "kurztext": null,
//         "besonderheit": null,
//         "startReservierung": null,
//         "linkReservierung": null,
//         "sonderfarbeTitel": null,
//         "sonderfarbe": null,
//         "veroeffentlichen": 1
//     },
//     "mainfilms": [
//         {
//             "film": {
//                 "fnr": 1217,
//                 "titel": "Akira",
//                 "originaltitel": "&#12450;&#12461;&#12521; (Akira)",
//                 "originaltitelAnzeigen": null,
//                 "text": "Tokio, 1988: Die Stadt wird bei einem atomaren Bombenanschlag fast vollst&auml;ndig zerst&ouml;rt. Drei&szlig;ig Jahre sp&auml;ter ist die Stadt wiederaufgebaut &mdash; und hei&szlig;t nun Neo-Tokio. Neben imposanten Wolkenkratzern zeichnen jedoch auch zahlreiche Unruhen die Stadt, Bandenkriminalit&auml;t und Bombenanschl&auml;ge geh&ouml;ren zum Alltag. Als Kaneda und seine Motorradgang sich eines nachts mit ihren Rivalen eine hitzige Verfolgungsjagd liefern, ger&auml;t sein bester Freund Tetsuo in einen Unfall mit einem seltsamen Jungen und wird umgehend vom Milit&auml;r am Unfallort gefangen genommen. W&auml;hrend Kaneda und seine Freunde alles daran setzen, Tetsuo zu retten, beginnt Tetsuo schon bald unkontrollierbare Kr&auml;fte zu entwickeln.\n<p>Ein zeitloser Klassiker, komplett von Hand animiert. Bei uns exklusiv auf 35mm in der deutschen Synchronfassung.</p><iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/nA8KmHC2Z-g?si=PN8yq4FGECBYVIBo\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" referrerpolicy=\"strict-origin-when-cross-origin\" allowfullscreen></iframe>",
//                 "kurztext": "Im wiederaufgebauten Tokio liefern sich Kanedas Motorradgang erbitterte K&auml;mpfen mit ihren Rivalen. Eines Nachts kommt es zu einem schicksalhaften Unfall bei dem Kanedas bester Freund Tetsuo vom Milit&auml;r gefangen genommen wird. Bei dem Versuch, ihren besten Freund zu retten, ahnen sie noch nicht, was f&uuml;r Kr&auml;fte Tetsuo in Gefangenschaft entwickeln wird&#8230;",
//                 "besonderheit": null,
//                 "land": "JPN",
//                 "jahr": 1988,
//                 "farbe": "Farbe",
//                 "laufzeit": 124,
//                 "sprache": "deu",
//                 "untertitel": null,
//                 "format": "35mm",
//                 "fsk": "_16",
//                 "stab": "R: Katsuhiro Otomo\r\nB: Katsuhiro Otomo, Iz&#333; Hashimoto\r\nK: Katsuji Misawa\r\nS: Takeshi Seyama\r\nM: Sh&#333;ji Yamashiro\r\nD: Julien Hagg&egrave;ge, Markus Hoffmann, Raimund Krone, Bianca Krahl u.a.\r\nV: Leonine",
//                 "bild": "Akira.jpg",
//                 "sonderfarbeTitel": null,
//                 "sonderfarbe": null
//             },
//             "vorfilm": false,
//             "rang": null
//         }
//     ],
//     "vorfilms": [
//         {
//             "film": {
//                 "fnr": 1175,
//                 "titel": "Die Katze tanzt",
//                 "originaltitel": null,
//                 "originaltitelAnzeigen": null,
//                 "text": "Schon seit ihrer Kindheit ist Anne heimlich in ihre beste Freundin Kathrin verliebt, die am n&auml;chsten Tag heiraten wird.",
//                 "kurztext": null,
//                 "besonderheit": null,
//                 "land": "DEU",
//                 "jahr": 2011,
//                 "farbe": null,
//                 "laufzeit": 7,
//                 "sprache": null,
//                 "untertitel": null,
//                 "format": null,
//                 "fsk": null,
//                 "stab": "R: Ester Bialas\r\nV: KFA Hamburg",
//                 "bild": null,
//                 "sonderfarbeTitel": null,
//                 "sonderfarbe": null
//             },
//             "vorfilm": true,
//             "rang": null
//         }
//     ]
// }

export default function ScreeningDetails() {

    const { tnr } = useParams();
    const [screeningDetails, setScreeningDetails] = useState<TerminDTOFormWithFilmsDTOFormPlus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`/api/screenings/${tnr}`)
            .then(response => {
                setScreeningDetails(response.data);
            })
            .catch(err => {
                setError(err.response?.data?.message || "Error loading screening details");
            })
            .finally(() => setLoading(false));
    }, [tnr]);

    if (loading) return <div className="text-warning">&#127902; Loading screening...</div>;
    if (error) return <div className="text-danger">{error}</div>;
    if (!screeningDetails) return <div>No screening found</div>;

    const screeningDateObj = screeningDetails.termin.termin
        ? formatDateTime(screeningDetails.termin.termin)
        : undefined;

    // if (screeningDetails.termin.titel !== null && screeningDetails.termin.titel !== undefined && screeningDetails.termin.titel !== "") {

        return (
            <TerminFilmDetailsCard
                screeningWeekday={screeningDateObj?.weekday}
                screeningDate={screeningDateObj?.date}
                screeningTime={screeningDateObj?.time}
                screeningSonderfarbe={1}

                titel={screeningDetails.termin.titel}
                text={screeningDetails.termin.text}
                besonderheit={screeningDetails.termin.besonderheit}

                mainfilms={screeningDetails.mainfilms}
                vorfilms={screeningDetails.vorfilms}
            />
        )

    // } else if (screeningDetails.filmsPlus.length > 0) {
    //     return (
    //         // <TerminFilmDetailsCard
    //         //     screeningWeekday={screeningDateObj?.weekday}
    //         //     screeningDate={screeningDateObj?.date}
    //         //     screeningTime={screeningDateObj?.time}
    //         //     screeningSonderfarbe={1}
    //         //
    //         //     titel={screeningDetails.filmsPlus.film.titel}
    //         //     text={screeningDetails.termin.text}
    //         //     besonderheit={screeningDetails.termin.besonderheit}
    //         //
    //         //     filmsPlus={screeningDetails.filmsPlus}
    //         // />
    //
    //     )
    // }
}