import ConnectWallet from "./auth/ConnectWallet";
import { explore, twitter, medium, telegramFooter } from "./img";
import LaunchpadSale from "./LaunchpadSale";
import App from './App'

function Home() {
  return (
    <App>
      <div>
        <div className="hero">
          <div className="flex justify-between btn-set-1">
            {/* <button className="text-black glow text btn">Upcoming</button> */}
            <div className="mx-auto text-blue-300 text btn2-border hover:bg-transparent hover:translate-y-0">
              BUSD
            </div>
          </div>
          <div className="ido">
            <img src={require("./images/Cloudax Logo icon white transparent 1.png")} className="z-50 w-[5rem] lg:w-[12rem]" alt="Coin" />
            <div className="z-50 ml-[25px] lg:ml-[48px]">
              <p className="font-bold header font-roboto">Cloudax Token IDO</p>
              <div className="socials">

                <a href="https://cloudax.io" target="_" className="duration-200 hover:scale-150">
                  <img src={explore} className="w-6 h-6 lg:w-auto lg:h-auto" alt="bg-color" />
                </a>

                <a href=" https://twitter.com/cloudaxHQ" target="_" className="duration-200 hover:scale-150">
                  <img src={twitter} className="w-6 h-6 lg:w-auto lg:h-auto" alt="bg-color" />
                </a>
                <a href="https://t.me/cloudaxofficial" className="duration-200 hover:scale-150 flex justify-center items-center bg-[#252a31] rounded-[50%] lg:w-14 lg:h-14" >
                  <img src={telegramFooter} className="w-6 h-6 lg:w-[32px] lg:h-auto" alt="bg-color" />
                </a>
                <a href="https://cloudax.medium.com/" className="duration-200 hover:scale-150" >
                  <img src={medium} className="w-6 h-6 lg:w-auto lg:h-auto" alt="bg-color" />
                </a>
              </div>
            </div>
          </div>

          <p className="relative z-50 px-8 text lg:text-center leading-6 lg:leading-8  lg:px-0 margin font-roboto lg:max-w-[65%] mx-auto">
            $CLDX is the native and utility token designed to power the
            ever-expanding and innovative cloudax ecosystem. Built to last with a
            hyper deflatinary mechanism which include qauterly buybacks/burn and
            8% early sell tax which is also partly allocated for token burning.
          </p>
          <div className="flex justify-between btn-set-2 margin2">
            <ConnectWallet />
            <button className="text-white btn2-border">
              <a
                href="https://cloudax.medium.com/cloudax-presale-buying-cloudax-at-discount-50fc041a21e"
                target="_"
              >
                Presale Guide
              </a>
            </button>
          </div>
        </div>
        <LaunchpadSale sale={2} />
      </div>
    </App>
  );
}

export default Home;
