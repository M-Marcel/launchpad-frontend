import { useMoralis } from "react-moralis";
import useGetNativeBalance from "./useGetNativeBalance";
import { toEther } from "../utils/web3";
import useGetCloudaxBalance from "./useGetBEP20Balance";
import React from "react";

export default function useCheckpointsState() {
  const { user } = useMoralis();
  const bnbBalance = useGetNativeBalance();
  const cloudaxBalance = useGetCloudaxBalance({
    address: process.env.REACT_APP_CLOUDAX_STAKE_TOKEN_ADDRESS,
  });
  const [checkpoints, setCheckpoints] = React.useState({
    "Connect Wallet": false,
    "Have $CLDX": false,
    "Enter Amount": false,
    "Have $BNB": false,
  });
  const updateCheckpoint = (key, value) => {
    setCheckpoints((checkpoints) => ({
      ...checkpoints,
      [key]: value,
    }));
  };
  React.useEffect(() => {
    let etherBalance = toEther(bnbBalance);
    let toFloat = parseFloat(etherBalance);
    if (toFloat > 0) {
      updateCheckpoint("Have $BNB", true);
      return;
    }
    updateCheckpoint("Have $BNB", false);
  }, [bnbBalance]);
  React.useEffect(() => {
    if (user) {
      updateCheckpoint("Connect Wallet", true);
      return;
    }
    updateCheckpoint("Connect Wallet", false);
  }, [user]);
  React.useEffect(() => {
    if (cloudaxBalance) {
      let cloudaxEther = parseFloat(toEther(cloudaxBalance));
      if (cloudaxEther > 0) {
        updateCheckpoint("Have $CLDX", true);
        return;
      }
    }
    updateCheckpoint("Have $CLDX", false);
  }, [cloudaxBalance]);
  return { checkpoints, updateCheckpoint };
}
