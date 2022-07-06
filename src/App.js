import Home from "./Home";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./index.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className='App'>
        <Home />

        <Routes>
          <Route exact path='/' element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
