import ConnectWallet from "./auth/ConnectWallet";
import { explore, twitter, discord, medium, coin } from "./img";
import LaunchpadSale from "./LaunchpadSale";

function Home() {
  return (
    <div>
      <div className="hero">
        <div className="flex justify-between btn-set-1">
          {/* <button className="text-black glow text btn">Upcoming</button> */}
          <div className="mx-auto text-blue-300 text btn2-border hover:bg-transparent hover:translate-y-0">
            BUSD
          </div>
        </div>
        <div className="ido">
          <img
            src={coin}
            className="z-50 w-16 h-16 lg:w-auto lg:h-32"
            alt="Coin"
          />
          <div className="z-50 ml-[48px]">
            <p className="font-bold header">Cloudax Token IDO</p>
            <div className="socials">
              <a href="#eplore" className="duration-200 hover:scale-150">
                <img
                  src={explore}
                  className="w-6 h-6 lg:w-auto lg:h-auto"
                  alt="bg-color"
                />
              </a>
              <a href="#twitter" className="duration-200 hover:scale-150">
                <img
                  src={twitter}
                  className="w-6 h-6 lg:w-auto lg:h-auto"
                  alt="bg-color"
                />
              </a>
              <a href="#discord" className="duration-200 hover:scale-150">
                <img
                  src={discord}
                  className="w-6 h-6 lg:w-auto lg:h-auto"
                  alt="bg-color"
                />
              </a>
              <a href="#medium" className="duration-200 hover:scale-150">
                <img
                  src={medium}
                  className="w-6 h-6 lg:w-auto lg:h-auto"
                  alt="bg-color"
                />
              </a>
            </div>
          </div>
        </div>

        <p className="relative z-50 px-8 text lg:text-center max-w-[639.42px] leading-6 lg:leading-8 mx-auto lg:px-0 margin">
          $CLDX is the native and utility token designed to power the
          ever-expanding and innovative cloudax ecosystem. Built to last with a
          hyper deflatinary mechanism which include qauterly buybacks/burn and
          8% early sell tax which is also partly allocated for token burning.
          more info? see litepaper.
        </p>
        <div className="flex justify-between btn-set-2 margin2">
          <ConnectWallet />
          <button className="text-white btn2-border">How to Pay?</button>
        </div>
      </div>
      <LaunchpadSale sale={1} />
    </div>
  );
}

export default Home;
