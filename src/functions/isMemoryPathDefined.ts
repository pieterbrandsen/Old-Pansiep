const isMemoryPathDefined = (memoryPath: string) => {
  // Get all the smaller pieces of the full memoryPath
  const memoryPathArray: string[] = memoryPath.split('.');

  if (memoryPathArray.length >= 0) {
    // Set the new memoryPath string to use in the loop
    let testedMemoryPath: string = 'Memory';

    // Loop through all the smaller pieces of the memoryPath expect "Memory"
    for (let i = 1; i < memoryPathArray.length; i++) {
      // If the testMemoryPath + new part is not a object, return false
      if (typeof `${testedMemoryPath}.${memoryPathArray[i]}` !== "object") {
        return false;
      }
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
