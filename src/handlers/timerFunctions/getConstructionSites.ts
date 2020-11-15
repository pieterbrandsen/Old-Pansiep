//#region Functions()
const getConstructionSites = (room: Room) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Get all constructionSites and map them based on the id
  flagMemory.commonMemory.constructionSites = room.find(FIND_CONSTRUCTION_SITES).map(c => c.id);
};
//#endregion

//#region Export functions
export { getConstructionSites as GetConstructionSites };
//#endregion
