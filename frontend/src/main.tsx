import {StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import {BrowserRouter} from "react-router-dom";
import App2 from "./App2.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      {/*<BrowserRouter>*/}
      {/*  <App />*/}
      {/*</BrowserRouter>*/}
      <App2 />
  </StrictMode>,
)
