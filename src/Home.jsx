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
          <div className="z-50 ml-4">
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

        <p className="relative z-50 px-8 text lg:text-center lg:px-0 margin">
          Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sit sapien ultricies est sapien sed
          maecenas amet sem id. In hendrerit auctor urna pellentesque sed.
        </p>
        <div className="flex justify-between btn-set-2 margin2">
          <ConnectWallet />
          <button className="text-white btn2-border">How to Pay?</button>
        </div>
      </div>
      <LaunchpadSale sale={0} />
    </div>
  );
}

export default Home;
