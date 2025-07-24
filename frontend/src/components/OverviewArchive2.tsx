import './OverviewAndProgram.css';

import {formatDateInOverviewArchive} from "../utils/formatDateInOverviewArchive.ts";
import {renderHtmlText} from "../utils/renderHtmlText.tsx";
import {Link, useLoaderData} from "react-router-dom";
import {JSX} from "react";
import {ArchiveData} from "../App2.tsx";

export default function OverviewArchive2() {

    const {screeningArchiveEntries, allPdfs} = useLoaderData<ArchiveData>();

    const renderArchiveWithSemesterHeaders = () => {
        if (!screeningArchiveEntries || screeningArchiveEntries.length === 0) {
            return null;
        }

        const rowsForArchiveEntries: JSX.Element[] = [];
        let lastSemester: string | undefined = '';

        // for (let i = 0; i < screeningArchiveEntries.length; i++) {
        //     const termin = screeningArchiveEntries[i];
        for (const termin of screeningArchiveEntries) {

            if (!termin.vorstellungsbeginn) continue;
            
            // const screeningDate = new Date(termin.vorstellungsbeginn);

            // const year = screeningDate.getFullYear();
            // const month = screeningDate.getMonth() + 1; // Month is 0-indexed
            //
            // let currentSemester = '';
            // let headerText = '';
            //
            // if (month < 4) {
            //     currentSemester = `Wintersemester ${year - 1}/${year}`;
            //     if (lastSemester !== currentSemester) {
            //         headerText = currentSemester;
            //     }
            // } else if (month < 10) {
            //     currentSemester = `Sommersemester ${year}`;
            //     if (lastSemester !== currentSemester) {
            //         headerText = currentSemester;
            //     }
            // } else {
            //     currentSemester = `Wintersemester ${year}/${year + 1}`;
            //     if (lastSemester !== currentSemester) {
            //         headerText = currentSemester;
            //     }
            // }

            const currentSemester = termin.semester;
            const headerText = (lastSemester !== currentSemester) ? currentSemester : '';

            if (headerText) {
                rowsForArchiveEntries.push(
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

            rowsForArchiveEntries.push(
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
                <tbody>{rowsForArchiveEntries}</tbody>
            </table>
        );
    };

    return (
        <section className="normal-content-container">
            <h2>Programmarchiv</h2>
            {renderArchiveWithSemesterHeaders()}
        </section>
    );
}