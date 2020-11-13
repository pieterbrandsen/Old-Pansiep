const isMemoryPathDefined = (memoryPath: string) => {
  // Get all the smaller pieces of the full memoryPath
  const memoryPathArray: string[] = memoryPath.split('.');

  if (memoryPathArray.length >= 0) {
    // Set the new memoryPath object to use in the loop
    let testedMemoryObject: any = Memory;

    // Loop through all the smaller pieces of the memoryPath expect "Memory"
    for (let i = 1; i < memoryPathArray.length; i++) {
      // Get the current string of the element
      const currentMemoryPart:string =  memoryPathArray[i];

      // If the testMemoryPath + new part is not a object, return false
      if (typeof testedMemoryObject[currentMemoryPart] !== "object") return false;
      // If it is still a object, set it to the testedMemoryObject
      else testedMemoryObject = testedMemoryObject[currentMemoryPart];
    }
    
    // If every piece of the path is defined, return true
    return true;
  }
  // Return true if there is only one piece of memoryPath
  else return true;
};

//#region Export functions
export {isMemoryPathDefined as IsMemoryPathDefined};
//#endregion
