import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Child from "./Child.tsx";
import Header from "./Header.tsx";
import Overview from "./Overview.tsx";

function App() {


  return (
      <div className="app-container">
          <Header />
          <Overview />
          <h1>Hello, World!</h1>
          <button className="btn btn-primary">Primary Button</button>
          <Child />
      </div>
  )
}

export default App
