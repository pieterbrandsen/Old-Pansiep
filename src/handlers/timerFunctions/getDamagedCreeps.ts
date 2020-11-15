//#region Functions()
const getDamagedCreeps = (room: Room) => {
  // Create a acces point to the flagMemory //
  const flagMemory: FlagMemory = Memory.flags[room.name];

  // Find all creeps that are damaged and are mine
  flagMemory.damagedCreeps = room
    .find(FIND_MY_CREEPS, {
      filter: c => c.hits < c.hitsMax
    })
    .map(c => c.id);
};
//#endregion

//#region Export functions
export { getDamagedCreeps as GetDamagedCreeps };
//#endregion
