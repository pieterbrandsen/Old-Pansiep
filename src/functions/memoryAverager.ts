//#region Functions()
const memoryAverager = (currentValue:number, newValue:number, averageTime:number = 1000) => {
  // Get the percentage the current value should stay
  const mainDivider = 1 / averageTime;
  // Get the percentage the new value should be calculated at
  const secondairDivider = 1 - mainDivider;

  // If everything is good, return the new value, else the newValue to overwrite the null/undefined
  if (currentValue !== null && currentValue !== undefined) return secondairDivider * currentValue + mainDivider * newValue;
  else return newValue;
};
//#endregion

//#region Export functions
export {memoryAverager as MemoryAverager};
//#endregion