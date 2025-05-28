import Button from "react-bootstrap/Button";

export default function Logout() {
    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + '/logout', '_self')
    }
    return (
        <div className="text-end mb-2">
            <Button onClick={logout} variant="outline-danger">Logout</Button>
        </div>
    );
}