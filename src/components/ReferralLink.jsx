import React from "react";
import { useMoralis } from "react-moralis";

function ReferralLink() {
  const [referralLink, setReferralLink] = React.useState("");
  const { user } = useMoralis();
  React.useEffect(() => {
    if (user) {
      setReferralLink(`${window.location.host}/?ref=${user.get("ethAddress")}`);
    }
  }, [user]);
  return (
    <div className="flex flex-col justify-between Referral__item">
      <h3 className="mb-1 text-center Referral__item-header">
        Your Referral Link
      </h3>
      <input
        readOnly={true}
        className="xl:h-[30px] h-[15px] w-full rounded-full text2  text-black py-4 lg:py-5 xl:py-6 px-4 lg:px-6 border-0 text2 outline-none bg-slate-200 block mb-5"
        placeholder="Referral Link"
        aria-label="Referral Link"
        value={referralLink}
      />
      <button className="justify-center btn text-dark max-w-[150px] mx-auto">
        Copy Link
      </button>
    </div>
  );
}

export default ReferralLink;
