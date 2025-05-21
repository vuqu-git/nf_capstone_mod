import {useLoaderData} from "react-router-dom";
import {formatDateTime} from "../utils/formatDateTime.ts";
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

    const visibleScreenings = screeningGalleryEntries
        .filter(termin => termin.veroeffentlichen !== null && termin.veroeffentlichen !== 0);

    // for testing semester break
    // const visibleScreenings = [];

    return (
        <>
            {/* Section for news */}
            {validNews && validNews.length > 0 && (
                <section>
                    <h2 className="visually-hidden">Neuigkeiten</h2>
                    {validNews.map(n => (
                        <article key={n.id}>
                            <NewsCard variant={n.newsVariant} text={n.text} imageUrl={n.image} />
                        </article>
                    ))}
                </section>
            )}

            {/* Section for current program */}
            {
                visibleScreenings.length > 0 ? (
                    <section>
                        <h2 className="visually-hidden">Aktuelles Programm</h2>
                        {visibleScreenings.map(termin => {

                            const screeningDateObj = formatDateTime(termin.vorstellungsbeginn, false, true);

                            const screeningCardProps = {
                                screeningWeekday: screeningDateObj?.weekday ?? "",
                                screeningDate: screeningDateObj?.date ?? "",
                                screeningTime: screeningDateObj?.time ?? "",
                                offsetImageInGallery: undefined, // instead of undefined, insert a number from 0 to 100. 50 is default i.e. vertically centered, value>50 pushes the image up and value<50 pushes down
                                tnr: termin.tnr
                            };

                            return (
                                <article key={termin.tnr} className="gallery-article-padding">
                                    {/*for programms of (multiple) films*/}
                                    {/***********************************/}
                                    {termin.titel ? (
                                        <TerminFilmGalleryCard
                                            {...screeningCardProps}
                                            screeningSonderfarbe="red-glow"
                                            bild={termin.bild ?? null}
                                            titel={termin.titel}
                                            kurztext={termin.kurztext ?? null}
                                            jahr={undefined}
                                            besonderheit={termin.besonderheit ?? null}
                                            filmFormat={undefined} // for filmFormat treatment with undefined (instead of null) to have this prop be optional
                                            laufzeit={undefined} // for filmFormat treatment with undefined (instead of null) to have this prop be optional
                                            regie={undefined} // for regie treatment with undefined (instead of null) to have this prop be optional
                                        />
                                    ) : (
                                        termin.mainfilms?.length > 0 && (
                                            <>
                                                {/*screening consists of 1 main film + shorts possibly*/}
                                                {/*****************************************************/}
                                                <TerminFilmGalleryCard
                                                    {...screeningCardProps}
                                                    screeningSonderfarbe="pupille-glow"
                                                    bild={termin.mainfilms[0]?.bild ?? null}
                                                    titel={termin.mainfilms[0]?.titel ?? null}
                                                    kurztext={termin.mainfilms[0]?.kurztext ?? null}
                                                    jahr={termin.mainfilms[0]?.jahr}
                                                    besonderheit={termin.mainfilms[0]?.besonderheit ?? null}
                                                    filmFormat={termin.mainfilms[0]?.format ?? undefined} // concise: filmFormat={termin.films[0]?.format ?? undefined}
                                                    laufzeit={termin.mainfilms[0]?.laufzeit ?? undefined}
                                                    regie={undefined} // for regie treatment with undefined (instead of null) to have this prop be optional
                                                />
                                            </>
                                        )
                                    )}
                                </article>
                            );
                        })}
                    </section>
                ) : (
                    <section>
                        <article>
                            <p style={{ textAlign: 'center', marginTop: '2rem' }}>Das neue Filmprogramm wird demnächst hier veröffentlicht.</p>
                        </article>
                    </section>
                )
            }
        </>
    );
}