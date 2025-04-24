
import './Overview.css';

import TerminDTOWithFilmDTOOverviewSemester from "../types/TerminDTOWithFilmDTOOverviewSemester.ts";
import {render} from "../utils/render.tsx";
import {Link, useLoaderData} from "react-router-dom";
import {formatDateTime} from "../utils/DateTimeFormatForGallery.ts";


// interface Props {
//
// }

// export default function OverviewSemester({ }: Props) {
export default function OverviewSemester() {

    const semesterTermine = useLoaderData<TerminDTOWithFilmDTOOverviewSemester[]>();


    return (
        <div>
            <section>
                <h1>Semesterübersicht</h1>

                {/*{!errorMessage && isLoaded && semesterTermine.length === 0 && (*/}
                {/*    <p>Die Termine für das Semester werden demnächst veröffentlicht.</p>*/}
                {/*)}*/}

                {semesterTermine && semesterTermine.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>

                        <tbody>
                        {semesterTermine.map(termin => {
                            const screeningDateObj = formatDateTime(termin.screeningTime, true, true);
                            return (
                                <tr key={termin.terminId}>
                                    <td style={{ padding: '0.5rem 0.25rem', whiteSpace: 'nowrap' }}>
                                        {screeningDateObj?.weekday}
                                    </td>
                                    <td style={{ padding: '0.5rem 0.25rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
                                        {screeningDateObj?.date}
                                    </td>
                                    <td style={{ padding: '0.5rem 2rem 0.5rem 0.25rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
                                        {screeningDateObj?.time}
                                    </td>
                                    <td style={{ padding: '0.5rem 0' }}>
                                        {!termin.titel ? (
                                            <>
                                                <Link
                                                    to={`/details/${termin.terminId}`}
                                                    className="custom-link"
                                                >
                                                    {render(termin.films[0]?.titel) ?? ""}
                                                </Link>
                                                {termin.films[0]?.besonderheit && (
                                                    <p style={{ fontSize: '0.75em', marginBottom: '0' }}>
                                                        {render(termin.films[0]?.besonderheit) ?? ""}
                                                    </p>
                                                )}
                                            </>
                                        ) : (
                                            <Link
                                                to={`/details/${termin.terminId}`}
                                                className="custom-link"
                                            >
                                                {render(termin.titel)}
                                                <ol style={{ marginBottom: '0' }}>
                                                    {termin.films.map(film => (
                                                        <li key={film.filmId}>{render(film.titel)}</li>
                                                    ))}
                                                </ol>
                                            </Link>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                ) : null} {/* else' part with null */}
            </section>
        </div>
    );
};