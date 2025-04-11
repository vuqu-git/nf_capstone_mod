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
                            fType={(mainfilms.length == 1) ? "" : "Film: "}
                        />
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
                            numberOfF={vorfilms.length}
                            fType={"Vorfilm: "}
                        />
                    );
                })}
            </Card.Body>
        </Card>
    );
}