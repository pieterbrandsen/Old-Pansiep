const claim = (creep) => {
  // Make shortcut to memory
  const creepMemory = creep.memory;

  const result = creep.claimController(creep.room.controller);
  // Switch based on the results
  switch (result) {
  case OK:
    // Delete flag and memory
    Game.flags['claim'].remove();
    delete Memory.flags['claim'];

    // Create a builderLD flag and give it memory
    creep.room.createFlag(creep.pos, `builderLD${creepMemory.spawnRoom}`);
    Memory.flags[`builderLD${creepMemory.spawnRoom}`] = {
      spawnRoom: creepMemory.spawnRoom,
      room: creep.room.name,
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

module.exports = {
  execute: (creep) => {
    const result = claim(creep);
    return result;
  },
};
