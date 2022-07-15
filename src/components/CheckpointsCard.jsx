import React from "react";
import { useMoralis } from "react-moralis";

function CheckpointsCard({ checkpoints }) {
  const { isInitialized } = useMoralis();
  const explainers = {
    "Connect Wallet":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non, pharetra, viverra accumsan curabitur tincidunt faucibus quam quam.",
    "Have $CLDX":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non, pharetra, viverra accumsan curabitur tincidunt faucibus quam quam.",
    "Enter Amount":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non, pharetra, viverra accumsan curabitur tincidunt faucibus quam quam.",
    "Have $BNB":
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non, pharetra, viverra accumsan curabitur tincidunt faucibus quam quam.",
  };
  return (
    <div className="glass CheckpointsCard">
      <h3 className="CheckpointsCard__heading">Check Points</h3>
      <h5 className="text-xs mb-[34px] lg:mb-[40px]">
        You need to do the following to complete staking.
      </h5>
      <div className="grid grid-cols-1 gap-5">
        {Object.keys(checkpoints).map((checkpoint, index) => (
          <div key={index} className="flex">
            {
              <div
                className={`indicator ${
                  checkpoints[checkpoint]
                    ? "CheckpointsCard__checked"
                    : isInitialized
                    ? "CheckpointsCard__unchecked"
                    : "CheckpointsCard__default"
                }`}
              ></div>
            }
            <div>
              <h3 className="CheckpointsCard__title">{checkpoint}</h3>
              <p className="text-xs">{explainers[checkpoint]}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-[54px]">
        <div className="flex mr-4">
          <div className={`indicator CheckpointsCard__checked`}></div>
          <h3 className="text-xs">Requirement Met</h3>
        </div>
        <div className="flex">
          <div className={`indicator CheckpointsCard__unchecked`}></div>
          <h3 className="text-xs">Requirement Not Met</h3>
        </div>
      </div>
    </div>
  );
}

export default CheckpointsCard;
