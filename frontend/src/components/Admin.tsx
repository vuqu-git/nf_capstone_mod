import {Link} from "react-router-dom";
import Logout from "./security/Logout.tsx";

// interface Props {
//
// }

// export default function OverviewArchive({ }: Props) {
export default function Admin() {

    return (
        <>
            <Logout />
            <h1>Administratives</h1>
            <section>
                <h3>News</h3>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/addnews" className="btn btn-dark mb-2">
                            Add
                        </Link>
                    </li>
                    <li>
                        <Link to="/editnews" className="btn btn-dark mb-2">
                            Edit
                        </Link>
                    </li>
                    <li>
                        <Link to="/deletenews" className="btn btn-dark mb-2">
                            Delete
                        </Link>
                    </li>
                </ul>
            </section>

            <section>
                <h3>Film</h3>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/adminfilme" className="btn btn-secondary mb-2">
                            Add, Edit, Delete
                        </Link>
                    </li>
                </ul>
            </section>

            <section>
                <h3>Termin</h3>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/admintermine" className="btn btn-secondary mb-2">
                            Add, Edit, Delete
                        </Link>
                    </li>
                </ul>
            </section>

            <section>
                <h3>Reihe</h3>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/adminreihen" className="btn btn-secondary mb-2">
                            Add, Edit, Delete
                        </Link>
                    </li>
                </ul>
            </section>

            <section>
                <h3>Terminverknüpfung (Termin ↔ Film)</h3>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/admintven" className="btn btn-outline-secondary mb-2">
                            Add, Edit, Delete
                        </Link>
                    </li>
                </ul>
            </section>

            <section>
                <h3>Reiheverknüpfung (Reihe ↔ Termin)</h3>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/adminrven" className="btn btn-outline-secondary mb-2">
                            Add, Edit, Delete
                        </Link>
                    </li>
                </ul>
            </section>

            <section>
                <h3>Programmhefte/Flyer</h3>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/adminprogrammhefte" className="btn btn-light mb-2">
                            Add, Edit, Delete
                        </Link>
                    </li>
                </ul>
            </section>
        </>
    )
};