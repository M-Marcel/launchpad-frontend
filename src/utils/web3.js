import Moralis from "moralis";

export const ethers = Moralis.web3Library;

export const toEther = (amount) => {
  if (typeof amount === "string") amount = ethers.BigNumber.from(amount);
  return ethers.utils.formatEther(amount.toString());
};

export const isSuccessfulTransaction = async (transaction) => {
  const receipt = await transaction.wait();
  return receipt.status === 1;
};
