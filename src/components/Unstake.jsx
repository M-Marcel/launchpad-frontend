import React from "react";
import { toEther } from "../utils/web3";
import { inThousands } from "../utils/modifiers";
import Swal from "sweetalert2";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Unstake({
  updateCheckpoint,
  unstake,
  reloadStakingInfo,
  getUserStake,
  cloudaxBalance,
}) {
  const [amount, setAmount] = React.useState("");
  const [unstaking, setUnStaking] = React.useState(false);
  const handleInputChange = ({ target: { value } }) => {
    const toFloat = parseFloat(value);
    const invalidNumber = isNaN(toFloat);
    setAmount(invalidNumber ? "" : toFloat);
    if (!invalidNumber && toFloat > 0) {
      updateCheckpoint("Enter Amount", true);
      return;
    }
    updateCheckpoint("Enter Amount", false);
  };
  const unstakeToken = async () => {
    try {
      setUnStaking(true);
      const isSuccessful = await unstake(amount);
      if (isSuccessful) {
        Swal.fire({
          text: `You have successfully unstaked ${amount} CLOUDX.`,
          title: "Transaction Successful!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        setAmount("");
        setUnStaking(false);
        await reloadStakingInfo();
        await getUserStake();
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: e.message,
        title: "Something went wrong!",
      });
      setUnStaking(false);
    }
  };
  return (
    <div>
      <h3 className="font-monument text-lg lg:text-[25.29px] lg:leading-[30.35px]">
        Unstake your $CLDX
      </h3>
      <h4 className="text-xs lg:text-sm mb-[29px]">
        Enter the amount of $CLDX you want to unstake
      </h4>
      <div>
        <input
          placeholder="0.00"
          value={amount}
          onChange={handleInputChange}
          aria-label="stake amount"
          className="bg-[#04080F] py-[21px] w-full rounded-[7px] px-[28px] font-monument"
        />
        <div className="mt-[13px] flex flex-col gap-2 justify-between">
          <span className="text-xs">
            Balance:{" "}
            {inThousands(
              Number(parseFloat(toEther(cloudaxBalance || "0"))).toFixed(2)
            )}{" "}
            CLDX
          </span>
          <button
            onClick={async () => await unstakeToken()}
            className="bg-myblue py-[12px] w-auto ml-auto rounded-[7px] px-[44px] text-[#0B0819] text-sm lg:text-base"
          >
            {unstaking && (
              <FontAwesomeIcon icon={solid("spinner")} spin className="mr-2" />
            )}
            {unstaking ? "Unstaking" : "Unstake"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Unstake;
