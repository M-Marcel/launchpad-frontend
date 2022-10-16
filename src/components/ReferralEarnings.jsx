import React from "react";
import { inThousands } from "../utils/modifiers";
import BouncingDotsLoader from "./BouncingDotsLoader";
import Swal from "sweetalert2";
import { isSuccessfulTransaction } from "../utils/web3";

function ReferralEarnings({ launchpadState, launchpadHelpers }) {
  const tokenTicker = process.env.REACT_APP_TOKEN_TICKER;
  const { userReferralEarning, canClaimReferralEarning } = launchpadState;
  const { claimReferralEarning } = launchpadHelpers;
  const [claimState, setClaimState] = React.useState("Claim Earnings");
  const claim = async () => {
    setClaimState("Claiming");
    try {
      const transaction = await claimReferralEarning();
      const isSuccessful = await isSuccessfulTransaction(transaction);
      if (isSuccessful) {
        Swal.fire({
          text: "You have successfully claimed your referral earnings.",
          title: "Transaction Successful!",
          icon: "success",
          confirmButtonText: "Cool",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        text: err.message,
        title: "Something went wrong!",
      });
    }
  };
  return (
    <div className="flex flex-col justify-between Referral__item">
      <h3 className="mb-1 text-center Referral__item-header">
        Your Referral Earnings
      </h3>
      <h3 className="mb-3 text-xl font-bold text-center break-words font-monument lg:text-2xl text-slate-200">
        {inThousands("0")} {tokenTicker}
        {/* {inThousands(userReferralEarning || "0")} {tokenTicker} */}
      </h3>
      <button
        onClick={async () => await claim()}
        disabled={!canClaimReferralEarning}
        className="justify-center btn text-dark max-w-[170px] lg:max-w-fit mx-auto disabled:bg-gray-400"
      >
        {claimState} {claimState !== "Claim Earnings" && <BouncingDotsLoader />}
      </button>
    </div>
  );
}

export default ReferralEarnings;
