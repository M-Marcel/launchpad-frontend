import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { isSuccessfulTransaction } from "../utils/web3";
import BouncingDotsLoader from "./BouncingDotsLoader";
import { toEther } from "../utils/web3";

export default function BuyPresale({
  buyPresale,
  reloadVesting,
  reloadLaunchpad,
  hasAllocation,
  launchpad,
  sale,
  userAddress,
}) {
  const [presaleAmount, setPresaleAmount] = useState("");
  useEffect(() => {
    async function getUserAllocation() {
      try {
        const userAllocation = await launchpad.allocatedBuy(sale, userAddress);
        setPresaleAmount(toEther(userAllocation));
      } catch (e) {
        setPresaleAmount(0);
        console.log(e);
      }
    }
    if (hasAllocation && launchpad && userAddress) {
      getUserAllocation();
    }
  }, [hasAllocation, launchpad, userAddress, sale]);
  const [buying, setBuying] = useState(false);
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
        title: "Something went wrong!",
      });
      setBuying(false);
    }
  };
  return (
    <div className="w-full mt-10 xl:flex xl:items-end">
      <div className="md:w-[400px] xl:w-[400px] lg:w-[300px] md:ml-[17%] lg:ml-0">
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
      </div>
      <button
        disabled={buying}
        onClick={async () => await buy()}
        className="md:ml-[40%] mt-4 lg:ml-10 xl:ml-10 xl:mt-0 text-black btn2 w-fit mx-auto lg:mx-0"
      >
        Swap {buying && <BouncingDotsLoader />}
      </button>
    </div>
  );
}
