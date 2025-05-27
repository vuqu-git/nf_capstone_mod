export default function Login() {
    function login() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        // /oauth2/authorization/github <- google, facebook whatever drin stehen
        window.open(host + '/oauth2/authorization/github', '_self')
    }
    return (
        <button onClick={login}>Login with Github</button>
    );
}