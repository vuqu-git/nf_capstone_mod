
// import './NomalContent.css';
//
//
// export default function Kinobesuch() {
//
//     return (
//         <div>
//             <section className="normal-content-container">
//                 <h2>
//                     Informationen zum Kinobesuch
//                 </h2>
//
//                 <h3>Eintrittspreis</h3>
//                 <p>normal: 2,50 Euro</p>
//                 <p>Nur Barzahlung ist möglich.</p>
//                 <p>Das Kino ist für alle offen (d.h. insbesondere unabhängig vom Studierendenstatus). Es gibt keine
//                     Überlängenzuschläge und keine Ermäßigungen.</p>
//                 <p>Abweichende Preise werden auf der Webseite in den Filmeinträgen oder im Programmheft kenntlich
//                     gemacht.</p>
//
//                 <h3>Reservierung</h3>
//                 <p>Reservierungen oder Vorbestellungen sind leider nicht möglich. Der Ticketverkauf startet ca. 40
//                     Minuten vor Filmbeginn.</p>
//                 <p>Für ausgewählte Veranstaltungen bieten wir Reservierungen (via Ticketleo) an, die beim Klicken auf
//                     den entsprechenden Link vorgenommen werden können.</p>
//                 <p></p>
//                 <p></p>
//
//                 <h3>Adresse</h3>
//                 <p>
//                     Pupille e.V.<br/>
//                     Mertonstr. 26-28<br/>
//                     60325 Frankfurt am Main<br/>
//                 </p>
//
//                 <h3>Anfahrt</h3>
//                 <p>
//
//                     Haltestelle "Bockenheimer Warte"<br/>
//                     U-Bahn: U4, U6, U7<br/>
//                     Bus: M32, M36, 50, 75<br/>
//                     Tram: 16<br/><br/>
//                     <img src="https://pupille.org/bilder/allgemein/Map_Campus_Bockenheim.png"
//                          style={{maxWidth: "65%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
//                     />
//                     <br/><br/>
//                     <img src="https://pupille.org/bilder/allgemein/Kinoansicht1B.jpg"
//                          style={{maxWidth: "65%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
//                     />
//                 </p>
//
//                 <h3>Saal</h3>
//                 <p>Fassungsvermögen: 200 Sitzplätze</p>
//                 <img src="https://pupille.org/bilder/allgemein/Kinoansicht2.jpg"
//                      style={{maxWidth: "85%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
//                 />
//                 <br/><br/>
//                 <img src="https://pupille.org/bilder/allgemein/Kinoansicht3.jpg"
//                      style={{maxWidth: "85%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
//                 />
//
//
//                 <h3>Barrierefreiheit</h3>
//                 <p>Menschen mit Mobilitätseinschränkung</p>
//                 <p>Der Festsaal liegt im 1. OG des Studierendenhauses und ist über einen Fahrstuhl zugänglich. Bitte wendet euch an die Pforte (am Eingang des Studierendenhauses) für die Benutzung des Fahrstuhls. Während der Einlasszeiten steht die Tür zum Festsaal offen. Im Saal gibt es keine ausgewiesenen Plätze für Menschen mit Mobilitätseinschränkung. Wir leisten gerne Hilfe einen präferierten Platz einzunehmen.</p>
//
//
//             </section>
//         </div>
//     );
// }

// import './NomalContent.css';
// // import './Kinobesuch.module.css';
// import styles from './Kinobesuch.module.css';
//
// export default function Kinobesuch() {
//     return (
//         <div>
//             <section className="normal-content-container">
//                 <h2>
//                     Informationen zum Kinobesuch
//                 </h2>
//
//                 <div className={styles.gridContainer}>
//                     <h3>Eintrittspreis</h3>
//                     <p>2,50 Euro</p>
//                     <p>Nur Barzahlung ist möglich.</p>
//                     <p>Das Kino ist für alle offen (d.h. insbesondere unabhängig vom Studierendenstatus). Es gibt keine
//                         Überlängenzuschläge und keine Ermäßigungen.</p>
//                     <p>Abweichende Preise werden auf der Webseite in den Filmeinträgen oder im Programmheft kenntlich
//                         gemacht.</p>
//
//                     <h3>Reservierung</h3>
//                     <p>Reservierungen oder Vorbestellungen sind leider nicht möglich. Der Ticketverkauf startet ca. 40
//                         Minuten vor Filmbeginn.</p>
//                     <p>Für ausgewählte Veranstaltungen bieten wir Reservierungen (via Ticketleo) an, die beim Klicken auf
//                         den entsprechenden Link vorgenommen werden können.</p>
//                     <p></p>
//                     <p></p>
//
//                     <h3>Adresse</h3>
//                     <p>
//                         Pupille e.V.<br/>
//                         Mertonstr. 26-28<br/>
//                         60325 Frankfurt am Main<br/>
//                     </p>
//
//                     <h3>Anfahrt</h3>
//                     <p>
//
//                         Haltestelle "Bockenheimer Warte"<br/>
//                         U-Bahn: U4, U6, U7<br/>
//                         Bus: M32, M36, 50, 75<br/>
//                         Tram: 16<br/><br/>
//                         <img src="https://pupille.org/bilder/allgemein/Map_Campus_Bockenheim.png"
//                              style={{maxWidth: "65%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
//                         />
//                         <br/><br/>
//                         <img src="https://pupille.org/bilder/allgemein/Kinoansicht1B.jpg"
//                              style={{maxWidth: "65%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
//                         />
//                     </p>
//
//                     <h3>Saal</h3>
//                     <p>Fassungsvermögen: 200 Sitzplätze</p>
//                     <img src="https://pupille.org/bilder/allgemein/Kinoansicht2.jpg"
//                          style={{maxWidth: "85%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
//                     />
//                     <br/><br/>
//                     <img src="https://pupille.org/bilder/allgemein/Kinoansicht3.jpg"
//                          style={{maxWidth: "85%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
//                     />
//
//
//                     <h3>Barrierefreiheit</h3>
//                     <p>Menschen mit Mobilitätseinschränkung</p>
//                     <p>Der Festsaal liegt im 1. OG des Studierendenhauses und ist über einen Fahrstuhl zugänglich. Bitte wendet euch an die Pforte (am Eingang des Studierendenhauses) für die Benutzung des Fahrstuhls. Während der Einlasszeiten steht die Tür zum Festsaal offen. Im Saal gibt es keine ausgewiesenen Plätze für Menschen mit Mobilitätseinschränkung. Wir leisten gerne Hilfe einen präferierten Platz einzunehmen.</p>
//                 </div>
//
//             </section>
//         </div>
//     );
// }

import './NomalContent.css';


export default function Kinobesuch() {
    return (
        <div>
            <section className="normal-content-container">
                <h2>Informationen zum Kinobesuch</h2>

                <div className="section-row">
                    <h3>Eintrittspreis</h3>
                    <div className="section-content">
                        <p>2,50 Euro</p>
                        <p>Nur Barzahlung ist möglich.</p>
                        <p>Das Kino ist für alle offen (d.h. insbesondere unabhängig vom Studierendenstatus). Es gibt keine Überlängenzuschläge und keine Ermäßigungen.</p>
                        <p>Abweichende Preise werden auf der Webseite in den Filmeinträgen bzw. im Programmheft kenntlich gemacht.</p>
                    </div>
                </div>

                <div className="section-row">
                    <h3>Reservierung</h3>
                    <div className="section-content">
                        <p>Reservierungen oder Vorbestellungen sind leider nicht möglich. Der Ticketverkauf startet ca. 40 Minuten vor Beginn der Vorführung.</p>
                        <p>Für ausgewählte Veranstaltungen bieten wir Reservierungen an, die beim Klicken auf den entsprechenden Link vorgenommen werden können.</p>
                    </div>
                </div>

                <div className="section-row">
                    <h3>Adresse</h3>
                    <div className="section-content">
                        <p>
                            Pupille e.V.<br/>
                            Mertonstr. 26-28<br/>
                            60325 Frankfurt am Main
                        </p>
                    </div>
                </div>

                <div className="section-row">
                    <h3>Anfahrt</h3>
                    <div className="section-content">
                        <p>
                            Haltestelle "Bockenheimer Warte"<br/>
                            U-Bahn: U4, U6, U7<br/>
                            Bus: M32, M36, 50, 75<br/>
                            Tram: 16
                        </p>
                        <img src="https://pupille.org/bilder/allgemein/Map_Campus_Bockenheim.png"
                             style={{maxWidth: "85%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
                        />
                        <br/><br/>
                        <img src="https://pupille.org/bilder/allgemein/Kinoansicht1B.jpg"
                             style={{maxWidth: "85%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
                        />
                    </div>
                </div>

                <div className="section-row">
                    <h3>Saal</h3>
                    <div className="section-content">
                        <p>Fassungsvermögen: 200 Sitzplätze</p>
                        <img src="https://pupille.org/bilder/allgemein/Kinoansicht2.jpg"
                             style={{maxWidth: "100%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
                        />
                        <br/><br/>
                        <img src="https://pupille.org/bilder/allgemein/Kinoansicht3.jpg"
                             style={{maxWidth: "100%", borderRadius: "5px", boxShadow: "0px 0px 10px rgb(255, 255, 255, 0.2)"}}
                        />
                    </div>
                </div>

                <div className="section-row">
                    <h3>Barrierefreiheit</h3>
                    <div className="section-content">
                        <p>Menschen mit Mobilitätseinschränkung</p>
                        <p>Der Festsaal liegt im 1. OG des Studierendenhauses und ist über einen Fahrstuhl zugänglich. Bitte wendet euch an die Pforte (am Eingang des Studierendenhauses) für die Benutzung des Fahrstuhls. Während der Einlasszeiten steht die Tür zum Festsaal offen. Im Saal gibt es keine ausgewiesenen Plätze für Menschen mit Mobilitätseinschränkung. Wir leisten gerne Hilfe einen präferierten Platz einzunehmen.</p>
                    </div>
                </div>

            </section>
        </div>
    );
}
