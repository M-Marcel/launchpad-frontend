import React from "react";
import ConnectWallet from "./auth/ConnectWallet";
import CheckpointsCard from "./components/CheckpointsCard";
import Stake from "./components/Stake";
import Unstake from "./components/Unstake";
import useCheckpointsState from "./hooks/useCheckpointsState";

function StakeCloudax() {
  const { checkpoints, updateCheckpoint } = useCheckpointsState();
  const [appOption, setAppOption] = React.useState("stake");
  React.useEffect(() => {
    updateCheckpoint("Enter Amount", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appOption]);
  return (
    <section className="relative">
      <section className="StakeCloudax__hero">
        <h3 className="StakeCloudax__hero__one-liner">
          Stake Cloudax to Earn Rewards
        </h3>
        <p className="StakeCloudax__hero__explainer">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit sapien
          ultricies est sapien sed maecenas amet sem id. In hendrerit auctor
          urna pellentesque sed.
        </p>
        <div className="StakeCloudax__hero_ctas text-dark">
          <ConnectWallet />
          <button className="px-5 btn text-dark">Staking Guide</button>
        </div>
        <section className="StakeCloudax__stat-cards">
          <div className="glass StakeCloudax__stat-card">
            <h3 className="StakeCloudax__stat-cards__title">Your Stake</h3>
            <h3 className="StakeCloudax__stat-cards__value">324822 CLDX</h3>
          </div>
          <div className="glass StakeCloudax__stat-card">
            <h3 className="StakeCloudax__stat-cards__title">
              Number of Stakers
            </h3>
            <h3 className="StakeCloudax__stat-cards__value">16904</h3>
          </div>
          <div className="glass StakeCloudax__stat-card">
            <h3 className="StakeCloudax__stat-cards__title">APY</h3>
            <h3 className="StakeCloudax__stat-cards__value">300.3%</h3>
          </div>
          <div className="glass StakeCloudax__stat-card">
            <h3 className="StakeCloudax__stat-cards__title">
              Total Value Restore
            </h3>
            <h3 className="StakeCloudax__stat-cards__value">$12,343,365</h3>
          </div>
        </section>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[21px] wrapper">
        <div className="self-start glass StakeCloudax__card ">
          <div className="bg-[#04080F] rounded-[5.92px] max-w-[196px] p-[9px] mb-[29.17px]">
            <button
              onClick={() => setAppOption("stake")}
              className={`text-white py-[12px] px-[18px] ${
                appOption === "stake"
                  ? "bg-myblue rounded-[4.3px]"
                  : "bg-transparent opacity-50"
              }`}
            >
              Stake
            </button>
            <button
              onClick={() => setAppOption("unstake")}
              className={`py-[12px] px-[18px] text-white ${
                appOption === "unstake"
                  ? "bg-myblue rounded-[4.3px]"
                  : "bg-transparent opacity-50"
              }`}
            >
              Unstake
            </button>
          </div>
          {appOption === "stake" && (
            <Stake updateCheckpoint={updateCheckpoint} />
          )}
          {appOption === "unstake" && <Unstake />}
        </div>
        <CheckpointsCard checkpoints={checkpoints} />
      </section>
    </section>
  );
}

export default StakeCloudax;
