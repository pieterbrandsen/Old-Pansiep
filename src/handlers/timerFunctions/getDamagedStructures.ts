//#region Functions()
const getDamagedStructures = (room: Room) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Get all structures that are under max hits and under hitsTarget
  flagMemory.commonMemory.repair.targets = room
    .find(FIND_STRUCTURES, {
      filter: s =>
        s.hits < s.hitsMax &&
        s.hits < (flagMemory.commonMemory.repair.hitsTarget ? flagMemory.commonMemory.repair.hitsTarget : 250 * 1000)
    })
    .map(c => c.id);
};
//#endregion

//#region Export functions
export { getDamagedStructures as GetDamagedStructures };
//#endregion
