//#region Functions()
// Get currently used cpu amount
const cpuGetter = (): number => Game.cpu.getUsed();

// pre and end cpu getter is for later, when you want to log pre and end cpu.
const preCpuGetter = (): number => cpuGetter();
const endCpuGetter = (): number => cpuGetter();
//#endregion

//#region Export functions
export { preCpuGetter as PreCpuGetter, endCpuGetter as EndCpuGetter };
//#endregion
