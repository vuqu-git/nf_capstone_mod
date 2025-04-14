import Card from 'react-bootstrap/Card';
import {render} from "../../utils/render.tsx";
import {CSSProperties} from "react";
import './TerminFilmOverviewCard.css';
import { useNavigate } from "react-router-dom";

interface Props {
    screeningWeekday: string | null;
    screeningDate: string | null;
    screeningTime: string | null;
    screeningSonderfarbe: string;
    bild: string | null; // somehow how the value for bild is build it could be undefined

    titel: string | null; // null is in the case, where titel refers to that of the main film
    kurztext: string | null;
    jahr: number | undefined;
    besonderheit: string | null;

    filmFormat: string | undefined;

    tnr: number
}

export default function TerminFilmOverviewCard({
                                         screeningWeekday,
                                         screeningDate,
                                         screeningTime,
                                         screeningSonderfarbe,
                                         bild,

                                         titel,
                                         kurztext,
                                         jahr,
                                         besonderheit,
                                         filmFormat,
                                         tnr
                                     }: Props) {

    const cardImageStyle: CSSProperties  = {
        position: 'relative',
    };

    const gradientOverlayStyle: CSSProperties = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%', // Adjust the height of the fade as needed
        // height: '50%', // Adjust the height of the fade as needed
        // background: 'linear-gradient(to bottom, rgba(255, 208, 54, 0) 0%, rgba(255, 208, 54, 1) 100%)', // Fade to the card's background color
        background: 'linear-gradient(to bottom, ' +
            'rgba(13, 13, 12, 0) 0%, ' +
            'rgba(13, 13, 12, 0.7) 70%, ' + // Faster transition to near opaque
            'rgba(13, 13, 12, 1) 100%)',
    };


    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${tnr}`); // Navigate with tnr parameter
    };

    return (
        <Card
            // border="none"
            // className="pupille-glow zoom-effect"
            className={`${screeningSonderfarbe} zoom-effect`}
            style={{
                // backgroundColor: '#FFD036',
                backgroundColor: '#0D0D0C',
                borderRadius: '15px',
                overflow: 'hidden',
            }}
            // bg="dark"
            text="light"

            onClick={handleClick} // Add click handler
            role="button"
        >
            {/*<Card.Img variant="top" src={`https://www.pupille.org/bilder/filmbilder/${bild}`} />*/}
            { bild && (
                <div
                    className="image-aspect-ratio-container"
                    style={cardImageStyle}
                >
                    <Card.Img variant="top" src={`https://www.pupille.org/bilder/filmbilder/${bild}`} />
                    <div style={gradientOverlayStyle}></div>
                </div>
            )}

            {/*<Card.Header*/}
            {/*    as="h5"*/}
            {/*    className="text-end"*/}
            {/*>*/}
            {/*    {screeningWeekday}, {screeningDate} {screeningTime}*/}
            {/*</Card.Header>*/}
            <Card.Body>
                {/*<Card.Title*/}
                {/*    className="text-end"*/}
                {/*    style={{ color: '#fff' }}*/}
                {/*>*/}
                {/*    {screeningWeekday}, {screeningDate} {screeningTime}*/}
                {/*</Card.Title>*/}

                {/*<Card.Text style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#cfd6e1' }}>*/}
                <Card.Text style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#cfd6e1',  }}>
                    { filmFormat?.includes("mm") &&
                        <span className="duration-box">
                            {filmFormat}
                        </span>

                    }
                    <span style={{  fontSize: '1.3rem',
                                    color: '#FFD036',
                                    marginLeft: 'auto' }}
                    >
                        {screeningWeekday || screeningDate || screeningTime ? (
                            <>
                                {screeningWeekday}, {screeningDate}, {screeningTime}
                            </>
                        ) : (
                            'keine Terminangaben'
                        )}
                    </span>
                </Card.Text>

                { titel && (
                    <Card.Title
                        as="h2"
                        // style={{ color: '#fff' }}
                        style={{
                            color: '#FFD036',
                            marginBottom: '0.0rem',
                        }}
                    >
                        {render(titel)}
                    </Card.Title>
                )}

                { jahr &&
                    <Card.Text
                        className="filminfo-and-stab"
                        style={{ marginTop: '0.0rem' }}
                    >
                        {jahr}
                    </Card.Text>
                }

                { kurztext && (
                    <Card.Text
                        style={{
                            color: '#cfd6e1' ,
                            marginTop: jahr ? '' : '1rem',
                    }}
                    >
                        {render(kurztext)}
                    </Card.Text>
                )}

                {
                    besonderheit &&
                    <Card.Text
                            style={{
                                // borderTop: kurztext ? '1px solid #cfd6e1' : '',
                                borderTop: kurztext ? '1px solid #FFD036' : '',
                                // padding: '1rem 1.5em',
                                padding: '1rem 0em',
                                // color: '#FFD036',
                                // color: '#FFA300',
                                // color: '#7FA35C',
                                color: '#cfd6e1',
                                textAlign: 'right',
                            }}
                    >
                        {render(besonderheit)}
                    </Card.Text>
                }

            </Card.Body>

            {/*{besonderheit &&*/}
            {/*    <Card.Footer*/}
            {/*        style={{*/}
            {/*            borderTop: '1px solid #cfd6e1',*/}
            {/*            backgroundColor: '#0D0D0C',*/}
            {/*            color: '#cfd6e1'*/}
            {/*        }}*/}
            {/*    >{render(besonderheit)}</Card.Footer>}*/}

        </Card>
    );
}
