import {useEffect, useState} from "react";

import './Overview.css';

import axios from "axios";
import TerminDTOWithFilmDTOOverviewArchive from "../types/TerminDTOWithFilmDTOOverviewArchive.ts";
import {formatDateInOverviewArchive} from "../utils/formatDateInOverviewArchive.ts";
import {render} from "../utils/render.tsx";
import {Link} from "react-router-dom";

// interface Props {
//
// }

// export default function OverviewArchive({ }: Props) {
export default function OverviewArchive() {

    const [archiveTermine, setArchiveTermine] = useState<TerminDTOWithFilmDTOOverviewArchive[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const getArchiveTermineWithFilmTitles = () => {

        axios.get<TerminDTOWithFilmDTOOverviewArchive[]>("/api/screenings-archive")
            .then((response) => {
                setArchiveTermine(response.data)
            })
            .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Fetching archive films failed";
                    setErrorMessage(errorMessage);
            })
            .finally(() => {
            });
    }

    useEffect(() => {
        getArchiveTermineWithFilmTitles();
    }, [])

    return (
        <div>
            <section>
                <h1>Programmarchiv</h1>

                {errorMessage && (
                    <div className="text-danger mb-3">{errorMessage}</div>
                )}

                {archiveTermine && archiveTermine.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                        {archiveTermine.map(termin => (
                            <tr key={termin.tnr}>
                                <td style={{ padding: '0.5rem 2rem 0.5rem 0.25rem', whiteSpace: 'nowrap', textAlign: 'right' }}>
                                    {formatDateInOverviewArchive(termin.screeningTime)}
                                </td>
                                <td style={{ padding: '0.5rem 0' }}>
                                    <Link
                                        to={`/details/${termin.tnr}`}
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
                        ))}
                        </tbody>
                    </table>
                ) : null} {/* 'else' part with null */}
            </section>
        </div>

    );
};