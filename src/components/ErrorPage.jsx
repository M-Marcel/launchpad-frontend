import { Link } from "react-router-dom";


function ErrorPage() {
    return(
         <div className="h-screen relative   text-white lg:h-[300px] flex items-center z-50 padding mt-20 " >

     <div>
       <h1 className="text-white text-4xl md:text-8xl z-50 font-monument ">Error 404</h1>
      <p className="text mt-4">Page not found</p>
      <div className="mt-5">
      <Link to="/" className="btn text">Return to homepage</Link>

      </div>
      </div>
      </div>
    )
}

 export default ErrorPage;