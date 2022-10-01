import React from "react";
import ConnectWallet from "./auth/ConnectWallet";
import CheckpointsCard from "./components/CheckpointsCard";
import Stake from "./components/Stake";
import Unstake from "./components/Unstake";
import useCheckpointsState from "./hooks/useCheckpointsState";
import STAKING_ABI from "./abis/Staking.json";
import { useMoralis } from "react-moralis";
import useStaking from "./hooks/useStaking";
import { toEther } from "./utils/web3";
import { inThousands, calculateAPY } from "./utils/modifiers";
import useGetCloudaxBalance from "./hooks/useGetBEP20Balance";
import useGetNativeBalance from "./hooks/useGetNativeBalance";

function StakeCloudax() {
  const { checkpoints, updateCheckpoint } = useCheckpointsState();
  const [appOption, setAppOption] = React.useState("stake");
  const cloudaxBalance = useGetCloudaxBalance({
    address: process.env.REACT_APP_CLOUDAX_STAKE_TOKEN_ADDRESS,
  });
  const nativeBalance = useGetNativeBalance();
  const cloudrUsd = 1.5;
  const { user } = useMoralis();
  const stakingOptions = {
    ABI: STAKING_ABI,
    userAddress: user?.get("ethAddress"),
    address: process.env.REACT_APP_STAKING_ADDRESS,
  };
  const {
    stakingInfo,
    userStake,
    stake,
    unstake,
    loadStakingInfo,
    getUserStake,
  } = useStaking(stakingOptions);
  React.useEffect(() => {
    console.log(stakingInfo);
  }, [stakingInfo]);
  React.useEffect(() => {
    updateCheckpoint("Enter Amount", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appOption]);
  return (
    <section className="relative font-roboto">
      <section className="StakeCloudax__hero">
        <h3 className="StakeCloudax__hero__one-liner">
          Stake Cloudax to Earn Rewards
        </h3>
        <p className="StakeCloudax__hero__explainer">
          Stake your $CLDX token and earn passive income with our high APY
          staking program without risk.
        </p>
        <div className="StakeCloudax__hero_ctas text-dark">
          <ConnectWallet />
          <button className="px-5 text-white btn2-border">
            <a
              href="https://cloudax.medium.com/cloudax-staking-guide-earn-high-passive-income-with-no-risk-2f9e1706a7b"
              target="_"
            >
              Staking Guide
            </a>
          </button>
        </div>
        <section className="StakeCloudax__stat-cards">
          <div className="glass StakeCloudax__stat-card">
            <h3 className="StakeCloudax__stat-cards__title">Your Stake</h3>
            <h3 className="StakeCloudax__stat-cards__value">
              {inThousands(Number(toEther(userStake)).toFixed(2))} CLDX
            </h3>
          </div>
          <div className="glass StakeCloudax__stat-card">
            <h3 className="StakeCloudax__stat-cards__title">
              Number of Stakers
            </h3>
            <h3 className="StakeCloudax__stat-cards__value">
              {inThousands(stakingInfo?.stakersCount || "0")}
            </h3>
          </div>
          <div className="glass StakeCloudax__stat-card">
            <h3 className="StakeCloudax__stat-cards__title">APY</h3>
            <h3 className="StakeCloudax__stat-cards__value">
              {calculateAPY(parseInt(stakingInfo?.rewardsPerHour || "0"))}%
            </h3>
          </div>
          <div className="glass StakeCloudax__stat-card">
            <h3 className="StakeCloudax__stat-cards__title">
              Total Value Locked
            </h3>
            <h3 className="StakeCloudax__stat-cards__value">
              $
              {stakingInfo
                ? inThousands(
                    (
                      parseFloat(toEther(stakingInfo.totalStaked)) * cloudrUsd
                    ).toFixed(2)
                  )
                : "0"}
            </h3>
          </div>
        </section>
      </section>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-[21px] wrapper">
        <div className="self-start glass StakeCloudax__card ">
          <div className="bg-[#04080F] rounded-[5.92px] max-w-[206px] p-[9px] mb-[29.17px] text-[18px]">
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
            <Stake
              stake={stake}
              cloudaxBalance={cloudaxBalance}
              updateCheckpoint={updateCheckpoint}
              reloadStakingInfo={loadStakingInfo}
              getUserStake={getUserStake}
            />
          )}
          {appOption === "unstake" && (
            <Unstake
              unstake={unstake}
              cloudaxBalance={cloudaxBalance}
              updateCheckpoint={updateCheckpoint}
              reloadStakingInfo={loadStakingInfo}
              getUserStake={getUserStake}
            />
          )}
        </div>
        <CheckpointsCard
          bnbBalance={inThousands(toEther(nativeBalance))}
          checkpoints={checkpoints}
        />
      </section>
    </section>
  );
}

export default StakeCloudax;
