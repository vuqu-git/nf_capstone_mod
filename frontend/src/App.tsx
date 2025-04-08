import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header.tsx";
import Overview from "./components/Overview.tsx";
import {Route, Routes} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

import AddNews from "./components/news/AddNews.tsx";
import EditDeleteNews from "./components/news/EditDeleteNews.tsx";
import AddEditFilms from "./components/filme/AddEditFilms.tsx";
import FilmForm from "./components/filme/FilmForm.tsx";
import TerminForm from "./components/termine/TerminForm.tsx";

import DTpicker from "./components/termine/DTpicker.tsx";
import TerminverknuepfungForm from "./components/terminverkuepfungen/TerminverknuepfungForm.tsx";

function App() {


  return (

      <div className="app-container">
          {/* outside Routes and hence Header is always displayed */}
          <Header />
          <main className="main-content">
              <Container>
                  <Row className="justify-content-center"> {/* Center the content */}
                      <Col md={8} lg={8}> {/* Adjust the column widths for different screen sizes */}

                  <Routes>
                      <Route path="/" element={<Overview />} />

                      <Route path="/addnews" element={<AddNews />} />
                      <Route path="/editnews" element={<EditDeleteNews />} />
                      <Route path="/deletenews" element={<EditDeleteNews />} />

                      <Route path="/addeditfilme" element={<AddEditFilms />} />

                      <Route path="/adminfilme" element={<FilmForm />} />
                      <Route path="/admintermine" element={<TerminForm />} />
                      <Route path="/admintven" element={<TerminverknuepfungForm />} />

                      <Route path="/dtpicker" element={<DTpicker />} />

                  </Routes>

                      </Col>
                  </Row>

              </Container>
          </main>
      </div>
  )
}

export default App
