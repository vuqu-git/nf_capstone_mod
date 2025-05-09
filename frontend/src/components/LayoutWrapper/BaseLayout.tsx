import {
    type Location,
    Outlet,
    ScrollRestoration,
    type useMatches,
    useNavigation
} from "react-router-dom";

import {Col, Container, Row} from "react-bootstrap";

import BackToTopButton from "../BackToTopButton.tsx";
import Header2 from "../Header2.tsx";
import {useCallback} from "react";

export default function BaseLayout() {


    return (

        <div className="app-container">

            {/*outside Routes and hence Header is always displayed*/}
            <Header2 />

            <div className="navbar-gradient"></div>
            <main className="main-content">
                <Outlet />
            </main>


        </div>
    );
}