import {Link} from "react-router-dom";
import Login from "./Login.tsx";
import Logout from "./Logout.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

// interface Props {
//
// }

// export default function OverviewArchive({ }: Props) {
export default function Admin() {

    // const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
    const [fetchedUser, setFetchedUser] = useState<string>();


    function getMe() {
        axios.get("/api/oauthgithub/me")
            // .then(() => setLoggedIn(true))
            .then( response => setFetchedUser(response.data))
            .catch(e => console.error(e));
    }

    useEffect(getMe, []);

    return (
        <>
            <Login />
            <Logout />
            {/*<p>{isLoggedIn && "Eingeloggt!"}</p>*/}
            <p>{fetchedUser}</p>

            <h1>Administratives</h1>
            <section>
                <h3>News</h3>
                <ul>
                    <li><Link
                        to={`/addnews`}
                    >
                        Add
                    </Link></li>

                    <li><Link
                        to={`/editnews`}
                    >
                        Edit
                    </Link></li>

                    <li><Link
                        to={`/deletenews`}
                    >
                        Delete
                    </Link></li>
                </ul>
            </section>

            <section>
                <h3>Film</h3>
                <ul>
                    <li><Link
                        to={`/adminfilme`}
                    >
                        Add, Edit, Delete
                    </Link></li>
                </ul>
            </section>

            <section>
                <h3>Termin</h3>
                <ul>
                    <li><Link
                        to={`/admintermine`}
                    >
                        Add, Edit, Delete
                    </Link></li>
                </ul>
            </section>

            <section>
                <h3>Terminverknuepfungen</h3>
                <ul>
                    <li><Link
                        to={`/admintvennew`}
                    >
                        Add, Edit, Delete
                    </Link></li>
                </ul>
            </section>
        </>
    )
};