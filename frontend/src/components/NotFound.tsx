// components/NotFound.tsx
import vincentGif from "../assets/images/404-vincent.gif";

interface NotFoundProps {
    text?: string;
}

export default function NotFound({text = "Die angeforderte Seite existiert nicht."}: Readonly<NotFoundProps>) {
    return (
        <div className="container mt-5 text-center">
            <img
                src={vincentGif}
                alt="Confused Vincent Vega"
                style={{ maxWidth: "100%", height: "auto", borderRadius: '6px', marginBottom: "25px" }}
            />

            {/*<img*/}
            {/*    src={obiGif}*/}
            {/*    alt="Obi-Wan Kenobi uses a Jedi Mind Trick on Stormtroopers to convince them that R2-D2 and C-3PO are not the droids they are looking for."*/}
            {/*    style={{ maxWidth: "95%", height: "auto", borderRadius: '6px',marginBottom: "20px" }}*/}
            {/*/>*/}

            <h4>{text}</h4>

            {/*<Button as={Link} to="/" variant="outline-success">*/}
            {/*    Zur Startseite*/}
            {/*</Button>*/}
        </div>
    );
}

