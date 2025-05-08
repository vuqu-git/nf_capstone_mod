import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// import "./index.css";
import axios from "axios";

import ScreeningDetails from "./components/ScreeningDetails.tsx";
import Gallery2 from "./components/Gallery2.tsx";
import Layout2 from "./components/Layout2.tsx";
import Admin from "./components/Admin.tsx";
import OverviewSemester2 from "./components/OverviewSemester2.tsx";
import OverviewArchive2 from "./components/OverviewArchive2.tsx";
import EditDeleteNews from "./components/news/EditDeleteNews.tsx";
import AddNews from "./components/news/AddNews.tsx";
import TerminverknuepfungFormNew from "./components/terminverkuepfungen/TerminverknuepfungFormNew.tsx";
import TerminForm from "./components/termine/TerminForm.tsx";
import FilmForm from "./components/filme/FilmForm.tsx";
import TerminDTOWithFilmDTOGallery from "./types/TerminDTOWithFilmDTOGallery.ts";
import {News} from "./types/News.ts";
import TerminDTOWithFilmDTOOverviewSemester from "./types/TerminDTOWithFilmDTOOverviewSemester.ts";
import TerminDTOWithFilmDTOOverviewArchive from "./types/TerminDTOWithFilmDTOOverviewArchive.ts";
import ContentNotes from "./components/ContentNotes.tsx";
import ProjektionAufLeinwand from "./components/ProjektionAufLeinwand.tsx";
import ContactForm from "./components/contact/ContactForm.tsx";
import Impressum from "./components/Impressum.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout2 />,
        children: [
            {
                index: true,
                loader: getGalleryData,
                element: <Gallery2 />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "semester",
                loader: getSemesterScreenings,
                element: <OverviewSemester2 />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "archive",
                loader: getArchiveScreenings,
                element: <OverviewArchive2 />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "details/:tnr",
                element: <ScreeningDetails />,
                // no usage of loader here, beacuse the data is fetched with ScreeningDetails
                // loader: ({ params }) => getScreeningDetails(params.tnr),
                handle: { scrollMode: "pathname" } // this child inherits the parent's scroll behavior if no handle is specified here, the parent in this case is the root path "/"
            },
            {
                path: "contentnotes",
                element: <ContentNotes />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "kinoprojektion",
                element: <ProjektionAufLeinwand />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "kontakt",
                element: <ContactForm />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "impressum",
                element: <Impressum />,
                handle: { scrollMode: "pathname" },
            },

            {
                path: "admin",
                element: <Admin />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "addnews",
                element: <AddNews />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "editnews",
                element: <EditDeleteNews />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "deletenews",
                element: <EditDeleteNews />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "adminfilme",
                element: <FilmForm />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "admintermine",
                element: <TerminForm />,
                handle: { scrollMode: "pathname" },
            },
            {
                path: "admintvennew",
                element: <TerminverknuepfungFormNew />,
                handle: { scrollMode: "pathname" },
            },

            // {
            //     path: "link-to-hash",
            //     loader: getArrayLoader,
            //     element: <LongPage />,
            // },
        ],
    },
]);

if (import.meta.hot) {
    import.meta.hot.dispose(() => router.dispose());
}

export default function App2() {
    return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}


// #############################
// for Gallery.tsx

export interface GalleryData {
    screeningGalleryEntries: TerminDTOWithFilmDTOGallery[];
    validNews: News[];
}

async function getGalleryData(): Promise<GalleryData> {
    try {
        // Fetch both endpoints concurrently
        const [response1, response2] = await Promise.all([
            axios.get<TerminDTOWithFilmDTOGallery[]>("/api/screenings"),
            axios.get<News[]>("/api/news")
        ]);

        return {
            screeningGalleryEntries: response1.data,
            validNews: response2.data
        };
    } catch (error) {
        throw new Response("Failed to load gallery data", { status: 500 });
        // Throwing a Response:
        //     This is a pattern encouraged by React Router when you want to signal an HTTP-like error (e.g., 404, 401, 500).
        //     This is the preferred way if you want your loader to communicate a specific error back to the router and potentially trigger an errorElement.
        //     If you throw a Response, React Router will catch it and render your route's errorElement (if defined), passing the thrown Response to it.
        //
        // This is useful if you want to show a user-friendly error page, or handle errors at the route level.
        //     Throwing a regular Error:
        //     If you throw a regular Error, React Router will also catch it and render the errorElement, but the error object will be an instance of Error, not Response.
        //     This is often used for application-level errors that aren't necessarily HTTP errors.
    }
}

// #############################
// only for test purposes
async function getScreeningDetails(tnr: string) {
    const response = await fetch(`/api/screenings/${tnr}`);

    if (!response.ok) throw new Error("Details not found");

    // While response.json() is the standard way to handle JSON APIs, your loader function can indeed return any JavaScript object (or any JavaScript value, for that matter).
    return response.json();
}

// #############################
// for OverviewSemester.tsx
async function getSemesterScreenings(): Promise<TerminDTOWithFilmDTOOverviewArchive[]> {
    try {
        const response = await fetch(`/api/screenings-semester`);
        if (!response.ok) {
            const errorText = await response.text();
            // This throw statement is executed only if the fetch request is successful IN THE SENSE that it returns a response, but that response indicates an error according to the HTTP status code. This means the server received your request and sent back a reply, but the reply said something went wrong (e.g., 404 Not Found, 500 Internal Server Error, etc.).
            // What it signifies: This throw indicates a server-side issue or a problem with the specific resource you were trying to access. The response.status property will contain the exact HTTP status code provided by the server, giving you more specific information about the nature of the error. The errorText likely contains a message from the server explaining the error further
            throw new Response(`Failed to fetch semester screenings: ${errorText}`, {
                status: response.status,
            });
        }
        return await response.json();
    } catch (error) {
        // Client-side errors that occur before or after the fetch request is initiated or successfully completes (in terms of receiving a valid HTTP response)
        // Use throw error (or throw new Error(...)) when you're in a truly exceptional or unstructured error scenario, such as:
        //     Network errors where no response was returned.
        //     Errors in the app logic that aren't tied to HTTP.
        //     Errors in your loader logic itself (e.g., trying to access a property on an undefined object).
        //     You don’t care about the router handling it, and maybe you're using a global ErrorBoundary.
        console.error("Error fetching semester screenings:", error);
        throw error;
        // also possible:
        // throw new Error("Failed to fetch semester screenings due to a network or unexpected error");

    }
}

// #############################
// for OverviewArchive.tsx
async function getArchiveScreenings(): Promise<TerminDTOWithFilmDTOOverviewSemester[]> {
    try {
        const response = await fetch(`/api/screenings-archive`);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Response(`Failed to fetch archive screenings: ${errorText}`, {
                status: response.status,
            });
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching semester screenings:", error);
        throw new Error("Failed to fetch archive screenings due to a network or unexpected error");
    }
}