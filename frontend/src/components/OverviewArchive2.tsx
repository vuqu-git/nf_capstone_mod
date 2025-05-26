import './Overview.css';

import TerminDTOWithFilmDTOOverviewArchive from "../types/TerminDTOWithFilmDTOOverviewArchive.ts";
import {formatDateInOverviewArchive} from "../utils/formatDateInOverviewArchive.ts";
import {renderHtmlText} from "../utils/renderHtmlText.tsx";
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

            if (!termin.vorstellungsbeginn) continue;
            const screeningDate = new Date(termin.vorstellungsbeginn);

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
                    <tr key={`header-${currentSemester}`} className="semester-header-row">
                        <td
                            className="semester-header-cell"
                            colSpan={2}
                        >
                            {headerText}
                        </td>
                    </tr>
                );
            }

            rows.push(
                <tr key={termin.tnr}>
                    <td className="screening-date-cell">
                        {formatDateInOverviewArchive(termin.vorstellungsbeginn)}
                    </td>
                    <td className="screening-title-cell">
                        <Link
                            to={`/details/${termin.tnr}`}
                            className="custom-link"
                        >
                            {!termin.titel ? (
                                <>
                                    {renderHtmlText(termin.films[0]?.titel) ?? ""}
                                </>
                            ) : (
                                <>
                                    {renderHtmlText(termin.titel)}
                                    <ol className="multiple-films-list">
                                        {termin.films.map(film => (
                                            <li key={film.fnr} className="multiple-films-list-item">
                                                {renderHtmlText(film.titel)}
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
            <table>
                <tbody>{rows}</tbody>
            </table>
        );
    };

    return (
        <div>
            <section className="normal-content-container">
                <h2>Programmarchiv</h2>
                {renderArchiveWithSemesterHeaders()}
            </section>
        </div>
    );
}