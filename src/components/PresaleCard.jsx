import React from "react";
import { useEffect, useState } from "react";
import { toEther } from "../utils/web3";
import { inThousands } from "../utils/modifiers";
import BuyPresale from "./BuyPresale";

function PresaleCard({
  launchpadSale,
  launchpad,
  loadUserVestingSchedules,
  loadLaunchpad,
  sale,
  userVestingSchedule,
  buyLaunchpadSale,
  userAddress,
}) {
  const [soldPercent, setSoldPercent] = useState(0);
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
      {!userVestingSchedule?.length > 0 && (
        <BuyPresale
          hasAllocation={launchpadSale?.hasAllocation}
          buyPresale={buyLaunchpadSale}
          reloadLaunchpad={loadLaunchpad}
          launchpad={launchpad}
          sale={sale}
          userAddress={userAddress}
          reloadVesting={loadUserVestingSchedules}
        />
      )}
    </div>
  );
}

export default PresaleCard;
