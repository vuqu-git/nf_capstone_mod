import Button from "react-bootstrap/Button";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import Alert from "react-bootstrap/Alert";
import {useAuth} from "./AuthContext.tsx";

// Define a type for the state that can be passed via useLocation
interface LocationState {
    message?: string; // message is optional
}

export default function Login() {
    // Initialize the useNavigate hook for programmatic navigation
    const navigate = useNavigate();

    // Use the LocationState type for useLocation hook's state
    const location = useLocation();
    // Type assertion for location.state
    const message = (location.state as LocationState)?.message;

    // Access the authentication state from the custom useAuth hook.
    const { fetchedUser, loading } = useAuth();

    // useEffect hook to handle the timed redirection
    useEffect(() => {
        // This effect runs whenever 'fetchedUser', 'loading', or 'navigate' changes.
        // We only proceed if the user data has finished loading AND a user is fetched
        // AND that user is NOT "anonymousUser" (meaning they are logged in).
        if (!loading && fetchedUser && fetchedUser !== "anonymousUser") {
            const timer = setTimeout(() => {
                // After n seconds, navigate to the /admin route.
                // 'replace: true' prevents the user from navigating back to /login using the browser's back button.
                navigate("/admin", { replace: true });
            }, 4000); // 1000 milliseconds = 1 second

            // Cleanup function: This will clear the timeout if the component unmounts
            // or if the dependencies of this useEffect (fetchedUser, loading, navigate) change
            // before the 3 seconds are up. This prevents memory leaks and unintended behavior.
            return () => clearTimeout(timer);
        }
    }, [fetchedUser, loading, navigate]); // Dependencies for this effect


    // --- Conditional Rendering based on Authentication Status ---
    // ------------------------------------------------------------
    // 1. Show a loading indicator while checking user status via AuthProvider.
    if (loading) {
        return (
            <div className="text-center mt-4">
                <div>Checking login status...</div>
            </div>
        );
    }

    // 2. If the user is logged in (fetchedUser is not null/anonymousUser),
    //    display the redirection message for k seconds before navigating.
    if (fetchedUser && fetchedUser !== "anonymousUser") {
        return (
            <Alert data-bs-theme="dark" variant="success" className="text-center">
                User "{fetchedUser}" is already logged in and you will be redirected to the admin section forthwith.
            </Alert>
        );
    }

    // // alternative to 2.: If the user is logged in (fetchedUser is not null/anonymousUser), immediate redirect to /admin.
    // if (fetchedUser && fetchedUser !== "anonymousUser") {
    //     return <Navigate to="/admin" replace />;
    // }

    // 3. If not logged in, display the login button and any messages from location state.
    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        // /oauth2/authorization/github <- google, facebook whatever drin stehen
        window.open(host + '/oauth2/authorization/github', '_self')
    }
    return (
        <div className="text-center mt-4">
            <Button onClick={login} variant="success">Login to admin section with Github</Button>
            {/* Display the message if it exists */}
            {message && (
                <Alert data-bs-theme="dark" variant="danger" className="mt-4">
                    {message}
                </Alert>
            )}
        </div>
    );
}