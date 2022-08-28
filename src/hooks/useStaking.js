import React from "react";
import { useMoralis } from "react-moralis";
import { ethers, isSuccessfulTransaction } from "../utils/web3";
import useDataFromContractFunction from "./useDataFromContractFunction";
import IBEP20 from "../abis/IBEP20.json";

const cloudaxTokenAddress =
  process.env.REACT_APP_CLOUDAX_STAKE_TOKEN_ADDRESS || null;

export default function useStaking({ address, ABI, userAddress }) {
  const [cloudaxToken, setCloudaxToken] = React.useState(null);
  const checkpoints = {
    stake: {
      "Staking is not open": `Staking is not open`,
      "Amount smaller than minimum stake": "Amount smaller than minimum stake",
      "Maximum stake reached": "Maximum stake reached",
      "Amount would overflow maximum stake":
        "Amount would overflow maximum stake",
      "Can't stake more than you own": `Can't stake more than you own`,
    },
    unstake: {
      "You don't have that much": "You don't have that much to unstake",
    },
  };
  const { load: loadStaking, data: staking } = useDataFromContractFunction();
  const [staker, setStaker] = React.useState(null);
  const [userStake, setUserStake] = React.useState(0);
  const [stakingInfo, setStakingInfo] = React.useState(null);
  const { web3, isInitialized } = useMoralis();

  async function loadStakingInfo() {
    loadStaking({
      chain: process.env.REACT_APP_NET_ID,
      address: address,
      function_name: "getInfo",
      abi: ABI,
    });
  }
  async function getUserStake() {
    const [stake, rewards] = await staker.getDepositInfo(userAddress);
    const sum = stake.add(rewards);
    setUserStake(sum.toString());
  }
  const stake = async (amount) => {
    if (!web3) {
      throw Error("Please connect a crypto wallet!");
    }
    const toFloat = parseFloat(amount);
    if (isNaN(toFloat)) {
      throw Error("Please provide a valid amount");
    }
    if (toFloat <= 0) {
      throw Error("Please provide a valid amount");
    }
    const etherAmount = ethers.utils.parseEther(amount.toString());
    try {
      const approveTrx = await cloudaxToken
        .connect(web3.getSigner())
        .approve(staker.address, etherAmount);
      const isSuccessful = await isSuccessfulTransaction(approveTrx);
      if (isSuccessful) {
        const tx = await staker.connect(web3.getSigner()).stake(etherAmount);
        if (await isSuccessfulTransaction(tx)) {
          return true;
        }
      }
      throw Error("Could not approve CLOUDX");
    } catch (e) {
      const verbose = e.data?.message;
      if (verbose) {
        for (var x in checkpoints.stake) {
          if (verbose.includes(x)) {
            throw Error(checkpoints.stake[x]);
          }
        }
      }
      throw e;
    }
  };

  const unstake = async (amount) => {
    if (!web3) {
      throw Error("Please connect a crypto wallet!");
    }
    const toFloat = parseFloat(amount);
    if (isNaN(toFloat)) {
      throw Error("Please provide a valid amount");
    }
    if (toFloat <= 0) {
      throw Error("Please provide a valid amount");
    }
    const etherAmount = ethers.utils.parseEther(amount.toString());
    try {
      const tx = await staker.connect(web3.getSigner()).unstake(etherAmount);
      if (await isSuccessfulTransaction(tx)) {
        return true;
      }
      return;
    } catch (e) {
      const verbose = e.data?.message;
      if (verbose) {
        for (var x in checkpoints.unstake) {
          if (verbose.includes(x)) {
            throw Error(checkpoints.unstake[x]);
          }
        }
      }
      throw e;
    }
  };
  React.useEffect(() => {
    if (isInitialized) {
      loadStakingInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);
  React.useEffect(() => {
    if (staking) {
      const {
        0: stakersCount,
        1: totalStaked,
        2: maxStake,
        3: rewardsPerHour,
        4: minStake,
        5: stakingIsOpen,
      } = staking;
      setStakingInfo({
        stakersCount,
        totalStaked,
        maxStake,
        rewardsPerHour,
        minStake,
        stakingIsOpen,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staking]);
  React.useEffect(() => {
    if (web3 && ABI && address) {
      setStaker(new ethers.Contract(address, ABI, web3));
      if (cloudaxTokenAddress) {
        setCloudaxToken(new ethers.Contract(cloudaxTokenAddress, IBEP20, web3));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3, address, ABI]);
  React.useEffect(() => {
    async function loadUserStake() {
      await getUserStake();
    }
    if (staker && userAddress) {
      loadUserStake();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staker, userAddress]);
  return {
    stakingInfo,
    userStake,
    stake,
    unstake,
    loadStakingInfo,
    getUserStake,
  };
}
