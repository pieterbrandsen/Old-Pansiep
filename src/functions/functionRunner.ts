//#region Require('./)
import { IsMemoryPathDefined } from "./isMemoryPathDefined";
import { PreCpuGetter, EndCpuGetter } from "./cpuGetter";
import { MemoryAverager } from "./memoryAverager";
//#endregion

//#region Functions()
const functionRunner = (liveFunction: any, ...args: any[]): any => {
  // Run the inputted function with the args inputted
  return liveFunction(...args);
};

const functionRunnerWithCpu = (
  liveFunction: any,
  liveMemoryObject: { [key: string]: number } | undefined,
  memoryName: string,
  calcSymbol: "=" | "+=",
  ...args: any[]
): any => {
  // If memory object is not defined, return
  if (liveMemoryObject === undefined) return functionRunner(liveFunction, ...args);

  // Get the cpu before executing the function
  const preCpu: number = PreCpuGetter();

  // Run the inputted function with the args inputted
  const functionResult = functionRunner(liveFunction, ...args);

  // Get the cpu after executing the function
  const endCpu: number = EndCpuGetter();

  // Get the totalCpuUsed by deducting the preCpu from the endCpu
  const totalCpuUsed: number = endCpu - preCpu;

  // Set the totalCpuUsed to the memoryObject path inputted
  if (totalCpuUsed >= 0) {
    switch (calcSymbol) {
      case "=":
        liveMemoryObject[memoryName] = MemoryAverager(liveMemoryObject[memoryName], totalCpuUsed);
        break;
      case "+=":
        liveMemoryObject[memoryName] += totalCpuUsed;
        break;
      default:
        break;
    }
  }

  return functionResult;
};
//#endregion

//#region Export functions
export { functionRunner as FunctionRunnerWithoutCpu, functionRunnerWithCpu as FunctionRunnerWithCpu };
//#endregion
