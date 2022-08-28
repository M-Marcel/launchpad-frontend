import React from "react";
import useDataFromContractFunction from "./useDataFromContractFunction";
import { useMoralis } from "react-moralis";
import IBEP20 from "../abis/IBEP20.json";

export default function useGetBEP20Balance({ address }) {
  const { isInitialized, user } = useMoralis();
  const { data, load } = useDataFromContractFunction();
  async function loadCloudaxBalance() {
    load({
      chain: process.env.REACT_APP_NET_ID,
      address: address,
      function_name: "balanceOf",
      abi: IBEP20,
      params: { account: user?.get("ethAddress") },
    });
  }
  React.useEffect(() => {
    if (isInitialized && user) {
      loadCloudaxBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, user]);
  return data;
}
