export const inThousands = (digit) => {
  return parseFloat(digit).toLocaleString("en-US");
};

export const calculateAPY = (rewardsPerHour) => {
  return ((rewardsPerHour * 8760 * 100) / 10000000).toFixed(1);
}
