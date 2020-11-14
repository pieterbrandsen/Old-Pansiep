//#region Functions()
const getSpawnEnergyStructures = (room: Room) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Find all spawner structures and map them to the id and energy space
  flagMemory.commonMemory.spawnEnergyStructures = room
  .find(FIND_MY_STRUCTURES, {
    filter: s =>
    //@ts-ignore
    [STRUCTURE_LAB, STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_TOWER].indexOf(s.structureType) !== -1 &&
    //@ts-ignore
      s.store.getFreeCapacity(RESOURCE_ENERGY) > 0
  })
  .map(s => ({
    id: s.id,
    //@ts-ignore
    needed: s.store.getFreeCapacity(RESOURCE_ENERGY)
  }));
};
//#endregion

//#region Export functions
export { getSpawnEnergyStructures as GetSpawnEnergyStructures };
//#endregion
