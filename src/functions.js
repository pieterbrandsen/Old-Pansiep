module.exports.memoryAverager = (memoryPath, newValue, averageTime = 50) => {
  const mainDivider = 1 / averageTime;
  const secondairDivider = 1 - mainDivider;
  return secondairDivider * memoryPath + mainDivider * newValue;
};
