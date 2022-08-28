import React from "react";
import ReferralEarnings from "./ReferralEarnings";
import ReferralLink from "./ReferralLink";

function ReferralSystem({ launchpadState, launchpadHelpers}) {
  const tokenTicker = process.env.REACT_APP_TOKEN_TICKER;
  return (
    <section className="Launchpad__card lg:col-span-2">
      <h3 className="text-lg font-extrabold text-center lg:text-3xl">
        Refer and Earn {tokenTicker}
      </h3>
      <div className="Referral__item-group">
        <ReferralLink />
        <ReferralEarnings
          launchpadState={launchpadState}
          launchpadHelpers={launchpadHelpers}
        />
      </div>
    </section>
  );
}

export default ReferralSystem;
