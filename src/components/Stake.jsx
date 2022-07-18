import React from "react";
import Swal from "sweetalert2";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toEther } from "../utils/web3";
import { inThousands } from "../utils/modifiers";

function Stake({
  updateCheckpoint,
  stake,
  reloadStakingInfo,
  getUserStake,
  cloudaxBalance,
}) {
  const [amount, setAmount] = React.useState("");
  const [staking, setStaking] = React.useState(false);
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
  const stakeToken = async () => {
    try {
      setStaking(true);
      const isSuccessful = await stake(amount);
      if (isSuccessful) {
        Swal.fire({
          text: `You have successfully staked ${amount} CLOUDX.`,
          title: "Transaction Successful!",
          icon: "success",
          confirmButtonText: "Cool",
        });
        setAmount("");
        setStaking(false);
        await reloadStakingInfo();
        await getUserStake();
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        text: e.message,
        title: "Something went wrong!",
      });
      setStaking(false);
    }
  };
  return (
    <div>
      <h3 className="font-monument text-lg lg:text-[25.29px] lg:leading-[30.35px]">
        Stake your $CLDX
      </h3>
      <h4 className="text-xs lg:text-sm mb-[29px]">
        Enter the amount of $CLDX you want to stake
      </h4>
      <div>
        <input
          min={10}
          placeholder="0.00"
          value={amount}
          onChange={handleInputChange}
          aria-label="stake amount"
          type="number"
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
            onClick={async () => await stakeToken()}
            className="bg-myblue py-[12px] w-auto ml-auto rounded-[7px] px-[44px] text-[#0B0819] text-sm lg:text-base"
          >
            {staking && (
              <FontAwesomeIcon icon={solid("spinner")} spin className="mr-2" />
            )}
            {staking ? "Staking" : "Stake"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stake;
