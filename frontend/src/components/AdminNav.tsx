import {Link} from "react-router-dom";
import Logout from "./Logout.tsx";

export default function AdminNav() {
    return (
        <nav className="d-flex justify-content-between align-items-center mb-4">
            <Link to="/admin" className="btn btn-outline-success">
                Zurück
            </Link>

            <Logout />
        </nav>
    )
}