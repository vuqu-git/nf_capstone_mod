import {useState, useEffect} from "react";
import {News} from "../types/News.ts";

import axios from "axios";
import NewsCard from "./news/NewsCard.tsx";
import {useAllNews} from "../hooks/useAllNews.ts";
import TerminDTOWithFilmDTOOverviews from "../types/TerminDTOWithFilmDTOOverviews.ts";

import { formatDateTime } from '../utils/DateTimeFormatForOverview.ts';
import TerminFilmOverviewCard from "./termine/TerminFilmOverviewCard.tsx";


export default function Overview() {

    const {
        isLoadingAllNews,
        allNews,
        error,
        setError,
    } = useAllNews(false);

    const [validNews, setValidNews] = useState<News[]>([]);
    const [isLoadingValidNews, setIsLoadingValidNews] = useState(false);

    const getValidNews = () => {
        setIsLoadingValidNews(true);

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
            setIsLoadingValidNews(false);
        });
    }

    const [screeningOverviewEntries, setScreeningOverviewEntries] = useState<TerminDTOWithFilmDTOOverviews[]>([]);

    const getScreeningOverviewEntries = () => {
        setIsLoadingValidNews(true);

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
                setIsLoadingValidNews(false);
            });
    }

    useEffect(() => {
        getValidNews();

        getScreeningOverviewEntries();
    }, [])

    return (
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
                    {   isLoadingValidNews ? (
                            <div className="text-warning mb-3">&#x1f504; Loading valid news...</div>
                        ) :
                        validNews && (
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
                    {isLoadingValidNews ? (
                        <div className="text-warning mb-3">&#x1f504; Loading valid news...</div>
                    ) : (
                        screeningOverviewEntries && (
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
                                                    paddingTop: "3rem",
                                                    paddingBottom: "3rem"
                                                }}
                                            >
                                                <TerminFilmOverviewCard
                                                    screeningWeekday={screeningDateObj?.weekday}
                                                    screeningDate={screeningDateObj?.date}
                                                    screeningTime={screeningDateObj?.time}
                                                    screeningSonderfarbe={"red-glow"}
                                                    bild={termin.films[0]?.bild}
                                                    titel={termin.titel}
                                                    kurztext={termin.kurztext}
                                                    besonderheit={termin.besonderheit}
                                                    filmFormat={undefined}
                                                />
                                            </div>
                                        );
                                        // screening consists of 1 main film + shorts possibly
                                    } else if (termin.films?.length > 0) {
                                        return (
                                            <div
                                                key={termin.terminId}
                                                style={{
                                                    paddingTop: "3rem",
                                                    paddingBottom: "3rem"
                                                }}
                                            >
                                                <TerminFilmOverviewCard
                                                    screeningWeekday={screeningDateObj?.weekday}
                                                    screeningDate={screeningDateObj?.date}
                                                    screeningTime={screeningDateObj?.time}
                                                    screeningSonderfarbe={"pupille-glow"}
                                                    bild={termin.films[0]?.bild}
                                                    titel={termin.films[0]?.titel}
                                                    kurztext={termin.films[0]?.kurztext}
                                                    besonderheit={termin.films[0]?.besonderheit}
                                                    filmFormat={termin.films[0]?.format}
                                                />
                                            </div>
                                        );
                                    }
                                    return null; // Add a default return to handle cases where neither condition is met
                                })}
                            </>
                        )
                    )}
                </section>

            </>

    );
}