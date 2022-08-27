import React from "react";
import { toEther } from "../utils/web3";
import BouncingDotsLoader from "./BouncingDotsLoader";
import Swal from "sweetalert2";

function ApproveAmount({ amount, launchpadState, launchpadHelpers }) {
  const {
    launchpadSale: { saleMin },
  } = launchpadState;
  const { approveBUSD } = launchpadHelpers;
  const numberishAmount = parseFloat(amount);
  const saleMinFloat = parseFloat(toEther(saleMin));
  const [approveState, setApproveState] = React.useState("Approve");

  React.useEffect(() => {
    if (numberishAmount >= saleMinFloat) {
      setApproveState("Approve");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberishAmount]);

  const approve = async () => {
    setApproveState("Approving");
    try {
      const success = await approveBUSD(amount);
      if (success) {
        setApproveState("Approved");
        Swal.fire({
          text: `You have approved ${amount} BUSD for swapping.`,
          title: "Approved!",
          icon: "success",
          confirmButtonText: "Next",
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: e.message,
        title: "Something went wrong!",
      });
      setApproveState("Approve");
      console.log(e);
    }
  };
  return (
    <button
      onClick={async () => await approve()}
      disabled={isNaN(numberishAmount) || numberishAmount < saleMinFloat}
      className={`text-dark btn2 ${
        approveState === "Approved" ? "hidden" : "mr-4"
      }`}
    >
      {approveState} BUSD {approveState !== "Approve" && <BouncingDotsLoader />}
    </button>
  );
}

export default ApproveAmount;
