import Button from "react-bootstrap/Button";
import {useLocation} from "react-router-dom";

export default function Login() {

    const location = useLocation(); // Get the location object
    const message = location.state?.message; // Access the message from the state


    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        // /oauth2/authorization/github <- google, facebook whatever drin stehen
        window.open(host + '/oauth2/authorization/github', '_self')
    }
    return (
        <div style={{ textAlign: "center", marginTop: 40 }}>
            {/* Display the message if it exists */}
            {message && (
                <div style={{ color: 'rgb(255, 208, 54)', marginBottom: 20, fontSize: '1.0em' }}>
                    {message}
                </div>
            )}
            <Button onClick={login} variant="success">Login with Github</Button>
        </div>
    );
}