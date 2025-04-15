import {useState, useEffect} from "react";
import {News} from "../types/News.ts";

import axios from "axios";
import NewsCard from "./news/NewsCard.tsx";
import {useAllNews} from "../hooks/useAllNews.ts";
import TerminDTOWithFilmDTOOverviews from "../types/TerminDTOWithFilmDTOOverviews.ts";

import { formatDateTime } from '../utils/DateTimeFormatForOverview.ts';
import TerminFilmOverviewCard from "./termine/TerminFilmOverviewCard.tsx";

import './Overview.css';



export default function Overview() {



    const [readyToRender, setReadyToRender] = useState(false);
    // ~~~~~~~~~~~~~~



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

    const [screeningOverviewEntries, setScreeningOverviewEntries] = useState<TerminDTOWithFilmDTOOverviews[]>([]);

    const getScreeningOverviewEntries = () => {
        setIsLoadingScreenings(true);

        axios.get("api/screenings")
            .then((response) => {
                setScreeningOverviewEntries(response.data)
            })
            .catch((error) => {
                const errorMessage =
                    error instanceof Error ? error.message : "Fetching TerminDTOWithFilmDTOOverviews Overview Entries failed";
                setError(errorMessage);
            })
            .finally(() => {
                setIsLoadingScreenings(false);
            });
    }

    useEffect(() => {
        getValidNews();
        getScreeningOverviewEntries();
    }, [])


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

        window.addEventListener('scroll', saveScrollPosition);

        return () => {
            window.removeEventListener('scroll', saveScrollPosition);
        };
    }, []);


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

                // ✅ Smooth scroll here
                window.scrollTo({
                    top: scrollY,
                    behavior: 'smooth',
                });

                // ✅ Optional: delay reveal just a bit to match scroll speed
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
            <>
                {/*<h1>Welcome to Pupille</h1>*/}
                {/*<p>*/}
                {/*    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.*/}
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
                        validNews && screeningOverviewEntries && (
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
                        validNews && screeningOverviewEntries && (
                            <>
                                {/*<h3>Programm</h3>*/}
                                {screeningOverviewEntries.map(termin => {
                                    // Add logic here if needed
                                    
                                    const screeningDateObj = formatDateTime(termin.screeningTime);

                                    // screening of entire programm spanning over several films
                                    if (termin.titel) {
                                        return (
                                            <div
                                                key={termin.terminId}
                                                style={{
                                                    paddingTop: "1.5rem",
                                                    paddingBottom: "1.5rem"
                                                }}
                                            >
                                                <TerminFilmOverviewCard
                                                    screeningWeekday={screeningDateObj ? screeningDateObj.weekday : null}
                                                    screeningDate={screeningDateObj ? screeningDateObj.date : null}
                                                    screeningTime={screeningDateObj ? screeningDateObj.time : null}
                                                    screeningSonderfarbe={"red-glow"}
                                                    // bild={termin.films[0]?.bild}
                                                    bild={termin.films[0].bild ? termin.films[0].bild : null}
                                                    offsetBildInOverview={undefined} // instead of undefine, insert a negative number x for pushing the image x pixels up
                                                    titel={termin.titel}
                                                    kurztext={termin.kurztext ? termin.kurztext : null}
                                                    jahr={undefined}
                                                    besonderheit={termin.besonderheit ? termin.besonderheit : null}
                                                    filmFormat={undefined} // for filmFormat treatment with undefined (instead of null) to have this prop be optional

                                                    tnr={termin.terminId} // for navigation to certain route
                                                />
                                            </div>
                                        );
                                        // screening consists of 1 main film + shorts possibly
                                    } else if (termin.films?.length > 0) {
                                        return (
                                            <div
                                                key={termin.terminId}
                                                style={{
                                                    paddingTop: "1.5rem",
                                                    paddingBottom: "1.5rem"
                                                }}
                                            >
                                                <TerminFilmOverviewCard
                                                    screeningWeekday={screeningDateObj ? screeningDateObj.weekday : ""}
                                                    screeningDate={screeningDateObj ? screeningDateObj.date : ""}
                                                    screeningTime={screeningDateObj ? screeningDateObj.time : ""}
                                                    screeningSonderfarbe={"pupille-glow"}
                                                    bild={termin.films[0].bild ? termin.films[0].bild : null}
                                                    offsetBildInOverview={undefined} // instead of undefine, insert a negative number x for pushing the image x pixels up
                                                    titel={termin.films[0]?.titel ? termin.films[0]?.titel : null}
                                                    kurztext={termin.films[0]?.kurztext ? termin.films[0]?.kurztext : null}
                                                    jahr={termin.films[0]?.jahr}
                                                    besonderheit={termin.films[0]?.besonderheit ? termin.films[0]?.besonderheit : null}
                                                    filmFormat={termin.films[0]?.format ? termin.films[0]?.format : undefined}  // for filmFormat treatment with undefined (instead of null) to have this prop be optional

                                                    tnr={termin.terminId} // for navigation to certain route
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

            </>

        </div>

    );


}