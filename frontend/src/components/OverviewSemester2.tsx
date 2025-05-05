//
// import './Overview.css';
//
// import TerminDTOWithFilmDTOOverviewSemester from "../types/TerminDTOWithFilmDTOOverviewSemester.ts";
// import {render} from "../utils/render.tsx";
// import {Link, useLoaderData} from "react-router-dom";
// import {formatDateTime} from "../utils/DateTimeFormatForGallery.ts";
//
//
// // interface Props {
// //
// // }
//
// // export default function OverviewSemester({ }: Props) {
// export default function OverviewSemester() {
//
//     const semesterTermine = useLoaderData<TerminDTOWithFilmDTOOverviewSemester[]>();
//
//
//     return (
//         <div>
//             <section>
//                 <h1>Semesterübersicht</h1>
//
//                 {/*{!errorMessage && isLoaded && semesterTermine.length === 0 && (*/}
//                 {/*    <p>Die Termine für das Semester werden demnächst veröffentlicht.</p>*/}
//                 {/*)}*/}
//
//                 {semesterTermine && semesterTermine.length > 0 ? (
//                     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//
//                         <tbody>
//                         {semesterTermine.map(termin => {
//                             const screeningDateObj = formatDateTime(termin.screeningTime, true, true);
//                             return (
//                                 <tr key={termin.terminId}>
//                                     <td style={{ padding: '0.5rem 0.25rem', whiteSpace: 'nowrap' }}>
//                                         {screeningDateObj?.weekday}
//                                     </td>
//                                     <td style={{ padding: '0.5rem 0.25rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
//                                         {screeningDateObj?.date}
//                                     </td>
//                                     <td style={{ padding: '0.5rem 2rem 0.5rem 0.25rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
//                                         {screeningDateObj?.time}
//                                     </td>
//                                     <td style={{ padding: '0.5rem 0' }}>
//                                         {!termin.titel ? (
//                                             <>
//                                                 <Link
//                                                     to={`/details/${termin.terminId}`}
//                                                     className="custom-link"
//                                                 >
//                                                     {render(termin.films[0]?.titel) ?? ""}
//                                                 </Link>
//                                                 {termin.films[0]?.besonderheit && (
//                                                     <p style={{ fontSize: '0.75em', marginBottom: '0' }}>
//                                                         {render(termin.films[0]?.besonderheit) ?? ""}
//                                                     </p>
//                                                 )}
//                                             </>
//                                         ) : (
//                                             <Link
//                                                 to={`/details/${termin.terminId}`}
//                                                 className="custom-link"
//                                             >
//                                                 {render(termin.titel)}
//                                                 <ol style={{ marginBottom: '0' }}>
//                                                     {termin.films.map(film => (
//                                                         <li key={film.filmId}>{render(film.titel)}</li>
//                                                     ))}
//                                                 </ol>
//                                             </Link>
//                                         )}
//                                     </td>
//                                 </tr>
//                             );
//                         })}
//                         </tbody>
//                     </table>
//                 ) : null} {/* else' part with null */}
//             </section>
//         </div>
//     );
// };


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
        <div>
            <section style={{paddingLeft: '0.75rem', paddingRight: '0.5rem'}}>
                <h1 className="mb-4">Semesterübersicht</h1>

                {semesterTermine && semesterTermine.length > 0 && (
                    <div className="overview-container">
                        {semesterTermine.map(termin => {

                            const screeningDateObj = formatDateTime(termin.vorstellungsbeginn, true, true);
                            const calenderDateObj = createDateAndTimeForAddToCalendarButton(termin.vorstellungsbeginn, termin.screeningTotalDuration);

                            const calenderTitle = termin.titel ? termin.titel : termin.mainfilms[0].titel;
                            const icsFileName = createICSFileName(calenderTitle, termin.vorstellungsbeginn);


                            return (
                                <div key={termin.tnr} className="overview-row">
                                    <div className="overview-date">



                                        <div className="weekday">{screeningDateObj?.weekday}</div>
                                        <div className="date">{screeningDateObj?.date} {screeningDateObj?.time}</div>

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
                                            <>
                                                <Link to={`/details/${termin.tnr}`} className="custom-link">
                                                    {renderHtmlText(termin.mainfilms[0]?.titel) ?? ""}
                                                </Link>
                                                {termin.mainfilms[0]?.besonderheit && (
                                                    <p className="besonderheit">
                                                        {renderHtmlText(termin.mainfilms[0]?.besonderheit) ?? ""}
                                                    </p>
                                                )}
                                            </>
                                        ) : (
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
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>
        </div>
    );
}