import { logo } from "../img/index";
import ConnectWallet from "../auth/ConnectWallet";
import useNetworkStatus from "../hooks/useNetworkStatus";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";

function Nav() {
  const { isRightNetwork, switchToRightNetwork } = useNetworkStatus();
  const { isInitialized, isAuthenticated } = useMoralis();
  const showSwitch = isInitialized && isAuthenticated && !isRightNetwork;
  return (
    <div>
      <nav className="flex items-center justify-between pt-8 padding lg:pt-20">
        <Link to="/" className="z-50 flex ">
          <img
            src={require("../img/cloudax-new-logo.png")}
            alt="cloudax logo"
          />
          {/* <h2 className=" ml-1 text-[18px] font-bold font-monument">Cloudax</h2> */}
        </Link>
        <div className="flex">
          {showSwitch && (
            <button
              onClick={async () => await switchToRightNetwork()}
              className="btn"
            >
              switch to BSC
            </button>
          )}
          <ConnectWallet />
        </div>
      </nav>
    </div>
  );
}

export default Nav;
