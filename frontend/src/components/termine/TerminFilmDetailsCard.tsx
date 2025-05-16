import Card from 'react-bootstrap/Card';
import {renderHtmlText} from "../../utils/renderHtmlText.tsx";

import './TerminFilmDetailsCard.css';
import FilmDTOFormPlus from "../../types/FilmDTOFormPlus.ts";
import TerminFilmDetailsListing from "./TerminFilmDetailsCardFilmListing.tsx";
import {createICSFileName} from "../../utils/createICSFileName.ts";
import {AddToCalendarButton} from "add-to-calendar-button-react";
import {createDateAndTimeForAddToCalendarButton} from "../../utils/createDateAndTimeForAddToCalendarButton.ts";

interface Props {
    tnr: string | undefined;

    screeningWeekday: string | undefined;
    screeningDate: string | undefined;
    screeningTime: string | undefined;

    vorstellungsbeginnIso8601: string | undefined;

    screeningSonderfarbe: string | undefined;

    // these 3 items refer to the displayed entries above (wrt to programm titel or main feature titel)
    programmtitel: string | undefined | null;
    programmtext: string | undefined | null;
    programmbesonderheit: string | undefined | null;

    mainfilms: FilmDTOFormPlus[];
    vorfilms: FilmDTOFormPlus[];

    terminGesamtlaufzeit: number;
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

    return (
        <Card
            className="terminFilm-card"
        >
            <Card.Body>
                <Card.Header
                    as="h4"
                    className="terminFilm-card-header"
                >

                    <div className="add-to-calendar-button-container">
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
                    className="program-title"
                >
                    {renderHtmlText(programmtitel)}
                </Card.Title>

                {programmtext && (
                    <Card.Text className="program-text">
                        {renderHtmlText(programmtext)}
                    </Card.Text>
                )}

                {programmbesonderheit && (
                    <Card.Text className="program-text">
                        {renderHtmlText(programmbesonderheit)}
                    </Card.Text>
                )}

                {/*###############################################*/}

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
                            fType={(mainfilms.length == 1) ? "" : "Film:"}
                        />
                    );
                })}

                {vorfilms.map((filmPlusObj, index) => {
                    const vorfilm = filmPlusObj.film;

                    // Check if film properties exist
                    if (!vorfilm) return null;

                    return (
                        <TerminFilmDetailsListing
                            key={index}
                            index={index}
                            f={vorfilm}
                            numberOfF={vorfilms.length}
                            fType={"Vorfilm:"}
                        />
                    );
                })}
            </Card.Body>
        </Card>
    );
}