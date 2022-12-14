import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import IBEP20 from "../abis/IBEP20.json";
import useDataFromContractFunction from "./useDataFromContractFunction";
import { ethers, isSuccessfulTransaction, toEther } from "../utils/web3";
// import { useSearchParams } from "react-router-dom";
// import ethereumAddress from "ethereum-address";

const busdAddress = process.env.REACT_APP_BUSD_ADDRESS || null;

export default function useLaunchpad({ address, ABI, userAddress, sale }) {
  const [launchpad, setLaunchpad] = useState(null);
  const [launchpadSale, setLaunchpadSale] = useState(null);
  const [userVestingSchedule, setUserVestingSchedule] = useState(null);
  const [userReferralEarning, setUserReferralEarning] = useState(null);
  const [canClaimReferralEarning, setCanClaimReferralEarning] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  // const [searchParams] = useSearchParams();
  const { web3, isInitialized } = useMoralis();
  const { load, data: launchpadData } = useDataFromContractFunction();
  const checkpoints = {
    buy: {
      "Buyer is not on the whitelist": `${userAddress} is not whitelisted for this presale`,
      "Amount must be greater than or equal to sale min":
        "Cannot swap below minimum BUSD amount",
      "Amount must be less than or equal to sale max":
        "Cannot swap above maximum BUSD amount",
      "Sale cap has been reached": "Presale has reached maximum BUSD amount",
      "You have bought this sale": `${userAddress} has bought this presale`,
      "Sale is not active": "Presale hasn't started yet!",
      "transfer amount exceeds balance": "You don't have enough BUSD to swap",
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

  async function loadUserReferralEarnings() {
    // const earnings = await launchpad.getReferralEarnings(sale, userAddress);
    // setUserReferralEarning(toEther(earnings));
  }

  async function loadUserVestingSchedules() {
    const schedules = await launchpad.getUserVestingScheduleBySale(
      sale,
      userAddress
    );
    setUserVestingSchedule(schedules);
  }

  const loadCanClaimReferralEarning = async () => {
    const saleEndDate = ethers.BigNumber.from(launchpadSale.saleEndDate);
    const currentBlockTime = await launchpad.getCurrentTime();
    const earnings = parseFloat(userReferralEarning || "0");
    const canClaim =
      earnings > 0 && saleEndDate.gt(0) && currentBlockTime.gte(saleEndDate);
    setCanClaimReferralEarning(canClaim);
  };

  useEffect(() => {
    if (isInitialized) {
      loadLaunchpad();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized]);
  useEffect(() => {
    if (launchpadData) {
      const [
        saleRate,
        isActive,
        saleMin,
        saleMax,
        saleCap,
        sold,
        hasWhitelist,
        hasAllocation,
        saleAllocated,
        saleEndDate,
      ] = launchpadData[sale];
      setLaunchpadSale({
        saleRate,
        isActive,
        saleMin,
        saleMax,
        saleCap,
        sold,
        hasWhitelist,
        hasAllocation,
        saleAllocated,
        saleEndDate,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchpadData]);
  useEffect(() => {
    if (userAddress) {
      if (launchpad) {
        loadUserVestingSchedules();
        loadUserReferralEarnings();
        if (launchpadSale) {
          loadCanClaimReferralEarning();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress, launchpad, launchpadSale]);

  const checkApprovedAmount = async () => {
    if (paymentMethod) {
      const approved = await paymentMethod.allowance(
        userAddress,
        launchpad.address
      );
      return approved.toString();
    }
    return 0;
  };

  const approveBUSD = async (amount) => {
    const etherAmount = validateBuyData(amount);
    try {
      const tx = await paymentMethod
        .connect(web3.getSigner())
        .approve(launchpad.address, etherAmount);
      if (isSuccessfulTransaction(tx)) {
        return true;
      }
      throw Error("Couldn't approve BUSD");
    } catch (e) {
      handleError(e);
    }
  };

  const handleError = (err) => {
    const verbose = err.data?.message;
    if (verbose) {
      for (var x in checkpoints.buy) {
        if (verbose.includes(x)) {
          throw Error(checkpoints.buy[x]);
        }
      }
    }
    throw err;
  };

  const validateBuyData = (amount) => {
    if (!web3) {
      throw Error("Please connect a crypto wallet!");
    }
    if (isNaN(parseFloat(amount))) {
      throw Error("Please provide a valid amount");
    }
    if (parseFloat(amount) <= 0) {
      if (launchpadSale.hasAllocation) {
        throw Error("You do not have any BUSD allocation to buy this sale");
      }
      throw Error("Please provide a valid amount");
    }
    return ethers.utils.parseEther(amount.toString());
  };

  const buyLaunchpadSale = async (amount) => {
    // let referrerParam = searchParams.get("ref");
    // const referrer = ethereumAddress.isAddress(referrerParam)
    //   ? referrerParam
    //   : "0x0000000000000000000000000000000000000000";
    const etherAmount = validateBuyData(amount);
    try {
      console.log("before transaction")
      const transaction = await launchpad
        .connect(web3.getSigner())
        .buyLaunchpadSale(sale, etherAmount);
      // .buyLaunchpadSale(sale, etherAmount, referrer);
      console.log("after transaction")
      return transaction;
    } catch (e) {
      console.log(e)
      handleError(e);
    }
  };

  const claimFromVestingSchedule = async (scheduleId) => {
    const schedule = userVestingSchedule[scheduleId];
    if (!(await canClaimFromSchedule(scheduleId))) {
      throw Error("Tokens still vested");
    }
    const transaction = await launchpad
      .connect(web3.getSigner())
      .release(
        sale,
        scheduleId,
        ethers.utils.parseEther(toEther(schedule.totalAmount.toString()))
      );
    return transaction;
  };

  const canClaimFromSchedule = async (scheduleId) => {
    const currentBlockTime = await launchpad.getCurrentTime();
    const saleEndDate = ethers.BigNumber.from(launchpadSale.saleEndDate);
    const schedule = userVestingSchedule[scheduleId];
    if (scheduleId === 0) {
      if (saleEndDate.gt(0) > 0 && currentBlockTime.gte(saleEndDate)) {
        return true && schedule.totalAmount.gt(schedule.releasedAmount);
      }
    }
    return (
      currentBlockTime.gte(schedule.startTime.add(schedule.duration)) &&
      schedule.totalAmount.gt(schedule.releasedAmount)
    );
  };

  const claimReferralEarning = async () => {
    try {
      const transaction = await launchpad
        .connect(web3.getSigner())
        .claimReferralEarnings(sale);
      return transaction;
    } catch (err) {
      handleError(err);
    }
  };
  return {
    helpers: {
      approveBUSD,
      buyLaunchpadSale,
      claimFromVestingSchedule,
      canClaimFromSchedule,
      checkBUSDAllowance: checkApprovedAmount,
      core: launchpad,
      loadLaunchpad,
      loadUserVestingSchedules,
      claimReferralEarning,
    },
    state: {
      launchpadSale,
      userVestingSchedule,
      paymentMethod,
      saleId: sale,
      userAddress,
      userReferralEarning,
      canClaimReferralEarning,
    },
  };
}
