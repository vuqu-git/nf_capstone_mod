// import './Overview.css';
//
// import TerminDTOWithFilmDTOOverviewArchive from "../types/TerminDTOWithFilmDTOOverviewArchive.ts";
// import {formatDateInOverviewArchive} from "../utils/formatDateInOverviewArchive.ts";
// import {render} from "../utils/render.tsx";
// import {Link, useLoaderData} from "react-router-dom";
//
// // interface Props {
// //
// // }
//
// // export default function OverviewArchive({ }: Props) {
// export default function OverviewArchive2() {
//
//     const archiveTermine = useLoaderData<TerminDTOWithFilmDTOOverviewArchive[]>();
//
//     return (
//         <div>
//             <section>
//                 <h1>Programmarchiv</h1>
//
//                 {archiveTermine && archiveTermine.length > 0 ? (
//                     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//                         <tbody>
//                         {archiveTermine.map(termin => (
//                             <tr key={termin.terminId}>
//                                 <td style={{ padding: '0.5rem 2rem 0.5rem 0.25rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
//                                     {formatDateInOverviewArchive(termin.screeningTime)}
//                                 </td>
//                                 <td style={{ padding: '0.5rem 0' }}>
//                                     <Link
//                                         to={`/details/${termin.terminId}`}
//                                         className="custom-link"
//                                     >
//                                         {!termin.titel ? (
//                                             <>
//                                                 {render(termin.films[0]?.titel) ?? ""}
//                                             </>
//                                         ) : (
//                                             <>
//                                                 {render(termin.titel)}
//                                                 <ol style={{ marginBottom: '0rem' }}>
//                                                     {termin.films.map(film => (
//                                                         <li key={film.filmId}
//                                                             style={{ fontSize: '0.75em'}}
//                                                         >
//                                                             {render(film.titel)}
//                                                         </li>
//                                                     ))}
//                                                 </ol>
//                                             </>
//                                         )}
//                                     </Link>
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 ) : null} {/* 'else' part with null */}
//             </section>
//         </div>
//
//     );
// };


import './Overview.css';

import TerminDTOWithFilmDTOOverviewArchive from "../types/TerminDTOWithFilmDTOOverviewArchive.ts";
import {formatDateInOverviewArchive} from "../utils/formatDateInOverviewArchive.ts";
import {render} from "../utils/render.tsx";
import {Link, useLoaderData} from "react-router-dom";
import {JSX} from "react";

export default function OverviewArchive2() {

    const archiveTermine = useLoaderData<TerminDTOWithFilmDTOOverviewArchive[]>();

    const renderArchiveWithSemesterHeaders = () => {
        if (!archiveTermine || archiveTermine.length === 0) {
            return null;
        }

        const rows: JSX.Element[] = [];
        let lastSemester = '';

        for (let i = 0; i < archiveTermine.length; i++) {
            const termin = archiveTermine[i];

            if (!termin.screeningTime) continue;
            const screeningDate = new Date(termin.screeningTime);

            const year = screeningDate.getFullYear();
            const month = screeningDate.getMonth() + 1; // Month is 0-indexed

            let currentSemester = '';
            let headerText = '';

            if (month < 4) {
                currentSemester = `Wintersemester ${year - 1}/${year}`;
                if (lastSemester !== currentSemester) {
                    headerText = currentSemester;
                }
            } else if (month < 10) {
                currentSemester = `Sommersemester ${year}`;
                if (lastSemester !== currentSemester) {
                    headerText = currentSemester;
                }
            } else {
                currentSemester = `Wintersemester ${year}/${year + 1}`;
                if (lastSemester !== currentSemester) {
                    headerText = currentSemester;
                }
            }

            if (headerText) {
                rows.push(
                    <tr key={`header-${currentSemester}`} style={{ backgroundColor: '#ffd036' }}>
                        <td
                            style={{
                                padding: '0.3rem',
                                fontWeight: 'bold',
                                color: 'black',
                            }}
                            colSpan={2}
                        >
                            {headerText}
                        </td>
                    </tr>
                );
            }

            rows.push(
                <tr key={termin.terminId}>
                    <td style={{ padding: '0.5rem 2rem 0.5rem 0.25rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
                        {formatDateInOverviewArchive(termin.screeningTime)}
                    </td>
                    <td style={{ padding: '0.5rem 0' }}>
                        <Link
                            to={`/details/${termin.terminId}`}
                            className="custom-link"
                        >
                            {!termin.titel ? (
                                <>
                                    {render(termin.films[0]?.titel) ?? ""}
                                </>
                            ) : (
                                <>
                                    {render(termin.titel)}
                                    <ol style={{ marginBottom: '0rem' }}>
                                        {termin.films.map(film => (
                                            <li key={film.filmId}
                                                style={{ fontSize: '0.75em'}}
                                            >
                                                {render(film.titel)}
                                            </li>
                                        ))}
                                    </ol>
                                </>
                            )}
                        </Link>
                    </td>
                </tr>
            );

            lastSemester = currentSemester;
        }

        return (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>{rows}</tbody>
            </table>
        );
    };

    return (
        <div>
            <section>
                <h1>Programmarchiv</h1>
                {renderArchiveWithSemesterHeaders()}
            </section>
        </div>
    );
}