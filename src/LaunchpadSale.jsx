import { useMoralis } from "react-moralis";
import useLaunchpad from "./hooks/useLaunchpad";
import LAUNCHPAD_ABI from "./abis/Launchpad.json";
import VestingSchedule from "./VestingSchedule";
import ReferralSystem from "./components/ReferralSystem";
import PresaleInfo from "./components/PresaleInfo";
import PresaleCard from "./components/PresaleCard";

export default function LaunchpadSale({ sale }) {
  const { user } = useMoralis();
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
    launchpad,
  } = useLaunchpad(launchpadOptions);
  return (
    <section>
      {launchpadSale ? (
        <section className="z-50 padding margin2">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <PresaleCard
              launchpad={launchpad}
              loadLaunchpad={loadLaunchpad}
              buyLaunchpadSale={buyLaunchpadSale}
              loadUserVestingSchedules={loadUserVestingSchedules}
              sale={sale}
              userAddress={user?.get("ethAddress")}
              userVestingSchedule={userVestingSchedule}
            />
            <PresaleInfo presale={launchpadSale} saleId={sale} />
            <ReferralSystem />
          </div>
          {userVestingSchedule && userVestingSchedule.length > 0 && (
            <VestingSchedule
              loadVesting={loadUserVestingSchedules}
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
