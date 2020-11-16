//#region Functions()
const isMemoryPathDefined = (memoryPath: string): { [key: string]: number } | undefined => {
  // Get all the smaller pieces of the full memoryPath
  const memoryPathArray: string[] = memoryPath.split(".");

  // Set the new memoryPath object to use in the loop
  let testedMemoryObject: object | any = Memory;

  if (memoryPathArray.length >= 0) {
    // Loop through all the smaller pieces of the memoryPath expect "Memory"
    for (let i = 1; i < memoryPathArray.length; i++) {
      // Get the current string of the element
      const currentMemoryPart: string = memoryPathArray[i];

      // If the testMemoryPath + new part is undefined, return undefined
      if (testedMemoryObject[currentMemoryPart] === undefined) return undefined;
      // If it is still a object, set it to the testedMemoryObject
      else testedMemoryObject = testedMemoryObject[currentMemoryPart];
    }

    // If every piece of the path is defined, return the tested memoryObject
    return testedMemoryObject;
  }
  // Return true if there is only one piece of memoryPath return the tested memoryObject
  else return testedMemoryObject;
};
//#endregion

//#region Export functions
export { isMemoryPathDefined as IsMemoryPathDefined };
//#endregion
