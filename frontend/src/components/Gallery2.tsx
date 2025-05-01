import {useLoaderData, useLocation} from "react-router-dom";
import {formatDateTime} from "../utils/DateTimeFormatForGallery.ts";
import TerminFilmGalleryCard from "./termine/TerminFilmGalleryCard.tsx";
import NewsCard from "./news/NewsCard.tsx";

import './Gallery.css';
import {GalleryData} from "../App2.tsx";


export default function Gallery2() {

    // // syntax for without own type for useLoaderData input
    // const { screeningGalleryEntries, validNews } = useLoaderData<{
    //     screeningGalleryEntries: TerminDTOWithFilmDTOGallery[];
    //     validNews: News[];
    // }>();

    const { screeningGalleryEntries, validNews } = useLoaderData<GalleryData>();

    let location = useLocation();

    return (
        <>
            <section>
                {
                    validNews && (
                        <>
                            {/*<h3 style={{paddingTop: '2rem', paddingBottom: '2rem'}}>Neuigkeiten</h3>*/}
                            {validNews.map(n => (
                                <NewsCard key={n.id} variant={n.newsVariant} text={n.text} imageUrl={n.image}/>
                            ))}
                        </>
                    )
                }
            </section>

            <section>
                {/*<h3>Programm</h3>*/}
                {screeningGalleryEntries
                    .filter(termin => termin.veroeffentlichen !== null && termin.veroeffentlichen !== 0)
                    .map(termin => {
                        // Add logic here

                        const screeningDateObj = formatDateTime(termin.screeningTime, false, true);

                        if (termin.titel) {
                            return (
                                <div
                                    key={termin.tnr}
                                    style={{
                                        paddingTop: "1.5rem",
                                        paddingBottom: "1.5rem"
                                    }}
                                >
                                    {/*for programms of (multiple) films*/}
                                    {/***********************************/}
                                    <TerminFilmGalleryCard
                                        screeningWeekday={screeningDateObj ? screeningDateObj.weekday : null}
                                        screeningDate={screeningDateObj ? screeningDateObj.date : null}
                                        screeningTime={screeningDateObj ? screeningDateObj.time : null}
                                        screeningSonderfarbe={"red-glow"}
                                        // bild={termin.films[0]?.bild ? termin.films[0]?.bild : null}
                                        bild={termin.bild ? termin.bild : null}
                                        offsetImageInGallery={undefined} // // instead of undefined, insert a number from 0 to 100. 50 is default i.e. vertically centered, value>50 pushes the image up and value<50 pushes down
                                        titel={termin.titel}
                                        kurztext={termin.kurztext ? termin.kurztext : null}
                                        jahr={undefined}
                                        besonderheit={termin.besonderheit ? termin.besonderheit : null}
                                        filmFormat={undefined} // for filmFormat treatment with undefined (instead of null) to have this prop be optional

                                        tnr={termin.tnr} // for navigation to certain route
                                    />
                                </div>
                            );
                        } else if (termin.films?.length > 0) {
                            return (
                                <div
                                    key={termin.tnr}
                                    style={{
                                        paddingTop: "1.5rem",
                                        paddingBottom: "1.5rem"
                                    }}
                                >
                                    {/*screening consists of 1 main film + shorts possibly*/}
                                    {/*****************************************************/}
                                    <TerminFilmGalleryCard
                                        screeningWeekday={screeningDateObj ? screeningDateObj.weekday : ""}
                                        screeningDate={screeningDateObj ? screeningDateObj.date : ""}
                                        screeningTime={screeningDateObj ? screeningDateObj.time : ""}
                                        screeningSonderfarbe={"pupille-glow"}
                                        bild={termin.films[0]?.bild ? termin.films[0]?.bild : null}
                                        offsetImageInGallery={undefined} // instead of undefined, insert a number from 1 to 100. 50 is default i.e. vertically centered, value>50 pushes the image up and value<50 pushes down
                                        titel={termin.films[0]?.titel ? termin.films[0]?.titel : null}
                                        kurztext={termin.films[0]?.kurztext ? termin.films[0]?.kurztext : null}
                                        jahr={termin.films[0]?.jahr}
                                        besonderheit={termin.films[0]?.besonderheit ? termin.films[0]?.besonderheit : null}
                                        filmFormat={termin.films[0]?.format ? termin.films[0]?.format : undefined}  // for filmFormat treatment with undefined (instead of null) to have this prop be optional

                                        tnr={termin.tnr} // for navigation to certain route
                                    />
                                </div>
                            );
                        }
                        return null; // Add a default return to handle cases where neither condition is met
                    })
                }
            </section>

        </>
    );
}