import { logo } from "../img/index";
import ConnectWallet from "../auth/ConnectWallet";
import useNetworkStatus from "../hooks/useNetworkStatus";
import { useMoralis } from "react-moralis";

function Nav() {
  const { isRightNetwork, switchToRightNetwork } = useNetworkStatus();
  const { isInitialized, isAuthenticated } = useMoralis();
  const showSwitch = isInitialized && isAuthenticated && !isRightNetwork;
  return (
    <div>
      <nav className="flex items-center justify-between pt-8 padding lg:pt-20">
        <div className="z-50 flex logo">
          <img src={logo} alt="cloudax logo" />
          <h2 className="hidden ml-3 text-2xl font-bold font-monument md:block">
            Cloudax
          </h2>
        </div>
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
