import Card from 'react-bootstrap/Card';
import {renderHtmlText} from "../../utils/renderHtmlText.tsx";

import './TerminFilmDetailsCard.css';



import FilmDTOFormPlus from "../../types/FilmDTOFormPlus.ts";
import TerminFilmDetailsListing from "./TerminFilmDetailsCardFilmListing.tsx";

import {createCalenderEvent} from "../../utils/createCalenderEvent.ts";
import {createICSFileName} from "../../utils/createICSFileName.ts";

import {AddToCalendarButton} from "add-to-calendar-button-react";
import {createDateAndTimeForAddToCalendarButton} from "../../utils/createDateAndTimeForAddToCalendarButton.ts";


interface Props {
    tnr: string | undefined;

    screeningWeekday: string | undefined;
    screeningDate: string | undefined;
    screeningTime: string | undefined;

    vorstellungsbeginnIso8601: string | undefined;

    screeningSonderfarbe: number | undefined;

    // these 3 items refer to the displayed entries above (wrt to programm titel or main feature titel)
    programmtitel: string | undefined | null;
    programmtext: string | undefined | null;
    programmbesonderheit: string | undefined | null;

    mainfilms: FilmDTOFormPlus[];
    vorfilms: FilmDTOFormPlus[];

    terminGesamtlaufzeit: number;
}
            // utils
            function getDtstamp(now) {
                const year = now.getUTCFullYear();
                const month = now.getUTCMonth() + 1; // JS months are 0-based

                if (month >= 4 && month <= 9) {
                    // April to September
                    return `${year}0401T000000Z`;
                } else if (month <= 3) {
                    // January to March
                    return `${year - 1}1001T000000Z`;
                } else {
                    // October to December
                    return `${year}1001T000000Z`;
                }
            }

export default function TerminFilmDetailsCard({
                                                  tnr,

                                                  screeningWeekday,
                                                  screeningDate,
                                                  screeningTime,

                                                  vorstellungsbeginnIso8601,

                                                  screeningSonderfarbe,

                                                  programmtitel,
                                                  programmtext,
                                                  programmbesonderheit,

                                                  mainfilms,
                                                  vorfilms,

                                                  terminGesamtlaufzeit,
                                              }: Props) {

    const calenderTitle = programmtitel ? programmtitel : mainfilms[0].film.titel ?? "Film in der Pupille";

    const icsFileName = createICSFileName(calenderTitle, vorstellungsbeginnIso8601);
    const calenderDateObj = createDateAndTimeForAddToCalendarButton(vorstellungsbeginnIso8601, terminGesamtlaufzeit);


const rawContent = `UID:${tnr}-uniqueid@pupille.org
DTSTAMP:${getDtstamp( new Date() )}`;

    return (
        <Card
            className="pupille-glow"
            style={{
                backgroundColor: '#0D0D0C',
                borderRadius: '15px',
                overflow: 'hidden',
                marginTop: '3rem',
                marginBottom: '3rem',
            }}
            text="light"
        >
            <Card.Body>
                <Card.Header
                    as="h4"
                    className="text-end"
                    style={{
                        color: '#FFD036',
                        backgroundColor: "inherit",
                        borderBottom: "inherit",
                        marginBottom: '0.0rem',
                    }}
                >

                    <div style={{ display: "flex", justifyContent: "center", marginBottom: '0.5rem', }}>
                        <AddToCalendarButton
                            name={"Pupille: " + calenderTitle}
                            startDate={calenderDateObj.startDate}
                            startTime={calenderDateObj.startTime}
                            endDate={calenderDateObj.endDate}
                            endTime={calenderDateObj.endTime}
                            timeZone="Europe/Berlin" // Handles DST automatically

                            options={['Apple', 'Google', 'iCal']}
                            uid={tnr + "-uidTermin@pupille.org"}
                            iCalFileName={"pupille-" +  icsFileName}

                            trigger="click"

                            // inline={true}
                            label="Termin speichern"
                            // hideTextLabelButton={true}

                            pastDateHandling="hide"
                            size="2"
                            lightMode={"dark"}
                            // hideBackground={true}
                            hideBranding={true}
                        />
                    </div>

                    {screeningWeekday} | {screeningDate} | {screeningTime}
                </Card.Header>

                <Card.Title
                    as="h3"
                    style={{
                        color: '#FFD036',
                        marginTop: '1.5rem',
                        marginBottom: '1.5rem'
                    }}
                >
                    {renderHtmlText(programmtitel)}
                </Card.Title>

                {programmtext && (
                    <Card.Text style={{color: '#cfd6e1'}}>
                        {renderHtmlText(programmtext)}
                    </Card.Text>
                )}

                {programmbesonderheit && (
                    <Card.Text style={{color: '#cfd6e1'}}>
                        {renderHtmlText(programmbesonderheit)}
                    </Card.Text>
                )}


                {/*###############################*/}

                {mainfilms.map((filmPlusObj, index) => {
                    const film = filmPlusObj.film;

                    // Check if film properties exist
                    if (!film) return null;

                    return (
                        <TerminFilmDetailsListing
                            key={index}
                            index={index}
                            f={film}
                            numberOfF={mainfilms.length}
                            fType={(mainfilms.length == 1) ? "" : "Film: "}
                        />
                    );
                })}

                {vorfilms.map((filmPlusObj, index) => {
                    const film = filmPlusObj.film;

                    // Check if film properties exist
                    if (!film) return null;

                    return (
                        <TerminFilmDetailsListing
                            key={index}
                            index={index}
                            f={film}
                            numberOfF={vorfilms.length}
                            fType={"Vorfilm: "}
                        />
                    );
                })}
            </Card.Body>
        </Card>
    );
}