import Card from 'react-bootstrap/Card';
import {renderHtmlText} from "../../utils/renderHtmlText.tsx";

import {Film} from "../../types/Film.ts";
import {structureStabString} from "../../utils/structureStabString.ts";
import './TerminFilmDetailsCardFilmListing.css';
import {Accordion} from "react-bootstrap";

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
            {/****** film title ******/}
            {/*******----------*******/}
            <Card.Title
                as="h3"
                style={{
                    color: '#FFD036',
                    borderTop: '3px solid #FFD036',
                    paddingTop: '1rem',
                    paddingBottom: f.bild ? '1rem' : undefined, // Only adds padding if f.bild exists
                }}
            >
                {/*{(() => {*/}
                {/*    if (numberOfF === 1) {*/}
                {/*        return <>{fType}{render(f.titel)}</>;*/}
                {/*    } else {*/}
                {/*        return <>{index + 1}. {fType}{render(f.titel)}</>;*/}
                {/*    }*/}
                {/*})()}*/}

                {(() => {
                    const titleContentA = f.originaltitel ? (
                        <>
                            {renderHtmlText(f.originaltitel)}
                            <br />
                            ({renderHtmlText(f.titel)})
                        </>
                    ) : renderHtmlText(f.titel);

                    const titleContentB = f.originaltitel ? (
                        <>
                            {renderHtmlText(f.originaltitel)} ({renderHtmlText(f.titel)})
                        </>
                    ) : renderHtmlText(f.titel);

                    if (numberOfF === 1) {
                        return <>{fType}{titleContentA}</>;
                    } else {
                        return <>{index + 1}. {fType}{titleContentB}</>;
                    }
                })()}
            </Card.Title>

            {/****** image ******/}
            {/*******-----*******/}
            {/* Check if image URL exists */}
            {f.bild && (
                <Card.Img
                    src={`https://www.pupille.org/bilder/filmbilder/${f.bild}`}
                />

            )}

            <Card.Body>

                {/****** text ******/}
                {/*******----*******/}
                { f.text && (
                    <Card.Text
                        className="style-video-in-card"
                        style={{color: '#cfd6e1'}}
                    >
                        {renderHtmlText(f.text)}
                    </Card.Text>
                )}

                {/****** content note ******/}
                {/*******------------*******/}
                { f.contentNote && (
                    <Accordion flush data-bs-theme="dark" className="mb-3">
                        <Accordion.Item eventKey="0" >
                            <Accordion.Header>
                                <span className="w-100 text-center">Hinweis auf sensible Inhalte</span>
                            </Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )}

                {/****** besonderheit ******/}
                {/*******------------*******/}
                {
                    f.besonderheit &&
                    <Card.Text
                        style={{
                            // borderTop: '1px solid #FFD036',
                            // borderBottom: '1px solid #FFD036',
                            borderTop: '2px dotted #FFD036',
                            borderBottom: '2px dotted #FFD036',
                            padding: '0.5rem 0em',
                            color: '#cfd6e1',
                            textAlign: 'right',
                        }}
                    >
                        {renderHtmlText(f.besonderheit)}
                    </Card.Text>
                }

                {/****** film informationen ******/}
                {/*******------------------*******/}
                {(f.land || f.jahr || f.laufzeit || f.sprache || f.untertitel || f.farbe || f.format || f.fsk) && (
                    <div className="section-block">
                        <Card.Title as="h6" className="filminfo-and-stab-details">Filminformationen:</Card.Title>
                        <div className="table-block">
                            {f.land && <div className="row"><div className="label">Land</div><div className="value">{f.land}</div></div>}
                            {f.jahr && <div className="row"><div className="label">Jahr</div><div className="value">{f.jahr}</div></div>}
                            {f.laufzeit && <div className="row"><div className="label">Länge</div><div className="value">{f.laufzeit} min</div></div>}
                            {f.sprache && <div className="row"><div className="label">Sprache</div><div className="value">{f.sprache}</div></div>}
                            {f.untertitel && <div className="row"><div className="label">Untertitel</div><div className="value">{f.untertitel}</div></div>}
                            {f.farbe && <div className="row"><div className="label">Farbigkeit</div><div className="value">{renderHtmlText(f.farbe)}</div></div>}
                            {f.format && <div className="row"><div className="label">Format</div><div className="value">{f.format}</div></div>}
                            {f.fsk && <div className="row"><div className="label">FSK</div><div className="value">{f.fsk}</div></div>}
                        </div>
                    </div>
                )}

                {/****** stab & besetzung ******/}
                {/*******----------------*******/}
                {structuredStab && (
                    <div className="section-block"> {/* This will be the last .section-block */}
                        <Card.Title as="h6" className="filminfo-and-stab-details">Stab und Besetzung:</Card.Title>
                        <div className="table-block">
                            {structuredStab.map(row => (
                                <div className="row" key={row.abbrev}>
                                    <div className="label">{renderHtmlText(row.abbrev)}</div>
                                    <div className="value">{renderHtmlText(row.entry)}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </Card.Body>
        </div>
    )
}