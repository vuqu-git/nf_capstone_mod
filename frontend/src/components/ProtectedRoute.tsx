import { useEffect, useState } from "react";
import {Navigate, Outlet} from "react-router-dom";
import axios from "axios";

// List of approved usernames
const APPROVED_USERS = [
    "vuqu-git",
    "user2",
    "yourgithubusername",
    // Add more usernames as needed
];

// export default function ProtectedRoute({ children }) {
//     const [fetchedUser, setFetchedUser] = useState();
//     const [loading, setLoading] = useState(true);
//
//     useEffect(() => {
//         axios.get("/api/oauthgithub/me")
//             .then(response => setFetchedUser(response.data))
//             .catch(() => setFetchedUser("anonymousUser"))
//             .finally(() => setLoading(false));
//     }, []);
//
//     if (loading) return <div>Loading...</div>;
//
//     // Only allow access if user is in the approved list
//     if (
//         !fetchedUser ||
//         fetchedUser === "anonymousUser" ||
//         !APPROVED_USERS.includes(fetchedUser)
//     ) {
//         return <Navigate to="/login" replace />;
//     }
//
//     return children;
// }

export default function ProtectedRoute() {
    const [fetchedUser, setFetchedUser] = useState<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/api/oauthgithub/me")
            .then(response => setFetchedUser(response.data))
            .catch(() => setFetchedUser("anonymousUser"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading...</div>;

    // if (!fetchedUser || fetchedUser === "anonymousUser" || !APPROVED_USERS.includes(fetchedUser)) {
    //     return <Navigate to="/login" replace />;
    // }

    // If user is not fetched, is anonymous, or is not in the approved list
    if (!fetchedUser || fetchedUser === "anonymousUser" || !APPROVED_USERS.includes(fetchedUser)) {
        // Prepare the message to be passed to the /login route
        let message = '';
        if (fetchedUser && fetchedUser !== "anonymousUser") {
            message = `User "${fetchedUser}" is not approved to access the Pupille admin section.`;
        } else {
            message = "You need to log in with your GitHub account to access the Pupille admin section.";
        }
        // => added a message variable that is set based on whether fetchedUser exists and is not "anonymousUser".

        // Navigate to /login and pass the message in the state
        return <Navigate to="/login" replace state={{ message: message }} />;
    }

    // Render nested routes here
    return <Outlet />;
}