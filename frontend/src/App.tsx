import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/Header.tsx";
import Overview from "./components/Overview.tsx";
import {Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";

import AddNews from "./components/AddNews.tsx";
import EditDeleteNews from "./components/EditDeleteNews.tsx";

function App() {


  return (

      <div className="app-container">
          {/* outside Routes and hence Header is always displayed */}
          <Header />
          <main className="main-content">
              <Container>
                  <Routes>
                      <Route path="/" element={<Overview />} />

                      <Route path="/addnews" element={<AddNews />} />
                      <Route path="/editnews" element={<EditDeleteNews />} />
                      <Route path="/deletenews" element={<EditDeleteNews />} />

                  </Routes>
              </Container>
          </main>
      </div>
  )
}

export default App
