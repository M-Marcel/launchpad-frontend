import Home from "./Home";
import Nav from "./components/Nav";
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import {
  coinRight,
  color1,
  color2,
  coinLeft,
} from "./img/index";
import StakeCloudax from "./StakeCloudax";

function App() {
  const connectorId = window.localStorage.getItem("connectorId");
  const chainId = process.env.REACT_APP_CHAIN_ID;
  const { isWeb3Enabled, isAuthenticated, isWeb3EnableLoading, isInitialized, enableWeb3 } = useMoralis();
  useEffect(() => {
    async function bootWeb3() {
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
        await enableWeb3({ provider: connectorId, chainId: chainId });
      }
    }
    bootWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isAuthenticated]);
  return (
    <Router>
      <div className='relative overflow-hidden text-white max-w-[1512px] mx-auto App max-h-fit bg-dark font-dmsans'>
        <img src={color1} alt='bg-color' className='absolute top-0 left-0 -z-4' />
        <img src={color2} alt='bg-color' className='absolute top-0 right-0 -z-4' />
        <img
          src={coinRight}
          alt='bg-color'
          className='absolute hidden md:block md:w-auto md:h-auto max-h-[718.04px] z-0 top-[13%] right-[-55px]'
        />
        <img
          src={coinLeft}
          alt='bg-color'
          className='absolute hidden md:block md:w-auto md:h-auto max-h-[718.04px] top-[55%] z-0 left-0'
        />
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/staking" element={<StakeCloudax />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
