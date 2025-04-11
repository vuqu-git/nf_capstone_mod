import Card from 'react-bootstrap/Card';
import {render} from "../../utils/render.tsx";
import {CSSProperties} from "react";
import './TerminFilmOverviewCard.css';

interface Props {
    screeningWeekday: string | undefined;
    screeningDate: string | undefined;
    screeningTime: string | undefined;
    screeningSonderfarbe: string;
    bild: string | undefined;

    titel: string | undefined;
    kurztext: string | undefined;
    besonderheit: string | undefined;

    filmFormat: string | undefined
}

export default function TerminFilmOverviewCard({
                                         screeningWeekday,
                                         screeningDate,
                                         screeningTime,
                                         screeningSonderfarbe,
                                         bild,

                                         titel,
                                         kurztext,
                                         besonderheit,
                                         filmFormat,
                                     }: Props) {

    const cardImageStyle: CSSProperties  = {
        position: 'relative',
    };

    const gradientOverlayStyle: CSSProperties = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '50%', // Adjust the height of the fade as needed
        // background: 'linear-gradient(to bottom, rgba(255, 208, 54, 0) 0%, rgba(255, 208, 54, 1) 100%)', // Fade to the card's background color
        background: 'linear-gradient(to bottom, ' +
            'rgba(13, 13, 12, 0) 0%, ' +
            'rgba(13, 13, 12, 0.7) 70%, ' + // Faster transition to near opaque
            'rgba(13, 13, 12, 1) 100%)',
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
        >
            {/*<Card.Img variant="top" src={`https://www.pupille.org/bilder/filmbilder/${bild}`} />*/}
            <div
                className="image-aspect-ratio-container"
                style={cardImageStyle}
            >
                <Card.Img variant="top" src={`https://www.pupille.org/bilder/filmbilder/${bild}`} />
                <div style={gradientOverlayStyle}></div>
            </div>
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
                <Card.Text style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#cfd6e1' }}>
                    { filmFormat?.includes("mm") &&
                        <span className="duration-box">
                            {filmFormat}
                        </span>

                    }
                    <span style={{ fontSize: '1.3rem', color: '#fff', marginLeft: 'auto' }}>
                        {screeningWeekday}, {screeningDate}, {screeningTime}
                    </span>
                </Card.Text>


                <Card.Title
                    as="h2"
                    style={{ color: '#fff' }}
                >
                    {render(titel)}
                </Card.Title>

                <Card.Text
                    style={{ color: '#cfd6e1' }}
                >
                    {render(kurztext)}
                </Card.Text>

                {
                    besonderheit &&
                    <Card.Text
                        style={{
                            borderTop: '1px solid #cfd6e1',
                            padding: '1rem 1.5em',
                            color: '#FFD036',
                            textAlign: 'center',
                        }}
                    >{render(besonderheit)}
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
