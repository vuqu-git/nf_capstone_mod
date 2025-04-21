import {useEffect, useState} from "react";

import './Overview.css';

import axios from "axios";
import TerminDTOWithFilmDTOOverviewSemester from "../types/TerminDTOWithFilmDTOOverviewSemester.ts";
import {render} from "../utils/render.tsx";
import {Link} from "react-router-dom";
import BackToTopButton from "./BackToTopButton.tsx";
import {formatDateTime} from "../utils/DateTimeFormatForGallery.ts";


// interface Props {
//
// }

// export default function OverviewSemester({ }: Props) {
export default function OverviewSemester() {

    const [semesterTermine, setSemesterTermine] = useState<TerminDTOWithFilmDTOOverviewSemester[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const getSemesterTermineWithFilmTitles = () => {
        axios.get<TerminDTOWithFilmDTOOverviewSemester[]>("/api/screenings-semester")
            .then((response) => {
                setSemesterTermine(response.data)
            })
            .catch((error) => {
                    const errorMessage = error instanceof Error ? error.message : "Fetching semester films failed";
                    setErrorMessage(errorMessage);
            })
            .finally(() => {
                setIsLoaded(true);
            });
    }

    useEffect(() => {
        getSemesterTermineWithFilmTitles();
    }, [])

    // return (
    //     <div>
    //         <section>
    //             <h1>Semesterprogramm</h1>
    //             {
    //                 semesterTermine && (
    //                     <>
    //                         {semesterTermine.map(termin => {
    //                             const screeningDateObj = formatDateTime(termin.screeningTime, true);
    //
    //                             return (
    //
    //                             // <div
    //                             //     key={termin.terminId}
    //                             //     // style={{display: 'flex',
    //                             //     //         gap: '3rem',
    //                             //     //         alignItems: 'flex-start',
    //                             //     //         marginBottom: '1rem'
    //                             //     // }}
    //                             // >
    //                             //
    //                             //     {/*<div>{formatDateInOverviewArchive(termin.screeningTime)}</div>*/}
    //                             //     <div>{screeningDateObj?.weekday}</div>
    //                             //     <div>{screeningDateObj?.date}</div>
    //                             //     <div>{screeningDateObj?.time}</div>
    //                             //     <Link
    //                             //         to={`/details/${termin.terminId}`}
    //                             //         // style={{ textDecoration: 'none', color: 'inherit' }}
    //                             //         className="custom-link"
    //                             //     >
    //                             //     <div>
    //                             //         {!termin.titel ? render(termin.films[0]?.titel) ?? "" : (
    //                             //             <>
    //                             //                 {render(termin.titel)}
    //                             //                 <ol style={{marginBottom: '0rem',}}>
    //                             //                     {
    //                             //                         termin.films.map(film => (
    //                             //                             <li key={film.filmId}>{render(film.titel)}</li>
    //                             //                         ))
    //                             //                     }
    //                             //                 </ol>
    //                             //             </>
    //                             //         )
    //                             //         }
    //                             //     </div>
    //                             //
    //                             //     </Link>
    //                             // </div>
    //
    //                                 // <div
    //                                 //     key={termin.terminId}
    //                                 //     style={{ display: 'flex', alignItems: 'flex-start' }} // Use flexbox for alignment
    //                                 // >
    //                                 //     <div style={{ flex: '1', textAlign: 'left' }}>
    //                                 //         {screeningDateObj?.weekday}
    //                                 //     </div>
    //                                 //     <div style={{ flex: '4', textAlign: 'right' }}>
    //                                 //         {screeningDateObj?.date}
    //                                 //     </div>
    //                                 //     <div style={{ flex: '4', textAlign: 'right', paddingRight: '20px' }}>
    //                                 //         {screeningDateObj?.time}
    //                                 //     </div>
    //                                 //     <div style={{ flex: '10', textAlign: 'left' }}>
    //                                 //         <Link
    //                                 //             to={`/details/${termin.terminId}`}
    //                                 //             className="custom-link"
    //                                 //             style={{ display: 'inline-block' }} // Change to inline-block
    //                                 //         >
    //                                 //             <div>
    //                                 //                 {!termin.titel ? render(termin.films[0]?.titel) ?? "" : (
    //                                 //                     <>
    //                                 //                         {render(termin.titel)}
    //                                 //                         <ol style={{ marginBottom: '0rem' }}>
    //                                 //                             {termin.films.map((film) => (
    //                                 //                                 <li key={film.filmId}>{render(film.titel)}</li>
    //                                 //                             ))}
    //                                 //                         </ol>
    //                                 //                     </>
    //                                 //                 )}
    //                                 //             </div>
    //                                 //         </Link>
    //                                 //     </div>
    //                                 // </div>
    //
    //                                 // table elements
    //                                 <div key={termin.terminId} style={{ marginBottom: '0.5rem' }}>
    //                                     <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    //                                         <tbody>
    //                                         <tr>
    //                                             <td style={{ width: '40px', paddingRight: '1rem', whiteSpace: 'nowrap', verticalAlign: 'top' }}>
    //                                                 {screeningDateObj?.weekday}
    //                                             </td>
    //                                             <td style={{ width: '90px', paddingRight: '1rem', whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'right' }}>                                                    {screeningDateObj?.date}
    //                                             </td>
    //                                             <td style={{ width: '70px', paddingRight: '2rem', whiteSpace: 'nowrap', verticalAlign: 'top', textAlign: 'right'  }}>
    //                                                 {screeningDateObj?.time}
    //                                             </td>
    //                                             <td style={{ width: 'auto', verticalAlign: 'top' }}>
    //
    //                                                 {/*<Link*/}
    //                                                 {/*    to={`/details/${termin.terminId}`}*/}
    //                                                 {/*    className="custom-link"*/}
    //                                                 {/*>*/}
    //                                                 {/*    <div>*/}
    //                                                 {/*        {!termin.titel ? render(termin.films[0]?.titel) ?? "" : (*/}
    //                                                 {/*            <>*/}
    //                                                 {/*                {render(termin.titel)}*/}
    //                                                 {/*                <ol style={{ marginBottom: '0rem' }}>*/}
    //                                                 {/*                    {termin.films.map(film => (*/}
    //                                                 {/*                        <li key={film.filmId}>{render(film.titel)}</li>*/}
    //                                                 {/*                    ))}*/}
    //                                                 {/*                </ol>*/}
    //                                                 {/*            </>*/}
    //                                                 {/*        )}*/}
    //                                                 {/*    </div>*/}
    //                                                 {/*</Link>*/}
    //
    //                                                 {!termin.titel ? (
    //                                                     <>
    //                                                     <Link
    //                                                         to={`/details/${termin.terminId}`}
    //                                                         className="custom-link"
    //                                                     >
    //                                                         {render(termin.films[0]?.titel) ?? ""}
    //                                                     </Link>
    //                                                         {termin.films[0]?.besonderheit && (
    //                                                             <p style={{ fontSize: '0.75em',
    //                                                                         marginBottom: '0.5rem'
    //                                                             }}>
    //                                                                 {render(termin.films[0]?.besonderheit) ?? ""}
    //                                                             </p>
    //                                                         )}                                                        </>
    //                                                 ) : (
    //                                                     <Link
    //                                                         to={`/details/${termin.terminId}`}
    //                                                         className="custom-link"
    //                                                     >
    //                                                         {render(termin.titel)}
    //                                                         <ol style={{ marginBottom: '0rem' }}>
    //                                                             {termin.films.map(film => (
    //                                                                 <li key={film.filmId}>{render(film.titel)}</li>
    //                                                             ))}
    //                                                         </ol>
    //                                                     </Link>
    //                                                 )}
    //
    //                                             </td>
    //                                         </tr>
    //                                         </tbody>
    //                                     </table>
    //                                 </div>
    //
    //                         )
    //                         }
    //                         )
    //                         }
    //                    </>
    //                 )
    //             }
    //         </section>
    //
    //         <BackToTopButton />
    //     </div>
    // );

    return (
        <div>
            <section>
                <h1>Semesterübersicht</h1>

                {errorMessage && (
                    <div className="text-danger mb-3">{errorMessage}</div>
                )}
                {!errorMessage && isLoaded && semesterTermine.length === 0 && (
                    <p>Die Termine für das Semester werden demnächst veröffentlicht.</p>
                )}

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
            <BackToTopButton />
        </div>
    );
};