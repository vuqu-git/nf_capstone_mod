import Card from 'react-bootstrap/Card';
import {render} from "../../utils/render.tsx";
// import './GradientCard.css';

import {Film} from "../../types/Film.ts";

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
    return (
        <div>
            <Card.Title
                as="h4"
                style={{
                    color: '#fff',
                    borderTop: '1px solid #cfd6e1',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                }}
            >
                {/*{index + 1}. Film: {render(film.titel) || "k.A."}*/}
                {/*###############################*/}

                {(() => {
                    if (numberOfF === 1) {
                        return <>{fType}: {render(f.titel)}</>;
                    } else {
                        return <>{index + 1}. {fType}: {render(f.titel)}</>;
                    }
                    return `${fType}: Titelinformation fehlt`; // Default case
                })()}

                {/*###############################*/}
            </Card.Title>

            {/* Check if image URL exists */}
            {f.bild && (
                <Card.Img variant="top" src={`https://www.pupille.org/bilder/filmbilder/${f.bild}`} />

            )}

            <Card.Body>
                <Card.Text
                    className="style-video-in-card"
                    style={{color: '#cfd6e1'}}
                >
                    {render(f.text || "k.A.")}
                </Card.Text>

                <div className="d-flex">
                    <div style={{flex: 1, marginRight: '1rem'}}>
                        <Card.Title as="h6" style={{color: '#fff'}}>
                            Filminformationen:
                        </Card.Title>
                        <Card.Text style={{color: '#cfd6e1'}}>
                            Land: {f.land || "k.A."} <br/>
                            Jahr: {f.jahr || "k.A."} <br/>
                            Länge: {f.laufzeit || "k.A."} <br/>
                            Sprachfassung: {f.sprache || "k.A."} <br/>
                            Untertitel: {f.untertitel || "k.A."} <br/>
                            Farbigkeit: {render(f.farbe) || "k.A."} <br/>
                            Format: {f.format || "k.A."} <br/>
                            FSK: {f.fsk || "k.A."} <br/>
                        </Card.Text>
                    </div>
                    <div style={{flex: 1}}>
                        <Card.Title as="h6" style={{color: '#fff'}}>
                            Stab und Besetzung:
                        </Card.Title>
                        <Card.Text style={{color: '#cfd6e1'}}>
                            {render(f.stab || "k.A.")}
                        </Card.Text>
                    </div>
                </div>
            </Card.Body>
        </div>
    )
}