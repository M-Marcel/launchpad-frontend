import { useMoralis } from "react-moralis";
import ConnectWallet from "./auth/ConnectWallet";
import useNetworkStatus from "./hooks/useNetworkStatus";
import {
  explore,
  twitter,
  discord,
  medium,
  coinLeft,
  coinRight,
  color1,
  color2,
  coin,
  logo,
  twitterFooter,
  telegramFooter,
  mediumFooter,
} from "./img";
import LaunchpadSale from "./LaunchpadSale";

function Home() {
  const { isRightNetwork, switchToRightNetwork } = useNetworkStatus();
  const { isInitialized, isAuthenticated } = useMoralis();
  const showSwitch = isInitialized && isAuthenticated && !isRightNetwork;
  return (
    <div className="relative overflow-hidden  max-h-fit bg-dark text-white  font-dmsans">
      <img src={color1} alt="bg-color" className="absolute   top-0 left-0" />
      <img src={color2} alt="bg-color" className="absolute   top-0 right-0" />
      <img
        src={coinRight}
        alt="bg-color"
        className="absolute hidden md:block md:w-auto md:h-auto max-h-[650px] z-0 top-[16%] right-0"
      />
      <img
        src={coinLeft}
        alt="bg-color"
        className="absolute hidden md:block md:w-auto md:h-auto max-h-[650px] top-[55%] z-0 left-0"
      />

      <nav className="padding pt-8 lg:pt-20 justify-between items-center flex">
        <div className="logo z-50 flex">
          <img src={logo} alt="bg-color" />
          <h2 className="font-monument font-bold hidden md:block text-2xl ml-3">Cloudax</h2>
        </div>
        <div className="flex items-center justify-end">
          {showSwitch && (
            <button className="btn2-border mx-auto" onClick={async () => await switchToRightNetwork()}>
              switch <span className="hidden sm:inline">network</span>
            </button>
          )}
        </div>
        <ConnectWallet />
      </nav>

      <div className="hero">
        <div className="flex btn-set-1 justify-between">
          {/* <button className=" glow text-black   text btn">Upcoming</button> */}
          <div className="mx-auto text btn2-border text-blue-300 hover:bg-transparent hover:translate-y-0">BUSD</div>
        </div>

        <div className="ido">
          <img src={coin} className="z-50 w-16 h-16 lg:w-auto lg:h-32" alt="Coin" />
          <div className="z-50 ml-4">
            <p className="header font-bold">Cloudax Token IDO</p>
            <div className="socials">
              <a href="https://" className="duration-200 hover:scale-150">
                <img src={explore} className="w-6 h-6 lg:w-auto lg:h-auto" alt="bg-color" />
              </a>
              <a href="https://" className="duration-200 hover:scale-150">
                <img src={twitter} className="w-6 h-6 lg:w-auto lg:h-auto" alt="bg-color" />
              </a>
              <a href="https://" className="duration-200 hover:scale-150">
                <img src={discord} className="w-6 h-6 lg:w-auto lg:h-auto" alt="bg-color" />
              </a>
              <a href="https://" className="duration-200 hover:scale-150">
                <img src={medium} className="w-6 h-6 lg:w-auto lg:h-auto" alt="bg-color" />
              </a>
            </div>
          </div>
        </div>

        <p className="text lg:text-center relative z-50 px-8 lg:px-0 margin">
          Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit sapien
          ultricies est sapien sed maecenas amet sem id. In hendrerit auctor urna pellentesque sed.
        </p>
        <div className="flex btn-set-2 margin2 justify-between">
          <ConnectWallet />
          <button className="text-white btn2-border">How to Pay?</button>
        </div>
      </div>

      <LaunchpadSale sale={0} />

      <footer className=" footer-bg relative z-50 mt-20 lg:mt-32 xl:mt-80 padding w-full flex items-center justify-between  h-[100px]">
        <div className="flex justify-between">
          <p className=" text-[8px] lg:text-base">Cloudr (c) 2022. All Rights Reserved.</p>
        </div>
        <div className="flex w-[80px] lg:w-[150px] justify-between">
          <a href="https://" className="duration-200 hover:scale-150">
            <img className="h-4 w-4" src={twitterFooter} alt="Twitter" />
          </a>
          <a href="https://" className="duration-200 hover:scale-150">
            <img className="h-4 w-4" src={telegramFooter} alt="Twitter" />
          </a>
          <a href="https://" className="duration-200 hover:scale-150">
            <img className="h-4 w-4" src={mediumFooter} alt="Twitter" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
