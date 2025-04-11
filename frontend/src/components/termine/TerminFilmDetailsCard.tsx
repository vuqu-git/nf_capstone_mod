import Card from 'react-bootstrap/Card';
import {render} from "../../utils/render.tsx";

import './TerminFilmDetailsCard.css';



import FilmDTOFormPlus from "../../types/FilmDTOFormPlus.ts";
import TerminFilmDetailsListing from "./TerminFilmDetailsCardFilmListing.tsx";


interface Props {
    screeningWeekday: string | undefined;
    screeningDate: string | undefined;
    screeningTime: string | undefined;
    screeningSonderfarbe: number | undefined;

    // these 3 items refer to the displayed entries above (wrt to programm titel or main feature titel)
    titel: string | undefined | null;
    text: string | undefined | null;
    besonderheit: string | undefined | null;

    mainfilms: FilmDTOFormPlus[];
    vorfilms: FilmDTOFormPlus[];
}

export default function TerminFilmDetailsCard({
                                                  screeningWeekday,
                                                  screeningDate,
                                                  screeningTime,
                                                  screeningSonderfarbe,

                                                  titel,
                                                  text,
                                                  besonderheit,

                                                  mainfilms,
                                                  vorfilms,
                                              }: Props) {

    // here get Film list for that specific Termin



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
                <Card.Header as="h4" className="text-end">
                    {screeningWeekday}, {screeningDate}, {screeningTime}
                </Card.Header>

                <Card.Title
                    as="h2"
                    style={{
                        color: '#fff',
                        marginTop: '1.5rem',
                        marginBottom: '2rem'
                    }}
                >
                    {render(titel)}
                </Card.Title>

                {text && (
                    <Card.Text style={{color: '#cfd6e1'}}>
                        {render(text)}
                    </Card.Text>
                )}

                {besonderheit && (
                    <Card.Text style={{color: '#cfd6e1'}}>
                        {render(besonderheit)}
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
                            fType={"Film"}

                        />
                        // <div key={index}>
                        //     <Card.Title
                        //         as="h4"
                        //         style={{
                        //             color: '#fff',
                        //             borderTop: '1px solid #cfd6e1',
                        //             paddingTop: '1rem',
                        //             paddingBottom: '1rem',
                        //         }}
                        //     >
                        //         {/*{index + 1}. Film: {render(film.titel) || "k.A."}*/}
                        //         {/*###############################*/}
                        //
                        //         {(() => {
                        //             if (vorfilms.length === 0 && mainfilms.length === 1) {
                        //                 return <>{render(film.titel)}</>;
                        //             } else if (vorfilms.length === 0 && mainfilms.length > 1) {
                        //                 return <>{index + 1}. Film: {render(film.titel)}</>;
                        //             } else if (vorfilms.length >= 1 && mainfilms.length === 1) {
                        //                 return <>Hauptfilm: {render(film.titel)}</>;
                        //             } else if (vorfilms.length >= 1 && mainfilms.length > 1) {
                        //                 return <>{index + 1}. Hauptfilm: {render(film.titel)}</>;
                        //             }
                        //             return "Film: Titelinformation fehlt"; // Default case
                        //         })()}
                        //
                        //         {/*###############################*/}
                        //     </Card.Title>
                        //
                        //     {/* Check if image URL exists */}
                        //     {film.bild && (
                        //         // <img
                        //         //     src={`https://www.pupille.org/bilder/filmbilder/${film.bild}`}
                        //         //     alt={`Film Image: ${film.titel}`}
                        //         // />
                        //         <Card.Img variant="top" src={`https://www.pupille.org/bilder/filmbilder/${film.bild}`} />
                        //
                        //     )}
                        //
                        //     <Card.Body>
                        //         <Card.Text style={{color: '#cfd6e1'}}>
                        //             {render(film.text || "k.A.")}
                        //         </Card.Text>
                        //
                        //         <div className="d-flex">
                        //             <div style={{flex: 1, marginRight: '1rem'}}>
                        //                 <Card.Title as="h6" style={{color: '#fff'}}>
                        //                     Filminformationen:
                        //                 </Card.Title>
                        //                 <Card.Text style={{color: '#cfd6e1'}}>
                        //                     Land: {film.land || "k.A."} <br/>
                        //                     Jahr: {film.jahr || "k.A."} <br/>
                        //                     Länge: {film.laufzeit || "k.A."} <br/>
                        //                     Sprachfassung: {film.sprache || "k.A."} <br/>
                        //                     Untertitel: {film.untertitel || "k.A."} <br/>
                        //                     Farbigkeit: {render(film.farbe) || "k.A."} <br/>
                        //                     Format: {film.format || "k.A."} <br/>
                        //                     FSK: {film.fsk || "k.A."} <br/>
                        //                 </Card.Text>
                        //             </div>
                        //             <div style={{flex: 1}}>
                        //                 <Card.Title as="h6" style={{color: '#fff'}}>
                        //                     Stab und Besetzung:
                        //                 </Card.Title>
                        //                 <Card.Text style={{color: '#cfd6e1'}}>
                        //                     {render(film.stab || "k.A.")}
                        //                 </Card.Text>
                        //             </div>
                        //         </div>
                        //     </Card.Body>
                        // </div>

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
                            numberOfF={mainfilms.length}
                            fType={"Vorfilm"}
                        />
                    );
                })}
            </Card.Body>
        </Card>
    );
}