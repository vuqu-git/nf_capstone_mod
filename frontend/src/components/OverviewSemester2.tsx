// import './Overview.css';
//
// import {Link, useLoaderData} from "react-router-dom";
// import TerminDTOWithFilmDTOOverviewSemester from "../types/TerminDTOWithFilmDTOOverviewSemester.ts";
// import {formatDateTime} from "../utils/DateTimeFormatForGallery.ts";
// import {renderHtmlText} from "../utils/renderHtmlText.tsx";
// import {AddToCalendarButton} from "add-to-calendar-button-react";
// import {createDateAndTimeForAddToCalendarButton} from "../utils/createDateAndTimeForAddToCalendarButton.ts";
// import {createICSFileName} from "../utils/createICSFileName.ts";
//
// export default function OverviewSemester() {
//     const semesterTermine = useLoaderData<TerminDTOWithFilmDTOOverviewSemester[]>();
//
//     return (
//         <section className="normal-content-container">
//             <h2>Semesterübersicht</h2>
//
//             {semesterTermine && semesterTermine.length > 0 && (
//                 <div className="overview-container">
//                     {semesterTermine.map(termin => {
//
//                         const screeningDateObj = formatDateTime(termin.vorstellungsbeginn, true, true);
//                         const calenderDateObj = createDateAndTimeForAddToCalendarButton(termin.vorstellungsbeginn, termin.terminGesamtlaufzeit);
//
//                         const calenderTitle = termin.titel ?? termin.mainfilms[0].titel;
//                         const icsFileName = createICSFileName(calenderTitle, termin.vorstellungsbeginn);
//
//                         return (
//                             <div key={termin.tnr} className="overview-row">
//                                 <div className="overview-date">
//
//                                     <div className="weekday">{screeningDateObj?.weekday}</div>
//                                     <div className="datetime">{screeningDateObj?.date} {screeningDateObj?.time}</div>
//
//                                     <div className="calendar">
//                                         <AddToCalendarButton
//                                             name={"Pupille: " + calenderTitle}
//                                             startDate={calenderDateObj.startDate}
//                                             startTime={calenderDateObj.startTime}
//                                             endDate={calenderDateObj.endDate}
//                                             endTime={calenderDateObj.endTime}
//                                             timeZone="Europe/Berlin" // Handles DST automatically
//                                             options={['Apple', 'Google', 'iCal']}
//
//                                             uid={termin.tnr + "-uidTermin@pupille.org"}
//                                             iCalFileName={"pupille-" +  icsFileName}
//
//                                             inline={true}
//                                             hideTextLabelButton={true}
//
//                                             pastDateHandling="hide"
//                                             size="0"
//                                             lightMode={"dark"}
//                                             // hideBackground={true}
//                                             hideBranding={true}
//                                             buttonStyle="round"
//                                         />
//                                     </div>
//                                 </div>
//
//                                 <div className="overview-title">
//                                     {!termin.titel ? (
//                                         // case: Hauptfilm + evtl Vorfilm
//                                         <>
//                                             <Link to={`/details/${termin.tnr}`} className="custom-link">
//                                                 {renderHtmlText(termin.mainfilms[0]?.titel) ?? ""}
//                                             </Link>
//
//                                             { (termin.mainfilms[0]?.regie || termin.mainfilms[0]?.jahr || termin.mainfilms[0]?.laufzeit) &&
//                                                 <p className="filminfo-and-stab-details filminfo-in-semester-overview">
//                                                     {[
//                                                         termin.mainfilms[0]?.regie,
//                                                         termin.mainfilms[0]?.jahr,
//                                                         termin.mainfilms[0]?.laufzeit !== undefined ? termin.mainfilms[0]?.laufzeit + " Min." : undefined
//                                                     ].filter(Boolean).join(', ')}
//                                                 </p>
//                                             }
//
//                                             {termin.mainfilms[0]?.besonderheit && (
//                                                 <p className="besonderheit">
//                                                     {renderHtmlText(termin.mainfilms[0]?.besonderheit) ?? ""}
//                                                 </p>
//                                             )}
//                                         </>
//                                     ) : (
//                                         // Filmprogramm
//                                         <Link to={`/details/${termin.tnr}`} className="custom-link">
//                                             {renderHtmlText(termin.titel)}
//                                             <ol className="film-list">
//                                                 {termin.mainfilms.map(film => (
//                                                     <li key={film.filmId}>{renderHtmlText(film.titel)}</li>
//                                                 ))}
//                                             </ol>
//                                         </Link>
//                                     )}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </section>
//     );
// }

import './Overview.css';

import {Link, useLoaderData} from "react-router-dom";
import TerminDTOWithFilmDTOOverviewSemester from "../types/TerminDTOWithFilmDTOOverviewSemester.ts";
import {formatDateTime} from "../utils/DateTimeFormatForGallery.ts";
import {renderHtmlText} from "../utils/renderHtmlText.tsx";
import {AddToCalendarButton} from "add-to-calendar-button-react";
import {createDateAndTimeForAddToCalendarButton} from "../utils/createDateAndTimeForAddToCalendarButton.ts";
import {createICSFileName} from "../utils/createICSFileName.ts";

export default function OverviewSemester() {
    const semesterTermine = useLoaderData<TerminDTOWithFilmDTOOverviewSemester[]>();

    return (
        <section className="normal-content-container">
            <h2>Semesterübersicht</h2>

            {semesterTermine && semesterTermine.length > 0 && (
                <ul className="overview-container">
                    {semesterTermine.map(termin => {

                        const screeningDateObj = formatDateTime(termin.vorstellungsbeginn, true, true);
                        const calenderDateObj = createDateAndTimeForAddToCalendarButton(termin.vorstellungsbeginn, termin.terminGesamtlaufzeit);

                        const calenderTitle = termin.titel ?? termin.mainfilms[0].titel;
                        const icsFileName = createICSFileName(calenderTitle, termin.vorstellungsbeginn);

                        return (
                            <li key={termin.tnr} className="overview-row">
                                <div className="overview-date">

                                    <div className="weekday">{screeningDateObj?.weekday}</div>
                                    <div className="datetime">{screeningDateObj?.date} {screeningDateObj?.time}</div>

                                    <div className="calendar">
                                        <AddToCalendarButton
                                            name={"Pupille: " + calenderTitle}
                                            startDate={calenderDateObj.startDate}
                                            startTime={calenderDateObj.startTime}
                                            endDate={calenderDateObj.endDate}
                                            endTime={calenderDateObj.endTime}
                                            timeZone="Europe/Berlin" // Handles DST automatically
                                            options={['Apple', 'Google', 'iCal']}

                                            uid={termin.tnr + "-uidTermin@pupille.org"}
                                            iCalFileName={"pupille-" +  icsFileName}

                                            inline={true}
                                            hideTextLabelButton={true}

                                            pastDateHandling="hide"
                                            size="0"
                                            lightMode={"dark"}
                                            // hideBackground={true}
                                            hideBranding={true}
                                            buttonStyle="round"
                                        />
                                    </div>
                                </div>

                                <div className="overview-title">
                                    {!termin.titel ? (
                                        // case: Hauptfilm + evtl Vorfilm
                                        <>
                                            <Link to={`/details/${termin.tnr}`} className="custom-link">
                                                {renderHtmlText(termin.mainfilms[0]?.titel) ?? ""}
                                            </Link>

                                            { (termin.mainfilms[0]?.regie || termin.mainfilms[0]?.jahr || termin.mainfilms[0]?.laufzeit) &&
                                                <p className="filminfo-and-stab-details filminfo-in-semester-overview">
                                                    {[
                                                        termin.mainfilms[0]?.regie,
                                                        termin.mainfilms[0]?.jahr,
                                                        termin.mainfilms[0]?.laufzeit !== undefined ? termin.mainfilms[0]?.laufzeit + " Min." : undefined
                                                    ].filter(Boolean).join(', ')}
                                                </p>
                                            }

                                            {termin.mainfilms[0]?.besonderheit && (
                                                <p className="besonderheit">
                                                    {renderHtmlText(termin.mainfilms[0]?.besonderheit) ?? ""}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        // Filmprogramm
                                        <Link to={`/details/${termin.tnr}`} className="custom-link">
                                            {renderHtmlText(termin.titel)}
                                            <ol className="film-list">
                                                {termin.mainfilms.map(film => (
                                                    <li key={film.filmId}>{renderHtmlText(film.titel)}</li>
                                                ))}
                                            </ol>
                                        </Link>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
}