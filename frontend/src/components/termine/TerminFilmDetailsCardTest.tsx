import Card from 'react-bootstrap/Card';
import {render} from "../../utils/render.tsx";
import {CSSProperties, useEffect, useState} from "react";
import './GradientCard.css';
import ListFilmDetails from "../../types/ListFilmDetails.ts";
import axios from "axios";
import Screening from "../../types/Screening.ts";
import Termin from "../../types/Termin.ts";
import { formatDateTime } from '../../utils/DateTimeFormatForOverview.ts';
import TerminWithFilms from "../../types/TerminWithFilms.ts";


// interface Props {
//     films: ListFilmDetails
// }

export default function TerminFilmDetailsCardTest() {

    // here get specific Termin

    // const [specificTermin, setSpecificTermin] = useState<Termin>();
    //
    // useEffect(() => {
    //
    //
    //         const getSingleTermin = () => {
    //
    //             // setIsGetLoading(true);
    //             // setErrorMessage("");
    //
    //             axios.get(`/ap/termin/${selectedTerminId}`)
    //                 .then((response) => setSpecificTermin(response.data))
    //                 .catch((error) => {
    //                     // const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    //                     // setErrorMessage(errorMessage);
    //                 })
    //                 // .finally(() => setIsGetLoading(false));
    //         };
    //
    //         getSingleTermin();
    //
    // }, []);

    const specificTermin: Termin = {
        tnr: 819,
        termin: "2024-12-16T20:15:00",
        titel: "Alle zusammen, keine allein: Frauenbanden vor und hinter der Kamera",
        text: "Die achtj&auml;hrige Nelly f&auml;hrt mit ihren Eltern in das Haus der geliebten, gerade verstorbenen Gro&szlig;mutter, um es auszur&auml;umen. Sie st&ouml;bert in den alten Spielsachen und B&uuml;chern ihrer Mutter Marion, neugierig auf deren Kindheit. Doch Marion will sich der Vergangenheit nicht stellen, sie reist ab und l&auml;sst Mann und Tochter allein zur&uuml;ck.<p>W&auml;hrend ihr Vater am Haus arbeitet, streift Nelly durch die W&auml;lder. Dort trifft sie auf ein M&auml;dchen, das ihr wie ein Ei dem anderen gleicht. Sie hei&szlig;t Marion. Schnell entwickeln die beiden eine innige Freundschaft und teilen bald ein mystisches Geheimnis, das sie auf wunderbare Weise verbindet.</p><p>Unaufgeregt und dabei voller Poesie ist der Film eine Zeitreise durch die Augen eines jungen M&auml;dchens. <em>Alamode</em></p><iframe width=\"560\" height=\"315\" src=\"https://www.youtube-nocookie.com/embed/bX4J6gYYqQ8\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>",
        kurztext: "In diesem Jahr beteiligt sich die Pupille am Kurzfilmtag. Am k&uuml;rzesten Tag des Jahres und um diesen Tag herum, wird an verschiedenen Orten der Kurzfilm zelebriert.",
        besonderheit: "Im Rahmen des Kurzfilmtages 2024 in Kooperation mit der AG Kurzfilm.",
        startReservierung: null,
        linkReservierung: "",
        sonderfarbeTitel: null,
        sonderfarbe: null,
        veroeffentlichen: 1
    }

    const screeningDateObj = formatDateTime(specificTermin.termin);


    // here get Film list for that specific Termin

    return (
        <Card
            // border="none"
            className="pupille-glow zoom-effect"
            style={{
                backgroundColor: '#0D0D0C',
                borderRadius: '15px',
                overflow: 'hidden', // Add this line
            }}
            text="light"
        >
            <Card.Body>
                <Card.Header
                    as="h5"
                    className="text-end"
                >
                    {screeningDateObj?.weekday}, {screeningDateObj?.date} {screeningDateObj?.time}
                </Card.Header>

                <Card.Title
                    as="h2"
                    style={{ color: '#fff' }}
                >
                    {render(specificTermin.titel)}
                </Card.Title>

                <Card.Text
                    style={{ color: '#cfd6e1' }}
                >
                    {render(specificTermin.text)}
                </Card.Text>

                {/*###############################*/}

                <Card.Title
                    as="h4"
                    style={{
                        color: '#fff',
                        borderTop: '1px solid #cfd6e1',
                    }}
                >
                    1. Film: Powell & Pressburger
                </Card.Title>

            </Card.Body>
            {/*<Card.Img variant="top" src={`https://www.pupille.org/bilder/filmbilder/openheimer.jpg`} />*/}
            <img src={`https://www.pupille.org/bilder/filmbilder/openheimer.jpg`}/>
            <Card.Body>
                <Card.Text
                    style={{ color: '#cfd6e1' }}
                >
                    {render(specificTermin.text)}
                </Card.Text>

                {/*<Card.Title*/}
                {/*    as="h6"*/}
                {/*    style={{*/}
                {/*        color: '#fff',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Filminformationen:*/}
                {/*</Card.Title>*/}
                {/*<Card.Text*/}
                {/*    style={{ color: '#cfd6e1' }}*/}
                {/*>*/}
                {/*    Land: {"USA"} <br/>*/}
                {/*    Jahr: {2024} <br/>*/}
                {/*    Länge: {139} <br/>*/}
                {/*    Sprachfassung: {"eng"} <br/>*/}
                {/*    Untertitel: {"deu"} <br/>*/}
                {/*    Farbigkeit: {"Farbe"} <br/>*/}
                {/*</Card.Text>*/}

                {/*<Card.Title*/}
                {/*    as="h6"*/}
                {/*    style={{*/}
                {/*        color: '#fff',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    Stab und Besetzung:*/}
                {/*</Card.Title>*/}
                {/*<Card.Text*/}
                {/*    style={{ color: '#cfd6e1' }}*/}
                {/*>*/}
                {/*    Land: {"USA"} <br/>*/}
                {/*    Jahr: {2024} <br/>*/}
                {/*    Länge: {139} <br/>*/}
                {/*    Sprachfassung: {"eng"} <br/>*/}
                {/*    Untertitel: {"deu"} <br/>*/}
                {/*    Farbigkeit: {"Farbe"} <br/>*/}
                {/*    Untertitel: {"deu"} <br/>*/}
                {/*</Card.Text>*/}

                <div className="d-flex">
                    <div style={{ flex: 1, marginRight: '1rem' }}>
                        <Card.Title
                            as="h6"
                            style={{
                                color: '#fff',
                            }}
                        >
                            Filminformationen:
                        </Card.Title>
                        <Card.Text
                            style={{ color: '#cfd6e1' }}
                        >
                            Land: {"USA"} <br />
                            Jahr: {2024} <br />
                            Länge: {139} <br />
                            Sprachfassung: {"eng"} <br />
                            Untertitel: {"deu"} <br />
                            Farbigkeit: {"Farbe"} <br />
                            Format: {"DCP"} <br />
                            FSK: {"16"} <br />
                        </Card.Text>
                    </div>
                    <div style={{ flex: 1 }}>
                        <Card.Title
                            as="h6"
                            style={{
                                color: '#fff',
                            }}
                        >
                            Stab und Besetzung:
                        </Card.Title>
                        <Card.Text
                            style={{ color: '#cfd6e1' }}
                        >
                            {render(`B,R&amp;S: Sean Baker<br>
                            K: Drew Daniels<br>
                            M: Matthew Hearon-Smith<br>
                            D: Mikey Madison, J&uacute;rij Bor&iacute;sov, Mark &#278;jdel&rsquo;&#353;t&eacute;jn, Karren Karagulian, Vache Tovmasyan u.a.<br>
                            V: Universal<br>`)}
                        </Card.Text>
                    </div>
                </div>

            </Card.Body>
        </Card>
    );
}
