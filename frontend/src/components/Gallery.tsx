import {useState, useEffect} from "react";
import {News} from "../types/News.ts";

import axios from "axios";
import NewsCard from "./news/NewsCard.tsx";
import {useAllNews} from "../hooks/useAllNews.ts";
import TerminDTOWithFilmDTOGallery from "../types/TerminDTOWithFilmDTOGallery.ts";

import { formatDateTime } from '../utils/DateTimeFormatForGallery.ts';
import TerminFilmGalleryCard from "./termine/TerminFilmGalleryCard.tsx";

import './Gallery.css';

export default function Gallery() {


    const {
        isLoadingAllNews,
        allNews,
        error,
        setError,
    } = useAllNews(false);

    const [validNews, setValidNews] = useState<News[]>([]);
    const [isLoadingNews, setIsLoadingNews] = useState(false);
    const [isLoadingScreenings, setIsLoadingScreenings] = useState(false);


    const getValidNews = () => {
        setIsLoadingNews(true);

        axios.get("/api/news")
            .then((response) => {
                setValidNews(response.data)
            })
            .catch((error) => {
                const errorMessage =
                    error instanceof Error ? error.message : "Fetching valid news failed";
                setError(errorMessage);
            })
            .finally(() => {
                setIsLoadingNews(false);
        });
    }

    const [screeningGalleryEntries, setScreeningGalleryEntries] = useState<TerminDTOWithFilmDTOGallery[]>([]);

    const getScreeningGalleryEntries = () => {
        setIsLoadingScreenings(true);

        axios.get("api/screenings")
            .then((response) => {
                setScreeningGalleryEntries(response.data)
            })
            .catch((error) => {
                const errorMessage =
                    error instanceof Error ? error.message : "Fetching TerminDTOWithFilmDTOGallery Gallery Entries failed";
                setError(errorMessage);
            })
            .finally(() => {
                setIsLoadingScreenings(false);
            });
    }

    useEffect(() => {
        getValidNews();
        getScreeningGalleryEntries();
    }, [])


    const [readyToRender, setReadyToRender] = useState(false);

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // scroll tracking logic
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        const saveScrollPosition = () => {
            // Only store if user has scrolled down s, not on every scroll event (including those at 0)
            if (window.scrollY > 0) { // this is really important!!!
                sessionStorage.setItem('overviewScroll', window.scrollY.toString());
                console.log("Saved Y-position:", window.scrollY);
            }
        };

        // const saveScrollPosition = () => {
        //     if (window.scrollY === 0) {
        //         // User scrolled to top, save 0
        //         sessionStorage.setItem('overviewScroll', '0');
        //         console.log("Saved Y-position: 0");
        //             // Only store if user(!) has scrolled down, not on every scroll event (including those at 0)
        //     } else if (window.scrollY > 0) { // this is really important!!!
        //         // User(!) scrolled down, save current position
        //         sessionStorage.setItem('overviewScroll', window.scrollY.toString());
        //         console.log("Saved Y-position:", window.scrollY);
        //     }
        // };

        window.addEventListener('scroll', saveScrollPosition);

        return () => {
            window.removeEventListener('scroll', saveScrollPosition);
        };
    }, []);


    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // scroll restoration logic
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // useEffect(() => {
    //     const storedY = sessionStorage.getItem('overviewScroll');
    //
    //     if (!isLoadingNews && !isLoadingScreenings) {
    //         const scrollY = storedY ? parseInt(storedY) : 0;
    //
    //         // Delay until DOM height is long enough to scroll
    //         const checkAndScroll = () => {
    //             if (document.body.scrollHeight < scrollY + window.innerHeight) {
    //                 // Wait a bit and try again
    //                 setTimeout(checkAndScroll, 50);
    //                 return;
    //             }
    //
    //             // Now it's safe to scroll
    //             window.scrollTo(0, scrollY);
    //
    //             // Now reveal the page
    //             setReadyToRender(true);
    //         };
    //
    //         checkAndScroll();
    //     }
    // }, [isLoadingNews, isLoadingScreenings]);

    useEffect(() => {
        const storedY = sessionStorage.getItem('overviewScroll');

        if (!isLoadingNews && !isLoadingScreenings) {
            const scrollY = storedY ? parseInt(storedY) : 0;

            const checkAndScroll = () => {
                if (document.body.scrollHeight < scrollY + window.innerHeight) {
                    setTimeout(checkAndScroll, 50);
                    return;
                }

                // Smooth scroll here
                window.scrollTo({
                    top: scrollY,
                    behavior: 'smooth',
                });

                // Optional: delay reveal just a bit to match scroll speed
                setTimeout(() => setReadyToRender(true), 350); // Adjust if needed
            };

            checkAndScroll();
        }
    }, [isLoadingNews, isLoadingScreenings]);


    return (
        // <div style={{ visibility: readyToRender ? 'visible' : 'hidden' }}>

        // adjust the time duration here if needed
        <div style={{
            opacity: readyToRender ? 1 : 0,
            transition: 'opacity 0.4s ease-in-out'
        }}>

            {/*<h1>Welcome to Pupille</h1>*/}
            {/*<p>*/}
            {/* Lorem ipsum dolor sit */}
            {/*</p>*/}

            {/*<section>*/}
            {/*    <h2>(all) News</h2>*/}
            {/*    {   isLoadingAllNews ? (*/}
            {/*        <div className="text-warning mb-3">&#x1f504; Loading all news...</div>*/}
            {/*    ) : error ? (*/}
            {/*        <div className="text-danger mb-3">{error}</div>*/}
            {/*    ) : (*/}
            {/*        allNews.map(n => (*/}
            {/*            <NewsCard key={n.id} variant={n.newsVariant} text={n.text} imageUrl={n.image}/>*/}
            {/*            )*/}
            {/*        ))*/}
            {/*    }*/}
            {/*</section>*/}

            <section>
                {
                    // isLoadingNews ? (
                    //     <div className="text-warning mb-3">&#x1f4f0; Loading news...</div>
                    // ) :
                    validNews && screeningGalleryEntries && (
                        <>
                            {/*<h3 style={{paddingTop: '2rem', paddingBottom: '2rem'}}>Neuigkeiten</h3>*/}
                            {validNews.map(n => (
                                <NewsCard key={n.id} variant={n.newsVariant} text={n.text} imageUrl={n.image}/>
                            ))
                            }
                        </>
                    )
                }
            </section>


            <section>
                {
                    //     isLoadingScreenings ? (
                    //     <div className="text-warning mb-3">&#127902; Loading screenings...</div>
                    // ) : (
                    validNews && screeningGalleryEntries && (
                        <>
                            {/*<h3>Programm</h3>*/}
                            {screeningGalleryEntries
                                .filter(termin => termin.veroeffentlichen !== null && termin.veroeffentlichen !== 0)
                                .map(termin => {
                                    // Add logic here

                                    const screeningDateObj = formatDateTime(termin.vorstellungsbeginn, false, true);

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
                                })}
                        </>
                    )
                    // )
                }
            </section>

        </div>

    );


}