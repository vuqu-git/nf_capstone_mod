import {Link} from "react-router-dom";

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
                    >
                        Add
                    </Link></li>

                    <li><Link
                        to={`/editnews`}
                    >
                        Edit
                    </Link></li>

                    <li><Link
                        to={`/deletenews`}
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
                    >
                        Add, Edit, Delete
                    </Link></li>
                </ul>
            </section>
        </>
    )
};