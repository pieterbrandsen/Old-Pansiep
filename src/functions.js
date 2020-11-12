module.exports.memoryAverager = (memoryPath, newValue, averageTime = 1000) => {
  const mainDivider = 1 / averageTime;
  const secondairDivider = 1 - mainDivider;
  if (memoryPath !== null && memoryPath !== undefined) return secondairDivider * memoryPath + mainDivider * newValue;
  else return newValue;
};
