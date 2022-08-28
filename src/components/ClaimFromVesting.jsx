import React from "react";
import Swal from "sweetalert2";
import { isSuccessfulTransaction } from "../utils/web3";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ClaimFromVesting({ scheduleId, launchpadHelpers }) {
  const [claimable, setClaimable] = React.useState(false);
  const [claiming, setClaiming] = React.useState(false);
  const {
    claimFromVestingSchedule: claimTokens,
    canClaimFromSchedule: canClaim,
    loadUserVestingSchedules: reloadVesting,
  } = launchpadHelpers;
  const claimTokensFromVesting = async (scheduleId) => {
    try {
      setClaiming(true);
      const transaction = await claimTokens(scheduleId);
      if (await isSuccessfulTransaction(transaction)) {
        Swal.fire({
          icon: "success",
          text: "You have successfully claimed tokens from your vesting schedule.",
          title: "Transaction Successful!",
          confirmButtonText: "Cool",
        });
        await reloadVesting();
        setClaiming(false);
        return;
      }
      throw Error("Couldn't claim tokens from vesting schedule.");
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: e.message,
        title: "Something went wrong!",
      });
      setClaiming(false);
    }
  };
  React.useEffect(() => {
    async function loadClaimable() {
      try {
        const claimable = await canClaim(scheduleId);
        setClaimable(claimable);
      } catch (e) {
        console.log(e);
      }
    }
    loadClaimable();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canClaim]);
  return (
    <button
      disabled={!claimable}
      onClick={async () => await claimTokensFromVesting(scheduleId)}
      className="text-black btn2 disabled:bg-gray-400"
    >
      {claiming && (
        <FontAwesomeIcon icon={solid("spinner")} spin className="mr-2" />
      )}
      {claiming ? "Claiming" : "Claim"}
    </button>
  );
}

export default ClaimFromVesting;
