import {useEffect, useState} from "react";

import './Overview.css';

import axios from "axios";
import TerminDTOWithFilmDTOOverviewArchive from "../types/TerminDTOWithFilmDTOOverviewArchive.ts";
import {formatDateInOverviewArchive} from "../utils/formatDateInOverviewArchive.ts";
import {render} from "../utils/render.tsx";
import {Link} from "react-router-dom";
import BackToTopButton from "./BackToTopButton.tsx";


// interface Props {
//
// }

// export default function OverviewArchive({ }: Props) {
export default function Admin() {


    return (
        <>
            <h1>Administratives</h1>
            <section>
                <h3>News</h3>
                <ul>
                    <li><Link
                        to={`/addnews`}
                        className="custom-link"
                    >
                        Add
                    </Link></li>

                    <li><Link
                        to={`/editnews`}
                        className="custom-link"
                    >
                        Edit
                    </Link></li>

                    <li><Link
                        to={`/deletenews`}
                        className="custom-link"
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
                        className="custom-link"
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
                        className="custom-link"
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
                        className="custom-link"
                    >
                        Add, Edit, Delete
                    </Link></li>
                </ul>
            </section>
        </>
    )
};