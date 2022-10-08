
import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faTwitter, faTelegram, faMedium, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import List from './components/List.jsx';
import logo from './images/cloudax1-_3_.png'

function App({ children }) {
  const year = new Date().getFullYear()
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
    <section className='bg-black text-white'>
      <nav className={`'bg-[#16162d4f] h-16 md:h-18 w-full text-white`}>
        <a href="https://www.cloudax.io/" className="flex justify-between w-11/12  mx-auto h-full items-center">
          <img className=' w-[6rem] ' src={logo} alt='logo' />
        </a>
      </nav>

      {children}

      <footer className='bg-[#16162D] mt-20 w-full  text-white'>
        <div className=' flex justify-center items-center mt-0 px-4 sm:px-0'>
          <div className=' mb-5 md:my-20 flex flex-col xl:flex-row gap-y-10 items-start justify-between w-11/12'>
          <img className=' w-[6rem] mt-8 md:mt-0 mb-[-1rem]' src={logo} alt='logo' />
            <div className='flex flex-col-reverse gap-y-10 lg:flex-row items-start w-full xl:w-3/4 justify-between '>
              <div className='mx-auto lg:mx-0'>
                <p className='font-bold mb-4 text-lg lg:text-2xl text-center sm:text-left'>Community</p>
                <div className='mb-5 mt-2 text-[#e0eeffc9]  text-center flex justify-between w-full lg:text-left'>
                  <a href='https://t.me/cloudaxofficial' className='hover:text-[#2F79F9]'>
                    <FontAwesomeIcon className='text-xl mr-4' icon={faTelegram} /></a>
                  <a href='http://cloudax.medium.com/' className='hover:text-[#2F79F9]'>
                    <FontAwesomeIcon className='text-xl mr-4' icon={faMedium} /></a>
                  <a href='/' className='hover:text-[#2F79F9]'>
                    <FontAwesomeIcon className='text-xl mr-4' icon={faGithub} /> </a>
                  <a className='hover:text-[#2F79F9]' target='blank' href='https://twitter.com/cloudaxofficial'>
                    <FontAwesomeIcon className='text-xl mr-4' icon={faTwitter} /></a>
                </div>
              </div>
              <div className='flex w-full flex-col md:flex-row gap-y-5 lg:w-[70%] justify-between'>
                <List h1='Ecosystem' p='Join Presale' link1='https://launchpad.cloudax.io/' link2='http://swap.cloudax.io/swap' link3='http://docs.cloudax.io/' p1='Dex' p2='Whitepaper' />
  
                <List h1='Discover' link1='http://cloudax.medium.com/' link2='http://cloudax.medium.com/' p='Medium' p1='Getting Started' p2='BscScan' soon='soon' />

                <List link1='/' link2='https://www.cloudax.io/faq' link3='https://www.cloudax.io/disclaimer' link4='http://cloudax.medium.com/' h1='Explore' p='Academy' p1='FAQ' p2='Disclaimer' sooner='soon' />
              </div>
            </div>
          </div>
        </div>

        <div className='h-[5rem] flex flex-col md:flex-row justify-center  md:justify-between items-center w-11/12 mx-auto border-t border-[#ffffff26] text-[#e0eeffc9] '>
          <div className='flex gap-10'>
            <a href='https://www.cloudax.io/privacy'>Privacy Policy</a>
            <a href='https://www.cloudax.io/terms'>Terms of Use</a>
          </div>
          <p><FontAwesomeIcon icon={faCopyright} /> All rights reserved Cloudax {year} </p>
        </div>
      </footer>
    </section>
  );
}

export default App;
