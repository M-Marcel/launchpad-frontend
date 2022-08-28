import { toEther } from "./utils/web3";
import moment from "moment";
import { inThousands } from "./utils/modifiers";
import ClaimFromVesting from "./components/ClaimFromVesting";

export default function VestingSchedule({ launchpadState, launchpadHelpers }) {
  const { userVestingSchedule: vestingSchedule } = launchpadState;
  const totalVested = vestingSchedule
    .map((sch) => toEther(sch.totalAmount))
    .reduce((a, b) => parseFloat(a) + parseFloat(b));

  return (
    <div className="flex justify-between p-12 overflow-auto glass margin rounded-2xl">
      <table className="z-50 w-full text">
        <thead>
          <tr>
            <th className="py-3">Allocation</th>
            <th className="py-3">Percentage</th>
            <th className="py-3">Date</th>
            <th className="py-3">Claimed</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {vestingSchedule.map((sch, index) => {
            const percentage =
              (parseFloat(toEther(sch.totalAmount)) / totalVested) * 100;
            return (
              <tr
                key={index}
                className="duration-300 xl:hover:scale-105 my-border"
              >
                <td className="px-6 py-6">
                  {inThousands(toEther(sch.totalAmount))}
                </td>
                <td className="px-6 py-6">{percentage}%</td>
                <td className="px-6 py-6">
                  {index === 0
                    ? "At the end of Presale"
                    : moment
                        .unix(
                          parseInt(sch.startTime, 10) +
                            parseInt(sch.duration, 10)
                        )
                        .format("YYYY-MM-DD HH:mm")}
                </td>
                <td className="px-6 py-6">
                  {inThousands(toEther(sch.releasedAmount))}
                </td>
                <td className="px-6 py-6">
                  <ClaimFromVesting
                    launchpadState={launchpadState}
                    launchpadHelpers={launchpadHelpers}
                    scheduleId={index}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
