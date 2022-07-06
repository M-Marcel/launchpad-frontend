import { Link } from "react-router-dom";
import {
  logo,
} from "../img/index";


function Nav() {
    return(
      <div>
      <nav className='padding pt-8 lg:pt-20 justify-between items-center flex'>
        <div className='logo z-50 flex'>
          <img src={logo} alt='bg-color' />
          <h2 className='font-monument font-bold hidden md:block text-2xl ml-3'>
            Cloudax
          </h2>
        </div>
        <Link to='/Errors' className='   btn'>Error</Link>
        {/* <button className='   btn'>Connect</button> */}
      </nav>
      </div>
    );
}

export default Nav;
