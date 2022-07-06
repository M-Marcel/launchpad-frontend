import Home from "./Home";
import Nav from "./components/Nav";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import "./index.css";
import "./App.css";
import {
  coinRight,
  color1,
  color2,
  coinLeft,

} from "./img/index";

function App() {
  return (
      <Router>
        <div className='relative App overflow-hidden  max-h-fit bg-dark text-white  font-dmsans'>
      <img src={color1} alt='bg-color' className='absolute -z-4   top-0 left-0' />
      <img src={color2} alt='bg-color' className='absolute -z-4   top-0 right-0' />
      <img
        src={coinRight}
        alt='bg-color'
        className='absolute hidden md:block md:w-auto md:h-auto z-0  top-[10%] right-0'
      />
      <img
        src={coinLeft}
        alt='bg-color'
        className='absolute hidden md:block md:w-auto md:h-auto   top-[55%] z-0  left-0'
      />
      <Nav/>

      <Routes>
         <Route path="/" element={<Home/>} />
      <Route path="/Errors" element={<ErrorPage/>} /> 
      </Routes>

      <Footer/>
    </div>
    </Router>
  );
}

export default App;
