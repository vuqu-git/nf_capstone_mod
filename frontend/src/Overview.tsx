
import Container from "react-bootstrap/Container";
import {useState, useEffect} from "react";
import {News} from "./types/News.ts";

import axios from "axios";
import NewsCard from "./types/NewsCard.tsx";


export default function Overview() {

    const baseURL = "/api/news/all"


    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(false);

    const getNews = () => {
        console.log("Fetching Movies...")

        axios.get(baseURL)
            .then((response) => {
                console.log("Request finished")
                console.log(response.data)
                setNews(response.data)
            })
            .catch((errorResponse) => {
                console.log(errorResponse)
            })

        console.log("Movies fetched successfully!")
    }

    useEffect(() => {
        getNews();
    }, [])

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <main className="main-content">
            <Container>
                <h1>Welcome to Pupille</h1>
                <p>
                    This is the main content area. Here you can add text, images, or any other
                    elements you'd like to display on your page. The layout is responsive and
                    aligned with the header.
                </p>
                <section>
                    <h2>About Us</h2>
                    <p>
                        Pupille is a community-driven initiative that brings people together
                        through film screenings, discussions, and events. Our goal is to create
                        a space for meaningful engagement and shared experiences.
                    </p>
                </section>
                <section>
                    <h2>Upcoming Events</h2>
                    <ul>
                        <li>Film Screening: March 31, 2025</li>
                        <li>Workshop: April 15, 2025</li>
                        <li>Community Meetup: May 10, 2025</li>
                    </ul>
                </section>
                <section>
                    <h2>Upcoming Screenings</h2>
                    {   news.map( n => (
                            <NewsCard variant="warning" description={n.description}/>
                            )
                        )
                    }
                </section>
            </Container>
        </main>
    );
}