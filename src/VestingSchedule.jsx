import { toEther } from "./utils/web3";
import moment from "moment";
import { inThousands } from "./utils/modifiers";

export default function VestingSchedule({ vestingSchedule, claimTokens, canClaim }) {
  const totalVested = vestingSchedule
    .map((sch) => toEther(sch.totalAmount))
    .reduce((a, b) => parseFloat(a) + parseFloat(b));
  const claimTokensFromVesting = async (scheduleId) => {
    alert("claiming");
    try {
      await claimTokens(scheduleId);
    } catch (e) {
      alert("Error: " + e.message);
    }
  };
  return (
    <div className="glass margin overflow-auto flex justify-between rounded-2xl p-12">
      <table className=" z-50 text w-full">
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
            const percentage = (parseFloat(toEther(sch.totalAmount)) / totalVested) * 100;
            return (
              <tr key={index} className=" xl:hover:scale-105 duration-300 my-border">
                <td className="py-6 px-6">{inThousands(toEther(sch.totalAmount))}</td>
                <td className="py-6 px-6">{percentage}%</td>
                <td className="py-6 px-6">
                  {moment.unix(parseInt(sch.startTime, 10) + parseInt(sch.duration, 10)).format("YYYY-MM-DD HH:mm")}
                </td>
                <td className="py-6 px-6">{inThousands(toEther(sch.releasedAmount))}</td>
                <td className="py-6 px-6">
                  <button
                    disabled={true}
                    onClick={async () => await claimTokensFromVesting(index)}
                    className="text-black btn2"
                  >
                    Claim
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
