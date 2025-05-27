export default function Logout() {
    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin
        window.open(host + '/logout', '_self')
    }
    return (
        <button onClick={logout}>Logout</button>
    );
}