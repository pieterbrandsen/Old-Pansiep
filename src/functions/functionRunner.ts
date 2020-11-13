//#region Require('./)
import { IsMemoryPathDefined } from "./isMemoryPathDefined";
import { PreCpuGetter, EndCpuGetter } from "./cpuGetter";
//#endregion

//#region Functions()
const functionRunner = (liveFunction: any, ...args: any[]): void => {
  // Run the inputted function with the args inputted
  liveFunction(...args);
};

const functionRunnerWithCpu = (
  liveFunction: any,
  liveMemoryObject: object | any,
  memoryName: string,
  ...args: any[]
): void => {
  // If memory object is not defined, return
  if (!IsMemoryPathDefined(liveMemoryObject.toString())) return functionRunner(liveFunction, ...args);

  // Get the cpu before executing the function
  const preCpu: number = PreCpuGetter();

  // Run the inputted function with the args inputted
  functionRunner(liveFunction, ...args);

  // Get the cpu after executing the function
  const endCpu: number = EndCpuGetter();

  // Get the totalCpuUsed by deducting the preCpu from the endCpu
  const totalCpuUsed: number = endCpu - preCpu;

  // Set the totalCpuUsed to the memoryObject path inputted
  liveMemoryObject[memoryName] = totalCpuUsed;
};
//#endregion

//#region Export functions
export { functionRunner as FunctionRunnerWithoutCpu, functionRunnerWithCpu as FunctionRunnerWithCpu };
//#endregion
