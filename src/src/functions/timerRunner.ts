//#region Functions()
const timerRunner = (executeEachTicks: number): boolean => {
  // If the current tick amount is dividable by ... ticks, return true
  if (Game.time % executeEachTicks === 0) {
    return true;
  }
  // Else return false
  else return false;
};
//#endregion

//#region Export functions
export { timerRunner as TimerRunner };
//#endregion
