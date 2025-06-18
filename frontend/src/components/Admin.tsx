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
                        <Link to="/addnews" className="btn btn-secondary mb-2">
                            Add
                        </Link>
                    </li>
                    <li>
                        <Link to="/editnews" className="btn btn-secondary mb-2">
                            Edit
                        </Link>
                    </li>
                    <li>
                        <Link to="/deletenews" className="btn btn-secondary mb-2">
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
                <h3>Terminverknüpfungen</h3>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/admintven" className="btn btn-secondary mb-2">
                            Add, Edit, Delete
                        </Link>
                    </li>
                </ul>
            </section>

            <section>
                <h3>Reihen</h3>
                <ul className="list-unstyled">
                    <li>
                        <Link to="/adminreihen" className="btn btn-secondary mb-2">
                            Add, Edit, Delete
                        </Link>
                    </li>
                </ul>
            </section>
        </>
    )
};