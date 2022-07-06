import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Swal from "sweetalert2";
import { isSuccessfulTransaction } from "./utils/web3";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

export default function BuyPresale({ buyPresale, reloadVesting, reloadLaunchpad }) {
  const [presaleAmount, setPresaleAmount] = useState("");
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
        setPresaleAmount(null);
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
    <div className="xl:flex w-full mt-10">
      <input
        value={presaleAmount}
        onChange={(e) => setPresaleAmount(e.target.value)}
        onInput={(e) => setPresaleAmount(e.target.value)}
        className="md:w-[400px] xl:w-[400px] lg:w-[300px] ml-[10%] md:ml-[17%] lg:ml-0 xl:h-[30px] h-[15px] rounded-full text2  text-black py-4 lg:py-5 xl:py-6 px-4 lg:px-10 border-0 text2 outline-none bg-white"
        placeholder="BUSD Amount"
      />
      <button
        disabled={buying}
        onClick={async () => await buy()}
        className=" ml-[30%] xl:relative -top-2 md:ml-[40%] mt-4 lg:ml-24 xl:ml-10  text-black  btn2"
      >
        {buying && <FontAwesomeIcon icon={solid("spinner")} spin className="mr-2" />}
        Swap
      </button>
    </div>
  );
}
