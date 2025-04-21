import Card from 'react-bootstrap/Card';
import {render} from "../../utils/render.tsx";

import {Film} from "../../types/Film.ts";
import {structureStabString} from "../../utils/structureStabString.ts";
import './TerminFilmDetailsCardFilmListing.css';

interface Props {
    index: number;
    f: Film;
    numberOfF: number;
    fType: string;
}

export default function TerminFilmDetailsListing({
                                                  index,
                                                  f,
                                                  numberOfF,
                                                  fType,
                                              }: Props) {

    const structuredStab = f.stab ? structureStabString(f.stab) : null;

    return (
        <div>
            <Card.Title
                as="h4"
                style={{
                    color: '#FFD036',
                    borderTop: '1px solid #cfd6e1',
                    paddingTop: '1rem',
                    paddingBottom: f.bild ? '1rem' : undefined, // Only adds padding if f.bild exists
                }}
            >
                {/*{index + 1}. Film: {render(film.titel) || "k.A."}*/}
                {/*###############################*/}

                {(() => {
                    if (numberOfF === 1) {
                        return <>{fType}{render(f.titel)}</>;
                    } else {
                        return <>{index + 1}. {fType}{render(f.titel)}</>;
                    }
                })()}

                {/*###############################*/}
            </Card.Title>

            {/* Check if image URL exists */}
            {f.bild && (
                <Card.Img
                    src={`https://www.pupille.org/bilder/filmbilder/${f.bild}`}
                />

            )}

            <Card.Body>

                {/*<table*/}
                {/*    style={{*/}
                {/*    all: 'unset',*/}
                {/*    color: 'inherit',*/}
                {/*    font: 'inherit',*/}
                {/*    // borderCollapse: 'collapse',*/}
                {/*    // width: '100%',*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <tbody>*/}
                {/*    {f.land && <tr><td className="term">Land</td> <td>{f.land}</td></tr>}*/}
                {/*    {f.jahr && <tr><td className="term">Jahr</td> <td>{f.jahr}</td></tr>}*/}
                {/*    {f.laufzeit && <tr><td className="term">Länge</td> <td>{f.laufzeit}</td></tr>}*/}
                {/*    {f.sprache && <tr><td className="term">Sprache</td> <td>{f.sprache}</td></tr>}*/}
                {/*    {f.untertitel && <tr><td className="term">Untertitel</td> <td>{f.untertitel}</td></tr>}*/}
                {/*    {f.farbe && <tr><td className="term">Farbigkeit</td> <td>{f.farbe}</td></tr>}*/}
                {/*    {f.format && <tr><td className="term">Format</td> <td>{f.format}</td></tr>}*/}
                {/*    {f.fsk && <tr><td className="term">FSK</td> <td>{f.fsk}</td></tr>}*/}
                {/*    </tbody>*/}
                {/*</table>*/}


                <Card.Text
                    className="style-video-in-card"
                    style={{color: '#cfd6e1'}}
                >
                    {render(f.text || "k.A.")}
                </Card.Text>

                {
                    f.besonderheit &&
                    <Card.Text
                        style={{
                            borderTop: '1px solid #FFD036',
                            borderBottom: '1px solid #FFD036',
                            padding: '1rem 0em',
                            color: '#cfd6e1',
                            textAlign: 'right',
                        }}
                    >
                        {render(f.besonderheit)}
                    </Card.Text>
                }

                {/*d-flex container +++++++++++++++++++++++++++++++++++++++++++++++++++*/}
                <div className="d-flex">

                    {/*{ f.stab && (*/}
                    {/*    <>*/}
                    {/*        <div style={{flex: 1}}>*/}

                    {/*            <Card.Title*/}
                    {/*                as="h6"*/}
                    {/*                className="filminfo-and-stab"*/}
                    {/*            >*/}
                    {/*                Stab und Besetzung:*/}
                    {/*            </Card.Title>*/}
                    {/*            <Card.Text style={{color: '#cfd6e1'}}>*/}
                    {/*                {render(f.stab)}*/}
                    {/*            </Card.Text>*/}

                    {/*            /!*<Card.Title*!/*/}
                    {/*            /!*    as="h6"*!/*/}
                    {/*            /!*    className="filminfo-and-stab"*!/*/}
                    {/*            /!*>*!/*/}
                    {/*            /!*    Stab und Besetzung:*!/*/}
                    {/*            /!*</Card.Title>*!/*/}
                    {/*            /!*<Card.Text style={{color: '#cfd6e1'}}>*!/*/}
                    {/*            /!*    {render(f.stab || "k.A.")}*!/*/}
                    {/*            /!*</Card.Text>*!/*/}
                    {/*        </div>*/}
                    {/*    </>*/}
                    {/*)}*/}

                    {/*<div style={{flex: 1}}>*/}
                    {/*~~~~~~~~~~~~ table Stab/Besetzung ~~~~~~~~~~~~*/}
                    { structuredStab && (
                        <div style={{flex: '0 0 65%'}}> {/* Adjusted width to 65% */}

                            <Card.Title
                                as="h6"
                                className="filminfo-and-stab"
                            >
                                Stab und Besetzung:
                            </Card.Title>
                            <div style={{color: '#cfd6e1'}}>
                                {/* used this above instead of <Card.Text style={{ color: '#cfd6e1' }}> because Card.Text contains a p tag and you can't include a table within a p*/}

                                <table>
                                    <tbody>
                                    {/* CHANGED: Each <tr> is now on a single line, no whitespace between <tr> and <td> */}
                                    {/*    The hydration error is caused by whitespace (including newlines) between <tr>, <td>, and other table elements in your JSX.*/}
                                    {/*    In React, every space or newline between these tags becomes a text node, which is not allowed as a child of <tr>, <tbody>, etc.*/}
                                    {structuredStab.map(row => (
                                        <tr key={row.abbrev}><td className="term">{render(row.abbrev)}</td><td>{render(row.entry)}</td></tr> // CHANGED
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/*~~~~~~~~~~~~ table Filmfos ~~~~~~~~~~~~*/}
                    { (f.land || f.jahr || f.laufzeit || f.sprache || f.untertitel || f.farbe || f.format || f.fsk) && (
                        <>
                            {/*<div style={{flex: 1, marginRight: '0rem'}}>*/}
                            <div style={{flex: '0 0 35%', marginRight: '0rem'}}> {/* Adjusted width to 35% */}
                                <Card.Title
                                    as="h6"
                                    className="filminfo-and-stab"
                                >
                                    Filminformationen:
                                </Card.Title>
                                {/*<Card.Text style={{color: '#cfd6e1'}}>*/}
                                {/*    {f.land && <>Land: {f.land} <br /></>}*/}
                                {/*    {f.jahr && <>Jahr: {f.jahr} <br /></>}*/}
                                {/*    {f.laufzeit && <>Länge: {f.laufzeit} <br /></>}*/}
                                {/*    {f.sprache && <>Sprache: {f.sprache} <br /></>}*/}
                                {/*    {f.untertitel && <>Untertitel: {f.untertitel} <br /></>}*/}
                                {/*    {f.farbe && <>Farbigkeit: {render(f.farbe)} <br /></>}*/}
                                {/*    {f.format && <>Format: {f.format} <br /></>}*/}
                                {/*    {f.fsk && <>FSK: {f.fsk} <br /></>}*/}

                                {/*    /!*Land: {f.land || "k.A."} <br/>*!/*/}
                                {/*    /!*Jahr: {f.jahr || "k.A."} <br/>*!/*/}
                                {/*    /!*Länge: {f.laufzeit || "k.A."} <br/>*!/*/}
                                {/*    /!*Sprachfassung: {f.sprache || "k.A."} <br/>*!/*/}
                                {/*    /!*Untertitel: {f.untertitel || "k.A."} <br/>*!/*/}
                                {/*    /!*Farbigkeit: {render(f.farbe) || "k.A."} <br/>*!/*/}
                                {/*    /!*Format: {f.format || "k.A."} <br/>*!/*/}
                                {/*    /!*FSK: {f.fsk || "k.A."} <br/>*!/*/}
                                {/*</Card.Text>*/}


                                <div style={{color: '#cfd6e1'}}>
                                    {/* used this above instead of <Card.Text style={{ color: '#cfd6e1' }}> because Card.Text contains a p tag and you can't include a table within a p*/}

                                    <table>
                                        <tbody>
                                        {f.land && <tr><td className="term" style={{ margin: '0', padding: '0' }}>Land</td><td style={{ margin: '0', padding: '0' }}>{f.land}</td></tr>}
                                        {f.jahr && <tr><td className="term">Jahr</td><td>{f.jahr}</td></tr>}
                                        {f.laufzeit && <tr><td className="term">Länge</td><td>{f.laufzeit} min</td></tr>}
                                        {f.sprache && <tr><td className="term">Sprache</td><td>{f.sprache}</td></tr>}
                                        {f.untertitel && <tr><td className="term">Untertitel</td><td>{f.untertitel}</td></tr>}
                                        {f.farbe && <tr><td className="term">Farbigkeit</td><td>{render(f.farbe)}</td></tr>}
                                        {f.format && <tr><td className="term">Format</td><td>{f.format}</td></tr>}
                                        {f.fsk && <tr><td className="term">FSK</td><td>{f.fsk}</td></tr>}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                </div>
                {/*d-flex container +++++++++++++++++++++++++++++++++++++++++++++++++++*/}
            </Card.Body>
        </div>
    )
}