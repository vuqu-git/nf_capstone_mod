import './NomalContent.css';
import styles from './Kinobesuch.module.css';

export default function Kinobesuch() {
    return (
        <div>
            <section className="normal-content-container">
                <h2 className="header2NormalContainer">Informationen zum Kinobesuch</h2>

                {/*usual syntax: className={styles.yourClassName}*/}
                {/*The more common and often preferred syntax for accessing CSS Module class names in JSX is indeed using dot notation when the class name in your CSS file is a valid JavaScript identifier (i.e., it doesn't contain hyphens and doesn't start with a number)*/}
                {/*JavaScript doesn't allow hyphens in variable or property names. When CSS Modules processes your Kinobesuch.module.css with hyphenated class names like section-row, the styles object will have keys that reflect these names as strings. To access a property of an object using a string key that contains characters not allowed in standard JavaScript identifiers (like a hyphen), you need to use bracket notation (styles["section-row"]).*/}
                <div className={styles["section-row"]}>
                    <h3 className={styles["section-row"]}>Eintrittspreis</h3>
                    <div className={styles["section-content"]}>
                        <p>2,50 Euro</p>
                        <p>Nur Barzahlung ist möglich.</p>
                        <p>Das Kino ist für alle offen (d.h. insbesondere unabhängig vom Studierendenstatus). Es gibt keine Überlängenzuschläge und keine Ermäßigungen.</p>
                        <p>Abweichende Preise werden auf der Webseite in den Filmeinträgen bzw. im Programmheft kenntlich gemacht.</p>
                    </div>
                </div>

                <div className={styles["section-row"]}>
                    <h3 className={styles["section-row"]}>Reservierung</h3>
                    <div className={styles["section-content"]}>
                        <p>Reservierungen oder Vorbestellungen sind leider nicht möglich. Der Ticketverkauf startet ca. 40 Minuten vor Beginn der Vorführung.</p>
                        <p>Für ausgewählte Veranstaltungen bieten wir Reservierungen an, die beim Klicken auf den entsprechenden Link vorgenommen werden können.</p>
                    </div>
                </div>

                <div className={styles["section-row"]}>
                    <h3 className={styles["section-row"]}>Spielbetrieb</h3>
                    <div className={styles["section-content"]}>
                        <p>Während der Vorlesungszeit jedes Semester veranstalten wir jeweils montags und mittwochs Filmvorführungen (außer an gesetzlichen Feiertagen). Darüber hinaus können vereinzelt auch an anderen Wochentagen – einschließlich der vorlesungsfreien Zeit – Filme gezeigt werden.</p>
                    </div>
                </div>

                <div className={styles["section-row"]}>
                    <h3 className={styles["section-row"]}>Adresse</h3>
                    <div className={styles["section-content"]}>
                        <p>
                            Festsaal (1. OG) im Studierendenhaus<br/>
                            Mertonstr. 26-28<br/>
                            60325 Frankfurt am Main
                        </p>
                    </div>
                </div>

                <div className={styles["section-row"]}>
                    <h3 className={styles["section-row"]}>Anfahrt</h3>
                    <div className={styles["section-content"]}>
                        <p>
                            Haltestelle "Bockenheimer Warte"<br/>
                            U-Bahn: U4, U6, U7<br/>
                            Bus: M32, M36, 50, 75<br/>
                            Tram: 16
                        </p>
                        <img src="https://pupille.org/bilder/allgemein/Map_Campus_Bockenheim.png"
                             alt="Karte vom Campus Bockenheim"
                             style={{maxWidth: "85%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
                        />
                        <br/><br/>
                        <img src="https://pupille.org/bilder/allgemein/Kinoansicht1B.jpg"
                             alt="Eingang des Studierendenhauses von außen"
                             style={{maxWidth: "85%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
                        />
                    </div>
                </div>

                <div className={styles["section-row"]}>
                    <h3 className={styles["section-row"]}>Saal</h3>
                    <div className={styles["section-content"]}>
                        <p>Fassungsvermögen: ca. 200 Sitzplätze</p>
                        <img src="https://pupille.org/bilder/allgemein/Kinoansicht2.jpg"
                             alt="Festsaal von Vorführraum"
                             style={{maxWidth: "100%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
                        />
                        <br/><br/>
                        <img src="https://pupille.org/bilder/allgemein/Kinoansicht3.jpg"
                             alt="Festsaal von innen"
                             style={{maxWidth: "100%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
                        />
                    </div>
                </div>

                <div className={styles["section-row"]}>
                    <h3 className={styles["section-row"]}>Barrierefreiheit</h3>
                    <div className={styles["section-content"]}>
                        <p>Menschen mit Mobilitätseinschränkung</p>
                        <p>Der Festsaal liegt im 1. OG des Studierendenhauses und ist über einen Fahrstuhl zugänglich. Bitte wendet euch an die Pforte (am Eingang des Studierendenhauses) für die Benutzung des Fahrstuhls. Während der Einlasszeiten steht die Tür zum Festsaal offen. Im Saal gibt es keine ausgewiesenen Plätze für Menschen mit Mobilitätseinschränkung. Wir leisten gerne Hilfe einen präferierten Platz einzunehmen.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}