// import ICalendarLink, { Event as ICalendarEvent } from "react-icalendar-link";
//
// interface CalendarEvent {
//     title: string;
//     description?: string;
//     startTime: string;
//     endTime: string;
//     location?: string;
// }
//
// const event: CalendarEvent  = {
//     title: "My Title",
//     description: "My Description",
//     startTime: "2025-04-26T10:30:00+02:00",
//     endTime: "2025-04-26T12:00:00+02:00",
//     location: "10 Carlotta St, Artarmon NSW 2064, Australia",
// };

import { AddToCalendarButton } from 'add-to-calendar-button-react';

export default function ContentNotes() {

    return (
        <div>
            <section>
                <h2 className="mb-4">
                    Triggerwarnungen und Content Notes
                </h2>
                <p>
                    Wir verstehen uns als Kino mit einem vielfältigen und auch risikobereiten Programm &ndash; gleichzeitig möchten wir einen Ort herstellen, an dem ein kollektives Kinoerlebnis so inklusiv wie möglich stattfinden kann.
                    Deshalb haben wir bei jeder Filmbeschreibung (falls zutreffend) ein Ausklappmenü "Hinweis auf sensible Inhalt" eingefügt, in dem ihr Triggerwarnungen und andere inhaltliche Hinweise sehen könnt.
                </p>
                <p>
                    Wir haben uns bei den Triggerwarnungen zu sexueller Gewalt an der Seite <a href="https://www.unconsentingmedia.org" target="_blank">www.unconsentingmedia.org</a> orientiert, die aber vor allem US-amerikanische Filme abdeckt.
                    Die Einschätzung der Inhalte erfolgt daher nach bestem Wissen und Gewissen durch unser Team und/oder unsere Kooperationspartner*innen.
                    Da dies aber immer auch ein subjektiver Prozess ist, können wir die Vollständigkeit dieser Angaben leider nicht garantieren.
                </p>
                <p>
                    Wir bitten euch daher, achtsam zu sein und zu einzelnen Filmen gegebenenfalls zusätzliche Informationen einzuholen, wenn bestimmte Inhalte potentiell überfordernd sein können.
                    Wir nehmen hierzu auch gerne Fragen, Hinweise und Anregungen von euch per Mail entgegen! Sprecht uns auch immer gerne an der Theke an.
                </p>
                <p>
                    <em>Eure Pupille</em>
                </p>
                <p style={{textAlign: 'right',}}>
                    Stand: 16. April 2024
                </p>

                {/*<ICalendarLink event={event} filename="my-event.ics">*/}
                {/*    Add to Calendar*/}
                {/*</ICalendarLink>*/}

                <AddToCalendarButton

                    buttonStyle="date"

                    name="Movie: Inception"
                    startDate="2025-09-01"
                    startTime="18:00"
                    endDate="2025-09-02"
                    endTime="00:30"
                    timeZone="Europe/Berlin" // Handles DST automatically
                    options={['Apple', 'Google', 'iCal']}

                    uid={"123"}
                    iCalFileName={"icsdatei"}

                    // inline={true}
                    label="Termin speichern"
                    // hideTextLabelButton={true}

                    // listStyle="modal"
                    pastDateHandling="hide"
                    size="1"
                    lightMode={"dark"}
                    hideBackground={true}
                    hideBranding={true}
                />

                <AddToCalendarButton

                    name="Movie: Inception"
                    startDate="2025-09-01"
                    startTime="18:00"
                    endDate="2025-09-02"
                    endTime="00:30"
                    timeZone="Europe/Berlin" // Handles DST automatically
                    options={['Apple', 'Google', 'iCal']}

                    uid={"123"}
                    iCalFileName={"icsdatei"}

                    inline={true}
                    label="Termin speichern"
                    hideTextLabelButton={true}

                    // listStyle="modal"
                    pastDateHandling="hide"
                    size="1"
                    lightMode={"dark"}
                    hideBackground={true}
                    hideBranding={true}
                />

            </section>
        </div>
    );
}