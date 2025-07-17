import Card from 'react-bootstrap/Card';
import { renderHtmlText } from "../../utils/renderHtmlText.tsx";
import './TerminFilmGalleryCard.css';
import { useNavigate } from "react-router-dom";

interface Props {
    screeningWeekday: string | null;
    screeningDate: string | null;
    screeningTime: string | null;
    screeningSonderfarbe: string;

    bild: string | null; // could refer to the entire programm or main feature
    offsetImageInGallery: number | undefined;

    titel: string | null; // could refer to the entire programm or main feature
    kurztext: string | null; // could refer to the entire programm or main feature

    hauptfilmJahr: number | undefined;
    hauptfilmbesonderheit: string | undefined;
    hauptfilmFormat: string | undefined;
    hauptfilmLaufzeit: number | undefined;
    hauptfilmRegie: string | undefined;

    tnr: number;
    terminBesonderheit: string | undefined;
}

export default function TerminFilmGalleryCard({
                                                  screeningWeekday,
                                                  screeningDate,
                                                  screeningTime,
                                                  screeningSonderfarbe,
                                                  bild,
                                                  offsetImageInGallery,
                                                  titel,
                                                  kurztext,
                                                  hauptfilmJahr,
                                                  hauptfilmbesonderheit, // inhaltliche Besonderheit des main features
                                                  hauptfilmFormat,
                                                  hauptfilmLaufzeit,
                                                  hauptfilmRegie,
                                                  tnr,
                                                  terminBesonderheit, // bezieht sich auf Ort & Zeit des Termins
                                              }: Readonly<Props>) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/details/${tnr}`);
    };

    return (
        <Card
            className={`custom-card ${screeningSonderfarbe} zoom-effect`}
        >
            {bild && (
                <div
                    className="image-aspect-ratio-container"
                    onClick={handleClick}
                    role="button"
                >
                    <Card.Img
                        variant="top"
                        src={`https://www.pupille.org/bilder/filmbilder/${bild}`}
                        {...(offsetImageInGallery && { style: { objectPosition: `center ${offsetImageInGallery}%` } })}
                    />
                    {/*empty tag for stronger gradient effect*/}
                    <div className="gradient-overlay"></div>

                    <div className="gradient-overlay">
                        <Card.Text className="overlay-analog-date">
                            {hauptfilmFormat?.includes("mm") && (
                                <span className="analog-box">{hauptfilmFormat}</span>
                            )}
                            <span className="overlay-time">
                                {screeningWeekday || screeningDate || screeningTime ? (
                                    <>
                                        {screeningWeekday} | {screeningDate} | {screeningTime}
                                    </>
                                ) : (
                                    'keine Terminangaben'
                                )}
                            </span>
                        </Card.Text>

                        {titel && (
                            <Card.Title as="h3" className="overlay-title">
                                {renderHtmlText(titel)}
                            </Card.Title>
                        )}

                        {(hauptfilmRegie || hauptfilmJahr || hauptfilmLaufzeit) && (
                            <Card.Text className="filminfo-and-stab-gallery">
                                {[hauptfilmRegie, hauptfilmJahr, hauptfilmLaufzeit !== undefined ? hauptfilmLaufzeit + " Min." : undefined]
                                    .filter(Boolean)
                                    .join(', ')}
                            </Card.Text>
                        )}
                    </div>
                </div>
            )}

            <Card.Body>
                {kurztext && (
                    <Card.Text className="card-kurztext">
                        {renderHtmlText(kurztext)}
                    </Card.Text>
                )}

                {hauptfilmbesonderheit && (
                    <Card.Text style={{ borderTop: kurztext ? undefined : 'none' }}>
                        <span className="card-filmBesonderheit">
                            {renderHtmlText(hauptfilmbesonderheit)}
                        </span>
                    </Card.Text>
                    // <Card.Text className="card-filmBesonderheit" style={{ borderTop: kurztext ? undefined : 'none' }}>
                    //     {renderHtmlText(hauptfilmbesonderheit)}
                    // </Card.Text>
                )}

                {terminBesonderheit && (
                    <Card.Text className="card-terminBesonderheit">
                        {renderHtmlText(terminBesonderheit)}
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
}
