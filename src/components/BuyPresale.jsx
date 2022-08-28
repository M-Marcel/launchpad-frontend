import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { isSuccessfulTransaction } from "../utils/web3";
import BouncingDotsLoader from "./BouncingDotsLoader";
import { toEther } from "../utils/web3";
import ApproveAmount from "./ApproveAmount";
import useGetBEP20Balance from "../hooks/useGetBEP20Balance";
import { inThousands } from "../utils/modifiers";

export default function BuyPresale({ launchpadState, launchpadHelpers }) {
  const {
    core: launchpad,
    buyLaunchpadSale: buyPresale,
    loadLaunchpad: reloadLaunchpad,
    loadUserVestingSchedules: reloadVesting,
  } = launchpadHelpers;
  const {
    saleId,
    userAddress,
    launchpadSale: { hasAllocation },
  } = launchpadState;
  const busdBalance = useGetBEP20Balance({
    address: process.env.REACT_APP_BUSD_ADDRESS,
  });
  const [presaleAmount, setPresaleAmount] = useState("");
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    async function getUserAllocation() {
      try {
        const userAllocation = await launchpad.allocatedBuy(
          saleId,
          userAddress
        );
        setPresaleAmount(toEther(userAllocation));
      } catch (e) {
        setPresaleAmount(0);
        console.log(e);
      }
    }
    if (hasAllocation && launchpad && userAddress) {
      getUserAllocation();
    }
  }, [hasAllocation, launchpad, userAddress, saleId]);

  const buy = async () => {
    try {
      setBuying(true);
      const transaction = await buyPresale(presaleAmount);
      const isSuccessful = await isSuccessfulTransaction(transaction);
      if (isSuccessful) {
        Swal.fire({
          text: "You have successfully swapped BUSD for CLOUDAX.",
          title: "Transaction Successful!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        setPresaleAmount("");
        setBuying(false);
        await reloadLaunchpad();
        await reloadVesting();
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: e.message,
        title: "Swap error!",
      });
      setBuying(false);
    }
  };
  return (
    <div className="w-full mt-8 lg:mt-10">
      <div>
        {hasAllocation && (
          <label className="block mb-2 text-white">Your BUSD Allocation</label>
        )}
        <input
          disabled={buying || hasAllocation}
          value={presaleAmount}
          onChange={(e) => setPresaleAmount(e.target.value)}
          onInput={(e) => setPresaleAmount(e.target.value)}
          className="xl:h-[30px] h-[15px] w-full rounded-full text2  text-black py-4 lg:py-5 xl:py-6 px-4 lg:px-6 border-0 text2 outline-none bg-white"
          placeholder="BUSD Amount"
        />
        <div className="mt-2 text-xs text-slate-200">
          Balance:{" "}
          {inThousands(
            Number(parseFloat(toEther(busdBalance || "0"))).toFixed(2)
          )}{" "}
          BUSD
        </div>
      </div>
      <div className="flex items-center justify-center mt-4">
        <ApproveAmount
          amount={presaleAmount}
          launchpadState={launchpadState}
          launchpadHelpers={launchpadHelpers}
          proceedToBuy={buy}
        />
        <button
          disabled={buying}
          onClick={async () => await buy()}
          className="text-black btn2 w-fit"
        >
          Swap {buying && <BouncingDotsLoader />}
        </button>
      </div>
    </div>
  );
}
