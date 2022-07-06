import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import IBEP20 from "../abis/IBEP20.json";
import useDataFromContractFunction from "./useDataFromContractFunction";
import { ethers, toEther } from "../utils/web3";

const busdAddress = process.env.REACT_APP_BUSD_ADDRESS || null;

export default function useLaunchpad({ address, ABI, userAddress, sale }) {
  const [launchpad, setLaunchpad] = useState(null);
  const [launchpadSale, setLaunchpadSale] = useState(null);
  const [userVestingSchedule, setUserVestingSchedule] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const { web3, isInitialized } = useMoralis();
  const { load, data: launchpadData } = useDataFromContractFunction();
  const checkpoints = {
    buy: {
      "Buyer is not on the whitelist": `${userAddress} is not whitelisted for this presale`,
      "Amount must be greater than or equal to sale min": "Cannot swap below minimum BUSD amount",
      "Amount must be less than or equal to sale max": "Cannot swap above maximum BUSD amount",
      "Sale cap has been reached": "Presale has reached maximum BUSD amount",
      "You have bought this sale": `${userAddress} has bought this presale`,
    },
  };

  useEffect(() => {
    if (web3 && ABI && address) {
      const launchpad = new ethers.Contract(address, ABI, web3);
      setLaunchpad(launchpad);
      if (busdAddress) {
        setPaymentMethod(new ethers.Contract(busdAddress, IBEP20, web3));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3, address, ABI]);

  async function loadLaunchpad() {
    load({
      chain: process.env.REACT_APP_NET_ID,
      address: address,
      function_name: "getSales",
      abi: ABI,
    });
  }

  async function loadUserVestingSchedules() {
    const schedules = await launchpad.getUserVestingScheduleBySale(sale, userAddress);
    setUserVestingSchedule(schedules);
    console.log("overloading");
  }

  useEffect(() => {
    if (isInitialized) {
      loadLaunchpad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);
  useEffect(() => {
    if (launchpadData) {
      const [saleRate, isActive, saleMin, saleMax, saleCap, sold, hasWhitelist] = launchpadData[sale];
      setLaunchpadSale({ saleRate, isActive, saleMin, saleMax, saleCap, sold, hasWhitelist });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchpadData]);
  useEffect(() => {
    if (userAddress) {
      if (launchpad) {
        loadUserVestingSchedules();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress, launchpad]);
  const buyLaunchpadSale = async (amount) => {
    if (!web3) {
      throw Error("Please connect a crypto wallet!");
    }
    if (isNaN(parseFloat(amount))) {
      throw Error("Please provide a valid amount");
    }
    if (parseFloat(amount) <= 0) {
      throw Error("Please provide a valid amount");
    }
    const etherAmount = ethers.utils.parseEther(amount.toString());
    try {
      await paymentMethod.connect(web3.getSigner()).approve(launchpad.address, etherAmount);
      const transaction = await launchpad.connect(web3.getSigner()).buyLaunchpadSale(sale, etherAmount);
      return transaction;
    } catch (e) {
      const verbose = e.data?.message;
      if (verbose) {
        for (var x in checkpoints.buy) {
          if (verbose.includes(x)) {
            throw Error(checkpoints.buy[x]);
          }
        }
      }
      throw e;
    }
  };
  const claimFromVestingSchedule = async (scheduleId, amount) => {
    const schedule = userVestingSchedule[scheduleId];
    if (amount > parseFloat(toEther(schedule.totalAmount.toString()))) {
      throw Error("Amount exceeds total amount");
    }
    if (amount > toEther(schedule.totalAmount.sub(schedule.releasedAmount))) {
      throw Error("Amount exceeds remaining amount");
    }
    if (!canClaimFromSchedule(scheduleId)) {
      throw Error("Tokens still vested");
    }
    const transaction = await launchpad
      .connect(web3.getSigner())
      .claimFromVestingSchedule(sale, scheduleId, ethers.utils.parseEther(amount));
    return transaction;
  };
  const canClaimFromSchedule = async (scheduleId) => {
    const currentBlockTime = await launchpad.getCurrentTime();
    const schedule = userVestingSchedule[scheduleId];
    return currentBlockTime.gte(schedule.startTime.add(schedule.duration));
  };
  return {
    launchpadSale,
    userVestingSchedule,
    buyLaunchpadSale,
    claimFromVestingSchedule,
    canClaimFromSchedule,
    loadLaunchpad,
    loadUserVestingSchedules,
  };
}
