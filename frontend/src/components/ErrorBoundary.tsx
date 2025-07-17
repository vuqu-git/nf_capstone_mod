// components/ErrorBoundary.tsx
import {useRouteError, isRouteErrorResponse, Link} from "react-router-dom";

export default function ErrorBoundary() {
                        // hook provides access to the error object that caused the route to render the errorElement. This could be an error thrown in a loader, action, or during rendering.
    const error = useRouteError();

    // checks if the error is a special Response object thrown by React Router (e.g., when you throw new Response(...) in a loader). This is useful for HTTP-like errors (e.g., 404, 500) where you want to show a status code and message.
    // Custom Error UI:
    //     If the error is a Response (i.e. isRouteErrorResponse(error) === true):
    //          It displays the HTTP status code, status text, and any custom message (error.data).
    //
    //     If the error is a regular JavaScript Error:
    //          It displays a generic “Unbekannter Fehler” (Unknown Error) message and the error’s .message if available.
    //
    // User-Friendly Recovery:
    // Both cases include a button to navigate back to the home page.
    if (isRouteErrorResponse(error)) {
        // Response-like Error (HTTP-style) => lets you show user-friendly, server-generated error messages (e.g., “404 – Not Found” or “500 – Internal Server Error”) and any additional info from the server
        return (
            <div className="container mt-5 text-center">
                <h1>{error.status} - {error.statusText}</h1>
                <p>{error.data || "Etwas ist schiefgelaufen."}</p>
                <Link to="/" className="btn btn-primary">Zurück zur Startseite</Link>
            </div>
        );
    }

    // Regular Error (Unexpected Error) => This catches unexpected errors (e.g., network failures, bugs)
    return (
        <div className="container mt-5 text-center">
            <h1>Unbekannter Fehler</h1>
            <p>{(error as Error)?.message || "Etwas ist schiefgelaufen."}</p>
            <Link to="/" className="btn btn-secondary">Zurück zur Startseite</Link>
        </div>
    );
}
