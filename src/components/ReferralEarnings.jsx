import React from "react";

function ReferralEarnings() {
  const tokenTicker = process.env.REACT_APP_TOKEN_TICKER;
  return (
    <div className="flex flex-col justify-between Referral__item">
      <h3 className="mb-1 text-center Referral__item-header">
        Your Referral Earnings
      </h3>
      <h3 className="mb-3 text-2xl font-bold text-center font-monument lg:text-3xl text-slate-200">
        0.00 {tokenTicker}
      </h3>
      <button className="justify-center btn text-dark max-w-[170px] lg:max-w-fit mx-auto">
        Claim Earnings
      </button>
    </div>
  );
}

export default ReferralEarnings;
