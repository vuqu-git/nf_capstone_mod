// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
//
// import './Header.css';
//
// export default function Header() {
//     return (
//         <Navbar expand="lg" className="custom-navbar">
//                 <Navbar.Brand href="#home"
//                               className="logo-container"
//                 >
//                     {/*<Image src="https://pupille.org/bilder/allgemein/Pupille-Logo.svg" fluid/>*/}
//                     Pupille Logo
//                 </Navbar.Brand>
//                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
//                 <Navbar.Collapse id="basic-navbar-nav">
//                     <Nav className="mx-auto">
//                         <Nav.Link href="#home">Home</Nav.Link>
//
//                         <NavDropdown
//                             title="Programm"
//                             id="basic-nav-dropdown"
//                             className="custom-dropdown-bg"
//                         >
//                             <NavDropdown.Item href="#action/3.1">Programmheft als pdf</NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.2">
//                                 Archiv
//                             </NavDropdown.Item>
//                         </NavDropdown>
//
//                         <NavDropdown
//                             title="Infos & Service"
//                             id="basic-nav-dropdown"
//                             className="custom-dropdown-bg"
//                         >
//                             <NavDropdown.Item href="#action/3.1">Kinobesuch</NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.2">
//                                Triggerwarnungen & Content Notes
//                             </NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.3">Filme zeigen</NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.3">Unsere Kinogeschichte</NavDropdown.Item>
//
//                             <NavDropdown.Divider />
//                             <NavDropdown.Item href="#action/3.4">
//                                 Kontakt
//                             </NavDropdown.Item>
//                             <NavDropdown.Item href="#action/3.4">
//                                 Impressum
//                             </NavDropdown.Item>
//                         </NavDropdown>
//
//                         <Nav.Link href="#home">FB</Nav.Link>
//                         <Nav.Link href="#home">Insta</Nav.Link>
//
//                     </Nav>
//                 </Navbar.Collapse>
//         </Navbar>
//     );
// }

import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import "./Header.css"; // Import your custom CSS file

function Header() {
    return (
        <Navbar expand="lg" className="custom-navbar">
            <Container>
                <Navbar.Brand href="#home">Pupillelogo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">

                        <Nav.Link href="#home">Home</Nav.Link>

                        <NavDropdown title="Programm" id="basic-nav-dropdown" className="custom-dropdown">
                            <NavDropdown.Item href="#action/1.1">Heft als pdf</NavDropdown.Item>
                            <NavDropdown.Item href="#action/1.2">
                                Archiv
                            </NavDropdown.Item>

                        </NavDropdown>

                        <NavDropdown title="Infos & Service" id="basic-nav-dropdown" className="custom-dropdown">
                            <NavDropdown.Item href="#action/2.1">Kinobesuch</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.2">
                                Triggerwarnungen & Content Notes
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.3">Filme zeigen</NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.4">Unsere Kinogeschichte</NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/2.5">
                                Kontakt
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/2.6">
                                Impressum
                            </NavDropdown.Item>
                        </NavDropdown>

                        <Nav.Link href="#fb">FB</Nav.Link>

                        <Nav.Link href="#insta">Insta</Nav.Link>

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;