import React from "react";
import Swal from "sweetalert2";
import { isSuccessfulTransaction } from "../utils/web3";

function ClaimFromVesting({
  canClaim,
  scheduleId,
  claimTokens,
  reloadVesting,
}) {
  const [claimable, setClaimable] = React.useState(false);
  const claimTokensFromVesting = async (scheduleId) => {
    try {
      const transaction = await claimTokens(scheduleId);
      if (await isSuccessfulTransaction(transaction)) {
        Swal.fire({
          icon: "success",
          text: "You have successfully claimed tokens from your vesting schedule.",
          title: "Transaction Successful!",
          confirmButtonText: "Cool",
        });
        await reloadVesting();
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: e.message,
        title: "Something went wrong!",
      });
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
      className="text-black btn2"
    >
      Claim
    </button>
  );
}

export default ClaimFromVesting;
