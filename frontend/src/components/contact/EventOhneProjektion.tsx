import React from "react";
import {Badge} from "react-bootstrap";
import HinweisWerbungVeranstaltungsort from "./HinweisWerbungVeranstaltungsort.tsx";

const EventOhneProjektion: React.FC = () => {

    return (
        <section>
            <p>Das Pupille-Kino verantwortet die Räumlichkeit des Festsaals im Studierendenhaus <b>nicht</b> und ist auch nur Mieter beim AStA.</p>
            <p>
                Bitte kontaktiert direkt das <a href="https://asta-frankfurt.de/kontakt" target="_blank">AStA-Sekretariat</a> für die Verfügbarkeit und Mietung des Festsaals.
                Je nach Projekt bzw. Veranstaltung kann die Nutzung auch kostenlos sein, siehe <a href="https://asta-frankfurt.de/angebote/studierendenhaus/raeume-nutzen-mieten" target="_blank">Preisliste</a>.
            </p>
            <Badge bg="warning" text="dark">
                Hinweis:
            </Badge>
            <HinweisWerbungVeranstaltungsort />
        </section>
    );
};

export default EventOhneProjektion;