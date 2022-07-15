import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import useLaunchpad from "./hooks/useLaunchpad";
import LAUNCHPAD_ABI from "./abis/Launchpad.json";
import { toEther } from "./utils/web3";
import { inThousands } from "./utils/modifiers";
import VestingSchedule from "./VestingSchedule";
import BuyPresale from "./BuyPresale";

export default function LaunchpadSale({ sale }) {
  const { user } = useMoralis();
  const tokenTicker = process.env.REACT_APP_TOKEN_TICKER;
  const accessTypes = ["Private", "Public"];
  const [soldPercent, setSoldPercent] = useState(0);
  const launchpadOptions = {
    ABI: LAUNCHPAD_ABI,
    sale: sale,
    userAddress: user?.get("ethAddress"),
    address: process.env.REACT_APP_LAUNCHPAD_ADDRESS,
  };

  const {
    launchpadSale,
    userVestingSchedule,
    buyLaunchpadSale,
    loadUserVestingSchedules,
    loadLaunchpad,
    claimFromVestingSchedule,
    canClaimFromSchedule,
  } = useLaunchpad(launchpadOptions);
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
    <section>
      {launchpadSale ? (
        <section className="z-50 padding margin2">
          <div className="justify-between lg:flex">
            <div className="glass w-auto lg:w-[49%] rounded-2xl p-6">
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
              <BuyPresale
                buyPresale={buyLaunchpadSale}
                reloadLaunchpad={loadLaunchpad}
                reloadVesting={loadUserVestingSchedules}
              />
            </div>
            <div className="glass xl:items-center w-auto lg:w-[49%] mt-6 lg:mt-0 rounded-2xl flex justify-between  p-6">
              <div className="text">
                <p className="mt-1">Opens</p>
                <p className="mt-1">Closes</p>
                <p className="mt-1">Swap Rate</p>
                <p className="mt-1">Access type</p>
              </div>
              <div className="text ">
                <p className="mt-1">2021-10-23 08:00:00 UTC</p>
                <p className="mt-1">2021-10-23 08:00:00 UTC</p>
                <p className="mt-1">
                  1 BUSD = {launchpadSale?.saleRate || "0"} {tokenTicker}
                </p>
                <p className="mt-1">{accessTypes[sale]}</p>
              </div>
            </div>
          </div>
          {userVestingSchedule && userVestingSchedule.length > 0 && (
            <VestingSchedule
              vestingSchedule={userVestingSchedule}
              claimTokens={claimFromVestingSchedule}
              canClaim={canClaimFromSchedule}
            />
          )}
        </section>
      ) : (
        ""
      )}
    </section>
  );
}
