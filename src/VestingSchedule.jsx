import { toEther } from "./utils/web3";
import moment from "moment";
import { inThousands } from "./utils/modifiers";
import ClaimFromVesting from "./components/ClaimFromVesting";

export default function VestingSchedule({ launchpadState, launchpadHelpers }) {
  const { userVestingSchedule: vestingSchedule } = launchpadState;
  console.clear()
  console.log(toEther(vestingSchedule.totalAmount))
  const totalVested = toEther(vestingSchedule.totalAmount)
  // .map((sch) => { console.log(sch); return toEther(sch.totalAmount) })
  // .reduce((a, b) => parseFloat(a) + parseFloat(b));
  // console.log("totalVested", vestingSchedule)

  // .map((sch) => toEther(sch.totalAmount))

  return (
    <div className="flex justify-between p-12 overflow-auto glass margin rounded-2xl">
      <table className="z-50 w-full text">
        <thead>
          <tr>
            <th className="py-3">Allocation</th>
            <th className="py-3">Date</th>
            <th className="py-3">Claimed</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr

            className="duration-300 xl:hover:scale-105 my-border"
          >
            <td className="px-6 py-6">
              {inThousands(totalVested)}
            </td>
            <td className="px-6 py-6">
              {moment.unix(
                parseInt(vestingSchedule.startTime, 10) +
                parseInt(vestingSchedule.duration, 10)
              )
                .format("YYYY-MM-DD HH:mm")}
            </td>
            <td className="px-6 py-6">
              {inThousands(toEther(vestingSchedule.releasedAmount))}
            </td>
            <td className="px-6 py-6">
              <ClaimFromVesting
                launchpadState={launchpadState}
                launchpadHelpers={launchpadHelpers}
                scheduleId={1}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
