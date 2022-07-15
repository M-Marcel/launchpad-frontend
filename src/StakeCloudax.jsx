import React from "react";
import ConnectWallet from "./auth/ConnectWallet";

function StakeCloudax() {
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
          <button className="btn text-dark">Staking Guide</button>
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
    </section>
  );
}

export default StakeCloudax;
