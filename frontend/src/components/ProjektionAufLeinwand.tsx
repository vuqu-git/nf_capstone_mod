import {Accordion, Badge, CardGroup} from "react-bootstrap";
import Card from "react-bootstrap/Card";

export default function ProjektionAufLeinwand() {

    return (
        <div>
            <section>
                <h2 className="mb-4">
                    Veranstaltungen mit Projektion im Festsaal
                </h2>
                <h3 className="mb-4">
                    eigenverantwortlich
                </h3>
                <div>
                    <p>
                        <Badge bg="danger">Wichtig:</Badge> Bevor Ihr uns kontaktiert, bitte klärt immer <b>selber vorher</b>
                    </p>
                    <ul>
                        <li>die Mietung und Verfügbarkeit des Festsaals mit dem  <a href="https://asta-frankfurt.de/kontakt" target="_blank">AStA</a> (je nach Projekt
                            kann die Nutzung auch kostenlos sein, siehe <a href="https://asta-frankfurt.de/angebote/studierendenhaus/raeume-nutzen-mieten" target="_blank">Preisliste</a>)
                        </li>
                        <li>und im Fall einer öffentlichen Filmvorführung die Lizenz mit dem Rechteinhaber des Films.</li>
                    </ul>
                </div>
                <p>
                    Bei Kino-Veranstaltungen ist es ratsam direkt beim AStA zu erfragen, ob nicht gleichzeitig im Café KoZ oder vor dem Haus laute Konzerte oder Partys stattfinden.
                </p>
                <p>
                    Grundsätzlich gibt es verschiedene Möglichkeiten den Festsaal des Studierendenhauses für Projektionen zu nutzen:
                </p>

                <CardGroup>
                <Card bg="dark" text="white" border="success">
                    <Card.Header><Card.Title>ganz eigenständig</Card.Title></Card.Header>
                    <Card.Body>

                        <Card.Text>
                            <p>
                                Dazu müsstet Ihr als Erstes den Festsaal beim AStA buchen und eigene Technik mitbringen (z.B. Boxen und Beamer). Dann wärt ihr zeitlich und organisatorisch ganz unabhängig von uns.
                                Unsere Leinwand könnt ihr auf jeden Fall nutzen. Der Schlüssel zum Ausrollen liegt an der Pforte des Studierendenhauses.
                            </p>
                            <p>
                                Hinweis: Das Technik-Team des AStA verleiht Technik (bspw. Boxen, Beamer, Mikrofone) für Veranstaltungen und erklärt bei Bedarf den Aufbau.
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>

                <Card bg="dark" text="white" border="success">
                    <Card.Header><Card.Title>mit professioneller Kinotechnik</Card.Title></Card.Header>
                    <Card.Body>

                        <Card.Text>
                            <p>
                                Dafür müsstet Ihr den Festsaal zuerst vom AStA selber mieten. Für die Nutzung unserer Kinotechnik (Ton und/oder Projektoren) müsste der Termin auch mit uns abgesprochen werden,
                                damit jemand vom Team die technische Betreuung übernimmt.
                            </p>
                            <p>
                                Unsere Vorführer*innen nehmen für so eine Vorstellung ein kleines Honorar. Die genauen Konditionen erfahrt ihr auf Anfrage.
                            </p>
                            <p>
                                Wir bekommen regelmäßig viele Anfragen und können nicht alle berücksichtigen, da wir komplett ehrenamtlich in der Pupille tätig sind.
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </CardGroup>


                <h3 className="mb-4">
                    gemeinsam
                </h3>
                <div>
                    <p>
                        <Badge bg="primary">Hinweis:</Badge> Bitte richtet in diesem Fall eure Anfrage an uns bis zum Einsendeschluss am 31. Januar (für das Sommersemester) bzw.
                        am 31. Juli (für das Wintersemester) und schreibt einige Sätze wie ihr euch die Zusammenarbeit sowie Arbeitsteilung vorstellt.
                    </p>
                </div>

                <Card bg="dark" text="white" border="warning">
                    <Card.Header><Card.Title>Film zeigen als Kooperation in unserem Programm</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <p>
                                Es gibt ebenso die Möglichkeit eine Filmvorstellung als Kooperation innerhalb unseres regulären Programms zu veranstalten. Der Termin liegt dann i.d.R. während der Vorlesungszeit des Uni-Semesters.
                                Außerdem wird die Veranstaltung im gedruckten Programmheft sowie auf der Webseite und den Social-Media-Kanälen der Pupille erwähnt.
                            </p>
                            <p>
                                Um die Saalnutzung und die Kinotechnik kümmern wir uns, während die Fragen zu Ticketeinnahmen, Filmbestellung und Filmmiete individuell geklärt werden.
                            </p>
                        </Card.Text>
                    </Card.Body>
                </Card>

            </section>
        </div>
    );
}