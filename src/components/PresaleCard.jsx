import React from "react";
import { useEffect, useState } from "react";
import { toEther } from "../utils/web3";
import { inThousands } from "../utils/modifiers";
import BuyPresale from "./BuyPresale";

function PresaleCard({ launchpadState, launchpadHelpers }) {
  const [soldPercent, setSoldPercent] = useState(0);
  const { launchpadSale, userVestingSchedule } = launchpadState;
  useEffect(() => {
    if (launchpadSale) {
      const sold = toEther(launchpadSale.sold);
      const cap = toEther(launchpadSale.saleCap);
      setSoldPercent(
        Number((parseFloat(sold) / parseFloat(cap)) * 100).toFixed(2)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [launchpadSale]);
  return (
    <div className="Launchpad__card">
      <p className="text">Progress</p>
      <div className="w-full relative h-[20px] rounded-full mt-4 bg-white">
        <div
          style={{ width: `${soldPercent}%` }}
          className={`absolute -top-2 h-[20px] rounded-full mt-2 bg-myblue`}
        ></div>
      </div>
      <div className="flex justify-between mt-4">
        <p className="text">{soldPercent}%</p>
        <p className="text">
          {inThousands(toEther(launchpadSale?.sold || "0"))}/
          {inThousands(toEther(launchpadSale?.saleCap || "0"))} BUSD
        </p>
      </div>
      {
        // !userVestingSchedule?.length > 0 && 
        (
          <BuyPresale
            launchpadState={launchpadState}
            launchpadHelpers={launchpadHelpers}
          />
        )}
    </div>
  );
}

export default PresaleCard;
