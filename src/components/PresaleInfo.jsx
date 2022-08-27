import React from "react";

function PresaleInfo({ launchpadState: { launchpadSale: presale, saleId } }) {
  const accessTypes = ["Private", "Public"];
  const tokenTicker = process.env.REACT_APP_TOKEN_TICKER;
  return (
    <div className="flex justify-between Launchpad__card xl:items-center">
      <div className="text">
        <p className="mt-1">Opens</p>
        <p className="mt-1">Closes</p>
        <p className="mt-1">Swap Rate</p>
        <p className="mt-1">Access type</p>
      </div>
      <div className="text ">
        <p className="mt-1">2021-10-23 08:00:00 UTC</p>
        <p className="mt-1">2021-10-23 08:00:00 UTC</p>
        <p className="mt-1">
          1 BUSD = {presale?.saleRate || "0"} {tokenTicker}
        </p>
        <p className="mt-1">{accessTypes[saleId]}</p>
      </div>
    </div>
  );
}

export default PresaleInfo;
