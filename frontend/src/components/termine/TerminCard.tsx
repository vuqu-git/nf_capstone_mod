import './TerminCard.css';
import {render} from "../../utils/render.tsx";

interface TerminCardProps {
    screeningWeekday: string | undefined;
    screeningDate: string | undefined;
    screeningTime: string | undefined;
    screeningSonderfarbe: string;
    bild: string | undefined;

    // programmTitel: string;
    // programmKurztext: string;
    // programmBesonderheit: string;
    //
    // filmTitel: string;
    // filmKurztext: string;
    // filmBesonderheit: string;
    // filmFormat: string

    titel: string | undefined;
    kurztext: string | undefined;
    besonderheit: string | undefined;

    filmFormat: string
}

export default function TerminCard({
                                       screeningWeekday,
                                       screeningDate,
                                       screeningTime,
                                       screeningSonderfarbe,
                                       bild,

                                       // programmTitel,
                                       // programmKurztext,
                                       // programmBesonderheit,
                                       //
                                       // filmTitel,
                                       // filmKurztext,
                                       // filmBesonderheit,

                                       titel,
                                       kurztext,
                                       besonderheit,
                                       filmFormat,
                                   }: TerminCardProps) {



    return (
        <div className="movie_card" id="ave">
            <div className="info_section">
                <div className="movie_header">
                    <h1>{render(titel)}</h1>
                    <h3>{screeningWeekday}, {screeningDate} {screeningTime}</h3>

                    {/*<h4>2018, Roar Uthaug</h4>*/}
                    {filmFormat?.includes("mm") &&  <span className="minutes">{filmFormat}</span>}
                    {/*<p className="type">Action, Fantasy</p>*/}
                </div>
                <div className="movie_desc">
                    <p className="text">
                        {render(kurztext)}
                    </p>
                    <p className="text">
                        {render(besonderheit)}
                    </p>
                </div>
                {/*<div className="movie_social">*/}
                {/*    <ul>*/}
                {/*        <li><i className="material-icons">share</i></li>*/}
                {/*        <li><i className="material-icons"></i></li>*/}
                {/*        <li><i className="material-icons">chat_bubble</i></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
            {/* Style object for background image */}
            <div
                className="blur_back"
                style={{
                    backgroundImage: `url(https://www.pupille.org/bilder/filmbilder/${bild})`,
                    backgroundSize: 'cover',
                }}
            ></div>
        </div>
    );
};



// <div className="movie_card" id="tomb">
//     <div className="info_section">
//         <div className="movie_header">
//             <h1>Tomb Raider</h1>
//             <h4>2018, Roar Uthaug</h4>
//             <span className="minutes">125 min</span>
//             <p className="type">Action, Fantasy</p>
//         </div>
//         <div className="movie_desc">
//             <p className="text">
//                 Lara Croft, the fiercely independent daughter of a missing adventurer, must push herself beyond
//                 her limits when she finds herself on the island where her father disappeared.
//             </p>
//         </div>
//         <div className="movie_social">
//             <ul>
//                 <li><i className="material-icons">share</i></li>
//                 <li><i className="material-icons"></i></li>
//                 <li><i className="material-icons">chat_bubble</i></li>
//             </ul>
//         </div>
//     </div>
//     {/* Style object for background image */}
//     <div
//         className="blur_back"
//         style={{
//             backgroundImage:
//             // "url('https://fsmedia.imgix.net/cd/c9/5e/ba/4817/4d9a/93f0/c776ec32ecbc/lara-crofts-neck-looks-unnatural-in-the-new-poster-for-tomb-raider.png')",
//                 "url('https://www.pupille.org/bilder/filmbilder/Oppenheimer.jpg')",
//             backgroundSize: 'cover',
//         }}
//     ></div>
// </div>