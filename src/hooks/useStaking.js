import React from "react";
import { useMoralis } from "react-moralis";
import { ethers, isSuccessfulTransaction, toEther } from "../utils/web3";
import useDataFromContractFunction from "./useDataFromContractFunction";

export default function useStaking({ address, ABI, userAddress, }) {
    const { load: loadStaking, data: staking } = useDataFromContractFunction();
    const [staker, setStaker] = React.useState(null);
    const [userStake, setUserStake] = React.useState(0);
    const [stakingInfo, setStakingInfo] = React.useState(null);
    const { web3, isInitialized } = useMoralis();

    async function getTotalStaked() {
        loadStaking({
            chain: process.env.REACT_APP_NET_ID,
            address: address,
            function_name: "getInfo",
            abi: ABI,
        });
    }
    React.useEffect(() => {
        if (staking) {
            const [stakersCount, totalStaked, maxStake, rewardsPerHour, minStake, stakingIsOpen] = staking;
            setStakingInfo({ stakersCount, totalStaked, maxStake, rewardsPerHour, minStake, stakingIsOpen });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [staking]);
    React.useEffect(() => {
        if (web3 && ABI && address) {
            setStaker(new ethers.Contract(address, ABI, web3));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [web3, address, ABI]);
    return { stakingInfo }
} 