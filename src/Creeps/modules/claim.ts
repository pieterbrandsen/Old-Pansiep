//#region Functions()
const claim = (creep: Creep) => {
  // Make shortcut to memory
  const creepMemory: CreepMemory = creep.memory;

  // If there is no controller in target room
  if (creep.room.controller === undefined) return;

  // Run claim controller
  const result = creep.claimController(creep.room.controller);

  // Switch based on the results
  switch (result) {
    case OK:
      // Delete flag and memory
      Game.flags["claim"].remove();
      delete Memory.flags["claim"];

      // Create a builderLD flag and give it memory
      creep.room.createFlag(creep.pos, `builderLD${creepMemory.spawnRoom}`);
      //@ts-ignore
      Memory.flags[`builderLD${creepMemory.spawnRoom}`] = {
        spawnRoom: creepMemory.spawnRoom,
        room: creep.room.name
      };
      break;
    case ERR_NOT_IN_RANGE:
      // If creep is not in range, move to target
      creep.moveTo(creep.room.controller);
      return;
    default:
      break;
  }
};
//#endregion

//#region Export functions
export { claim as Claim };
//#endregion
