import { useChain, useMoralis } from "react-moralis";
import React from "react";

export default function useNetworkStatus() {
  const [isRightNetwork, setIsRightNetwork] = React.useState(false);
  const { chainId, switchNetwork, chain } = useChain();
  const { isWeb3Enabled, isAuthenticated } = useMoralis();
  const correctNetwork = process.env.REACT_APP_NET_ID;

  React.useEffect(() => {
    console.log(chainId);
    if (chainId === correctNetwork) {
      setIsRightNetwork(true);
    } else {
      setIsRightNetwork(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, isWeb3Enabled, isAuthenticated]);
  const switchToRightNetwork = async () => {
    switchNetwork(correctNetwork);
  };
  return { switchToRightNetwork, isRightNetwork, chainId, chain };
}
