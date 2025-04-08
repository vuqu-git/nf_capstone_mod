import {useState, useEffect} from "react";
import {News} from "../types/News.ts";

import axios from "axios";
import NewsCard from "./news/NewsCard.tsx";
import {useAllNews} from "../hooks/useAllNews.ts";
import Screening from "../types/Screening.ts";

import { formatDateTime } from '../utils/DateTimeFormatForOverview.ts';

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

    const [screeningOverviewEntries, setScreeningOverviewEntries] = useState<Screening[]>([]);

    const getScreeningOverviewEntries = () => {
        setIsLoadingValidNews(true);

        axios.get("api/screenings")
            .then((response) => {
                setScreeningOverviewEntries(response.data)
            })
            .catch((error) => {
                const errorMessage =
                    error instanceof Error ? error.message : "Fetching Screening Overview Entries failed";
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
                <h1>Welcome to Pupille</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>

                <section>
                    <h2>(all) News</h2>
                    {   isLoadingAllNews ? (
                        <div className="text-warning mb-3">&#x1f504; Loading all news...</div>
                    ) : error ? (
                        <div className="text-danger mb-3">{error}</div>
                    ) : (
                        allNews.map(n => (
                            <NewsCard key={n.id} variant={n.newsVariant} text={n.text} imageUrl={n.image}/>
                            )
                        ))
                    }
                </section>

                <section>
                    <h2>(valid) News</h2>
                    {   isLoadingValidNews ? (
                            <div className="text-warning mb-3">&#x1f504; Loading valid news...</div>
                        ) :
                        validNews.map(n => (
                            <NewsCard key={n.id} variant={n.newsVariant} text={n.text} imageUrl={n.image}/>
                        ))

                    }
                </section>

                <section>
                    {isLoadingValidNews ? (
                        <div className="text-warning mb-3">&#x1f504; Loading valid news...</div>
                    ) : (
                        screeningOverviewEntries.map(termin => {
                            // Add logic here if needed

                            const screeningDate = formatDateTime(termin.screeningTime);


                            if (termin.titel !== null && termin.titel !== "") {
                                return  (
                                    <div
                                        key={termin.terminId}
                                        style={{padding: "30px"}}
                                    >
                                        <h3>{termin.titel}</h3>
                                        <p>
                                            {screeningDate?.weekday}, {screeningDate?.date} {screeningDate?.time}
                                        </p>
                                        <img src={`https://www.pupille.org/bilder/filmbilder/${termin.films[0]?.bild}`} height="300"/>
                                        {termin.kurztext && <p>{termin.kurztext}</p>}
                                        {termin.besonderheit && <p>{termin.besonderheit}</p>}
                                    </div>
                                );
                            } else if (termin.films.length > 0) {
                                return  (
                                    <div
                                        key={termin.terminId}
                                        style={{padding: "30px"}}
                                    >
                                        <h3>{termin.films[0].titel}</h3>
                                        <p>
                                            {screeningDate?.weekday}, {screeningDate?.date} {screeningDate?.time}
                                        </p>
                                        <img src={`https://www.pupille.org/bilder/filmbilder/${termin.films[0].bild}`} height="300"/>
                                        {termin.kurztext && <p>{termin.kurztext}</p>}
                                        {termin.besonderheit && <p>{termin.besonderheit}</p>}
                                    </div>
                                );
                            }
                        })
                    )}
                </section>
            </>

    );
}