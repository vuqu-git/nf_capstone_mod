import {useState, useEffect} from "react";
import {News} from "../types/News.ts";

import axios from "axios";
import NewsCard from "./NewsCard.tsx";

export default function Overview() {

    const baseURL = "/api/news"

    const [loading, setLoading] = useState(false);

    const [allNews, setAllNews] = useState<News[]>([]);

    const getAllNews = () => {
        console.log("Fetching Movies...")

        axios.get(baseURL + "/all")
            .then((response) => {
                console.log("Request finished")
                console.log(response.data)
                setAllNews(response.data)
            })
            .catch((errorResponse) => {
                console.log(errorResponse)
            })

        console.log("Movies fetched successfully!")
    }

    const [validNews, setValidNews] = useState<News[]>([]);

    const getValidNews = () => {
        console.log("Fetching Movies...")

        axios.get(baseURL)
            .then((response) => {
                console.log("Request finished")
                console.log(response.data)
                setValidNews(response.data)
            })
            .catch((errorResponse) => {
                console.log(errorResponse)
            })

        console.log("Movies fetched successfully!")
    }

    useEffect(() => {
        getAllNews();
        getValidNews();
    }, [])

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
            <>
                <h1>Welcome to Pupille</h1>
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>

                <section>
                    <h2>(all) News</h2>
                    {   allNews.map(n => (
                            <NewsCard key={n.id} variant={n.newsVariant} text={n.text} imageUrl={n.image}/>
                            )
                        )
                    }
                </section>

                <section>
                    <h2>(valid) News</h2>
                    {   validNews.map(n => (
                            <NewsCard key={n.id} variant={n.newsVariant} text={n.text} imageUrl={n.image}/>
                        )
                    )
                    }
                </section>
            </>

    );
}