import React from "react";
import { toEther } from "../utils/web3";
import BouncingDotsLoader from "./BouncingDotsLoader";
import Swal from "sweetalert2";

function ApproveAmount({
  amount,
  launchpadState,
  launchpadHelpers,
  proceedToBuy,
}) {
  const {
    launchpadSale: { saleMin, saleMax },
  } = launchpadState;
  const { approveBUSD, checkBUSDAllowance } = launchpadHelpers;
  const numberishAmount = parseFloat(amount);
  const saleMinFloat = parseFloat(toEther(saleMin));
  const saleMaxFloat = parseFloat(toEther(saleMax));
  const [approveState, setApproveState] = React.useState("Approved");

  const allowanceCheck = async () => {
    const allowance = await checkBUSDAllowance();
    const allowanceFloat = parseFloat(toEther(allowance));
    if (
      numberishAmount >= saleMinFloat &&
      allowanceFloat < numberishAmount &&
      numberishAmount <= saleMaxFloat
    ) {
      setApproveState("Approve");
    } else {
      setApproveState("Approved");
    }
  };

  React.useEffect(() => {
    if (!isNaN(numberishAmount)) {
      allowanceCheck();
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
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Complete Swap",
        }).then((result) => {
          if (result.isConfirmed) {
            proceedToBuy();
          }
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
      {approveState} {approveState === "Approve" ? "BUSD" : ""}{" "}
      {approveState !== "Approve" && <BouncingDotsLoader />}
    </button>
  );
}

export default ApproveAmount;
