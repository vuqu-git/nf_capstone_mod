import {useState, useEffect} from "react";
import {News} from "../types/News.ts";

import axios from "axios";
import NewsCard from "./NewsCard.tsx";
import {useAllNews} from "../hooks/useAllNews.ts";

const baseURL = "/api/news"

export default function Overview() {

    const {
        isLoadingAllNews,
        allNews,
        error,
        setError,
        getAllNews,
    } = useAllNews(false);

    const [validNews, setValidNews] = useState<News[]>([]);
    const [isLoadingValidNews, setIsLoadingValidNews] = useState(false);

    const getValidNews = () => {
        setIsLoadingValidNews(true);

        axios.get(baseURL)
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

    useEffect(() => {
        getAllNews();
        getValidNews();
    }, [])

    return (
            <>
                <h1>Welcome to Pupille</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>

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
                    <h2>(valid) News</h2>
                    {   isLoadingValidNews ? (
                            <div className="text-warning mb-3">&#x1f504; Loading valid news...</div>
                        ) :
                        validNews.map(n => (
                            <NewsCard key={n.id} variant={n.newsVariant} text={n.text} imageUrl={n.image}/>
                        ))

                    }
                </section>
            </>

    );
}