import React from "react";

function Stake({ updateCheckpoint }) {
  const [amount, setAmount] = React.useState(0);
  const handleInputChange = ({ target: { value } }) => {
    const toFloat = parseFloat(value);
    const invalidNumber = isNaN(toFloat);
    setAmount(invalidNumber ? "" : toFloat);
    if (!invalidNumber && toFloat > 0) {
      updateCheckpoint("Enter Amount", true);
      return;
    }
    updateCheckpoint("Enter Amount", false);
  };
  return (
    <div>
      <h3 className="font-monument text-lg lg:text-[25.29px] lg:leading-[30.35px]">
        Stake your $CLDX
      </h3>
      <h4 className="text-xs lg:text-sm mb-[29px]">
        Enter the amount of $CLDX you want to stake
      </h4>
      <div>
        <input
          value={amount}
          onChange={handleInputChange}
          aria-label="stake amount"
          type="number"
          className="bg-[#04080F] py-[21px] w-full rounded-[7px] px-[28px] font-monument"
        />
        <div className="mt-[13px] flex justify-between">
          <span className="text-xs">Balance: 23423 CLDX</span>
          <button className="bg-myblue py-[12px] rounded-[7px] px-[44px] text-[#0B0819] text-sm lg:text-base">
            Stake
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stake;
