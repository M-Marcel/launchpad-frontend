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

  const { helpers: launchpadHelpers, state: launchpadState } =
    useLaunchpad(launchpadOptions);
  console.log("launchpadState", launchpadState)
  console.log("launchpadState.launchpadSale", launchpadState.launchpadSale)
  return (
    <section>
      {
        launchpadState.launchpadSale ?
          (
            <section className="z-50 padding margin2">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <PresaleCard
                  launchpadState={launchpadState}
                  launchpadHelpers={launchpadHelpers}
                />
                <PresaleInfo launchpadState={launchpadState} />
                {/* <ReferralSystem
                  launchpadState={launchpadState}
                  launchpadHelpers={launchpadHelpers}
                /> */}
              </div>
              {launchpadState.userVestingSchedule &&
                launchpadState.userVestingSchedule.length > 0 && (
                  <VestingSchedule
                    launchpadState={launchpadState}
                    launchpadHelpers={launchpadHelpers}
                  />
                )}
            </section>
          )
          : ("")}
    </section>
  );
}
